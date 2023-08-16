import * as React from "react";
import type {Meta, StoryObj} from "@storybook/react";
import {expect} from "@storybook/jest";

import {within} from "@storybook/testing-library";
import Color from "@khanacademy/wonder-blocks-color";
import {View} from "@khanacademy/wonder-blocks-core";
import Link from "@khanacademy/wonder-blocks-link";
import Pill from "@khanacademy/wonder-blocks-pill";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {Body} from "@khanacademy/wonder-blocks-typography";

import ComponentInfo from "../../.storybook/components/component-info";
import packageConfig from "../../packages/wonder-blocks-search-field/package.json";

import PillArgtypes from "./pill.argtypes";

export default {
    component: Pill,
    title: "Pill",
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
    },
    argTypes: PillArgtypes,
} as Meta<typeof Pill>;

type StoryComponentType = StoryObj<typeof Pill>;

export const Default: StoryComponentType = {
    args: {children: "This is some text!", kind: "neutral"},
};

export const Variants: StoryComponentType = () => {
    return (
        <View>
            <Pill kind="neutral" size="small" testId="neutral-small-test-id">
                Neutral, small
            </Pill>
            <Strut size={Spacing.small_12} />
            <Pill kind="accent" size="small" testId="accent-small-test-id">
                Accent, small
            </Pill>
            <Strut size={Spacing.small_12} />
            <Pill kind="neutral" size="large" testId="neutral-large-test-id">
                Neutral, large
            </Pill>
            <Strut size={Spacing.small_12} />
            <Pill kind="accent" size="large" testId="accent-large-test-id">
                Accent, large
            </Pill>
        </View>
    );
};

Variants.parameters = {
    docs: {
        description: {
            story: `There are two kinds of pills: neutral and accent.
                This can be specified using the \`kind\` prop.
                Neutral pills are gray, accent pills are blue.`,
        },
    },
};

// Test visual styles
Variants.play = async ({canvasElement}) => {
    const canvas = within(canvasElement);

    const neutralSmall = canvas.getByTestId("neutral-small-test-id");
    const accentSmall = canvas.getByTestId("accent-small-test-id");
    const neutralLarge = canvas.getByTestId("neutral-large-test-id");
    const accentLarge = canvas.getByTestId("accent-large-test-id");

    await expect(neutralSmall).toHaveStyle({
        backgroundColor: Color.offBlack8,
        color: Color.offBlack,
        fontSize: 12,
    });

    await expect(accentSmall).toHaveStyle({
        backgroundColor: Color.blue,
        color: Color.white,
        fontSize: 12,
    });

    await expect(neutralLarge).toHaveStyle({
        backgroundColor: Color.offBlack8,
        color: Color.offBlack,
        fontSize: 16,
    });

    await expect(accentLarge).toHaveStyle({
        backgroundColor: Color.blue,
        color: Color.white,
        fontSize: 16,
    });
};

export const Clickable: StoryComponentType = () => (
    <View>
        <Pill
            kind="accent"
            size="small"
            onClick={() => {
                // eslint-disable-next-line no-alert
                alert("Click!");
            }}
        >
            With onClick
        </Pill>
        <Strut size={Spacing.small_12} />
        <Pill
            kind="accent"
            size="large"
            onClick={() => {
                // eslint-disable-next-line no-alert
                alert("Click!");
            }}
        >
            With onClick
        </Pill>
    </View>
);

export const Inline: StoryComponentType = () => (
    <View>
        <Body>
            Hello! This pill is{" "}
            <Pill kind="neutral" size="small">
                inline
            </Pill>
        </Body>
    </View>
);

Inline.parameters = {
    docs: {
        description: {
            story: `Small pills can be used inline with text.`,
        },
    },
};

Clickable.parameters = {
    docs: {
        description: {
            story: `Pills can be made clickable by specifying the \`onClick\`
                prop. In this example, the top button has an \`onClick\`
                prop that triggersa window alert.`,
        },
    },
};

export const WithLink: StoryComponentType = () => (
    <Pill size="large">
        <>This is a {<Link href="#">link</Link>} inside the text of a pill</>
    </Pill>
);

WithLink.parameters = {
    docs: {
        description: {
            story: `The \`text\` prop can be a string or a Wonder Blocks Link.
                In this example, the text of the pill contains a link.`,
        },
    },
};

export const WithStyle: StoryComponentType = () => {
    const customStyle = {
        backgroundColor: Color.offBlack,
        color: Color.white,
        paddingLeft: Spacing.xxLarge_48,
        paddingRight: Spacing.xxLarge_48,
    };

    const clickableStyle = {
        ":hover": {
            outline: `2px solid ${Color.offBlack}`,
            outlineOffset: 2,
        },
        ":active": {
            backgroundColor: Color.offBlack64,
            outline: `2px solid ${Color.offBlack64}`,
            outlineOffset: 2,
        },
        ":focus-visible": {
            outline: `2px solid ${Color.offBlack}`,
            outlineOffset: 2,
        },
    };

    return (
        <Pill
            kind="neutral"
            size="large"
            style={[customStyle, clickableStyle]}
            onClick={() => {}}
        >
            With Style
        </Pill>
    );
};

WithStyle.parameters = {
    docs: {
        description: {
            story: `The \`style\` prop can be used to customize the
                appearance of the pill. In this example, the pill has a
                custom background color, text color, and padding.
                In addition, this pill is clickable, and its hover, focus,
                and active styles have also been customized.`,
        },
    },
};

export const InList: StoryComponentType = () => {
    const [selected, setSelected] = React.useState("Apple");
    const options = ["Apple", "Banana", "Orange"];

    return (
        <View>
            <View style={{flexDirection: "row"}}>
                {options.map((option) => (
                    <Pill
                        key={option}
                        size="large"
                        kind={option === selected ? "accent" : "neutral"}
                        onClick={() => setSelected(option)}
                        role="radio"
                        style={{marginRight: Spacing.xSmall_8}}
                    >
                        {option}
                    </Pill>
                ))}
            </View>
            <Strut size={Spacing.small_12} />
            <Body>You have selected: {selected}</Body>
        </View>
    );
};

InList.parameters = {
    docs: {
        description: {
            story: `This is an example of how pills may be used in a list.
                In this example, clicking on a pill selects it, and the
                selected pill is highlighted with an accent color. Also,
                the role has been set to \`"radio"\` to indicate that these
                pills are effectively behaving like a radio buttons.`,
        },
    },
};
