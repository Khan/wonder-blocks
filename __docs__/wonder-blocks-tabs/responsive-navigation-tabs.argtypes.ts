import type {ArgTypes} from "@storybook/react-vite";

export default {
    tabs: {
        table: {
            type: {
                summary: "Array<ResponsiveNavigationTabItem>",
                detail: "type ResponsiveNavigationTabItem = {\n\tid: string,\n\tlabel: string,\n\thref: string,\n\ticon?: React.ReactElement<PhosphorIcon | Icon>,\n\tfocusId?: string",
            },
        },
    },
    tabsProps: {
        table: {
            type: {
                summary: "NavigationTabsProps",
            },
        },
    },
    dropdownProps: {
        table: {
            type: {
                summary: "NavigationTabsDropdownProps",
            },
        },
    },
} satisfies ArgTypes;
