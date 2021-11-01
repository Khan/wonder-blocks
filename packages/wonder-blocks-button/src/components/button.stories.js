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
