// @flow

export type ActionItemProps = {|
    type: "action",
    /** Whether this item is disabled. Default false. */
    disabled?: boolean,
    /** Display text of the item. */
    label: string,
    /** URL to navigate to. */
    href?: string,
    /** Whether to avoid using client-side navigation. */
    skipClientNav?: boolean,
    /** Callback on the action. */
    onClick?: () => void,
|};

export type OptionItemProps = {|
    type: "select",
    /** Whether this item is disabled. Default false. */
    disabled?: boolean,
    /** Display text of the item. */
    label: string,
    /** Value of this item. Treat as a key. */
    value: string,
    /** Optional extra callback. Passes whether this item is selected. */
    onClick?: (selected: boolean) => void,
|};

export type SeparatorProps = {|
    type: "separator",
|};
