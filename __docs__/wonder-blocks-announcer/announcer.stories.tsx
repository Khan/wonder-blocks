import * as React from "react";
import {StyleSheet} from "aphrodite";
import type {Meta, StoryObj} from "@storybook/react";

import {
    announceMessage,
    type AnnounceMessageProps,
} from "@khanacademy/wonder-blocks-announcer";
import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";

import ComponentInfo from "../../.storybook/components/component-info";
import packageConfig from "../../packages/wonder-blocks-announcer/package.json";

const AnnouncerExample = ({
    message = "Clicked!",
    level,
    removalDelay,
}: AnnounceMessageProps) => {
    return (
        <Button
            onClick={() => {
                // TODO: explore making method async for consistent return string
                announceMessage({message, level, removalDelay});
            }}
        >
            Save
        </Button>
    );
};
type StoryComponentType = StoryObj<typeof AnnouncerExample>;

/**
 * Announcer exposes an API for screen reader messages using ARIA Live Regions.
 * It can be used to notify Assistive Technology users without moving focus. Use
 * cases include combobox filtering, toast notifications, client-side routing,
 * and more.
 *
 * Calling the sendMessage method automatically prepends the appropriate live regions
 * to the document body. It sends messages at a default `polite` level, with the
 * ability to override to `assertive` by passing a `level` argument. You can also
 * pass a `timeoutDelay` to wait a specific duration before sending a message.
 *
 * To test this API, turn on VoiceOver or NVDA on Windows and click the example button.
 *
 * ### Usage
 * ```jsx
 * import { sendMessage } from "@khanacademy/wonder-blocks-announcer";
 *
 * <div>
 *  <button onClick={() => sendMessage({message: 'Saved your work for you.'})}>
 *      Save
 *  </button>
 * </div>
 * ```
 */
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
    },
    argTypes: {
        level: {
            control: "radio",
            options: ["polite", "assertive"],
            defaultValue: "polite",
        },
        timeoutDelay: {
            control: "number",
            type: "number",
            description: "(milliseconds)",
        },
    },
} as Meta<typeof AnnouncerExample>;

/**
 * This is an example of a live region with all the options set to their default
 * values and the `message` argument set to some example text.
 */
export const SendMessage: StoryComponentType = {
    args: {
        message: "Here is some example text.",
        level: "polite",
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
