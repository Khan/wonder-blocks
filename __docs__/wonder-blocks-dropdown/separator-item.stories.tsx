import * as React from "react";
import type {Meta, StoryObj} from "@storybook/react-vite";

import {
    ActionItem,
    ActionMenu,
    SeparatorItem,
} from "@khanacademy/wonder-blocks-dropdown";

import ComponentInfo from "../components/component-info";
import packageConfig from "../../packages/wonder-blocks-dropdown/package.json";

type StoryComponentType = StoryObj<typeof SeparatorItem>;

/**
 * A separator used inside dropdown components to denote a
 * semantic break between groups of items. Renders as a thin horizontal rule
 * with surrounding whitespace.
 *
 * ### Usage
 *
 * ```tsx
 * import {ActionMenu, ActionItem, SeparatorItem} from "@khanacademy/wonder-blocks-dropdown";
 *
 * <ActionMenu menuText="Menu">
 *  <ActionItem label="Profile" href="/profile" />
 *  <ActionItem label="Settings" onClick={() => {}} />
 *  <SeparatorItem />
 *  <ActionItem label="Log out" href="/logout" />
 * </ActionMenu>
 * ```
 */
export default {
    title: "Packages / Dropdown / SeparatorItem",
    component: SeparatorItem,
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
        chromatic: {
            // Disabling because it's covered by the statesheet story.
            disableSnapshot: true,
        },
    },
} as Meta<typeof SeparatorItem>;

/**
 * A standalone `SeparatorItem`.
 */
export const Default: StoryComponentType = {
    render: () => <SeparatorItem />,
};

/**
 * `SeparatorItem` is typically used between groups of items inside an
 * `ActionMenu` to indicate a semantic break.
 */
export const BetweenItems: StoryComponentType = {
    render: function Render() {
        const [opened, setOpened] = React.useState(false);
        React.useEffect(() => {
            setOpened(true);
        }, []);
        return (
            <ActionMenu menuText="Menu" opened={opened} onToggle={setOpened}>
                <ActionItem label="Profile" href="#" />
                <ActionItem label="Settings" onClick={() => {}} />
                <SeparatorItem />
                <ActionItem label="Log out" href="#" />
            </ActionMenu>
        );
    },
};
