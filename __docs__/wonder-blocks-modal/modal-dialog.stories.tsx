import * as React from "react";
import {StyleSheet} from "aphrodite";
import type {Meta, StoryObj} from "@storybook/react";
import {useGlobals} from "@storybook/preview-api";
import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {Body, Title} from "@khanacademy/wonder-blocks-typography";
import {ThemeSwitcherContext} from "@khanacademy/wonder-blocks-theming";
import {color, spacing} from "@khanacademy/wonder-blocks-tokens";

import {
    ModalLauncher,
    ModalDialog,
    ModalPanel,
} from "@khanacademy/wonder-blocks-modal";

import ComponentInfo from "../components/component-info";
import packageConfig from "../../packages/wonder-blocks-modal/package.json";
import modalDialogArgtypes from "./modal-dialog.argtypes";

const customViewports = {
    phone: {
        name: "phone",
        styles: {
            width: "320px",
            height: "568px",
        },
    },
    tablet: {
        name: "tablet",
        styles: {
            width: "640px",
            height: "960px",
        },
    },
    desktop: {
        name: "desktop",
        styles: {
            width: "1024px",
            height: "768px",
        },
    },
} as const;

/**
 * `ModalDialog` is a component that contains these elements:
 * - The visual dialog element itself (`<div role="dialog"/>`)
 * - The custom contents below and/or above the Dialog itself (e.g. decorative
 *   graphics).
 *
 * **Accessibility notes:**
 * - By default (e.g. using `OnePaneDialog`), `aria-labelledby` is populated
 *   automatically using the dialog title `id`.
 * - If there is a custom Dialog implementation (e.g. `TwoPaneDialog`), the
 *   dialog element doesn’t have to have the `aria-labelledby` attribute however
 *   this is recommended. It should match the `id` of the dialog title.
 */
export default {
    title: "Packages / Modal / Building Blocks / ModalDialog",
    component: ModalDialog,
    decorators: [
        (Story): React.ReactElement<React.ComponentProps<typeof View>> => (
            <View style={styles.example}>
                <Story />
            </View>
        ),
    ],
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
        docs: {
            source: {
                // See https://github.com/storybookjs/storybook/issues/12596
                excludeDecorators: true,
            },
        },
        viewport: {
            viewports: customViewports,
            defaultViewport: "desktop",
        },
        chromatic: {
            viewports: [320, 640, 1024],
        },
    },
    // Make the following props null in the control panel
    // because setting an object for a React node is
    // not practical to do manually.
    argTypes: modalDialogArgtypes,
} as Meta<typeof ModalDialog>;

type StoryComponentType = StoryObj<typeof ModalDialog>;

/**
 *  This is a basic `<ModalDialog>` that wraps a `<ModalPanel>` element. The
 *  `<ModalDialog>` is just a a wrapper for the visual components of the overall
 *  modal. It sets the modal's role to `"dialog"`. If it did not have another
 *  element as a child here (a `<ModalPanel>` in this case), nothing would be
 *  visible. If the `<ModalDialog>` were not given a `maxHeight` or `maxWidth`
 *  style, it would take up the entire viewport.
 *
 * #### Accessibility
 *
 * In this example, the `aria-labelledby` provides the alert dialog an
 * accessible name by referring to the element that provides the dialog title.
 * The `aria-describedby` attribute gives the alert dialog an accessible
 * description by referring to the dialog content that describes the primary
 * message or purpose of the dialog.
 */
export const Default: StoryComponentType = {
    render: (args) => (
        <View style={styles.previewSizer}>
            <View style={styles.modalPositioner}>
                <ModalDialog
                    {...args}
                    aria-labelledby="modal-title-0"
                    aria-describedby="modal-desc-0"
                >
                    <ModalPanel
                        content={
                            <>
                                <Title id="modal-title-0">Modal Title</Title>
                                <Strut size={spacing.large_24} />
                                <Body id="modal-desc-0">
                                    Here is some text in the modal.
                                </Body>
                            </>
                        }
                    />
                </ModalDialog>
            </View>
        </View>
    ),
    args: {
        style: {
            maxWidth: 500,
            maxHeight: 500,
        },
    },
};

/**
 * The `above` and `below` props work the same for `<ModalDialog>` as they do
 * for `<OnePaneDialog>`. The element passed into the `above` prop is rendered
 * in front of the modal. The element passed into the `below` prop is rendered
 * behind the modal. In this example, a `<View>` element with a background image
 * of a person and an orange blob is passed into the `below` prop. A `<View>`
 * element with a background image of an arc and a blue semicircle is passed
 * into the `above` prop. This results in the person's head and the orange blob
 * peeking out from behind the modal, and the arc and semicircle going over the
 * front of the modal.
 */
export const WithAboveAndBelow: StoryComponentType = {
    render: () => {
        const aboveStyle = {
            background: "url(./modal-above.png)",
            width: 874,
            height: 551,
            position: "absolute",
            top: 40,
            left: -140,
        } as const;

        const belowStyle = {
            background: "url(./modal-below.png)",
            width: 868,
            height: 521,
            position: "absolute",
            top: -100,
            left: -300,
        } as const;

        return (
            <View style={styles.previewSizer}>
                <View style={styles.modalPositioner}>
                    <ModalDialog
                        aria-labelledby="modal-title-2"
                        style={styles.squareDialog}
                        above={<View style={aboveStyle} />}
                        below={<View style={belowStyle} />}
                    >
                        <ModalPanel
                            content={
                                <>
                                    <Title id="modal-title-2">
                                        Modal Title
                                    </Title>
                                    <Strut size={spacing.large_24} />
                                    <Body>Here is some text in the modal.</Body>
                                </>
                            }
                        />
                    </ModalDialog>
                </View>
            </View>
        );
    },
};

/**
 * A modal can be launched using a launcher. Here, the launcher is a `<Button>`
 * element whose `onClick` function opens the modal. The modal passed into the
 * `modal` prop of the `<ModalLauncher>` element is a `<ModalDialog>` element.
 * To turn an element into a launcher, wrap the element in a `<ModalLauncher>`
 * element.
 */
export const WithLauncher: StoryComponentType = {
    render: () => {
        type MyModalProps = {
            closeModal: () => void;
        };

        const MyModal = ({closeModal}: MyModalProps): React.ReactElement => (
            <ModalDialog
                aria-labelledby="modal-title-3"
                style={styles.squareDialog}
            >
                <ModalPanel
                    content={
                        <>
                            <Title id="modal-title-3">Modal Title</Title>
                            <Strut size={spacing.large_24} />
                            <Body>Here is some text in the modal.</Body>
                        </>
                    }
                />
            </ModalDialog>
        );

        return (
            <ModalLauncher modal={MyModal}>
                {({openModal}) => (
                    <Button onClick={openModal}>
                        Click me to open the modal
                    </Button>
                )}
            </ModalLauncher>
        );
    },
    parameters: {
        chromatic: {
            // Don't take screenshots of this story since it would only show a
            // button and not the actual modal.
            disableSnapshot: true,
        },
    },
};

/**
 * This example shows how a modal dialog/panel can be created with a dark
 * background. The `light` prop of the `<ModalPanel>` element is set to `false`
 * to create a dark background.
 *
 * **NOTE:** We are using the `khanmigo` theme for this example for chromatic
 * tests. But you can use any theme you want by clicking in the `theme` option
 * in the toolbar.
 */
export const WithDarkPanel: StoryComponentType = {
    render: (args) => (
        <View style={styles.previewSizer}>
            <View style={styles.modalPositioner}>
                <ModalDialog
                    {...args}
                    aria-labelledby="modal-title-0"
                    aria-describedby="modal-desc-0"
                >
                    <ModalPanel
                        content={
                            <>
                                {/* eslint-disable-next-line jsx-a11y/img-redundant-alt -- TODO: Address a11y error */}
                                <img
                                    width="100%"
                                    src="https://cdn.kastatic.org/images/lohp/laptop_collage@2x.png"
                                    alt=""
                                />
                                <View
                                    style={{
                                        marginTop: spacing.medium_16,
                                    }}
                                >
                                    <Title id="modal-title-0">
                                        Modal Title
                                    </Title>
                                    <Strut size={spacing.large_24} />
                                    <Body id="modal-desc-0">
                                        Here is some text in the modal.
                                    </Body>
                                </View>
                            </>
                        }
                        light={false}
                        footer={
                            <Button
                                kind="secondary"
                                light={true}
                                onClick={() => {}}
                            >
                                Continue
                            </Button>
                        }
                    />
                </ModalDialog>
            </View>
        </View>
    ),
    args: {
        style: {
            maxWidth: 300,
            maxHeight: 500,
        },
    },
    decorators: [
        (Story) => {
            const [globals] = useGlobals();
            // Defaults to khanmigo theme for chromatic tests.
            const {theme = "khanmigo"} = globals;

            return (
                <ThemeSwitcherContext.Provider value={theme}>
                    <Story />
                </ThemeSwitcherContext.Provider>
            );
        },
    ],
};

const styles = StyleSheet.create({
    example: {
        alignItems: "center",
        justifyContent: "center",
    },
    modalPositioner: {
        // Checkerboard background
        backgroundImage:
            "linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)",
        backgroundSize: "20px 20px",
        backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",

        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
    previewSizer: {
        minHeight: 600,
        width: "100%",
    },
    row: {
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    footer: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
    squareDialog: {
        maxHeight: 500,
        maxWidth: 500,
        backgroundColor: color.darkBlue,
    },
    smallSquarePanel: {
        maxHeight: 400,
        maxWidth: 400,
    },
});
