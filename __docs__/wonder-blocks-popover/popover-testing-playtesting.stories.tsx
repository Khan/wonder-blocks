import * as React from "react";
import {StyleSheet} from "aphrodite";
import type {Meta, StoryObj} from "@storybook/react-vite";

import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {TextArea} from "@khanacademy/wonder-blocks-form";
import {LabeledField} from "@khanacademy/wonder-blocks-labeled-field";
import {Popover, PopoverContentCore} from "@khanacademy/wonder-blocks-popover";
import {border, semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import {BodyText, Heading} from "@khanacademy/wonder-blocks-typography";

import {reallyLongText} from "../components/text-for-testing";

export default {
    title: "Packages / Popover / Testing / Popover - Playtesting",
    tags: ["!autodocs", "!manifest"],
    parameters: {
        /** These stories are used for testing purposes only so we disable snapshots */
        chromatic: {disableSnapshot: true},
        // Render the stories edge to edge, so they behave like a real page.
        layout: "fullscreen",
    },
} as Meta<typeof Popover>;

type Story = StoryObj<typeof Popover>;

const styles = StyleSheet.create({
    page: {
        padding: sizing.size_160,
        gap: sizing.size_160,
    },
    footer: {
        position: "fixed",
        insetInline: 0,
        insetBlockEnd: 0,
        padding: sizing.size_160,
        alignItems: "flex-end",
        background: semanticColor.core.background.base.default,
        borderBlockStart: `${border.width.thin} solid ${semanticColor.core.border.neutral.subtle}`,
    },
    // Leave room for the fixed footer, so it doesn't cover the page content.
    footerSpacer: {
        flexShrink: 0,
        blockSize: sizing.size_960,
    },
    form: {
        gap: sizing.size_160,
    },
    submit: {
        alignSelf: "flex-end",
    },
});

/**
 * A popover with a text field, similar to the "Leave feedback" popover in
 * frontend.
 */
const FeedbackPopover = () => {
    const [feedback, setFeedback] = React.useState("");

    return (
        <Popover
            placement="top"
            aria-label="Leave feedback"
            content={
                <PopoverContentCore closeButtonVisible={true}>
                    <View style={styles.form}>
                        <Heading size="medium">Leave feedback</Heading>
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
                </PopoverContentCore>
            }
        >
            <Button>Leave feedback</Button>
        </Popover>
    );
};

const PageContent = () => (
    <>
        <Heading>Lesson</Heading>
        <BodyText>{reallyLongText}</BodyText>
        <BodyText>{reallyLongText}</BodyText>
    </>
);

/**
 * The popover opens from a button fixed to the bottom of the screen, like the
 * "Leave feedback" popover in frontend. Open this story on a mobile device to
 * check that the virtual keyboard doesn't make the popover disappear.
 *
 * To test it:
 * 1. Open this story on a phone (e.g. the Chromatic build of the PR), in the
 *    canvas-only view (`iframe.html`).
 * 2. Tap "Leave feedback", then tap the "Feedback" text field.
 * 3. The virtual keyboard opens and covers the button. The popover should stay
 *    visible, and the keyboard should stay open while typing. (Previously, the
 *    popover was hidden as soon as the keyboard covered the button, which also
 *    closed the keyboard.)
 */
export const AnchorAtTheBottomOfTheScreen: Story = {
    render: function Render() {
        return (
            <View style={styles.page}>
                <PageContent />
                <View style={styles.footerSpacer} />
                <View style={styles.footer}>
                    <FeedbackPopover />
                </View>
            </View>
        );
    },
};

/**
 * The popover opens from a button in the middle of a long page. Use this story
 * to check the same behavior on desktop, by scrolling the button out of view.
 *
 * To test it:
 * 1. Scroll down to the "Leave feedback" button, and open the popover.
 * 2. Click the "Feedback" text field, then scroll the page until the button is
 *    out of view. The popover should stay visible while the text field has
 *    focus.
 * 3. Click the "Submit" button (or press `Tab` to move focus to it), then
 *    scroll again. The popover should be hidden while the button is out of
 *    view, and shown again once it's back in view.
 */
export const ScrollAnchorOutOfView: Story = {
    render: function Render() {
        return (
            <View style={styles.page}>
                <PageContent />
                <View>
                    <FeedbackPopover />
                </View>
                <PageContent />
                <PageContent />
            </View>
        );
    },
};
