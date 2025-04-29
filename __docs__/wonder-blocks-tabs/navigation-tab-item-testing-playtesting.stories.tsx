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
    title: "Packages / Tabs / NavigationTabs / Testing / NavigationTabs - Playtesting",
} as Meta<typeof NavigationTabItem>;

type Story = StoryObj<typeof NavigationTabItem>;

export const Default: Story = {
    // We include a base default story so that the docs page can include the story
    // description properly.
    render: (args) => {
        return (
            <NavigationTabs>
                <NavigationTabItem {...args}>
                    <Link href="#link">Navigation tab item</Link>
                </NavigationTabItem>
            </NavigationTabs>
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
 * This story demonstrates how a render function could be used to wrap a `Link`
 * in a `NavigationTabItem` with a `Tooltip` and a `Popover`. Please test for
 * accessibility for your use case, especially around focus management,
 * keyboard interactions, and screenreader support!
 *
 * #### Current screenreader behaviour
 *
 * ##### Tooltips
 *
 * ###### ** Expected behaviour: ** The tooltip content is announced when a Link in the NavigationTabs is focused
 *
 * - Chrome + NVDA: Works as expected - the tooltip content is announced
 * - Firefox + NVDA: Only announces the tooltip contents if the tooltip is
 * already opened
 * - Safari + VoiceOver: Does not consistently read the tooltip contents when
 * the link is focused
 *
 * ##### Popovers
 *
 * ###### ** Expected behaviour: ** Focusing on a link with a popover will announce that it is expanded or collapsed.
 *
 * - Chrome + NVDA, Firefox + NVDA: Works as expected - it is
 * announced that the tab is expanded or collapsed when it is focused.
 * - Safari + VoiceOver: Does not communicate expanded or collapsed state.
 *
 * ###### ** Expected behaviour: ** A popover that is already opened is in the tab order
 *
 * - Chrome + NVDA, Firefox + NVDA, Safari + VoiceOver: The popover contents can
 * be tabbed to.
 * - The popover focus management is handled by the `Popover` component, see the
 * `Popover Accessibility` docs for more details.
 *
 * ###### ** Expected behaviour: ** Selecting a tab with a popover (using `Space` or `Enter`) will open the popover and navigate the user
 *
 * - Chrome + NVDA, Firefox + NVDA, Safari + VoiceOver: Works as expected - the
 * popover is opened and the browser navigates. The popover contents are
 * announced and can be interacted with.
 * - The popover focus management is handled by the `Popover` component, see the
 * `Popover Accessibility` docs for more details.
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
