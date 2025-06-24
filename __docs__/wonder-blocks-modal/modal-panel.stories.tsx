import * as React from "react";
import {StyleSheet} from "aphrodite";
import type {Meta, StoryObj} from "@storybook/react";

import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {
    border,
    semanticColor,
    spacing,
} from "@khanacademy/wonder-blocks-tokens";
import {BodyText, Heading} from "@khanacademy/wonder-blocks-typography";

import {
    ModalDialog,
    ModalPanel,
    ModalHeader,
    ModalFooter,
} from "@khanacademy/wonder-blocks-modal";
import packageConfig from "../../packages/wonder-blocks-modal/package.json";
import ComponentInfo from "../components/component-info";
import modalPanelArgtypes from "./modal-panel.argtypes";
import {allModes} from "../../.storybook/modes";

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

const longBody = (
    <>
        <BodyText>
            {`Let's make this body content long in order
to test scroll overflow.`}
        </BodyText>
        <br />
        <BodyText>
            {`Lorem ipsum dolor sit amet, consectetur
adipiscing elit, sed do eiusmod tempor incididunt
ut labore et dolore magna aliqua. Ut enim ad minim
veniam, quis nostrud exercitation ullamco laboris
nisi ut aliquip ex ea commodo consequat. Duis aute
irure dolor in reprehenderit in voluptate velit
esse cillum dolore eu fugiat nulla pariatur.
Excepteur sint occaecat cupidatat non proident,
sunt in culpa qui officia deserunt mollit anim id
est.`}
        </BodyText>
        <br />
        <BodyText>
            {`Lorem ipsum dolor sit amet, consectetur
adipiscing elit, sed do eiusmod tempor incididunt
ut labore et dolore magna aliqua. Ut enim ad minim
veniam, quis nostrud exercitation ullamco laboris
nisi ut aliquip ex ea commodo consequat. Duis aute
irure dolor in reprehenderit in voluptate velit
esse cillum dolore eu fugiat nulla pariatur.
Excepteur sint occaecat cupidatat non proident,
sunt in culpa qui officia deserunt mollit anim id
est.`}
        </BodyText>
        <br />
        <BodyText>
            {`Lorem ipsum dolor sit amet, consectetur
adipiscing elit, sed do eiusmod tempor incididunt
ut labore et dolore magna aliqua. Ut enim ad minim
veniam, quis nostrud exercitation ullamco laboris
nisi ut aliquip ex ea commodo consequat. Duis aute
irure dolor in reprehenderit in voluptate velit
esse cillum dolore eu fugiat nulla pariatur.
Excepteur sint occaecat cupidatat non proident,
sunt in culpa qui officia deserunt mollit anim id
est.`}
        </BodyText>
    </>
);

/**
 * ModalPanel is the content container.
 *
 * ### Implementation notes
 *
 * If you are creating a custom Dialog, make sure to follow these guidelines:
 * - Make sure to add this component inside the
 *   [ModalDialog](../?path=/docs/packages-modal-building-blocks-modaldialog--docs).
 * - If needed, you can also add a
 *   [ModalHeader](../?path=/docs/packages-modal-building-blocks-modalheader--docs) using
 *   the `header` prop. Same goes for
 *   [ModalFooter](../?path=/docs/packages-modal-building-blocks-modalfooter--docs).
 * - If you need to create e2e tests, make sure to pass a `testId` prop. This
 *   will be passed down to this component using a sufix: e.g.
 *   `some-random-id-ModalPanel`. This scope will be propagated to the
 *   CloseButton element as well: e.g. `some-random-id-CloseButton`.
 *
 * ### Usage
 * ```tsx
 * <ModalDialog>
 *      <ModalPanel content={"custom content goes here"} />
 * </ModalDialog>
 * ```
 */
export default {
    title: "Packages / Modal / Building Blocks / ModalPanel",
    component: ModalPanel,
    decorators: [
        (Story): React.ReactElement<React.ComponentProps<typeof View>> => (
            <View style={styles.previewSizer}>
                <View style={styles.modalPositioner}>
                    <Story />
                </View>
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
            modes: {
                small: allModes.small,
                large: allModes.large,
                thunderblocks: allModes.themeThunderBlocks,
            },
        },
    },
    argTypes: modalPanelArgtypes,
} as Meta<typeof ModalPanel>;

type StoryComponentType = StoryObj<typeof ModalPanel>;

/**
 * This is a basic `<ModalPanel>`. It just has a `content` prop that contains a
 * title and a body.
 */
export const Default: StoryComponentType = {
    render: (args) => (
        <ModalDialog aria-labelledby="modal-title-0" style={styles.dialog}>
            <ModalPanel
                {...args}
                content={
                    <>
                        <Heading size="xxlarge" id="modal-title-0">
                            Modal Title
                        </Heading>
                        <Strut size={spacing.large_24} />
                        {longBody}
                    </>
                }
            />
        </ModalDialog>
    ),
    parameters: {
        chromatic: {
            // We already have screenshots in one-pane-dialog.stories.tsx
            disableSnapshot: true,
        },
    },
};

/**
 * This is a `<ModalPanel>` with a `header` prop. Note that the header that
 * renders here as part of the `header` prop is sticky, so it remains even if
 * you scroll down in the modal.
 */
export const WithHeader: StoryComponentType = {
    render: () => (
        <ModalDialog aria-labelledby="modal-title-2" style={styles.dialog}>
            <ModalPanel
                header={
                    <ModalHeader titleId="modal-title-2" title="Modal Title" />
                }
                content={longBody}
            />
        </ModalDialog>
    ),
    parameters: {
        chromatic: {
            // We already have screenshots in one-pane-dialog.stories.tsx
            disableSnapshot: true,
        },
    },
};

/**
 * A modal panel can have a footer with the `footer` prop. In this example, the
 * footer just contains a button. Note that the footer is sticky.
 */
export const WithFooter: StoryComponentType = {
    render: () => (
        <ModalDialog aria-labelledby="modal-title-3" style={styles.dialog}>
            <ModalPanel
                content={
                    <>
                        <Heading size="xxlarge" id="modal-title-3">
                            Modal Title
                        </Heading>
                        <Strut size={spacing.large_24} />
                        {longBody}
                    </>
                }
                footer={
                    <ModalFooter>
                        <Button onClick={() => {}}>Continue</Button>
                    </ModalFooter>
                }
            />
        </ModalDialog>
    ),
    parameters: {
        chromatic: {
            // We already have screenshots in one-pane-dialog.stories.tsx
            disableSnapshot: true,
        },
    },
};

/**
 * Here is an example of how you can have a modal with two panels. Observe that
 * it is responsive, so it uses a row layout with a larger window size and a
 * column layout on a smaller window size. The "X" close button has been
 * disabled for both panels since the top right spot would change depending on
 * which layout is being used.
 */
export const TwoPanels: StoryComponentType = {
    render: () => {
        const mobile = "@media (max-width: 1023px)";
        const desktop = "@media (min-width: 1024px)";

        const twoPaneDialogStyle = {
            [desktop]: {
                width: "86.72%",
                maxWidth: 888,
                height: "60.42%",
                minHeight: 308,
            },
            [mobile]: {
                width: "100%",
                height: "100%",
                overflow: "hidden",
            },
        } as const;

        const panelGroupStyle = {
            flex: 1,

            [desktop]: {
                flexDirection: "row",
            },
            [mobile]: {
                flexDirection: "column",
            },
        } as const;

        return (
            <ModalDialog
                style={twoPaneDialogStyle}
                aria-labelledby="sidebar-title-id"
            >
                <View style={panelGroupStyle}>
                    <ModalPanel
                        content={
                            <View>
                                <Heading size="xxlarge" id="sidebar-title-id">
                                    Sidebar
                                </Heading>
                                <Strut size={spacing.large_24} />
                                <BodyText>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.
                                    Ut enim ad minim veniam, quis nostrud
                                    exercitation ullamco laboris.
                                </BodyText>
                            </View>
                        }
                        closeButtonVisible={false}
                    />
                    <ModalPanel
                        content={
                            <View>
                                <Heading size="xxlarge">Contents</Heading>
                                <Strut size={spacing.large_24} />
                                <BodyText>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.
                                </BodyText>
                                <Strut size={spacing.large_24} />
                                <Button>Primary action</Button>
                            </View>
                        }
                        closeButtonVisible={false}
                    />
                </View>
            </ModalDialog>
        );
    },
};

/**
 * A `<ModalPanel>` can have custom styles. In this example, the styles for the
 * modal panel include blue text color, a 2px solid dark blue border, and a
 * border radius of 20px.
 */
export const WithStyle: StoryComponentType = {
    render: () => {
        const modalStyles = {
            color: semanticColor.status.notice.foreground,
            background: semanticColor.status.notice.background,
            border: `${border.width.medium} solid ${semanticColor.status.notice.foreground}`,
            borderRadius: 20,
        } as const;

        return (
            <ModalDialog aria-labelledby="modal-title-1" style={styles.dialog}>
                <ModalPanel
                    header={
                        <ModalHeader
                            titleId="modal-title-1"
                            title="Modal Title"
                        />
                    }
                    content={longBody}
                    style={modalStyles}
                />
            </ModalDialog>
        );
    },
};

const styles = StyleSheet.create({
    dialog: {
        maxWidth: 600,
        maxHeight: 500,
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
        height: 600,
    },
    example: {
        alignItems: "center",
        justifyContent: "center",
    },
});
