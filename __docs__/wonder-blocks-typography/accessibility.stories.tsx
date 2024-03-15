import * as React from "react";
import {StyleSheet} from "aphrodite";

import {View} from "@khanacademy/wonder-blocks-core";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {color, spacing} from "@khanacademy/wonder-blocks-tokens";
import {Body} from "@khanacademy/wonder-blocks-typography";

import {IconMappings} from "../wonder-blocks-icon/phosphor-icon.argtypes";

const styles = StyleSheet.create({
    explanation: {
        fontWeight: 700,
        flexDirection: "row",
        marginTop: spacing.xSmall_8,
    },
    correct: {
        color: color.green,
        marginRight: spacing.xxxSmall_4,
        paddingTop: spacing.xxxxSmall_2,
    },
    incorrect: {
        color: color.red,
        marginRight: spacing.xxxSmall_4,
        paddingTop: spacing.xxxxSmall_2,
    },
});

export default {
    title: "Typography / Accessibility",

    // Disables chromatic testing for these stories.
    parameters: {
        previewTabs: {
            canvas: {
                hidden: true,
            },
        },

        viewMode: "docs",

        chromatic: {
            disableSnapshot: true,
        },
    },
};

export const FontSize = {
    render: () => (
        <View>
            <View style={styles.explanation}>
                <PhosphorIcon
                    icon={IconMappings.xCircle}
                    style={styles.incorrect}
                />
                <Body>
                    The following text is too small for body text (10px):
                </Body>
            </View>
            <View>
                <p
                    style={{
                        fontSize: "10px",
                    }}
                >
                    The quick brown fox jumps over the lazy dog.
                </p>
            </View>
            <View style={styles.explanation}>
                <PhosphorIcon
                    icon={IconMappings.checkCircle}
                    style={styles.correct}
                />
                <Body>
                    The following text is adequate for body text (16px):
                </Body>
            </View>
            <Body>The quick brown fox jumps over the lazy dog</Body>
        </View>
    ),

    name: "Font size",
};

export const ColorContrast = {
    render: () => (
        <View>
            <View style={styles.explanation}>
                <PhosphorIcon
                    icon={IconMappings.xCircle}
                    style={styles.incorrect}
                />
                <Body>
                    The color contrast for the following text is too low:
                </Body>
            </View>
            <Body
                style={{
                    color: color.offBlack32,
                }}
            >
                The quick brown fox jumps over the lazy dog
            </Body>
            <View style={styles.explanation}>
                <PhosphorIcon
                    icon={IconMappings.checkCircle}
                    style={styles.correct}
                />
                <Body>
                    The color contrast for the following text is adequate:
                </Body>
            </View>
            <Body
                style={{
                    color: color.offBlack,
                }}
            >
                The quick brown fox jumps over the lazy dog
            </Body>
        </View>
    ),

    name: "Color contrast",
};

export const LineSpacing = {
    render: () => (
        <View>
            <View style={styles.explanation}>
                <PhosphorIcon
                    icon={IconMappings.xCircle}
                    style={styles.incorrect}
                />
                <Body>The following line spacing is too small:</Body>
            </View>
            <View>
                <p
                    style={{
                        lineHeight: 1,
                    }}
                >
                    Khan Academy offers practice exercises, instructional
                    videos, and a personalized learning dashboard that empower
                    learners to study at their own pace in and outside of the
                    classroom. We tackle math, science, computing, history, art
                    history, economics, and more, including K-14 and test
                    preparation (SAT, Praxis, LSAT) content. We focus on skill
                    mastery to help learners establish strong foundations, so
                    there is no limit to what they can learn next!
                </p>
            </View>
            <View style={styles.explanation}>
                <PhosphorIcon
                    icon={IconMappings.checkCircle}
                    style={styles.correct}
                />
                <Body>The following line spacing is adequate:</Body>
            </View>
            <Body>
                Khan Academy offers practice exercises, instructional videos,
                and a personalized learning dashboard that empower learners to
                study at their own pace in and outside of the classroom. We
                tackle math, science, computing, history, art history,
                economics, and more, including K-14 and test preparation (SAT,
                Praxis, LSAT) content. We focus on skill mastery to help
                learners establish strong foundations, so there is no limit to
                what they can learn next!
            </Body>
        </View>
    ),

    name: "Line spacing",
};
