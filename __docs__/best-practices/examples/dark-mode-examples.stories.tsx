import * as React from "react";
import {StyleSheet} from "aphrodite";
import type {Meta, StoryObj} from "@storybook/react-vite";
import plusIcon from "@phosphor-icons/core/bold/plus-bold.svg";
import equalsIcon from "@phosphor-icons/core/bold/equals-bold.svg";
import checkIcon from "@phosphor-icons/core/bold/check-bold.svg";
import avoidIcon from "@phosphor-icons/core/bold/x-bold.svg";
import cookieIcon from "@phosphor-icons/core/bold/cookie-bold.svg";
import {addStyle, View} from "@khanacademy/wonder-blocks-core";
import {Icon, PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {border, semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import {BodyText} from "@khanacademy/wonder-blocks-typography";
import backgroundImageExample from "./assets/background-image-example.svg";
import backgroundPattern from "./assets/background-pattern.svg";
import heroPolygon from "./assets/hero-polygon.svg";
import heroAsterisk from "./assets/hero-asterisk.svg";
import hero from "./assets/hero.svg";
import logoIcon from "./assets/logo-icon.svg";
import multiColoredIcon from "./assets/multi-colored-icon.svg";
/**
 * These stories are illustrative examples embedded in the `Foundations / Dark
 * Mode` documentation via `<Canvas of={...} />`. They are hidden from the
 * sidebar, autodocs, and the component manifest since they only exist to
 * support that MDX page.
 */
export default {
    title: "Best Practices / Dark Mode / Examples",
    tags: ["!dev", "!autodocs", "!manifest"],
    parameters: {
        // These are documentation illustrations rather than component states,
        // so visual regression snapshots are not needed.
        chromatic: {disableSnapshot: true},
    },
} as Meta;

type StoryComponentType = StoryObj;

const StyledImg = addStyle("img");

const styles = StyleSheet.create({
    container: {
        gap: sizing.size_120,
        padding: sizing.size_120,
    },
    examples: {
        flexDirection: "row",
        gap: sizing.size_120,
    },
    breakdownContainer: {
        flexDirection: "row",
        gap: sizing.size_120,
        alignItems: "center",
    },
    example: {
        gap: sizing.size_080,
        inlineSize: 200,
    },
    backgroundImage: {
        backgroundImage: `url(${backgroundImageExample})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
    },
    backgroundPatternBase: {
        backgroundColor: semanticColor.graphics.gems.background.default,
    },
    backgroundPattern: {
        position: "absolute",
        insetInlineStart: 0,
        insetBlockStart: 0,
        insetBlockEnd: 0,
        insetInlineEnd: 0,
        backgroundColor: semanticColor.graphics.gems.background.subtle,
        maskImage: `url(${backgroundPattern})`,
        maskPosition: "center",
        maskRepeat: "no-repeat",
        maskSize: "cover",
        zIndex: -1,
    },
    backgroundForShapes: {
        background: semanticColor.core.background.instructive.subtle,
    },
    block: {
        position: "relative",
        width: 200,
        height: 200,
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        overflow: "hidden",
        border: `${border.width.thin} solid ${semanticColor.core.border.neutral.subtle}`,
    },
    polygon: {
        position: "absolute",
        insetInlineStart: "-50%",
        insetBlockStart: "-65%",
        inlineSize: "100%",
        blockSize: "100%",
        zIndex: -1,
    },
    asterisk: {
        position: "absolute",
        insetBlockStart: "62.5%",
        insetInlineEnd: "0",
        blockSize: "100%",
        zIndex: -1,
    },
    heroImage: {
        backgroundImage: `url(${hero})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
    },
    text: {
        padding: sizing.size_080,
    },
    iconExamples: {
        flexDirection: "row",
        gap: sizing.size_160,
    },
});

const text = (
    <BodyText style={styles.text}>
        Text that should be legible across themes
    </BodyText>
);

type ExampleProps = {
    badExample: {label: string; content: React.ReactNode};
    goodExample: {label: string; content: React.ReactNode};
};

/**
 * Renders a side-by-side comparison of a "don't" example and a "do" example.
 */
const Example = (props: ExampleProps) => {
    const {badExample, goodExample} = props;
    return (
        <View style={styles.container}>
            <View style={styles.examples}>
                <View style={styles.example}>
                    {badExample.content}
                    <BodyText>
                        <PhosphorIcon
                            icon={avoidIcon}
                            aria-label="Don't use"
                            color={
                                semanticColor.core.foreground.critical.default
                            }
                        />{" "}
                        {badExample.label}
                    </BodyText>
                </View>
                <View style={styles.example}>
                    {goodExample.content}
                    <BodyText>
                        <PhosphorIcon
                            icon={checkIcon}
                            aria-label="Use"
                            color={
                                semanticColor.core.foreground.success.default
                            }
                        />{" "}
                        {goodExample.label}
                    </BodyText>
                </View>
            </View>
        </View>
    );
};

type BreakdownProps = {
    breakdown: React.ReactNode[];
    final?: React.ReactNode;
};

/**
 * Renders each layer of an example separated by `+` icons, followed by an `=`
 * icon and the composed result, to illustrate how the example is built up.
 */
const Breakdown = (props: BreakdownProps) => {
    const {breakdown, final} = props;
    return (
        <View style={styles.breakdownContainer}>
            {breakdown.map((breakdownItem, index) => (
                <React.Fragment key={index}>
                    {breakdownItem}

                    <PhosphorIcon
                        icon={
                            index < breakdown.length - 1 ? plusIcon : equalsIcon
                        }
                        color={semanticColor.core.foreground.neutral.strong}
                    />
                </React.Fragment>
            ))}
            {final}
        </View>
    );
};

/**
 * A background pattern that adapts across themes by painting a semantic color
 * token behind a CSS `mask-image`, compared with a hardcoded CSS
 * `background-image` that stays the same color in every theme.
 */
export const BackgroundPattern: StoryComponentType = {
    render: function Render() {
        return (
            <Example
                goodExample={{
                    label: "Semantic colors for background + CSS mask-image",
                    content: (
                        <View
                            style={[styles.block, styles.backgroundPatternBase]}
                        >
                            <View
                                style={styles.backgroundPattern}
                                tag="span"
                                aria-hidden={true}
                            />
                            {text}
                        </View>
                    ),
                }}
                badExample={{
                    label: "CSS background-image",
                    content: (
                        <View style={[styles.block, styles.backgroundImage]}>
                            {text}
                        </View>
                    ),
                }}
            />
        );
    },
};

/**
 * Shows how the good background pattern example above is composed: a base layer
 * painted with a semantic token, plus a masked overlay layer, equals the final
 * result with legible text.
 */
export const BackgroundPatternBreakdown: StoryComponentType = {
    render: function Render() {
        return (
            <Breakdown
                breakdown={[
                    <View
                        style={[styles.block, styles.backgroundPatternBase]}
                    />,
                    <View style={styles.block}>
                        <View
                            style={styles.backgroundPattern}
                            tag="span"
                            aria-hidden={true}
                        />
                    </View>,
                ]}
                final={
                    <View style={[styles.block, styles.backgroundPatternBase]}>
                        <View
                            style={styles.backgroundPattern}
                            tag="span"
                            aria-hidden={true}
                        />
                        {text}
                    </View>
                }
            />
        );
    },
};

/**
 * A hero background with decorative shapes that adapts across themes by using a
 * semantic background color token and masked shape overlays, compared with a
 * hardcoded CSS `background-image`.
 */
export const BackgroundWithShapes: StoryComponentType = {
    render: function Render() {
        return (
            <Example
                badExample={{
                    label: "CSS background-image",
                    content: (
                        <View style={[styles.block, styles.heroImage]}>
                            {text}
                        </View>
                    ),
                }}
                goodExample={{
                    label: "Semantic colors for background + CSS mask-image",
                    content: (
                        <View style={styles.breakdownContainer}>
                            <View
                                style={[
                                    styles.block,
                                    styles.backgroundForShapes,
                                ]}
                            >
                                <StyledImg
                                    src={heroPolygon}
                                    alt=""
                                    style={styles.polygon}
                                />
                                <StyledImg
                                    src={heroAsterisk}
                                    alt=""
                                    style={styles.asterisk}
                                />
                                {text}
                            </View>
                        </View>
                    ),
                }}
            />
        );
    },
};

/**
 * Shows how the good background-with-shapes example above is composed: a base
 * layer painted with a semantic token, plus each decorative shape overlay,
 * equals the final result with legible text.
 */
export const BackgroundWithShapesBreakdown: StoryComponentType = {
    render: function Render() {
        return (
            <Breakdown
                breakdown={[
                    <View style={[styles.block, styles.backgroundForShapes]} />,
                    <View style={styles.block}>
                        <StyledImg
                            src={heroPolygon}
                            alt=""
                            style={styles.polygon}
                        />
                    </View>,
                    <View style={styles.block}>
                        <StyledImg
                            src={heroAsterisk}
                            alt=""
                            style={styles.asterisk}
                        />
                    </View>,
                ]}
                final={
                    <View style={[styles.block, styles.backgroundForShapes]}>
                        <StyledImg
                            src={heroPolygon}
                            alt=""
                            style={styles.polygon}
                        />
                        <StyledImg
                            src={heroAsterisk}
                            alt=""
                            style={styles.asterisk}
                        />
                        {text}
                    </View>
                }
            />
        );
    },
};

export const SingleColoredIcons: StoryComponentType = {
    render: function Render() {
        return (
            <Example
                badExample={{
                    label: "Icon using img src",
                    content: (
                        <View style={styles.iconExamples}>
                            <img
                                src={cookieIcon}
                                alt="Cookie"
                                style={{
                                    width: sizing.size_480,
                                    height: sizing.size_480,
                                }}
                            />
                            <img
                                src={logoIcon}
                                alt="Khan Academy Logo"
                                style={{
                                    width: sizing.size_480,
                                    height: sizing.size_480,
                                }}
                            />
                        </View>
                    ),
                }}
                goodExample={{
                    label: "Icon using PhosphorIcon",
                    content: (
                        <View style={styles.iconExamples}>
                            <PhosphorIcon
                                icon={cookieIcon}
                                size="large"
                                color={
                                    semanticColor.core.foreground.neutral.strong
                                }
                                aria-label="Cookie"
                            />
                            <PhosphorIcon
                                icon={logoIcon}
                                size="large"
                                color={
                                    semanticColor.core.foreground.neutral.strong
                                }
                                aria-label="Khan Academy Logo"
                            />
                        </View>
                    ),
                }}
            />
        );
    },
};

const MultiColoredIcon = () => {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            <g clip-path="url(#clip0_15325_2095)">
                <path
                    d="M2 6C2 3.79086 3.79086 2 6 2H18C20.2091 2 22 3.79086 22 6V18C22 20.2091 20.2091 22 18 22H6C3.79086 22 2 20.2091 2 18V6Z"
                    fill={semanticColor.graphics.role.administrator.background}
                />
                <path
                    d="M1.3934 1.3934L12 12L1.3934 22.6066V1.3934Z"
                    fill={semanticColor.graphics.role.administrator.foreground}
                />
                <path
                    d="M22.6066 1.3934L12 12L22.6066 22.6066V1.3934Z"
                    fill={semanticColor.graphics.role.administrator.foreground}
                />
            </g>
            <defs>
                <clipPath id="clip0_15325_2095">
                    <path
                        d="M2 6C2 3.79086 3.79086 2 6 2H18C20.2091 2 22 3.79086 22 6V18C22 20.2091 20.2091 22 18 22H6C3.79086 22 2 20.2091 2 18V6Z"
                        fill="white"
                    />
                </clipPath>
            </defs>
        </svg>
    );
};

export const MultiColoredIcons: StoryComponentType = {
    render: function Render() {
        return (
            <Example
                badExample={{
                    label: "Icon using img src",
                    content: (
                        <Icon size="large">
                            <img
                                src={multiColoredIcon}
                                alt="Multi-colored Icon"
                            />
                        </Icon>
                    ),
                }}
                goodExample={{
                    label: "Icon using inline svg with semantic colors",
                    content: (
                        <Icon size="large">
                            <MultiColoredIcon />
                        </Icon>
                    ),
                }}
            />
        );
    },
};
