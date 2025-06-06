import {addStyle, AriaProps, StyleType} from "@khanacademy/wonder-blocks-core";
import * as React from "react";
import {StyleSheet} from "aphrodite";
import {border, semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import {styles as typographyStyles} from "@khanacademy/wonder-blocks-typography";
import {focusStyles} from "@khanacademy/wonder-blocks-styles";

type Props = AriaProps & {
    /**
     * The contents of the tab label.
     */
    children: React.ReactNode;
    /**
     * Called when the tab is clicked.
     */
    onClick?: (event: React.MouseEvent) => unknown;
    /**
     * A unique id for the tab.
     */
    id: string;
    /**
     * Optional test ID for e2e testing.
     */
    testId?: string;
    /**
     * The id of the panel that the tab controls.
     */
    "aria-controls": string;
    /**
     * If the tab is currently selected.
     */
    selected?: boolean;
    /**
     * Called when a key is pressed on the tab.
     */
    onKeyDown?: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
    /**
     * Custom styles for the `Tab` component.
     */
    style?: StyleType;
};

const StyledButton = addStyle("button");

/**
 * A component that has `role="tab"` and is used to represent a tab in a tabbed
 * interface.
 */
export const Tab = React.forwardRef(function Tab(
    props: Props,
    ref: React.ForwardedRef<HTMLButtonElement>,
) {
    const {
        children,
        onClick,
        id,
        "aria-controls": ariaControls,
        selected,
        onKeyDown,
        testId,
        style,
        // Should only include aria related props
        ...otherProps
    } = props;
    return (
        <StyledButton
            {...otherProps}
            role="tab"
            onClick={onClick}
            ref={ref}
            id={id}
            aria-controls={ariaControls}
            aria-selected={selected}
            // Only the selected tab is focusable since keyboard users will navigate
            // between tabs using the arrow keys
            tabIndex={selected ? 0 : -1}
            onKeyDown={onKeyDown}
            data-testid={testId}
            style={[
                typographyStyles.Body,
                styles.tab,
                selected && styles.selectedTab,
                style,
            ]}
        >
            {children}
        </StyledButton>
    );
});

const bottomSpacing = sizing.size_140;
export const styles = StyleSheet.create({
    tab: {
        display: "flex",
        alignItems: "center",
        textWrap: "nowrap",
        backgroundColor: "transparent",
        border: "none",
        margin: 0,
        padding: 0,
        cursor: "pointer",
        marginBlockStart: sizing.size_080,
        marginBlockEnd: bottomSpacing,
        position: "relative",
        ...focusStyles.focus,
        // Using :after styling to apply the hover/pressed underline styling
        // instead of box-shadow because we use box-shadow for the focus outline.
        ":after": {
            content: "''",
            position: "absolute",
            left: 0,
            right: 0,
            bottom: `calc(${bottomSpacing} * -1)`,
        },
        // Only apply hover styles to tabs that are not selected
        [":hover:not([aria-selected='true'])" as any]: {
            color: semanticColor.link.hover,
            [":after" as any]: {
                height: border.width.thin,
                backgroundColor: semanticColor.link.hover,
            },
        },
        // Only apply active styles to tabs that are not selected
        [":active:not([aria-selected='true'])" as any]: {
            color: semanticColor.link.press,
            [":after" as any]: {
                height: border.width.thick,
                backgroundColor: semanticColor.link.press,
            },
        },
    },
    selectedTab: {
        color: semanticColor.link.rest,
    },
});
