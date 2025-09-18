import * as React from "react";
import {StyleSheet} from "aphrodite";
import type {Meta, StoryObj} from "@storybook/react";

import infoIcon from "@phosphor-icons/core/bold/info-bold.svg";
import {View} from "@khanacademy/wonder-blocks-core";
import Button from "@khanacademy/wonder-blocks-button";
import {
    font,
    semanticColor,
    sizing,
    spacing,
} from "@khanacademy/wonder-blocks-tokens";
import {GemIcon, Icon, PhosphorIcon} from "@khanacademy/wonder-blocks-icon";

import packageConfig from "../../packages/wonder-blocks-card/package.json";
import {Card} from "@khanacademy/wonder-blocks-card";
import {BodyText, Heading} from "@khanacademy/wonder-blocks-typography";

import ComponentInfo from "../components/component-info";
import CardArgTypes from "./card.argtypes";
import {GemBadge} from "@khanacademy/wonder-blocks-badge";
import Link from "@khanacademy/wonder-blocks-link";

type StoryComponentType = StoryObj<typeof Card>;

export default {
    title: "Packages / Card / Card",
    component: Card,
    argTypes: CardArgTypes,
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
        docs: {
            description: {
                component: null,
            },
            source: {
                // See https://github.com/storybookjs/storybook/issues/12596
                excludeDecorators: true,
            },
        },
    },
    decorators: [(Story): React.ReactElement => <View>{Story()}</View>],
} as Meta<typeof Card>;

/**
 * You can create a minimal cell that only uses a title and an PhosphorIcon that
 * can be placed on the left or right (or both). In this case, we will place the
 * icon on the left to show you how cell is flexible. Note that you can pass any
 * of the existing WB components such as `PhosphorIcon`, `IconButton`,
 * `Tooltip`, etc.
 */
export const DefaultCard: StoryComponentType = {
    render: () => (
        <Card aria-label="Intro to rational & irrational numbers">
            <BodyText>Some Contents</BodyText>
        </Card>
    ),
    parameters: {
        chromatic: {
            // This is already tested in the StateSheet story.
            disableSnapshot: true,
        },
    },
};

const styles = StyleSheet.create({
    example: {
        backgroundColor: semanticColor.core.background.base.subtle,
        padding: spacing.large_24,
        width: 320 + spacing.xxLarge_48,
    },
    gemRow: {
        flexDirection: "row",
        gap: sizing.size_080,
    },
    gemColumn: {
        flexDirection: "column",
        gap: sizing.size_080,
    },
    gemIcon: {
        width: sizing.size_560,
    },
    gemHeaderRow: {
        marginBlockEnd: sizing.size_160,
    },
});

export const GemCard: StoryComponentType = {
    args: {
        children: (
            <>
                <View style={[styles.gemRow, styles.gemHeaderRow]}>
                    <View style={styles.gemColumn}>
                        <View style={styles.gemRow}>
                            <Heading tag="h3" size="large">
                                Gem challenge
                            </Heading>
                            <PhosphorIcon
                                icon={infoIcon}
                                size="small"
                                color={semanticColor.feedback.info.strong.icon}
                            />
                        </View>
                        <GemBadge label="30 days left" showIcon={false} />
                    </View>
                    <View style={styles.gemIcon}>
                        <Icon size="large">
                            <GemIcon aria-label="Gem" />
                        </Icon>
                    </View>
                </View>
                <View style={styles.gemColumn}>
                    {/* progress bar here */}
                    <View style={styles.gemRow}>
                        <BodyText
                            size="small"
                            style={{marginInlineEnd: "auto"}}
                        >
                            Class gems
                        </BodyText>
                        <BodyText>
                            <span>0</span> of <span>1500</span>
                        </BodyText>
                    </View>
                    <View style={styles.gemRow}>
                        <BodyText
                            size="small"
                            style={{marginInlineEnd: "auto"}}
                        >
                            Remaining
                        </BodyText>
                        <BodyText>
                            <span>1500</span>
                        </BodyText>
                    </View>
                    <View style={styles.gemRow}>
                        <BodyText
                            size="small"
                            style={{marginInlineEnd: "auto"}}
                        >
                            Reward
                        </BodyText>
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <Link href="#" style={{fontSize: font.body.size.small}}>
                            Set Reward
                        </Link>
                    </View>
                    <Button kind="secondary">Learn more about gems</Button>
                    <Button kind="tertiary">View previous challenges</Button>
                </View>
            </>
        ),
    },
};
