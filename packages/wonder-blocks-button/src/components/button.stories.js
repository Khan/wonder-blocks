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
import {Caption} from "@khanacademy/wonder-blocks-typography";

import type {StoryComponentType} from "@storybook/react";
import Button from "./button.js";

import {name, version} from "../../package.json";

function ComponentInfo(): React.Node {
    return (
        <View
            style={{
                justifyContent: "flex-end",
                alignItems: "center",
                flexDirection: "row",
                gap: 10,
            }}
        >
            <Caption>
                {name}@{version}
            </Caption>
            <Button
                kind="secondary"
                href="https://github.com/Khan/wonder-blocks/tree/master/packages/wonder-blocks-button"
                target="_blank"
                style={{color: "black"}}
                icon={{
                    small: `M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z`,
                }}
            >
                Source code
            </Button>
        </View>
    );
}

export default {
    title: "Navigation/Button",
    component: Button,
    parameters: {
        componentSubtitle: (<ComponentInfo />: React$Element<() => React.Node>),
    },
    decorators: [withDesign],
    argTypes: {
        children: {
            description: "Text to appear on the button.",
            type: {required: true},
        },
        icon: {
            description: "An icon, displayed to the left of the title.",
            type: {required: false},
            control: {type: "select"},
            options: (Object.keys(icons): Array<string>),
            mapping: icons,
            table: {
                type: {summary: "IconAsset"},
            },
        },
        spinner: {
            description: "If true, replaces the contents with a spinner.",
            control: {type: "boolean"},
            table: {
                type: {
                    summary: "boolean",
                    detail:
                        "Setting this prop to `true` will disable the button.",
                },
            },
        },
        color: {
            description: "The color of the button, either blue or red.",
            options: ["default", "destructive"],
            control: {type: "radio"},
            table: {
                category: "Theming",
                type: {
                    summary: `"default" | "destructive"`,
                },
            },
        },
        kind: {
            description:
                "The kind of the button, either primary, secondary, or tertiary.",
            options: ["primary", "secondary", "tertiary"],
            control: {type: "select"},
            table: {
                type: {summary: "primary | secondary | tertiary"},
                defaultValue: {
                    detail: `
                    - Primary buttons have background colors.\n- Secondary buttons have a border and no background color.\n- Tertiary buttons have no background or border.
                    `,
                },
            },
        },
        light: {
            description: "Whether the button is on a dark/colored background.",
            control: {type: "boolean"},
            table: {
                category: "Theming",
                type: {
                    summary: "boolean",
                    detail:
                        "Sets primary button background color to white, and secondary and tertiary button title to color.",
                },
            },
        },
        size: {
            description: "The size of the button.",
            options: ["small", "medium", "xlarge"],
            control: {type: "select"},
            table: {
                category: "Sizing",
                defaultValue: {
                    detail: `"medium" = height: 40; "small" = height: 32; "xlarge" = height: 60;`,
                },
                type: {
                    summary: `"medium" | "small" | "xlarge"`,
                },
            },
        },
        disabled: {
            description: "Whether the button is disabled.",
            table: {
                type: {
                    summary: "boolean",
                },
            },
        },
        id: {
            description: "An optional id attribute.",
            control: {type: "text"},
            table: {
                type: {
                    summary: "string",
                },
            },
        },
        testId: {
            description: "Test ID used for e2e testing.",
            control: {type: "text"},
            table: {
                type: {
                    summary: "string",
                },
            },
        },
        rel: {
            description: `Specifies the type of relationship between the current document and the linked document. Should only be used when "href" is specified. This defaults to "noopener noreferrer" when target="_blank", but can be overridden by setting this prop to something else.`,
            control: {type: "text"},
            table: {
                type: {
                    summary: "string",
                },
            },
        },
        target: {
            description: `A target destination window for a link to open in. Should only be used
            * when "href" is specified.`,
            control: {type: "text"},
            table: {
                type: {
                    summary: "string",
                },
            },
        },
        tabIndex: {
            description: "Set the tabindex attribute on the rendered element.",
            control: {type: "number", min: -1},
            table: {
                type: {
                    summary: "number",
                },
            },
        },
        style: {
            description: "Optional custom styles.",
            table: {
                type: {
                    summary: "StyleType",
                },
            },
            type: {
                summary: "StyleType",
            },
        },
        className: {
            description: "Adds CSS classes to the Button.",
            control: {type: "text"},
            table: {
                type: {
                    summary: "string",
                },
            },
        },
        /**
         * Events
         */
        onClick: {
            action: "clicked",
            description: `Function to call when button is clicked.
            This callback should be used for things like marking BigBingo conversions. It should NOT be used to redirect to a different URL or to prevent navigation via e.preventDefault(). The event passed to this handler will have its preventDefault() and stopPropagation() methods stubbed out.
            `,
            table: {
                category: "Events",
                type: {
                    summary: "(e: SyntheticEvent<>) => mixed",
                    detail: `onClick is optional if href is present, but must be defined if
                        * href is not`,
                },
            },
        },
        /**
         * Navigation
         */
        skipClientNav: {
            description: `Whether to avoid using client-side navigation. If the URL passed to href is local to the client-side, e.g. /math/algebra/eval-exprs, then it tries to use react-router-dom's Link component which handles the client-side navigation. You can set "skipClientNav" to true avoid using client-side nav entirely.`,
            control: {type: "boolean"},
            table: {
                category: "Navigation",
                type: {
                    summary: "Note",
                    detail:
                        "All URLs containing a protocol are considered external, e.g. https://khanacademy.org/math/algebra/eval-exprs will trigger a full page reload.",
                },
            },
        },
        href: {
            description: "URL to navigate to.",
            control: {type: "text"},
            table: {
                category: "Navigation",
                type: {
                    summary: "string",
                    detail: "URL is required when we use `safeWithNav`",
                },
            },
        },
        beforeNav: {
            description: `Run async code before navigating. If the promise returned rejects then navigation will not occur.`,
            table: {
                category: "Navigation",
                type: {
                    summary: "() => Promise<mixed>",
                    detail: `If both safeWithNav and beforeNav are provided, beforeNav will be run first and safeWithNav will only be run if beforeNav does not reject.`,
                },
            },
        },
        safeWithNav: {
            description: `Run async code in the background while client-side navigating. If the browser does a full page load navigation, the callback promise must be settled before the navigation will occur. Errors are ignored so that navigation is guaranteed to succeed.`,
            table: {
                category: "Navigation",
                type: {
                    summary: "() => Promise<mixed>",
                },
            },
        },
        /**
         * Accessibility
         */
        ariaLabel: {
            name: "aria-label",
            description: "A label for the button.",
            table: {
                category: "Accessibility",
                type: {
                    summary: "string",
                    detail: `aria-label should be used when spinner={true} to let people using screen readers that the action taken by clicking the button will take some time to complete.`,
                },
            },
        },
    },
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

export const NavigationWithAsyncAction: StoryComponentType = () => (
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
                Async action, client-side nav
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
                Async action, server-side nav
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
                Async action, open URL
            </Button>
            <Switch>
                <Route path="/foo">
                    <View id="foo">Hello, world!</View>
                </Route>
            </Switch>
        </View>
    </MemoryRouter>
);

NavigationWithAsyncAction.parameters = {
    docs: {
        storyDescription:
            "Sometimes you may need to perform an async action either before or during navigation. This can be accomplished with `beforeNav` and `safeWithNav` respectively.",
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
        disable: true,
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
