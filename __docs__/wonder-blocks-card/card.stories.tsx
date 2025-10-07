import * as React from "react";
import {StyleSheet} from "aphrodite";
import type {Meta, StoryObj} from "@storybook/react-vite";

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
import eotBackground from "../../static/EOT-Background.svg";
import eotIcon from "../../static/EOT-Icon.svg";
import blooketBg from "../../static/Blooket.svg";

type StoryComponentType = StoryObj<typeof Card>;

export default {
    title: "Packages / Card",
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
 * The most basic Card has simple contents as `children`.
 */
export const DefaultCard: StoryComponentType = {
    render: (args) => (
        <Card styles={{root: styles.card}} {...args}>
            <Heading>Some Contents</Heading>
            <BodyText>This is a basic card.</BodyText>
        </Card>
    ),
    parameters: {},
};

/**
 * The Gem Challenge Card has more complex content structure including icons,
 * badges, tabular data, and multiple buttons.
 */
export const GemCard: StoryComponentType = {
    args: {},
    parameters: {
        chromatic: {disableSnapshot: true}, // disable snapshot since it is mostly custom contents
    },
    render: () => (
        <Card styles={{root: styles.card}}>
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
                    <BodyText size="small" style={{marginInlineEnd: "auto"}}>
                        Class gems
                    </BodyText>
                    <BodyText>
                        <span>0</span> of <span>1500</span>
                    </BodyText>
                </View>
                <View style={styles.gemRow}>
                    <BodyText size="small" style={{marginInlineEnd: "auto"}}>
                        Remaining
                    </BodyText>
                    <BodyText>
                        <span>1500</span>
                    </BodyText>
                </View>
                <View style={styles.gemRow}>
                    <BodyText size="small" style={{marginInlineEnd: "auto"}}>
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
        </Card>
    ),
};

/**
 * Cards also have the option to display a "close" button that can dismiss the card from the DOM.
 *
 * If a Card is removed onDismiss, focus should be moved to a wrapper or neighoring interactive element.
 */
export const WithDismissButton: StoryComponentType = {
    render: () => {
        const CardWithRef = () => {
            const wrapperRef = React.useRef<HTMLDivElement>(null);
            const cardRef = React.useRef<HTMLDivElement>(null);
            const onDismiss = () => {
                // Remove the card from the DOM
                cardRef.current?.remove();

                // Ensure focus is handled gracefully across browsers
                wrapperRef.current?.focus();
            };

            return (
                <View ref={wrapperRef} tabIndex={-1}>
                    <Card
                        labels={{dismissButtonAriaLabel: "Dismiss"}}
                        onDismiss={onDismiss}
                        ref={cardRef}
                        styles={{root: styles.card}}
                    >
                        <Heading>Dismissable Card</Heading>
                        <BodyText>
                            This is a card with a close button. Click the button
                            to dismiss.
                        </BodyText>
                    </Card>
                </View>
            );
        };

        return <CardWithRef />;
    },
};

export const WithTag: StoryComponentType = {
    parameters: {
        chromatic: {disableSnapshot: true}, // disable snapshot since doesn't have a meaningful visual effect
    },
    render: () => (
        <View tag="ul">
            <Card tag="li" styles={{root: styles.card}}>
                <Heading>Card 1</Heading>
            </Card>
            <Card tag="li" styles={{root: styles.card}}>
                <Heading>Card 2</Heading>
            </Card>
        </View>
    ),
};

export const WithBackgroundImage: StoryComponentType = {
    parameters: {
        chromatic: {disableSnapshot: true}, // disable snapshot since doesn't have a meaningful visual effect
    },
    render: () => (
        <Card background={eotBackground} styles={{root: styles.card}}>
            <View
                style={{
                    alignItems: "center",
                }}
            >
                <Heading size="small" style={styles.eotCardText}>
                    Practice
                </Heading>
                <img src={eotIcon} alt="" style={{maxWidth: sizing.size_640}} />
                <Heading
                    size="small"
                    weight="semi"
                    tag="h3"
                    style={styles.eotCardText}
                >
                    Proficient
                </Heading>
                <Heading size="xxlarge" tag="h4" style={styles.eotCardText}>
                    100%
                </Heading>
            </View>
        </Card>
    ),
};

export const WithSplitBackgroundImage: StoryComponentType = {
    parameters: {
        chromatic: {disableSnapshot: true}, // disable snapshot since doesn't have a meaningful visual effect
    },
    render: () => (
        <Card paddingSize="none" styles={{root: styles.card}}>
            <View
                style={{
                    backgroundImage: `url(${blooketBg})`,
                    backgroundSize: "cover",
                    height: 156,
                }}
            />
            <View
                style={{
                    padding: sizing.size_160,
                }}
            >
                <Heading size="medium">Khanmigo and Blooket</Heading>
                <BodyText>
                    Gamify learning without adding more work to your plate!
                </BodyText>
                <View
                    style={{
                        insetBlockStart: sizing.size_160,
                        marginBlockEnd: sizing.size_160,
                        flexDirection: "unset",
                    }}
                >
                    <Button kind="secondary">Try it out</Button>
                </View>
            </View>
        </Card>
    ),
};

export const InAStack: StoryComponentType = {
    parameters: {
        chromatic: {disableSnapshot: true}, // disable snapshot since doesn't have a meaningful visual effect
    },
    render: () => (
        <>
            <Heading>Cards in a stack</Heading>
            <View tag="ul">
                <View tag="li" style={styles.stackedCard}>
                    <Card styles={{root: styles.card}}>
                        <Heading>Active Card</Heading>
                        <Button>CTA</Button>
                    </Card>
                </View>
                <View tag="li" style={[styles.stackedCard, styles.dimmed]}>
                    <Card inert={true} styles={{root: styles.card}}>
                        <Heading>Inactive Card</Heading>
                        <Button>CTA</Button>
                    </Card>
                </View>
            </View>
        </>
    ),
};

export const InAGrid: StoryComponentType = {
    parameters: {
        chromatic: {disableSnapshot: true}, // disable snapshot since doesn't have a meaningful visual effect
    },
    render: () => (
        <>
            <Heading>Cards in a grid</Heading>
            <View
                style={[
                    styles.gemRow,
                    {flexWrap: "wrap", gap: sizing.size_100},
                ]}
            >
                <Card styles={{root: styles.card}}>
                    <Heading>Card 1</Heading>
                    <BodyText>This is a basic card.</BodyText>
                </Card>
                <Card styles={{root: styles.card}}>
                    <Heading>Card 2</Heading>
                    <BodyText>This is a basic card.</BodyText>
                </Card>
                <Card styles={{root: styles.card}}>
                    <Heading>Card 3</Heading>
                    <BodyText>This is a basic card.</BodyText>
                </Card>
                <Card styles={{root: styles.card}}>
                    <Heading>Card 4</Heading>
                    <BodyText>This is a basic card.</BodyText>
                </Card>
            </View>
        </>
    ),
};

export const WithStyleProps: StoryComponentType = {
    render: () => (
        <>
            <Heading>Style props</Heading>
            <View tag="ul">
                <Card
                    styles={{root: styles.card}}
                    tag="li"
                    borderRadius="small"
                >
                    <Heading>borderRadius=small</Heading>
                </Card>
                <Card
                    tag="li"
                    styles={{root: styles.card}}
                    paddingSize="medium"
                >
                    <Heading>paddingSize=medium</Heading>
                </Card>
                <Card
                    tag="li"
                    styles={{root: styles.card}}
                    background="base-subtle"
                >
                    <Heading>background=base-subtle</Heading>
                </Card>
                <Card tag="li" styles={{root: styles.card}} elevation="low">
                    <Heading>elevation=low</Heading>
                </Card>
            </View>
        </>
    ),
};

const styles = StyleSheet.create({
    card: {
        marginBlockEnd: sizing.size_100,
        width: 320,
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
        alignItems: "center",
        marginInlineStart: "auto",
        width: sizing.size_560,
    },
    gemHeaderRow: {
        marginBlockEnd: sizing.size_160,
    },
    stackedCard: {
        listStyle: "none",
        position: "absolute",
        padding: 0,
        margin: 0,
        width: 320,
    },
    dimmed: {
        opacity: "0.5",
        zIndex: -1,
        marginBlockStart: spacing.large_24,
        marginInlineStart: spacing.large_24,
    },
    eotCardText: {
        marginBlockStart: sizing.size_160,
        marginBlockEnd: sizing.size_160,
    },
});
