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
    children: Array<
        React.ReactElement<React.ComponentProps<typeof AccordionSection>>
    >;
    style?: StyleType;
};

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
                        <StyledListItem
                            key={index}
                            id={id}
                            style={styles.listItem}
                        >
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
    },
    listItem: {
        marginBottom: Spacing.xSmall_8,

        ":last-child": {
            marginBottom: 0,
        },
    },
});

export default Accordion;
