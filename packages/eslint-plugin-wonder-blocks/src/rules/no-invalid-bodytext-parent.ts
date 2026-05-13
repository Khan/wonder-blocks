import {ESLintUtils, TSESLint, TSESTree} from "@typescript-eslint/utils";

import type {WonderBlocksPluginDocs} from "../types";
import {
    getAttributeStringValue,
    INLINE_BODY_TEXT_TAGS,
    WB_BUTTON_COMPONENTS,
    WB_FORM_COMPONENTS,
    BLOCK_CONTAINER_TAGS,
    WB_HEADING_COMPONENTS,
    HTML_HEADING_ELEMENTS,
} from "./jsx-utils";

const createRule = ESLintUtils.RuleCreator<WonderBlocksPluginDocs>(
    (name) =>
        `https://github.com/Khan/wonder-blocks/blob/main/packages/eslint-plugin-wonder-blocks/docs/${name}.md`,
);

type Options = [];
type MessageIds =
    | "nestedInFormComponent"
    | "nestedInButton"
    | "nestedInParagraph"
    | "nestedInLabel"
    | "nestedInBodyText"
    | "nestedInHeading";

/**
 * Returns true if this BodyText uses an inline `tag` prop, making it safe
 * to place inside any of the restricted parent elements.
 */
function hasInlineTag(openingElement: TSESTree.JSXOpeningElement): boolean {
    const tag = getAttributeStringValue(openingElement, "tag");
    return tag !== null && INLINE_BODY_TEXT_TAGS.has(tag);
}

/**
 * Walks up the AST from a JSXOpeningElement to find the nearest *ancestor*
 * JSXElement (i.e., skips the element's own JSXElement wrapper).
 */
function getNearestAncestorJSXElement(
    openingElement: TSESTree.JSXOpeningElement,
): TSESTree.JSXElement | null {
    // openingElement.parent is the JSXElement for openingElement's own element.
    // We need to go one level higher to start searching for an ancestor.
    let current: TSESTree.Node | undefined = openingElement.parent?.parent;
    while (current != null) {
        if (current.type === "JSXElement") {
            return current;
        }
        current = current.parent;
    }
    return null;
}

/**
 * Build the auto-fix that sets tag="span" on the BodyText element.
 *
 * If a `tag` prop already exists with a static string value, its value is
 * replaced. If the existing `tag` value is a dynamic expression (e.g.
 * tag={condition ? 'span' : 'code'}), no fix is returned — replacing it
 * would silently destroy the developer's conditional logic.
 * Otherwise, tag="span" is appended after the last attribute.
 */
function buildSpanTagFix(
    fixer: TSESLint.RuleFixer,
    openingElement: TSESTree.JSXOpeningElement,
): TSESLint.RuleFix | null {
    const existingTagAttr = openingElement.attributes.find(
        (a): a is TSESTree.JSXAttribute =>
            a.type === "JSXAttribute" &&
            a.name.type === "JSXIdentifier" &&
            a.name.name === "tag",
    );

    if (existingTagAttr) {
        // Dynamic expression: don't autofix — we'd corrupt the developer's logic.
        if (existingTagAttr.value?.type === "JSXExpressionContainer") {
            return null;
        }
        // Static string literal: safe to replace.
        if (existingTagAttr.value?.type === "Literal") {
            return fixer.replaceText(existingTagAttr.value, '"span"');
        }
    }

    const lastAttr =
        openingElement.attributes[openingElement.attributes.length - 1];
    return lastAttr
        ? fixer.insertTextAfter(lastAttr, ' tag="span"')
        : fixer.insertTextAfter(openingElement.name, ' tag="span"');
}

export default createRule<Options, MessageIds>({
    name: "no-invalid-bodytext-parent",
    meta: {
        type: "problem",
        docs: {
            description:
                "Disallow BodyText with a block-level tag (default <p>) inside elements that cannot contain block-level content",
            recommended: false,
        },
        fixable: "code",
        schema: [],
        messages: {
            nestedInFormComponent:
                'BodyText renders as <p> by default. Add tag="span" to use BodyText inside {{componentName}}.',
            nestedInButton:
                'BodyText renders as <p> by default. Add tag="span" to use BodyText inside a button element.',
            nestedInParagraph:
                'BodyText renders as <p> by default, which cannot be nested inside another <p>. Add tag="span" to use BodyText here.',
            nestedInLabel:
                'BodyText renders as <p> by default. Add tag="span" to use BodyText inside a label element.',
            nestedInBodyText:
                'BodyText renders as <p> by default, which cannot be nested inside another BodyText that also renders as <p>. Add tag="div" to the outer BodyText to allow block children, or add tag="span" to this BodyText to make it inline.',
            nestedInHeading:
                'BodyText renders as <p> by default, which cannot be nested inside a heading element. Add an inline tag (e.g., tag="sup" or tag="span") to use BodyText inside a heading.',
        },
    },
    create(context) {
        return {
            JSXOpeningElement(node) {
                // Only check BodyText components.
                if (
                    node.name.type !== "JSXIdentifier" ||
                    node.name.name !== "BodyText"
                ) {
                    return;
                }

                // If BodyText explicitly uses an inline tag, it's safe
                // in any of the restricted parent contexts.
                if (hasInlineTag(node)) {
                    return;
                }

                const ancestorJSXElement = getNearestAncestorJSXElement(node);
                if (!ancestorJSXElement) {
                    return;
                }

                const parentOpening = ancestorJSXElement.openingElement;
                const parentName =
                    parentOpening.name.type === "JSXIdentifier"
                        ? parentOpening.name.name
                        : null;

                if (!parentName) {
                    return;
                }

                const fix = (fixer: TSESLint.RuleFixer) =>
                    buildSpanTagFix(fixer, node);

                // --- WB Form components (Choice, Checkbox, Radio) ---
                if (WB_FORM_COMPONENTS.has(parentName)) {
                    context.report({
                        node,
                        messageId: "nestedInFormComponent",
                        data: {componentName: parentName},
                        fix,
                    });
                    return;
                }

                // --- WB Button components ---
                if (WB_BUTTON_COMPONENTS.has(parentName)) {
                    context.report({
                        node,
                        messageId: "nestedInButton",
                        fix,
                    });
                    return;
                }

                // --- HTML <button> or StyledButton ---
                if (parentName === "button" || parentName === "StyledButton") {
                    context.report({
                        node,
                        messageId: "nestedInButton",
                        fix,
                    });
                    return;
                }

                // --- HTML <p> or StyledP ---
                if (parentName === "p" || parentName === "StyledP") {
                    context.report({
                        node,
                        messageId: "nestedInParagraph",
                        fix,
                    });
                    return;
                }

                // --- HTML <label> or StyledLabel ---
                if (parentName === "label" || parentName === "StyledLabel") {
                    context.report({
                        node,
                        messageId: "nestedInLabel",
                        fix,
                    });
                    return;
                }

                // --- BodyText nested inside another BodyText ---
                if (parentName === "BodyText") {
                    // It's OK if the outer BodyText uses a block-container tag
                    // like tag="div", which can contain <p> elements.
                    const outerTag = getAttributeStringValue(
                        parentOpening,
                        "tag",
                    );
                    const outerIsBlockContainer =
                        outerTag !== null && BLOCK_CONTAINER_TAGS.has(outerTag);

                    if (!outerIsBlockContainer) {
                        context.report({
                            node,
                            messageId: "nestedInBodyText",
                            fix,
                        });
                    }
                    return;
                }

                // --- WB Heading components ---
                if (WB_HEADING_COMPONENTS.has(parentName)) {
                    context.report({
                        node,
                        messageId: "nestedInHeading",
                        fix,
                    });
                    return;
                }

                // --- HTML heading elements (h1–h6) ---
                if (HTML_HEADING_ELEMENTS.has(parentName)) {
                    context.report({
                        node,
                        messageId: "nestedInHeading",
                        fix,
                    });
                    return;
                }
            },
        };
    },
    defaultOptions: [],
});
