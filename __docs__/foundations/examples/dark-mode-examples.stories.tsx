import * as React from "react";
import {StyleSheet} from "aphrodite";
import type {Meta, StoryObj} from "@storybook/react-vite";
import plusIcon from "@phosphor-icons/core/bold/plus-bold.svg";
import equalsIcon from "@phosphor-icons/core/bold/equals-bold.svg";
import {addStyle, View} from "@khanacademy/wonder-blocks-core";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import {BodyText} from "@khanacademy/wonder-blocks-typography";
import backgroundImageExample from "./background-image-example.svg";
import backgroundPattern from "./background-pattern.svg";
import heroPolygon from "./hero-polygon.svg";
import heroAsterisk from "./hero-asterisk.svg";
import hero from "./hero.svg";

/**
 * These stories are illustrative examples embedded in the `Foundations / Dark
 * Mode` documentation via `<Canvas of={...} />`. They are hidden from the
 * sidebar, autodocs, and the component manifest since they only exist to
 * support that MDX page.
 */
export default {
    title: "Foundations / Dark Mode / Examples",
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
        width: 200,
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
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
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
    },
    polygon: {
        position: "absolute",
        left: "-50%",
        top: "-130px",
        width: "100%",
        height: "100%",
        zIndex: -1,
    },
    asterisk: {
        position: "absolute",
        top: "125px",
        right: "0",
        height: "100%",
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
                        <span role="img" aria-label="Don't use">
                            ❌
                        </span>{" "}
                        {badExample.label}
                    </BodyText>
                </View>
                <View style={styles.example}>
                    {goodExample.content}
                    <BodyText>
                        <span role="img" aria-label="Use">
                            ✅
                        </span>{" "}
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
