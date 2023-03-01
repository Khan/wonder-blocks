import type {InputType} from "@storybook/csf";

import clickableArgtypes from "./clickable.argtypes";

export default {
    children: {
        description:
            "A function that returns the a React `Element`. The function is passed an object with three boolean properties: hovered, focused, and pressed, and a `childrenProps` argument that contains all the event handlers that should be passed to the React `Element` itself.",
        type: {
            name: "other",
            value: "(state: ClickableState, childrenProps: ChildrenProps) => React.Node",
            required: true,
        },
        table: {
            type: {
                summary:
                    "(state: ClickableState, childrenProps: ChildrenProps) => React.Node",
            },
        },
    },
    tabIndex: {
        control: {type: "number"},
        description: `Used to indicate the tab order of an element.
            Use 0 to make an element focusable, and use -1 to make an
            element non-focusable via keyboard navigation.`,
        table: {
            type: {summary: "number"},
        },
    },
    /**
     * States
     */
    disabled: {
        ...clickableArgtypes.disabled,
        description:
            "Whether the component is disabled.\n\n" +
            "If the component is disabled, this component will return handlers that do nothing.",
    },
    /**
     * Events
     */
    onClick: {
        ...clickableArgtypes.onClick,
        description:
            "An onClick function which ClickableBehavior can execute when clicked.",
    },
    onkeyDown: clickableArgtypes.onkeyDown,
    onKeyUp: clickableArgtypes.onKeyUp,
    /**
     * Navigation
     */
    skipClientNav: clickableArgtypes.skipClientNav,
    rel: clickableArgtypes.rel,
    target: clickableArgtypes.target,
    href: {
        ...clickableArgtypes.href,
        description:
            "Optional `href` which `ClickableBehavior` should direct to, uses client-side routing by default if react-router is present.\n\n" +
            "For keyboard navigation, the default is that both an enter and space press would also navigate to this location. See the triggerOnEnter and triggerOnSpace props for more details",
    },
    beforeNav: clickableArgtypes.beforeNav,
    safeWithNav: clickableArgtypes.safeWithNav,

    /**
     * Accessibility
     */
    role: clickableArgtypes.role,
} satisfies Record<string, InputType>;
