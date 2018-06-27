// @flow
import * as React from "react";
import {css, StyleSheet} from "aphrodite";

import {View} from "@khanacademy/wonder-blocks-core";

// TODO(scottgrant): Make sure the toolbars are responsive.
// import type {MediaSize} from "@khanacademy/wonder-blocks-core";

const dismissIcon =
    "M12.003 10.588L7.707 6.293a1 1 0 0 0-1.414 1.414l4.295 4.296-4.295 4.295a1 1 0 0 0 1.414 1.414l4.296-4.295 4.295 4.295a1 1 0 0 0 1.414-1.414l-4.295-4.295 4.295-4.296a1 1 0 1 0-1.414-1.414l-4.295 4.295z";

type Props = {
    /**
     * A list of nodes to render on the left side of the toolbar. In most
     * cases, this will be empty.
     */
    leftContent?: Array<React.Node>,

    /**
     * The function to call when dismissing the toolbar. Only relevant if
     * showClose is true.
     */
    onClose?: () => void,

    /**
     * A list of nodes to render on the right side of the toolbar. This will
     * typically include buttons, links, span elements with text, or nothing
     * at all.
     */
    rightContent?: Array<React.Node>,

    /**
     * True, if we should show the dismiss icon on the left side o the toolbar.
     */
    showClose: boolean,

    /**
     * How much vertical space to use for the toolbar. If this prop is not
     * provided, the default is "medium".
     */
    size?: "small" | "medium",

    /**
     * Additional styling for the toolbar. If a color value is provided and
     * the showClose prop is set to true, the close icon will use this color.
     */
    style?: any,

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
        leftContent: [],
        onClose: () => {},
        rightContent: [],
        showClose: false,
    };

    renderContent(content: React.Node, key: string) {
        return (
            <View
                style={[sharedStyles.content, sharedStyles.verticalAlign]}
                key={key}
            >
                {content}
            </View>
        );
    }

    render() {
        const {
            leftContent,
            onClose,
            rightContent,
            showClose,
            size,
            style,
            subtitle,
            title,
        } = this.props;

        // TODO(scottgrant): Replace the SVG with an Icon component once
        // that's done
        const fillColor = (style && style.color) || "rgba(33, 36, 44, 0.5)";
        const closeButton = showClose && (
            <View onClick={onClose}>
                <svg role="img" width="24px" height="24px">
                    <path fill={fillColor} d={dismissIcon} />
                </svg>
            </View>
        );

        // TODO(scottgrant): Handle aria-labelledby appropriately.
        return (
            <View
                style={[
                    sharedStyles.container,
                    style,
                    size === "small" && sharedStyles.small,
                ]}
            >
                <View
                    style={[
                        sharedStyles.leftColumn,
                        sharedStyles.verticalAlign,
                    ]}
                >
                    {closeButton}
                    {leftContent &&
                        leftContent.map((content, i) =>
                            this.renderContent(content, i.toString()),
                        )}
                </View>
                <View
                    style={[
                        sharedStyles.middleColumn,
                        sharedStyles.verticalAlign,
                    ]}
                >
                    <span
                        id="wb-toolbar-title"
                        className={css(
                            sharedStyles.title,
                            !subtitle && sharedStyles.titleNoSubtitle,
                        )}
                    >
                        {title}
                    </span>
                    {subtitle && (
                        <span className={css(sharedStyles.subtitle)}>
                            {subtitle}
                        </span>
                    )}
                </View>
                <View style={sharedStyles.rightColumn}>
                    {rightContent &&
                        rightContent.map((content, i) =>
                            this.renderContent(content, i.toString()),
                        )}
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
        width: "100%",
    },
    small: {
        minHeight: 48,
    },
    verticalAlign: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
    leftColumn: {},
    middleColumn: {
        maxWidth: "75%",
        textAlign: "center",
    },
    rightColumn: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
    },
    titleNoSubtitle: {
        fontSize: 20,
    },
    subtitle: {
        color: "rgba(33, 36, 44, 0.64)",
        fontSize: 14,
        fontWeight: "normal",
        lineHeight: 1.29,
    },
    content: {
        padding: 8,
    },
});
