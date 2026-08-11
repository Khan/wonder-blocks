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

const ruleName = "no-rtl-icon-swap";
const rule = rules[ruleName];

ruleTester.run(ruleName, rule, {
    valid: [
        // LTR glyph only — PhosphorIcon mirrors in RTL.
        {code: "const icon = caretRightIcon;"},
        {code: "<PhosphorIcon icon={caretRightIcon} />"},

        // Ternary not gated on RTL.
        {code: "const icon = isExpanded ? caretDownIcon : caretRightIcon;"},
        {code: "const icon = disabled ? null : caretRightIcon;"},

        // RTL ternary with icons that are NOT on the whitelist.
        {code: "const icon = isRTL ? caretDownIcon : caretUpIcon;"},
        {code: "const icon = isRTL ? playIcon : pauseIcon;"},
        {code: "const icon = isRTL ? finishIconRTL : finishIcon;"},
        {
            code: "const icon = isRTL ? arrowUpRightIcon : arrowSquareOutIcon;",
        },

        // RTL ternary with non-icon values.
        {code: 'const dir = isRTL ? "rtl" : "ltr";'},
        {code: "const pad = isRTL ? 16 : 8;"},
    ],
    invalid: [
        {
            code: "const icon = isRTL ? caretLeftIcon : caretRightIcon;",
            errors: [
                {messageId: "noRtlIconSwap", data: {icon: "caretLeftIcon"}},
                {messageId: "noRtlIconSwap", data: {icon: "caretRightIcon"}},
            ],
        },
        {
            code: "const icon = RequestInfo.isRTL ? caretLeftIcon : caretRightIcon;",
            errors: [
                {messageId: "noRtlIconSwap", data: {icon: "caretLeftIcon"}},
                {messageId: "noRtlIconSwap", data: {icon: "caretRightIcon"}},
            ],
        },
        {
            code: "const icon = !isRTL ? arrowRight : arrowLeft;",
            errors: [
                {messageId: "noRtlIconSwap", data: {icon: "arrowRight"}},
                {messageId: "noRtlIconSwap", data: {icon: "arrowLeft"}},
            ],
        },
        {
            code: 'const icon = direction === "rtl" ? signInIcon : signOutIcon;',
            errors: [
                {messageId: "noRtlIconSwap", data: {icon: "signInIcon"}},
                {messageId: "noRtlIconSwap", data: {icon: "signOutIcon"}},
            ],
        },
        {
            code: "const icon = isRtl ? textIndentIcon : textOutdentIcon;",
            errors: [
                {messageId: "noRtlIconSwap", data: {icon: "textIndentIcon"}},
                {messageId: "noRtlIconSwap", data: {icon: "textOutdentIcon"}},
            ],
        },
        // One side is enough — still a double-flip risk for the whitelist glyph.
        {
            code: "const icon = isRTL ? caretRightIcon : null;",
            errors: [
                {messageId: "noRtlIconSwap", data: {icon: "caretRightIcon"}},
            ],
        },
        {
            code: "const icon = isRTL ? icons.caretLeft : icons.caretRight;",
            errors: [
                {messageId: "noRtlIconSwap", data: {icon: "caretLeft"}},
                {messageId: "noRtlIconSwap", data: {icon: "caretRight"}},
            ],
        },
        {
            code: "<PhosphorIcon icon={isRTL ? caretLeftIcon : caretRightIcon} />",
            errors: [
                {messageId: "noRtlIconSwap", data: {icon: "caretLeftIcon"}},
                {messageId: "noRtlIconSwap", data: {icon: "caretRightIcon"}},
            ],
        },
        {
            code: "const icon = isRTL ? paperPlaneIcon : paperPlaneTiltIcon;",
            errors: [
                {messageId: "noRtlIconSwap", data: {icon: "paperPlaneIcon"}},
                {
                    messageId: "noRtlIconSwap",
                    data: {icon: "paperPlaneTiltIcon"},
                },
            ],
        },
    ],
});
