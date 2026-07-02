import type {ArgTypes} from "@storybook/react-vite";

import AriaArgTypes from "../wonder-blocks-core/aria.argtypes";

const argTypes: ArgTypes = {
    ...AriaArgTypes,

    // Content
    children: {
        table: {category: "Content"},
    },

    // Visual style
    styles: {
        control: false,
        description:
            "Optional custom styles for sub-elements within `CustomOpener`. Use `styles.root` to style the root `<button>` element and `styles.label` to style the `BodyText` wrapper around children.",
        table: {
            category: "Visual style",
            type: {summary: "{ root?: StyleType; label?: StyleType }"},
        },
    },

    // States
    disabled: {
        control: {type: "boolean"},
        description:
            "Whether the opener is disabled. Internally, `aria-disabled` is set so the element remains focusable and included in the tab order.",
        table: {
            category: "States",
            defaultValue: {summary: "false"},
        },
    },

    // Layout
    id: {
        table: {category: "Layout"},
    },
    className: {
        table: {category: "Layout"},
    },
    tabIndex: {
        table: {category: "Layout"},
    },

    // Testing
    testId: {
        table: {category: "Testing"},
    },

    // Events
    onClick: {
        table: {category: "Events"},
    },
    onKeyDown: {
        table: {category: "Events"},
    },
    onKeyUp: {
        table: {category: "Events"},
    },
    onFocus: {
        table: {category: "Events"},
    },
    onBlur: {
        table: {category: "Events"},
    },
    onMouseEnter: {
        table: {category: "Events"},
    },
    onMouseLeave: {
        table: {category: "Events"},
    },
};

export default argTypes;
