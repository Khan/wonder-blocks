import * as React from "react";
import {StyleSheet} from "aphrodite";

import {addStyle} from "@khanacademy/wonder-blocks-core";
import type {AriaProps, StyleType} from "@khanacademy/wonder-blocks-core";

import AccordionSection from "./accordion-section";

const StyledUnorderedList = addStyle("ul");

export type AccordionCornerKindType =
    | "square"
    | "rounded"
    | "rounded-per-section";

type Props = AriaProps & {
    /**
     * The unique identifier for the accordion.
     */
    id?: string;
    /**
     * The AccordionSection components to display within this Accordion.
     */
    children: Array<
        React.ReactElement<React.ComponentProps<typeof AccordionSection>>
    >;
    /**
     * Whether to put the caret at the start or end of the header block
     * in this section. "start" means it’s on the left of a left-to-right
     * language (and on the right of a right-to-left language), and "end"
     * means it’s on the right of a left-to-right language
     * (and on the left of a right-to-left language).
     * Defaults to "end".
     *
     * If this prop is specified both here in the Accordion and within
     * a child AccordionSection component, the Accordion’s caretPosition
     * value is prioritized.
     */
    caretPosition?: "start" | "end";
    /**
     * The preset styles for the corners of this accordion.
     * `square` - corners have no border radius.
     * `rounded` - the overall container's corners are rounded.
     * `rounded-per-section` - each section's corners are rounded,
     * and there is vertical white space between each section.
     *
     * If this prop is specified both here in the Accordion and within
     * a child AccordionSection component, the AccordionSection’s cornerKind
     * value is prioritized.
     */
    cornerKind?: AccordionCornerKindType;
    /**
     * Custom styles for the overall accordion container.
     */
    style?: StyleType;
};

/**
 * An accordion displays a vertically stacked list of sections, each of which
 * contains content that can be shown or hidden by clicking its header.
 *
 * The Wonder Blocks Accordion component is a styled wrapper for a list of
 * AccordionSection components. It also wraps the AccordionSection
 * components in list items.
 *
 * ### Usage
 *
 * ```jsx
 * import {
 *      Accordion,
 *      AccordionSection
 * } from "@khanacademy/wonder-blocks-accordion";
 *
 * <Accordion>
 *   <AccordionSection header="First section">
 *       This is the information present in the first section
 *   </AccordionSection>,
 *   <AccordionSection header="Second section">
 *       This is the information present in the second section
 *   </AccordionSection>,
 *   <AccordionSection header="Third section">
 *       This is the information present in the third section
 *   </AccordionSection>
 * </Accordion>
 * ```
 */
const Accordion = React.forwardRef(function Accordion(
    props: Props,
    ref: React.ForwardedRef<HTMLUListElement>,
) {
    const {
        children,
        id,
        caretPosition,
        cornerKind = "rounded",
        style,
        ...ariaProps
    } = props;

    return (
        <StyledUnorderedList
            style={[styles.wrapper, style]}
            {...ariaProps}
            ref={ref}
        >
            {children.map((child, index) => {
                const {
                    caretPosition: childCaretPosition,
                    cornerKind: childCornerKind,
                } = child.props;

                const isFirstChild = index === 0;
                const isLastChild = index === children.length - 1;

                return (
                    // If the AccordionSections are rendered within the Accordion,
                    // they are part of a list, so they should be list items.
                    <li key={index} id={id}>
                        {React.cloneElement(child, {
                            // Prioritize the Accordion's caretPosition
                            caretPosition: caretPosition ?? childCaretPosition,
                            // Prioritize the AccordionSection's cornerKind
                            cornerKind: childCornerKind ?? cornerKind,
                            isFirstSection: isFirstChild,
                            isLastSection: isLastChild,
                        })}
                    </li>
                );
            })}
        </StyledUnorderedList>
    );
});

const styles = StyleSheet.create({
    wrapper: {
        boxSizing: "border-box",
        listStyle: "none",
        // Reset the default padding for lists.
        padding: 0,
        width: "100%",
    },
});

export default Accordion;
