import * as React from "react";
import type {Meta, StoryObj} from "@storybook/react-vite";

import {View} from "@khanacademy/wonder-blocks-core";
import {BodyText} from "@khanacademy/wonder-blocks-typography";
import {sizing} from "@khanacademy/wonder-blocks-tokens";

import {AllVariants} from "../components/all-variants";
import {allThemeModes} from "../../.storybook/modes";

/**
 * The following stories are used to generate the style combinations for the BodyText
 * component. This is only used for visual testing in Chromatic.
 */
export default {
    title: "Packages / Typography / Testing / Snapshots / BodyText",
    component: BodyText,
    parameters: {
        chromatic: {
            modes: allThemeModes,
        },
    },
    tags: ["!autodocs"],
} as Meta<typeof BodyText>;

type StoryComponentType = StoryObj<typeof BodyText>;

const weights = ["medium", "semi", "bold"] as const;
const sizes = ["xsmall", "small", "medium"] as const;

const rows = sizes.map((size) => ({
    name: size,
    props: {size},
}));

const columns = weights.map((weight) => ({
    name: weight,
    props: {weight},
}));

export const AllVariantsStory: StoryComponentType = {
    name: "All Variants",
    render: () => {
        return (
            <AllVariants rows={rows} columns={columns} title="Size / Weight">
                {({props, name}) => (
                    <View key={name} style={{gap: sizing.size_120}}>
                        <BodyText {...props}>{name}</BodyText>
                    </View>
                )}
            </AllVariants>
        );
    },
};
