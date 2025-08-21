import * as React from "react";

import type {Meta, StoryObj} from "@storybook/react";

import magnifyingGlass from "@phosphor-icons/core/regular/magnifying-glass.svg";
import caretRight from "@phosphor-icons/core/regular/caret-right.svg";
import clock from "@phosphor-icons/core/regular/clock.svg";

import {action} from "@storybook/addon-actions";
import {View} from "@khanacademy/wonder-blocks-core";
import {BodyText} from "@khanacademy/wonder-blocks-typography";
import Button, {ActivityButton} from "@khanacademy/wonder-blocks-button";

import ComponentInfo from "../components/component-info";
import packageConfig from "../../packages/wonder-blocks-icon-button/package.json";
import {border, semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";

import activityButtonArgtypes from "./activity-button.argtypes";

export default {
    title: "Packages / Button / ActivityButton",
    component: ActivityButton,
    decorators: [(Story): React.ReactElement => <View>{Story()}</View>],
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
        chromatic: {
            // Disabling all snapshots because we are testing all the variants
            // in `activity-icon-button-testing-snapshots.stories.tsx`.
            disableSnapshot: true,
        },
        docs: {
            source: {
                type: "code",
            },
        },
    },
    argTypes: activityButtonArgtypes,
    args: {
        children: "Search",
        kind: "primary",
        onClick: (e: React.SyntheticEvent) => {
            action("clicked")(e);
        },
    },
} as Meta<typeof ActivityButton>;

type Story = StoryObj<typeof ActivityButton>;

/**
 * Minimal activity button which only includes a label and an `onClick`
 * handler. The `kind` prop is set to `primary` by default.
 */
export const Default: Story = {
    args: {
        disabled: false,
        kind: "primary",
    },
};

/**
 * This example includes a start icon, which is specified using the
 * `startIcon` prop. The `endIcon` prop can also be used to specify an icon
 * that appears at the end of the button.
 */
export const WithStartIcon: Story = {
    args: {
        children: "Search",
        startIcon: magnifyingGlass,
        disabled: false,
        kind: "primary",
    },
};

/**
 * In this example, we have `primary (default), `secondary`, `tertiary` and
 * `disabled` `ActivityButton`'s from left to right.
 */
export const Kinds: Story = {
    render: (args) => {
        return (
            <View style={{gap: sizing.size_160, flexDirection: "row"}}>
                <ActivityButton {...args} />
                <ActivityButton {...args} kind="secondary" />
                <ActivityButton {...args} kind="tertiary" />
                <ActivityButton {...args} disabled={true} />
            </View>
        );
    },
};

/**
 * Sometimes you may want to apply custom styles to the button. In this
 * example, we apply this by passing a `style` prop to the button.
 *
 * Note that we recommend using the default styles, but if you need to
 * customize the button, we encourage to use it for layout purposes only.
 *
 * The following parts can be styled:
 * - `root`: Styles the root element (button)
 * - `box`: Styles the "chonky" box element
 * - `startIcon`: Styles the start icon element
 * - `endIcon`: Styles the end icon element
 * - `label`: Styles the text in the button
 */
export const WithCustomStyles: Story = {
    args: {
        children: "Search",
        startIcon: magnifyingGlass,
        endIcon: caretRight,
        styles: {
            root: {
                gap: sizing.size_200,
            },
            box: {
                gap: sizing.size_320,
            },
            startIcon: {
                alignSelf: "flex-start",
            },
            endIcon: {
                alignSelf: "flex-end",
            },
            label: {
                border: `${border.width.thin} solid ${semanticColor.core.border.instructive.subtle}`,
                padding: sizing.size_120,
            },
        },
    },
    parameters: {
        chromatic: {
            // Enable snapshots for this story so we can verify custom styles
            // are used correctly
            disableSnapshot: false,
        },
    },
};

/**
 * This button can receive focus programmatically. This is useful for cases where
 * you want to focus the button when the user interacts with another
 * component, such as a form field or another button.
 *
 * To do this, we use a `ref` to the button and call the `focus()` method
 * on it, so the `ActivityButton` receives focus.
 */
export const ReceivingFocusProgrammatically: Story = {
    render: function Render(args) {
        // This story is used to test the focus ring when the button receives
        // focus programmatically. The button is focused when the story is
        // rendered.
        const buttonRef = React.useRef<HTMLButtonElement | null>(null);

        return (
            <View style={{gap: sizing.size_160, flexDirection: "row"}}>
                <ActivityButton
                    {...args}
                    ref={buttonRef}
                    onClick={(e) => action("clicked")(e)}
                />
                <Button
                    onClick={() => {
                        // Focus the button when the button is clicked.
                        if (buttonRef.current) {
                            buttonRef.current.focus();
                        }
                    }}
                    kind="secondary"
                >
                    Focus on the Activity Button (left)
                </Button>
            </View>
        );
    },
    args: {
        children: "Search",
        startIcon: magnifyingGlass,
        endIcon: caretRight,
    },
    parameters: {
        chromatic: {
            // Disable since it requires user interaction to see the focus ring.
            disableSnapshot: true,
        },
    },
};

/**
 * This story demonstrates how to use the mouse event handlers (`onMouseDown`,
 * `onMouseUp`, and `onMouseLeave`) to track the duration of button presses.
 *
 * This is useful for analytics, accessibility features, or UI feedback that
 * depends on how long a user interacts with a button.
 *
 * **Use cases:**
 * - Measuring engagement time before click completion
 * - Detecting accidental clicks vs intentional presses
 * - Providing haptic feedback based on press duration
 * - Analytics tracking for user interaction patterns
 *
 * **Try it:** Press and hold the button for different lengths of time, or
 * press and drag away from the button to see how the events are tracked.
 */
export const PressDurationTracking: Story = {
    render: function Render(args) {
        const [pressStartTime, setPressStartTime] = React.useState<
            number | null
        >(null);
        const [pressDuration, setPressDuration] = React.useState<number | null>(
            null,
        );
        const [lastEvent, setLastEvent] = React.useState<string>("none");
        const [interactionHistory, setInteractionHistory] = React.useState<
            string[]
        >([]);

        const logEvent = (eventName: string, duration?: number) => {
            const timestamp = new Date().toLocaleTimeString();
            const message =
                duration !== undefined
                    ? `${timestamp}: ${eventName} (${duration}ms)`
                    : `${timestamp}: ${eventName}`;

            setInteractionHistory((prev) => [message, ...prev.slice(0, 4)]); // Keep last 5 events
            setLastEvent(eventName);
        };

        const handleMouseDown = (e: React.MouseEvent) => {
            const startTime = Date.now();
            setPressStartTime(startTime);
            setPressDuration(null);
            logEvent("Mouse Down - Press Started");
            action("onMouseDown")(e);
        };

        const handleMouseUp = (e: React.MouseEvent) => {
            if (pressStartTime) {
                const duration = Date.now() - pressStartTime;
                setPressDuration(duration);
                logEvent("Mouse Up - Press Completed", duration);
            }
            action("onMouseUp")(e);
        };

        const handleMouseLeave = (e: React.MouseEvent) => {
            if (pressStartTime) {
                const duration = Date.now() - pressStartTime;
                setPressDuration(duration);
                logEvent("Mouse Leave - Press Abandoned", duration);
            }
            setPressStartTime(null);
            action("onMouseLeave")(e);
        };

        const handleClick = (e: React.SyntheticEvent) => {
            logEvent("Click - Action Executed");
            action("onClick")(e);
        };

        const resetTracking = () => {
            setPressStartTime(null);
            setPressDuration(null);
            setLastEvent("none");
            setInteractionHistory([]);
        };

        const isCurrentlyPressed =
            pressStartTime !== null &&
            lastEvent === "Mouse Down - Press Started";

        return (
            <View style={{gap: sizing.size_240}}>
                <View
                    style={{
                        gap: sizing.size_160,
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <ActivityButton
                        {...args}
                        startIcon={clock}
                        onMouseDown={handleMouseDown}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseLeave}
                        onClick={handleClick}
                    >
                        {isCurrentlyPressed
                            ? "Pressed!"
                            : "Track Press Duration"}
                    </ActivityButton>

                    <Button
                        kind="secondary"
                        size="small"
                        onClick={resetTracking}
                    >
                        Reset
                    </Button>
                </View>

                <View
                    style={{
                        gap: sizing.size_120,
                        padding: sizing.size_160,
                        backgroundColor:
                            semanticColor.core.background.neutral.subtle,
                        borderRadius: sizing.size_080,
                        minHeight: "120px",
                    }}
                >
                    <BodyText size="medium" weight="semi">
                        Press Tracking Information
                    </BodyText>

                    <View style={{gap: sizing.size_060}}>
                        <BodyText>
                            <strong>Current State:</strong>{" "}
                            {isCurrentlyPressed
                                ? `Pressed (${pressStartTime ? Math.round((Date.now() - pressStartTime) / 10) * 10 : 0}ms+)`
                                : "Released"}
                        </BodyText>

                        {pressDuration !== null && (
                            <BodyText>
                                <strong>Last Press Duration:</strong>{" "}
                                {pressDuration}ms
                            </BodyText>
                        )}

                        <BodyText>
                            <strong>Last Event:</strong> {lastEvent}
                        </BodyText>
                    </View>

                    {interactionHistory.length > 0 && (
                        <View style={{gap: sizing.size_040}}>
                            <BodyText weight="semi">Recent Events:</BodyText>
                            {interactionHistory.map((event, index) => (
                                <BodyText
                                    key={index}
                                    size="small"
                                    style={{
                                        opacity: 1 - index * 0.15,
                                        fontFamily: "monospace",
                                    }}
                                >
                                    {event}
                                </BodyText>
                            ))}
                        </View>
                    )}
                </View>
            </View>
        );
    },
    args: {
        kind: "primary",
    },
    parameters: {
        chromatic: {
            // Disable snapshots since this story is interactive and shows timing
            disableSnapshot: true,
        },
    },
};
