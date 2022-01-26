// @flow
import BasicCellArgTypes from "./basic-cell.argtypes.js";

export default {
    ...BasicCellArgTypes,
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
};
