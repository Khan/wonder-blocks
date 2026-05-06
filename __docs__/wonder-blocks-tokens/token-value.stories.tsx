import * as React from "react";
import {Meta} from "@storybook/react-vite";
import {StyleSheet} from "aphrodite";
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
} as Meta;

export const TokenValueDefault = () => {
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
                        label="Raw value"
                        value={tbValue}
                        color={tbValue}
                    />
                </View>
            </ThemeSwitcher>
        </View>
    );
};

const ColorItem = ({
    color,
    label,
    value,
}: {
    color: string;
    label: string;
    value: string;
}) => {
    return (
        <View style={styles.colorItem}>
            {label}:
            <Badge
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

export const TokenValueElementOverride = () => {
    const themeRef = React.useRef<HTMLElement | null>(null);
    const [tokenValueResult, setTokenValueResult] = React.useState("");
    const defaultRawValue = tokenValue(
        semanticColor.core.foreground.instructive.default,
    );

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
                        semanticColor.core.foreground.instructive.default token
                    </Heading>

                    <ColorItem
                        label="Default raw value"
                        value={defaultRawValue}
                        color={defaultRawValue}
                    />
                    <ColorItem
                        label="Scoped raw value"
                        value={tokenValueResult}
                        color={tokenValueResult}
                    />
                </View>
            </ThemeSwitcher>
        </View>
    );
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

const styles = StyleSheet.create({
    colorItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: sizing.size_080,
    },
});
