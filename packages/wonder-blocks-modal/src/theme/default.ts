import {border, sizing} from "@khanacademy/wonder-blocks-tokens";

const theme = {
    /**
     * Shared tokens
     */
    root: {
        border: {
            radius: border.radius.radius_040,
        },
    },
    /**
     * Building blocks
     */
    dialog: {
        layout: {
            padding: sizing.size_160,
        },
        shadow: {
            default: "none",
        },
    },
    header: {
        layout: {
            padding: {
                block: sizing.size_240,
                inline: {
                    default: sizing.size_320,
                    small: sizing.size_160,
                },
            },
            gap: {
                default: sizing.size_080,
                // The space between the title and dismiss button.
                title: {
                    default: sizing.size_160,
                    small: sizing.size_320,
                },
            },
        },
    },
    panel: {
        layout: {
            gap: {
                default: sizing.size_320,
                small: sizing.size_160,
            },
        },
    },
    footer: {
        layout: {
            padding: {
                inline: sizing.size_160,
                block: sizing.size_080,
            },
        },
    },
    closeButton: {
        layout: {
            gapRight: sizing.size_080,
            gapTop: sizing.size_080,
        },
    },
};

export default theme;
