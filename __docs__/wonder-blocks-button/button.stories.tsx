import * as React from "react";
// import {StyleSheet} from "aphrodite";
import type {Meta, StoryObj} from "@storybook/react";
import {expect, fireEvent, userEvent, within} from "@storybook/test";

import {MemoryRouter, Route, Switch} from "react-router-dom";

// import type {StyleDeclaration} from "aphrodite";

import pencilSimple from "@phosphor-icons/core/regular/pencil-simple.svg";
import pencilSimpleBold from "@phosphor-icons/core/bold/pencil-simple-bold.svg";
import plus from "@phosphor-icons/core/regular/plus.svg";

import {View} from "@khanacademy/wonder-blocks-core";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {color, spacing} from "@khanacademy/wonder-blocks-tokens";
import {
    LabelMedium,
    LabelLarge,
    HeadingSmall,
} from "@khanacademy/wonder-blocks-typography";

import Button from "@khanacademy/wonder-blocks-button";
import packageConfig from "../../packages/wonder-blocks-button/package.json";
import ComponentInfo from "../../.storybook/components/component-info";

import ButtonArgTypes from "./button.argtypes";
import {ThemeSwitcherContext} from "@khanacademy/wonder-blocks-theming";
import {SystemStyleObject} from "@/styled-system/types";
import {css} from "@/styled-system/css";

/**
 * Reusable button component.
 *
 * Consisting of a [`ClickableBehavior`](#clickablebehavior) surrounding a
 * `ButtonCore`. `ClickableBehavior` handles interactions and state changes.
 * `ButtonCore` is a stateless component which displays the different states the
 * `Button` can take.
 *
 * ### Usage
 *
 * ```tsx
 * import Button from "@khanacademy/wonder-blocks-button";
 *
 * <Button
 *     onClick={(e) => console.log("Hello, world!")}
 * >
 *     Hello, world!
 * </Button>
 * ```
 */
export default {
    title: "Packages / Button",
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
        color: "default",
        size: "medium",
        light: false,
        disabled: false,
        style: {maxWidth: 200},
        labelStyle: {},
        onClick: () => {
            // eslint-disable-next-line no-alert
            alert("Click!");
        },
    },
    parameters: {
        design: {
            type: "figma",
            url: "https://www.figma.com/file/VbVu3h2BpBhH80niq101MHHE/%F0%9F%92%A0-Main-Components?type=design&node-id=389-0&mode=design",
        },
        chromatic: {
            // We already have screenshots of other stories that cover more of the button states
            disableSnapshot: true,
        },
    },
};

export const Tertiary: StoryComponentType = {
    args: {
        onClick: () => {},
        kind: "tertiary",
        testId: "test-button",
        children: "Hello, world!",
    },
    play: async ({canvasElement}) => {
        const canvas = within(canvasElement);

        // Get HTML elements
        const button = canvas.getByRole("button");
        const computedStyleButton = getComputedStyle(button);
        const innerLabel = canvas.getByTestId("test-button-inner-label");
        const computedStyleLabel = getComputedStyle(innerLabel, ":after");

        // Resting style
        await expect(button).toHaveStyle(`color: ${color.blue}`);
        await expect(button).toHaveTextContent("Hello, world!");

        // Hover style
        await userEvent.hover(button);
        await expect(computedStyleLabel.height).toBe("2px");
        await expect(computedStyleLabel.color).toBe("rgb(24, 101, 242)");

        // Focus style
        await fireEvent.focus(button);
        await expect(computedStyleButton.outlineColor).toBe(
            "rgb(24, 101, 242)",
        );
        await expect(computedStyleButton.outlineWidth).toBe("2px");

        // Active (mouse down) style
        // eslint-disable-next-line testing-library/prefer-user-event
        await fireEvent.mouseDown(button);
        await expect(innerLabel).toHaveStyle("color: rgb(27, 80, 179)");
        await expect(computedStyleLabel.height).toBe("1px");
        await expect(computedStyleLabel.color).toBe("rgb(27, 80, 179)");
    },
};

export const styles: Record<string, SystemStyleObject> = {
    row: css.raw({
        flexDirection: "row",
        alignItems: "center",
        marginBottom: "xSmall_8",
    }),
    button: css.raw({
        marginRight: "xSmall_8",
    }),
    truncatedButton: css.raw({
        maxWidth: 200,
        marginBottom: "medium_16",
    }),
    fillSpace: css.raw({
        minWidth: 140,
    }),
    example: css.raw({
        background: "offWhite",
        padding: "medium_16",
    }),
    label: css.raw({
        marginTop: "large_24",
        marginBottom: "xSmall_8",
    }),
};

export const Variants: StoryComponentType = () => (
    <View style={{padding: "medium_16", gap: "medium_16"}}>
        <View style={{flexDirection: "row", gap: "medium_16"}}>
            <Button onClick={() => {}}>Hello, world!</Button>
            <Button onClick={() => {}} kind="secondary">
                Hello, world!
            </Button>
            <Button onClick={() => {}} kind="tertiary">
                Hello, world!
            </Button>
        </View>
        <View style={{flexDirection: "row", gap: "medium_16"}}>
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
        <View style={{flexDirection: "row", gap: "medium_16"}}>
            <Button onClick={() => {}} color="destructive">
                Hello, world!
            </Button>
            <Button onClick={() => {}} kind="secondary" color="destructive">
                Hello, world!
            </Button>
            <Button onClick={() => {}} kind="tertiary" color="destructive">
                Hello, world!
            </Button>
        </View>
    </View>
);

Variants.parameters = {
    docs: {
        description: {
            story: "There are three kinds of buttons: `primary` (default), `secondary`, and `tertiary`.",
        },
    },
};

export const WithColor: StoryComponentType = {
    name: "Color",
    render: () => (
        <View style={styles.row}>
            <Button
                style={styles.button}
                onClick={() => {}}
                color="destructive"
            >
                Primary
            </Button>
            <Button
                style={styles.button}
                onClick={() => {}}
                kind="secondary"
                color="destructive"
            >
                Secondary
            </Button>
            <Button
                style={styles.button}
                onClick={() => {}}
                kind="tertiary"
                color="destructive"
            >
                Tertiary
            </Button>
        </View>
    ),
};

WithColor.parameters = {
    docs: {
        description: {
            story: "Buttons have a `color` that is either `default` (the default, as shown above) or `destructive` (as can seen below):",
        },
    },
    chromatic: {
        // NOTE: We already have screenshots of other stories that cover more of
        // the button states (see Variants).
        disableSnapshot: true,
    },
};

export const Dark: StoryComponentType = () => (
    <View
        style={{
            backgroundColor: "darkBlue",
            padding: "medium_16",
            gap: "medium_16",
        }}
    >
        <View style={{flexDirection: "row", gap: "medium_16"}}>
            <Button onClick={() => {}} light={true}>
                Hello, world!
            </Button>
            <Button onClick={() => {}} light={true} kind="secondary">
                Hello, world!
            </Button>
            <Button onClick={() => {}} light={true} kind="tertiary">
                Hello, world!
            </Button>
        </View>
        <View style={{flexDirection: "row", gap: "medium_16"}}>
            <Button onClick={() => {}} light={true} disabled={true}>
                Hello, world!
            </Button>
            <Button
                onClick={() => {}}
                light={true}
                disabled={true}
                kind="secondary"
            >
                Hello, world!
            </Button>
            <Button
                onClick={() => {}}
                light={true}
                disabled={true}
                kind="tertiary"
            >
                Hello, world!
            </Button>
        </View>
        <View style={{flexDirection: "row", gap: "medium_16"}}>
            <Button onClick={() => {}} light={true} color="destructive">
                Hello, world!
            </Button>
            <Button
                onClick={() => {}}
                light={true}
                kind="secondary"
                color="destructive"
            >
                Hello, world!
            </Button>
            <Button
                onClick={() => {}}
                light={true}
                kind="tertiary"
                color="destructive"
            >
                Hello, world!
            </Button>
        </View>
    </View>
);

Dark.parameters = {
    backgrounds: {
        default: "darkBlue",
    },
    docs: {
        description: {
            story: "Buttons on a `darkBlue` background should set `light` to `true`.",
        },
    },
};

const kinds = ["primary", "secondary", "tertiary"] as const;

const IconExample = () => (
    <View>
        <LabelLarge style={styles.label}>Using `startIcon` prop</LabelLarge>
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
        <LabelLarge style={styles.label}>Using `endIcon` prop</LabelLarge>
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
        <LabelLarge style={styles.label}>
            Using both `startIcon` and `endIcon` props
        </LabelLarge>
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
 * To import an icon, you can use the following syntax:
 *
 * e.g.
 * ```
 * import pencilSimple from "@phosphor-icons/core/regular/pencil-simple.svg";
 * ```
 */
export const Icon: StoryComponentType = {
    render: () => <IconExample />,
};

export const Size: StoryComponentType = () => (
    <View>
        <View style={styles.row}>
            <LabelMedium style={styles.fillSpace}>small</LabelMedium>
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
            <LabelMedium style={styles.fillSpace}>medium (default)</LabelMedium>

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
            <LabelMedium style={styles.fillSpace}>large</LabelMedium>
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
        <View style={{gap: "medium_16"}}>
            <HeadingSmall>Wonder Blocks theme (default)</HeadingSmall>
            <View style={{flexDirection: "row", gap: "medium_16"}}>
                <Button {...args} kind="primary" />
                <Button {...args} kind="secondary" />
                <Button {...args} kind="tertiary" />
            </View>
            <HeadingSmall>Khanmigo theme</HeadingSmall>
            <View style={{flexDirection: "row", gap: "medium_16"}}>
                <ThemeSwitcherContext.Provider value="khanmigo">
                    <Button {...args} kind="primary" />
                    <Button {...args} kind="secondary" />
                    <Button {...args} kind="tertiary" />
                </ThemeSwitcherContext.Provider>
            </View>
        </View>
    ),
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
                Foo: <input id="foo" value="bar" />
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
                <Switch>
                    <Route path="/foo">
                        <View id="foo">Hello, world!</View>
                    </Route>
                </Switch>
            </View>
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
            <View style={styles.row}>
                <Button href="/foo" style={styles.button}>
                    Uses Client-side Nav
                </Button>
                <Button href="/foo" style={styles.button} skipClientNav>
                    Avoids Client-side Nav
                </Button>
                <Switch>
                    <Route path="/foo">
                        <View id="foo">Hello, world!</View>
                    </Route>
                </Switch>
            </View>
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
 * Button supports theming via the `ThemeSwitcherContext`. This story shows the
 * button in the `khanmigo` theme using all the variants.
 *
 * **Note:** You can also use the "Theme" addon in the toolbar to switch themes.
 */
export const KhanmigoTheme: StoryComponentType = {
    render: () => {
        const stories = [
            Variants,
            Dark,
            Size,
            IconExample,
        ] as Array<React.ElementType>;

        return (
            <ThemeSwitcherContext.Provider value="khanmigo">
                <View style={{gap: "medium_16"}}>
                    {stories.map((Story, i) => (
                        <Story key={i} />
                    ))}
                </View>
            </ThemeSwitcherContext.Provider>
        );
    },
};
