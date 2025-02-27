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
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import Tooltip from "@khanacademy/wonder-blocks-tooltip";
import {Popover, PopoverContent} from "@khanacademy/wonder-blocks-popover";
import {HeadingLarge} from "@khanacademy/wonder-blocks-typography";
import Link from "@khanacademy/wonder-blocks-link";

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
            <NavigationTabItem>
                <Link href="#link-1">Tab link 1</Link>
            </NavigationTabItem>
        </NavigationTabs>
    );
};
