import {addStyle, StyleType} from "@khanacademy/wonder-blocks-core";
import {semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import {StyleSheet} from "aphrodite";
import * as React from "react";

type Props = {
    /**
     * The id of the tablist.
     */
    id?: string;
    /**
     * Optional test ID for e2e testing.
     */
    testId?: string;
    /**
     * The contents of the tablist.
     */
    children: React.ReactNode;
    /**
     * If there is no visible label for the tablist, set aria-label to a
     * label describing the tablist.
     */
    "aria-label"?: string;
    /**
     * If the tablist has a visible label, set aria-labelledby to a value
     * that refers to the labelling element.
     */
    "aria-labelledby"?: string;
    /**
     * Called when focus moves out of the tablist.
     */
    onBlur?: (event: React.FocusEvent<HTMLDivElement>) => void;
    /**
     * Custom styles for the `Tablist` component.
     */
    style?: StyleType;
};

const StyledDiv = addStyle("div");

/**
 * A component that has `role="tablist"` and is used to group tab elements.
 */
export const Tablist = React.forwardRef(function Tablist(
    props: Props,
    ref: React.ForwardedRef<HTMLDivElement>,
) {
    const {
        id,
        children,
        "aria-label": ariaLabel,
        "aria-labelledby": ariaLabelledby,
        onBlur,
        testId,
        style,
    } = props;

    return (
        <StyledDiv
            id={id}
            role="tablist"
            style={[styles.tablist, style]}
            ref={ref}
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledby}
            onBlur={onBlur}
            data-testid={testId}
        >
            {children}
        </StyledDiv>
    );
});

const styles = StyleSheet.create({
    tablist: {
        display: "flex",
        gap: sizing.size_240,
        borderBottom: `1px solid ${semanticColor.border.subtle}`,
        // Add horizontal padding for focus outline of first/last elements
        paddingInline: sizing.size_040,
    },
});
