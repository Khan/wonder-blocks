// @flow
import * as React from "react";

import {withDesign} from "storybook-addon-designs";

import {View} from "@khanacademy/wonder-blocks-core";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import Color from "@khanacademy/wonder-blocks-color";

import type {StoryComponentType} from "@storybook/react";

import Button from "./button.js";

export default {
    title: "Navigation/Button",
    component: Button,
    parameters: {
        componentSubtitle: "Displays a button component",
        controls: {sort: "requiredFirst"},
    },
    decorators: [withDesign],
    argTypes: {
        kind: {
            description:
                "The kind of the button, either primary, secondary, or tertiary.",
            options: ["primary", "secondary", "tertiary"],
            control: {type: "select"},
            table: {
                type: {
                    summary: "Notes",
                    detail: `
                    - Primary buttons have background colors.\n- Secondary buttons have a border and no background color.\n- Tertiary buttons have no background or border.
                    `,
                },
            },
        },
        color: {
            description: "The color of the button, either blue or red.",
            options: ["default", "destructive"],
            control: {type: "radio"},
            table: {
                category: "Theming",
            },
        },
        size: {
            description: "The size of the button.",
            options: ["small", "medium", "xlarge"],
            control: {type: "select"},
            table: {
                category: "Sizing",
                type: {
                    summary: "Notes",
                    detail: `"medium" = height: 40; "small" = height: 32; "xlarge" = height: 60;`,
                },
            },
        },
        disabled: {
            description: "Whether the button is disabled.",
        },
        light: {
            description: "Whether the button is on a dark/colored background.",
            control: {type: "boolean"},
            table: {
                category: "Theming",
                type: {
                    summary: "Note",
                    detail:
                        "Sets primary button background color to white, and secondary and tertiary button title to color.",
                },
            },
        },
        spinner: {
            description: "If true, replaces the contents with a spinner.",
            control: {type: "boolean"},
            table: {
                type: {
                    summary: "Note",
                    detail:
                        "Setting this prop to `true` will disable the button.",
                },
            },
        },
        icon: {
            description: "An icon, displayed to the left of the title.",
            control: {type: "text"},
        },
        id: {
            description: "An optional id attribute.",
        },
        testId: {
            description: "Test ID used for e2e testing.",
        },
        onClick: {
            action: "clicked",
            table: {
                category: "Events",
            },
        },
        rel: {
            description: `Specifies the type of relationship between the current document and the linked document. Should only be used when "href" is specified. This defaults to "noopener noreferrer" when target="_blank", but can be overridden by setting this prop to something else.`,
        },
        target: {
            description: `A target destination window for a link to open in. Should only be used
            * when "href" is specified.`,
        },
        tabIndex: {
            description: "Set the tabindex attribute on the rendered element.",
        },
    },
};

const Template = (args) => <Button {...args} />;

export const Default: StoryComponentType = Template.bind({});
Default.args = {
    kind: "primary",
    disabled: false,
    children: "Hello, world!",
    style: {maxWidth: 200},
};

Default.parameters = {
    description: "blalbla blbal bla",
    design: {
        type: "figma",
        url:
            "https://www.figma.com/file/VbVu3h2BpBhH80niq101MHHE/Wonder-Blocks-(Web)?node-id=401%3A307",
    },
    docs: {
        storyDescription: "default button description sdf",
    },
};

export const BasicButtons: StoryComponentType = (args) => (
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
        storyDescription: "hey it works",
    },
};

export const DarkBackgroundButtons: StoryComponentType = (args) => (
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

export const SmallButtons: StoryComponentType = () => (
    <View style={{flexDirection: "row"}}>
        <Button onClick={() => {}} size="small">
            Hello, world!
        </Button>
        <Strut size={16} />
        <Button onClick={() => {}} size="small" kind="secondary">
            Hello, world!
        </Button>
        <Strut size={16} />
        <Button onClick={() => {}} size="small" kind="tertiary">
            Hello, world!
        </Button>
    </View>
);

export const XlargeButtons: StoryComponentType = () => (
    <View style={{flexDirection: "row"}}>
        <Button onClick={() => {}} size="xlarge">
            Hello, world!
        </Button>
        <Strut size={16} />
        <Button onClick={() => {}} size="xlarge" kind="secondary">
            Hello, world!
        </Button>
        <Strut size={16} />
        <Button onClick={() => {}} size="xlarge" kind="tertiary">
            Hello, world!
        </Button>
    </View>
);

export const longLabelsAreEllipsized: StoryComponentType = () => (
    <Button onClick={() => {}} style={{maxWidth: 200}}>
        label too long for the parent container
    </Button>
);

export const buttonWithSpinner: StoryComponentType = () => (
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

export const submitButtonInForm: StoryComponentType = () => (
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

submitButtonInForm.parameters = {
    options: {
        showAddonPanel: true,
    },
    chromatic: {
        // We already have screenshots of other stories that cover more of the button states
        disable: true,
    },
};
