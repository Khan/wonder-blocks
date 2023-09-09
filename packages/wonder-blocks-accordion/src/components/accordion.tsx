import * as React from "react";
import {StyleSheet} from "aphrodite";

import Color from "@khanacademy/wonder-blocks-color";
import {addStyle} from "@khanacademy/wonder-blocks-core";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import type {AriaProps, StyleType} from "@khanacademy/wonder-blocks-core";

import AccordionSection from "./accordion-section";

const StyledUnorderedList = addStyle("ul");

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
     * Whether to put the caret at the start (the left side in left-to-right
     * languages) or end (the right side in right-to-left languages) of the
     * title block in all the sections within this accordion.
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
     * a child AccordionSection component, the Accordion’s cornerKind
     * value is prioritized.
     */
    cornerKind?: "square" | "rounded" | "rounded-per-section";
    /**
     * Custom styles for the overall accordion container.
     */
    style?: StyleType;
};

/**
 * An accordion displays a vertically stacked list of sections, each of which
 * contains content that can be shown or hidden by clicking its title.
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
 *   <AccordionSection title="First section">
 *       This is the information present in the first section
 *   </AccordionSection>,
 *   <AccordionSection title="Second section">
 *       This is the information present in the second section
 *   </AccordionSection>,
 *   <AccordionSection title="Third section">
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

    let cornerStyle;
    switch (cornerKind) {
        case "square":
            cornerStyle = styles.wrapperSquare;
            break;
        case "rounded":
            cornerStyle = styles.wrapperRounded;
            break;
        case "rounded-per-section":
            cornerStyle = styles.wrapperRoundedPerSection;
            break;
    }

    return (
        <StyledUnorderedList
            style={[styles.wrapper, cornerStyle, style]}
            {...ariaProps}
            ref={ref}
        >
            {
                // If the AccordionSections are rendered within the Accordion,
                // they are part of a list, so they should be list items.
                children.map((child, index) => {
                    const {
                        caretPosition: childCaretPosition,
                        cornerKind: childCornerKind,
                    } = child.props;

                    const isLastChild = index === children.length - 1;

                    return (
                        <li key={index} id={id}>
                            {React.cloneElement(child, {
                                caretPosition:
                                    caretPosition ?? childCaretPosition,
                                cornerKind: cornerKind ?? childCornerKind,
                                isLastSection: isLastChild,
                            })}
                        </li>
                    );
                })
            }
        </StyledUnorderedList>
    );
});

const styles = StyleSheet.create({
    wrapper: {
        listStyle: "none",
        // Reset the default padding for lists.
        padding: 0,
        width: "100%",

        border: `1px solid ${Color.offBlack16}`,
    },
    wrapperSquare: {
        borderRadius: 0,
    },
    wrapperRounded: {
        borderRadius: Spacing.small_12,
    },
    wrapperRoundedPerSection: {
        border: "none",
    },
});

export default Accordion;
