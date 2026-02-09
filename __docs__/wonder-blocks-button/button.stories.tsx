/* eslint-disable max-lines */
import * as React from "react";
import {StyleSheet} from "aphrodite";
import {action} from "storybook/actions";
import type {Meta, StoryObj} from "@storybook/react-vite";

import {MemoryRouter} from "react-router-dom";
import {CompatRouter, Route, Routes} from "react-router-dom-v5-compat";

import type {StyleDeclaration} from "aphrodite";

import pencilSimple from "@phosphor-icons/core/regular/pencil-simple.svg";
import pencilSimpleBold from "@phosphor-icons/core/bold/pencil-simple-bold.svg";
import plus from "@phosphor-icons/core/regular/plus.svg";
import magnifyingGlass from "@phosphor-icons/core/regular/magnifying-glass.svg";
import caretRight from "@phosphor-icons/core/regular/caret-right.svg";
import clock from "@phosphor-icons/core/regular/clock.svg";

import {View} from "@khanacademy/wonder-blocks-core";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {
    semanticColor,
    sizing,
    spacing,
} from "@khanacademy/wonder-blocks-tokens";
import {BodyText} from "@khanacademy/wonder-blocks-typography";

import Button from "@khanacademy/wonder-blocks-button";
import packageConfig from "../../packages/wonder-blocks-button/package.json";
import ComponentInfo from "../components/component-info";

import ButtonArgTypes from "./button.argtypes";
import {LabeledField} from "@khanacademy/wonder-blocks-labeled-field";
import {Icon, PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {themeModes} from "../../.storybook/modes";
import {TextField} from "@khanacademy/wonder-blocks-form";
import {IconMappings} from "../wonder-blocks-icon/phosphor-icon.argtypes";

export default {
    title: "Packages / Button / Button",
    component: Button,
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
    },
    argTypes: ButtonArgTypes,
    excludeStories: ["styles"],
} as Meta<typeof Button>;

type StoryComponentType = StoryObj<typeof Button>;

export const Default: StoryComponentType = {
    args: {
        children: "Hello, world!",
        kind: "primary",
        actionType: "progressive",
        size: "medium",
        disabled: false,
        style: {maxWidth: 200},
        labelStyle: {},
        onClick: () => {
            // eslint-disable-next-line no-alert
            alert("Click!");
        },
    },
    parameters: {
        chromatic: {
            // We already have screenshots of other stories that cover more of
            // the button states
            disableSnapshot: true,
        },
    },
};

export const styles: StyleDeclaration = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: spacing.xSmall_8,
    },
    rowWithGap: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.medium_16,
    },
    button: {
        marginRight: spacing.xSmall_8,
    },
    truncatedButton: {
        maxWidth: 200,
        marginBottom: spacing.medium_16,
    },
    fillSpace: {
        minWidth: 140,
    },
    example: {
        background: semanticColor.core.background.base.subtle,
        padding: spacing.medium_16,
    },
    label: {
        marginTop: spacing.large_24,
        marginBottom: spacing.xSmall_8,
    },
});

/**
 * There are three kinds of buttons: `primary` (default), `secondary`, and
 * `tertiary`.
 */
export const Kinds: StoryComponentType = {
    render: () => (
        <View style={{padding: spacing.medium_16, gap: spacing.medium_16}}>
            <View style={styles.rowWithGap}>
                <Button onClick={() => {}}>Hello, world!</Button>
                <Button onClick={() => {}} kind="secondary">
                    Hello, world!
                </Button>
                <Button onClick={() => {}} kind="tertiary">
                    Hello, world!
                </Button>
            </View>
            <View style={styles.rowWithGap}>
                <Button onClick={() => {}} disabled={true}>
                    Hello, world!
                </Button>
                <Button onClick={() => {}} disabled={true} kind="secondary">
                    Hello, world!
                </Button>
                <Button onClick={() => {}} disabled={true} kind="tertiary">
                    Hello, world!
                </Button>
            </View>
            <View style={styles.rowWithGap}>
                <Button onClick={() => {}} actionType="destructive">
                    Hello, world!
                </Button>
                <Button
                    onClick={() => {}}
                    kind="secondary"
                    actionType="destructive"
                >
                    Hello, world!
                </Button>
                <Button
                    onClick={() => {}}
                    kind="tertiary"
                    actionType="destructive"
                >
                    Hello, world!
                </Button>
            </View>
            <View style={styles.rowWithGap}>
                <Button onClick={() => {}} actionType="neutral">
                    Hello, world!
                </Button>
                <Button
                    onClick={() => {}}
                    kind="secondary"
                    actionType="neutral"
                >
                    Hello, world!
                </Button>
                <Button onClick={() => {}} kind="tertiary" actionType="neutral">
                    Hello, world!
                </Button>
            </View>
        </View>
    ),
    parameters: {
        chromatic: {
            // We already have screenshots of other stories that cover more of
            // the button states
            disableSnapshot: true,
        },
    },
};

/**
 * Buttons have an `actionType` prop that is either `progressive` (the default,
 * as shown above), `destructive` or `neutral` (as can seen below):
 */
export const ActionType: StoryComponentType = {
    name: "ActionType",
    render: () => (
        <View style={{gap: spacing.medium_16}}>
            <View style={styles.row}>
                <Button
                    style={styles.button}
                    onClick={() => {}}
                    actionType="destructive"
                >
                    Primary
                </Button>
                <Button
                    style={styles.button}
                    onClick={() => {}}
                    kind="secondary"
                    actionType="destructive"
                >
                    Secondary
                </Button>
                <Button
                    style={styles.button}
                    onClick={() => {}}
                    kind="tertiary"
                    actionType="destructive"
                >
                    Tertiary
                </Button>
            </View>
            <View style={styles.row}>
                <Button
                    style={styles.button}
                    onClick={() => {}}
                    actionType="neutral"
                >
                    Primary
                </Button>
                <Button
                    style={styles.button}
                    onClick={() => {}}
                    kind="secondary"
                    actionType="neutral"
                >
                    Secondary
                </Button>
                <Button
                    style={styles.button}
                    onClick={() => {}}
                    kind="tertiary"
                    actionType="neutral"
                >
                    Tertiary
                </Button>
            </View>
        </View>
    ),
    parameters: {
        chromatic: {
            // NOTE: We already have screenshots of other stories that cover more of
            // the button states (see Variants).
            disableSnapshot: true,
        },
    },
};

const kinds = ["primary", "secondary", "tertiary"] as const;

const IconExample = () => (
    <View>
        <BodyText weight="bold" style={styles.label}>
            Using `startIcon` prop
        </BodyText>
        <View style={styles.row}>
            {kinds.map((kind, idx) => (
                <Button
                    kind={kind}
                    startIcon={pencilSimple}
                    style={styles.button}
                    key={idx}
                >
                    {kind}
                </Button>
            ))}
        </View>
        <View style={styles.row}>
            {kinds.map((kind, idx) => (
                <Button
                    kind={kind}
                    startIcon={pencilSimpleBold}
                    style={styles.button}
                    key={idx}
                    size="small"
                >
                    {`${kind} small`}
                </Button>
            ))}
        </View>
        <BodyText weight="bold" style={styles.label}>
            Using `endIcon` prop
        </BodyText>
        <View style={styles.row}>
            {kinds.map((kind, idx) => (
                <Button
                    kind={kind}
                    endIcon={pencilSimple}
                    style={styles.button}
                    key={idx}
                >
                    {kind}
                </Button>
            ))}
        </View>
        <View style={styles.row}>
            {kinds.map((kind, idx) => (
                <Button
                    kind={kind}
                    endIcon={pencilSimpleBold}
                    style={styles.button}
                    key={idx}
                    size="small"
                >
                    {`${kind} small`}
                </Button>
            ))}
        </View>
        <BodyText weight="bold" style={styles.label}>
            Using both `startIcon` and `endIcon` props
        </BodyText>
        <View style={styles.row}>
            {kinds.map((kind, idx) => (
                <Button
                    kind={kind}
                    startIcon={pencilSimple}
                    endIcon={plus}
                    style={styles.button}
                    key={idx}
                >
                    {kind}
                </Button>
            ))}
        </View>
        <View style={styles.row}>
            {kinds.map((kind, idx) => (
                <Button
                    kind={kind}
                    startIcon={pencilSimpleBold}
                    endIcon={plus}
                    style={styles.button}
                    key={idx}
                    size="small"
                >
                    {`${kind} small`}
                </Button>
            ))}
        </View>
        <BodyText weight="bold" style={styles.label}>
            Using Icon component for custom icons
        </BodyText>
        <View style={styles.row}>
            {kinds.map((kind, idx) => (
                <Button
                    kind={kind}
                    startIcon={
                        <Icon>
                            <img src={"logo.svg"} alt="" />
                        </Icon>
                    }
                    endIcon={
                        <Icon>
                            <img src={"logo.svg"} alt="" />
                        </Icon>
                    }
                    style={styles.button}
                    key={idx}
                >
                    {kind}
                </Button>
            ))}
        </View>
        <View style={styles.row}>
            {kinds.map((kind, idx) => (
                <Button
                    kind={kind}
                    startIcon={
                        <Icon>
                            <img src={"logo.svg"} alt="" />
                        </Icon>
                    }
                    endIcon={
                        <Icon>
                            <img src={"logo.svg"} alt="" />
                        </Icon>
                    }
                    style={styles.button}
                    key={idx}
                    size="small"
                >
                    {`${kind} small`}
                </Button>
            ))}
        </View>
    </View>
);

/**
 * Buttons can have a start icon or an end icon. The `startIcon` prop
 * results in the icon appearing before the label (left for LTR, right for RTL)
 * and the `endIcon` prop results in the icon appearing after the label (right
 * for LTR, left for RTL).
 *
 * __NOTE:__ Icons are available from the [Phosphor
 * Icons](https://phosphoricons.com/) library.
 *
 * To use a Phosphor icon, you can use the following syntax:
 *
 * ```tsx
 * import pencilSimple from "@phosphor-icons/core/regular/pencil-simple.svg";
 *
 * export const ButtonExample = () => (
 *     <Button startIcon={pencilSimple}>
 *         Example button
 *     </Button>
 * );
 * ```
 *
 * For custom icons, you can use the Wonder Blocks Icon component:
 *
 * ```tsx
 * import {Icon} from "@khanacademy/wonder-blocks-icon";
 *
 * export const ButtonExample = () => (
 *     <Button startIcon={<Icon><img src="example.svg" alt="Example icon" /></Icon>}>
 *         Example button
 *     </Button>
 * );
 * ```
 *
 * Note: The Button component will handle the sizing for the icons
 */
export const WithIcon: StoryComponentType = {
    name: "Icon",
    render: () => <IconExample />,
    parameters: {
        chromatic: {
            modes: themeModes,
        },
    },
};

/**
 * If the `startIcon` or `endIcon` provide meaning, you can provide an accessible
 * name for the icons so that it is included in the accessible name of the button.
 *
 * For example, when using a `PhosphorIcon`, you can use the `aria-label` prop
 * to provide an accessible name. When using a `Icon` component, you can provide
 * the accessible name to the `children` element (ie the `alt` attribute on the
 * `img` element).
 */
export const IconsWithAccessibleNames: StoryComponentType = {
    render: () => {
        return (
            <View style={styles.row}>
                <Button
                    style={styles.button}
                    startIcon={
                        <PhosphorIcon
                            icon={IconMappings.cookie}
                            aria-label="Cookie"
                        />
                    }
                    endIcon={
                        <PhosphorIcon
                            icon={IconMappings.iceCream}
                            aria-label="Ice Cream"
                        />
                    }
                >
                    With PhosphorIcon aria-label
                </Button>
                <Button
                    style={styles.button}
                    startIcon={
                        <Icon>
                            <img
                                src={"logo.svg"}
                                alt="Wonder Blocks start icon"
                            />
                        </Icon>
                    }
                    endIcon={
                        <Icon>
                            <img
                                src={"logo.svg"}
                                alt="Wonder Blocks end icon"
                            />
                        </Icon>
                    }
                >
                    With Icon and img alt
                </Button>
            </View>
        );
    },
    parameters: {
        chromatic: {
            disableSnapshot: true,
        },
    },
};

export const Size: StoryComponentType = () => (
    <View>
        <View style={styles.row}>
            <BodyText style={styles.fillSpace}>small</BodyText>
            <View style={[styles.row, styles.example]}>
                <Button style={styles.button} onClick={() => {}} size="small">
                    Label
                </Button>
                <Button
                    style={styles.button}
                    onClick={() => {}}
                    kind="secondary"
                    size="small"
                >
                    Label
                </Button>
                <Button
                    style={styles.button}
                    onClick={() => {}}
                    kind="tertiary"
                    size="small"
                >
                    Label
                </Button>
            </View>
        </View>
        <View style={styles.row}>
            <BodyText style={styles.fillSpace}>medium (default)</BodyText>

            <View style={[styles.row, styles.example]}>
                <Button style={styles.button} onClick={() => {}} size="medium">
                    Label
                </Button>
                <Button
                    style={styles.button}
                    onClick={() => {}}
                    kind="secondary"
                    size="medium"
                >
                    Label
                </Button>
                <Button
                    style={styles.button}
                    onClick={() => {}}
                    kind="tertiary"
                    size="medium"
                >
                    Label
                </Button>
            </View>
        </View>
        <View style={styles.row}>
            <BodyText style={styles.fillSpace}>large</BodyText>
            <View style={[styles.row, styles.example]}>
                <Button style={styles.button} onClick={() => {}} size="large">
                    Label
                </Button>
                <Button
                    style={styles.button}
                    onClick={() => {}}
                    kind="secondary"
                    size="large"
                >
                    Label
                </Button>
                <Button
                    style={styles.button}
                    onClick={() => {}}
                    kind="tertiary"
                    size="large"
                >
                    Label
                </Button>
            </View>
        </View>
    </View>
);

Size.parameters = {
    docs: {
        description: {
            story: "Buttons have a size that's either `medium` (default), `small`, or `large`.",
        },
    },
    chromatic: {
        // We already have screenshots of other stories that cover more of
        // the button states
        disableSnapshot: true,
    },
};

export const Spinner: StoryComponentType = () => (
    <View style={{flexDirection: "row"}}>
        <Button
            onClick={() => {}}
            spinner={true}
            size="large"
            aria-label={"waiting"}
        >
            Hello, world
        </Button>
        <Strut size={16} />
        <Button onClick={() => {}} spinner={true} aria-label={"waiting"}>
            Hello, world
        </Button>
        <Strut size={16} />
        <Button
            onClick={() => {}}
            spinner={true}
            size="small"
            aria-label={"waiting"}
        >
            Hello, world
        </Button>
    </View>
);

Spinner.parameters = {
    docs: {
        description: {
            story: "Buttons can show a spinner. This is useful when indicating to a user that their input has been recognized but that the operation will take some time. While the spinner property is set to true the button is disabled.",
        },
    },
};

export const TruncatingLabels: StoryComponentType = {
    name: "Truncating labels",
    render: () => (
        <View style={{flexDirection: "row", flexWrap: "wrap"}}>
            <Button onClick={() => {}} style={styles.truncatedButton}>
                label too long for the parent container
            </Button>
            <Strut size={spacing.medium_16} />
            <Button
                onClick={() => {}}
                style={styles.truncatedButton}
                startIcon={plus}
            >
                label too long for the parent container
            </Button>
            <Strut size={spacing.medium_16} />
            <Button
                size="small"
                onClick={() => {}}
                style={styles.truncatedButton}
            >
                label too long for the parent container
            </Button>
            <Strut size={spacing.medium_16} />
            <Button
                size="small"
                onClick={() => {}}
                style={styles.truncatedButton}
                startIcon={plus}
            >
                label too long for the parent container
            </Button>
        </View>
    ),
};

TruncatingLabels.parameters = {
    docs: {
        description: {
            story: "If the label is too long for the button width, the text will be truncated.",
        },
    },
};

/**
 * Buttons can be styled with custom styles. This story shows a button with a
 * custom width and height (using the `style` prop), and also a custom label
 * style that prevents the label from being truncated (`labelStyle`).
 *
 * __NOTE:__ Please use this feature sparingly. This could be useful for simple
 * cases like the one shown below, but it could cause some issues if used in
 * more complex cases.
 */
export const CustomStyles = {
    args: {
        children: `This button does not truncate its label and can appear in multiple lines`,
        disabled: false,
        kind: "secondary",
        onClick: () => {},
        style: {
            maxWidth: 200,
            minHeight: 32,
            height: "auto",
        },
        labelStyle: {
            textOverflow: "initial",
            whiteSpace: "normal",
        },
    },
    render: (args: any) => (
        <View style={{gap: spacing.medium_16}}>
            <View style={{flexDirection: "row", gap: spacing.medium_16}}>
                <Button {...args} kind="primary" />
                <Button {...args} kind="secondary" />
                <Button {...args} kind="tertiary" />
            </View>
        </View>
    ),
};

/**
 * The `styles` prop allows overriding styles for specific sub-elements
 * within the Button. In this example, the start icon is rendered at 24x24
 * instead of the default theme size.
 *
 * **Note:** Use this prop sparingly and only when the default theme styling
 * does not meet your needs (e.g. a custom trigger button that requires a
 * non-standard icon size).
 */
export const CustomIconSize: StoryComponentType = {
    args: {
        children: "Custom icon size",
        startIcon: plus,
        kind: "secondary",
        styles: {
            startIcon: {width: 24, height: 24},
        },
        onClick: action("clicked"),
    },
    parameters: {
        chromatic: {
            disableSnapshot: true,
        },
    },
};

export const SubmittingForms: StoryComponentType = {
    name: "Submitting forms",
    render: () => (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                window.alert("form submitted"); // eslint-disable-line no-alert
            }}
        >
            <View>
                <LabeledField
                    label="Foo"
                    field={
                        <TextField id="foo" value="bar" onChange={() => {}} />
                    }
                />
                <Button type="submit">Submit</Button>
            </View>
        </form>
    ),
};

SubmittingForms.parameters = {
    docs: {
        description: {
            story: 'If the button is inside a form, you can use the `type="submit"` variant, so the form will be submitted on click.',
        },
    },
    options: {
        showAddonPanel: true,
    },
    chromatic: {
        // We already have screenshots of other stories that cover more of the
        // button states.
        disableSnapshot: true,
    },
};

export const PreventNavigation: StoryComponentType = {
    name: "Preventing navigation",
    render: () => (
        <MemoryRouter>
            <CompatRouter>
                <View style={styles.row}>
                    <Button
                        href="/foo"
                        style={styles.button}
                        onClick={(e) => {
                            e.preventDefault();
                        }}
                    >
                        This button prevents navigation.
                    </Button>
                    <Routes>
                        <Route
                            path="/foo"
                            element={<View id="foo">Hello, world!</View>}
                        />
                    </Routes>
                </View>
            </CompatRouter>
        </MemoryRouter>
    ),
};

PreventNavigation.parameters = {
    docs: {
        description: {
            story: "Sometimes you may need to perform an async action either before or during navigation. This can be accomplished with `beforeNav` and `safeWithNav` respectively.",
        },
    },
    chromatic: {
        disableSnapshot: true,
    },
};

export const WithRouter: StoryComponentType = {
    name: "Navigation with React Router",
    render: () => (
        <MemoryRouter>
            <CompatRouter>
                <View style={styles.row}>
                    <Button href="/foo" style={styles.button}>
                        Uses Client-side Nav
                    </Button>
                    <Button href="/foo" style={styles.button} skipClientNav>
                        Avoids Client-side Nav
                    </Button>
                    <Routes>
                        <Route
                            path="/foo"
                            element={<View id="foo">Hello, world!</View>}
                        />
                    </Routes>
                </View>
            </CompatRouter>
        </MemoryRouter>
    ),
};

WithRouter.parameters = {
    docs: {
        description: {
            story: "Buttons do client-side navigation by default, if React Router exists:",
        },
    },
    chromatic: {
        disableSnapshot: true,
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
export const ReceivingFocusProgrammatically: StoryComponentType = {
    render: function Render(args) {
        // This story is used to test the focus ring when the button receives
        // focus programmatically. The button is focused when the story is
        // rendered.
        const buttonRef = React.useRef<HTMLButtonElement | null>(null);

        return (
            <View style={{gap: sizing.size_160, flexDirection: "row"}}>
                <Button
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
                    Focus on the Button (left)
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
 * This story demonstrates tracking press duration from `onMouseDown` to `onMouseUp`,
 * useful for measuring how long a user holds down on a button. The tracking also
 * handles cases where the mouse leaves the button area during the press.
 */
export const PressDurationTracking: StoryComponentType = {
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
            const logEntry = duration
                ? `${eventName} (${duration}ms) - ${timestamp}`
                : `${eventName} - ${timestamp}`;
            setInteractionHistory((prev) => [...prev.slice(-4), logEntry]);
            setLastEvent(eventName);
        };

        // Create base actions for Storybook logging
        const baseActions = {
            onMouseDown: action("onMouseDown"),
            onMouseUp: action("onMouseUp"),
            onMouseLeave: action("onMouseLeave"),
            onClick: action("onClick"),
            onMouseEnter: action("onMouseEnter"),
        };

        const handleMouseDown = (e: React.MouseEvent) => {
            const startTime = Date.now();
            setPressStartTime(startTime);
            setPressDuration(null);
            logEvent("onMouseDown");
            baseActions.onMouseDown(e);
        };

        const handleMouseUp = (e: React.MouseEvent) => {
            if (pressStartTime) {
                const duration = Date.now() - pressStartTime;
                setPressDuration(duration);
                logEvent("onMouseUp", duration);
            } else {
                logEvent("onMouseUp");
            }
            setPressStartTime(null);
            baseActions.onMouseUp(e);
        };

        const handleMouseLeave = (e: React.MouseEvent) => {
            if (pressStartTime) {
                const duration = Date.now() - pressStartTime;
                setPressDuration(duration);
                logEvent("onMouseLeave", duration);
                setPressStartTime(null);
            } else {
                logEvent("onMouseLeave");
            }
            baseActions.onMouseLeave(e);
        };

        const handleMouseEnter = (e: React.MouseEvent) => {
            logEvent("onMouseEnter");
            baseActions.onMouseEnter(e);
        };

        const handleClick = (e: React.SyntheticEvent) => {
            logEvent("onClick");
            baseActions.onClick(e);
        };

        return (
            <View>
                <Button
                    {...args}
                    startIcon={clock}
                    onMouseEnter={handleMouseEnter}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                >
                    Track Press Duration
                </Button>
                <Strut size={spacing.medium_16} />
                <View
                    style={{
                        padding: spacing.medium_16,
                        backgroundColor:
                            semanticColor.core.background.base.subtle,
                        borderRadius: 4,
                        maxWidth: 400,
                    }}
                >
                    <BodyText size="medium" weight="bold">
                        Press Duration Tracker
                    </BodyText>
                    <Strut size={spacing.xSmall_8} />
                    <BodyText size="medium">
                        Last Event: <strong>{lastEvent}</strong>
                    </BodyText>
                    <BodyText size="medium">
                        Press Duration:{" "}
                        <strong>
                            {pressDuration !== null
                                ? `${pressDuration}ms`
                                : "N/A"}
                        </strong>
                    </BodyText>
                    <BodyText size="medium">
                        Currently Pressing:{" "}
                        <strong>{pressStartTime ? "Yes" : "No"}</strong>
                    </BodyText>
                    <Strut size={spacing.small_12} />
                    <BodyText size="medium" weight="bold">
                        Interaction History:
                    </BodyText>
                    {interactionHistory.length > 0 ? (
                        <View style={{marginTop: spacing.xSmall_8}}>
                            {interactionHistory.map((entry, index) => (
                                <BodyText
                                    key={index}
                                    size="small"
                                    style={{fontFamily: "monospace"}}
                                >
                                    {entry}
                                </BodyText>
                            ))}
                        </View>
                    ) : (
                        <BodyText size="small" style={{fontStyle: "italic"}}>
                            No interactions yet
                        </BodyText>
                    )}
                </View>
            </View>
        );
    },
    args: {
        kind: "primary",
        style: {maxWidth: 240},
    },
    parameters: {
        chromatic: {
            disableSnapshot: true,
        },
    },
};
