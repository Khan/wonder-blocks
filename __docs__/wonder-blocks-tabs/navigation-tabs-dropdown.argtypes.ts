import type {ArgTypes} from "@storybook/react-vite";

export default {
    tabs: {
        table: {
            type: {
                summary: "Array<NavigationTabDropdownItem>",
                detail: "type NavigationTabDropdownItem = {\n\tid: string,\n\tlabel: string,\n\thref: string,\n\ticon?: React.ReactElement\n}",
            },
        },
    },
} satisfies ArgTypes;
