import * as React from "react";
import {StyleSheet} from "aphrodite";
import type {ComponentStory, ComponentMeta} from "@storybook/react";

import {
    Breadcrumbs,
    BreadcrumbsItem,
} from "@khanacademy/wonder-blocks-breadcrumbs";
import {View} from "@khanacademy/wonder-blocks-core";
import Link from "@khanacademy/wonder-blocks-link";
import {Body} from "@khanacademy/wonder-blocks-typography";

import {
    ModalDialog,
    ModalPanel,
    ModalHeader,
} from "@khanacademy/wonder-blocks-modal";
import {name, version} from "../../packages/wonder-blocks-modal/package.json";

import ComponentInfo from "../../.storybook/components/component-info";
import ModalHeaderArgtypes from "./modal-header.argtypes";

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
        <Body>
            {`Let's make this body content long in order
to test scroll overflow.`}
        </Body>
        <br />
        <Body>
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
        </Body>
        <br />
        <Body>
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
        </Body>
        <br />
        <Body>
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
        </Body>
    </>
);

export default {
    title: "Modal/Building Blocks/ModalHeader",
    component: ModalHeader,
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
        componentSubtitle: <ComponentInfo name={name} version={version} />,
        docs: {
            description: {
                component: null,
            },
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
    argTypes: ModalHeaderArgtypes,
} as ComponentMeta<typeof ModalHeader>;

type StoryComponentType = ComponentStory<typeof ModalHeader>;

export const Default: StoryComponentType = (args) => (
    <ModalDialog aria-labelledby={args.titleId} style={styles.dialog}>
        <ModalPanel header={<ModalHeader {...args} />} content={longBody} />
    </ModalDialog>
);

Default.args = {
    title: "This is a modal title.",
    titleId: "modal-title-id-default-example",
};

export const Simple: StoryComponentType = () => (
    <ModalDialog aria-labelledby="modal-title-1" style={styles.dialog}>
        <ModalPanel
            header={<ModalHeader title="Modal Title" titleId="modal-title-1" />}
            content={longBody}
        />
    </ModalDialog>
);

Simple.parameters = {
    docs: {
        storyDescription: `This is a basic \`<ModalHeader>\`. It just has a
            \`content\` prop that contains a title and a body.`,
    },
};

export const Dark: StoryComponentType = () => (
    <ModalDialog aria-labelledby="modal-title-2" style={styles.dialog}>
        <ModalPanel
            header={
                <ModalHeader
                    title="Modal Title"
                    titleId="modal-title-2"
                    light={false}
                />
            }
            content={longBody}
            light={false}
        />
    </ModalDialog>
);

Dark.parameters = {
    docs: {
        storyDescription: `This is \`<ModalHeader>\` when \`light\` is
            set to false. This should only be false if the \`light\` prop
            on the encompassing \`<ModalPanel>\` is also false . Note that
            the close button is not visible on the header if the panel is
            light.`,
    },
};

export const WithSubtitle: StoryComponentType = () => (
    <ModalDialog aria-labelledby="modal-title-3" style={styles.dialog}>
        <ModalPanel
            header={
                <ModalHeader
                    title="Modal Title"
                    titleId="modal-title-3"
                    subtitle="This is what a subtitle looks like."
                />
            }
            content={longBody}
        />
    </ModalDialog>
);

WithSubtitle.parameters = {
    docs: {
        storyDescription: `This is \`<ModalHeader>\` with a subtitle, which
            can be done by passing a string into the \`subtitle\` prop.`,
    },
};

export const WithSubtitleDark: StoryComponentType = () => (
    <ModalDialog aria-labelledby="modal-title-4" style={styles.dialog}>
        <ModalPanel
            header={
                <ModalHeader
                    title="Modal Title"
                    titleId="modal-title-4"
                    subtitle="This is what a subtitle looks like."
                    light={false}
                />
            }
            content={longBody}
            light={false}
        />
    </ModalDialog>
);

WithSubtitleDark.parameters = {
    docs: {
        storyDescription: `This is \`<ModalHeader>\` with a subtitle
            when it also has \`light\` set to false.`,
    },
};

export const WithBreadcrumbs: StoryComponentType = () => (
    <ModalDialog aria-labelledby="modal-title-5" style={styles.dialog}>
        <ModalPanel
            header={
                <ModalHeader
                    title="Modal Title"
                    titleId="modal-title-5"
                    breadcrumbs={
                        <Breadcrumbs>
                            <BreadcrumbsItem>
                                <Link href="">Course</Link>
                            </BreadcrumbsItem>
                            <BreadcrumbsItem>
                                <Link href="">Unit</Link>
                            </BreadcrumbsItem>
                            <BreadcrumbsItem>Lesson</BreadcrumbsItem>
                        </Breadcrumbs>
                    }
                />
            }
            content={longBody}
        />
    </ModalDialog>
);

WithBreadcrumbs.parameters = {
    docs: {
        storyDescription: `This is \`<ModalHeader>\` with breadcrumbs, which
            can be done by passing a Wonder Blocks \`<Breadcrumbs>\`
            element into the \`breadcrumbs\` prop. Note that \`breadcrumbs\`
            currently do not work when \`light\` is false.`,
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
