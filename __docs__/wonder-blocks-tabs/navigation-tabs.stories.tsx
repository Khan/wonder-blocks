import * as React from "react";
import type {Meta, StoryObj} from "@storybook/react";
import {StyleSheet} from "aphrodite";
import ComponentInfo from "../components/component-info";
import packageConfig from "../../packages/wonder-blocks-tabs/package.json";
import {
    NavigationTabItem,
    NavigationTabs,
} from "@khanacademy/wonder-blocks-tabs";
import Link from "@khanacademy/wonder-blocks-link";
import argTypes from "./navigation-tabs.argtypes";
import {semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import {ScenariosLayout} from "../components/scenarios-layout";
import {
    longText,
    longTextWithNoWordBreak,
} from "../components/text-for-testing";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {IconMappings} from "../wonder-blocks-icon/phosphor-icon.argtypes";
import {OptionItem, SingleSelect} from "@khanacademy/wonder-blocks-dropdown";
import {addStyle} from "@khanacademy/wonder-blocks-core";

export default {
    title: "Packages / Tabs / NavigationTabs / NavigationTabs",
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
                padding: sizing.size_200,
            },
            list: {
                gap: sizing.size_500,
            },
        },
    },
};

const generateChildren = (
    numItems: number,
    label: string,
    showIcons: boolean = false,
) => {
    return Array(numItems)
        .fill(0)
        .map((_, index) => (
            <NavigationTabItem current={index === 0}>
                <Link
                    href={`#link-${index + 1}`}
                    startIcon={
                        showIcons ? (
                            <PhosphorIcon
                                icon={IconMappings.cookie}
                                size="small"
                            />
                        ) : undefined
                    }
                    endIcon={
                        showIcons ? (
                            <PhosphorIcon
                                icon={IconMappings.iceCream}
                                size="small"
                            />
                        ) : undefined
                    }
                >
                    {label}
                </Link>
            </NavigationTabItem>
        ));
};

export const Scenarios: StoryComponentType = {
    render() {
        const scenarios = [
            {
                name: "Many items",
                props: {children: generateChildren(10, "Navigation Tab Item")},
            },
            {
                name: "Long text",
                props: {children: generateChildren(4, longText)},
            },
            {
                name: "Long text with no word break",
                props: {
                    children: generateChildren(4, longTextWithNoWordBreak),
                },
            },
            {
                name: "Long text (with icons)",
                props: {children: generateChildren(4, longText, true)},
            },
            {
                name: "Long text with no word break (with icons)",
                props: {
                    children: generateChildren(
                        4,
                        longTextWithNoWordBreak,
                        true,
                    ),
                },
            },
            {
                name: "Varying lengths",
                props: {
                    children: [
                        <NavigationTabItem current={true}>
                            <Link href="#link-long">{longText}</Link>
                        </NavigationTabItem>,
                        <NavigationTabItem>
                            <Link href="#link-short">Short text</Link>
                        </NavigationTabItem>,
                        <NavigationTabItem>
                            <Link href="#link-long-no-break">
                                {longTextWithNoWordBreak}
                            </Link>
                        </NavigationTabItem>,
                    ],
                },
            },
        ];
        return (
            <ScenariosLayout scenarios={scenarios}>
                {(props) => <NavigationTabs {...props} />}
            </ScenariosLayout>
        );
    },
};

export const ScenariosSmallScreen: StoryComponentType = {
    render: Scenarios.render,
    parameters: {
        viewport: {
            defaultViewport: "small",
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
    render() {
        const headerVerticalSpacing = sizing.size_150;
        const styles = StyleSheet.create({
            pageStyle: {
                backgroundColor: semanticColor.surface.secondary,
                height: "100vh",
                width: "100%",
            },
            headerStyle: {
                backgroundColor: semanticColor.surface.primary,
                display: "flex",
                alignItems: "center",
                borderBottom: `1px solid ${semanticColor.border.primary}`,
                width: "100%",
                gap: sizing.size_300,
                padding: `${headerVerticalSpacing} ${sizing.size_300}`,
            },
            navigationTabsRoot: {
                // set margin to negative value of header vertical spacing so
                // that selected indicator lines up with header border
                margin: `-${headerVerticalSpacing} 0`,
            },
        });

        return (
            <StyledDiv style={styles.pageStyle}>
                <StyledHeader style={styles.headerStyle}>
                    <img
                        src="/logo.svg"
                        width="40px"
                        alt="Wonder Blocks logo"
                    />
                    <SingleSelect
                        placeholder="Placeholder"
                        selectedValue={"item-1"}
                        onChange={() => {}}
                        style={{width: "200px"}}
                    >
                        <OptionItem value="item-1" label="Item 1" />
                        <OptionItem value="item-2" label="Item 2" />
                    </SingleSelect>
                    <NavigationTabs
                        aria-label="Secondary navigation"
                        styles={{root: styles.navigationTabsRoot}}
                    >
                        <NavigationTabItem
                            current={true} // replace with logic checking if this is the current route
                        >
                            <Link href="#link-1">Tab link 1</Link>
                        </NavigationTabItem>
                        <NavigationTabItem>
                            <Link href="#link-2">Tab link 2</Link>
                        </NavigationTabItem>
                        <NavigationTabItem>
                            <Link href="#link-3">Tab link 3</Link>
                        </NavigationTabItem>
                    </NavigationTabs>
                </StyledHeader>
            </StyledDiv>
        );
    },
    parameters: {
        layout: "fullscreen",
    },
};
