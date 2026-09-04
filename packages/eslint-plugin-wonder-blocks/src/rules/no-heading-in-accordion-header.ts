import {ESLintUtils, TSESTree} from "@typescript-eslint/utils";

import type {WonderBlocksPluginDocs} from "../types";
import {
    HEADING_TAG_REGEX,
    HTML_HEADING_ELEMENTS,
    WB_HEADING_COMPONENTS,
    forEachJSXOpeningElement,
    getAttributeStringValue,
} from "./jsx-utils";

const createRule = ESLintUtils.RuleCreator<WonderBlocksPluginDocs>(
    (name) =>
        `https://github.com/Khan/wonder-blocks/blob/main/packages/eslint-plugin-wonder-blocks/docs/${name}.md`,
);

type Options = [];
type MessageIds =
    | "headingElementInHeader"
    | "headingComponentInHeader"
    | "headingTagInHeader"
    | "roleHeadingInHeader";

// The fix is always the same, so every message ends with it.
const ADVICE =
    'Set the heading level with AccordionSection\'s `tag` prop instead, and use `<BodyText tag="span">` with `font.heading.*` tokens for heading-sized text.';

export default createRule<Options, MessageIds>({
    name: "no-heading-in-accordion-header",
    meta: {
        type: "problem",
        docs: {
            description:
                "Disallow heading elements and components inside AccordionSection's header prop",
            recommended: true,
        },
        schema: [],
        messages: {
            headingElementInHeader: `AccordionSection already wraps its header in a heading element containing a <button>, so <{{name}}> here produces nested headings inside a <button>, which is invalid HTML. ${ADVICE}`,
            headingComponentInHeader: `AccordionSection already wraps its header in a heading element containing a <button>, so {{name}} here produces nested headings inside a <button>, which is invalid HTML. ${ADVICE}`,
            headingTagInHeader: `{{name}} renders a <{{tag}}> element. AccordionSection already wraps its header in a heading element containing a <button>, so this produces nested headings inside a <button>, which is invalid HTML. ${ADVICE}`,
            roleHeadingInHeader: `AccordionSection already wraps its header in a heading element containing a <button>, so role="heading" here produces nested headings. ${ADVICE}`,
        },
    },
    create(context) {
        return {
            JSXAttribute(node: TSESTree.JSXAttribute) {
                // Only AccordionSection — other components' `header` props are
                // unconstrained.
                if (
                    node.name.type !== "JSXIdentifier" ||
                    node.name.name !== "header"
                ) {
                    return;
                }

                const owner = node.parent;
                if (
                    owner?.type !== "JSXOpeningElement" ||
                    owner.name.type !== "JSXIdentifier" ||
                    owner.name.name !== "AccordionSection"
                ) {
                    return;
                }

                // Only JSX values can contain headings.
                if (node.value?.type !== "JSXExpressionContainer") {
                    return;
                }

                forEachJSXOpeningElement(node.value.expression, (element) => {
                    if (element.name.type !== "JSXIdentifier") {
                        return;
                    }

                    const name = element.name.name;

                    if (HTML_HEADING_ELEMENTS.has(name)) {
                        context.report({
                            node: element,
                            messageId: "headingElementInHeader",
                            data: {name},
                        });
                        return;
                    }

                    if (WB_HEADING_COMPONENTS.has(name)) {
                        context.report({
                            node: element,
                            messageId: "headingComponentInHeader",
                            data: {name},
                        });
                        return;
                    }

                    // Components like BodyText, Text and View render whatever
                    // element their `tag` prop names, so the component name
                    // alone doesn't say whether it produces a heading.
                    const tag = getAttributeStringValue(element, "tag");
                    if (tag !== null && HEADING_TAG_REGEX.test(tag)) {
                        context.report({
                            node: element,
                            messageId: "headingTagInHeader",
                            data: {name, tag},
                        });
                        return;
                    }

                    // Anything can opt into heading semantics via role.
                    if (
                        getAttributeStringValue(element, "role") === "heading"
                    ) {
                        context.report({
                            node: element,
                            messageId: "roleHeadingInHeader",
                        });
                    }
                });
            },
        };
    },
    defaultOptions: [],
});
