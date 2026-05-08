/**
 * Tests for the no-excessive-bodytext-children ESLint rule.
 *
 * Uses ESLint's RuleTester to verify that the rule correctly flags BodyText
 * components with more direct JSX element children than the configured
 * threshold.
 */
import {RuleTester} from "@typescript-eslint/rule-tester";

import {rules} from "..";

const ruleTester = new RuleTester({
    languageOptions: {
        parserOptions: {
            ecmaVersion: 2020,
            ecmaFeatures: {jsx: true},
            sourceType: "module",
        },
    },
});

const ruleName = "no-excessive-bodytext-children";
const rule = rules[ruleName];

ruleTester.run(ruleName, rule, {
    valid: [
        // Non-BodyText components are not checked
        {
            code: `<View><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span></View>`,
        },

        // At or below the default threshold of 5 element children
        {
            code: `<BodyText><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span></BodyText>`,
        },

        // At or below a custom threshold
        {
            code: `<BodyText><span>1</span><span>2</span></BodyText>`,
            options: [{maxChildren: 2}],
        },

        // Text nodes do not count toward the child-element limit
        {
            code: `<BodyText>text <span>one</span> text <span>two</span> text <span>three</span> text <span>four</span> text <span>five</span> text</BodyText>`,
        },

        // Expression containers do not count toward the child-element limit
        {code: `<BodyText>{value}<span>label</span></BodyText>`},
    ],

    invalid: [
        {
            code: `<BodyText><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span></BodyText>`,
            errors: [
                {
                    messageId: "tooManyChildren",
                    data: {count: "6", max: "5"},
                },
            ],
        },
        {
            // Custom threshold
            code: `<BodyText><span>1</span><span>2</span><span>3</span></BodyText>`,
            options: [{maxChildren: 2}],
            errors: [
                {
                    messageId: "tooManyChildren",
                    data: {count: "3", max: "2"},
                },
            ],
        },
    ],
});
