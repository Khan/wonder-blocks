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
    ],
});
