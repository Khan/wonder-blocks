import * as React from "react";
import type {Meta, StoryObj} from "@storybook/react";
import {color} from "@khanacademy/wonder-blocks-tokens";
import {HeadingSmall} from "@khanacademy/wonder-blocks-typography";
import {fadedColorWithWhite} from "../../packages/wonder-blocks-tokens/src/tokens/color";

export default {
    title: "Grays",
} as Meta;

type StoryComponentType = StoryObj;

const Colors = ({colors}) => {
    return colors.map(({name, hex}) => {
        return (
            <div
                key={name}
                style={{
                    display: "flex",
                    gap: 8,
                    alignItems: "center",
                }}
            >
                <div style={{width: 150}}>{name}</div>
                <div style={{width: 150}}>{hex}</div>
                <div
                    style={{
                        color: hex,
                        backgroundColor: color.fadedBlue8,
                        padding: 8,
                        width: 100,
                        height: 20,
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    text
                </div>
                <div
                    style={{
                        backgroundColor: hex,
                        padding: 8,
                        width: 100,
                        height: 20,
                    }}
                />
            </div>
        );
    });
};
export const Default: StoryComponentType = {
    args: {},
    render() {
        const existingGrays = Object.keys(color)
            .filter(
                (key) =>
                    key.startsWith("fadedOffBlack") ||
                    key.startsWith("offBlack"),
            )
            .reverse()
            .map((key) => ({name: key, hex: color[key]}));
        const alternativeGrays = [
            65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 80, 90, 95, 99,
        ].map((key) => ({
            name: `fadedOffBlack${key}`,
            hex: fadedColorWithWhite(color.offBlack, key / 100),
        }));
        const proposed = "#6D6F74";
        return (
            <div style={{display: "flex", gap: 32}}>
                <div
                    style={{display: "flex", flexDirection: "column", gap: 16}}
                >
                    <HeadingSmall>Existing grays</HeadingSmall>
                    <Colors colors={existingGrays} />
                    <HeadingSmall>Alternative Grays</HeadingSmall>
                    <Colors colors={alternativeGrays} />
                    <HeadingSmall>Proposed</HeadingSmall>
                    <Colors colors={[{name: "Proposed", hex: proposed}]} />
                </div>
                <div
                    style={{display: "flex", flexDirection: "column", gap: 16}}
                >
                    <HeadingSmall>Proposed: {proposed} </HeadingSmall>

                    <div
                        style={{
                            backgroundColor: proposed,
                            padding: 8,
                            width: 100,
                            flex: 1,
                        }}
                    />
                </div>
            </div>
        );
    },
};
