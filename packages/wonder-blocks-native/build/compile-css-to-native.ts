#!/usr/bin/env -S node -r @swc-node/register
/**
 * SPIKE (FEI-8331): compile Wonder Blocks web CSS into data React Native can
 * use.
 *
 * Two inputs, both of which already exist for the web build:
 *
 * 1. The merged theme variables (`wonder-blocks-tokens/dist/css/index.css`,
 *    produced by `pnpm build`). These are `:root` / `[data-wb-theme='…']`
 *    blocks of custom properties. We flatten them into one fully-resolved
 *    `{"--wb-…": "value"}` table per theme.
 * 2. Component `*.module.css` files. We run them through the same PostCSS
 *    chain as the web build (postcss-import + mixins, so `@import` and
 *    `@apply --wb-focus-visible` are expanded), flatten native CSS nesting,
 *    and turn each selector into match conditions (classes + states).
 *
 * Anything outside the supported subset (pseudo-elements, `:not()`, tag
 * selectors, unknown media queries…) is skipped with a warning, so the
 * warning list doubles as a report of "what CSS isn't RN-portable".
 *
 * Usage: pnpm --filter @khanacademy/wonder-blocks-native gen:native-styles
 */
import * as fs from "fs";
import * as path from "path";

import postcss from "postcss";
import type {AtRule, ChildNode, Container, Rule} from "postcss";
import selectorParser from "postcss-selector-parser";

import type {
    CompoundCondition,
    NativeMedia,
    NativeRule,
    NativeState,
    NativeStyleSheet,
} from "../src/css-runtime/types";

const rootDir = path.join(__dirname, "../../..");
const packagesDir = path.join(rootDir, "packages");
const outDir = path.join(__dirname, "../src/generated");

/**
 * The themes mobile needs (SYL light + dark), plus `default` so the
 * Storybook theme toolbar drives web and native stories the same way.
 * `default` is also the base the other themes override, mirroring
 * `:root, [data-wb-theme='default']`.
 */
const THEMES = ["default", "thunderblocks", "syl-dark"] as const;

/**
 * The component stylesheets this spike compiles. Keys become the generated
 * module names.
 */
const SHEETS: Record<string, string> = {
    button: "wonder-blocks-button/src/components/button.module.css",
    "button-unstyled":
        "wonder-blocks-button/src/components/button-unstyled.module.css",
    "body-text": "wonder-blocks-typography/src/components/body-text.module.css",
};

const warnings: Array<string> = [];
const warn = (source: string, message: string) =>
    warnings.push(`${source}: ${message}`);

/* -------------------------------------------------------------------------- *
 * Theme variables
 * -------------------------------------------------------------------------- */

const resolveVarsInValue = (
    value: string,
    table: Record<string, string>,
    seen: Set<string> = new Set(),
): string =>
    value.replace(
        /var\(\s*(--[\w-]+)\s*(?:,\s*([^()]*(?:\([^()]*\)[^()]*)*))?\)/g,
        (match, name: string, fallback?: string) => {
            if (seen.has(name)) {
                return match;
            }
            const raw = table[name] ?? fallback;
            if (raw == null) {
                return match;
            }
            return resolveVarsInValue(raw, table, new Set([...seen, name]));
        },
    );

/**
 * Evaluate `calc()` expressions that only combine px/rem lengths and plain
 * numbers (e.g. `calc(-1 * 2px)` → `-2px`). Anything else (`%`, `vw`, …) is
 * left alone and reported later.
 */
const evaluateCalc = (value: string): string =>
    value.replace(/calc\(([^()]*(?:\([^()]*\)[^()]*)*)\)/g, (match, expr) => {
        const px = (expr as string).replace(
            /(-?\d*\.?\d+)(rem|px)\b/g,
            (_: string, n: string, unit: string) =>
                String(unit === "rem" ? parseFloat(n) * 10 : parseFloat(n)),
        );
        if (!/^[\d\s.+\-*/()]+$/.test(px)) {
            return match;
        }
        // Safe: the expression is restricted to digits and arithmetic.
        // eslint-disable-next-line no-new-func
        const n = Function(`"use strict"; return (${px});`)() as number;
        return Number.isFinite(n) ? `${n}px` : match;
    });

const compileThemeVars = (): Record<string, Record<string, string>> => {
    const cssPath = path.join(
        packagesDir,
        "wonder-blocks-tokens/dist/css/index.css",
    );
    if (!fs.existsSync(cssPath)) {
        throw new Error(`${cssPath} not found. Run \`pnpm build\` first.`);
    }
    const root = postcss.parse(fs.readFileSync(cssPath, "utf8"));
    const raw: Record<string, Record<string, string>> = {default: {}};

    root.walkRules((rule) => {
        const themes = rule.selectors
            .map((s) => {
                if (s.trim() === ":root") {
                    return "default";
                }
                return /\[data-wb-theme=['"]?([\w-]+)['"]?\]/.exec(s)?.[1];
            })
            .filter((t): t is string => !!t);
        for (const theme of new Set(themes)) {
            raw[theme] ??= {};
            rule.walkDecls((decl) => {
                raw[theme][decl.prop] = decl.value.trim();
            });
        }
    });

    const result: Record<string, Record<string, string>> = {};
    for (const theme of THEMES) {
        const merged = {...raw.default, ...raw[theme]};
        const resolved: Record<string, string> = {};
        for (const [name, value] of Object.entries(merged)) {
            resolved[name] = evaluateCalc(resolveVarsInValue(value, merged));
        }
        result[theme] = resolved;
    }
    return result;
};

/* -------------------------------------------------------------------------- *
 * Component stylesheets
 * -------------------------------------------------------------------------- */

/**
 * Load the repo's PostCSS plugins, minus the `@layer shared` wrapper (layers
 * are meaningless on native).
 */
const loadPostcssPlugins = () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const config = require(path.join(rootDir, "postcss.config.cjs"));
    return config.plugins.filter(
        (p: {postcssPlugin?: string}) => p.postcssPlugin !== "wrap-in-layer",
    );
};

type FlatRule = {
    selector: string;
    media: NativeMedia | null;
    layerRank: number;
    declarations: Array<[string, string]>;
};

const parseMedia = (params: string, source: string): NativeMedia | false => {
    const normalized = params.replace(/\s+/g, " ").trim();
    if (normalized === "(hover: hover)") {
        return "hover";
    }
    if (normalized === "not (hover: hover)") {
        return "no-hover";
    }
    warn(source, `unsupported @media (${params}); rules skipped`);
    return false;
};

/**
 * Flatten native CSS nesting, `@media` and `@layer` into a list of rules
 * with fully-qualified selectors.
 */
const flatten = (
    container: Container<ChildNode>,
    source: string,
    ctx: {
        parents: Array<string> | null;
        media: NativeMedia | null;
        layerRank: number;
    },
    out: Array<FlatRule>,
) => {
    for (const node of container.nodes ?? []) {
        if (node.type === "atrule") {
            const at = node as AtRule;
            if (at.name === "media") {
                const media = parseMedia(at.params, source);
                if (media !== false) {
                    flatten(at, source, {...ctx, media}, out);
                }
            } else if (at.name === "layer") {
                flatten(at, source, {...ctx, layerRank: 0}, out);
            } else {
                warn(source, `unsupported @${at.name}; skipped`);
            }
        } else if (node.type === "rule") {
            const rule = node as Rule;
            const selectors = ctx.parents
                ? rule.selectors.flatMap((s) =>
                      ctx.parents!.map((p) =>
                          s.includes("&") ? s.replace(/&/g, p) : `${p} ${s}`,
                      ),
                  )
                : rule.selectors;
            const declarations: Array<[string, string]> = [];
            for (const child of rule.nodes) {
                if (child.type === "decl") {
                    declarations.push([child.prop, child.value.trim()]);
                }
            }
            if (declarations.length) {
                for (const selector of selectors) {
                    out.push({
                        selector,
                        media: ctx.media,
                        layerRank: ctx.layerRank,
                        declarations,
                    });
                }
            }
            flatten(rule, source, {...ctx, parents: selectors}, out);
        }
    }
};

type ParsedSelector = {
    target: CompoundCondition;
    ancestors: Array<CompoundCondition>;
    specificity: number;
};

const PSEUDO_STATES: Record<string, NativeState> = {
    ":hover": "hover",
    ":active": "press",
    ":focus-visible": "focus",
    ":focus": "focus",
};

type MutableCompound = {
    classes: Array<string>;
    states: Array<NativeState>;
    notStates: Array<NativeState>;
};

const emptyCompound = (): MutableCompound => ({
    classes: [],
    states: [],
    notStates: [],
});

/**
 * Parse one complex selector (no commas) into one or more alternatives
 * (`:where(.a, .b)` fans out). Returns `null` if unsupported.
 */
const parseSelector = (
    selector: string,
    source: string,
): Array<ParsedSelector> | null => {
    let unsupported: string | null = null;
    // Each entry is a list of alternatives for the compound at that position.
    const compounds: Array<Array<MutableCompound>> = [[emptyCompound()]];
    let specificity = 0;

    const addToAll = (fn: (c: MutableCompound) => void) =>
        compounds[compounds.length - 1].forEach(fn);

    const handleSimple = (
        node: selectorParser.Node,
        apply: (fn: (c: MutableCompound) => void) => void,
        countSpecificity: boolean,
    ) => {
        switch (node.type) {
            case "class":
                apply((c) => c.classes.push(node.value));
                if (countSpecificity) {
                    specificity++;
                }
                return;
            case "attribute": {
                const attr = node as selectorParser.Attribute;
                const value = attr.value?.replace(/["']/g, "");
                const state: NativeState | null =
                    attr.attribute === "aria-disabled"
                        ? "disabled"
                        : attr.attribute === "aria-current"
                          ? "current"
                          : null;
                if (!state || (value !== "true" && value !== "false")) {
                    unsupported = `attribute ${attr.toString()}`;
                    return;
                }
                apply((c) =>
                    (value === "true" ? c.states : c.notStates).push(state),
                );
                if (countSpecificity) {
                    specificity++;
                }
                return;
            }
            case "pseudo": {
                const state = PSEUDO_STATES[node.value];
                if (!state) {
                    unsupported = `pseudo ${node.value}`;
                    return;
                }
                apply((c) => c.states.push(state));
                if (countSpecificity) {
                    specificity++;
                }
                return;
            }
            default:
                unsupported = `${node.type} ${node.toString()}`;
        }
    };

    selectorParser((root) => {
        const sel = root.nodes[0];
        for (const node of sel.nodes) {
            if (node.type === "combinator") {
                if (node.value.trim() !== "") {
                    unsupported = `combinator "${node.value}"`;
                    return;
                }
                compounds.push([emptyCompound()]);
            } else if (node.type === "pseudo" && node.value === ":where") {
                // `:where(.a, .b)` — zero specificity, fan out alternatives.
                const pseudo = node as selectorParser.Pseudo;
                const current = compounds[compounds.length - 1];
                const next: Array<MutableCompound> = [];
                for (const alt of pseudo.nodes) {
                    for (const base of current) {
                        const copy: MutableCompound = {
                            classes: [...base.classes],
                            states: [...base.states],
                            notStates: [...base.notStates],
                        };
                        for (const inner of alt.nodes) {
                            handleSimple(inner, (fn) => fn(copy), false);
                        }
                        next.push(copy);
                    }
                }
                compounds[compounds.length - 1] = next;
            } else {
                handleSimple(node, addToAll, true);
            }
        }
    }).processSync(selector);

    if (unsupported) {
        warn(source, `unsupported ${unsupported} in "${selector}"; skipped`);
        return null;
    }

    // Cartesian product of alternatives across compound positions.
    let combos: Array<Array<MutableCompound>> = [[]];
    for (const alternatives of compounds) {
        combos = combos.flatMap((combo) =>
            alternatives.map((alt) => [...combo, alt]),
        );
    }
    return combos.map((combo) => ({
        target: combo[combo.length - 1],
        ancestors: combo.slice(0, -1),
        specificity,
    }));
};

const compileSheet = async (
    name: string,
    relPath: string,
    plugins: Array<postcss.AcceptedPlugin>,
): Promise<NativeStyleSheet> => {
    const from = path.join(packagesDir, relPath);
    const result = await postcss(plugins).process(
        fs.readFileSync(from, "utf8"),
        {from},
    );
    const flat: Array<FlatRule> = [];
    flatten(
        result.root,
        relPath,
        {parents: null, media: null, layerRank: 1},
        flat,
    );

    const rules: Array<NativeRule> = [];
    flat.forEach((rule, order) => {
        for (const parsed of parseSelector(rule.selector, relPath) ?? []) {
            rules.push({
                ...parsed,
                media: rule.media,
                layerRank: rule.layerRank,
                order,
                declarations: rule.declarations,
            });
        }
    });
    return {source: relPath, rules};
};

/* -------------------------------------------------------------------------- *
 * Output
 * -------------------------------------------------------------------------- */

const HEADER = `/**
 * GENERATED FILE — DO NOT EDIT.
 * Run \`pnpm --filter @khanacademy/wonder-blocks-native gen:native-styles\`.
 */
/* eslint-disable max-lines */
`;

const writeTs = (file: string, body: string) => {
    fs.mkdirSync(outDir, {recursive: true});
    fs.writeFileSync(path.join(outDir, file), HEADER + body);
};

/**
 * Only ship the theme variables the compiled sheets reference (the full
 * table is ~750 vars per theme). Values are already fully resolved, so no
 * transitive closure is needed.
 */
const pruneThemeVars = (
    themeVars: Record<string, Record<string, string>>,
    sheets: Array<NativeStyleSheet>,
) => {
    const referenced = new Set<string>();
    for (const sheet of sheets) {
        for (const rule of sheet.rules) {
            for (const [, value] of rule.declarations) {
                for (const m of value.matchAll(/var\(\s*(--[\w-]+)/g)) {
                    referenced.add(m[1]);
                }
            }
        }
    }
    const pruned: Record<string, Record<string, string>> = {};
    for (const [theme, vars] of Object.entries(themeVars)) {
        pruned[theme] = {};
        for (const name of [...referenced].sort()) {
            if (name in vars) {
                pruned[theme][name] = vars[name];
                if (/\b(calc|color-mix|min|max|clamp)\(/.test(vars[name])) {
                    warn(
                        `theme ${theme}`,
                        `${name} uses a CSS function RN can't evaluate: ${vars[name]}`,
                    );
                }
            }
        }
    }
    return pruned;
};

const main = async () => {
    const plugins = loadPostcssPlugins();
    const sheets: Array<NativeStyleSheet> = [];
    for (const [name, relPath] of Object.entries(SHEETS)) {
        const sheet = await compileSheet(name, relPath, plugins);
        sheets.push(sheet);
        writeTs(
            `${name}.native-styles.ts`,
            `import type {NativeStyleSheet} from "../css-runtime/types";\n\n` +
                `const sheet: NativeStyleSheet = ${JSON.stringify(sheet, null, 4)};\n\nexport default sheet;\n`,
        );
        // eslint-disable-next-line no-console
        console.log(`✅ ${relPath} → ${sheet.rules.length} rules`);
    }

    const themeVars = pruneThemeVars(compileThemeVars(), sheets);
    writeTs(
        "theme-vars.ts",
        `import type {NativeThemeVars} from "../css-runtime/types";\n\n` +
            `export const themeVars = ${JSON.stringify(themeVars, null, 4)} satisfies Record<string, NativeThemeVars>;\n`,
    );
    // eslint-disable-next-line no-console
    console.log(
        `✅ theme vars → ${Object.keys(themeVars[THEMES[0]]).length} vars × ${THEMES.length} themes`,
    );

    for (const w of warnings) {
        // eslint-disable-next-line no-console
        console.warn(`⚠️  ${w}`);
    }
};

main().catch((e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    process.exit(1);
});
