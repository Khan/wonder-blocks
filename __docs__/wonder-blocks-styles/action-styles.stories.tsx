import * as React from "react";
import {Meta, StoryObj} from "@storybook/react-vite";
import info from "@phosphor-icons/core/regular/info.svg";
import ComponentInfo from "../components/component-info";
import packageConfig from "../../packages/wonder-blocks-styles/package.json";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import {actionStyles} from "@khanacademy/wonder-blocks-styles";
import {View} from "@khanacademy/wonder-blocks-core";
import {border, semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import Clickable from "@khanacademy/wonder-blocks-clickable";
import Button from "@khanacademy/wonder-blocks-button";
import Link from "@khanacademy/wonder-blocks-link";

/**
 * Styles that implement interactive states (hover, press, focus) for elements
 * on inverse/dark backgrounds.
 *
 * `actionStyles` is used **internally** by Wonder Blocks components to ensure
 * consistent interactive states across light and dark backgrounds.
 *
 * ### When to use
 *
 * - **WB component authors**: apply `actionStyles.inverse` when implementing a
 *   new WB component that needs to support inverse/dark backgrounds.
 * - **Consumers**: prefer using WB components (`Button`, `IconButton`, `Link`,
 *   etc.) directly — they already handle inverse styles. If you need to apply
 *   inverse styles to a WB component, pass the style via the `style` prop.
 *
 * ```tsx
 * import {actionStyles} from "@khanacademy/wonder-blocks-styles";
 *
 * // Applying to a WB component via style prop
 * <Button style={actionStyles.inverse}>
 *     Button on dark background
 * </Button>
 * ```
 */
export default {
    tags: ["!manifest"],
    title: "Packages / Styles / Action Styles",
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
    },
} as Meta<any>;

type Story = StoryObj<any>;

/**
 * A style that can be applied to interactive elements on inverse backgrounds.
 *
 * This is used for special cases where the element is on a dark background.
 * WB interactive components already include support for this style — apply it
 * via the `style` prop when needed.
 */
export const InverseOutline: Story = {
    name: "inverse",
    render: () => {
        return (
            <>
                <IconButton
                    kind="primary"
                    icon={info}
                    style={actionStyles.inverse}
                    aria-label="Primary info button"
                />
                <IconButton
                    kind="secondary"
                    icon={info}
                    style={actionStyles.inverse}
                    aria-label="Secondary info button"
                />
                <IconButton
                    kind="tertiary"
                    icon={info}
                    style={actionStyles.inverse}
                    aria-label="Tertiary info button"
                />
                <IconButton
                    kind="primary"
                    disabled
                    icon={info}
                    style={actionStyles.inverse}
                    aria-label="Disabled primary info button"
                />

                <Clickable onClick={() => {}} style={actionStyles.inverse}>
                    {() => "Clickable component"}
                </Clickable>

                <Button
                    kind="primary"
                    onClick={() => {}}
                    style={[
                        {
                            border: `${border.width.thin} solid ${semanticColor.core.border.critical.default}`,
                            backgroundColor:
                                semanticColor.core.background.critical.default,
                            color: semanticColor.status.success.background,
                        },
                        actionStyles.inverse,
                    ]}
                >
                    Custom styled button
                </Button>

                <Button kind="primary" style={actionStyles.inverse}>
                    Primary button
                </Button>
                <Button kind="secondary" style={actionStyles.inverse}>
                    Secondary button
                </Button>
                <Button kind="tertiary" style={actionStyles.inverse}>
                    Tertiary button
                </Button>

                <Link href="#test" style={actionStyles.inverse}>
                    Link component
                </Link>
            </>
        );
    },
    decorators: [
        (Story) => (
            <View
                style={{
                    gap: sizing.size_160,
                    padding: sizing.size_160,
                    flexDirection: "row",
                    placeItems: "center",
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                }}
            >
                <Story />
            </View>
        ),
    ],
    globals: {
        backgrounds: {
            value: "neutralStrong",
        },
    },
    parameters: {
        chromatic: {
            // Disabling because this is already covered by the All variants
            // stories.
            disableSnapshot: true,
        },
    },
};
