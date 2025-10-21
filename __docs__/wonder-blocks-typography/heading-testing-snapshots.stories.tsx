import * as React from "react";
import type {Meta, StoryObj} from "@storybook/react-vite";

import {View} from "@khanacademy/wonder-blocks-core";
import {Heading} from "@khanacademy/wonder-blocks-typography";
import {sizing} from "@khanacademy/wonder-blocks-tokens";

import {AllVariants} from "../components/all-variants";
import {themeModes} from "../../.storybook/modes";

/**
 * The following stories are used to generate the style combinations for the Heading
 * component. This is only used for visual testing in Chromatic.
 */
export default {
    title: "Packages / Typography / Testing / Snapshots / Heading",
    component: Heading,
    parameters: {
        chromatic: {
            modes: themeModes,
        },
    },
    tags: ["!autodocs"],
} as Meta<typeof Heading>;

type StoryComponentType = StoryObj<typeof Heading>;

const weights = ["medium", "semi", "bold"] as const;
const sizes = ["small", "medium", "large", "xlarge", "xxlarge"] as const;

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
    render: (args) => {
        return (
            <AllVariants rows={rows} columns={columns} title="Size / Weight">
                {({props, name}) => (
                    <View key={name} style={{gap: sizing.size_120}}>
                        <Heading {...props}>{name}</Heading>
                    </View>
                )}
            </AllVariants>
        );
    },
};
