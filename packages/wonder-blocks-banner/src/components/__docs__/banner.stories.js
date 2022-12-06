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

const bannerDescription = `
Banner. A banner displays a prominent message and
related optional actions. It can be used as a way of
informing the user of important changes. Typically, it is
displayed toward the top of the screen.\n\nThere are two
possible layouts for banners - floating and full-width.
The \`floating\` layout is intended to be used when
there is whitespace around the banner. The \`full-width\`
layout is intended to be used when the banner needs to be
flush with surrounding elements.\n\n\n### Usage

\`\`\`jsx
import Banner from "@khanacademy/wonder-blocks-banner";

<Banner
    text="Here is some example text."
    kind="success"
    layout="floating"
    actions={[
        {title: "Button 1", onClick: () => {}},
        {title: "Button 2", onClick: () => {}},
    ]}
    onDismiss={() => {console.log("Has been dismissed.")}}
/>
\`\`\`
`;

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
                component: bannerDescription,
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
    <View style={styles.container}>
        <Banner text="This is some example text." layout="floating" />
        <Strut size={Spacing.medium_16} />
        <Banner text="This is some example text." layout="full-width" />
    </View>
);

Simple.parameters = {
    docs: {
        storyDescription: `These are examples of banners with just
            the \`text\` prop and the \`layout\` prop. `,
    },
};

export const Kinds: StoryComponentType = () => (
    <View style={styles.container}>
        <Banner
            text="kind: info - This is a message about something informative like an announcement."
            kind="info"
            layout="floating"
        />
        <Strut size={Spacing.medium_16} />
        <Banner
            text="kind: success - This is a message about something positive or successful!"
            kind="success"
            layout="floating"
        />
        <Strut size={Spacing.medium_16} />
        <Banner
            text="kind: warning - This is a message warning the user about a potential issue."
            kind="warning"
            layout="floating"
        />
        <Strut size={Spacing.medium_16} />
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

export const Layouts: StoryComponentType = () => {
    const borderStyle = {border: `2px solid ${Color.pink}`};
    const floatingContainerStyle = {padding: Spacing.xSmall_8};

    return (
        <View style={styles.container}>
            <Banner
                text="This banner has full-width layout."
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
            <View style={borderStyle}>
                <Banner
                    text="This banner has full-width layout. There is no space around it."
                    layout="full-width"
                    kind="success"
                />
            </View>
            <Strut size={Spacing.medium_16} />
            <View style={[borderStyle, floatingContainerStyle]}>
                <Banner
                    text={`This banner has floating layout. Padding has been
                        added to its container manually in order for the
                        banner to not touch any other elements.`}
                    layout="floating"
                    kind="success"
                />
            </View>
        </View>
    );
};

Layouts.parameters = {
    backgrounds: {
        default: "darkBlue",
    },
    docs: {
        storyDescription: `Banners come with two layouts: full-width
        and floating. Full-width layout gives the banner squared edges,
        and floating layout gives the banner rounded edges. Floating
        banners should have space around them and should not be touching
        other components. The space around floating banners is not
        automatically added to the container, it must be manually managed
        by the developer. To demonstrate this, there are also examples with
        outlines around them - the full-width banner is touching its outline,
        but padding has been added around the floating banner
        so that it will not touch its outline.`,
    },
};

export const DarkBackground: StoryComponentType = () => (
    <View style={styles.container}>
        <Banner text="kind: info" kind="info" layout="full-width" />
        <Strut size={Spacing.medium_16} />
        <Banner text="kind: success" kind="success" layout="full-width" />
        <Strut size={Spacing.medium_16} />
        <Banner text="kind: warning" kind="warning" layout="full-width" />
        <Strut size={Spacing.medium_16} />
        <Banner text="kind: critical" kind="critical" layout="full-width" />
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
        layout="full-width"
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
        layout="floating"
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
            layout="floating"
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
            layout="floating"
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
            layout="full-width"
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
            layout="floating"
        />
    </View>
);

MultilineWithButtons.parameters = {
    docs: {
        storyDescription: `When a banner has long text, the actions
            move from the right of the text to the bottom. Here, the
            actions are buttons.`,
    },
};

export const MultilineWithLinks: StoryComponentType = () => (
    <View style={styles.narrowBanner}>
        <Banner
            text={
                "This is a multi-line banner. These have wrapping text and actions are below."
            }
            actions={[
                {title: "Link 1", href: "/"},
                {title: "Link 2", href: "/"},
            ]}
            layout="full-width"
        />
    </View>
);

MultilineWithLinks.parameters = {
    docs: {
        storyDescription: `When a banner has long text, the actions
            move from the right of the text to the bottom. Here, the
            actions are links.`,
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
            kind="critical"
            onDismiss={handleDismiss}
            actions={[{title: "Also dismiss", onClick: handleDismiss}]}
            layout="floating"
            aria-label="Notification banner."
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

export const WithCustomAction: StoryComponentType = () => (
    <Banner
        text="some text"
        layout="floating"
        actions={[
            {
                type: "custom",
                node: (
                    <Button
                        kind="tertiary"
                        size="small"
                        onClick={() => {}}
                        spinner={true}
                    >
                        Spinner Button
                    </Button>
                ),
            },
        ]}
    />
);

WithCustomAction.parameters = {
    docs: {
        storyDescription: `**NOTE: Custom actions are discouraged**
            **and should only be used as a last resort!**\n\nThere are a
            number of other props that Buttons and Links may have that are
            not currently supported by the \`actions\` prop in Banner.
            These would require the use of custom actions. If it absolutely
            necessary to have a custom action, it can be done by passing
            in an object into the \`actions\` prop array that has
            \`type:"custom"\`, and your desired element in the \`node\`
            field. Here is an example of a case where the built in actions
            may not be enough - a button with a \`spinner\` prop would need
            a custom implementation here.`,
    },
};

export const WithMixedActions: StoryComponentType = () => (
    <Banner
        text="some text"
        layout="floating"
        actions={[
            {
                title: "Normal button",
                onClick: () => {},
            },
            {
                type: "custom",
                node: (
                    <Button kind="tertiary" size="small" onClick={() => {}}>
                        Custom button
                    </Button>
                ),
            },
            {
                type: "custom",
                node: (
                    <Button
                        kind="tertiary"
                        size="small"
                        onClick={() => {}}
                        spinner={true}
                    >
                        Spinner Button
                    </Button>
                ),
            },
        ]}
    />
);

WithMixedActions.parameters = {
    docs: {
        storyDescription: `Here is an example that includes both a
            normal action and a custom action.`,
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
    },
    narrowBanner: {
        maxWidth: 400,
    },
    rightToLeft: {
        width: "100%",
        direction: "rtl",
    },
});
