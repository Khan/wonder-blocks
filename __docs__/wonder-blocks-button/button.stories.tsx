import * as React from "react";
import {StyleSheet} from "aphrodite";
import type {Meta, StoryObj} from "@storybook/react";

import {MemoryRouter} from "react-router-dom";
import {CompatRouter, Route, Routes} from "react-router-dom-v5-compat";

import type {StyleDeclaration} from "aphrodite";

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
import ComponentInfo from "../components/component-info";

import ButtonArgTypes from "./button.argtypes";
import {ThemeSwitcherContext} from "@khanacademy/wonder-blocks-theming";
import {LabeledField} from "@khanacademy/wonder-blocks-labeled-field";

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
        background: color.offWhite,
        padding: spacing.medium_16,
    },
    label: {
        marginTop: spacing.large_24,
        marginBottom: spacing.xSmall_8,
    },
});

export const Variants: StoryComponentType = () => (
    <View style={{padding: spacing.medium_16, gap: spacing.medium_16}}>
        <View style={{flexDirection: "row", gap: spacing.medium_16}}>
            <Button onClick={() => {}}>Hello, world!</Button>
            <Button onClick={() => {}} kind="secondary">
                Hello, world!
            </Button>
            <Button onClick={() => {}} kind="tertiary">
                Hello, world!
            </Button>
        </View>
        <View style={{flexDirection: "row", gap: spacing.medium_16}}>
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
        <View style={{flexDirection: "row", gap: spacing.medium_16}}>
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
            <Button onClick={() => {}} kind="tertiary" actionType="destructive">
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
    chromatic: {
        // We already have screenshots of other stories that cover more of
        // the button states
        disableSnapshot: true,
    },
};

export const WithColor: StoryComponentType = {
    name: "Color",
    render: () => (
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
    ),
};

WithColor.parameters = {
    docs: {
        description: {
            story: "Buttons have an `actionType` that is either `progressive` (the default, as shown above) or `destructive` (as can seen below):",
        },
    },
    chromatic: {
        // NOTE: We already have screenshots of other stories that cover more of
        // the button states (see Variants).
        disableSnapshot: true,
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
            <HeadingSmall>Wonder Blocks theme (default)</HeadingSmall>
            <View style={{flexDirection: "row", gap: spacing.medium_16}}>
                <Button {...args} kind="primary" />
                <Button {...args} kind="secondary" />
                <Button {...args} kind="tertiary" />
            </View>
            <HeadingSmall>Khanmigo theme</HeadingSmall>
            <View style={{flexDirection: "row", gap: spacing.medium_16}}>
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
                <LabeledField
                    label="Foo"
                    field={<input id="foo" value="bar" onChange={() => {}} />}
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
 * Button supports theming via the `ThemeSwitcherContext`. This story shows the
 * button in the `khanmigo` theme using all the variants.
 *
 * **Note:** You can also use the "Theme" addon in the toolbar to switch themes.
 */
export const KhanmigoTheme: StoryComponentType = {
    render: () => {
        const stories = [
            Variants,
            Size,
            IconExample,
        ] as Array<React.ElementType>;

        return (
            <ThemeSwitcherContext.Provider value="khanmigo">
                <View style={{gap: spacing.medium_16}}>
                    {stories.map((Story, i) => (
                        <Story key={i} />
                    ))}
                </View>
            </ThemeSwitcherContext.Provider>
        );
    },
    parameters: {
        chromatic: {
            // We already have screenshots of other stories that cover more of
            // the button states
            disableSnapshot: true,
        },
    },
};
