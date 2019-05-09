// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";
import Color from "@khanacademy/wonder-blocks-color";
import {View} from "@khanacademy/wonder-blocks-core";
import {MediaLayout} from "@khanacademy/wonder-blocks-layout";
import {
    HeadingMedium,
    LabelMedium,
} from "@khanacademy/wonder-blocks-typography";

type Props = {|
    /**
     * The main title rendered in larger bold text.
     */
    title: string,

    /**
     * The dialog subtitle.
     */
    subtitle?: string,

    /**
     * Adds a breadcrumb-trail, appearing in the ModalHeader, above the title.
     */
    breadcrumbs?: React.Node,

    /**
     * Whether to display the "light" version of this component instead, for
     * use when the item is used on a dark background.
     */
    light: boolean,
|};

export default class ModalHeader extends React.Component<Props> {
    static defaultProps = {
        light: true,
    };

    render() {
        const {light, title, subtitle, breadcrumbs} = this.props;

        if (subtitle && breadcrumbs) {
            throw new Error(
                "'subtitle' and 'breadcrumbs' can't be used together",
            );
        }

        return (
            <MediaLayout styleSheets={styleSheets}>
                {({styles}) => (
                    <View style={[styles.header, !light && styles.dark]}>
                        {breadcrumbs &&
                            !subtitle && (
                                <View style={styles.breadcrumbs}>
                                    {breadcrumbs}
                                </View>
                            )}
                        <HeadingMedium id="wb-toolbar-title">
                            {title}
                        </HeadingMedium>
                        {subtitle &&
                            !breadcrumbs && (
                                <LabelMedium style={light && styles.subtitle}>
                                    {subtitle}
                                </LabelMedium>
                            )}
                    </View>
                )}
            </MediaLayout>
        );
    }
}

const styleSheets = {
    all: StyleSheet.create({
        header: {
            boxShadow: "0px 1px 0px rgba(33, 36, 44, 0.16)",
            display: "flex",
            flexDirection: "column",
            minHeight: 66,
            padding: "24px 32px",
            position: "relative",
            width: "100%",
        },

        dark: {
            background: Color.darkBlue,
            color: Color.white,
        },

        breadcrumbs: {
            color: "rgba(33, 36, 44, 0.64)",
            marginBottom: 8,
        },

        subtitle: {
            color: "rgba(33, 36, 44, 0.64)",
            marginTop: 8,
        },
    }),

    small: StyleSheet.create({
        header: {
            paddingLeft: 16,
            paddingRight: 16,
        },
    }),
};
