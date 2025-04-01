import * as React from "react";
import {Meta, StoryObj} from "@storybook/react";
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
 * A global focus style that can be applied to interactive elements.
 *
 * This style injects a combination of `outline` and `box-shadow` to indicate
 * the element is focused. This is used for accessibility purposes as it allows
 * the element to present a focus state on Windows High Contrast mode.
 *
 * In the example below, the focus style is applied to an `IconButton` component
 * and to a `button` element.
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
                />
                <IconButton
                    kind="secondary"
                    icon={info}
                    style={actionStyles.inverse}
                />
                <IconButton
                    kind="tertiary"
                    icon={info}
                    style={actionStyles.inverse}
                />
                <Button kind="primary" style={actionStyles.inverse}>
                    Primary button
                </Button>
                <Button kind="secondary" style={actionStyles.inverse}>
                    secondary button
                </Button>
                <Button kind="tertiary" style={actionStyles.inverse}>
                    tertiary button
                </Button>
                <Link href="#ss" style={actionStyles.inverse}>
                    Arr link
                </Link>

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
    parameters: {
        backgrounds: {
            default: "darkBlue",
        },
        chromatic: {
            // Disabling because this is already covered by the All variants
            // stories.
            disableSnapshot: true,
        },
    },
};
