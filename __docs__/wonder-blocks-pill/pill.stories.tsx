import * as React from "react";
import type {Meta, StoryObj} from "@storybook/react";

// import {expect, within} from "@storybook/test";
import {View} from "@khanacademy/wonder-blocks-core";
import Link from "@khanacademy/wonder-blocks-link";
import Pill from "@khanacademy/wonder-blocks-pill";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import * as tokens from "@khanacademy/wonder-blocks-tokens";
import {
    Body,
    BodySerif,
    LabelMedium,
} from "@khanacademy/wonder-blocks-typography";
import type {StyleType} from "@khanacademy/wonder-blocks-core";
import type {
    PillKind,
    PillSize,
} from "../../packages/wonder-blocks-pill/src/components/pill";

import ComponentInfo from "../components/component-info";
import packageConfig from "../../packages/wonder-blocks-search-field/package.json";

import PillArgtypes from "./pill.argtypes";

export default {
    component: Pill,
    title: "Packages / Pill",
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
        chromatic: {
            // These stories are being tested in pill-variants.stories.tsx
            disableSnapshot: true,
        },
    },
    argTypes: PillArgtypes,
} as Meta<typeof Pill>;

type StoryComponentType = StoryObj<typeof Pill>;

export const Default: StoryComponentType = {
    args: {children: "This is some text!", kind: "neutral"},
};

export const Clickable: StoryComponentType = () => (
    <View>
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

Clickable.parameters = {
    docs: {
        description: {
            story: `Pills can be made clickable by specifying the \`onClick\`
                prop. In this example, the pill has an \`onClick\`
                prop that triggers a window alert. Note that clickable
                pills also have an outline style on hover/click, whereas
                non-clickable pills do not.`,
        },
    },
};

export const Inline: StoryComponentType = () => (
    <View>
        <Body>
            Hello! This pill is{" "}
            <Pill kind="neutral" size="medium">
                inline (medium)
            </Pill>{" "}
            , but it can be{" "}
            <Pill kind="neutral" size="small">
                small
            </Pill>{" "}
            if you need it to be.
        </Body>
        <Strut size={tokens.spacing.small_12} />
        <Body>
            This pill is also{" "}
            <Pill kind="neutral" size="medium" onClick={() => {}}>
                inline (medium, clickable)
            </Pill>
            , and this one is{" "}
            <Pill kind="neutral" size="small" onClick={() => {}}>
                small (clickable)
            </Pill>
            .
        </Body>
    </View>
);

Inline.parameters = {
    docs: {
        description: {
            story: `Pills can be used inline. In general, it is recommended
            that inline pills be medium size so that they are big enough to
            read in terms of accessibility, but not so big that they take up
            too much line space. However, small pills can also be used inline
            if necessary.`,
        },
    },
    // This story presents some context that is not present in the other stories
    chromatic: {disableSnapshot: false},
};

/**
 * There are seven kinds of pills: neutral, accent, info, success, warning,
 * critical and transparent. This can be specified using the `kind` prop.
 *
 * The following kinds respond to the following colors:
 * - `neutral`: gray
 * - `accent`: blue
 * - `info`: light blue
 * - `success`: light green
 * - `warning`: yellow
 * - `critical`: light red
 * - `transparent`: transparent
 *
 * Pills can also be of three different sizes: small, medium, and large. If the
 * size is not specified, it defaults to medium. Small pills use Wonder Blocks
 * `LabelXSmall` typography, medium pills use Wonder Blocks `LabelSmall`, and
 * large pills use Wonder Blocks `Body`.
 */
export const Variants: StoryComponentType = {
    render: () => {
        const kinds: Array<PillKind> = [
            "neutral",
            "accent",
            "info",
            "success",
            "warning",
            "critical",
            "transparent",
        ];

        const sizes: Array<PillSize> = ["small", "medium", "large"];

        const directionStyle: StyleType = {
            flexDirection: "row",

            "@media (max-width: 1023px)": {
                flexDirection: "column",
            },
        };

        return (
            <View style={directionStyle}>
                <View style={{flexDirection: "row"}}>
                    {sizes.map((size) => (
                        <View key={size}>
                            {kinds.map((kind) => (
                                <View
                                    key={kind}
                                    style={{
                                        marginRight: tokens.spacing.small_12,
                                    }}
                                >
                                    <Pill
                                        kind={kind}
                                        size={size}
                                        testId={`${kind}-${size}-test-id`}
                                    >
                                        {`${kind}, ${size}`}
                                    </Pill>
                                    <Strut size={tokens.spacing.small_12} />
                                </View>
                            ))}
                        </View>
                    ))}
                </View>
                <View style={{flexDirection: "row"}}>
                    {sizes.map((size) => (
                        <View key={size}>
                            {kinds.map((kind) => (
                                <View
                                    key={kind}
                                    style={{
                                        marginRight: tokens.spacing.small_12,
                                    }}
                                >
                                    <Pill
                                        kind={kind}
                                        size={size}
                                        onClick={() => {}}
                                        testId={`${kind}-${size}-clickable-test-id`}
                                    >
                                        {`${kind}, ${size}`}
                                    </Pill>
                                    <Strut size={tokens.spacing.small_12} />
                                </View>
                            ))}
                        </View>
                    ))}
                </View>
            </View>
        );
    },
};

export const WithTypography: StoryComponentType = () => (
    <Pill size="large">
        <BodySerif>
            This is a {<Link href="#">link</Link>} inside the text of a pill.
        </BodySerif>
    </Pill>
);

WithTypography.parameters = {
    docs: {
        description: {
            story: `Pills can have Wonder Blocks Typography elements
                as children. In this example, the Pill has a Wonder Blocks
                Typography \`BodySerif\` component as its child.
                Note that this also allows you to include a link inside
                the text, as is shown here.`,
        },
    },
    chromatic: {disableSnapshot: false},
};

export const WithStyle: StoryComponentType = () => {
    const customStyle = {
        backgroundColor: tokens.semanticColor.surface.inverse,
        color: tokens.semanticColor.text.inverse,
        paddingLeft: tokens.spacing.xxLarge_48,
        paddingRight: tokens.spacing.xxLarge_48,

        ":hover": {
            outlineColor: tokens.semanticColor.border.strong,
        },

        ":active": {
            outlineColor: tokens.semanticColor.border.primary,
            backgroundColor: tokens.semanticColor.surface.overlay,
        },
    };

    return (
        <Pill
            kind="neutral"
            size="small"
            style={customStyle}
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
                In addition, this pill is clickable, and its hover
                and active styles have also been customized to match
                it new color.`,
        },
    },
    chromatic: {disableSnapshot: false},
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
                        style={{marginRight: tokens.spacing.xSmall_8}}
                    >
                        {option}
                    </Pill>
                ))}
            </View>
            <Strut size={tokens.spacing.small_12} />
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

/**
 * One consideration is that it can be difficult to click on a
 * small pill when it is vertically stacked with others. Consider
 * adding some margin to the pills to make it easier to click and
 * therefore more accessible.
 */
export const VerticallyStacked: StoryComponentType = {
    render: () => {
        const titles = ["Math", "Science", "History", "English"];
        const sizes = [0, 2, 4, 8, 12, 16];

        return (
            <View style={{flexDirection: "row"}}>
                {sizes.map((size) => (
                    <View
                        key={size}
                        style={{marginRight: tokens.spacing.medium_16}}
                    >
                        <LabelMedium>{size}px margin</LabelMedium>
                        <Strut size={tokens.spacing.small_12} />
                        {titles.map((title) => (
                            <View key={title}>
                                <Pill
                                    kind="neutral"
                                    size="small"
                                    onClick={() => {}}
                                >
                                    {title}
                                </Pill>
                                <Strut size={size} />
                            </View>
                        ))}
                    </View>
                ))}
            </View>
        );
    },
};
