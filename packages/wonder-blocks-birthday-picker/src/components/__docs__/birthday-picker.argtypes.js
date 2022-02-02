// @flow
import {defaultLabels} from "../birthday-picker.js";

export default {
    labels: {
        defaultValue: defaultLabels,
    },
    onChange: {
        action: "onChanged",
        table: {
            category: "Events",
        },
    },
};
