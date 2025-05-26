import {IconMappings} from "../wonder-blocks-icon/phosphor-icon.argtypes";

export const iconArgType = {
    icon: {
        control: {type: "select"},
        options: Object.keys(IconMappings),
        mapping: IconMappings,
        table: {
            type: {
                // `icon` prop can be any ReactElement, however, we want to
                // encourage the use of `PhosphorIcon` or `Icon` components.
                summary: "PhosphorIcon | Icon",
            },
        },
        // Explicitly adding icon prop description since description is not
        // auto-generated due to the union type
        description:
            "The icon to display in the badge. This can be a `PhosphorIcon` or a custom icon using the `Icon` component",
    },
};

export const showIconArgType = {
    showIcon: {
        description: "Whether to show the icon. Defaults to `false`.",
    },
};

export default {
    ...iconArgType,
    label: {
        // Explicitly adding label prop description since description is not
        // auto-generated due to the union type
        description: "The label to display in the badge.",
    },
    tag: {
        control: {type: "text"},
        description: "The HTML tag to render. Defaults to `div`.",
        table: {
            type: {
                summary: "keyof JSX.IntrinsicElements",
            },
        },
    },
};
