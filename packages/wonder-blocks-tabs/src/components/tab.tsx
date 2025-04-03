import {AriaProps} from "@khanacademy/wonder-blocks-core";
import * as React from "react";

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
};

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
        // Should only include aria related props
        ...otherProps
    } = props;
    return (
        <button
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
        >
            {children}
        </button>
    );
});
