import * as React from "react";
import {StyleSheet} from "aphrodite";
import type {Meta, StoryObj} from "@storybook/react";

import {
    announceMessage,
    type AnnounceMessageProps,
} from "@khanacademy/wonder-blocks-announcer";
import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";

import ComponentInfo from "../components/component-info";
import packageConfig from "../../packages/wonder-blocks-announcer/package.json";
import {FlexibleDialog, ModalLauncher} from "@khanacademy/wonder-blocks-modal";
import {BodyText, Heading} from "@khanacademy/wonder-blocks-typography";

const AnnouncerExample = ({
    message = "Clicked!",
    level,
    debounceThreshold,
}: AnnounceMessageProps) => {
    return (
        <Button
            onClick={async () => {
                const idRef = await announceMessage({
                    message,
                    level,
                    debounceThreshold,
                });
                /* eslint-disable-next-line */
                console.log(idRef);
            }}
        >
            Save
        </Button>
    );
};
type StoryComponentType = StoryObj<typeof AnnouncerExample>;

/**
 * > 🌱 **Note:** This is a new package. We would love your feedback on it!
 *
 * Announcer exposes an API for screen reader messages using [ARIA Live Regions](https://www.w3.org/TR/wai-aria/#attrs_liveregions).
 * It can be used to notify Assistive Technology users without moving
 * keyboard focus. Use cases include combobox filtering, toast notifications,
 * client-side routing, and more.
 *
 * Announcer is an ES6 class that creates a singleton instance. It can be
 * optionally configured once per page load with the `initAnnouncer` function.
 * Calling `announceMessage` will automatically create this instance if not
 * already present.
 *
 * Messages alternate between one of two live regions per level (`polite` and `assertive`).
 * They are automatically cleared from the DOM after a `5000` ms delay.
 *
 * To test the Announcer, turn on VoiceOver for Mac/iOS or NVDA on Windows and play with the [React example below](#react-announcer-example).
 *
 * By default, the `wbAnnouncer` container element is rendered _visually hidden_.
 *
 * > In Storybook, the Live Regions appended by Announcer are shown visually on the
 * right side of the screen for debugging (see red outlined boxes). This can be
 * controlled with a Storybook parameter, `addBodyClass: "showAnnouncer"`.
 *
 * ## API functions
 * ### announceMessage(options)
 *
 * Calling the `announceMessage` function automatically appends the live regions
 * to `document.body` by default.
 *
 * #### Options object
 * - **message:** `string` (required) The text to be announced in a screen reader
 *
 * - **level:** `assertive` or `polite` (default)<br>
 *      Whether to interrupt other messages before making an announcement or wait until the system queue is clear.
 *
 * - **debounceThreshold** `number` (default `250` ms)<br>
 *      Specific duration to wait before making another announcement. This is helpful
 *      to prevent too many messages in a dynamic render cycle. Uses trailing edge debounce where last message wins.
 *
 * - **initialTimeout** `number` (default `150` ms)<br>
 *      Optional duration to wait before the first announcement, used for Safari and automated testing.
 *
 * #### Returns
 * A promise resolving with the string ID of the last targeted live region element, such as `wbARegion-polite1`.
 *
 * ####  Usage
 *
 * Calling `announceMessage` in an event handler:
 *
 * ```jsx
 * import { announceMessage } from "@khanacademy/wonder-blocks-announcer";
 *
 * <div>
 *      <button onClick={() => announceMessage({message: 'Saved your work for you.'})}>
 *          Save
 *      </button>
 * </div>
 * ```
 *
 * Calling `announceMessage` in React.useEffect() when state changes:
 *
 *```jsx
 *  import { announceMessage } from "@khanacademy/wonder-blocks-announcer";
 *
 * const MyComponent = () => {
 *      React.useEffect(() => {
 *          if (someState) {
 *              announceMessage({message: "A thing!"});
 *          }
 *      }, [someState]);
 *
 *      return (
 *          <div>Some content</div>
 *      )
 * }
 * ```
 *
 * ### initAnnouncer(options)

The `initAnnouncer` function can be optionally called to inject live regions on page load.

This can help with consistency of screen reader messages as live regions
should ideally be present on the page before making announcements.

Without this optional configuration, the live regions will be injected the first
time `announceMessage` is called. This is sufficient for many use cases, and can be
determined through screen reader testing (especially with VoiceOver and Safari).

With the `targetElement` option, you can configure the Announcer to inject into a specific element.
Otherwise it will default to `document.body` (without the `targetElement` property).

#### Usage
```jsx
 * import { useRef } from "React";
 * import { initAnnouncer } from "@khanacademy/wonder-blocks-announcer";
 *
 * const LayoutComponent = () => {
 *      const containerRef = useRef(null);
 *
 *      initAnnouncer({
 *          targetElement: containerRef.current // optional: defaults to document.body
 *      })
 *
 *      return (
 *          <div ref={containerRef}>
 *              <div>...</div>
 *              <--  wbAnnouncer will be injected here -->
 *          </div>
 *      )
 * }
 * ```
 **/
export default {
    title: "Packages / Announcer",
    component: AnnouncerExample,
    decorators: [
        (Story): React.ReactElement<React.ComponentProps<typeof View>> => (
            <View style={styles.example}>
                <Story />
            </View>
        ),
    ],
    parameters: {
        addBodyClass: "showAnnouncer",
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
        chromatic: {disableSnapshot: true},
    },
    argTypes: {
        level: {
            control: "radio",
            options: ["polite", "assertive"],
        },
        debounceThreshold: {
            control: "number",
            type: "number",
            description: "(milliseconds)",
        },
    },
} as Meta<typeof AnnouncerExample>;

/**
 * ## React Announcer Example
 *
 * This is an example of a React component calling the `announceMessage` function.
 * The `message` property is set to some example text and the other options are set to their
 * default values.
 *
 * The `onClick` handler calls `announceMessage`, sending the message to the live
 * regions appended by the Announcer instance.
 */
export const AnnounceMessage: StoryComponentType = {
    args: {
        message: "Here is some example text.",
        level: "polite",
    },
};

/**
 * ## Announcer in Modal Context
 *
 * This story demonstrates the Announcer working inside a modal dialog. The modal
 * is opened by default to test that screen reader announcements work properly
 * when the modal is active and has focus management applied.
 */
export const AnnouncerInModal: StoryComponentType = {
    render: (args) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [isOpen, setIsOpen] = React.useState(true);

        const handleClose = () => {
            setIsOpen(false);
        };

        const handleReopen = () => {
            setIsOpen(true);
        };

        const ModalContent = ({closeModal}: {closeModal: () => void}) => (
            <FlexibleDialog
                title={<Heading>Announcer Test Modal</Heading>}
                content={
                    <View style={{gap: 16, padding: 24}}>
                        <BodyText>
                            This modal contains an announcer button. Try
                            clicking the button below to test screen reader
                            announcements in a modal context.
                        </BodyText>
                        <AnnouncerExample
                            message={args.message}
                            level={args.level}
                            debounceThreshold={args.debounceThreshold}
                        />
                        <Button onClick={closeModal} kind="secondary">
                            Close Modal
                        </Button>
                    </View>
                }
            />
        );

        return (
            <View>
                {!isOpen && (
                    <Button onClick={handleReopen}>Reopen Modal to Test</Button>
                )}
                <ModalLauncher
                    opened={isOpen}
                    onClose={handleClose}
                    modal={ModalContent}
                />
            </View>
        );
    },
    args: {
        message: "Message announced from inside modal!",
        level: "polite",
    },
    parameters: {
        docs: {
            description: {
                story: `This story tests the Announcer functionality within a modal context.
                The modal opens automatically to demonstrate that screen reader
                announcements work properly when focus is managed within the modal.`,
            },
        },
    },
};

const styles = StyleSheet.create({
    example: {
        alignItems: "center",
        justifyContent: "center",
    },
});
