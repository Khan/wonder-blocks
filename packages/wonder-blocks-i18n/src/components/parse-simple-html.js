// @flow
/**
 * Simple parser for a subset of HTML.
 *
 * This is an internal function intended to be used by I18nInlineMarkup.
 */

export type Tag = {|
    type: "tag",
    tag: string,
    children: string | null,
|};

export type Text = {|
    type: "text",
    text: string,
|};

export type SimpleHtmlNode = Tag | Text;

function parseSimpleHTML(html: string): $ReadOnlyArray<SimpleHtmlNode> {
    // This is a regex that can capture the following kinds of things:
    //  - self-closing tags: (e.g., <myimg />)
    //  - non self-closing tags. This regex captures an opening tag, and the
    //    next tag (regardless of whether it is opening, closing, or
    //    self-closing). We make sure, later in this function, that the second
    //    tag is a closing tag of the same type as the opening tag.
    //  - text (i.e., parts of the string that aren't tags).
    //
    // NOTE: Don't move simpleHtmlRegex out of this function. Regexes are
    // stateful when used with `exec`, so we need to recreate it every time
    // parseSimpleHTML is called.
    //
    // TODO(joshuan): This would be a great opportunity for named captures.
    // If those are ever implemented in browsers we care about, this should
    // be rewritten to use them.
    const simpleHtmlRegex =
        /(<([^>^/]+)\s*\/>)|(<([^>]+)>([^<]*)<(\/?)([^>]+)>)|([^<]+)/gm;
    // simpleHtmlRegex has numbered captures. The following are names for those
    // captures. If you ever need to modify the above regex and need to
    // figure out what the new capture numbers are, https://regex101.com
    // must be helpful.
    const SELF_CLOSE_NAME = 2;
    const OPEN_NAME = 4;
    const CHILDREN = 5;
    const CLOSING_SLASH = 6;
    const CLOSING_NAME = 7;
    const TEXT = 8;

    html = html.trim();

    const result = [];

    let match;
    while ((match = simpleHtmlRegex.exec(html))) {
        if (match[SELF_CLOSE_NAME] != null) {
            const tag = match[SELF_CLOSE_NAME].trim();
            if (tag.includes(" ")) {
                throw new Error(
                    "I18nInlineMarkup: expected a tag without " +
                        "attributes, but received: " +
                        `<${tag}/>`,
                );
            }
            result.push({
                type: "tag",
                tag,
                children: null,
            });
        } else if (match[OPEN_NAME] != null) {
            const tag = match[OPEN_NAME].trim();
            if (tag.includes(" ")) {
                throw new Error(
                    "I18nInlineMarkup: expected a tag without " +
                        "attributes, but received: " +
                        `<${match[OPEN_NAME]}>`,
                );
            }

            if (match[CLOSING_SLASH] !== "/") {
                throw new Error(
                    `I18nInlineMarkup: nested tags are not ` +
                        `supported, but <${match[CLOSING_NAME]}> is nested underneath ` +
                        `<${tag}>.`,
                );
            }

            const closingTag = match[CLOSING_NAME].trim();
            if (tag !== closingTag) {
                throw new Error(
                    `I18nInlineMarkup: expected closing tag ` +
                        `</${match[4]}>, but got </${match[7]}>`,
                );
            }
            result.push({
                type: "tag",
                tag,
                children: match[CHILDREN],
            });
        } else if (match[TEXT] != null) {
            result.push({
                type: "text",
                text: match[TEXT],
            });
        } else {
            throw new Error(
                "I18nInlineMarkup: unknown error (maybe you have an extra '<')?",
            );
        }
    }

    if (
        result.length === 1 &&
        // A tag is allowed to wrap all NL text in the html.
        (result[0].type === "text" || !result[0].children)
    ) {
        throw new Error("Unnecessary use of I18nInlineMarkup.");
    }
    return result;
}

export default parseSimpleHTML;
