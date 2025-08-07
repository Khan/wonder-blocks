import * as React from "react";
import {StyleSheet} from "aphrodite";
import {semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import {ActionColorGroup, ColorGroup} from "../components/color";
import {PropsFor, View} from "@khanacademy/wonder-blocks-core";

export default {
    title: "Packages/Tokens/Semantic Colors/Groups",
    parameters: {
        chromatic: {
            disableSnapshot: true,
        },
    },
    tags: ["!dev", "!autodocs"],
};

const valuePrefix = "semanticColor.";

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
                valuePrefix={valuePrefix}
            />
        </View>
    );
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
    return (
        <ColorGroup
            colors={semanticColor.focus}
            group="focus"
            valuePrefix={valuePrefix}
        />
    );
};

export const Surface = () => {
    return (
        <ColorGroup
            colors={semanticColor.surface}
            group="surface"
            valuePrefix={valuePrefix}
        />
    );
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
    return (
        <ColorGroup
            colors={semanticColor.khanmigo}
            group="khanmigo"
            valuePrefix={valuePrefix}
        />
    );
};

export const Mastery = () => {
    return (
        <ColorGroup
            colors={semanticColor.mastery}
            group="mastery"
            valuePrefix={valuePrefix}
        />
    );
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
