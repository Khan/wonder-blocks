/**
 * Tests for the no-invalid-bodytext-children ESLint rule.
 *
 * Uses ESLint's RuleTester to verify that the rule correctly flags block-level
 * elements and excessive children inside BodyText components.
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

const ruleName = "no-invalid-bodytext-children";
const rule = rules[ruleName];

ruleTester.run(ruleName, rule, {
    // ------------------------------------------------------------------ //
    // VALID — inline/phrasing-content children are always allowed;        //
    //         block children are fine when BodyText uses a block tag.     //
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

        // View with an inline tag is valid phrasing content inside <p>
        {code: `<BodyText><View tag="span">inline</View></BodyText>`},
        {code: `<BodyText><View tag="em">inline</View></BodyText>`},

        // View inside a block-container BodyText is valid HTML
        {code: `<BodyText tag="div"><View>layout</View></BodyText>`},
        {code: `<BodyText tag="section"><View>layout</View></BodyText>`},

        // BodyText-in-BodyText is handled entirely by no-invalid-bodytext-parent
        // (which also provides an autofix). No error from this rule.
        {code: `<BodyText><BodyText>nested</BodyText></BodyText>`},
        {code: `<BodyText tag="p"><BodyText>nested</BodyText></BodyText>`},
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
    // INVALID — block-level children inside a paragraph-rendering         //
    //           BodyText, or too many direct element children.            //
    // ------------------------------------------------------------------ //
    invalid: [
        // ---------------------------------------------------------------- //
        // View — flagged when it renders as a block element inside a       //
        //        phrasing-content BodyText                                 //
        // ---------------------------------------------------------------- //
        {
            // View defaults to <div> — invalid inside paragraph BodyText
            code: `<BodyText><View>layout</View></BodyText>`,
            errors: [
                {messageId: "viewChild", data: {tag: "div", outerTag: "p"}},
            ],
        },
        {
            // Explicit tag="div" on View is also invalid
            code: `<BodyText><View tag="div">layout</View></BodyText>`,
            errors: [
                {messageId: "viewChild", data: {tag: "div", outerTag: "p"}},
            ],
        },
        {
            // View with no tag is still invalid when outer BodyText renders as <span>
            code: `<BodyText tag="span"><View>layout</View></BodyText>`,
            errors: [
                {messageId: "viewChild", data: {tag: "div", outerTag: "span"}},
            ],
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
        {
            // Inline BodyText (span) also cannot contain <div>
            code: `<BodyText tag="span"><div>block</div></BodyText>`,
            errors: [{messageId: "divChild"}],
        },

        // ---------------------------------------------------------------- //
        // <p> nested inside a phrasing-content BodyText                    //
        // ---------------------------------------------------------------- //
        {
            code: `<BodyText><p>paragraph</p></BodyText>`,
            errors: [
                {
                    messageId: "paragraphChild",
                    data: {childName: "p", childNote: "", outerTag: "p"},
                },
            ],
        },
        {
            // Inline BodyText (em) also cannot contain <p>
            code: `<BodyText tag="em"><p>paragraph</p></BodyText>`,
            errors: [
                {
                    messageId: "paragraphChild",
                    data: {childName: "p", childNote: "", outerTag: "em"},
                },
            ],
        },
        // ---------------------------------------------------------------- //
        // Other block-level HTML elements                                  //
        // ---------------------------------------------------------------- //
        {
            code: `<BodyText><section>section</section></BodyText>`,
            errors: [
                {
                    messageId: "blockChild",
                    data: {childName: "section", outerTag: "p"},
                },
            ],
        },
        {
            code: `<BodyText><ul><li>item</li></ul></BodyText>`,
            errors: [
                {
                    messageId: "blockChild",
                    data: {childName: "ul", outerTag: "p"},
                },
            ],
        },
        {
            code: `<BodyText><ol><li>item</li></ol></BodyText>`,
            errors: [
                {
                    messageId: "blockChild",
                    data: {childName: "ol", outerTag: "p"},
                },
            ],
        },
        {
            code: `<BodyText><blockquote>quote</blockquote></BodyText>`,
            errors: [
                {
                    messageId: "blockChild",
                    data: {childName: "blockquote", outerTag: "p"},
                },
            ],
        },
        {
            code: `<BodyText><pre>code</pre></BodyText>`,
            errors: [
                {
                    messageId: "blockChild",
                    data: {childName: "pre", outerTag: "p"},
                },
            ],
        },
        {
            code: `<BodyText><h1>Heading</h1></BodyText>`,
            errors: [
                {
                    messageId: "blockChild",
                    data: {childName: "h1", outerTag: "p"},
                },
            ],
        },
        {
            code: `<BodyText><h2>Heading</h2></BodyText>`,
            errors: [
                {
                    messageId: "blockChild",
                    data: {childName: "h2", outerTag: "p"},
                },
            ],
        },

        // ---------------------------------------------------------------- //
        // WB Heading components (render as block-level headings)           //
        // ---------------------------------------------------------------- //
        {
            code: `<BodyText><Heading>Title</Heading></BodyText>`,
            errors: [
                {
                    messageId: "blockChild",
                    data: {childName: "Heading", outerTag: "p"},
                },
            ],
        },
        {
            code: `<BodyText><HeadingLarge>Title</HeadingLarge></BodyText>`,
            errors: [
                {
                    messageId: "blockChild",
                    data: {childName: "HeadingLarge", outerTag: "p"},
                },
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
                    data: {childName: "p", childNote: "", outerTag: "p"},
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
