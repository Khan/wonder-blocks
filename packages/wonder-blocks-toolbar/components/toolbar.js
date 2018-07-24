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

type Props = {|
    /**
     * Whether we should use the default light color scheme or switch to a
     * darker blue scheme.
     */
    color?: "dark" | "light",

    /**
     * A list of nodes to render on the left side of the toolbar. This will
     * often be empty, but may include a close button for modals.
     */
    leftContent?: React.Node,

    /**
     * A list of nodes to render on the right side of the toolbar. This will
     * typically include buttons, links, span elements with text, or nothing
     * at all.
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
|};

export default class Toolbar extends React.Component<Props> {
    static defaultProps = {
        color: "light",
        leftContent: [],
        rightContent: [],
        size: "medium",
    };

    renderContent(content: React.Node) {
        const contentArray = Array.isArray(content) ? content : [content];

        return contentArray.map((content, i) => (
            <View
                style={[sharedStyles.content, sharedStyles.verticalAlign]}
                key={i.toString()}
            >
                {content}
            </View>
        ));
    }

    render() {
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
                    <View style={sharedStyles.verticalAlign}>
                        {this.renderContent(leftContent)}
                    </View>
                </View>
                {title && (
                    <View
                        style={[sharedStyles.column, sharedStyles.wideColumn]}
                    >
                        <View
                            style={[
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
                    <View style={sharedStyles.rightColumn}>
                        {this.renderContent(rightContent)}
                    </View>
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
        minHeight: 64,
        padding: 4,
        position: "relative",
        width: "100%",
    },
    small: {
        minHeight: 48,
        padding: 0,
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
    rightColumn: {
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    center: {
        textAlign: "center",
    },
    subtitle: {
        color: "rgba(33, 36, 44, 0.64)",
    },
    content: {
        padding: 8,
    },
});
