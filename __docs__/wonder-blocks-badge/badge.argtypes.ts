import {IconMappings} from "../wonder-blocks-icon/phosphor-icon.argtypes";

export default {
    kind: {
        table: {
            type: {
                summary: `"info" | "success" | "warning" | "critical"`,
            },
        },
    },
    icon: {
        control: {type: "select"},
        options: Object.keys(IconMappings),
        mapping: IconMappings,
        table: {
            type: {
                summary: "ReactNode",
            },
        },
    },
};
