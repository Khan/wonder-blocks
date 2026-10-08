/* eslint-disable @khanacademy/wonder-blocks/no-raw-button */
// This file is the Wonder Blocks Tab implementation — it intentionally uses
// addStyle("button") as the underlying DOM element for the tab button.
import {
    addStyle,
    AriaProps,
    StyleType,
    View,
} from "@khanacademy/wonder-blocks-core";
import * as React from "react";
import {typographyClassNames} from "@khanacademy/wonder-blocks-typography";
import styles from "./tab.module.css";

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
    /**
     * Optional icon to display before the tab label.
     */
    icon?: React.ReactElement;
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
        icon,
        // Should only include aria related props
        ...otherProps
    } = props;
    return (
        <StyledButton
            {...otherProps}
            type="button" // this prevents form submissions if the tab is inside a form
            // eslint-disable-next-line @khanacademy/wonder-blocks/no-custom-tab-role -- This is the element with role="tab" in ResponsiveTabs
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
            // The `root` class carries no styling of its own — every rule in
            // the module is qualified with it so this component's styles
            // outrank the typography classes, which set `display` and
            // `margin` in the same `@layer shared`. See `tab.module.css`.
            style={[
                typographyClassNames.BodyTextMediumMediumWeight,
                styles.root,
                styles.tab,
                selected && styles.selectedTab,
                style,
            ]}
        >
            {icon && (
                <View>
                    {React.cloneElement(icon, {
                        // By default, use the medium size for icon components
                        size: icon.props.size ?? "medium",
                    })}
                </View>
            )}
            {children}
        </StyledButton>
    );
});
