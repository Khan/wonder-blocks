/**
 * Tests for the no-invalid-bodytext-children ESLint rule.
 *
 * Uses RuleTester to verify that the rule correctly flags block-level elements
 * and excessive children inside BodyText components.
 */
import {RuleTester} from "@typescript-eslint/rule-tester";
import noInvalidBodyTextChildren from "../no-invalid-bodytext-children";

const ruleTester = new RuleTester({
    languageOptions: {
        parserOptions: {
            ecmaVersion: 2020,
            ecmaFeatures: {jsx: true},
            sourceType: "module",
        },
    },
});

ruleTester.run("no-invalid-bodytext-children", noInvalidBodyTextChildren, {
    // ------------------------------------------------------------------ //
    // VALID                                                               //
    // ------------------------------------------------------------------ //
    valid: [
        // Plain text is always fine
        {code: `<BodyText>Hello world</BodyText>`},

        // Inline/phrasing-content HTML elements
        {code: `<BodyText><span>inline</span></BodyText>`},
        {code: `<BodyText><em>emphasis</em></BodyText>`},
        {code: `<BodyText><strong>bold</strong></BodyText>`},
        {code: `<BodyText><a href="#">link</a></BodyText>`},
        {code: `<BodyText><code>code</code></BodyText>`},
        {code: `<BodyText><sup>1</sup></BodyText>`},
        {code: `<BodyText><sub>2</sub></BodyText>`},

        // Block HTML children are OK when BodyText uses a block-container tag
        {code: `<BodyText tag="div"><div>block</div></BodyText>`},
        {code: `<BodyText tag="section"><p>paragraph</p></BodyText>`},
        {code: `<BodyText tag="article"><div>block</div></BodyText>`},

        // When BodyText has an inline tag the block-child checks do not apply
        // (the outer BodyText renders inline; invalid nesting is a parent-rule
        // concern, not a children concern).
        {code: `<BodyText tag="span"><div>block</div></BodyText>`},
        {code: `<BodyText tag="em"><p>paragraph</p></BodyText>`},

        // Inner BodyText with an inline tag is safe inside a default BodyText
        {
            code: `<BodyText><BodyText tag="span">inline</BodyText></BodyText>`,
        },

        // Expression containers are not counted as element children
        {code: `<BodyText>{value}<span>label</span></BodyText>`},

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
    ],

    // ------------------------------------------------------------------ //
    // INVALID                                                             //
    // ------------------------------------------------------------------ //
    invalid: [
        // ---------------------------------------------------------------- //
        // View — always flagged regardless of the outer BodyText tag        //
        // ---------------------------------------------------------------- //
        {
            code: `<BodyText><View>layout</View></BodyText>`,
            errors: [{messageId: "viewChild"}],
        },
        {
            // tag="span" does not exempt View
            code: `<BodyText tag="span"><View>layout</View></BodyText>`,
            errors: [{messageId: "viewChild"}],
        },
        {
            // tag="div" does not exempt View — BodyText is not a layout container
            code: `<BodyText tag="div"><View>layout</View></BodyText>`,
            errors: [{messageId: "viewChild"}],
        },

        // ---------------------------------------------------------------- //
        // <div> — specific message for documentation clarity               //
        // ---------------------------------------------------------------- //
        {
            code: `<BodyText><div>block</div></BodyText>`,
            errors: [{messageId: "divChild"}],
        },
        {
            // tag="p" also renders as <p>
            code: `<BodyText tag="p"><div>block</div></BodyText>`,
            errors: [{messageId: "divChild"}],
        },

        // ---------------------------------------------------------------- //
        // <p> and BodyText rendering as <p>                                //
        // ---------------------------------------------------------------- //
        {
            code: `<BodyText><p>paragraph</p></BodyText>`,
            errors: [
                {
                    messageId: "paragraphChild",
                    data: {childName: "p", childNote: ""},
                },
            ],
        },
        {
            // BodyText defaults to <p> — nesting two <p>s is invalid HTML
            code: `<BodyText><BodyText>nested</BodyText></BodyText>`,
            errors: [
                {
                    messageId: "paragraphChild",
                    data: {
                        childName: "BodyText",
                        childNote: " (BodyText also renders as <p> by default)",
                    },
                },
            ],
        },
        {
            // Outer BodyText with tag="p" + inner default BodyText
            code: `<BodyText tag="p"><BodyText>nested</BodyText></BodyText>`,
            errors: [
                {
                    messageId: "paragraphChild",
                    data: {
                        childName: "BodyText",
                        childNote: " (BodyText also renders as <p> by default)",
                    },
                },
            ],
        },

        // ---------------------------------------------------------------- //
        // Other block-level HTML elements                                  //
        // ---------------------------------------------------------------- //
        {
            code: `<BodyText><section>section</section></BodyText>`,
            errors: [{messageId: "blockChild", data: {childName: "section"}}],
        },
        {
            code: `<BodyText><ul><li>item</li></ul></BodyText>`,
            errors: [{messageId: "blockChild", data: {childName: "ul"}}],
        },
        {
            code: `<BodyText><ol><li>item</li></ol></BodyText>`,
            errors: [{messageId: "blockChild", data: {childName: "ol"}}],
        },
        {
            code: `<BodyText><blockquote>quote</blockquote></BodyText>`,
            errors: [
                {messageId: "blockChild", data: {childName: "blockquote"}},
            ],
        },
        {
            code: `<BodyText><pre>code</pre></BodyText>`,
            errors: [{messageId: "blockChild", data: {childName: "pre"}}],
        },
        {
            code: `<BodyText><h1>Heading</h1></BodyText>`,
            errors: [{messageId: "blockChild", data: {childName: "h1"}}],
        },
        {
            code: `<BodyText><h2>Heading</h2></BodyText>`,
            errors: [{messageId: "blockChild", data: {childName: "h2"}}],
        },

        // ---------------------------------------------------------------- //
        // WB Heading components (render as block-level headings)           //
        // ---------------------------------------------------------------- //
        {
            code: `<BodyText><Heading>Title</Heading></BodyText>`,
            errors: [{messageId: "blockChild", data: {childName: "Heading"}}],
        },
        {
            code: `<BodyText><HeadingLarge>Title</HeadingLarge></BodyText>`,
            errors: [
                {messageId: "blockChild", data: {childName: "HeadingLarge"}},
            ],
        },

        // ---------------------------------------------------------------- //
        // Multiple block children — each reported independently            //
        // ---------------------------------------------------------------- //
        {
            code: `<BodyText><div>a</div><p>b</p></BodyText>`,
            errors: [
                {messageId: "divChild"},
                {
                    messageId: "paragraphChild",
                    data: {childName: "p", childNote: ""},
                },
            ],
        },

        // ---------------------------------------------------------------- //
        // Too many direct element children                                 //
        // ---------------------------------------------------------------- //
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
        {
            // Block child + too many children both reported.
            // tooManyChildren is on the BodyText opening element (earlier in
            // source) so it sorts before divChild (on the <div> element).
            code: `<BodyText><div>a</div><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span></BodyText>`,
            errors: [
                {
                    messageId: "tooManyChildren",
                    data: {count: "6", max: "5"},
                },
                {messageId: "divChild"},
            ],
        },
    ],
});
