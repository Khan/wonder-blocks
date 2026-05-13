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

        // Default options: warnShadows, warnGradients, warnDirectionalTransforms,
        // warnCursorDirections, warnBackgroundPositionXY are all OFF by default,
        // so these don't warn.
        {code: '<div style={{boxShadow: "4px 0 4px rgba(0,0,0,.2)"}} />'},
        {
            code: '<div style={{background: "linear-gradient(to bottom, red, blue)"}} />',
        },
        {code: '<div style={{transform: "translateX(10px)"}} />'},
        {code: '<div style={{cursor: "e-resize"}} />'},
        {code: '<div style={{backgroundPositionX: "left"}} />'},

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

        // --- backgroundPositionX/Y (off by default, requires option) ---------
        {
            code: '<div style={{backgroundPositionX: "right"}} />',
            options: [{warnBackgroundPositionXY: true}],
            errors: [{messageId: "avoidBackgroundPositionXYDirectional"}],
        },
        {
            code: '<div style={{backgroundPositionY: "top"}} />',
            options: [{warnBackgroundPositionXY: true}],
            errors: [{messageId: "avoidBackgroundPositionXYDirectional"}],
        },

        // --- gradient direction (off by default) -----------------------------
        // backgroundImage isolates the gradient warning (no directional-bg check
        // runs on backgroundImage).
        {
            code: '<div style={{backgroundImage: "linear-gradient(to left, red, blue)"}} />',
            options: [{warnGradients: true}],
            errors: [{messageId: "avoidGradientDirection"}],
        },
        // background shorthand with a directional gradient triggers BOTH the
        // directional-bg-position warning (left/right in the string) AND the
        // gradient warning — matches frontend's intended behavior.
        {
            code: '<div style={{background: "linear-gradient(to right, red, blue)"}} />',
            options: [{warnGradients: true}],
            errors: [
                {messageId: "avoidBackgroundDirectional"},
                {messageId: "avoidGradientDirection"},
            ],
        },

        // --- transform translateX / transformOrigin (off by default) ---------
        {
            code: '<div style={{transform: "translateX(10px)"}} />',
            options: [{warnDirectionalTransforms: true}],
            errors: [{messageId: "avoidTranslateXDirectional"}],
        },
        {
            code: '<div style={{transformOrigin: "left center"}} />',
            options: [{warnDirectionalTransforms: true}],
            errors: [{messageId: "avoidTransformOriginDirectional"}],
        },

        // --- shadow X-offset (off by default) --------------------------------
        {
            code: '<div style={{boxShadow: "4px 0 4px rgba(0,0,0,.2)"}} />',
            options: [{warnShadows: true}],
            errors: [{messageId: "avoidShadowDirectional"}],
        },
        {
            code: '<div style={{textShadow: "2px 0 1px #000"}} />',
            options: [{warnShadows: true}],
            errors: [{messageId: "avoidShadowDirectional"}],
        },

        // --- directional cursor (off by default) -----------------------------
        {
            code: '<div style={{cursor: "e-resize"}} />',
            options: [{warnCursorDirections: true}],
            errors: [{messageId: "avoidDirectionalCursor"}],
        },

        // --- padding / margin two-value shorthand auto-fix -------------------
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
