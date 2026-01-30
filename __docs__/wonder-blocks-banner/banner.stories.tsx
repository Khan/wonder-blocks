import * as React from "react";
import {StyleSheet} from "aphrodite";
import type {Meta, StoryObj} from "@storybook/react-vite";
import magnifyingGlass from "@phosphor-icons/core/regular/magnifying-glass.svg";

import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import Link from "@khanacademy/wonder-blocks-link";
import {semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import Banner from "@khanacademy/wonder-blocks-banner";

import BannerArgTypes from "./banner.argtypes";
import ComponentInfo from "../components/component-info";
import packageConfig from "../../packages/wonder-blocks-banner/package.json";
import crownIcon from "../wonder-blocks-icon/icons/crown.svg";
import {reallyLongText} from "../components/text-for-testing";
import {Icon} from "@khanacademy/wonder-blocks-icon";

type StoryComponentType = StoryObj<typeof Banner>;

/**
 * Banner. A banner displays a prominent message and related optional actions.
 * It can be used as a way of informing the user of important changes.
 * Typically, it is displayed toward the top of the screen.
 *
 * ### Usage
 * ```jsx
 * import Banner from "@khanacademy/wonder-blocks-banner";
 *
 * <Banner
 *     text="Here is some example text."
 *     kind="success"
 *     actions={[
 *         {title: "Button 1", onClick: () => {}},
 *         {title: "Button 2", onClick: () => {}},
 *     ]}
 *     onDismiss={() => {console.log("Has been dismissed.")}}
 * />
 * ```
 */
export default {
    title: "Packages / Banner",
    component: Banner,
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
        chromatic: {
            // Disable snapshots for this story because it is covered by testing snapshots
            disableSnapshot: true,
        },
        // TODO(WB-1936): Fix the a11y violations and remove this.
        a11y: {
            config: {
                rules: [
                    // Disabling a11y violation: ""Elements must meet minimum
                    // color contrast ratio thresholds (color-contrast)".
                    // Banner.critical with links have low contrast ratios.
                    {
                        id: "color-contrast",
                        enabled: false,
                    },
                ],
            },
        },
    },
    argTypes: BannerArgTypes,
} as Meta<typeof Banner>;

/**
 * This is an example of a banner with all the props set to their default
 * values and the `text` prop set to some example text.
 */
export const Default: StoryComponentType = {
    args: {
        text: "Here is some example text.",
    },
};

/**
 * Banners have four possible kinds (`kind` prop) - info (default), success,
 * warning, and critical. Info is blue with an info "i" icon, success is green
 * with a smiling icon, warning is yellow with a triangular "!" icon, and
 * critical is red with a round "!" icon.
 */
export const Kinds: StoryComponentType = {
    render: () => (
        <View style={styles.container}>
            <Banner
                text="kind: info - This is a message about something informative like an announcement."
                kind="info"
            />
            <Banner
                text="kind: success - This is a message about something positive or successful!"
                kind="success"
            />
            <Banner
                text="kind: warning - This is a message warning the user about a potential issue."
                kind="warning"
            />
            <Banner
                text="kind: critical - This is a message about something critical or an error."
                kind="critical"
            />
        </View>
    ),
};

/**
 * Here is an example of a banner with long text. In this case, the email
 * address is one giant word. Notice that the `overflow-wrap` property here is
 * set to `break-word` so that the email address will wrap to the next line.
 */
export const LongText: StoryComponentType = {
    args: {
        text: "We couldn't deliver your sign-up email to Adolph.Blaine.Charles.David.Earl.Frederick.Gerald.Hubert.Irvin.John.Kenneth.Lloyd.Martin.Nero.Oliver.Paul.Quincy.Randolph.Sherman.Thomas.Uncas.Victor.William.Xerxes.Yancy.Zeus.Wolfe­schlegel­stein­hausen­berger­dorff­welche­vor­altern­waren­gewissen­haft­schafers­wessen­schafe­waren­wohl­gepflege­und­sorg­faltig­keit­be­schutzen­vor­an­greifen­durch­ihr­raub­gierig­feinde­welche­vor­altern­zwolf­hundert­tausend­jah­res­voran­die­er­scheinen­von­der­erste­erde­mensch­der­raum­schiff­genacht­mit­tung­stein­und­sieben­iridium­elek­trisch­motors­ge­brauch­licht­als­sein­ur­sprung­von­kraft­ge­start­sein­lange­fahrt­hin­zwischen­stern­artig­raum­auf­de­suchen­nach­bar­schaft­der­stern­welche­ge­habt­be­wohn­bar­planeten­kreise­drehen­sich­und­wo­hin­der­neue­rasse­von­ver­stand­ig­mensch­lich­keit­konnte­fort­pflanzen­und­sicher­freuen­an­lebens­lang­lich­freude­und­ru­he­mit­nicht­ein­furcht­vor­an­greifen­vor­anderer­intelligent­ge­schopfs­von­hin­zwischen­stern­art­ig­raum.Sr@khanacademy.org. You may need to change it.",
        kind: "critical",
        onDismiss: () => {},
        actions: [
            {
                type: "button",
                title: "Change your email",
                onClick: () => {},
            },
        ],
    },
};

/**
 * This is how banners look on a dark background.
 */
export const DarkBackground: StoryComponentType = () => (
    <View style={styles.container}>
        <Banner text="kind: info" kind="info" />
        <Banner text="kind: success" kind="success" />
        <Banner text="kind: warning" kind="warning" />
        <Banner text="kind: critical" kind="critical" />
    </View>
);

DarkBackground.globals = {
    backgrounds: {
        value: "neutralStrong",
    },
    chromatic: {
        // Testing snapshots don't cover dark background case
        disableSnapshot: false,
    },
};

/**
 * This is a banner with buttons. An action, passed into the `actions` prop,
 * becomes a button when it has an `onClick` value and does not have an `href`
 * value.
 */
export const WithButtons: StoryComponentType = {
    args: {
        text: "This is a banner with buttons.",
        actions: [
            {type: "button", title: "Button 1", onClick: () => {}},
            {type: "button", title: "Button 2", onClick: () => {}},
        ],
    },
};

/**
 * This is a banner with links. An action, passed into the `actions` prop,
 * becomes a link when it has an `href` value. It can also have an `onClick`
 * value, but it will be a link regardless if it navigates to a URL via `href`.
 */
export const WithLinks: StoryComponentType = {
    args: {
        text: "This is a banner with links.",
        actions: [
            {type: "link", title: "Link 1", href: "/"},
            {type: "link", title: "Link 2", href: "/", onClick: () => {}},
        ],
    },
};

/**
 * A banner can have inline links passed into the `text` prop. Here, the Wonder
 * Blocks `<Link>` component is inline with the text that is in a span.
 *
 * One place to use this is in the case that a banner needs to have a link
 * action _and_ a button action. That is to say, one action navigates to a URL
 * and the other doesn't. This may be unfavorable because buttons and links look
 * different. One workaround is to make the link inline and only have buttons as
 * actions.
 */
export const WithInlineLinks: StoryComponentType = {
    render: () => (
        <View style={styles.container}>
            <Banner
                text="Oh no! The button and link on the right look different! Don't mix button and link actions."
                kind="critical"
                actions={[
                    {type: "link", title: "Link", href: "/"},
                    {type: "button", title: "Button", onClick: () => {}},
                ]}
            />
            <Banner
                text={
                    <>
                        Use inline links in the body of the text instead. Click{" "}
                        {
                            <Link href="#link" inline={true}>
                                link example
                            </Link>
                        }{" "}
                        to go to some other page.
                    </>
                }
                kind="success"
                actions={[{type: "button", title: "Button", onClick: () => {}}]}
            />
        </View>
    ),
};

/**
 * This is an example of a banner with multiple lines of text.
 */
export const Multiline: StoryComponentType = {
    render: () => (
        <View style={styles.narrowBanner}>
            <Banner
                text={
                    "This is a multi-line banner. These have wrapping text and actions would be below."
                }
            />
        </View>
    ),
};

/**
 * When a banner has long text, the actions move from the right of the text to
 * the bottom. Here, the actions are buttons.
 */
export const MultilineWithButtons: StoryComponentType = {
    render: () => (
        <View style={styles.narrowBanner}>
            <Banner
                text={
                    "This is a multi-line banner. These have wrapping text and actions are below."
                }
                actions={[
                    {type: "button", title: "Button 1", onClick: () => {}},
                    {type: "button", title: "Button 2", onClick: () => {}},
                ]}
            />
        </View>
    ),
};

/**
 * When a banner has long text, the actions move from the right of the text to
 * the bottom. Here, the actions are links.
 */
export const MultilineWithLinks: StoryComponentType = {
    render: () => (
        <View style={styles.narrowBanner}>
            <Banner
                text={
                    "This is a multi-line banner. These have wrapping text and actions are below."
                }
                actions={[
                    {type: "link", title: "Link 1", href: "/"},
                    {type: "link", title: "Link 2", href: "/"},
                ]}
            />
        </View>
    ),
};

/**
 * This is a banner that can be dismissed. For the "X" dismiss button to show
 * up, a function must be passed into the `onDismiss` prop.
 *
 * Here, pressing the "X" button or the "Also dismiss" button will dismiss the
 * banner. Pressing either button sets the `dismissed` state to true, which
 * causes the banner not to render due to a conditional. Instead, there is a
 * button whose `onClick` function sets the `dismissed` state to false. This
 * causes the banner to reappear and the button to disappear.
 */
export const WithDismissal: StoryComponentType = {
    render: () => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
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
                actions={[
                    {
                        type: "button",
                        title: "Also dismiss",
                        onClick: handleDismiss,
                    },
                ]}
                aria-label="Notification banner."
            />
        );
    },
};

/**
 * **NOTE: Custom actions are discouraged and should only be used as a last resort!**.
 *
 * There are a number of other props that Buttons and Links may have that are
 * not currently supported by the `actions` prop in Banner. These would require
 * the use of custom actions. If it absolutely necessary to have a custom
 * action, it can be done by passing in an object into the `actions` prop array
 * that has `type:"custom"`, and your desired element in the `node` field. Here
 * is an example of a case where the built in actions may not be enough - a
 * button with a `spinner` prop would need a custom implementation here.
 */
export const WithCustomAction: StoryComponentType = {
    render: () => (
        <Banner
            text="some text"
            actions={[
                {
                    type: "custom",
                    node: (
                        <Button
                            aria-label="Loading"
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
    ),
};

/**
 * **NOTE: Custom actions are discouraged and should only be used as a last resort!**.
 *
 * Another example with a custom action using a primary button.
 * See **With Custom Action** story for more details.
 */
export const WithCustomActionPrimary: StoryComponentType = {
    render: () => (
        <Banner
            text="some text"
            actions={[
                {
                    type: "custom",
                    node: (
                        <Button size="small" onClick={() => {}}>
                            Custom Action
                        </Button>
                    ),
                },
            ]}
        />
    ),
};

/**
 * Here is an example that includes both a normal action and a custom action.
 */
export const WithMixedActions: StoryComponentType = {
    render: () => (
        <Banner
            text="some text"
            actions={[
                {
                    type: "button",
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
                        <Button size="small" onClick={() => {}}>
                            Custom button 2
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
                            aria-label="Loading"
                        >
                            Spinner Button
                        </Button>
                    ),
                },
            ]}
        />
    ),
};

/**
 * Use the `icon` prop to show a specific Phosphor icon in the banner instead. If the
 * `icon` prop is not set, a default icon will be used in the banner depending
 * on the `kind` prop.
 *
 * __NOTE:__ Icons are available from the [Phosphor
 * Icons](https://phosphoricons.com/) library.
 *
 * To use a Phosphor icon, you can use the following syntax:
 *
 * ```jsx
 * import magnifyingGlass from "@phosphor-icons/core/regular/magnifying-glass.svg";
 * <Banner icon={magnifyingGlass} text="text" />
 * ```
 *
 * __Accessibility__: The icon chosen for the banner is decorative and
 * will always have an `aria-label` that communicates the kind of banner
 * (e.g. "info").
 */
export const WithPhosphorIcon: StoryComponentType = {
    render: (args) => (
        <Banner
            icon={magnifyingGlass}
            {...args}
            text="Here is an example with a Phosphor Icon"
        />
    ),
};

/**
 * Use the `icon` prop to show a custom icon in the banner instead. If the
 * `icon` prop is not set, a default icon will be used in the banner depending
 * on the `kind` prop.
 *
 * To use a custom icon that has a solid fill, you can use the following syntax:
 *
 * ```jsx
 * // This SVG should have the following attributes:
 * // - viewBox="0 0 256 256"
 * // - fill="currentColor"
 * // - A path (or paths) scaled up to fit in the 256x256 viewport.
 *
 * import crownIcon from "./icons/crown.svg";
 * <Banner icon={crownIcon} text="text" />
 * ```
 *
 * __Accessibility__: The icon chosen for the banner is decorative and
 * will always have an `aria-label` that communicates the kind of banner
 * (e.g. "info").
 */
export const WithCustomSolidIcon: StoryComponentType = {
    render: (args) => (
        <Banner
            icon={crownIcon}
            {...args}
            text="Here is an example with a custom icon"
        />
    ),
};

/**
 * For non-Phosphor icons, you can use the Wonder Blocks Icon component to wrap
 * a custom icon. The Banner component will handle the sizing for the icon.
 *
 * Accessibility: When customizing the icon, make sure to:
 * - Provide alt text for the icon
 * - Make sure important information about the banner kind is still communicated
 * to the user so that color alone isn't used to convey meaning.
 */
export const WithCustomIcon: StoryComponentType = {
    render: (args) => (
        <Banner
            {...args}
            icon={
                <Icon>
                    <img src="logo.svg" alt="Wonder Blocks" />
                </Icon>
            }
            kind="success"
            text="Success! Here is an example with a custom icon"
        />
    ),
};

/**
 * When `icon="none"`, no icon is displayed.
 *
 * For accessibility, make sure important information about the kind is still
 * conveyed to the user so that color alone isn't used to convey meaning.
 */
export const WithNoIcon: StoryComponentType = {
    args: {
        icon: "none",
        text: "Success! Here is an example with no icon.",
        kind: "success",
    },
};

/**
 * When in the right-to-left direction, the banner is mirrored. This example has
 * text in Urdu, which is a right-to-left language.
 */
export const RightToLeft: StoryComponentType = {
    render: () => (
        <View style={[styles.rightToLeft, styles.container]}>
            <Banner
                text="یہ اردو میں لکھا ہے۔"
                actions={[
                    {type: "button", title: "پہلا بٹن", onClick: () => {}},
                    {type: "button", title: "دوسرا بٹن", onClick: () => {}},
                ]}
            />
            <Banner
                text="یہ اردو میں لکھا ہے۔"
                actions={[
                    {type: "button", title: "پہلا بٹن", onClick: () => {}},
                    {type: "button", title: "دوسرا بٹن", onClick: () => {}},
                ]}
            />
        </View>
    ),
    parameters: {
        chromatic: {
            // Keep snapshots for rtl stories
            disableSnapshot: false,
        },
    },
};

/**
 * When in the right-to-left direction, the banner is mirrored. This example has
 * text in Urdu, which is a right-to-left language. This example also has
 * multiple lines with the butotns on the bottom of the text.
 */
export const RightToLeftMultiline: StoryComponentType = {
    render: () => (
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
                    {type: "button", title: "پہلا بٹن", onClick: () => {}},
                    {type: "button", title: "دوسرا بٹن", onClick: () => {}},
                ]}
            />
        </View>
    ),
    parameters: {
        chromatic: {
            // Keep snapshots for rtl stories
            disableSnapshot: false,
        },
    },
};

/**
 * There are times where custom styles need to be applied to the Banner
 * component, especially for layout purposes. Custom styles can be applied by
 * using the `styles` prop. The following parts can be styled:
 * - `root`: Styles the root element
 *
 * If there are other parts you need to customize, please reach out to the
 * Wonder Blocks team!
 */
export const WithCustomStyles: StoryComponentType = {
    render: () => (
        <View style={{height: "500px", width: "300px", gap: sizing.size_160}}>
            <Banner text={reallyLongText} styles={{root: {flexShrink: 0}}} />
            <View
                style={{
                    backgroundColor:
                        semanticColor.core.background.neutral.subtle,
                    flexGrow: 1,
                    overflowY: "auto",
                }}
                tabIndex={0}
            >
                <View style={{padding: sizing.size_160}}>
                    {reallyLongText}
                    {reallyLongText}
                </View>
            </View>
        </View>
    ),
    parameters: {
        chromatic: {
            // Keep snapshots to confirm custom styles are working
            disableSnapshot: false,
        },
    },
};

const styles = StyleSheet.create({
    example: {
        alignItems: "center",
        justifyContent: "center",
    },
    container: {
        width: "100%",
        gap: sizing.size_160,
    },
    narrowBanner: {
        maxWidth: 400,
    },
    rightToLeft: {
        width: "100%",
        direction: "rtl",
    },
});
