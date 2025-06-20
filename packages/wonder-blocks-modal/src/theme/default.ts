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
    },
    header: {
        layout: {
            paddingBlockMd: sizing.size_240,
            paddingInlineMd: sizing.size_320,
            paddingInlineSm: sizing.size_160,
            gap: sizing.size_080,
            // The space between the title and dismiss button.
            titleGapMd: sizing.size_160,
            titleGapSm: sizing.size_320,
        },
    },
    panel: {
        layout: {
            gap: sizing.size_320,
        },
    },
    closeButton: {
        layout: {
            gap: sizing.size_080,
        },
    },
};

export default theme;
