import * as React from "react";
import {StyleSheet} from "aphrodite";

import {View} from "@khanacademy/wonder-blocks-core";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {semanticColor, spacing} from "@khanacademy/wonder-blocks-tokens";
import {BodyText} from "@khanacademy/wonder-blocks-typography";

import {IconMappings} from "../wonder-blocks-icon/phosphor-icon.argtypes";

const styles = StyleSheet.create({
    explanation: {
        fontWeight: 700,
        flexDirection: "row",
        marginTop: spacing.xSmall_8,
    },
    correct: {
        color: semanticColor.core.foreground.success.default,
        marginRight: spacing.xxxSmall_4,
        paddingTop: spacing.xxxxSmall_2,
    },
    incorrect: {
        color: semanticColor.core.foreground.critical.default,
        marginRight: spacing.xxxSmall_4,
        paddingTop: spacing.xxxxSmall_2,
    },
});

export default {
    title: "Packages / Typography / Accessibility",
    component: BodyText,

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
                <BodyText>
                    The following text is too small for body text (10px):
                </BodyText>
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
                <BodyText>
                    The following text is adequate for body text (16px):
                </BodyText>
            </View>
            <BodyText>The quick brown fox jumps over the lazy dog</BodyText>
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
                <BodyText>
                    The color contrast for the following text is too low:
                </BodyText>
            </View>
            <BodyText
                style={{
                    // NOTE: Using disabled on purpose to demonstrate the
                    // contrast ratio issue.
                    color: semanticColor.core.foreground.disabled.default,
                }}
            >
                The quick brown fox jumps over the lazy dog
            </BodyText>
            <View style={styles.explanation}>
                <PhosphorIcon
                    icon={IconMappings.checkCircle}
                    style={styles.correct}
                />
                <BodyText>
                    The color contrast for the following text is adequate:
                </BodyText>
            </View>
            <BodyText
                style={{
                    color: semanticColor.core.foreground.neutral.strong,
                }}
            >
                The quick brown fox jumps over the lazy dog
            </BodyText>
        </View>
    ),
    parameters: {
        a11y: {
            config: {
                rules: [
                    // Disabling warning: "The color contrast between text and
                    // its background meets WCAG AA contrast ratio." since this
                    // is a demonstration of a low contrast color.
                    {id: "color-contrast", enabled: false},
                ],
            },
        },
    },
};

export const LineSpacing = {
    render: () => (
        <View>
            <View style={styles.explanation}>
                <PhosphorIcon
                    icon={IconMappings.xCircle}
                    style={styles.incorrect}
                />
                <BodyText>The following line spacing is too small:</BodyText>
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
                <BodyText>The following line spacing is adequate:</BodyText>
            </View>
            <BodyText>
                Khan Academy offers practice exercises, instructional videos,
                and a personalized learning dashboard that empower learners to
                study at their own pace in and outside of the classroom. We
                tackle math, science, computing, history, art history,
                economics, and more, including K-14 and test preparation (SAT,
                Praxis, LSAT) content. We focus on skill mastery to help
                learners establish strong foundations, so there is no limit to
                what they can learn next!
            </BodyText>
        </View>
    ),

    name: "Line spacing",
};
