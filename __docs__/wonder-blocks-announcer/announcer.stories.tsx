import * as React from "react";
import {StyleSheet} from "aphrodite";
import type {Meta, StoryObj} from "@storybook/react-vite";

import {
    announceMessage,
    type AnnounceMessageProps,
} from "@khanacademy/wonder-blocks-announcer";
import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {ModalLauncher, FlexibleDialog} from "@khanacademy/wonder-blocks-modal";
import {Heading, BodyText} from "@khanacademy/wonder-blocks-typography";

import ComponentInfo from "../components/component-info";
import packageConfig from "../../packages/wonder-blocks-announcer/package.json";
import {sizing} from "@khanacademy/wonder-blocks-tokens";

const AnnouncerExample = ({
    message = "Clicked!",
    level,
    debounceThreshold,
    label = "Announce",
}: AnnounceMessageProps & {label?: string}) => {
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
            {label}
        </Button>
    );
};
type StoryComponentType = StoryObj<typeof AnnouncerExample>;

/**
 * Announcer sends messages to screen readers using [ARIA Live Regions](https://www.w3.org/TR/wai-aria/#attrs_liveregions),
 * without moving keyboard focus. Useful for combobox filtering, toast
 * notifications, client-side routing, and similar patterns.
 *
 * It is a singleton — one instance is shared across the page. Live regions are
 * created automatically on first use and are visually hidden by default.
 *
 * Messages alternate between two regions per politeness level to prevent
 * assistive technology from swallowing repeated announcements. They are
 * removed from the DOM after 5000 ms.
 *
 * **Modal support:** When a Wonder Blocks modal is open, announcements are
 * automatically routed to a separate live region injected inside the
 * `aria-modal` element. This ensures screen readers inside the modal hear the
 * announcement — browsers hide content outside `aria-modal` from the
 * accessibility tree.
 *
 * > In Storybook, live regions are shown visually on the right side of the
 * screen (red outlined boxes) for debugging. Controlled via the
 * `addBodyClass: "showAnnouncer"` story parameter.
 *
 * ## API
 *
 * ### `announceMessage(options)`
 *
 * The main function. Creates the Announcer instance if one doesn't exist yet.
 *
 * **Options:**
 * - `message` `string` — The text to announce. Required.
 * - `level` `"polite" | "assertive"` — Default `"polite"`. Use `"assertive"` to interrupt.
 * - `debounceThreshold` `number` — ms to wait before sending (default `250`). Trailing-edge: last call wins.
 * - `initialTimeout` `number` — ms to delay the first announcement (default `150`). Helps with Safari/VoiceOver timing.
 *
 * **Returns:** `Promise<string>` — resolves with the ID of the targeted live region, e.g. `"wbARegion-polite1"`.
 *
 * ```jsx
 * import { announceMessage } from "@khanacademy/wonder-blocks-announcer";
 *
 * // In an event handler:
 * <button onClick={() => announceMessage({ message: "Saved!" })}>Save</button>
 *
 * // In a useEffect:
 * React.useEffect(() => {
 *     announceMessage({ message: `${results.length} results found` });
 * }, [results]);
 * ```
 *
 * ### `initAnnouncer(options)`
 *
 * Optional. Call once on page load to pre-create live regions before the first
 * announcement. Improves reliability with VoiceOver/Safari, which works best
 * when regions are registered before use.
 *
 * Without this, regions are created on the first `announceMessage` call, which
 * is fine for most cases.
 *
 * **Options:**
 * - `targetElement` `HTMLElement` — Where to mount the live regions (default `document.body`).
 * - `debounceThreshold` `number` — Sets the global debounce default.
 *
 * ```jsx
 * import { initAnnouncer } from "@khanacademy/wonder-blocks-announcer";
 *
 * // In a top-level component:
 * React.useEffect(() => {
 *     initAnnouncer();
 * }, []);
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
 * Click the button to send a polite announcement. The live region that receives
 * it is logged to the console and shown in the debug boxes on the right.
 *
 * Use the controls below to change the message text, politeness level, and
 * debounce threshold.
 */
export const AnnounceMessage: StoryComponentType = {
    args: {
        message: "Here is some example text.",
        level: "polite",
    },
};

/**
 * Test that screen reader announcements work correctly when a modal is open.
 *
 * When a WB modal dialog (any variant) is active with `aria-modal="true"`,
 * browsers hide everything outside it from the accessibility tree — including a
 * live region at the body level. To work around this, Announcer injects a second
 * set of live regions directly inside the `aria-modal` element when the modal mounts.
 *
 * - **"Announce on page"** fires into the document-level `wbAnnounce` node at `body`.
 * - **"Announce in modal"** fires into the `wbAnnounce-modal` node inside the dialog.
 *
 * With a screen reader active, only the in-modal button should be audible while
 * the modal is open.
 */
export const AnnouncerInModal: StoryComponentType = {
    render: (args) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [isOpen, setIsOpen] = React.useState(false);

        const handleClose = () => {
            setIsOpen(false);
        };

        const handleOpen = () => {
            setIsOpen(true);
        };

        const ModalContent = ({closeModal}: {closeModal: () => void}) => (
            <FlexibleDialog
                title={<Heading>Announcer Test Modal</Heading>}
                styles={{root: {maxWidth: "80rem"}}}
                content={
                    <View>
                        <BodyText>
                            This modal contains an announcer. <br />
                            Click the CTA button below to test screen reader
                            announcements in a modal context.
                        </BodyText>
                        <View
                            style={{
                                gap: sizing.size_160,
                                padding: `${sizing.size_240} 0`,
                                marginTop: "auto",
                                maxWidth: "40rem",
                                minHeight: "20rem",
                            }}
                        >
                            <AnnouncerExample
                                message={args.message}
                                level={args.level}
                                debounceThreshold={args.debounceThreshold}
                                label="Announce in modal"
                            />
                            <Button onClick={closeModal} kind="secondary">
                                Close Modal
                            </Button>
                        </View>
                    </View>
                }
            />
        );

        return (
            <View style={{gap: sizing.size_160}}>
                <BodyText>
                    Click &ldquo;Announce on page&rdquo; to test the document
                    layer, then open the modal and click &ldquo;Announce in
                    modal&rdquo; to test the modal layer.
                </BodyText>
                <AnnouncerExample
                    message="Message announced from the base page!"
                    level={args.level}
                    debounceThreshold={args.debounceThreshold}
                    label="Announce on page"
                />
                {!isOpen && (
                    <Button onClick={handleOpen}>Open Modal to Test</Button>
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
};

const styles = StyleSheet.create({
    example: {
        alignItems: "center",
        justifyContent: "center",
    },
});
