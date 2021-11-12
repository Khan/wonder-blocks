// @flow
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
import type {StoryComponentType} from "@storybook/react";
import Button from "./button.js";

import ComponentInfo from "../../../../.storybook/components/component-info.js";
import ButtonArgTypes from "./__docs__/button.argtypes.js";
import {name, version} from "../../package.json";

export default {
    title: "Navigation/Button",
    component: Button,
    parameters: {
        componentSubtitle: ((
            <ComponentInfo name={name} version={version} />
        ): any),
    },
    decorators: [withDesign],
    argTypes: ButtonArgTypes,
};

const Template = (args) => <Button {...args} />;

export const DefaultButton: StoryComponentType = Template.bind({});

DefaultButton.args = {
    children: "Hello, world!",
    kind: "primary",
    color: "default",
    size: "medium",
    light: false,
    disabled: false,
    style: {maxWidth: 200},
    onClick: () => {},
};

DefaultButton.parameters = {
    design: {
        type: "figma",
        url:
            "https://www.figma.com/file/VbVu3h2BpBhH80niq101MHHE/Wonder-Blocks-(Web)?node-id=401%3A307",
    },
    chromatic: {
        // We already have screenshots of other stories that cover more of the button states
        disableSnapshot: true,
    },
};

export const BasicButtons: StoryComponentType = () => (
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

BasicButtons.parameters = {
    docs: {
        storyDescription:
            "There are three kinds of buttons: `primary` (default), `secondary`, and `tertiary`.",
    },
};

export const ButtonsWithColors: StoryComponentType = () => (
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

ButtonsWithColors.parameters = {
    docs: {
        storyDescription:
            "Buttons have a `color` that is either `default` (the default, as shown above) or `destructive` (as can seen below):",
    },
};

export const DarkBackgroundButtons: StoryComponentType = () => (
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

DarkBackgroundButtons.parameters = {
    backgrounds: {
        default: "darkBlue",
    },
    docs: {
        storyDescription:
            "Buttons on a `darkBlue` background should set `light` to `true`.",
    },
};

export const ButtonsWithSize: StoryComponentType = () => (
    <View>
        <View style={styles.row}>
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
        <View style={styles.row}>
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
        <View style={styles.row}>
            <Button style={styles.button} onClick={() => {}} size="xlarge">
                Label
            </Button>
            <Button
                style={styles.button}
                onClick={() => {}}
                kind="secondary"
                size="xlarge"
            >
                Label
            </Button>
            <Button
                style={styles.button}
                onClick={() => {}}
                kind="tertiary"
                size="xlarge"
            >
                Label
            </Button>
        </View>
    </View>
);

ButtonsWithSize.parameters = {
    docs: {
        storyDescription:
            "Buttons have a size that's either `medium` (default), `small`, or `xlarge`.",
    },
};

export const ButtonWithSpinner: StoryComponentType = () => (
    <View style={{flexDirection: "row"}}>
        <Button
            onClick={() => {}}
            spinner={true}
            size="xlarge"
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

ButtonWithSpinner.parameters = {
    docs: {
        storyDescription:
            "Buttons can show a spinner. This is useful when indicating to a user that their input has been recognized but that the operation will take some time. While the spinner property is set to true the button is disabled.",
    },
};

export const ButtonsWithRouter: StoryComponentType = () => (
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

ButtonsWithRouter.storyName = "Navigation with React Router";

ButtonsWithRouter.parameters = {
    docs: {
        storyDescription:
            "Buttons do client-side navigation by default, if React Router exists:",
    },
    chromatic: {
        disableSnapshot: true,
    },
};

export const BeforeNavCallbacks: StoryComponentType = () => (
    <MemoryRouter>
        <View style={styles.row}>
            <Button
                href="/foo"
                style={styles.button}
                beforeNav={() =>
                    new Promise((resolve, reject) => {
                        setTimeout(resolve, 1000);
                    })
                }
            >
                beforeNav, client-side nav
            </Button>
            <Button
                href="/foo"
                style={styles.button}
                skipClientNav={true}
                beforeNav={() =>
                    new Promise((resolve, reject) => {
                        setTimeout(resolve, 1000);
                    })
                }
            >
                beforeNav, server-side nav
            </Button>
            <Button
                href="https://google.com"
                style={styles.button}
                skipClientNav={true}
                beforeNav={() =>
                    new Promise((resolve, reject) => {
                        setTimeout(resolve, 1000);
                    })
                }
            >
                beforeNav, open URL in new tab
            </Button>
            <Switch>
                <Route path="/foo">
                    <View id="foo">Hello, world!</View>
                </Route>
            </Switch>
        </View>
    </MemoryRouter>
);

BeforeNavCallbacks.storyName = "beforeNav Callbacks";

BeforeNavCallbacks.parameters = {
    docs: {
        storyDescription:
            "These buttons always wait until the async callback code completes before starting navigation.",
    },
    chromatic: {
        disableSnapshot: true,
    },
};

export const SafeWithNavCallbacks: StoryComponentType = () => (
    <MemoryRouter>
        <View style={styles.row}>
            <Button
                href="/foo"
                style={styles.button}
                safeWithNav={() =>
                    new Promise((resolve, reject) => {
                        setTimeout(resolve, 1000);
                    })
                }
            >
                safeWithNav, client-side nav
            </Button>
            <Button
                href="/foo"
                style={styles.button}
                skipClientNav={true}
                safeWithNav={() =>
                    new Promise((resolve, reject) => {
                        setTimeout(resolve, 1000);
                    })
                }
            >
                safeWithNav, server-side nav
            </Button>
            <Button
                href="https://google.com"
                style={styles.button}
                skipClientNav={true}
                safeWithNav={() =>
                    new Promise((resolve, reject) => {
                        setTimeout(resolve, 1000);
                    })
                }
            >
                safeWithNav, open URL in new tab
            </Button>
            <Switch>
                <Route path="/foo">
                    <View id="foo">Hello, world!</View>
                </Route>
            </Switch>
        </View>
    </MemoryRouter>
);

SafeWithNavCallbacks.storyName = "safeWithNav Callbacks";

SafeWithNavCallbacks.parameters = {
    docs: {
        storyDescription:
            "These buttons navigate immediately when doing client-side navigation or when opening a new tab, but wait until the async callback code completes before starting server-side navigation.",
    },
    chromatic: {
        disableSnapshot: true,
    },
};

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
                This button prevent navigation.
            </Button>
            <Switch>
                <Route path="/foo">
                    <View id="foo">Hello, world!</View>
                </Route>
            </Switch>
        </View>
    </MemoryRouter>
);

PreventNavigation.storyName =
    "Prevent navigation by calling e.preventDefault()";

PreventNavigation.parameters = {
    docs: {
        storyDescription:
            "Sometimes you may need to perform an async action either before or during navigation. This can be accomplished with `beforeNav` and `safeWithNav` respectively.",
    },
    chromatic: {
        disableSnapshot: true,
    },
};

const kinds = ["primary", "secondary", "tertiary"];

export const ButtonsWithIcons: StoryComponentType = () => (
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

ButtonsWithIcons.parameters = {
    docs: {
        storyDescription: "Buttons can have an icon on it's left side.",
    },
};

export const LongLabelsAreEllipsized: StoryComponentType = () => (
    <Button onClick={() => {}} style={{maxWidth: 200}}>
        label too long for the parent container
    </Button>
);

export const SubmitButtonInForm: StoryComponentType = () => (
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

SubmitButtonInForm.parameters = {
    options: {
        showAddonPanel: true,
    },
    chromatic: {
        // We already have screenshots of other stories that cover more of the
        // button states.
        disableSnapshot: true,
    },
};

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        marginBottom: Spacing.xSmall_8,
    },
    button: {
        marginRight: Spacing.xSmall_8,
    },
});
