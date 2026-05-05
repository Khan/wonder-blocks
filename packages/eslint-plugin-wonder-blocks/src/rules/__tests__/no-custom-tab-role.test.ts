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

const ruleName = "no-custom-tab-role";
const rule = rules[ruleName];

ruleTester.run(ruleName, rule, {
    valid: [{code: '<div role="button" />'}],
    invalid: [
        {
            code: '<div role="tab" />',
            errors: [{messageId: "noCustomTabRole"}],
        },
        {
            code: '<button role="tab" />',
            errors: [{messageId: "noCustomTabRole"}],
        },
        {
            code: '<ul role="tablist"><li role="tab">Tab 1</li></ul>',
            errors: [{messageId: "noCustomTabRole"}],
        },
        {
            code: '<StyledUl role="tablist"><StyledLi role="tab">Tab 1</StyledLi></StyledUl>',
            errors: [{messageId: "noCustomTabRole"}],
        },
        {
            code: '<Button role="tab">Tab 1</Button>',
            errors: [{messageId: "noCustomTabRole"}],
        },
        {
            code: '<Clickable role="tab">Tab 1</Clickable>',
            errors: [{messageId: "noCustomTabRole"}],
        },
        {
            code: '<View role="tab">Tab 1</View>',
            errors: [{messageId: "noCustomTabRole"}],
        },
    ],
});
