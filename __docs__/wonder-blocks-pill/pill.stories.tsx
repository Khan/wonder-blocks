import * as React from "react";
import type {Meta, StoryObj} from "@storybook/react";
import {expect} from "@storybook/jest";

import {within, userEvent} from "@storybook/testing-library";
import {View} from "@khanacademy/wonder-blocks-core";
import Link from "@khanacademy/wonder-blocks-link";
import Pill from "@khanacademy/wonder-blocks-pill";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {tokens} from "@khanacademy/wonder-blocks-theming";
import {
    Body,
    BodySerif,
    LabelMedium,
} from "@khanacademy/wonder-blocks-typography";
import type {PillKind} from "../../packages/wonder-blocks-pill/src/components/pill";

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
            <Pill kind="neutral" size="small">
                inline
            </Pill>
        </Body>
        <Strut size={tokens.spacing.small_12} />
        <Body>
            This pill is also{" "}
            <Pill kind="neutral" size="small" onClick={() => {}}>
                inline (clickable)
            </Pill>
        </Body>
    </View>
);

Inline.parameters = {
    docs: {
        description: {
            story: `Pills can be used inline. Note that while both small and
                large pills can be used inline, it is recommended to use small
                pills when inline with body text since they fit within the
                line height whereas large pills do not.`,
        },
    },
};

/**
 * There are six kinds of pills: neutral, accent, info, success, warning,
 * and critical. This can be specified using the `kind` prop.
 *
 * The following kinds respond to the following colors:
 * - `neutral`: gray
 * - `accent`: blue
 * - `info`: light blue
 * - `success`: light green
 * - `warning`: yellow
 * - `critical`: light red
 *
 * Pills can also be of two different sizes: small and large. By default,
 * small pills use Wonder Blocks `LabelSmall` typography, and large pills
 * use Wonder Blocks `Body`.
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
        ];

        return (
            <View style={{flexDirection: "row"}}>
                <View>
                    {/* Non-clickable variants, small */}
                    {kinds.map((kind) => (
                        <View
                            key={kind}
                            style={{marginRight: tokens.spacing.small_12}}
                        >
                            <Pill
                                kind={kind}
                                size="small"
                                testId={`${kind}-small-test-id`}
                            >
                                {`${kind}, small`}
                            </Pill>
                            <Strut size={tokens.spacing.small_12} />
                        </View>
                    ))}
                </View>
                <View>
                    {/* Non-clickable variants, large */}
                    {kinds.map((kind) => (
                        <View
                            key={kind}
                            style={{marginRight: tokens.spacing.small_12}}
                        >
                            <Pill
                                kind={kind}
                                size="large"
                                testId={`${kind}-large-test-id`}
                            >
                                {`${kind}, large`}
                            </Pill>
                            <Strut size={tokens.spacing.small_12} />
                        </View>
                    ))}
                </View>
                <View>
                    {/* Clickable variants, small */}
                    {kinds.map((kind) => (
                        <View
                            key={kind}
                            style={{marginRight: tokens.spacing.small_12}}
                        >
                            <Pill
                                kind={kind}
                                size="small"
                                onClick={() => {}}
                                testId={`${kind}-small-clickable-test-id`}
                            >
                                {`${kind}, small`}
                            </Pill>
                            <Strut size={tokens.spacing.small_12} />
                        </View>
                    ))}
                </View>
                <View>
                    {/* Clickable variants, large */}
                    {kinds.map((kind) => (
                        <View
                            key={kind}
                            style={{marginRight: tokens.spacing.small_12}}
                        >
                            <Pill
                                kind={kind}
                                size="large"
                                onClick={() => {}}
                                testId={`${kind}-large-clickable-test-id`}
                            >
                                {`${kind}, large`}
                            </Pill>
                            <Strut size={tokens.spacing.small_12} />
                        </View>
                    ))}
                </View>
            </View>
        );
    },
};

// Test visual styles
Variants.play = async ({canvasElement}) => {
    const canvas = within(canvasElement);

    // Define non-clickable pills
    const neutralSmall = canvas.getByTestId("neutral-small-test-id");
    const accentSmall = canvas.getByTestId("accent-small-test-id");
    const infoSmall = canvas.getByTestId("info-small-test-id");
    const successSmall = canvas.getByTestId("success-small-test-id");
    const warningSmall = canvas.getByTestId("warning-small-test-id");
    const criticalSmall = canvas.getByTestId("critical-small-test-id");
    const neutralLarge = canvas.getByTestId("neutral-large-test-id");
    const accentLarge = canvas.getByTestId("accent-large-test-id");
    const infoLarge = canvas.getByTestId("info-large-test-id");
    const successLarge = canvas.getByTestId("success-large-test-id");
    const warningLarge = canvas.getByTestId("warning-large-test-id");
    const criticalLarge = canvas.getByTestId("critical-large-test-id");

    // Define clickable pills
    const neutralSmallClickable = canvas.getByTestId(
        "neutral-small-clickable-test-id",
    );
    const accentSmallClickable = canvas.getByTestId(
        "accent-small-clickable-test-id",
    );
    const infoSmallClickable = canvas.getByTestId(
        "info-small-clickable-test-id",
    );
    const successSmallClickable = canvas.getByTestId(
        "success-small-clickable-test-id",
    );
    const warningSmallClickable = canvas.getByTestId(
        "warning-small-clickable-test-id",
    );
    const criticalSmallClickable = canvas.getByTestId(
        "critical-small-clickable-test-id",
    );
    const neutralLargeClickable = canvas.getByTestId(
        "neutral-large-clickable-test-id",
    );
    const accentLargeClickable = canvas.getByTestId(
        "accent-large-clickable-test-id",
    );
    const infoLargeClickable = canvas.getByTestId(
        "info-large-clickable-test-id",
    );
    const successLargeClickable = canvas.getByTestId(
        "success-large-clickable-test-id",
    );
    const warningLargeClickable = canvas.getByTestId(
        "warning-large-clickable-test-id",
    );
    const criticalLargeClickable = canvas.getByTestId(
        "critical-large-clickable-test-id",
    );

    // Test non-clickable pill styles
    await expect(neutralSmall).toHaveStyle({
        backgroundColor: tokens.color.offBlack8,
        color: tokens.color.offBlack,
        fontSize: 12,
    });

    await expect(accentSmall).toHaveStyle({
        backgroundColor: tokens.color.blue,
        color: tokens.color.white,
        fontSize: 12,
    });

    await expect(infoSmall).toHaveStyle({
        backgroundColor: tokens.color.pillBlue,
        color: tokens.color.offBlack,
        fontSize: 12,
    });

    await expect(successSmall).toHaveStyle({
        backgroundColor: tokens.color.pillGreen,
        color: tokens.color.offBlack,
        fontSize: 12,
    });

    await expect(warningSmall).toHaveStyle({
        backgroundColor: tokens.color.pillGold,
        color: tokens.color.offBlack,
        fontSize: 12,
    });

    await expect(criticalSmall).toHaveStyle({
        backgroundColor: tokens.color.pillRed,
        color: tokens.color.offBlack,
        fontSize: 12,
    });

    await expect(neutralLarge).toHaveStyle({
        backgroundColor: tokens.color.offBlack8,
        color: tokens.color.offBlack,
        fontSize: 16,
    });

    await expect(accentLarge).toHaveStyle({
        backgroundColor: tokens.color.blue,
        color: tokens.color.white,
        fontSize: 16,
    });

    await expect(infoLarge).toHaveStyle({
        backgroundColor: tokens.color.pillBlue,
        color: tokens.color.offBlack,
        fontSize: 16,
    });

    await expect(successLarge).toHaveStyle({
        backgroundColor: tokens.color.pillGreen,
        color: tokens.color.offBlack,
        fontSize: 16,
    });

    await expect(warningLarge).toHaveStyle({
        backgroundColor: tokens.color.pillGold,
        color: tokens.color.offBlack,
        fontSize: 16,
    });

    await expect(criticalLarge).toHaveStyle({
        backgroundColor: tokens.color.pillRed,
        color: tokens.color.offBlack,
        fontSize: 16,
    });

    // Test clickable pill styles
    await userEvent.tab();
    let computedStyle = getComputedStyle(neutralSmallClickable, ":hover");
    await expect(computedStyle.outline).toBe("rgb(24, 101, 242) solid 2px");

    await userEvent.tab();
    computedStyle = getComputedStyle(accentSmallClickable, ":hover");
    await expect(computedStyle.outline).toBe("rgb(24, 101, 242) solid 2px");

    await userEvent.tab();
    computedStyle = getComputedStyle(infoSmallClickable, ":hover");
    await expect(computedStyle.outline).toBe("rgb(24, 101, 242) solid 2px");

    await userEvent.tab();
    computedStyle = getComputedStyle(successSmallClickable, ":hover");
    await expect(computedStyle.outline).toBe("rgb(24, 101, 242) solid 2px");

    await userEvent.tab();
    computedStyle = getComputedStyle(warningSmallClickable, ":hover");
    await expect(computedStyle.outline).toBe("rgb(24, 101, 242) solid 2px");

    await userEvent.tab();
    computedStyle = getComputedStyle(criticalSmallClickable, ":hover");
    await expect(computedStyle.outline).toBe("rgb(217, 41, 22) solid 2px");

    await userEvent.tab();
    computedStyle = getComputedStyle(neutralLargeClickable, ":hover");
    await expect(computedStyle.outline).toBe("rgb(24, 101, 242) solid 2px");

    await userEvent.tab();
    computedStyle = getComputedStyle(accentLargeClickable, ":hover");
    await expect(computedStyle.outline).toBe("rgb(24, 101, 242) solid 2px");

    await userEvent.tab();
    computedStyle = getComputedStyle(infoLargeClickable, ":hover");
    await expect(computedStyle.outline).toBe("rgb(24, 101, 242) solid 2px");

    await userEvent.tab();
    computedStyle = getComputedStyle(successLargeClickable, ":hover");
    await expect(computedStyle.outline).toBe("rgb(24, 101, 242) solid 2px");

    await userEvent.tab();
    computedStyle = getComputedStyle(warningLargeClickable, ":hover");
    await expect(computedStyle.outline).toBe("rgb(24, 101, 242) solid 2px");

    await userEvent.tab();
    computedStyle = getComputedStyle(criticalLargeClickable, ":hover");
    await expect(computedStyle.outline).toBe("rgb(217, 41, 22) solid 2px");
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
};

export const WithStyle: StoryComponentType = () => {
    const customStyle = {
        backgroundColor: tokens.color.offBlack,
        color: tokens.color.white,
        paddingLeft: tokens.spacing.xxLarge_48,
        paddingRight: tokens.spacing.xxLarge_48,

        ":hover": {
            outlineColor: tokens.color.offBlack,
        },

        ":active": {
            outlineColor: tokens.color.offBlack64,
            backgroundColor: tokens.color.offBlack64,
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
