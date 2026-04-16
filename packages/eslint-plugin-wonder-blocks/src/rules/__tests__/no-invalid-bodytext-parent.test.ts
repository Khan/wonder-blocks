/**
 * Tests for the no-invalid-bodytext-parent ESLint rule.
 *
 * Uses ESLint's RuleTester to verify that the rule correctly flags BodyText
 * components nested inside elements that cannot contain block-level content,
 * and that the auto-fix correctly adds tag="span".
 */
import {RuleTester} from "@typescript-eslint/rule-tester";
import noInvalidBodyTextParent from "../no-invalid-bodytext-parent";

const ruleTester = new RuleTester({
    languageOptions: {
        parserOptions: {
            ecmaVersion: 2020,
            ecmaFeatures: {jsx: true},
            sourceType: "module",
        },
    },
});

ruleTester.run("no-invalid-bodytext-parent", noInvalidBodyTextParent, {
    // ------------------------------------------------------------------ //
    // VALID — BodyText with an inline tag is allowed everywhere;          //
    //         BodyText without a tag is fine in non-restricted contexts.  //
    // ------------------------------------------------------------------ //
    valid: [
        // Standalone BodyText — no parent context at all
        {code: `<BodyText>Hello</BodyText>`},

        // BodyText inside plain block containers
        {code: `<div><BodyText>Hello</BodyText></div>`},
        {code: `<section><BodyText>Hello</BodyText></section>`},
        {code: `<article><BodyText>Hello</BodyText></article>`},

        // BodyText with an inline tag inside WB form components
        {
            code: `<Choice label={<BodyText tag="span">Title</BodyText>} />`,
        },
        {
            code: `<Checkbox label={<BodyText tag="span">Label</BodyText>} />`,
        },
        {
            code: `<Radio label={<BodyText tag="span">Label</BodyText>} />`,
        },

        // BodyText with an inline tag inside WB Button
        {code: `<Button><BodyText tag="span">Click</BodyText></Button>`},
        {
            code: `<ActivityButton><BodyText tag="span">Click</BodyText></ActivityButton>`,
        },

        // BodyText with an inline tag inside HTML button / StyledButton
        {code: `<button><BodyText tag="span">Click</BodyText></button>`},
        {
            code: `<StyledButton><BodyText tag="span">Click</BodyText></StyledButton>`,
        },

        // BodyText with an inline tag inside HTML p / StyledP
        {code: `<p><BodyText tag="span">Inline text</BodyText></p>`},
        {
            code: `<StyledP><BodyText tag="span">Inline text</BodyText></StyledP>`,
        },

        // BodyText with an inline tag inside HTML label / StyledLabel
        {code: `<label><BodyText tag="span">Label text</BodyText></label>`},
        {
            code: `<StyledLabel><BodyText tag="span">Label text</BodyText></StyledLabel>`,
        },

        // BodyText with an inline tag inside another BodyText
        {
            code: `<BodyText><BodyText tag="span">Inline nested</BodyText></BodyText>`,
        },

        // Inner BodyText (no inline tag) inside outer BodyText with a
        // block-container tag — the outer renders as a div, which can
        // contain <p> elements.
        {
            code: `<BodyText tag="div"><BodyText>Nested para</BodyText></BodyText>`,
        },
        {
            code: `<BodyText tag="section"><BodyText>Nested para</BodyText></BodyText>`,
        },
        {
            code: `<BodyText tag="article"><BodyText>Nested para</BodyText></BodyText>`,
        },

        // BodyText with an inline tag inside WB Heading components
        {
            code: `<Heading><BodyText tag="sup">Superscript</BodyText></Heading>`,
        },
        {
            code: `<HeadingLarge><BodyText tag="span">Sub</BodyText></HeadingLarge>`,
        },
        {
            code: `<HeadingMedium><BodyText tag="code">Code</BodyText></HeadingMedium>`,
        },

        // BodyText with an inline tag inside HTML heading elements
        {code: `<h1><BodyText tag="sup">Sup</BodyText></h1>`},
        {code: `<h2><BodyText tag="span">Sub</BodyText></h2>`},

        // BodyText with other inline tag variants
        {code: `<button><BodyText tag="code">Code</BodyText></button>`},
        {code: `<label><BodyText tag="strong">Bold</BodyText></label>`},
        {code: `<p><BodyText tag="em">Emphasis</BodyText></p>`},

        // BodyText deeper inside a non-restricted wrapper that itself is
        // inside a restricted element — only the direct parent is checked.
        {
            code: `<button><div><BodyText>Nested deeper</BodyText></div></button>`,
        },

        // BodyText with multiple props, including an inline tag
        {
            code: `<Choice label={<BodyText size="small" weight="bold" tag="span">Title</BodyText>} />`,
        },
    ],

    // ------------------------------------------------------------------ //
    // INVALID — BodyText without an inline tag inside restricted parents  //
    // ------------------------------------------------------------------ //
    invalid: [
        // --- WB Form: Choice ---
        {
            code: `<Choice label={<BodyText>Title</BodyText>} />`,
            errors: [
                {
                    messageId: "nestedInFormComponent",
                    data: {componentName: "Choice"},
                },
            ],
            output: `<Choice label={<BodyText tag="span">Title</BodyText>} />`,
        },
        {
            code: `<Choice description={<BodyText>Description</BodyText>} />`,
            errors: [
                {
                    messageId: "nestedInFormComponent",
                    data: {componentName: "Choice"},
                },
            ],
            output: `<Choice description={<BodyText tag="span">Description</BodyText>} />`,
        },
        // BodyText with other props but no tag inside Choice
        {
            code: `<Choice label={<BodyText size="small" weight="bold">Title</BodyText>} />`,
            errors: [
                {
                    messageId: "nestedInFormComponent",
                    data: {componentName: "Choice"},
                },
            ],
            output: `<Choice label={<BodyText size="small" weight="bold" tag="span">Title</BodyText>} />`,
        },
        // Self-closing BodyText inside Choice
        {
            code: `<Choice label={<BodyText />} />`,
            errors: [
                {
                    messageId: "nestedInFormComponent",
                    data: {componentName: "Choice"},
                },
            ],
            output: `<Choice label={<BodyText tag="span" />} />`,
        },

        // --- WB Form: Checkbox ---
        {
            code: `<Checkbox label={<BodyText>Label</BodyText>} />`,
            errors: [
                {
                    messageId: "nestedInFormComponent",
                    data: {componentName: "Checkbox"},
                },
            ],
            output: `<Checkbox label={<BodyText tag="span">Label</BodyText>} />`,
        },

        // --- WB Form: Radio ---
        {
            code: `<Radio label={<BodyText>Label</BodyText>} />`,
            errors: [
                {
                    messageId: "nestedInFormComponent",
                    data: {componentName: "Radio"},
                },
            ],
            output: `<Radio label={<BodyText tag="span">Label</BodyText>} />`,
        },

        // --- WB Button ---
        {
            code: `<Button><BodyText>Click me</BodyText></Button>`,
            errors: [{messageId: "nestedInButton"}],
            output: `<Button><BodyText tag="span">Click me</BodyText></Button>`,
        },
        {
            code: `<ActivityButton><BodyText>Click me</BodyText></ActivityButton>`,
            errors: [{messageId: "nestedInButton"}],
            output: `<ActivityButton><BodyText tag="span">Click me</BodyText></ActivityButton>`,
        },

        // --- HTML <button> ---
        {
            code: `<button><BodyText>Click me</BodyText></button>`,
            errors: [{messageId: "nestedInButton"}],
            output: `<button><BodyText tag="span">Click me</BodyText></button>`,
        },

        // --- StyledButton ---
        {
            code: `<StyledButton><BodyText>Click me</BodyText></StyledButton>`,
            errors: [{messageId: "nestedInButton"}],
            output: `<StyledButton><BodyText tag="span">Click me</BodyText></StyledButton>`,
        },

        // --- HTML <p> ---
        {
            code: `<p><BodyText>Paragraph text</BodyText></p>`,
            errors: [{messageId: "nestedInParagraph"}],
            output: `<p><BodyText tag="span">Paragraph text</BodyText></p>`,
        },

        // --- StyledP ---
        {
            code: `<StyledP><BodyText>Paragraph text</BodyText></StyledP>`,
            errors: [{messageId: "nestedInParagraph"}],
            output: `<StyledP><BodyText tag="span">Paragraph text</BodyText></StyledP>`,
        },

        // --- HTML <label> ---
        {
            code: `<label><BodyText>Label text</BodyText></label>`,
            errors: [{messageId: "nestedInLabel"}],
            output: `<label><BodyText tag="span">Label text</BodyText></label>`,
        },

        // --- StyledLabel ---
        {
            code: `<StyledLabel><BodyText>Label text</BodyText></StyledLabel>`,
            errors: [{messageId: "nestedInLabel"}],
            output: `<StyledLabel><BodyText tag="span">Label text</BodyText></StyledLabel>`,
        },

        // --- BodyText nested in BodyText (both default to <p>) ---
        {
            code: `<BodyText><BodyText>Nested</BodyText></BodyText>`,
            errors: [{messageId: "nestedInBodyText"}],
            output: `<BodyText><BodyText tag="span">Nested</BodyText></BodyText>`,
        },
        // Outer has explicit tag="p"
        {
            code: `<BodyText tag="p"><BodyText>Nested</BodyText></BodyText>`,
            errors: [{messageId: "nestedInBodyText"}],
            output: `<BodyText tag="p"><BodyText tag="span">Nested</BodyText></BodyText>`,
        },
        // Outer has an inline tag — also invalid (inline element can't contain <p>)
        {
            code: `<BodyText tag="span"><BodyText>Nested</BodyText></BodyText>`,
            errors: [{messageId: "nestedInBodyText"}],
            output: `<BodyText tag="span"><BodyText tag="span">Nested</BodyText></BodyText>`,
        },
        // Inner BodyText with an explicit block tag is still a block element;
        // the fix replaces the existing non-inline tag value.
        {
            code: `<BodyText><BodyText tag="div">Block</BodyText></BodyText>`,
            errors: [{messageId: "nestedInBodyText"}],
            output: `<BodyText><BodyText tag="span">Block</BodyText></BodyText>`,
        },

        // --- WB Heading ---
        {
            code: `<Heading><BodyText>Sub text</BodyText></Heading>`,
            errors: [{messageId: "nestedInHeading"}],
            output: `<Heading><BodyText tag="span">Sub text</BodyText></Heading>`,
        },
        {
            code: `<HeadingLarge><BodyText>Sub text</BodyText></HeadingLarge>`,
            errors: [{messageId: "nestedInHeading"}],
            output: `<HeadingLarge><BodyText tag="span">Sub text</BodyText></HeadingLarge>`,
        },
        {
            code: `<HeadingMedium><BodyText>Sub text</BodyText></HeadingMedium>`,
            errors: [{messageId: "nestedInHeading"}],
            output: `<HeadingMedium><BodyText tag="span">Sub text</BodyText></HeadingMedium>`,
        },
        {
            code: `<HeadingSmall><BodyText>Sub text</BodyText></HeadingSmall>`,
            errors: [{messageId: "nestedInHeading"}],
            output: `<HeadingSmall><BodyText tag="span">Sub text</BodyText></HeadingSmall>`,
        },
        {
            code: `<HeadingXSmall><BodyText>Sub text</BodyText></HeadingXSmall>`,
            errors: [{messageId: "nestedInHeading"}],
            output: `<HeadingXSmall><BodyText tag="span">Sub text</BodyText></HeadingXSmall>`,
        },

        // --- HTML heading elements ---
        {
            code: `<h1><BodyText>Sub text</BodyText></h1>`,
            errors: [{messageId: "nestedInHeading"}],
            output: `<h1><BodyText tag="span">Sub text</BodyText></h1>`,
        },
        {
            code: `<h2><BodyText>Sub text</BodyText></h2>`,
            errors: [{messageId: "nestedInHeading"}],
            output: `<h2><BodyText tag="span">Sub text</BodyText></h2>`,
        },
        {
            code: `<h6><BodyText>Sub text</BodyText></h6>`,
            errors: [{messageId: "nestedInHeading"}],
            output: `<h6><BodyText tag="span">Sub text</BodyText></h6>`,
        },

        // --- BodyText with a non-inline tag is still invalid in restricted
        //     parents; the fix replaces the existing tag value. ---
        {
            code: `<label><BodyText tag="p">Text</BodyText></label>`,
            errors: [{messageId: "nestedInLabel"}],
            output: `<label><BodyText tag="span">Text</BodyText></label>`,
        },
        {
            code: `<Button><BodyText tag="div">Text</BodyText></Button>`,
            errors: [{messageId: "nestedInButton"}],
            output: `<Button><BodyText tag="span">Text</BodyText></Button>`,
        },

        // --- Dynamic tag expression: error is reported but no autofix is
        //     applied, since replacing the expression would silently destroy
        //     the developer's conditional logic. ---
        {
            code: `<label><BodyText tag={isLabel ? "span" : "code"}>Text</BodyText></label>`,
            errors: [{messageId: "nestedInLabel"}],
            output: null,
        },
        {
            code: `<Button><BodyText tag={getTag()}>Click</BodyText></Button>`,
            errors: [{messageId: "nestedInButton"}],
            output: null,
        },
    ],
});
