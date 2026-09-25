#!/usr/bin/env -S node -r @swc-node/register
/**
 * SPIKE (FEI-8331, option D): compile Wonder Blocks web CSS for React Native
 * with `react-native-css` (NativeWind v5's engine) instead of a hand-written
 * compiler.
 *
 * `react-native-css` is normally used as a Metro transformer: the app imports
 * a `.css` file and Metro swaps it for `StyleCollection.inject(<json>)`. We
 * can't use it that way:
 *
 * - WB ships pre-built JS, and mobile's Metro doesn't (and shouldn't have to)
 *   process CSS from `node_modules`.
 * - The transformer needs `@expo/metro-config`, which mobile doesn't use.
 * - On native, a `*.module.css` import compiles to `export {}`, so there is
 *   no class-name map. CSS Modules as such are not supported.
 *
 * Instead we call its public compiler (`react-native-css/compiler`) at WB
 * build time and ship the resulting JSON. At runtime the component calls
 * `StyleCollection.inject(json)` itself, which is exactly the code the Metro
 * transformer would have generated.
 *
 * Before compiling, the CSS goes through:
 *
 * 1. The same PostCSS chain as the web build (postcss-import + mixins), minus
 *    the `@layer shared` wrapper.
 * 2. `wbToRnCss`, a small adapter that rewrites the WB idioms
 *    `react-native-css` gets wrong or drops (see below). Every rewrite is
 *    something a Stylelint rule could ask authors to write directly instead.
 *
 * All sheets are concatenated into **one** compile, because
 * `react-native-css` only orders rules within a single stylesheet (rule order
 * restarts at 0 for every `compile()` call) and it ignores `@layer`.
 *
 * Usage: pnpm --filter @khanacademy/wonder-blocks-native gen:native-styles
 */
import * as fs from "fs";
import * as path from "path";

import postcss from "postcss";
import type {Plugin, Root} from "postcss";
import selectorParser, {pseudo} from "postcss-selector-parser";
import {compile} from "react-native-css/compiler";

const rootDir = path.join(__dirname, "../../..");
const packagesDir = path.join(rootDir, "packages");
const outDir = path.join(__dirname, "../src/generated");

/**
 * WB's `rem` is 10px (`html {font-size: 62.5%}`). `react-native-css` would
 * otherwise default to 14px.
 */
const REM = 10;

/**
 * The themes mobile needs (SYL light + dark), plus `default` so the Storybook
 * theme toolbar drives web and native stories the same way.
 */
const THEMES = ["default", "thunderblocks", "syl-dark"] as const;

/**
 * The component stylesheets to compile, in cascade order. Keys become the
 * class-name prefix, which stands in for CSS Modules' hashing: the
 * `react-native-css` style registry is global, so `.text` in two sheets
 * would otherwise collide.
 *
 * `button-unstyled` comes first because its rules live in
 * `@layer shared.reset`, which loses to the unlayered `button` rules on web.
 * `react-native-css` has no layers, so we emulate that with source order.
 */
const SHEETS: Record<string, string> = {
    "button-unstyled":
        "wonder-blocks-button/src/components/button-unstyled.module.css",
    "body-text": "wonder-blocks-typography/src/components/body-text.module.css",
    button: "wonder-blocks-button/src/components/button.module.css",
};

/**
 * Glue rules that the native components need but that web gets for free
 * from CSS inheritance. `react-native-css` doesn't inherit `color` from a
 * View into a Text; it only exposes the parent's colour as `currentColor`.
 */
const NATIVE_GLUE = `
.wb-native__inherit-color {
    color: currentColor;
}
`;

/* -------------------------------------------------------------------------- *
 * WB → react-native-css adapter
 * -------------------------------------------------------------------------- */

type Rewrite = {sheet: string; rewrite: string; count: number};
const rewrites: Array<Rewrite> = [];
const noteRewrite = (sheet: string, rewrite: string) => {
    const existing = rewrites.find(
        (r) => r.sheet === sheet && r.rewrite === rewrite,
    );
    if (existing) {
        existing.count++;
    } else {
        rewrites.push({sheet, rewrite, count: 1});
    }
};

/**
 * Rewrite the WB CSS idioms `react-native-css` can't handle as written.
 *
 * - `.a:where(.b, .c):hover` → `.a.b:hover, .a.c:hover`. `react-native-css`
 *   only unwraps `:where()` when it's the *whole* selector; inside a
 *   compound selector it misreads `.b` as a *container* (ancestor) query,
 *   so those rules silently never match. Unwrapping raises specificity,
 *   which is harmless here because every rule that would be affected is
 *   declared after the rules it needs to beat.
 * - `[aria-disabled="true"]` → `:disabled`. Attribute selectors match
 *   component *props* by camel-cased name (`ariaDisabled`), but RN's prop is
 *   `aria-disabled`. `:disabled` matches the `disabled` prop, which is what
 *   `Pressable` takes anyway.
 * - `background: <colour>` → `background-color`. The `background` shorthand
 *   is dropped entirely (it's reported as an unsupported property).
 * - `display: flex | inline-flex` gets an explicit `flex-direction: row`
 *   (CSS's default), because RN defaults to `column` and
 *   `react-native-css` doesn't add it.
 * - Logical sizes (`block-size`, `min-inline-size`, …) → physical
 *   (`height`, `min-width`, …). `react-native-css` passes them through as
 *   `blockSize`, which react-native-web accepts (so tests and Storybook look
 *   right) but React Native doesn't have.
 * - `transition` is removed: `react-native-css` animates transitions with
 *   `react-native-reanimated` v4, which needs the New Architecture and isn't
 *   installed in mobile.
 * - Class names get a `<sheet>__` prefix (see `SHEETS`).
 */
const wbToRnCss = (sheet: string): Plugin => ({
    postcssPlugin: "wb-to-react-native-css",
    Once(root: Root) {
        root.walkRules((rule) => {
            // `react-native-css` drops these rules *silently* (no entry in
            // `warnings()`), so record them here for the report.
            const silent = /::?(before|after|focus-visible|not|dir|has)\b/.exec(
                rule.selector,
            );
            if (silent) {
                noteRewrite(
                    sheet,
                    `rule dropped silently by react-native-css: ${silent[0]}`,
                );
            }
            rule.selector = selectorParser((selectors) => {
                selectors.walkClasses((node) => {
                    node.value = `${sheet}__${node.value}`;
                });
                selectors.walkAttributes((node) => {
                    if (
                        node.attribute === "aria-disabled" &&
                        node.value === "true"
                    ) {
                        node.replaceWith(pseudo({value: ":disabled"}));
                        noteRewrite(
                            sheet,
                            '[aria-disabled="true"] → :disabled',
                        );
                    }
                });
                // Expand `:where(.x, .y)` inside a compound selector into one
                // selector per argument.
                const expanded: Array<selectorParser.Selector> = [];
                selectors.each((selector) => {
                    const where = selector.nodes.find(
                        (n): n is selectorParser.Pseudo =>
                            n.type === "pseudo" && n.value === ":where",
                    );
                    if (!where || selector.nodes.length === 1) {
                        expanded.push(selector);
                        return;
                    }
                    noteRewrite(sheet, ":where(…) in compound → plain classes");
                    for (const arg of where.nodes) {
                        const clone =
                            selector.clone() as selectorParser.Selector;
                        const cloneWhere = clone.nodes.find(
                            (n) => n.type === "pseudo" && n.value === ":where",
                        )!;
                        for (const node of arg.nodes) {
                            if (node.type !== "combinator") {
                                clone.insertBefore(
                                    cloneWhere,
                                    node.clone({
                                        spaces: {before: "", after: ""},
                                    }),
                                );
                            }
                        }
                        cloneWhere.remove();
                        expanded.push(clone);
                    }
                });
                selectors.removeAll();
                for (const s of expanded) {
                    selectors.append(s);
                }
            }).processSync(rule.selector);
        });

        root.walkDecls((decl) => {
            const logical = /^(min-|max-)?(block|inline)-size$/.exec(decl.prop);
            if (logical) {
                decl.prop = `${logical[1] ?? ""}${logical[2] === "block" ? "height" : "width"}`;
                noteRewrite(sheet, "logical size → height/width");
            }
            if (decl.prop === "background") {
                decl.prop = "background-color";
                noteRewrite(sheet, "background → background-color");
            } else if (
                decl.prop === "display" &&
                /^(inline-)?flex$/.test(decl.value) &&
                !decl.parent?.some(
                    (n) => n.type === "decl" && n.prop === "flex-direction",
                )
            ) {
                decl.cloneAfter({prop: "flex-direction", value: "row"});
                noteRewrite(sheet, "display: flex → + flex-direction: row");
            } else if (decl.prop === "transition") {
                decl.remove();
                noteRewrite(sheet, "transition removed (needs Reanimated 4)");
            }
        });
    },
});

/* -------------------------------------------------------------------------- *
 * Theme variables
 * -------------------------------------------------------------------------- */

/**
 * Adjust a theme variable's value for native.
 *
 * Font stacks: RN takes a single family, and `react-native-css` splits an
 * unquoted multi-word family (`Plus Jakarta Sans, …`, as SYL writes it) into
 * separate words when it's read through `var()`. Keep only the first family,
 * quoted. (Mapping it to the app's registered font files is the app's job.)
 */
const nativeThemeValue = (name: string, value: string): string => {
    if (/font-family/.test(name) && !value.startsWith("var(")) {
        const first = value
            .split(",")[0]
            .trim()
            .replace(/^["']|["']$/g, "");
        return JSON.stringify(first);
    }
    return value;
};

/**
 * Build one `:root {…}` block per theme from the merged token CSS.
 *
 * `react-native-css` only understands `:root` (and `.dark:root` /
 * `prefers-color-scheme`) as variable scopes, so `[data-wb-theme='…']`
 * blocks are dropped. We merge `default` + the theme ourselves and compile
 * each theme as if it were the root, pruned to the variables the component
 * sheets actually reference (transitively).
 */
const buildThemeCss = (
    referenced: Set<string>,
): Record<(typeof THEMES)[number], string> => {
    const cssPath = path.join(
        packagesDir,
        "wonder-blocks-tokens/dist/css/index.css",
    );
    if (!fs.existsSync(cssPath)) {
        throw new Error(`${cssPath} not found. Run \`pnpm build\` first.`);
    }
    const raw: Record<string, Record<string, string>> = {default: {}};
    postcss.parse(fs.readFileSync(cssPath, "utf8")).walkRules((rule) => {
        for (const s of rule.selectors) {
            const theme =
                s.trim() === ":root"
                    ? "default"
                    : /\[data-wb-theme=['"]?([\w-]+)['"]?\]/.exec(s)?.[1];
            if (!theme) {
                continue;
            }
            raw[theme] ??= {};
            rule.walkDecls((decl) => {
                raw[theme][decl.prop] = decl.value.trim();
            });
        }
    });

    const result = {} as Record<(typeof THEMES)[number], string>;
    for (const theme of THEMES) {
        const merged = {...raw.default, ...raw[theme]};
        // Transitive closure over var() references.
        const keep = new Set<string>();
        const queue = [...referenced];
        while (queue.length) {
            const name = queue.pop()!;
            if (keep.has(name) || merged[name] == null) {
                continue;
            }
            keep.add(name);
            for (const m of merged[name].matchAll(/var\(\s*(--[\w-]+)/g)) {
                queue.push(m[1]);
            }
        }
        const decls = [...keep]
            .sort()
            .map(
                (name) => `  ${name}: ${nativeThemeValue(name, merged[name])};`,
            )
            .join("\n");
        result[theme] = `:root {\n${decls}\n}\n`;
    }
    return result;
};

/* -------------------------------------------------------------------------- *
 * Main
 * -------------------------------------------------------------------------- */

/**
 * Work around a `react-native-css` bug: every `line-height` value is wrapped
 * in its `lineHeight()` runtime function, which multiplies by the font size.
 * That's right for unitless values (compiled to `em()`), but lengths get
 * multiplied too (`line-height: 24px` at 16px font → 384). WB line heights
 * are always lengths, so unwrap anything that isn't `em()`.
 */
const fixLineHeights = (value: unknown): unknown => {
    if (value && typeof value === "object" && !Array.isArray(value)) {
        return Object.fromEntries(
            Object.entries(value).map(([k, v]) => [k, fixLineHeights(v)]),
        );
    }
    if (!Array.isArray(value)) {
        return value;
    }
    const [meta, fn, inner] = value;
    if (
        typeof meta === "object" &&
        meta !== null &&
        !Array.isArray(meta) &&
        fn === "lineHeight"
    ) {
        const arg =
            Array.isArray(inner) && inner.length === 1 ? inner[0] : inner;
        const isEm = Array.isArray(arg) && arg[1] === "em";
        if (!isEm) {
            fixedLineHeights++;
            return fixLineHeights(arg);
        }
    }
    return value.map(fixLineHeights);
};
let fixedLineHeights = 0;

const loadPostcssPlugins = (): Array<postcss.AcceptedPlugin> => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const config = require(path.join(rootDir, "postcss.config.cjs"));
    return config.plugins.filter(
        (p: {postcssPlugin?: string}) => p.postcssPlugin !== "wrap-in-layer",
    );
};

const banner = (what: string) =>
    `// GENERATED by build/compile-css.ts (${what}). Do not edit.\n` +
    `/* eslint-disable */\n`;

const main = async () => {
    const plugins = loadPostcssPlugins();
    const parts: Array<string> = [];
    for (const [name, relPath] of Object.entries(SHEETS)) {
        const from = path.join(packagesDir, relPath);
        const result = await postcss([...plugins, wbToRnCss(name)]).process(
            fs.readFileSync(from, "utf8"),
            {from},
        );
        parts.push(`/* ${relPath} */\n${result.css}`);
    }
    parts.push(`/* native glue */\n${NATIVE_GLUE}`);
    const componentCss = parts.join("\n");

    const referenced = new Set(
        [...componentCss.matchAll(/var\(\s*(--[\w-]+)/g)].map((m) => m[1]),
    );

    const components = compile(componentCss, {
        filename: "wonder-blocks.css",
        inlineRem: REM,
        // Keep `var()` references as-is: the theme tables are compiled
        // separately and swapped at runtime.
        inlineVariables: false,
    });

    const themeCss = buildThemeCss(referenced);
    const themes = Object.fromEntries(
        THEMES.map((theme) => {
            const compiled = compile(themeCss[theme], {
                filename: `${theme}.css`,
                inlineRem: REM,
                inlineVariables: false,
            });
            return [theme, compiled.stylesheet().vr ?? []];
        }),
    );

    fs.mkdirSync(outDir, {recursive: true});
    fs.writeFileSync(
        path.join(outDir, "stylesheet.ts"),
        `${banner("component sheets")}` +
            `import type {ReactNativeCssStyleSheet} from "react-native-css/compiler";\n\n` +
            `export const stylesheet = ${JSON.stringify(fixLineHeights(components.stylesheet()))} as ReactNativeCssStyleSheet;\n`,
    );
    fs.writeFileSync(
        path.join(outDir, "themes.ts"),
        `${banner("theme variables")}` +
            `import type {ReactNativeCssStyleSheet} from "react-native-css/compiler";\n\n` +
            `export const themes: Record<${THEMES.map((t) => JSON.stringify(t)).join(" | ")}, NonNullable<ReactNativeCssStyleSheet["vr"]>> = ${JSON.stringify(themes)};\n`,
    );

    // The portability report: what we rewrote and what react-native-css
    // dropped. Checked in so changes show up in review.
    const report = {
        rewrites,
        postCompileFixes: {lineHeightUnwrapped: fixedLineHeights},
        dropped: components.warnings(),
    };
    fs.writeFileSync(
        path.join(outDir, "report.json"),
        JSON.stringify(report, null, 4) + "\n",
    );

    // eslint-disable-next-line no-console
    console.log(JSON.stringify(report, null, 2));
};

main().catch((e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    process.exit(1);
});
