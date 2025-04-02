import * as React from "react";

type Props = {
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
    } = props;
    return (
        <button
            role="tab"
            onClick={onClick}
            ref={ref}
            id={id}
            aria-controls={ariaControls}
            aria-selected={selected}
            tabIndex={selected ? 0 : -1}
            onKeyDown={onKeyDown}
        >
            {children}
        </button>
    );
});
