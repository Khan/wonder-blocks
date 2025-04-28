import * as React from "react";
import {Meta, StoryObj} from "@storybook/react";
import {
    NavigationTabItem,
    NavigationTabs,
} from "@khanacademy/wonder-blocks-tabs";
import {View} from "@khanacademy/wonder-blocks-core";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import Tooltip from "@khanacademy/wonder-blocks-tooltip";
import {PopoverContent, Popover} from "@khanacademy/wonder-blocks-popover";
import Link from "@khanacademy/wonder-blocks-link";
import {HeadingMedium} from "@khanacademy/wonder-blocks-typography";

export default {
    title: "Packages / Tabs / NavigationTabs / Subcomponents / NavigationTabItem / Testing / NavigationTabItem - Playtesting",
} as Meta<typeof NavigationTabItem>;

type Story = StoryObj<typeof NavigationTabItem>;

export const Default: Story = {
    // We include a base default story so that the docs page can include the story
    // description properly.
    render: (args) => {
        return (
            <ul>
                <NavigationTabItem {...args}>
                    <Link href="#link">Navigation tab item</Link>
                </NavigationTabItem>
            </ul>
        );
    },
    parameters: {
        chromatic: {disableSnapshot: true},
    },
};

/**
 * When a `Link` component is passed in for the `children` prop,
 * `NavigationTabItem` will inject props for the `Link`.
 *
 * For specific use cases where the `Link` component is wrapped by another
 * component (like a `Tooltip` or `Popover`), a render function can be used
 * instead. The render function provides the Link props that should be applied
 * to the Link component. The Link props contains styles and attributes for
 * accessibility like `aria-current`.
 *
 * When using a tooltip or popover within the NavigationTabs, it is important
 * to test what the experience is like using keyboard navigation and a screenreader.
 */
export const ChildrenRenderFunction: Story = {
    render() {
        return (
            <View
                style={{
                    // Need to set the height so tooltip/popover are captured in chromatic
                    minHeight: 400,
                    gap: sizing.size_240,
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        gap: sizing.size_800,
                    }}
                >
                    <NavigationTabs aria-label="With tooltip and popover not shown by default">
                        <NavigationTabItem current={true}>
                            {(linkProps) => (
                                <Tooltip content="Contents for the tooltip">
                                    <Link href="#link-1" {...linkProps}>
                                        Link with Tooltip
                                    </Link>
                                </Tooltip>
                            )}
                        </NavigationTabItem>
                        <NavigationTabItem>
                            {(linkProps) => (
                                <Popover
                                    content={
                                        <PopoverContent
                                            title="Title"
                                            content="The popover content."
                                            closeButtonVisible
                                        />
                                    }
                                >
                                    <Link href="#link-1" {...linkProps}>
                                        Link with Popover
                                    </Link>
                                </Popover>
                            )}
                        </NavigationTabItem>
                    </NavigationTabs>
                </View>
                <HeadingMedium>Opened state</HeadingMedium>
                <View
                    style={{
                        flexDirection: "row",
                        gap: sizing.size_960,
                    }}
                >
                    <NavigationTabs aria-label="With tooltip and popover shown by default">
                        <NavigationTabItem current={true}>
                            {(linkProps) => (
                                <Tooltip
                                    content="Contents for the tooltip"
                                    opened={true}
                                    placement="bottom"
                                >
                                    <Link href="#link-1" {...linkProps}>
                                        Link with Opened Tooltip
                                    </Link>
                                </Tooltip>
                            )}
                        </NavigationTabItem>
                        <NavigationTabItem>
                            {(linkProps) => (
                                <Popover
                                    content={
                                        <PopoverContent
                                            title="Title"
                                            content="The popover content."
                                            closeButtonVisible
                                        />
                                    }
                                    placement="bottom"
                                    opened={true}
                                >
                                    <Link href="#link-1" {...linkProps}>
                                        Link with Opened Popover
                                    </Link>
                                </Popover>
                            )}
                        </NavigationTabItem>
                    </NavigationTabs>
                </View>
            </View>
        );
    },
    parameters: {
        // Added to ensure that the popover/tooltip is rendered using PopperJS.
        chromatic: {delay: 500},
    },
};
