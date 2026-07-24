import * as React from "react";
import {StyleSheet} from "aphrodite";
import plusIcon from "@phosphor-icons/core/bold/plus-bold.svg";
import equalsIcon from "@phosphor-icons/core/bold/equals-bold.svg";
import backgroundImageExample from "./background-image-example.svg";
import backgroundPattern from "./background-pattern.svg";
import View from "../../../packages/wonder-blocks-core/src/components/view";
import {BodyText} from "@khanacademy/wonder-blocks-typography";
import {sizing} from "../../../packages/wonder-blocks-tokens/src/theme/primitive/sizing";
import {semanticColor} from "@khanacademy/wonder-blocks-tokens";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import heroPolygon from "./hero-polygon.svg";
import heroAsterisk from "./hero-asterisk.svg";
import hero from "./hero.svg";
import {addStyle} from "@khanacademy/wonder-blocks-core";

export default {};

const text = <BodyText>Text that should be ledgible across themes</BodyText>;
const StyledImg = addStyle("img");

type Props = {
    badExample: {label: string; content: React.ReactNode};
    goodExample: {label: string; content: React.ReactNode};
};
const Example = (props: Props) => {
    const {badExample, goodExample} = props;
    return (
        <View style={styles.container}>
            <View
                style={{
                    flexDirection: "row",
                    gap: sizing.size_120,
                }}
            >
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

const Breakdown = (props: {
    breakdown: React.ReactNode[];
    final?: React.ReactNode;
}) => {
    const {breakdown, final} = props;
    return (
        <View
            style={{
                flexDirection: "row",
                gap: sizing.size_120,
                alignItems: "center",
            }}
        >
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

export const BackgroundPattern = () => {
    return (
        <Example
            goodExample={{
                label: "Semantic colors for background + CSS mask-image",
                content: (
                    <View style={[styles.block, styles.backgroundPatternBase]}>
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
};

export const BackgroundPatternBreakdown = () => {
    return (
        <Breakdown
            breakdown={[
                <View style={[styles.block, styles.backgroundPatternBase]} />,
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
};

export const BackgroundWithShapes = () => {
    return (
        <Example
            badExample={{
                label: "CSS background-image",
                content: (
                    <View style={[styles.block, styles.heroImage]}>{text}</View>
                ),
            }}
            goodExample={{
                label: "Semantic colors for background + CSS mask-image",
                content: (
                    <View style={styles.breakdownContainer}>
                        <View
                            style={[styles.block, styles.backgroundForShapes]}
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
};

export const BackgroundWithShapesBreakdown = () => {
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
};

const styles = StyleSheet.create({
    container: {
        gap: sizing.size_120,
        padding: sizing.size_120,
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
});
