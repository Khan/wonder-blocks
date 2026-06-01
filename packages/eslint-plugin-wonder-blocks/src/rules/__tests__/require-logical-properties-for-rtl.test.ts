import {RuleTester} from "@typescript-eslint/rule-tester";

import {rules} from "..";

const ruleTester = new RuleTester({
    languageOptions: {
        parserOptions: {
            ecmaVersion: 2020,
            sourceType: "module",
            ecmaFeatures: {
                jsx: true,
            },
        },
    },
});

const ruleName = "require-logical-properties-for-rtl";
const rule = rules[ruleName];

ruleTester.run(ruleName, rule, {
    valid: [
        // Already-logical property names are fine.
        {code: '<div style={{marginInlineStart: "10px"}} />'},
        {code: '<div style={{paddingBlockEnd: "8px"}} />'},
        {code: "<div style={{insetInlineStart: 0}} />"},

        // textAlign with logical values is fine.
        {code: '<div style={{textAlign: "start"}} />'},
        {code: '<div style={{textAlign: "end"}} />'},
        {code: '<div style={{textAlign: "center"}} />'},

        // Numeric / non-string padding/margin shouldn't trigger shorthand warning.
        {code: "<div style={{padding: 8}} />"},
        {code: '<div style={{margin: "10px"}} />'},

        // float/clear with non-directional values.
        {code: '<div style={{float: "none"}} />'},
        {code: '<div style={{clear: "both"}} />'},

        // background-position with percentages.
        {code: '<div style={{backgroundPosition: "0% center"}} />'},

        // Non-directional cursor.
        {code: '<div style={{cursor: "pointer"}} />'},

        // Shorthand property (skipped).
        {code: "<div style={{marginLeft}} />"},

        // StyleSheet.create with logical properties.
        {
            code: 'StyleSheet.create({foo: {marginInlineStart: "10px"}});',
        },

        // Transforms, shadows, gradients, cursors, and backgroundPositionX/Y are
        // not checked: there is no logical-property fix for them and the
        // heuristics produced almost entirely false positives on RTL-safe code
        // (e.g. translateX(-50%) centering, symmetric gradients).
        {code: '<div style={{boxShadow: "4px 0 4px rgba(0,0,0,.2)"}} />'},
        {
            code: '<div style={{background: "linear-gradient(to bottom, red, blue)"}} />',
        },
        {code: '<div style={{transform: "translateX(10px)"}} />'},
        {code: '<div style={{cursor: "e-resize"}} />'},
        {code: '<div style={{backgroundPositionX: "left"}} />'},

        // Single-value padding/margin has no directionality, so it's not flagged.
        {code: '<div style={{padding: "10px"}} />'},

        // Values containing functions can't be safely split, so no shorthand
        // warning fires.
        {code: '<div style={{padding: "calc(1px + 2px) 10px"}} />'},

        // When warnBackgroundPosition is explicitly off, directional bg is allowed.
        {
            code: '<div style={{backgroundPosition: "left top"}} />',
            options: [{warnBackgroundPosition: false}],
        },

        // Computed property keys (variables) must not be auto-fixed.
        {code: '<div style={{[marginLeft]: "10px"}} />'},

        // background with url() containing "left"/"right" in the filename
        // must not trigger the directional warning.
        {
            code: '<div style={{background: "url(/images/left-arrow.png) no-repeat"}} />',
        },
        {
            code: '<div style={{backgroundPosition: "url(top-right.svg) center"}} />',
        },
    ],
    invalid: [
        // --- Property key auto-fixes -----------------------------------------
        {
            code: '<div style={{marginLeft: "10px"}} />',
            output: '<div style={{marginInlineStart: "10px"}} />',
            errors: [
                {
                    messageId: "useLogicalProperty",
                    data: {
                        logical: "marginInlineStart",
                        physical: "marginLeft",
                    },
                },
            ],
        },
        {
            code: '<div style={{paddingRight: "8px"}} />',
            output: '<div style={{paddingInlineEnd: "8px"}} />',
            errors: [
                {
                    messageId: "useLogicalProperty",
                    data: {
                        logical: "paddingInlineEnd",
                        physical: "paddingRight",
                    },
                },
            ],
        },
        {
            code: "<div style={{left: 0}} />",
            output: "<div style={{insetInlineStart: 0}} />",
            errors: [{messageId: "useLogicalProperty"}],
        },
        {
            code: '<div style={{maxWidth: "200px"}} />',
            output: '<div style={{maxInlineSize: "200px"}} />',
            errors: [{messageId: "useLogicalProperty"}],
        },
        {
            code: '<div style={{borderTopLeftRadius: "4px"}} />',
            output: '<div style={{borderStartStartRadius: "4px"}} />',
            errors: [{messageId: "useLogicalProperty"}],
        },
        {
            code: '<div style={{borderRightWidth: "1px"}} />',
            output: '<div style={{borderInlineEndWidth: "1px"}} />',
            errors: [{messageId: "useLogicalProperty"}],
        },
        {
            code: '<div style={{scrollMarginLeft: "10px"}} />',
            output: '<div style={{scrollMarginInlineStart: "10px"}} />',
            errors: [{messageId: "useLogicalProperty"}],
        },

        // String-literal property keys also fix correctly.
        {
            code: '<div style={{"marginLeft": "10px"}} />',
            output: '<div style={{"marginInlineStart": "10px"}} />',
            errors: [{messageId: "useLogicalProperty"}],
        },

        // --- textAlign value swap --------------------------------------------
        {
            code: '<div style={{textAlign: "left"}} />',
            output: '<div style={{textAlign: "start"}} />',
            errors: [
                {
                    messageId: "useTextAlignValue",
                    data: {logical: "start", physical: "left"},
                },
            ],
        },
        {
            code: '<div style={{textAlign: "right"}} />',
            output: '<div style={{textAlign: "end"}} />',
            errors: [{messageId: "useTextAlignValue"}],
        },

        // --- float / clear value warnings (no fix) ---------------------------
        {
            code: '<div style={{float: "left"}} />',
            errors: [
                {
                    messageId: "useLogicalFloat",
                    data: {logical: "inline-start", physical: "left"},
                },
            ],
        },
        {
            code: '<div style={{clear: "right"}} />',
            errors: [{messageId: "useLogicalClear"}],
        },

        // --- direction forced value (always warns) ---------------------------
        {
            code: '<div style={{direction: "rtl"}} />',
            errors: [{messageId: "avoidForceDirection"}],
        },

        // --- backgroundPosition directional (warnBackgroundPosition on by default) --
        {
            code: '<div style={{backgroundPosition: "left top"}} />',
            errors: [{messageId: "avoidBackgroundDirectional"}],
        },
        // The `background` shorthand is also checked for directional keywords.
        {
            code: '<div style={{background: "url(x.png) no-repeat right center"}} />',
            errors: [{messageId: "avoidBackgroundDirectional"}],
        },

        // --- padding / margin shorthand auto-fix -----------------------------
        // Two-value (block / inline) — no RTL bug, but normalized to logical.
        {
            code: '<div style={{padding: "10px 20px"}} />',
            output: '<div style={{paddingBlock: "10px", paddingInline: "20px"}} />',
            errors: [{messageId: "preferLogicalPaddingShorthand"}],
        },
        {
            code: '<div style={{margin: "0 4px"}} />',
            output: '<div style={{marginBlock: "0", marginInline: "4px"}} />',
            errors: [{messageId: "preferLogicalMarginShorthand"}],
        },
        // Three-value (top / inline / bottom) — symmetric inline, no RTL bug.
        {
            code: '<div style={{padding: "10px 20px 30px"}} />',
            output: '<div style={{paddingBlockStart: "10px", paddingInline: "20px", paddingBlockEnd: "30px"}} />',
            errors: [{messageId: "preferLogicalPaddingShorthand"}],
        },
        {
            code: '<div style={{margin: "1px 2px 3px"}} />',
            output: '<div style={{marginBlockStart: "1px", marginInline: "2px", marginBlockEnd: "3px"}} />',
            errors: [{messageId: "preferLogicalMarginShorthand"}],
        },
        // Four-value (top / right / bottom / left) — the genuine RTL hazard:
        // left and right differ and don't auto-mirror.
        {
            code: '<div style={{padding: "10px 20px 30px 40px"}} />',
            output: '<div style={{paddingBlockStart: "10px", paddingInlineEnd: "20px", paddingBlockEnd: "30px", paddingInlineStart: "40px"}} />',
            errors: [{messageId: "preferLogicalPaddingShorthand"}],
        },
        {
            code: '<div style={{margin: "1px 2px 3px 4px"}} />',
            output: '<div style={{marginBlockStart: "1px", marginInlineEnd: "2px", marginBlockEnd: "3px", marginInlineStart: "4px"}} />',
            errors: [{messageId: "preferLogicalMarginShorthand"}],
        },

        // --- StyleSheet.create({...}) detection ------------------------------
        {
            code: 'StyleSheet.create({foo: {marginLeft: "10px"}});',
            output: 'StyleSheet.create({foo: {marginInlineStart: "10px"}});',
            errors: [{messageId: "useLogicalProperty"}],
        },

        // --- Array-spread style={[...]} with multiple objects ----------------
        {
            code: '<div style={[{marginLeft: "10px"}, {paddingRight: "8px"}]} />',
            output: '<div style={[{marginInlineStart: "10px"}, {paddingInlineEnd: "8px"}]} />',
            errors: [
                {messageId: "useLogicalProperty"},
                {messageId: "useLogicalProperty"},
            ],
        },

        // --- Conditional expression inside array style -----------------------
        {
            code: '<div style={[cond ? {marginLeft: "10px"} : {marginRight: "10px"}]} />',
            output: '<div style={[cond ? {marginInlineStart: "10px"} : {marginInlineEnd: "10px"}]} />',
            errors: [
                {messageId: "useLogicalProperty"},
                {messageId: "useLogicalProperty"},
            ],
        },

        // --- Logical && inside array style -----------------------------------
        {
            code: '<div style={[cond && {marginLeft: "10px"}]} />',
            output: '<div style={[cond && {marginInlineStart: "10px"}]} />',
            errors: [{messageId: "useLogicalProperty"}],
        },

        // --- Nested object recursion (e.g., media-query keys) ----------------
        {
            code: 'StyleSheet.create({foo: {[mediaLarge]: {marginLeft: "10px"}}});',
            output: 'StyleSheet.create({foo: {[mediaLarge]: {marginInlineStart: "10px"}}});',
            errors: [{messageId: "useLogicalProperty"}],
        },

        // --- Top-level conditional expression in style={...} -----------------
        {
            code: '<div style={cond ? {marginLeft: "10px"} : null} />',
            output: '<div style={cond ? {marginInlineStart: "10px"} : null} />',
            errors: [{messageId: "useLogicalProperty"}],
        },
        {
            code: '<div style={cond ? null : {paddingRight: "8px"}} />',
            output: '<div style={cond ? null : {paddingInlineEnd: "8px"}} />',
            errors: [{messageId: "useLogicalProperty"}],
        },

        // --- Top-level logical && in style={...} -----------------------------
        {
            code: '<div style={cond && {marginLeft: "10px"}} />',
            output: '<div style={cond && {marginInlineStart: "10px"}} />',
            errors: [{messageId: "useLogicalProperty"}],
        },
    ],
});
