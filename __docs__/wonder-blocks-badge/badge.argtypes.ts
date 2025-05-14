import {IconMappings} from "../wonder-blocks-icon/phosphor-icon.argtypes";

export default {
    icon: {
        control: {type: "select"},
        options: Object.keys(IconMappings),
        mapping: IconMappings,
        table: {
            type: {
                summary: "ReactElement",
            },
        },
    },
};
