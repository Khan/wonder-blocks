import * as React from "react";
import packageConfig from "../../packages/wonder-blocks-switch/package.json";
import ComponentInfo from "../components/component-info";
import {
    NavigationTabItem,
    NavigationTabs,
    Tab,
    TabItem,
    Tablist,
    TabPanel,
    Tabs,
    Test,
} from "../../packages/wonder-blocks-tabs/src/index";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {IconMappings} from "../wonder-blocks-icon/phosphor-icon.argtypes";
import {semanticColor, spacing} from "@khanacademy/wonder-blocks-tokens";
import Tooltip from "@khanacademy/wonder-blocks-tooltip";
import {Popover, PopoverContent} from "@khanacademy/wonder-blocks-popover";
import {HeadingLarge} from "@khanacademy/wonder-blocks-typography";
import Link from "@khanacademy/wonder-blocks-link";
import {OptionItem, SingleSelect} from "@khanacademy/wonder-blocks-dropdown";

export default {
    title: "Packages / Tabs / NavigationTabs",
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
    },
};

export const Default = () => {
    return (
        <NavigationTabs aria-label="Secondary navigation">
            <NavigationTabItem
                selected={true} // replace with logic checking if this is the current route
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
    );
};

export const LinkCapabilities = () => {
    return (
        <NavigationTabs aria-label="Secondary navigation">
            <NavigationTabItem
                selected={true} // replace with logic checking if this is the current route
            >
                <Link href="https://khanacademy.org/" target="_blank">
                    External tab link
                </Link>
            </NavigationTabItem>
            <NavigationTabItem>
                <Link
                    href="#link-2"
                    startIcon={<PhosphorIcon icon={IconMappings.calendar} />}
                >
                    Tab link with start icon
                </Link>
            </NavigationTabItem>
            <NavigationTabItem>
                <Link
                    href="#link-2"
                    endIcon={<PhosphorIcon icon={IconMappings.gear} />}
                >
                    Tab link with end icon
                </Link>
            </NavigationTabItem>
        </NavigationTabs>
    );
};

export const PartOfNav = () => {
    const pageStyle = {
        backgroundColor: semanticColor.surface.secondary,
        height: "100vh",
        width: "100%",
    };
    const navStyle = {
        backgroundColor: semanticColor.surface.primary,
        display: "flex",
        alignItems: "center",
        borderBottom: `1px solid ${semanticColor.border.primary}`,
        width: "100%",
        gap: spacing.large_24,
        padding: `${spacing.small_12}px ${spacing.large_24}px`,
    };
    const navTabItemStyles = {
        root: {
            // Increase padding on tab items for the navigation header
            paddingTop: spacing.large_24,
            paddingBottom: spacing.large_24,
        },
    };
    return (
        <div style={pageStyle}>
            <nav style={navStyle}>
                <img src="/logo.svg" width="40px" alt="Wonder Blocks logo" />
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
                    styles={{
                        root: {
                            // set negative margin so that selected indicator lines up with nav border
                            margin: `-${spacing.small_12}px 0`,
                        },
                    }}
                >
                    <NavigationTabItem
                        selected={true} // replace with logic checking if this is the current route
                        styles={navTabItemStyles}
                    >
                        <Link href="#link-1">Tab link 1</Link>
                    </NavigationTabItem>
                    <NavigationTabItem styles={navTabItemStyles}>
                        <Link href="#link-2">Tab link 2</Link>
                    </NavigationTabItem>
                    <NavigationTabItem styles={navTabItemStyles}>
                        <Link href="#link-3">Tab link 3</Link>
                    </NavigationTabItem>
                </NavigationTabs>
            </nav>
        </div>
    );
};
PartOfNav.parameters = {
    layout: "fullscreen",
};
