import * as React from "react";
import {AriaProps, StyleType} from "@khanacademy/wonder-blocks-core";
import {PhosphorIconAsset} from "@khanacademy/wonder-blocks-icon";
import {Link} from "react-router-dom-v5-compat";

export type IconButtonKind = "primary" | "secondary" | "tertiary";

export type IconButtonSize = "xsmall" | "small" | "medium" | "large";

export type IconButtonActionType = "progressive" | "destructive" | "neutral";

export type ActivityIconButtonActionType = "progressive" | "neutral";

export type BaseIconButtonProps = Partial<Omit<AriaProps, "aria-disabled">> & {
    /**
     * A unique identifier for the IconButton.
     */
    id?: string;
    /**
     * A Phosphor icon asset (imported as a static SVG file), or for
     * non-Phosphor icons, pass in a WB Icon component that wraps the custom
     * icon.
     */
    icon: PhosphorIconAsset | React.ReactElement;
    /**
     * The kind of the icon button, either primary, secondary, or tertiary.
     *
     * In default state:
     * - Primary icon buttons are color: props.color
     * - Secondary buttons are offBlack
     * - Tertiary buttons are offBlack64
     *
     * In the hover/focus/press states, all variants have a border.
     */
    kind?: IconButtonKind;
    /**
     * Whether the icon button is disabled.
     */
    disabled?: boolean;
    /**
     * Test ID used for e2e testing.
     */
    testId?: string;
    /**
     * Used for icon buttons within forms.
     */
    type?: "submit" | "button";

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
     * Adds CSS classes to the IconButton.
     */
    className?: string;
    // NOTE(jeresig): Currently React Docgen (used by Styleguidist) doesn't
    // support ... inside of an exact object type. Thus we had to move the
    // following propers into this SharedProps, even though they should be
    // external. Once that's fixed we can split them back apart.

    /**
     * URL to navigate to.
     *
     * Note: Either href or onClick must be defined
     */
    href?: string;
    // TODO(WB-1262): only allow this prop when `href` is also set.
    /**
     * A target destination window for a link to open in.
     */
    target?: "_blank";
    /**
     * Specifies the type of relationship between the current document and the
     * linked document. Should only be used when `href` is specified. This
     * defaults to "noopener noreferrer" when `target="_blank"`, but can be
     * overridden by setting this prop to something else.
     */
    rel?: string;
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
     * Function to call when button is clicked.
     *
     * This callback should be used for things like marking BigBingo
     * conversions. It should NOT be used to redirect to a different URL or to
     * prevent navigation via e.preventDefault(). The event passed to this
     * handler will have its preventDefault() and stopPropagation() methods
     * stubbed out.
     *
     * Note: onClick is optional if href is present, but must be defined if
     * href is not
     */
    onClick?: (e: React.SyntheticEvent) => unknown;

    /**
     * Function to call when the mouse down event is triggered.
     */
    onMouseDown?: (e: React.MouseEvent) => void;
};

export type IconButtonProps = BaseIconButtonProps & {
    /**
     * The action type/category of the icon button.
     *
     * - `progressive` is used for actions that move the user forward in a flow.
     * - `destructive` is used for actions that have a negative impact on the
     *   user.
     * - `neutral` is used for actions that are neither positive nor negative.
     *
     * Defaults to `progressive`.
     */
    actionType?: IconButtonActionType;
    /**
     * Size of the icon button.
     * One of `xsmall` (16 icon, 20 target), `small` (24, 32), `medium` (24, 40),
     * or `large` (24, 48).
     * Defaults to `medium`.
     */
    size?: IconButtonSize;
};

export type IconButtonRef = typeof Link | HTMLButtonElement | HTMLAnchorElement;

export type ActivityIconButtonProps = Omit<BaseIconButtonProps, "style"> & {
    /**
     * Custom styles for the elements in the ActivityIconButton component.
     * - `root`: Styles the root element (button)
     * - `box`: Styles the "chonky" box element
     * - `label`: Styles the text in the button
     */
    styles?: {
        root?: StyleType;
        box?: StyleType;
        label?: StyleType;
    };
};
