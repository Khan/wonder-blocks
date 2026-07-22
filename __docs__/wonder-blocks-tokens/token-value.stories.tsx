import * as React from "react";
import {Meta, StoryObj} from "@storybook/react-vite";
import {StyleSheet} from "aphrodite";
import {expect, within} from "storybook/test";
import {
    border,
    boxShadow,
    semanticColor,
    sizing,
    tokenValue,
} from "@khanacademy/wonder-blocks-tokens";
import {View} from "@khanacademy/wonder-blocks-core";
import {ThemeSwitcher} from "@khanacademy/wonder-blocks-theming";
import {BodyText, Heading} from "@khanacademy/wonder-blocks-typography";
import {Badge} from "@khanacademy/wonder-blocks-badge";

export default {
    title: "Packages / Tokens / Utilities / tokenValue",
    tags: ["!dev"],
    args: {},
    parameters: {
        chromatic: {
            // Disables chromatic testing for these stories. We use interaction
            // tests for this instead.
            disableSnapshot: true,
        },
    },
} satisfies Meta;

type Story = StoryObj<{token: string}>;

const styles = StyleSheet.create({
    colorItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: sizing.size_080,
    },
});

const ColorItem = ({
    color,
    label,
    value,
    testId,
}: {
    color: string;
    label: string;
    value: string;
    testId?: string;
}) => {
    return (
        <View style={styles.colorItem}>
            {label}:
            <Badge
                testId={testId}
                icon={
                    <View
                        style={{
                            display: "inline-flex",
                            width: sizing.size_160,
                            height: sizing.size_160,
                            borderRadius: border.radius.radius_full,
                            backgroundColor: color,
                            boxShadow: boxShadow.low,
                        }}
                    />
                }
                label={value}
            />
        </View>
    );
};

export const TokenValueDefault: Story = {
    args: {
        token: semanticColor.core.foreground.instructive.default,
    },
    render: function Render() {
        const [defaultValue, setDefaultValue] = React.useState("");
        const [tbValue, setTbValue] = React.useState("");
        const defaultRef = React.useRef(null);
        const tbRef = React.useRef(null);

        React.useEffect(() => {
            if (defaultRef.current) {
                setDefaultValue(
                    tokenValue(
                        semanticColor.core.foreground.instructive.default,
                        defaultRef.current,
                    ),
                );
            }
            if (tbRef.current) {
                setTbValue(
                    tokenValue(
                        semanticColor.core.foreground.instructive.default,
                        tbRef.current,
                    ),
                );
            }
        }, []);

        return (
            <View style={{flexDirection: "row", gap: sizing.size_240}}>
                <ThemeSwitcher theme="default">
                    <View ref={defaultRef} style={{gap: sizing.size_080}}>
                        <Heading>default theme</Heading>
                        <ColorItem
                            testId="default-raw-value"
                            label="Raw value"
                            value={defaultValue}
                            color={defaultValue}
                        />
                    </View>
                </ThemeSwitcher>
                <ThemeSwitcher theme="thunderblocks">
                    <View ref={tbRef} style={{gap: sizing.size_080}}>
                        <Heading>thunderblocks theme</Heading>
                        <ColorItem
                            testId="tb-raw-value"
                            label="Raw value"
                            value={tbValue}
                            color={tbValue}
                        />
                    </View>
                </ThemeSwitcher>
            </View>
        );
    },
    play: async ({canvasElement}) => {
        const canvas = within(canvasElement);
        await expect(canvas.getByTestId("default-raw-value")).toHaveTextContent(
            "#1865f2",
        );
        await expect(canvas.getByTestId("tb-raw-value")).toHaveTextContent(
            "#5753FA",
        );
    },
};

// NOTE: Raw value is extracted at the time of rendering, so if the theme
// changes after that, the raw value won't update.
const defaultRawValue = tokenValue(
    semanticColor.core.foreground.instructive.default,
);

export const TokenValueElementOverride: Story = {
    args: {
        token: semanticColor.core.foreground.instructive.default,
    },
    render: function Render() {
        const themeRef = React.useRef<HTMLElement | null>(null);
        const [tokenValueResult, setTokenValueResult] = React.useState("");

        React.useEffect(() => {
            if (themeRef.current) {
                setTokenValueResult(
                    tokenValue(
                        semanticColor.core.foreground.instructive.default,
                        themeRef.current,
                    ),
                );
            }
        }, []);

        return (
            <View>
                <ThemeSwitcher theme="thunderblocks">
                    <View ref={themeRef} style={{gap: sizing.size_080}}>
                        <Heading>
                            semanticColor.core.foreground.instructive.default
                            token
                        </Heading>

                        <ColorItem
                            label="Default raw value"
                            value={defaultRawValue}
                            color={defaultRawValue}
                            testId="default-raw-value"
                        />
                        <ColorItem
                            label="Scoped raw value"
                            value={tokenValueResult}
                            color={tokenValueResult}
                            testId="scoped-raw-value"
                        />
                    </View>
                </ThemeSwitcher>
            </View>
        );
    },
    play: async ({canvasElement}) => {
        const canvas = within(canvasElement);
        await expect(canvas.getByTestId("default-raw-value")).toHaveTextContent(
            "#1865f2",
        );
        await expect(canvas.getByTestId("scoped-raw-value")).toHaveTextContent(
            "#5753FA",
        );
    },
};

export const NonSemanticTokenValue = () => {
    return (
        <View>
            <Heading>sizing.size_080 token</Heading>
            <BodyText>
                Raw value: <code>{tokenValue(sizing.size_080) || "…"}</code>
            </BodyText>
        </View>
    );
};
