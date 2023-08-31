import * as React from "react";
import {StyleSheet} from "aphrodite";

import Color from "@khanacademy/wonder-blocks-color";
import {addStyle} from "@khanacademy/wonder-blocks-core";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import type {AriaProps, StyleType} from "@khanacademy/wonder-blocks-core";

import AccordionSection from "./accordion-section";

const StyledList = addStyle("ul");
const StyledListItem = addStyle("li");

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
    const {children, id, style, ...ariaProps} = props;
    return (
        <StyledList style={[styles.wrapper, style]} {...ariaProps} ref={ref}>
            {
                // If the AccordionSections are rendered within the Accordion,
                // they are part of a list, so they should be list items.
                children.map((child, index) => {
                    return (
                        <StyledListItem key={index} id={id}>
                            {child}
                        </StyledListItem>
                    );
                })
            }
        </StyledList>
    );
});

const styles = StyleSheet.create({
    wrapper: {
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        border: `1px solid ${Color.offBlack16}`,
        borderRadius: Spacing.xxxSmall_4,
        listStyle: "none",
        padding: Spacing.xSmall_8,
        // Don't want to double up the bottom padding with the
        // bottom margin on the last AccordionSection.
        paddingBottom: 0,
    },
});

export default Accordion;
