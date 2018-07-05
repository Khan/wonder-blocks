// @flow
/*
 * A toolbar component that often acts as a container header.
 */
import * as React from "react";
import {StyleSheet} from "aphrodite";

import {View} from "@khanacademy/wonder-blocks-core";
import {
    HeadingSmall,
    LabelLarge,
    LabelSmall,
} from "@khanacademy/wonder-blocks-typography";

type Props = {
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
};

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
                <View style={sharedStyles.verticalAlign}>
                    {this.renderContent(leftContent)}
                </View>
                <View style={[sharedStyles.column]}>
                    <View
                        style={[
                            sharedStyles.middleColumn,
                            sharedStyles.verticalAlign,
                        ]}
                    >
                        <TitleComponent id="wb-toolbar-title">
                            {title}
                        </TitleComponent>
                        {subtitle && (
                            <LabelSmall style={sharedStyles.subtitle}>
                                {subtitle}
                            </LabelSmall>
                        )}
                    </View>
                </View>
                <View style={sharedStyles.rightColumn}>
                    {this.renderContent(rightContent)}
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
        justifyContent: "space-between",
        minHeight: 64,
        padding: 8,
        position: "relative",
        width: "100%",
    },
    small: {
        minHeight: 48,
    },
    dark: {
        backgroundColor: "#0a2a66",
        boxShadow: "0 1px 0 0 rgba(255, 255, 255, 0.64)",
        color: "white",
    },
    verticalAlign: {
        justifyContent: "center",
    },
    column: {
        display: "block",
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%);",
        width: "80%",
    },
    middleColumn: {
        margin: "auto",
        textAlign: "center",
    },
    rightColumn: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    subtitle: {
        color: "rgba(33, 36, 44, 0.64)",
    },
    content: {
        padding: 8,
    },
});
