import * as React from "react";
import {Meta, StoryObj} from "@storybook/react-vite";
import info from "@phosphor-icons/core/regular/info.svg";
import ComponentInfo from "../components/component-info";
import packageConfig from "../../packages/wonder-blocks-styles/package.json";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import {actionStyles} from "@khanacademy/wonder-blocks-styles";
import {addStyle, View} from "@khanacademy/wonder-blocks-core";
import {semanticColor, spacing} from "@khanacademy/wonder-blocks-tokens";
import Clickable from "@khanacademy/wonder-blocks-clickable";
import Button from "@khanacademy/wonder-blocks-button";
import Link from "@khanacademy/wonder-blocks-link";

/**
 * Styles that can be used to create reusable states for interactive elements.
 *
 * NOTE: We recommend using existing Wonder Blocks interactive components (e.g.
 * `Button`, `IconButton`, `Link` etc.). These styles are meant to be used
 * as a last resort when our components do not meet your needs.
 *
 * ### Usage
 *
 * ```tsx
 * import {actionStyles} from "@khanacademy/wonder-blocks-styles";
 *
 * <StyledButton style={actionStyles.inverse}>
 *      Custom button
 * </StyledButton>
 * ```
 */
export default {
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

const StyledButton = addStyle("button");

/**
 * A style that can be applied to interactive elements on inverse backgrounds.
 *
 * This is used for special cases where the element is on a dark background.
 *
 * In the example below, the `inverse` style is applied to WB components along
 * with a `button` element.
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

                <StyledButton
                    style={[
                        {
                            border: `1px solid ${semanticColor.status.success.background}`,
                            backgroundColor:
                                semanticColor.status.success.foreground,
                            color: semanticColor.status.success.background,
                        },
                        actionStyles.inverse,
                    ]}
                >
                    Custom button
                </StyledButton>

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
                    gap: spacing.medium_16,
                    padding: spacing.medium_16,
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
