import * as React from "react";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import {View} from "@khanacademy/wonder-blocks-core";
import {Heading} from "@khanacademy/wonder-blocks-typography";
import {
    CoreBorder,
    CoreBackground,
    CoreForeground,
    FeedbackInfo,
    FeedbackSuccess,
    FeedbackWarning,
    FeedbackCritical,
    Focus,
    Surface,
    Input,
    LearningMath,
    LearningBorder,
    LearningBackground,
    LearningForeground,
    LearningShadow,
    Khanmigo,
    Mastery,
    ActionPrimaryProgressive,
    ActionPrimaryDestructive,
    ActionPrimaryNeutral,
    ActionPrimaryDisabled,
    ActionSecondaryProgressive,
    ActionSecondaryDestructive,
    ActionSecondaryNeutral,
    ActionSecondaryDisabled,
    ActionTertiaryProgressive,
    ActionTertiaryDestructive,
    ActionTertiaryNeutral,
    ActionTertiaryDisabled,
    Status,
} from "./semantic-color-groups.stories";

export default {
    title: "Packages/Tokens/Semantic Colors",
    tags: ["!autodocs", "!dev"],
};

/**
 * All the semantic colors for visual regression testing.
 */
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
                <Heading tag="h3" size="medium">
                    Math
                </Heading>
                <LearningMath />
                <Heading tag="h3" size="medium">
                    Border
                </Heading>
                <LearningBorder />
                <Heading tag="h3" size="medium">
                    Background
                </Heading>
                <LearningBackground />
                <Heading tag="h3" size="medium">
                    Foreground
                </Heading>
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
                <Heading tag="h2" size="large">
                    Deprecated
                </Heading>
                <Heading tag="h3" size="medium">
                    Action
                </Heading>
                <Heading tag="h4" size="medium">
                    Primary
                </Heading>
                <Heading tag="h5" size="small">
                    Progressive
                </Heading>
                <ActionPrimaryProgressive />
                <Heading tag="h5" size="small">
                    Destructive
                </Heading>
                <ActionPrimaryDestructive />
                <Heading tag="h5" size="small">
                    Neutral
                </Heading>
                <ActionPrimaryNeutral />
                <Heading tag="h5" size="small">
                    Disabled
                </Heading>
                <ActionPrimaryDisabled />
                <Heading tag="h4" size="medium">
                    Secondary
                </Heading>
                <Heading tag="h5" size="small">
                    Progressive
                </Heading>
                <ActionSecondaryProgressive />
                <Heading tag="h5" size="small">
                    Destructive
                </Heading>
                <ActionSecondaryDestructive />
                <Heading tag="h5" size="small">
                    Neutral
                </Heading>
                <ActionSecondaryNeutral />
                <Heading tag="h5" size="small">
                    Disabled
                </Heading>
                <ActionSecondaryDisabled />
                <Heading tag="h4" size="medium">
                    Tertiary
                </Heading>
                <Heading tag="h5" size="small">
                    Progressive
                </Heading>
                <ActionTertiaryProgressive />
                <Heading tag="h5" size="small">
                    Destructive
                </Heading>
                <ActionTertiaryDestructive />
                <Heading tag="h5" size="small">
                    Neutral
                </Heading>
                <ActionTertiaryNeutral />
                <Heading tag="h5" size="small">
                    Disabled
                </Heading>
                <ActionTertiaryDisabled />
                <Heading tag="h3" size="large">
                    Status
                </Heading>
                <Status />
            </View>
        );
    },
    parameters: {
        chromatic: {
            disableSnapshots: true,
        },
    },
};
