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
        // Explicitly adding icon prop description since description is not
        // auto-generated due to the union type
        // TODO(WB-1921): Once Icon component is created, update docs/examples to show Icon usage
        description:
            "The icon to display in the badge. This can be a PhosphorIcon or a custom icon",
    },
    label: {
        // Explicitly adding label prop description since description is not
        // auto-generated due to the union type
        description: "The label to display in the badge.",
    },
    tag: {
        control: {type: "text"},
    },
};
