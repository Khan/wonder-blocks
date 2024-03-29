import CompactCellArgTypes from "./compact-cell.argtypes";

export default {
    ...CompactCellArgTypes,
    subtitle1: {
        control: {
            type: "text",
        },
        table: {
            category: "Layout",
            type: {
                detail: "string | React.Element<Typography>",
            },
        },
    },
    subtitle2: {
        control: {
            type: "text",
        },
        table: {
            category: "Layout",
            type: {
                detail: "string | React.Element<Typography>",
            },
        },
    },
} as const;
