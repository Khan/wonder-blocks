import * as React from "react";
import type {Meta, StoryObj} from "@storybook/react";
import {StyleSheet} from "aphrodite";
import {expect, within} from "@storybook/test";
import ComponentInfo from "../components/component-info";
import packageConfig from "../../packages/wonder-blocks-tabs/package.json";
import {
    NavigationTabItem,
    NavigationTabs,
} from "@khanacademy/wonder-blocks-tabs";
import Link from "@khanacademy/wonder-blocks-link";
import argTypes from "./navigation-tabs.argtypes";
import {semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {IconMappings} from "../wonder-blocks-icon/phosphor-icon.argtypes";
import {OptionItem, SingleSelect} from "@khanacademy/wonder-blocks-dropdown";
import {addStyle} from "@khanacademy/wonder-blocks-core";

export default {
    title: "Packages / Tabs / NavigationTabs",
    component: NavigationTabs,
    subcomponents: {NavigationTabItem},
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
    },
    argTypes,
} as Meta<typeof NavigationTabs>;

type StoryComponentType = StoryObj<typeof NavigationTabs>;

const navigationTabItems = [
    <NavigationTabItem current={true}>
        <Link href="#link-1">Navigation tab item 1</Link>
    </NavigationTabItem>,
    <NavigationTabItem>
        <Link href="#link-2">Navigation tab item 2</Link>
    </NavigationTabItem>,
    <NavigationTabItem>
        <Link href="#link-3">Navigation tab item 3</Link>
    </NavigationTabItem>,
];

export const Default: StoryComponentType = {
    args: {
        children: navigationTabItems,
    },
    parameters: {
        chromatic: {
            // Disabling because it's covered by All Variants
            disableSnapshot: true,
        },
    },
};

/**
 * Use the `Link` props for setting things like icons.
 */
export const WithIcons: StoryComponentType = {
    args: {
        children: [
            <NavigationTabItem>
                <Link href="https://khanacademy.org" target="_blank">
                    External Link
                </Link>
            </NavigationTabItem>,
            <NavigationTabItem>
                <Link
                    href="#link2"
                    startIcon={
                        <PhosphorIcon icon={IconMappings.cookie} size="small" />
                    }
                >
                    Start Icon
                </Link>
            </NavigationTabItem>,
            <NavigationTabItem>
                <Link
                    href="#link3"
                    endIcon={
                        <PhosphorIcon
                            icon={IconMappings.iceCream}
                            size="small"
                        />
                    }
                >
                    End Icon
                </Link>
            </NavigationTabItem>,
            <NavigationTabItem current={true}>
                <Link
                    href="#link4"
                    startIcon={
                        <PhosphorIcon icon={IconMappings.cookie} size="small" />
                    }
                    endIcon={
                        <PhosphorIcon
                            icon={IconMappings.iceCream}
                            size="small"
                        />
                    }
                >
                    Start and End Icons
                </Link>
            </NavigationTabItem>,
        ],
    },
    parameters: {
        chromatic: {
            // Disabling because it's covered by All Variants
            disableSnapshot: true,
        },
    },
};

/**
 * Custom styles can be set for the elements in NavigationTabs using the
 * `styles` prop.
 *
 * If there is a specific use case where the styling needs to be
 * overridden, please reach out to the Wonder Blocks team!
 */
export const CustomStyles: StoryComponentType = {
    args: {
        children: navigationTabItems,
        styles: {
            root: {
                padding: sizing.size_160,
            },
            list: {
                gap: sizing.size_400,
            },
        },
    },
};

const StyledHeader = addStyle("header");
const StyledDiv = addStyle("div");

/**
 * Here is an example of the `NavigationTabs` component used within a header.
 *
 * Note: To line up the header bottom border with the NavigationTabs underline
 * styling, a negative vertical margin is set on the `NavigationTabs`.
 */
export const HeaderWithNavigationTabsExample: StoryComponentType = {
    render: function HeaderExample(args) {
        // Putting styles in the component so it shows in the code snippet
        const headerVerticalSpacing = sizing.size_120;
        const styles = StyleSheet.create({
            pageStyle: {
                backgroundColor: semanticColor.surface.secondary,
                height: "100vh",
                width: "100vw",
            },
            headerStyle: {
                backgroundColor: semanticColor.surface.primary,
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                borderBottom: `1px solid ${semanticColor.border.primary}`,
                gap: sizing.size_240,
                padding: `${headerVerticalSpacing} ${sizing.size_240}`,
            },
            navigationTabsRoot: {
                // set margin to negative value of header vertical spacing so
                // that selected indicator lines up with header border
                margin: `-${headerVerticalSpacing} 0`,
            },
        });
        const [currentTab, setCurrentTab] = React.useState(0);
        const tabs = Array(4)
            .fill(0)
            .map((_, index) => (
                <NavigationTabItem current={currentTab === index} key={index}>
                    <Link href="#link-1" onClick={() => setCurrentTab(index)}>
                        {`Tab ${index + 1}`}
                    </Link>
                </NavigationTabItem>
            ));
        return (
            <StyledDiv style={styles.pageStyle}>
                <StyledHeader style={styles.headerStyle}>
                    <img
                        src="/logo-with-text.svg"
                        width="80px"
                        alt="Wonder Blocks logo"
                    />
                    <SingleSelect
                        aria-label="Example select"
                        placeholder="Placeholder"
                        selectedValue={"item-1"}
                        onChange={() => {}}
                        style={{width: "200px"}}
                    >
                        <OptionItem value="item-1" label="Item 1" />
                        <OptionItem value="item-2" label="Item 2" />
                    </SingleSelect>
                    <NavigationTabs
                        {...args}
                        aria-label="Secondary navigation"
                        styles={{root: styles.navigationTabsRoot}}
                    >
                        {tabs}
                    </NavigationTabs>
                </StyledHeader>
            </StyledDiv>
        );
    },
    parameters: {
        layout: "fullscreen",
    },
    args: {
        animated: true,
    },
};

/**
 * The `animated` prop can be set to `true` to animate the current underline
 * indicator. By default, `animated` is set to `false`.
 */
export const Animated: StoryComponentType = {
    render: function Animated(args) {
        const [currentTab, setCurrentTab] = React.useState(0);
        const tabs = Array(4)
            .fill(0)
            .map((_, index) => (
                <NavigationTabItem current={currentTab === index} key={index}>
                    <Link href="#link-1" onClick={() => setCurrentTab(index)}>
                        {index % 2 === 0
                            ? `Navigation tab item ${index + 1}`
                            : `Item ${index + 1}`}
                    </Link>
                </NavigationTabItem>
            ));
        return <NavigationTabs {...args}>{tabs}</NavigationTabs>;
    },
    args: {
        animated: true,
    },
    parameters: {
        chromatic: {
            // Disabling because this doesn't test anything visual.
            disableSnapshot: true,
        },
    },
    play: async ({canvasElement}) => {
        // Arrange
        const canvas = within(canvasElement.ownerDocument.body);

        // Act
        const currentIndicator = await canvas.findByRole("presentation");
        const style = window.getComputedStyle(currentIndicator);

        // Assert
        await expect(style.transitionProperty).toMatch(/transform/);
    },
};

/**
 * When the `animated` prop is `false`, there is no animation when the current
 * tab changes.  By default, `animated` is set to `false`.
 */
export const AnimationsDisabled: StoryComponentType = {
    ...Animated,
    args: {
        animated: false,
    },
    play: async ({canvasElement}) => {
        // Arrange
        const canvas = within(canvasElement.ownerDocument.body);

        // Act
        const currentIndicator = await canvas.findByRole("presentation");
        const style = window.getComputedStyle(currentIndicator);

        // Assert
        await expect(style.transitionProperty).not.toMatch(/transform/);
    },
};

/**
 * This story shows the behaviour when none of the tabs are the current page
 * initially.
 */
export const NoCurrentTab: StoryComponentType = {
    render: function Interactive(args) {
        const [currentTab, setCurrentTab] = React.useState(-1);
        const tabs = Array(4)
            .fill(0)
            .map((_, index) => (
                <NavigationTabItem current={currentTab === index} key={index}>
                    <Link href="#link-1" onClick={() => setCurrentTab(index)}>
                        {index % 2 === 0
                            ? `Navigation tab item ${index + 1}`
                            : `Item ${index + 1}`}
                    </Link>
                </NavigationTabItem>
            ));
        return <NavigationTabs {...args}>{tabs}</NavigationTabs>;
    },
    args: {
        animated: true,
    },
};
