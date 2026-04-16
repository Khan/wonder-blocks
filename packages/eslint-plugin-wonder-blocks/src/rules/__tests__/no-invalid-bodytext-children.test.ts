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
    // VALID — BodyText with phrasing content or appropriate tag prop     //
    // ------------------------------------------------------------------ //
    valid: [
        // Plain text is always fine
        {code: `<BodyText>Hello world</BodyText>`},

        // Inline HTML elements are phrasing content
        {code: `<BodyText><span>inline</span></BodyText>`},
        {code: `<BodyText><em>emphasis</em></BodyText>`},
        {code: `<BodyText><strong>bold</strong></BodyText>`},
        {code: `<BodyText><a href="#">link</a></BodyText>`},
        {code: `<BodyText><code>code</code></BodyText>`},
        {code: `<BodyText><sup>1</sup></BodyText>`},
        {code: `<BodyText><sub>2</sub></BodyText>`},

        // Block children are OK when BodyText uses a block container tag
        {code: `<BodyText tag="div"><div>block</div></BodyText>`},
        {code: `<BodyText tag="section"><p>paragraph</p></BodyText>`},
        {code: `<BodyText tag="article"><div>block</div></BodyText>`},

        // Children count at or below the default threshold of 5
        {
            code: `<BodyText><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span></BodyText>`,
        },

        // Children count at or below a custom threshold
        {
            code: `<BodyText><span>1</span><span>2</span></BodyText>`,
            options: [{maxChildren: 2}],
        },

        // Text nodes do not count toward the child element limit
        {
            code: `<BodyText>text <span>one</span> text <span>two</span> text <span>three</span> text <span>four</span> text <span>five</span> text</BodyText>`,
        },

        // Block elements are OK when BodyText has an inline tag
        // (BodyText still renders inline, so HTML validity depends on context,
        // but no block children to report here)
        {code: `<BodyText tag="span"><em>fine</em></BodyText>`},

        // Expression containers are not counted as element children
        {
            code: `<BodyText>{value}<span>label</span></BodyText>`,
        },
    ],

    // ------------------------------------------------------------------ //
    // INVALID — block-level children or too many children                //
    // ------------------------------------------------------------------ //
    invalid: [
        // --- View is always a block-level child ---
        {
            code: `<BodyText><View>layout</View></BodyText>`,
            errors: [{messageId: "viewChild"}],
        },
        {
            code: `<BodyText tag="div"><View>layout</View></BodyText>`,
            errors: [{messageId: "viewChild"}],
        },
        {
            code: `<BodyText tag="span"><View>layout</View></BodyText>`,
            errors: [{messageId: "viewChild"}],
        },

        // --- HTML block elements inside default BodyText (<p>) ---
        {
            code: `<BodyText><div>block</div></BodyText>`,
            errors: [{messageId: "blockChild", data: {childName: "div"}}],
        },
        {
            code: `<BodyText><p>paragraph</p></BodyText>`,
            errors: [{messageId: "blockChild", data: {childName: "p"}}],
        },
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
                {
                    messageId: "blockChild",
                    data: {childName: "blockquote"},
                },
            ],
        },
        {
            code: `<BodyText><pre>code</pre></BodyText>`,
            errors: [{messageId: "blockChild", data: {childName: "pre"}}],
        },

        // --- HTML heading elements inside default BodyText ---
        {
            code: `<BodyText><h1>Heading</h1></BodyText>`,
            errors: [{messageId: "blockChild", data: {childName: "h1"}}],
        },
        {
            code: `<BodyText><h2>Heading</h2></BodyText>`,
            errors: [{messageId: "blockChild", data: {childName: "h2"}}],
        },

        // --- WB Heading components inside default BodyText ---
        {
            code: `<BodyText><Heading>Title</Heading></BodyText>`,
            errors: [{messageId: "blockChild", data: {childName: "Heading"}}],
        },
        {
            code: `<BodyText><HeadingLarge>Title</HeadingLarge></BodyText>`,
            errors: [
                {
                    messageId: "blockChild",
                    data: {childName: "HeadingLarge"},
                },
            ],
        },

        // --- Block children also flagged when BodyText has tag="p" ---
        {
            code: `<BodyText tag="p"><div>block</div></BodyText>`,
            errors: [{messageId: "blockChild", data: {childName: "div"}}],
        },

        // --- Block children also flagged when BodyText has an inline tag ---
        {
            code: `<BodyText tag="span"><div>block</div></BodyText>`,
            errors: [{messageId: "blockChild", data: {childName: "div"}}],
        },

        // --- Multiple block children each reported ---
        {
            code: `<BodyText><div>a</div><p>b</p></BodyText>`,
            errors: [
                {messageId: "blockChild", data: {childName: "div"}},
                {messageId: "blockChild", data: {childName: "p"}},
            ],
        },

        // --- Too many direct element children (default threshold: 5) ---
        {
            code: `<BodyText><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span></BodyText>`,
            errors: [
                {
                    messageId: "tooManyChildren",
                    data: {count: "6", max: "5"},
                },
            ],
        },

        // --- Custom threshold ---
        {
            code: `<BodyText><span>1</span><span>2</span><span>3</span></BodyText>`,
            options: [{maxChildren: 2}],
            errors: [
                {
                    messageId: "tooManyChildren",
                    data: {count: "3", max: "2"},
                },
            ],
        },

        // --- Block child + too many children both reported ---
        // tooManyChildren is on the BodyText opening element (earlier in
        // source), so it sorts before blockChild (on the child element).
        {
            code: `<BodyText><div>a</div><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span></BodyText>`,
            errors: [
                {
                    messageId: "tooManyChildren",
                    data: {count: "6", max: "5"},
                },
                {messageId: "blockChild", data: {childName: "div"}},
            ],
        },
    ],
});
