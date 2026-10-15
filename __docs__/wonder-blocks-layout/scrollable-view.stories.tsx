import * as React from "react";
import {StyleSheet} from "aphrodite";
import type {Meta, StoryObj} from "@storybook/react-vite";

import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {TextArea} from "@khanacademy/wonder-blocks-form";
import {LabeledField} from "@khanacademy/wonder-blocks-labeled-field";
import {ScrollableView} from "@khanacademy/wonder-blocks-layout";
import {border, semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import {BodyText, Heading} from "@khanacademy/wonder-blocks-typography";

import packageConfig from "../../packages/wonder-blocks-layout/package.json";
import ComponentInfo from "../components/component-info";
import {reallyLongText} from "../components/text-for-testing";
import {allThemeModes} from "../../.storybook/modes";

export default {
    title: "Packages / Layout / ScrollableView",
    component: ScrollableView,
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
        chromatic: {
            // Disabling snapshots by default; explicitly enabling them for
            // the stories that show the fades.
            disableSnapshot: true,
        },
    },
    argTypes: {
        children: {control: false},
    },
} as Meta<typeof ScrollableView>;

type StoryComponentType = StoryObj<typeof ScrollableView>;

const styles = StyleSheet.create({
    content: {
        // Keep the content at its natural size so it overflows (and scrolls)
        // instead of being squashed to fit the view.
        flexShrink: 0,
        padding: sizing.size_240,
        gap: sizing.size_160,
    },
    constrained: {
        maxBlockSize: 200,
        maxInlineSize: 320,
    },
    rounded: {
        border: `${border.width.thin} solid ${semanticColor.core.border.neutral.subtle}`,
        borderRadius: border.radius.radius_120,
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: sizing.size_160,
    },
    submit: {
        alignSelf: "flex-end",
    },
});

const LongContent = () => (
    <View style={styles.content}>
        <Heading size="medium">Terms and conditions</Heading>
        <BodyText>{reallyLongText}</BodyText>
        <BodyText>{reallyLongText}</BodyText>
    </View>
);

/**
 * When the content doesn't fit, it scrolls, and it fades out at the edges to
 * hint that there's more content to scroll to: only the bottom edge fades at
 * first, both edges fade while scrolling, and only the top edge fades once
 * scrolled to the bottom.
 *
 * The view also becomes keyboard focusable while its content overflows, so it
 * can be scrolled with the arrow keys. Give it an accessible name (e.g. with
 * `aria-label`) so screen readers can announce it.
 */
export const Default: StoryComponentType = {
    args: {
        "aria-label": "Terms and conditions",
        style: styles.constrained,
        children: <LongContent />,
    },
    parameters: {
        chromatic: {
            disableSnapshot: false,
            modes: allThemeModes,
        },
    },
};

/**
 * When the content fits, `ScrollableView` behaves like a regular `View`: there
 * are no fades and it doesn't add an extra tab stop.
 */
export const ContentFits: StoryComponentType = {
    args: {
        style: styles.constrained,
        children: (
            <View style={styles.content}>
                <BodyText>
                    This content fits, so it doesn&apos;t scroll.
                </BodyText>
            </View>
        ),
    },
};

/**
 * The fades inherit the view's border radius, so setting a `borderRadius` via
 * `style` also rounds the fades.
 */
export const WithRoundedCorners: StoryComponentType = {
    args: {
        "aria-label": "Terms and conditions",
        style: [styles.constrained, styles.rounded],
        children: <LongContent />,
    },
    parameters: {
        chromatic: {
            disableSnapshot: false,
        },
    },
};

/**
 * Interactive content (e.g. form fields) can be placed inside the view. It
 * stays reachable with the keyboard, and the browser scrolls it into view when
 * it's focused.
 */
export const WithInteractiveContent: StoryComponentType = {
    render: function Render(args) {
        const [feedback, setFeedback] = React.useState("");

        return (
            <ScrollableView {...args}>
                <View style={styles.content}>
                    <BodyText>{reallyLongText}</BodyText>
                    <View style={styles.form}>
                        <LabeledField
                            label="Feedback"
                            field={
                                <TextArea
                                    value={feedback}
                                    onChange={setFeedback}
                                />
                            }
                        />
                        <Button style={styles.submit}>Submit</Button>
                    </View>
                </View>
            </ScrollableView>
        );
    },
    args: {
        "aria-label": "Feedback form",
        style: styles.constrained,
    },
};
