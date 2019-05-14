// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";
import {Breadcrumbs} from "@khanacademy/wonder-blocks-breadcrumbs";
import Color from "@khanacademy/wonder-blocks-color";
import {View} from "@khanacademy/wonder-blocks-core";
import {MediaLayout} from "@khanacademy/wonder-blocks-layout";
import Spacing from "@khanacademy/wonder-blocks-spacing";
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
    breadcrumbs?: React.Element<typeof Breadcrumbs>,

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
            boxShadow: `0px 1px 0px ${Color.offBlack16}`,
            display: "flex",
            flexDirection: "column",
            minHeight: 66,
            padding: `${Spacing.large}px ${Spacing.xLarge}px`,
            position: "relative",
            width: "100%",
        },

        dark: {
            background: Color.darkBlue,
            color: Color.white,
        },

        breadcrumbs: {
            color: Color.offBlack64,
            marginBottom: Spacing.xSmall,
        },

        subtitle: {
            color: Color.offBlack64,
            marginTop: Spacing.xSmall,
        },
    }),

    small: StyleSheet.create({
        header: {
            paddingLeft: Spacing.medium,
            paddingRight: Spacing.medium,
        },
    }),
};
