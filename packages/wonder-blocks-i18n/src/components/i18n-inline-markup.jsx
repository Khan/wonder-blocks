// @flow

/**
 * Render some HTML, using functions passed in as props to render tags.
 *
 * ADR: https://docs.google.com/document/d/15EP6E_nxrEhgb9jlR3v7S93S22E3KAH_XMqN2gBqyUQ/edit
 *
 * Why?
 * ====
 *
 * Sometimes strings that you want to translate have links, words that are
 * bolded, etc.
 *
 * Historically, developers have chopped up these strings into bits without
 * HTML and stitched them back together manually. This occasionally worked.
 * Other times, a bug prevented the strings from being translated. When they
 * were translatable, sometimes we'd get translations with mismatched verb
 * tenses or other grammatical errors. Developers sometimes gave up and
 * resorted to using dangerouslySetInnerHTML, which isn't great either -- it
 * gives volunteers the ability to add XSS and it doesn't allow us to use our
 * fancy client-side links.
 *
 * With <I18nInlineMarkup>, things are better. You pass in a full translated
 * string, with HTML tags. For every kind of tag in the child string, you also
 * pass in a function which, given children, renders that kind of tag.
 *
 * For example, here's one way you could use <I18nInlineMarkup> to render a
 * disclaimer about our terms and conditions and privacy policy.
 *
 * ```
 * <I18nInlineMarkup
 *     link1={node => <a href="/terms">{node}</a>}
 *     link2={node => <a href="/privacy">{node}</a>}
 *     link3={node => <a href="/gdpr">{node}</a>}
 * >
 *     {i18n._(
          "By existing, you agree to our <link1>terms and conditions</link1>" +
              "and <link2>privacy policy</link2>. If you are a resident " +
              "of the European Union, you have <link3>options</link3>.",
 *     )}
 * </I18nInlineMarkup>
 * ```
 *
 * Use
 * ===
 *
 * <I18nInlineMarkup> accepts a single HTML-like string as children. This
 * string must not have any HTML attributes or nested tags. You must pass in
 * a render prop for every kind of tag in this string.
 *
 * Any numeric or named HTML codes will be escaped. That is, if children
 * contains `&mdash;` or `&#8212`, the text `&mdash;` or `&#8212;` will
 * show up to the end user. Use unicode escape sequences (e.g., \u2014)
 * instead.
 *
 * Here's a trivial use of I18nInlineMarkup:
 *
 * ```
 * <I18nInlineMarkup b={node => <b>{node}</b>}>
 *   {i18n._("Some <b>markup</b>")}
 * </I18nInlineMarkup>
 * ```
 *
 * Note that `b` doesn't need to actually return a `<b>` tag. It could, for
 * example, return a Wonder Blocks Label instead.
 *
 * You can the same kind of tag multiple times:
 *
 * ```
 * <I18nInlineMarkup b={node => <b>{node}</b>}>
 *   {i18n._("Some <b>markup</b> that I <b>wrote</b>")}
 * </I18nInlineMarkup>
 * ```
 *
 * Since attributes aren't supported, if you want to support different props
 * on the same kind of component, use multiple tag names. See the first
 * example in this comment.
 */

import * as React from "react";

import parseSimpleHTML from "./parse-simple-html.js";
import type {SimpleHtmlNode} from "./parse-simple-html.js";

type Props = {|
    /**
     * A translated string.
     *
     * TODO(joshuan): if we ever add a type for translated strings, replace
     * "string" with that type.
     */
    children: string,
    /**
     * A function which takes each top-level text or rendered tag,
     * and returns an element that wraps it.
     *
     * `type` is "text" if the element is text, and a pseudotag, like
     * "newline", or "cirlced-box" otherwise.
     *
     * We use this on the LOHP and marketing pages to provide a
     * background around text when they are on top of an illustration.
     *
     * i is the index of the text or tag.
     */
    elementWrapper?: (s: React.Node, type: string, i: number) => React.Node,

    onError?: (e: Error) => React.Node,

    [tag: string]: (content: string) => React.Node,
|};

export default class I18nInlineMarkup extends React.PureComponent<Props> {
    render(): React.Node {
        const {children, elementWrapper, onError, ...renderers} = this.props;
        let tree: $ReadOnlyArray<SimpleHtmlNode>;
        try {
            tree = parseSimpleHTML(children);
        } catch (e) {
            if (onError) {
                return onError(e);
            } else {
                throw e;
            }
        }
        const nodes: Array<React.Node> = tree.map((node, i) => {
            if (node.type === "text") {
                if (elementWrapper) {
                    return (
                        <React.Fragment key={i}>
                            {elementWrapper(node.text, "text", i)}
                        </React.Fragment>
                    );
                }
                return node.text;
            }
            if (node.type === "tag") {
                const renderer = renderers[node.tag];
                if (!renderer) {
                    throw new Error(
                        `I18nInlineMarkup: missing render prop for ${node.tag}`,
                    );
                }
                if (elementWrapper) {
                    return (
                        <React.Fragment key={i}>
                            {elementWrapper(
                                /**
                                 * TODO(somewhatabstract, JIRA-XXXX):
                                 * node.children can be null but renderer does
                                 * not accept null.
                                 */
                                // $FlowFixMe[incompatible-call]
                                renderer(node.children),
                                node.tag,
                                i,
                            )}
                        </React.Fragment>
                    );
                }
                return (
                    <React.Fragment key={i}>
                        {
                            /**
                             * TODO(somewhatabstract, JIRA-XXXX):
                             * node.children can be null but renderer does
                             * not accept null.
                             */
                            // $FlowFixMe[incompatible-call]
                            renderer(node.children)
                        }
                    </React.Fragment>
                );
            }

            throw new Error("Unknown child type.");
        });
        return nodes;
    }
}
