import * as React from "react";
import {StyleSheet} from "aphrodite";
import type {Meta, StoryObj} from "@storybook/react-vite";
import {expect, waitFor, within} from "storybook/test";

import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {TextArea} from "@khanacademy/wonder-blocks-form";
import {LabeledField} from "@khanacademy/wonder-blocks-labeled-field";
import {ScrollableView} from "@khanacademy/wonder-blocks-layout";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import {BodyText, Heading} from "@khanacademy/wonder-blocks-typography";

import {ScenariosLayout} from "../components/scenarios-layout";
import {reallyLongText} from "../components/text-for-testing";

/**
 * The following stories are used to capture the different states of the
 * `ScrollableView` fades. This is only used for visual testing in Chromatic.
 */
export default {
    title: "Packages / Layout / Testing / Snapshots / ScrollableView",
    tags: ["!autodocs"],
} as Meta<typeof ScrollableView>;

type Story = StoryObj<typeof ScrollableView>;

const styles = StyleSheet.create({
    container: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
        gap: sizing.size_160,
    },
    constrained: {
        maxBlockSize: 200,
        maxInlineSize: 320,
    },
    content: {
        // Keep the content at its natural size so it overflows (and scrolls)
        // instead of being squashed to fit the view.
        flexShrink: 0,
        padding: sizing.size_240,
        gap: sizing.size_160,
    },
    submit: {
        alignSelf: "flex-end",
    },
});

type ScrollPosition = "top" | "middle" | "bottom";

type Fades = {top: boolean; bottom: boolean};

type ScrollScenario = {
    label: string;
    scrollTo: ScrollPosition;
    expectedFades: Fades;
};

// Scenarios whose content overflows, scrolled to different positions.
const scrollScenarios: Array<ScrollScenario> = [
    {
        label: "Scrolled to the top",
        scrollTo: "top",
        expectedFades: {top: false, bottom: true},
    },
    {
        label: "Scrolled to the middle",
        scrollTo: "middle",
        expectedFades: {top: true, bottom: true},
    },
    {
        label: "Scrolled to the bottom",
        scrollTo: "bottom",
        expectedFades: {top: true, bottom: false},
    },
];

const LongContent = () => (
    <View style={styles.content}>
        <Heading size="medium">Terms and conditions</Heading>
        <BodyText>{reallyLongText}</BodyText>
        <BodyText>{reallyLongText}</BodyText>
    </View>
);

const InteractiveContent = () => {
    const [feedback, setFeedback] = React.useState("");

    return (
        <View style={styles.content}>
            <BodyText>{reallyLongText}</BodyText>
            <LabeledField
                label="Feedback"
                field={<TextArea value={feedback} onChange={setFeedback} />}
            />
            <Button style={styles.submit}>Submit</Button>
        </View>
    );
};

/**
 * Returns the scroll position for the given scenario.
 */
const getScrollTop = (element: HTMLElement, position: ScrollPosition) => {
    const maxScrollTop = element.scrollHeight - element.clientHeight;
    switch (position) {
        case "top":
            return 0;
        case "middle":
            return Math.round(maxScrollTop / 2);
        case "bottom":
            return maxScrollTop;
    }
};

/**
 * Returns whether each fade is visible.
 */
const getVisibleFades = (element: HTMLElement): Fades => ({
    top: getComputedStyle(element, "::before").opacity === "1",
    bottom: getComputedStyle(element, "::after").opacity === "1",
});

/**
 * The fades at the edges of the view, depending on its scroll position:
 * - No fades when the content fits.
 * - Only the bottom fade when scrolled to the top.
 * - Both fades when scrolled to the middle.
 * - Only the top fade when scrolled to the bottom.
 */
export const Scenarios: Story = {
    render() {
        const scenarios = [
            {
                name: "Content fits",
                props: {
                    testId: "content-fits",
                    children: (
                        <View style={styles.content}>
                            <BodyText>
                                This content fits, so it doesn&apos;t scroll.
                            </BodyText>
                        </View>
                    ),
                },
            },
            ...scrollScenarios.map(({label}) => ({
                name: label,
                props: {"aria-label": label, children: <LongContent />},
            })),
            {
                name: "With interactive content",
                props: {
                    "aria-label": "With interactive content",
                    children: <InteractiveContent />,
                },
            },
        ];

        return (
            <ScenariosLayout
                scenarios={scenarios}
                styles={{root: styles.container}}
            >
                {(props) => (
                    <ScrollableView {...props} style={styles.constrained} />
                )}
            </ScenariosLayout>
        );
    },
    play: async ({canvasElement}) => {
        const canvas = within(canvasElement);

        // NOTE: We query the elements on every check (instead of keeping
        // references to them) because the story can re-mount right after the
        // first render (e.g. when the theme decorator applies the theme). For
        // the same reason, the scroll position is re-applied on every check.

        for (const {label, scrollTo, expectedFades} of scrollScenarios) {
            await waitFor(() => {
                // The view is only exposed as a region once its content
                // overflows (and it becomes focusable).
                const view = canvas.getByRole("region", {name: label});

                view.scrollTop = getScrollTop(view, scrollTo);
                expect(getVisibleFades(view)).toEqual(expectedFades);
            });
        }

        // When the content fits, the view isn't focusable and has no fades.
        const contentFits = canvas.getByTestId("content-fits");
        await expect(contentFits).not.toHaveAttribute("tabindex");
        await expect(getComputedStyle(contentFits, "::before").content).toBe(
            "none",
        );

        // The interactive content overflows too. Waiting for it also ensures
        // that the a11y checks audit the final state.
        await waitFor(() =>
            expect(
                canvas.getByRole("region", {name: "With interactive content"}),
            ).toHaveAttribute("tabindex", "0"),
        );
    },
};
