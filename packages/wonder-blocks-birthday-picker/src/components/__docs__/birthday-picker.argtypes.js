// @flow
import {defaultLabels} from "../birthday-picker";

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
