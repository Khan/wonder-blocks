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
        description:
            "The icon to display in the badge. This can be a `PhosphorIcon` or a custom icon using the `Icon` component",
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
