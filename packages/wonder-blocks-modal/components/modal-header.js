// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";
import {typeof Breadcrumbs} from "@khanacademy/wonder-blocks-breadcrumbs";
import Color from "@khanacademy/wonder-blocks-color";
import {View} from "@khanacademy/wonder-blocks-core";
import {MediaLayout} from "@khanacademy/wonder-blocks-layout";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {
    HeadingMedium,
    LabelMedium,
} from "@khanacademy/wonder-blocks-typography";

type Common = {|
    /**
     * The main title rendered in larger bold text.
     */
    title: string,

    /**
     * Whether to display the "light" version of this component instead, for
     * use when the item is used on a dark background.
     */
    light: boolean,

    /**
     * An id to provide a selector for the title element.
     */
    titleId: string,

    /**
     * Test ID used for e2e testing.
     *
     * In this case, this component is internal, so `testId` is composed with
     * the `testId` passed down from the Dialog variant + a suffix to scope it
     * to this component.
     *
     * @example
     * For testId="some-random-id"
     * The result will be: `some-random-id-modal-header`
     */
    testId?: string,
|};

type WithSubtitle = {|
    ...Common,

    /**
     * The dialog subtitle.
     */
    subtitle: string,
|};

type WithBreadcrumbs = {|
    ...Common,

    /**
     * Adds a breadcrumb-trail, appearing in the ModalHeader, above the title.
     */
    breadcrumbs: React.Element<Breadcrumbs>,
|};

type Props = Common | WithSubtitle | WithBreadcrumbs;

/**
 * This is a helper component that is never rendered by itself. It is always
 * pinned to the top of the dialog, is responsive using the same behavior as its
 * parent dialog, and has the following properties:
 * - title
 * - breadcrumb OR subtitle, but not both.
 *
 * **Accessibility notes:**
 *
 * - By default (e.g. using [OnePaneDialog](/#onepanedialog)), `titleId` is
 *   populated automatically by the parent container.
 * - If there is a custom Dialog implementation (e.g. `TwoPaneDialog`), the
 *   ModalHeader doesn’t have to have the `titleId` prop however this is
 *   recommended. It should match the `aria-labelledby` prop of the
 *   [ModalDialog](/#modaldialog) component. If you want to see an example of
 *   how to generate this ID, check [IDProvider](/#idprovider).
 *
 * **Implementation notes:**
 *
 * If you are creating a custom Dialog, make sure to follow these guidelines:
 * - Make sure to include it as part of [ModalPanel](/#modalpanel) by using the
 *   `header` prop.
 * - Add a title (required).
 * - Optionally add a subtitle or breadcrumbs.
 * - We encourage you to add `titleId` (see Accessibility notes).
 * - If the `ModalPanel` has a dark background, make sure to set `light` to
 *   `false`.
 * - If you need to create e2e tests, make sure to pass a `testId` prop and
 *   add a sufix to scope the testId to this component: e.g.
 *   `some-random-id-ModalHeader`. This scope will also be passed to the title
 *   and subtitle elements: e.g. `some-random-id-ModalHeader-title`.
 *
 * Example:
 *
 * ```js
 * <ModalHeader
 *      title="Sidebar using ModalHeader"
 *      subtitle="subtitle"
 *      titleId="uniqueTitleId"
 *      light={false}
 *  />
 * ```
 */
export default class ModalHeader extends React.Component<Props> {
    static defaultProps = {
        light: true,
    };

    render() {
        const {
            breadcrumbs = undefined,
            light,
            subtitle = undefined,
            testId,
            title,
            titleId,
        } = this.props;

        if (subtitle && breadcrumbs) {
            throw new Error(
                "'subtitle' and 'breadcrumbs' can't be used together",
            );
        }

        return (
            <MediaLayout styleSheets={styleSheets}>
                {({styles}) => (
                    <View
                        style={[styles.header, !light && styles.dark]}
                        testId={testId}
                    >
                        {breadcrumbs && (
                            <View style={styles.breadcrumbs}>
                                {breadcrumbs}
                            </View>
                        )}
                        <HeadingMedium
                            id={titleId}
                            testId={testId && `${testId}-title`}
                        >
                            {title}
                        </HeadingMedium>
                        {subtitle && (
                            <LabelMedium
                                style={light && styles.subtitle}
                                testId={testId && `${testId}-subtitle`}
                            >
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
