import * as React from "react";
import type {Meta, StoryObj} from "@storybook/react-vite";

import {View} from "@khanacademy/wonder-blocks-core";
import {BodyText} from "@khanacademy/wonder-blocks-typography";

import {DrawerDialog, DrawerLauncher} from "@khanacademy/wonder-blocks-modal";

import type {ModalElement} from "../../packages/wonder-blocks-modal/src/util/types";

import {allModes} from "../../.storybook/modes";
import {reallyLongText} from "../components/text-for-testing";

const DefaultModal = (): ModalElement => (
    <DrawerDialog
        title="Single-line title"
        content={
            <View>
                <BodyText>{reallyLongText}</BodyText>
            </View>
        }
    />
);

export default {
    title: "Packages / Modal / Testing / Snapshots / DrawerLauncher",
    component: DrawerLauncher,
    parameters: {
        chromatic: {
            modes: {
                default: allModes.themeDefault,
                "default rtl": allModes["themeDefault rtl"],
                small: allModes.small,
                thunderblocks: allModes.themeThunderBlocks,
            },
        },
    },
    tags: ["!autodocs"],
} as Meta<typeof DrawerLauncher>;

type StoryComponentType = StoryObj<typeof DrawerLauncher>;

/**
 * Visual snapshots showing the different drawer variants in their opened states.
 * These stories demonstrate the positioning and layout of the drawers.
 */

/**
 * InlineStart drawer
 */
export const InlineStart: StoryComponentType = {
    render: () => (
        <DrawerLauncher
            modal={DefaultModal}
            alignment="inlineStart"
            opened={true}
            animated={false}
            onClose={() => {}}
        />
    ),
    parameters: {
        docs: {disable: true},
    },
};

/**
 * InlineEnd drawer
 */
export const InlineEnd: StoryComponentType = {
    render: () => (
        <DrawerLauncher
            modal={DefaultModal}
            alignment="inlineEnd"
            opened={true}
            animated={false}
            onClose={() => {}}
        />
    ),
    parameters: {
        docs: {disable: true},
    },
};

/**
 * InlineEnd drawer
 */
// TODO (WB-2080): Use media query tokens here and in ModalContent
const small = "@media (max-width: 767px)" as any;

export const InlineEndCustomStyle: StoryComponentType = {
    render: () => (
        <DrawerLauncher
            modal={
                <DrawerDialog
                    title="Single-line title"
                    styles={{
                        root: {
                            minWidth: "320px", // style only applies to desktop
                            width: "unset",
                        },
                        content: {
                            paddingInline: 0,
                            [small]: {
                                paddingInline: 0,
                            },
                        },
                    }}
                    content={
                        <View>
                            <BodyText>
                                Some text that doesn’t fill the screen
                            </BodyText>
                        </View>
                    }
                />
            }
            alignment="inlineEnd"
            opened={true}
            animated={false}
            onClose={() => {}}
        />
    ),
    parameters: {
        docs: {disable: true},
    },
};

/**
 * BlockEnd drawer
 */
export const BlockEnd: StoryComponentType = {
    render: () => (
        <DrawerLauncher
            modal={DefaultModal}
            alignment="blockEnd"
            opened={true}
            animated={false}
            onClose={() => {}}
        />
    ),
    parameters: {
        docs: {disable: true},
    },
};
