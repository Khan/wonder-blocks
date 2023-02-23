import * as React from "react";
import {StyleSheet} from "aphrodite";
import {withDesign} from "storybook-addon-designs";
import {action} from "@storybook/addon-actions";

import {MemoryRouter, Route, Switch} from "react-router-dom";

import Color from "@khanacademy/wonder-blocks-color";
import {View} from "@khanacademy/wonder-blocks-core";
import {icons} from "@khanacademy/wonder-blocks-icon";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {LabelMedium} from "@khanacademy/wonder-blocks-typography";
// @ts-expect-error [FEI-5019] - TS2305 - Module '"@storybook/react"' has no exported member 'StoryComponentType'.
import type {StoryComponentType} from "@storybook/react";
import type {StyleDeclaration} from "aphrodite";

import Button from "../button";

import ComponentInfo from "../../../../../.storybook/components/component-info";
import ButtonArgTypes from "./button.argtypes";
import {name, version} from "../../../package.json";

export default {
    title: "Button",
    component: Button,
    parameters: {
        componentSubtitle: (
            <ComponentInfo name={name} version={version} />
        ) as any,
    },
    decorators: [withDesign],
    argTypes: ButtonArgTypes,
    excludeStories: ["styles"],
};

const Template = (args: any) => <Button {...args} />;

export const Default: StoryComponentType = Template.bind({});

Default.args = {
    children: "Hello, world!",
    kind: "primary",
    color: "default",
    size: "medium",
    light: false,
    disabled: false,
    style: {maxWidth: 200},
    onClick: () => {
        // eslint-disable-next-line no-alert
        alert("Click!");
    },
};

Default.parameters = {
    design: {
        type: "figma",
        url: "https://www.figma.com/file/VbVu3h2BpBhH80niq101MHHE/Wonder-Blocks-(Web)?node-id=401%3A307",
    },
    chromatic: {
        // We already have screenshots of other stories that cover more of the button states
        disableSnapshot: true,
    },
};

export const styles: StyleDeclaration = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: Spacing.xSmall_8,
    },
    button: {
        marginRight: Spacing.xSmall_8,
    },
    fillSpace: {
        minWidth: 140,
    },
    example: {
        background: Color.offWhite,
        padding: Spacing.medium_16,
    },
});

export const Variants: StoryComponentType = () => (
    <View>
        <View style={{flexDirection: "row"}}>
            <Button onClick={() => {}}>Hello, world!</Button>
            <Strut size={16} />
            <Button onClick={() => {}} kind="secondary">
                Hello, world!
            </Button>
            <Strut size={16} />
            <Button onClick={() => {}} kind="tertiary">
                Hello, world!
            </Button>
        </View>
        <Strut size={16} />
        <View style={{flexDirection: "row"}}>
            <Button onClick={() => {}} disabled={true}>
                Hello, world!
            </Button>
            <Strut size={16} />
            <Button onClick={() => {}} disabled={true} kind="secondary">
                Hello, world!
            </Button>
            <Strut size={16} />
            <Button onClick={() => {}} disabled={true} kind="tertiary">
                Hello, world!
            </Button>
        </View>
        <Strut size={16} />
        <View style={{flexDirection: "row"}}>
            <Button onClick={() => {}} color="destructive">
                Hello, world!
            </Button>
            <Strut size={16} />
            <Button onClick={() => {}} kind="secondary" color="destructive">
                Hello, world!
            </Button>
            <Strut size={16} />
            <Button onClick={() => {}} kind="tertiary" color="destructive">
                Hello, world!
            </Button>
        </View>
    </View>
);

Variants.parameters = {
    docs: {
        storyDescription:
            "There are three kinds of buttons: `primary` (default), `secondary`, and `tertiary`.",
    },
};

export const WithColor: StoryComponentType = () => (
    <View style={styles.row}>
        <Button style={styles.button} onClick={() => {}} color="destructive">
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
);

WithColor.storyName = "Color";

WithColor.parameters = {
    docs: {
        storyDescription:
            "Buttons have a `color` that is either `default` (the default, as shown above) or `destructive` (as can seen below):",
    },
};

export const Dark: StoryComponentType = () => (
    <View style={{backgroundColor: Color.darkBlue}}>
        <View style={{flexDirection: "row"}}>
            <Button onClick={() => {}} light={true}>
                Hello, world!
            </Button>
            <Strut size={16} />
            <Button onClick={() => {}} light={true} kind="secondary">
                Hello, world!
            </Button>
            <Strut size={16} />
            <Button onClick={() => {}} light={true} kind="tertiary">
                Hello, world!
            </Button>
        </View>
        <Strut size={16} />
        <View style={{flexDirection: "row"}}>
            <Button onClick={() => {}} light={true} disabled={true}>
                Hello, world!
            </Button>
            <Strut size={16} />
            <Button
                onClick={() => {}}
                light={true}
                disabled={true}
                kind="secondary"
            >
                Hello, world!
            </Button>
            <Strut size={16} />
            <Button
                onClick={() => {}}
                light={true}
                disabled={true}
                kind="tertiary"
            >
                Hello, world!
            </Button>
        </View>
        <Strut size={16} />
        <View style={{flexDirection: "row"}}>
            <Button onClick={() => {}} light={true} color="destructive">
                Hello, world!
            </Button>
            <Strut size={16} />
            <Button
                onClick={() => {}}
                light={true}
                kind="secondary"
                color="destructive"
            >
                Hello, world!
            </Button>
            <Strut size={16} />
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
        storyDescription:
            "Buttons on a `darkBlue` background should set `light` to `true`.",
    },
};

const kinds = ["primary", "secondary", "tertiary"] as const;

export const Icon: StoryComponentType = () => (
    <View>
        <View style={styles.row}>
            {kinds.map((kind, idx) => (
                <Button
                    kind={kind}
                    icon={icons.contentExercise}
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
                    icon={icons.contentExercise}
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

Icon.parameters = {
    docs: {
        storyDescription: "Buttons can have an icon on it's left side.",
    },
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
        storyDescription:
            "Buttons have a size that's either `medium` (default), `small`, or `large`.",
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
        storyDescription:
            "Buttons can show a spinner. This is useful when indicating to a user that their input has been recognized but that the operation will take some time. While the spinner property is set to true the button is disabled.",
    },
};

export const TruncatingLabels: StoryComponentType = () => (
    <Button onClick={() => {}} style={{maxWidth: 200}}>
        label too long for the parent container
    </Button>
);

TruncatingLabels.parameters = {
    docs: {
        storyDescription:
            "If the label is too long for the button width, the text will be truncated.",
    },
};

TruncatingLabels.storyName = "Truncating labels";

export const SubmittingForms: StoryComponentType = () => (
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
);

SubmittingForms.parameters = {
    docs: {
        storyDescription:
            'If the button is inside a form, you can use the `type="submit"` variant, so the form will be submitted on click.',
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

SubmittingForms.storyName = "Submitting forms";

export const PreventNavigation: StoryComponentType = () => (
    <MemoryRouter>
        <View style={styles.row}>
            <Button
                href="/foo"
                style={styles.button}
                onClick={(e) => {
                    action("clicked")(e);
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
);

PreventNavigation.storyName = "Preventing navigation";

PreventNavigation.parameters = {
    docs: {
        storyDescription:
            "Sometimes you may need to perform an async action either before or during navigation. This can be accomplished with `beforeNav` and `safeWithNav` respectively.",
    },
    chromatic: {
        disableSnapshot: true,
    },
};

export const WithRouter: StoryComponentType = () => (
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
);

WithRouter.storyName = "Navigation with React Router";

WithRouter.parameters = {
    docs: {
        storyDescription:
            "Buttons do client-side navigation by default, if React Router exists:",
    },
    chromatic: {
        disableSnapshot: true,
    },
};
