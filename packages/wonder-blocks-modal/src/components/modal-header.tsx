import * as React from "react";
import {Breadcrumbs} from "@khanacademy/wonder-blocks-breadcrumbs";
import {View} from "@khanacademy/wonder-blocks-core";
import {Heading, BodyText} from "@khanacademy/wonder-blocks-typography";
import {StyleSheet} from "aphrodite";
import {semanticColor} from "@khanacademy/wonder-blocks-tokens";
import theme from "../theme";

type Common = {
    /**
     * The main title rendered in larger bold text.
     */
    title: string;
    /**
     * An id to provide a selector for the title element.
     */
    titleId: string;
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
    testId?: string;
};

type WithSubtitle = Common & {
    /**
     * The dialog subtitle.
     */
    subtitle: string;
};

type WithBreadcrumbs = Common & {
    /**
     * Adds a breadcrumb-trail, appearing in the ModalHeader, above the title.
     */
    breadcrumbs: React.ReactElement<React.ComponentProps<typeof Breadcrumbs>>;
};

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
 *   how to generate this ID look at the `React.useId` hook documentation, o
 *   check [Id](/#id).
 *
 * **Implementation notes:**
 *
 * If you are creating a custom Dialog, make sure to follow these guidelines:
 * - Make sure to include it as part of [ModalPanel](/#modalpanel) by using the
 *   `header` prop.
 * - Add a title (required).
 * - Optionally add a subtitle or breadcrumbs.
 * - We encourage you to add `titleId` (see Accessibility notes).
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
 *  />
 * ```
 */
export default function ModalHeader(props: Props) {
    const {
        // @ts-expect-error [FEI-5019] - TS2339 - Property 'breadcrumbs' does not exist on type 'Readonly<Props> & Readonly<{ children?: ReactNode; }>'.
        breadcrumbs = undefined,
        // @ts-expect-error [FEI-5019] - TS2339 - Property 'subtitle' does not exist on type 'Readonly<Props> & Readonly<{ children?: ReactNode; }>'.
        subtitle = undefined,
        testId,
        title,
        titleId,
    } = props;

    if (subtitle && breadcrumbs) {
        throw new Error("'subtitle' and 'breadcrumbs' can't be used together");
    }

    return (
        <View style={[styles.header]} testId={testId}>
            {breadcrumbs && (
                <View style={styles.breadcrumbs}>{breadcrumbs}</View>
            )}
            <Heading
                size="large"
                tag="h2"
                style={styles.title}
                id={titleId}
                testId={testId && `${testId}-title`}
            >
                {title}
            </Heading>
            {subtitle && (
                <BodyText
                    size="small"
                    style={styles.subtitle}
                    testId={testId && `${testId}-subtitle`}
                >
                    {subtitle}
                </BodyText>
            )}
        </View>
    );
}

/**
 * Media query for small screens.
 * TODO(WB-1655): Change this to use the theme instead (inside themedStylesFn).
 * e.g. `[theme.breakpoints.small]: {...}`
 */
const small = "@media (max-width: 767px)";

const styles = StyleSheet.create({
    header: {
        boxShadow: `0px 1px 0px ${semanticColor.core.border.neutral.subtle}`,
        display: "flex",
        flexDirection: "column",
        minHeight: 66,
        paddingBlock: theme.header.layout.padding.block,
        paddingInline: theme.header.layout.padding.inline.default,
        position: "relative",
        width: "100%",

        [small as any]: {
            paddingInline: theme.header.layout.padding.inline.small,
        },
    },

    breadcrumbs: {
        color: semanticColor.core.foreground.neutral.default,
        marginBlockEnd: theme.header.layout.gap.default,
    },

    title: {
        // Prevent title from overlapping the close button
        paddingInlineEnd: theme.header.layout.gap.title.default,
        [small as any]: {
            paddingInlineEnd: theme.header.layout.gap.title.small,
        },
    },

    subtitle: {
        color: semanticColor.core.foreground.neutral.default,
        marginBlockStart: theme.header.layout.gap.default,
    },
});
