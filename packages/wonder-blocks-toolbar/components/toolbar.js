// @flow
/*
 * A toolbar component that often acts as a container header.
 */
import * as React from "react";
import {StyleSheet} from "aphrodite";

import Color from "@khanacademy/wonder-blocks-color";
import {View} from "@khanacademy/wonder-blocks-core";
import {
    HeadingSmall,
    LabelLarge,
    LabelSmall,
} from "@khanacademy/wonder-blocks-typography";
import type {AriaProps} from "@khanacademy/wonder-blocks-core";

type Props = {|
    ...AriaProps,

    /**
     * Whether we should use the default light color scheme or switch to a
     * darker blue scheme.
     */
    color?: "dark" | "light",

    /**
     * An optional node to render on the left side of the toolbar. This will
     * often be empty, but may include a close button for modals.
     */
    leftContent?: React.Node,

    /**
     * An optional node to render on the right side of the toolbar. This will
     * typically include buttons, links, or span elements with text.
     */
    rightContent?: React.Node,

    /**
     * How much vertical space to use for the toolbar. If this prop is not
     * provided, the default is "medium".
     */
    size?: "small" | "medium",

    /**
     * An optional subtitle rendered in a lighter colour and smaller font size
     * below the title. Only visible on larger media sizes.
     */
    subtitle?: string,

    /**
     * The main title rendered in larger bold text.
     */
    title?: string,

    /**
     * Test ID used for e2e testing.
     */
    testId?: string,
|};

type DefaultProps = {|
    color: $PropertyType<Props, "color">,
    leftContent: $PropertyType<Props, "leftContent">,
    rightContent: $PropertyType<Props, "rightContent">,
    size: $PropertyType<Props, "size">,
|};

export default class Toolbar extends React.Component<Props> {
    static defaultProps: DefaultProps = {
        color: "light",
        leftContent: null,
        rightContent: null,
        size: "medium",
    };

    render(): React.Node {
        const {
            color,
            leftContent,
            rightContent,
            size,
            subtitle,
            title,
        } = this.props;

        const TitleComponent = subtitle ? LabelLarge : HeadingSmall;

        return (
            <View
                style={[
                    sharedStyles.container,
                    color === "dark" && sharedStyles.dark,
                    size === "small" && sharedStyles.small,
                ]}
            >
                <View style={sharedStyles.column}>
                    <View style={sharedStyles.leftColumn}>{leftContent}</View>
                </View>
                {title && (
                    <View
                        style={[sharedStyles.column, sharedStyles.wideColumn]}
                    >
                        <View
                            style={[
                                sharedStyles.titles,
                                sharedStyles.verticalAlign,
                                sharedStyles.center,
                            ]}
                        >
                            <TitleComponent id="wb-toolbar-title">
                                {title}
                            </TitleComponent>
                            {subtitle && (
                                <LabelSmall
                                    style={
                                        color === "light" &&
                                        sharedStyles.subtitle
                                    }
                                >
                                    {subtitle}
                                </LabelSmall>
                            )}
                        </View>
                    </View>
                )}
                <View style={sharedStyles.column}>
                    <View style={sharedStyles.rightColumn}>{rightContent}</View>
                </View>
            </View>
        );
    }
}

const sharedStyles = StyleSheet.create({
    container: {
        border: "1px solid rgba(33, 36, 44, 0.16)",
        display: "flex",
        flexDirection: "row",
        minHeight: 66,
        paddingLeft: 16,
        paddingRight: 16,
        position: "relative",
        width: "100%",
    },
    small: {
        minHeight: 50,
    },
    dark: {
        backgroundColor: Color.darkBlue,
        boxShadow: "0 1px 0 0 rgba(255, 255, 255, 0.64)",
        color: "white",
    },
    verticalAlign: {
        justifyContent: "center",
    },
    column: {
        flex: 1,
        justifyContent: "center",
    },
    wideColumn: {
        flexBasis: "50%",
    },
    leftColumn: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    rightColumn: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    center: {
        textAlign: "center",
    },
    subtitle: {
        color: "rgba(33, 36, 44, 0.64)",
    },
    titles: {
        padding: 12,
    },
});
