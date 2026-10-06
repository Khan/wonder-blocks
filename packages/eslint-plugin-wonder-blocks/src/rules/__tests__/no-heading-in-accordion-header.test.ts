/**
 * Tests for the no-heading-in-accordion-header ESLint rule.
 *
 * Uses ESLint's RuleTester to verify that the rule flags heading elements and
 * heading components passed to AccordionSection's `header` prop, while leaving
 * the inline content that belongs there alone.
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

const ruleName = "no-heading-in-accordion-header";
const rule = rules[ruleName];

ruleTester.run(ruleName, rule, {
    // ------------------------------------------------------------------ //
    // VALID — strings, inline content, and layout wrappers. The heading   //
    //         level belongs on the `tag` prop, not in the content.        //
    // ------------------------------------------------------------------ //
    valid: [
        // A plain string header is the common case
        {code: `<AccordionSection header="First section" />`},
        {code: `<AccordionSection header="First section" tag="h3" />`},
        {code: `<AccordionSection header={title} />`},

        // Inline typography is the recommended alternative to a heading
        {
            code: `<AccordionSection header={<BodyText tag="span">Title</BodyText>} />`,
        },
        {
            code: `<AccordionSection header={<BodyText tag="span" weight="bold">Title</BodyText>} />`,
        },

        // View is block content, but it is not a heading — the accordion's
        // own "React Element in Header" story relies on this being allowed.
        {
            code: `<AccordionSection header={<View><BodyText tag="span">Title</BodyText></View>} />`,
        },
        {
            code: `<AccordionSection header={<DetailCell title="Header for article item" horizontalRule="none" />} />`,
        },
        {code: `<AccordionSection header={<View role="presentation" />} />`},

        // Non-heading `tag` values
        {
            code: `<AccordionSection header={<View tag="section">Title</View>} />`,
        },
        {code: `<AccordionSection header={<Text tag="span">Title</Text>} />`},
        // A dynamic tag can't be resolved statically, so it isn't flagged
        {
            code: `<AccordionSection header={<BodyText tag={tag}>Title</BodyText>} />`,
        },

        // Icons and other inline decorations
        {
            code: `<AccordionSection header={<><PhosphorIcon icon={icon} /><BodyText tag="span">Title</BodyText></>} />`,
        },

        // Headings elsewhere on AccordionSection are not this rule's concern
        {
            code: `<AccordionSection header="Title"><h3>In the panel</h3></AccordionSection>`,
        },
        {
            code: `<AccordionSection header="Title" footer={<h3>Elsewhere</h3>} />`,
        },

        // A `header` prop on some other component is unconstrained
        {code: `<SomeOtherComponent header={<h3>Title</h3>} />`},
        {code: `<Card header={<Heading>Title</Heading>} />`},
    ],

    // ------------------------------------------------------------------ //
    // INVALID — anything that renders heading semantics inside the        //
    //           heading-wrapped <button> AccordionSection already makes.  //
    // ------------------------------------------------------------------ //
    invalid: [
        // ---------------------------------------------------------------- //
        // Raw HTML heading elements                                        //
        // ---------------------------------------------------------------- //
        {
            code: `<AccordionSection header={<h1>Title</h1>} />`,
            errors: [{messageId: "headingElementInHeader", data: {name: "h1"}}],
        },
        {
            code: `<AccordionSection header={<h3>Title</h3>} />`,
            errors: [{messageId: "headingElementInHeader", data: {name: "h3"}}],
        },
        {
            code: `<AccordionSection header={<h6>Title</h6>} />`,
            errors: [{messageId: "headingElementInHeader", data: {name: "h6"}}],
        },
        {
            // addStyle("h3") wrappers are heading elements too
            code: `<AccordionSection header={<StyledH3>Title</StyledH3>} />`,
            errors: [
                {
                    messageId: "headingElementInHeader",
                    data: {name: "StyledH3"},
                },
            ],
        },

        // ---------------------------------------------------------------- //
        // Wonder Blocks heading components                                 //
        // ---------------------------------------------------------------- //
        {
            code: `<AccordionSection header={<Heading>Title</Heading>} />`,
            errors: [
                {
                    messageId: "headingComponentInHeader",
                    data: {name: "Heading"},
                },
            ],
        },
        {
            code: `<AccordionSection header={<Heading size="medium" tag="h3">Title</Heading>} />`,
            errors: [
                {
                    messageId: "headingComponentInHeader",
                    data: {name: "Heading"},
                },
            ],
        },
        {
            code: `<AccordionSection header={<HeadingSmall>Title</HeadingSmall>} />`,
            errors: [
                {
                    messageId: "headingComponentInHeader",
                    data: {name: "HeadingSmall"},
                },
            ],
        },

        // ---------------------------------------------------------------- //
        // Heading level supplied via a `tag` prop                          //
        // ---------------------------------------------------------------- //
        {
            code: `<AccordionSection header={<BodyText tag="h1">Title</BodyText>} />`,
            errors: [
                {
                    messageId: "headingTagInHeader",
                    data: {name: "BodyText", tag: "h1"},
                },
            ],
        },
        {
            code: `<AccordionSection header={<View tag="h2">Title</View>} />`,
            errors: [
                {
                    messageId: "headingTagInHeader",
                    data: {name: "View", tag: "h2"},
                },
            ],
        },
        {
            code: `<AccordionSection header={<Text tag="h6">Title</Text>} />`,
            errors: [
                {
                    messageId: "headingTagInHeader",
                    data: {name: "Text", tag: "h6"},
                },
            ],
        },
        {
            code: `<AccordionSection header={<BodyMonospace tag="h3">Title</BodyMonospace>} />`,
            errors: [
                {
                    messageId: "headingTagInHeader",
                    data: {name: "BodyMonospace", tag: "h3"},
                },
            ],
        },
        {
            // Nested inside other markup
            code: `<AccordionSection header={<View><BodyText tag="h4">Title</BodyText></View>} />`,
            errors: [
                {
                    messageId: "headingTagInHeader",
                    data: {name: "BodyText", tag: "h4"},
                },
            ],
        },

        // ---------------------------------------------------------------- //
        // Explicit heading role                                            //
        // ---------------------------------------------------------------- //
        {
            code: `<AccordionSection header={<View role="heading" aria-level={3}>Title</View>} />`,
            errors: [{messageId: "roleHeadingInHeader"}],
        },
        {
            code: `<AccordionSection header={<div role="heading">Title</div>} />`,
            errors: [{messageId: "roleHeadingInHeader"}],
        },

        // ---------------------------------------------------------------- //
        // Nested inside other markup — the walk is not depth-limited       //
        // ---------------------------------------------------------------- //
        {
            code: `<AccordionSection header={<View><h3>Title</h3></View>} />`,
            errors: [{messageId: "headingElementInHeader", data: {name: "h3"}}],
        },
        {
            code: `<AccordionSection header={<View><PhosphorIcon icon={icon} /><Heading>Title</Heading></View>} />`,
            errors: [
                {
                    messageId: "headingComponentInHeader",
                    data: {name: "Heading"},
                },
            ],
        },
        {
            // Fragments
            code: `<AccordionSection header={<><Icon /><h2>Title</h2></>} />`,
            errors: [{messageId: "headingElementInHeader", data: {name: "h2"}}],
        },
        {
            // Conditionals
            code: `<AccordionSection header={isOpen ? <h3>Open</h3> : <h3>Closed</h3>} />`,
            errors: [
                {messageId: "headingElementInHeader", data: {name: "h3"}},
                {messageId: "headingElementInHeader", data: {name: "h3"}},
            ],
        },

        // ---------------------------------------------------------------- //
        // Several problems in one header                                   //
        // ---------------------------------------------------------------- //
        {
            code: `<AccordionSection header={<View><h3>Title</h3><Heading>Subtitle</Heading></View>} />`,
            errors: [
                {messageId: "headingElementInHeader", data: {name: "h3"}},
                {
                    messageId: "headingComponentInHeader",
                    data: {name: "Heading"},
                },
            ],
        },
    ],
});
