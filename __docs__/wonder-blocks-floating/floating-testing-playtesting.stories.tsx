import * as React from "react";
import {StyleSheet} from "aphrodite";
import type {Meta, StoryObj} from "@storybook/react-vite";

import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {Floating} from "@khanacademy/wonder-blocks-floating";
import {TextArea} from "@khanacademy/wonder-blocks-form";
import {LabeledField} from "@khanacademy/wonder-blocks-labeled-field";
import {border, semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import {BodyText, Heading} from "@khanacademy/wonder-blocks-typography";

import {reallyLongText} from "../components/text-for-testing";

export default {
    title: "Packages / Floating / Testing / Floating - Playtesting",
    tags: ["!autodocs", "!manifest"],
    parameters: {
        /** These stories are used for testing purposes only so we disable snapshots */
        chromatic: {disableSnapshot: true},
        // Render the stories edge to edge, so they behave like a real page.
        layout: "fullscreen",
    },
} as Meta<typeof Floating>;

type Story = StoryObj<typeof Floating>;

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
        padding: sizing.size_240,
        gap: sizing.size_160,
        maxInlineSize: 320,
    },
    submit: {
        alignSelf: "flex-end",
    },
});

/**
 * A floating element with a text field, similar to the "Leave feedback"
 * popover in frontend.
 */
const FeedbackFloating = () => {
    const [open, setOpen] = React.useState(false);
    const [feedback, setFeedback] = React.useState("");

    return (
        <Floating
            open={open}
            onOpenChange={setOpen}
            placement="top"
            // Use the same positioning strategy as `Popover`, so the floating
            // element stays attached to the button while the page scrolls
            // (the button can be fixed to the screen).
            strategy="fixed"
            dismissEnabled={true}
            content={
                <View style={styles.form}>
                    <Heading size="medium">Leave feedback</Heading>
                    <LabeledField
                        label="Feedback"
                        field={
                            <TextArea value={feedback} onChange={setFeedback} />
                        }
                    />
                    <Button style={styles.submit}>Submit</Button>
                </View>
            }
        >
            <Button onClick={() => setOpen(!open)}>Leave feedback</Button>
        </Floating>
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
 * The floating element opens from a button fixed to the bottom of the screen,
 * like the "Leave feedback" popover in frontend. Open this story on a mobile
 * device to check that the virtual keyboard doesn't make the floating element
 * disappear.
 *
 * To test it:
 * 1. Open this story on a phone (e.g. the Chromatic build of the PR), in the
 *    canvas-only view (`iframe.html`).
 * 2. Tap "Leave feedback", then tap the "Feedback" text field.
 * 3. The virtual keyboard opens and covers the button. The floating element
 *    should stay visible, and the keyboard should stay open while typing.
 *    (Previously, it was hidden as soon as the keyboard covered the button,
 *    which also closed the keyboard.)
 */
export const AnchorAtTheBottomOfTheScreen: Story = {
    render: function Render() {
        return (
            <View style={styles.page}>
                <PageContent />
                <View style={styles.footerSpacer} />
                <View style={styles.footer}>
                    <FeedbackFloating />
                </View>
            </View>
        );
    },
};

/**
 * The floating element opens from a button in the middle of a long page. Use
 * this story to check the same behavior on desktop, by scrolling the button
 * out of view.
 *
 * To test it:
 * 1. Scroll down to the "Leave feedback" button, and open the floating
 *    element.
 * 2. Click the "Feedback" text field, then scroll the page until the button is
 *    out of view. The floating element should stay visible while the text
 *    field has focus.
 * 3. Click the "Submit" button (or press `Tab` to move focus to it), then
 *    scroll again. The floating element should be hidden while the button is
 *    out of view, and shown again once it's back in view.
 */
export const ScrollAnchorOutOfView: Story = {
    render: function Render() {
        return (
            <View style={styles.page}>
                <PageContent />
                <View>
                    <FeedbackFloating />
                </View>
                <PageContent />
                <PageContent />
            </View>
        );
    },
};
