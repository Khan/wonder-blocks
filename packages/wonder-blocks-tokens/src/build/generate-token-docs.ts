#!/usr/bin/env -S node -r @swc-node/register
import fs from "node:fs";
import path from "node:path";

import themeDefault from "../theme/default";
import themeThunderblocks from "../theme/thunderblocks";
import {breakpoint} from "../tokens/media-queries";
import {CSS_VAR_PREFIX} from "../util/constants";

type ThemeObject = typeof themeDefault;

const themes: ReadonlyArray<{
    id: string;
    label: string;
    theme: ThemeObject;
}> = [
    {id: "default", label: "Default", theme: themeDefault},
    {id: "thunderblocks", label: "Thunderblocks", theme: themeThunderblocks},
];

function flattenToMap(
    obj: unknown,
    prefix = "",
    map: Map<string, string | number> = new Map(),
): Map<string, string | number> {
    if (obj == null || typeof obj !== "object") {
        return map;
    }
    for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
        const nextPath = prefix ? `${prefix}.${key}` : key;
        if (value == null) {
            continue;
        }
        if (typeof value === "object") {
            flattenToMap(value, nextPath, map);
        } else if (typeof value === "string" || typeof value === "number") {
            map.set(nextPath, value);
        }
    }
    return map;
}

function toCssVar(tokenGroup: string, dotPath: string): string {
    return `${CSS_VAR_PREFIX}${tokenGroup}-${dotPath.replace(/\./g, "-")}`;
}

type Group = {
    /** Slug used for the output filename. */
    id: string;
    /** Storybook title path. */
    title: string;
    /** H1 rendered in the MDX page. */
    heading: string;
    /** Variable name used in code examples (e.g. `sizing`). */
    tokenPrefix: string;
    /** Short blurb shown above the table, rendered as markdown. */
    description: string;
    /** Whether to emit a CSS Variable column. */
    includeCssVar: boolean;
} & (
    | {
          /**
           * Returns the token subtree for a given theme. One value column is
           * emitted per theme.
           */
          getTokens: (theme: ThemeObject) => unknown;
      }
    | {
          /**
           * For tokens that aren't themed (e.g. media query breakpoints). A
           * single Value column is emitted.
           */
          tokens: unknown;
      }
);

const groups: ReadonlyArray<Group> = [
    {
        id: "border",
        title: "References / Tokens Map / Border",
        heading: "Border tokens map",
        tokenPrefix: "border",
        description:
            "Border radius and width tokens. Prefer these over hard-coded pixel values.",
        getTokens: (theme) => theme.border,
        includeCssVar: true,
    },
    {
        id: "box-shadow",
        title: "References / Tokens Map / Box Shadow",
        heading: "Box shadow tokens map",
        tokenPrefix: "boxShadow",
        description:
            "Elevation values. Each level combines an offset, blur, and semantic shadow color.",
        getTokens: (theme) => theme.boxShadow,
        includeCssVar: true,
    },
    {
        id: "font",
        title: "References / Tokens Map / Font",
        heading: "Font tokens map",
        tokenPrefix: "font",
        description:
            "Typography tokens: family, weight, body, heading, and text-decoration.",
        getTokens: (theme) => {
            return {
                ...theme.font,
                // Exclude the legacy size tokens
                size: {},
                // Exclude the legacy lineHeight tokens
                lineHeight: {},
            };
        },
        includeCssVar: true,
    },
    {
        id: "semantic-color",
        title: "References / Tokens Map / Semantic Color",
        heading: "Semantic color tokens map",
        tokenPrefix: "semanticColor",
        description: "Semantic colors are the recommended way to color UI.",
        getTokens: (theme) => {
            return {
                ...theme.semanticColor,
                // Exclude the action tokens
                action: {},
                // Exclude the legacy status tokens
                status: {},
            };
        },
        includeCssVar: true,
    },
    {
        id: "sizing",
        title: "References / Tokens Map / Sizing",
        heading: "Sizing tokens map",
        tokenPrefix: "sizing",
        description:
            "Sizing tokens, expressed in `rem`. Use for padding, margin, width, height, etc.",
        getTokens: (theme) => theme.sizing,
        includeCssVar: true,
    },
    {
        id: "breakpoint",
        title: "References / Tokens Map / Media Query Breakpoints",
        heading: "Media query breakpoints map",
        tokenPrefix: "breakpoint",
        description:
            "Responsive breakpoints. `breakpoint.width` returns pixel values; `breakpoint.mediaQuery` returns ready-to-use `@media` strings.",
        tokens: breakpoint,
        includeCssVar: false,
    },
];

const GENERATED_BANNER = `{/*
  THIS FILE IS AUTO-GENERATED. DO NOT EDIT BY HAND.
  Regenerate with: pnpm --filter @khanacademy/wonder-blocks-tokens build:token-docs
  Source: packages/wonder-blocks-tokens/src/build/generate-token-docs.ts
*/}`;

function renderThemedTable(
    group: Group & {getTokens: (theme: ThemeObject) => unknown},
): string {
    // Flatten each theme independently, then walk the union of paths in
    // insertion order so novel paths (if any) still appear.
    const perTheme = themes.map(({label, theme}) => ({
        label,
        tokens: flattenToMap(group.getTokens(theme)),
    }));

    const orderedPaths: Array<string> = [];
    const seen = new Set<string>();
    for (const {tokens} of perTheme) {
        for (const p of tokens.keys()) {
            if (!seen.has(p)) {
                seen.add(p);
                orderedPaths.push(p);
            }
        }
    }

    const columns = [
        "Token",
        ...(group.includeCssVar ? ["CSS Variable"] : []),
        ...perTheme.map((t) => t.label),
    ];
    const header = `| ${columns.join(" | ")} |`;
    const divider = `| ${columns.map(() => "---").join(" | ")} |`;
    const body = orderedPaths
        .map((p) => {
            const cells = [`\`${group.tokenPrefix}.${p}\``];
            if (group.includeCssVar) {
                cells.push(`\`${toCssVar(group.tokenPrefix, p)}\``);
            }
            for (const {tokens} of perTheme) {
                const v = tokens.get(p);
                cells.push(v === undefined ? "—" : `\`${String(v)}\``);
            }
            return `| ${cells.join(" | ")} |`;
        })
        .join("\n");

    return `${header}\n${divider}\n${body}`;
}

function renderSimpleTable(group: Group & {tokens: unknown}): string {
    const rows = Array.from(flattenToMap(group.tokens).entries());
    const columns = group.includeCssVar
        ? ["Token", "CSS Variable", "Value"]
        : ["Token", "Value"];
    const header = `| ${columns.join(" | ")} |`;
    const divider = `| ${columns.map(() => "---").join(" | ")} |`;
    const body = rows
        .map(([p, value]) => {
            const cells = [`\`${group.tokenPrefix}.${p}\``];
            if (group.includeCssVar) {
                cells.push(`\`${toCssVar(group.tokenPrefix, p)}\``);
            }
            cells.push(`\`${String(value)}\``);
            return `| ${cells.join(" | ")} |`;
        })
        .join("\n");

    return `${header}\n${divider}\n${body}`;
}

function renderMdx(group: Group): string {
    const table =
        "getTokens" in group
            ? renderThemedTable(group)
            : renderSimpleTable(group);

    return `${GENERATED_BANNER}

import {Meta} from "@storybook/addon-docs/blocks";

<Meta title="${group.title}" summary="${group.description}" />

# ${group.heading}

${group.description}

\`\`\`ts
import {${group.tokenPrefix}} from "@khanacademy/wonder-blocks-tokens";
\`\`\`

${table}
`;
}

export function generateTokenDocs(outputDir: string): void {
    fs.mkdirSync(outputDir, {recursive: true});

    // Clear stale `.mdx` files so renames or removals propagate. We only touch
    // `.mdx` files to be safe in case something else ever shares the folder.
    for (const entry of fs.readdirSync(outputDir)) {
        if (entry.endsWith(".mdx")) {
            fs.unlinkSync(path.join(outputDir, entry));
        }
    }

    for (const group of groups) {
        fs.writeFileSync(
            path.join(outputDir, `${group.id}.mdx`),
            renderMdx(group),
            "utf8",
        );
    }
    // eslint-disable-next-line no-console
    console.log(
        `Token reference MDX written to ${path.relative(process.cwd(), outputDir) || outputDir}`,
    );
}

if (require.main === module) {
    // Default output: `__docs__/references` at the repo root. This script
    // lives at `packages/wonder-blocks-tokens/src/build/`, so the repo root
    // is four levels up. Accept an explicit path as the first CLI arg to
    // override.
    const outputDir =
        process.argv[2] ||
        path.resolve(__dirname, "../../../../__docs__/references");
    generateTokenDocs(outputDir);
}
