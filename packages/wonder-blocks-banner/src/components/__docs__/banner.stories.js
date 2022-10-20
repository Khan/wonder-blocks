// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";

import Banner from "@khanacademy/wonder-blocks-banner";
import Button from "@khanacademy/wonder-blocks-button";
import Color from "@khanacademy/wonder-blocks-color";
import {View} from "@khanacademy/wonder-blocks-core";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import Link from "@khanacademy/wonder-blocks-link";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {LabelSmall} from "@khanacademy/wonder-blocks-typography";

import type {StoryComponentType} from "@storybook/react";

import BannerArgTypes from "./banner.argtypes.js";
import ComponentInfo from "../../../../../.storybook/components/component-info.js";
import {name, version} from "../../../package.json";

export default {
    title: "Banner",
    component: Banner,
    decorators: [
        (Story: StoryComponentType): React.Element<typeof View> => (
            <View style={styles.example}>
                <Story />
            </View>
        ),
    ],
    parameters: {
        componentSubtitle: ((
            <ComponentInfo name={name} version={version} />
        ): any),
        docs: {
            description: {
                component: null,
            },
            source: {
                // See https://github.com/storybookjs/storybook/issues/12596
                excludeDecorators: true,
            },
        },
    },
    argTypes: BannerArgTypes,
};

export const Default: StoryComponentType = (args) => <Banner {...args} />;

Default.args = {
    text: "Here is some example text.",
};

export const Simple: StoryComponentType = () => (
    <Banner text="This is some example text." />
);

Simple.parameters = {
    docs: {
        storyDescription: `This is an example of a banner with just
            the \`text\` prop.`,
    },
};

export const Kinds: StoryComponentType = () => (
    <View style={styles.container}>
        <Banner
            text="kind: info - This is a message about something informative like an announcement."
            kind="info"
            layout="floating"
        />
        <Banner
            text="kind: success - This is a message about something positive or successful!"
            kind="success"
            layout="floating"
        />
        <Banner
            text="kind: warning - This is a message warning the user about a potential issue."
            kind="warning"
            layout="floating"
        />
        <Banner
            text="kind: critical - This is a message about something critical or an error."
            kind="critical"
            layout="floating"
        />
    </View>
);

Kinds.parameters = {
    docs: {
        storyDescription: `Banners have four possible kinds (\`kind\` prop) -
            info (default), success, warning, and critical. Info is blue
            with an info "i" icon, success is green with a smiling icon,
            warning is yellow with a triangular "!" icon, and critical is
            red with a round "!" icon.`,
    },
};

export const Layouts: StoryComponentType = () => (
    <View style={styles.container}>
        <Banner
            text="This banner has full-width layout. This is the default."
            layout="full-width"
            kind="success"
        />
        <Strut size={Spacing.medium_16} />
        <Banner
            text="This banner has floating layout."
            layout="floating"
            kind="success"
        />
        <Strut size={Spacing.medium_16} />
        <View style={styles.border}>
            <Banner
                text="This banner has full-width layout. There is no space around it."
                layout="full-width"
                kind="success"
            />
        </View>
        <Strut size={Spacing.medium_16} />
        <View style={styles.border}>
            <Banner
                text="This banner has floating layout. There is space around it."
                layout="floating"
                kind="success"
            />
        </View>
    </View>
);

Layouts.parameters = {
    backgrounds: {
        default: "darkBlue",
    },
    docs: {
        storyDescription: `Banners come with two layouts: full-width (default)
        and floating. Full-width layout gives the banner squared edges,
        and floating layout gives the banner rounded edges. Floating
        banners also have 8 pixels of space on each side - to demonstrate
        this, the container for each banner has also been given an outline.
        Observe that there is no space between the banner and the outline
        for the full-width banner, and there is noticable space between
        the banner and the outline for the floating banner.`,
    },
};

export const DarkBackground: StoryComponentType = () => (
    <View style={styles.column}>
        <Banner text="kind: info" kind="info" layout="floating" />
        <Banner text="kind: success" kind="success" layout="floating" />
        <Banner text="kind: warning" kind="warning" layout="floating" />
        <Banner text="kind: critical" kind="critical" layout="floating" />
    </View>
);

DarkBackground.parameters = {
    backgrounds: {
        default: "darkBlue",
    },
    docs: {
        storyDescription: "This is how banners look on a dark background.",
    },
};

export const WithButtons: StoryComponentType = () => (
    <Banner
        text="This is a banner with buttons."
        actions={[
            {title: "Button 1", onClick: () => {}},
            {title: "Button 2", onClick: () => {}},
        ]}
    />
);

WithButtons.parameters = {
    docs: {
        storyDescription: `This is a banner with buttons. An action, passed
            into the \`actions\` prop, becomes a button when it has an
            \`onClick\` value and does not have an \`href\` value.`,
    },
};

export const WithLinks: StoryComponentType = () => (
    <Banner
        text="This is a banner with links."
        actions={[
            {title: "Link 1", href: "/"},
            {title: "Link 2", href: "/", onClick: () => {}},
        ]}
    />
);

WithLinks.parameters = {
    docs: {
        storyDescription: `This is a banner with links. An action, passed
            into the \`actions\` prop, becomes a link when it has an
            \`href\` value. It can also have an \`onClick\` value, but it
            will be a link regardless if it navigates to a URL via \`href\`.`,
    },
};

export const WithInlineLinks: StoryComponentType = () => (
    <>
        <Banner
            text="Oh no! The button and link on the right look different! Don't mix button and link actions."
            kind="critical"
            actions={[
                {title: "Link", href: "/"},
                {title: "Button", onClick: () => {}},
            ]}
        />
        <Strut size={Spacing.medium_16} />
        <Banner
            text={
                <LabelSmall>
                    Use inline links in the body of the text instead. Click{" "}
                    {<Link href="">here</Link>} to go to some other page.
                </LabelSmall>
            }
            kind="success"
            actions={[{title: "Button", onClick: () => {}}]}
        />
    </>
);

WithInlineLinks.parameters = {
    docs: {
        storyDescription: `A banner can have inline links passed into
            the \`text\` prop. Here, the Wonder Blocks \`<Link>\` component
            is inline with the text that is in a span. \n\nOne place to use
            this is in the case that a banner needs to have a link action
            _and_ a button action. That is to say, one action navigates
            to a URL and the other doesn't. This may be unfavorable because
            buttons and links look different. One workaround is to make the
            link inline and only have buttons as actions.`,
    },
};

export const Multiline: StoryComponentType = () => (
    <View style={styles.narrowBanner}>
        <Banner
            text={
                "This is a multi-line banner. These have wrapping text and actions would be below."
            }
        />
    </View>
);

Multiline.parameters = {
    docs: {
        storyDescription:
            "This is an example of a banner with multiple lines of text.",
    },
};

export const MultilineWithButtons: StoryComponentType = () => (
    <View style={styles.narrowBanner}>
        <Banner
            text={
                "This is a multi-line banner. These have wrapping text and actions are below."
            }
            actions={[
                {title: "Button 1", onClick: () => {}},
                {title: "Button 2", onClick: () => {}},
            ]}
        />
    </View>
);

MultilineWithButtons.parameters = {
    docs: {
        storyDescription: `When a banner has long text, the actions
            move from the right of the text to the bottom.`,
    },
};

export const WithDismissal: StoryComponentType = () => {
    const [dismissed, setDismissed] = React.useState(false);

    const handleDismiss = () => {
        // eslint-disable-next-line no-console
        console.log("Dismiss!");
        setDismissed(true);
    };

    const handleReset = () => {
        // eslint-disable-next-line no-console
        console.log("Reset!");
        setDismissed(false);
    };

    return dismissed ? (
        <Button onClick={handleReset}>Reset banner</Button>
    ) : (
        <Banner
            text="This banner can be dismissed"
            onDismiss={handleDismiss}
            actions={[{title: "Also dismiss", onClick: handleDismiss}]}
        />
    );
};

WithDismissal.parameters = {
    docs: {
        storyDescription: `This is a banner that can be dismissed. For the
            "X" dismiss button to show up, a function must be passed into
            the \`onDismiss\` prop.\n\nHere, pressing the "X" button or the
            "Also dismiss" button will dismiss the banner. Pressing either
            button sets the \`dismissed\` state to true, which causes the
            banner not to render due to a conditional. Instead, there is a
            button whose \`onClick\` function sets the \`dismissed\` state
            to false. This causes the banner to reappear and the button to
            disappear.`,
    },
};

export const RightToLeft: StoryComponentType = () => (
    <View style={styles.rightToLeft}>
        <Banner
            text="یہ اردو میں لکھا ہے۔"
            actions={[
                {title: "پہلا بٹن", onClick: () => {}},
                {title: "دوسرا بٹن", onClick: () => {}},
            ]}
            layout="full-width"
        />
        <Strut size={Spacing.medium_16} />
        <Banner
            text="یہ اردو میں لکھا ہے۔"
            actions={[
                {title: "پہلا بٹن", onClick: () => {}},
                {title: "دوسرا بٹن", onClick: () => {}},
            ]}
            layout="floating"
        />
    </View>
);

RightToLeft.parameters = {
    docs: {
        storyDescription: `When in the right-to-left direction, the banner
            is mirrored. This example has text in Urdu, which is a
            right-to-left language.`,
    },
};

export const RightToLeftMultiline: StoryComponentType = () => (
    <View style={styles.rightToLeft}>
        <Banner
            text={`یہ اردو میں لکھا ہے۔یہ اردو میں لکھا ہے۔یہ اردو میں لکھا ہے۔یہ
             اردو میں لکھا ہے۔یہ اردو میں لکھا ہے۔یہ اردو میں لکھا ہے۔یہ
             اردو میں لکھا ہے۔یہ اردو میں لکھا ہے۔یہ اردو میں لکھا ہے۔یہ
             اردو میں لکھا ہے۔یہ اردو میں لکھا ہے۔یہ اردو میں لکھا ہے۔یہ
             اردو میں لکھا ہے۔یہ اردو میں لکھا ہے۔یہ اردو میں لکھا ہے۔
             اردو میں لکھا ہے۔یہ اردو میں لکھا ہے۔یہ اردو میں لکھا ہے۔
             اردو میں لکھا ہے۔یہ اردو میں لکھا ہے۔یہ اردو میں لکھا ہے۔`}
            actions={[
                {title: "پہلا بٹن", onClick: () => {}},
                {title: "دوسرا بٹن", onClick: () => {}},
            ]}
            layout="full-width"
        />
    </View>
);

RightToLeftMultiline.parameters = {
    docs: {
        storyDescription: `When in the right-to-left direction, the banner
            is mirrored. This example has text in Urdu, which is a
            right-to-left language. This example also has multiple lines
            with the butotns on the bottom of the text.`,
    },
};

const styles = StyleSheet.create({
    example: {
        alignItems: "center",
        justifyContent: "center",
    },
    container: {
        width: "100%",
        flexDirection: "column",
    },
    column: {
        width: "100%",
        flexDirection: "column",
        textAlign: "center",
    },
    variantRow: {
        width: "100%",
        flexDirection: "row",
        textAlign: "center",
    },
    narrowBanner: {
        maxWidth: 400,
    },
    border: {
        border: `2px solid ${Color.pink}`,
    },
    rightToLeft: {
        width: "100%",
        direction: "rtl",
    },
});
