import * as React from "react";
import type {Meta, StoryObj} from "@storybook/react-vite";

import {View} from "@khanacademy/wonder-blocks-core";
import {semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";

import Toolbar from "@khanacademy/wonder-blocks-toolbar";
import {ScenariosLayout} from "../components/scenarios-layout";
import {leftContentMappings, rightContentMappings} from "./toolbar.argtypes";
import {allThemeModes} from "../../.storybook/modes";

/**
 * The following stories are used to generate the snapshots for the Toolbar
 * component. This is only used for visual testing in Chromatic.
 */
export default {
    title: "Packages / Toolbar / Testing / Snapshots / Toolbar",
    component: Toolbar,
    parameters: {
        chromatic: {
            modes: allThemeModes,
        },
    },
    globals: {
        backgrounds: {
            value: "baseSubtle",
        },
    },
    tags: ["!autodocs", "!manifest"],
} as Meta<typeof Toolbar>;

type Story = StoryObj<typeof Toolbar>;

/**
 * The following story shows how the component handles specific scenarios.
 */
export const Scenarios: Story = {
    render() {
        const scenarios = [
            {
                name: "Default",
                props: {
                    title: "Counting with small numbers",
                    leftContent: leftContentMappings.dismissButton,
                    rightContent: rightContentMappings.nextVideoButton,
                },
            },
            {
                name: "Small",
                props: {
                    size: "small",
                    leftContent: leftContentMappings.multipleContent,
                    rightContent: rightContentMappings.tertiaryButton,
                },
            },
            {
                name: "Medium",
                props: {
                    leftContent: leftContentMappings.hintButton,
                    rightContent: rightContentMappings.primaryButton,
                },
            },
            {
                name: "With Title",
                props: {
                    leftContent: leftContentMappings.dismissButton,
                    title: "Counting with small numbers",
                },
            },
            {
                name: "Dark",
                props: {
                    color: "dark",
                    title: "Title",
                    leftContent: leftContentMappings.lightButton,
                    rightContent: rightContentMappings.lightButton,
                },
            },
            {
                name: "With Multiple Elements",
                props: {
                    rightContent: rightContentMappings.multipleContent,
                },
            },
            {
                name: "Header Overflow Text",
                props: {
                    leftContent: leftContentMappings.dismissButton,
                    subtitle: "1 of 14 questions answered",
                    title: "Patterns of migration and communal bird-feeding given the serious situation of things that will make this string long and obnoxious",
                    rightContent: rightContentMappings.link,
                },
            },
            {
                name: "Custom Toolbar",
                props: {
                    leftContent: leftContentMappings.exitWithTitle,
                    rightContent: rightContentMappings.primaryButton,
                    title: (
                        <View
                            style={{
                                width: 300,
                                maxInlineSize: "100%",
                                height: sizing.size_080,
                                background: semanticColor.mastery.primary,
                            }}
                        />
                    ),
                },
            },
        ];

        return (
            <ScenariosLayout
                scenarios={scenarios}
                styles={{root: {alignItems: "stretch"}}}
            >
                {(props) => <Toolbar {...props} />}
            </ScenariosLayout>
        );
    },
};
