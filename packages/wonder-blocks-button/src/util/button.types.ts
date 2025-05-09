import * as React from "react";
import type {AriaProps, StyleType} from "@khanacademy/wonder-blocks-core";
import type {PhosphorIconAsset} from "@khanacademy/wonder-blocks-icon";

// Variants
export type ButtonActionType = "progressive" | "destructive" | "neutral";
export type ButtonKind = "primary" | "secondary" | "tertiary";
export type ButtonSize = "small" | "medium" | "large";

export type ButtonProps =
    /**
     * aria-label should be used when `spinner={true}` to let people using screen
     * readers that the action taken by clicking the button will take some
     * time to complete.
     */
    Partial<Omit<AriaProps, "aria-disabled">> & {
        /**
         * Text to appear on the button.
         */
        children: string;
        /**
         * A Phosphor icon asset (imported as a static SVG file) that
         * will appear at the start of the button (left for LTR, right for RTL).
         */
        startIcon?: PhosphorIconAsset;
        /**
         * A Phosphor icon asset (imported as a static SVG file) that
         * will appear at the end of the button (right for LTR, left for RTL).
         */
        endIcon?: PhosphorIconAsset;
        /**
         * If true, replaces the contents with a spinner.
         *
         * Note: setting this prop to `true` will disable the button.
         */
        spinner?: boolean;
        /**
         * The action type/category of the button.
         *
         * - `progressive` is used for actions that move the user forward in a
         *   flow.
         * - `destructive` is used for actions that have a negative impact on
         *   the user.
         *
         * Defaults to `progressive`.
         */
        actionType?: ButtonActionType;

        /**
         * The kind of the button, either primary, secondary, or tertiary.
         *
         * In default state:
         *
         * - Primary buttons have background colors
         * - Secondary buttons have a border and no background color
         * - Tertiary buttons have no background or border
         */
        kind?: ButtonKind;
        /**
         * The size of the button. "medium" = height: 40; "small" = height: 32;
         * "large" = height: 56;
         */
        size?: ButtonSize;
        /**
         * Whether the button is disabled.
         */
        disabled?: boolean;
        /**
         * An optional id attribute.
         */
        id?: string;
        /**
         * Test ID used for e2e testing.
         */
        testId?: string;
        /**
         * Specifies the type of relationship between the current document and the
         * linked document. Should only be used when `href` is specified. This
         * defaults to "noopener noreferrer" when `target="_blank"`, but can be
         * overridden by setting this prop to something else.
         */
        rel?: string;
        /**
         * A target destination window for a link to open in. Should only be used
         * when `href` is specified.
         *
         * TODO(WB-1262): only allow this prop when `href` is also set.t
         */
        target?: "_blank";
        /**
         * Set the tabindex attribute on the rendered element.
         */
        tabIndex?: number;
        /**
         * Whether to avoid using client-side navigation.
         *
         * If the URL passed to href is local to the client-side, e.g.
         * /math/algebra/eval-exprs, then it tries to use react-router-dom's Link
         * component which handles the client-side navigation. You can set
         * `skipClientNav` to true avoid using client-side nav entirely.
         *
         * NOTE: All URLs containing a protocol are considered external, e.g.
         * https://khanacademy.org/math/algebra/eval-exprs will trigger a full
         * page reload.
         */
        skipClientNav?: boolean;
        /**
         * Optional custom styles for the inner label.
         */
        labelStyle?: StyleType;
        /**
         * Optional custom styles.
         */
        style?: StyleType;
        // TODO(yejia): use this if ADR #47 has been implemented
        /*
    style?: Style<Exact<{
        width?: number | string
        position: Position,
        ...MarginStyles,
        ...FlexItemStyles,
    }>>,
    */
        /**
         * URL to navigate to.
         */
        href?: string;

        /**
         * Used for buttons within <form>s.
         */
        type?: "submit";

        /**
         * Adds CSS classes to the Button.
         */
        className?: string;
        // NOTE(jeresig): Currently React Docgen (used by Styleguidist) doesn't
        // support ... inside of an exact object type. Thus we had to move the
        // following propers into this SharedProps, even though they should be
        // external. Once that's fixed we can split them back apart.

        /**
         * Function to call when button is clicked.
         *
         * This callback should be used for running synchronous code, like
         * dispatching a Redux action. For asynchronous code see the
         * beforeNav and safeWithNav props. It should NOT be used to redirect
         * to a different URL.
         *
         * Note: onClick is optional if href is present, but must be defined if
         * href is not
         */
        onClick?: (e: React.SyntheticEvent) => unknown;

        /**
         * Run async code before navigating. If the promise returned rejects then
         * navigation will not occur.
         *
         * If both safeWithNav and beforeNav are provided, beforeNav will be run
         * first and safeWithNav will only be run if beforeNav does not reject.
         *
         * WARNING: Do not use with `type="submit"`.
         */
        beforeNav?: () => Promise<unknown>;

        /**
         * Run async code in the background while client-side navigating. If the
         * browser does a full page load navigation, the callback promise must be
         * settled before the navigation will occur. Errors are ignored so that
         * navigation is guaranteed to succeed.
         *
         * WARNING: Do not use with `type="submit"`.
         */
        safeWithNav?: () => Promise<unknown>;
    };
