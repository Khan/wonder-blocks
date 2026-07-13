import * as React from "react";
import {StyleSheet} from "aphrodite";
import {semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import {ActionColorGroup, ColorGroup} from "../components/color";
import {PropsFor, View} from "@khanacademy/wonder-blocks-core";
import {Heading} from "@khanacademy/wonder-blocks-typography";

export default {
    title: "Packages/Tokens/Semantic Colors/Groups",
    parameters: {
        chromatic: {
            disableSnapshot: true,
        },
    },
    tags: ["!dev", "!autodocs", "!manifest"],
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

export const CoreShadow = () => {
    return (
        <ColorGroupStory
            category={{
                transparent: {
                    low: semanticColor.core.shadow.transparent.low,
                    mid: semanticColor.core.shadow.transparent.mid,
                    high: semanticColor.core.shadow.transparent.high,
                },
                "transparent.color":
                    semanticColor.core.shadow.transparent.color,
                "chonky.instructive":
                    semanticColor.core.shadow.chonky.instructive,
                "chonky.neutral": semanticColor.core.shadow.chonky.neutral,
            }}
            group="core.shadow"
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

export const FeedbackNeutral = () => {
    return (
        <ColorGroupStory
            category={semanticColor.feedback.neutral}
            group="feedback.neutral"
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
        <View style={styles.groupOfColorGroupStory}>
            <ColorGroupStory
                category={{
                    gems: semanticColor.learning.border.gems,
                    streaks: semanticColor.learning.border.streaks,
                    due: semanticColor.learning.border.due,
                }}
                group="learning.border"
            />
        </View>
    );
};

export const LearningBackground = () => {
    return (
        <View style={styles.groupOfColorGroupStory}>
            <ColorGroupStory
                category={{
                    gems: semanticColor.learning.background.gems,
                    streaks: semanticColor.learning.background.streaks,
                    due: semanticColor.learning.background.due,
                }}
                group="learning.background"
            />
            <Heading size="medium">Progress</Heading>
            <ColorGroupStory
                category={semanticColor.learning.background.progress}
                group="learning.background.progress"
            />
        </View>
    );
};

export const LearningForeground = () => {
    return (
        <View style={styles.groupOfColorGroupStory}>
            <ColorGroupStory
                category={{
                    gems: semanticColor.learning.foreground.gems,
                    streaks: semanticColor.learning.foreground.streaks,
                    due: semanticColor.learning.foreground.due,
                }}
                group="learning.foreground"
            />
            <Heading size="medium">Progress</Heading>
            <ColorGroupStory
                category={semanticColor.learning.foreground.progress}
                group="learning.foreground.progress"
            />
        </View>
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

export const GraphicsCharactersFlesh = () => {
    return (
        <View style={styles.groupOfColorGroupStory}>
            {Object.entries(semanticColor.graphics.characters.flesh).map(
                ([colorName, colorGroup]) => (
                    <React.Fragment key={colorName}>
                        <Heading
                            size="medium"
                            style={styles.capitalized}
                            tag="h5"
                        >
                            Characters Flesh {colorName}
                        </Heading>
                        <ColorGroupStory
                            category={colorGroup}
                            group={`graphics.characters.flesh.${colorName}`}
                        />
                    </React.Fragment>
                ),
            )}
        </View>
    );
};

export const GraphicsGems = () => {
    return (
        <ColorGroupStory
            category={semanticColor.graphics.gems}
            group="graphics.gems"
        />
    );
};

export const GraphicsStreaks = () => {
    return (
        <ColorGroupStory
            category={semanticColor.graphics.streaks}
            group="graphics.streaks"
        />
    );
};

export const GraphicsProgress = () => {
    return (
        <View style={styles.groupOfColorGroupStory}>
            {Object.entries(semanticColor.graphics.progress).map(
                ([state, colorGroup]) => (
                    <React.Fragment key={state}>
                        <Heading size="medium" style={styles.capitalized}>
                            {state}
                        </Heading>
                        <ColorGroupStory
                            category={colorGroup}
                            group={`graphics.progress.${state}`}
                        />
                    </React.Fragment>
                ),
            )}
        </View>
    );
};

export const GraphicsRole = () => {
    return (
        <ColorGroupStory
            category={{
                "all.current": semanticColor.graphics.role.all.current,
                administrator: semanticColor.graphics.role.administrator,
                learner: semanticColor.graphics.role.learner,
                parent: semanticColor.graphics.role.parent,
                teacher: semanticColor.graphics.role.teacher,
            }}
            group="graphics.role"
        />
    );
};

export const GraphicsNeutral = () => {
    return (
        <ColorGroupStory
            category={semanticColor.graphics.neutral}
            group="graphics.neutral"
        />
    );
};

export const GraphicsExternalBrands = () => {
    return (
        <ColorGroupStory
            category={semanticColor.graphics.externalBrands}
            group="graphics.externalBrands"
        />
    );
};

const styles = StyleSheet.create({
    groupOfColorGroupStory: {
        gap: sizing.size_080,
    },
    capitalized: {
        textTransform: "capitalize",
    },
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
        // Always lay out 3 equal-width columns so items stay the same size
        // regardless of how many are in the group (e.g. a group with 2 items
        // matches the size of a group with 3).
        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    },

    banner: {
        marginBlockEnd: sizing.size_320,
    },
});
