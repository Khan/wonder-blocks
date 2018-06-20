// @flow

export type ActionItemProps = {
    type: "action",
    /** Whether this item is disabled. Default false. */
    disabled?: boolean,
    /** Display text of the item. */
    label: string,
    /** Callback to perform the action. */
    onClick: () => void,
};

export type SelectItemProps = {
    type: "select",
    /** Whether this item is disabled. Default false. */
    disabled?: boolean,
    /** Display text of the item. */
    label: string,
    /** Initial selection state of this item. */
    selected: boolean,
    /** Value of this item. Treat as a key. */
    value: string,
    /** Callback. Passes whether this item is selected. */
    onClick?: (selected: boolean) => void,
};

export type SeparatorProps = {
    type: "separator",
};
