import {StyleSheet} from "aphrodite";
import * as React from "react";
import {semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import {ActionColorGroup, ColorGroup} from "../components/color";
import {PropsFor, View} from "@khanacademy/wonder-blocks-core";
import {Heading} from "@khanacademy/wonder-blocks-typography";

export default {
    title: "Packages/Tokens/Testing/SemanticColors",
    parameters: {
        chromatic: {
            disableSnapshot: true,
        },
    },
};

const ColorGroupStory = ({
    category,
    group,
    includeExample = false,
}: PropsFor<typeof ActionColorGroup>) => {
    return (
        <View style={styles.gridCompact}>
            <ActionColorGroup
                category={category}
                group={group}
                includeExample={includeExample}
            />
        </View>
    );
};

export const SemanticColors = {
    render: () => {
        return (
            <View style={{gap: sizing.size_120}}>
                <Heading tag="h1" size="xlarge">
                    Semantic Colors
                </Heading>
                <Heading tag="h2" size="large">
                    Core
                </Heading>
                <Heading tag="h3" size="medium">
                    Border
                </Heading>
                <CoreBorder />
                <Heading tag="h3">Background</Heading>
                <CoreBackground />
                <Heading tag="h3">Foreground</Heading>
                <CoreForeground />
                <Heading tag="h2" size="large">
                    Feedback
                </Heading>
                <Heading tag="h3" size="medium">
                    Info
                </Heading>
                <FeedbackInfo />
                <Heading tag="h3" size="medium">
                    Success
                </Heading>
                <FeedbackSuccess />
                <Heading tag="h3" size="medium">
                    Warning
                </Heading>
                <FeedbackWarning />
                <Heading tag="h3" size="medium">
                    Critical
                </Heading>
                <FeedbackCritical />
                <Heading tag="h2" size="large">
                    Focus
                </Heading>
                <Focus />
                <Heading tag="h2" size="large">
                    Surface
                </Heading>
                <Surface />
                <Heading tag="h2" size="large">
                    Input
                </Heading>
                <Input />
                <Heading tag="h2" size="large">
                    Learning
                </Heading>
                <LearningMath />
                <LearningBorder />
                <LearningBackground />
                <LearningForeground />
                <LearningShadow />
                <Heading tag="h2" size="large">
                    Khanmigo
                </Heading>
                <Khanmigo />
                <Heading tag="h2" size="large">
                    Mastery
                </Heading>
                <Mastery />
            </View>
        );
    },
    parameters: {
        chromatic: {
            disableSnapshots: true,
        },
    },
};
export const CoreBorder = () => {
    return (
        <ColorGroupStory
            category={semanticColor.core.border}
            group="core.border"
        />
    );
};

export const CoreBackground = () => {
    return (
        <ColorGroupStory
            category={semanticColor.core.background}
            group="core.background"
        />
    );
};

export const CoreForeground = () => {
    return (
        <ColorGroupStory
            category={semanticColor.core.foreground}
            group="core.foreground"
        />
    );
};

export const FeedbackInfo = () => {
    return (
        <ColorGroupStory
            category={semanticColor.feedback.info}
            group="feedback.info"
        />
    );
};

export const FeedbackSuccess = () => {
    return (
        <ColorGroupStory
            category={semanticColor.feedback.success}
            group="feedback.success"
        />
    );
};

export const FeedbackWarning = () => {
    return (
        <ColorGroupStory
            category={semanticColor.feedback.warning}
            group="feedback.warning"
        />
    );
};

export const FeedbackCritical = () => {
    return (
        <ColorGroupStory
            category={semanticColor.feedback.critical}
            group="feedback.critical"
        />
    );
};

export const Focus = () => {
    return <ColorGroup colors={semanticColor.focus} group="focus" />;
};

export const Surface = () => {
    return <ColorGroup colors={semanticColor.surface} group="surface" />;
};

export const Input = () => {
    return (
        <ColorGroupStory
            category={semanticColor.input}
            group="input"
            includeExample={true}
        />
    );
};

export const LearningMath = () => {
    return (
        <ColorGroup
            colors={semanticColor.learning.math.foreground}
            group="learning.math.foreground"
        />
    );
};

export const LearningBorder = () => {
    return (
        <ColorGroupStory
            category={semanticColor.learning.border}
            group="learning.border"
        />
    );
};

export const LearningBackground = () => {
    return (
        <>
            <ColorGroupStory
                category={{
                    gems: semanticColor.learning.background.gems,
                    streaks: semanticColor.learning.background.streaks,
                    due: semanticColor.learning.background.due,
                }}
                group="learning.background"
            />
            <ColorGroupStory
                category={semanticColor.learning.background.progress}
                group="learning.background.progress"
            />
        </>
    );
};

export const LearningForeground = () => {
    return (
        <>
            <ColorGroupStory
                category={{
                    gems: semanticColor.learning.foreground.gems,
                    streaks: semanticColor.learning.foreground.streaks,
                    due: semanticColor.learning.foreground.due,
                }}
                group="learning.foreground"
            />
            <ColorGroupStory
                category={semanticColor.learning.foreground.progress}
                group="learning.foreground.progress"
            />
        </>
    );
};

export const LearningShadow = () => {
    return (
        <ColorGroupStory
            category={semanticColor.learning.shadow.progress}
            group="learning.shadow.progress"
        />
    );
};

export const Khanmigo = () => {
    return <ColorGroup colors={semanticColor.khanmigo} group="khanmigo" />;
};

export const Mastery = () => {
    return <ColorGroup colors={semanticColor.mastery} group="mastery" />;
};
const styles = StyleSheet.create({
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(2, minmax(100px, auto))",
    },
    gridSmall: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, 160px)",
    },
    gridCompact: {
        display: "grid",
        gridTemplateColumns: "repeat(3, minmax(100px, auto))",
    },

    banner: {
        marginBottom: sizing.size_320,
    },
});
