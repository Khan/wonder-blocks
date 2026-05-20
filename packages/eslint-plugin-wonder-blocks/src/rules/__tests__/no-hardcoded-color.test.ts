import {RuleTester} from "@typescript-eslint/rule-tester";

import {rules} from "..";

const ruleTester = new RuleTester({
    languageOptions: {
        parserOptions: {
            ecmaVersion: 6,
            sourceType: "module",
            ecmaFeatures: {
                jsx: true,
            },
        },
    },
});

const ruleName = "no-hardcoded-color";
const rule = rules[ruleName];

ruleTester.run(ruleName, rule, {
    valid: [
        // Non-color properties are not flagged
        {code: `StyleSheet.create({root: {margin: "10px"}})`},
        {code: `StyleSheet.create({root: {fontSize: 16}})`},
        // CSS keywords that are not hardcoded colors
        {code: `StyleSheet.create({root: {color: "inherit"}})`},
        // currentColor is valid: it inherits from an ancestor that already
        // uses a semanticColor token, so it participates in theming.
        {code: `StyleSheet.create({root: {color: "currentColor"}})`},
        {code: `StyleSheet.create({root: {fill: "currentColor"}})`},
        {code: `<div style={{color: "currentColor"}} />`},
        {code: `StyleSheet.create({root: {color: "initial"}})`},
        {code: `StyleSheet.create({root: {color: "unset"}})`},
        {code: `StyleSheet.create({root: {color: "transparent"}})`},
        // CSS custom properties (variables) are allowed
        {
            code: `StyleSheet.create({root: {color: "var(--color-primary)"}})`,
        },
        {
            code: `StyleSheet.create({root: {backgroundColor: "var(--wb-color-bg)"}})`,
        },
        // Dynamic/expression values (not string literals) are not flagged
        {code: `StyleSheet.create({root: {color: someToken}})`},
        {
            code: `StyleSheet.create({root: {color: semanticColor.core.foreground.primary}})`,
        },
        // JSX inline style with token reference
        {
            code: `<div style={{color: semanticColor.core.foreground.primary}} />`,
        },
        // Non-style JSX attributes are not flagged
        {code: `<div className="#ff0000" />`},
        {code: `<div data-color="red" />`},
        // Empty style object
        {code: `StyleSheet.create({root: {}})`},
        // No JSX style
        {code: `<div />`},
        // styles prop with token values
        {
            code: `<Tabs styles={{root: {color: semanticColor.core.foreground.neutral.strong}}} />`,
        },
        // styles prop non-color properties
        {code: `<Tabs styles={{root: {flexGrow: 1}}} />`},
        // SVG fill with allowed values
        {code: `<path fill="currentColor" />`},
        {code: `<path fill="none" />`},
        {code: `<path fill="transparent" />`},
        // color prop with token reference
        {
            code: `<PhosphorIcon color={semanticColor.core.foreground.primary} />`,
        },
        // backgroundImage without hardcoded colors
        {
            code: `StyleSheet.create({root: {backgroundImage: "url('foo.png')"}})`,
        },
        // fill on mask/clipPath/pattern controls masking semantics, not color
        {code: `<mask fill="white"><rect /></mask>`},
        {code: `<mask fill="black"><rect /></mask>`},
        {code: `<mask fill="#fff"><rect /></mask>`},
        {code: `<clipPath fill="white"><rect /></clipPath>`},
        {code: `<pattern fill="black"><rect /></pattern>`},
        // fill on children inside mask/clipPath/pattern also has masking semantics
        {code: `<mask><use fill="white" xlinkHref="#p" /></mask>`},
        {code: `<mask><use fill="black" xlinkHref="#p" /></mask>`},
        {code: `<mask><use fill="#fff" xlinkHref="#p" /></mask>`},
        {code: `<clipPath><use fill="white" xlinkHref="#p" /></clipPath>`},
        // <use> that is a sibling of <mask> (not inside it) still uses masking
        // semantics when it replicates the masked shape — but only the <use>
        // inside <mask> is excluded; the sibling <use> has a real color fill
        // and must use a semantic token. This test confirms the ancestor check
        // does NOT skip siblings.
        {
            code: `
                <g>
                    <mask id="m"><use xlinkHref="#p" /></mask>
                    <use id="Mask" fill={semanticColor.background} xlinkHref="#p" />
                </g>
            `,
        },
    ],
    invalid: [
        // ── Hex colors ────────────────────────────────────────────────
        {
            code: `StyleSheet.create({root: {color: "#fff"}})`,
            errors: [{messageId: "noHardcodedColor"}],
        },
        {
            code: `StyleSheet.create({root: {color: "#ffffff"}})`,
            errors: [{messageId: "noHardcodedColor"}],
        },
        {
            code: `StyleSheet.create({root: {color: "#FFFFFF"}})`,
            errors: [{messageId: "noHardcodedColor"}],
        },
        {
            code: `StyleSheet.create({root: {color: "#ffffffff"}})`,
            errors: [{messageId: "noHardcodedColor"}],
        },
        {
            code: `StyleSheet.create({root: {backgroundColor: "#1a1a1a"}})`,
            errors: [{messageId: "noHardcodedColor"}],
        },
        // ── RGB / RGBA ────────────────────────────────────────────────
        {
            code: `StyleSheet.create({root: {color: "rgb(255, 0, 0)"}})`,
            errors: [{messageId: "noHardcodedColor"}],
        },
        {
            code: `StyleSheet.create({root: {color: "rgba(0, 0, 0, 0.5)"}})`,
            errors: [{messageId: "noHardcodedColor"}],
        },
        {
            code: `StyleSheet.create({root: {backgroundColor: "rgba(255, 255, 255, 0.8)"}})`,
            errors: [{messageId: "noHardcodedColor"}],
        },
        // ── HSL / HSLA ────────────────────────────────────────────────
        {
            code: `StyleSheet.create({root: {color: "hsl(120, 100%, 50%)"}})`,
            errors: [{messageId: "noHardcodedColor"}],
        },
        {
            code: `StyleSheet.create({root: {color: "hsla(120, 100%, 50%, 0.3)"}})`,
            errors: [{messageId: "noHardcodedColor"}],
        },
        // ── HWB ──────────────────────────────────────────────────────
        {
            code: `StyleSheet.create({root: {color: "hwb(194 0% 0%)"}})`,
            errors: [{messageId: "noHardcodedColor"}],
        },
        // ── Named colors ──────────────────────────────────────────────
        {
            code: `StyleSheet.create({root: {color: "red"}})`,
            errors: [{messageId: "noHardcodedColor"}],
        },
        {
            code: `StyleSheet.create({root: {color: "blue"}})`,
            errors: [{messageId: "noHardcodedColor"}],
        },
        {
            code: `StyleSheet.create({root: {backgroundColor: "white"}})`,
            errors: [{messageId: "noHardcodedColor"}],
        },
        {
            code: `StyleSheet.create({root: {backgroundColor: "black"}})`,
            errors: [{messageId: "noHardcodedColor"}],
        },
        {
            code: `StyleSheet.create({root: {color: "rebeccapurple"}})`,
            errors: [{messageId: "noHardcodedColor"}],
        },
        // ── Different color properties ────────────────────────────────
        {
            code: `StyleSheet.create({root: {borderColor: "#ccc"}})`,
            errors: [{messageId: "noHardcodedColor"}],
        },
        {
            code: `StyleSheet.create({root: {outlineColor: "rgb(0, 120, 212)"}})`,
            errors: [{messageId: "noHardcodedColor"}],
        },
        {
            code: `StyleSheet.create({root: {fill: "#000000"}})`,
            errors: [{messageId: "noHardcodedColor"}],
        },
        {
            code: `StyleSheet.create({root: {stroke: "blue"}})`,
            errors: [{messageId: "noHardcodedColor"}],
        },
        {
            code: `StyleSheet.create({root: {caretColor: "#333"}})`,
            errors: [{messageId: "noHardcodedColor"}],
        },
        {
            code: `StyleSheet.create({root: {textDecorationColor: "red"}})`,
            errors: [{messageId: "noHardcodedColor"}],
        },
        // ── Shorthand with embedded color ─────────────────────────────
        {
            code: `StyleSheet.create({root: {boxShadow: "0 2px 4px rgba(0, 0, 0, 0.5)"}})`,
            errors: [{messageId: "noHardcodedColor"}],
        },
        {
            code: `StyleSheet.create({root: {border: "1px solid #ccc"}})`,
            errors: [{messageId: "noHardcodedColor"}],
        },
        {
            code: `StyleSheet.create({root: {background: "linear-gradient(#fff, #000)"}})`,
            errors: [{messageId: "noHardcodedColor"}],
        },
        // ── Nested pseudo-selector objects ────────────────────────────
        {
            code: `StyleSheet.create({root: {":hover": {color: "#007bff"}}})`,
            errors: [{messageId: "noHardcodedColor"}],
        },
        // ── Multiple violations in one block ──────────────────────────
        {
            code: `StyleSheet.create({root: {color: "#fff", backgroundColor: "#000"}})`,
            errors: [
                {messageId: "noHardcodedColor"},
                {messageId: "noHardcodedColor"},
            ],
        },
        // ── Inline JSX style prop ─────────────────────────────────────
        {
            code: `<div style={{color: "#fff"}} />`,
            errors: [{messageId: "noHardcodedColor"}],
        },
        {
            code: `<div style={{backgroundColor: "rgba(0,0,0,0.5)"}} />`,
            errors: [{messageId: "noHardcodedColor"}],
        },
        {
            code: `<div style={{color: "red"}} />`,
            errors: [{messageId: "noHardcodedColor"}],
        },
        // ── Template literal (no interpolations) ─────────────────────
        {
            code: "StyleSheet.create({root: {color: `#fff`}})",
            errors: [{messageId: "noHardcodedColor"}],
        },
        // ── WB multi-part styles prop (JSX attribute) ─────────────────
        {
            code: `<Tabs styles={{root: {border: "2px solid lightpink"}}} />`,
            errors: [{messageId: "noHardcodedColor"}],
        },
        // ── WB multi-part styles as plain object property (e.g. Storybook args)
        {
            code: `const story = {args: {styles: {root: {color: "red"}}}}`,
            errors: [{messageId: "noHardcodedColor"}],
        },
        {
            code: `const story = {args: {styles: {root: {backgroundColor: "#fff"}, tab: {borderColor: "blue"}}}}`,
            errors: [
                {messageId: "noHardcodedColor"},
                {messageId: "noHardcodedColor"},
            ],
        },
        {
            code: `<Tabs styles={{tablist: {backgroundColor: "lavender"}, tab: {backgroundColor: "#fff"}}} />`,
            errors: [
                {messageId: "noHardcodedColor"},
                {messageId: "noHardcodedColor"},
            ],
        },
        {
            code: `<Tabs styles={{root: {boxShadow: "0 2px 4px rgba(0,0,0,0.5)"}}} />`,
            errors: [{messageId: "noHardcodedColor"}],
        },
        // ── backgroundImage with hardcoded colors ─────────────────────
        {
            code: `StyleSheet.create({root: {backgroundImage: "linear-gradient(180deg, #b8bdc4 0%, #8b93a0 50%, #717883 100%)"}})`,
            errors: [{messageId: "noHardcodedColor"}],
        },
        {
            code: `StyleSheet.create({root: {backgroundImage: "linear-gradient(45deg, #ccc 25%, transparent 25%)"}})`,
            errors: [{messageId: "noHardcodedColor"}],
        },
        // ── SVG fill/stroke as direct JSX attributes ──────────────────
        {
            code: `<path fill="#ff0000" />`,
            errors: [{messageId: "noHardcodedColor"}],
        },
        {
            code: `<circle fill={"#ff0000"} />`,
            errors: [{messageId: "noHardcodedColor"}],
        },
        {
            code: `<path fill="red" />`,
            errors: [{messageId: "noHardcodedColor"}],
        },
        {
            code: `<path stroke="#000" />`,
            errors: [{messageId: "noHardcodedColor"}],
        },
        {
            code: `<stop stopColor="#ffffff" />`,
            errors: [{messageId: "noHardcodedColor"}],
        },
        // ── <use> sibling of <mask> with hardcoded fill ───────────────
        // <use id="Mask" fill="#1865F2"> is a sibling, not a child, of <mask>.
        // Its fill is a real visible color and must be flagged.
        {
            code: `
                <g>
                    <mask id="m"><use xlinkHref="#p" /></mask>
                    <use id="Mask" fill="#1865F2" xlinkHref="#p" />
                </g>
            `,
            errors: [{messageId: "noHardcodedColor"}],
        },
        // ── color prop on WB components (e.g. PhosphorIcon) ───────────
        {
            code: `<PhosphorIcon color="#3C6D4A" />`,
            errors: [{messageId: "noHardcodedColor"}],
        },
        {
            code: `<PhosphorIcon color={"#3C6D4A"} />`,
            errors: [{messageId: "noHardcodedColor"}],
        },
        {
            code: `<PhosphorIcon color="green" />`,
            errors: [{messageId: "noHardcodedColor"}],
        },
    ],
});
