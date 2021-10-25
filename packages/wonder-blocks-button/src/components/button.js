// @flow
import * as React from "react";
import * as PropTypes from "prop-types";

import {getClickableBehavior} from "@khanacademy/wonder-blocks-clickable";
import type {AriaProps, StyleType} from "@khanacademy/wonder-blocks-core";
import type {IconAsset} from "@khanacademy/wonder-blocks-icon";
import ButtonCore from "./button-core.js";

export type SharedProps = {|
    /**
     * aria-label should be used when `spinner={true}` to let people using screen
     * readers that the action taken by clicking the button will take some
     * time to complete.
     */
    ...$Rest<AriaProps, {|"aria-disabled": "true" | "false" | void|}>,

    /**
     * Text to appear on the button.
     */
    children: string,

    /**
     * An icon, displayed to the left of the title.
     */
    icon?: IconAsset,

    /**
     * If true, replaces the contents with a spinner.
     *
     * Note: setting this prop to `true` will disable the button.
     *
     * TODO(kevinb): support spinner + light once we have designs
     */
    spinner: boolean,

    /**
     * The color of the button, either blue or red.
     */
    color: "default" | "destructive",

    /**
     * The kind of the button, either primary, secondary, or tertiary.
     *
     * In default state:
     *
     * - Primary buttons have background colors
     * - Secondary buttons have a border and no background color
     * - Tertiary buttons have no background or border
     */
    kind: "primary" | "secondary" | "tertiary",

    /**
     * Whether the button is on a dark/colored background.
     *
     * Sets primary button background color to white, and secondary and
     * tertiary button title to color.
     */
    light: boolean,

    /**
     * The size of the button. "medium" = height: 40; "small" = height: 32;
     * "xlarge" = height: 60;
     */
    size: "medium" | "small" | "xlarge",

    /**
     * Whether the button is disabled.
     */
    disabled: boolean,

    /**
     * An optional id attribute.
     */
    id?: string,

    /**
     * Test ID used for e2e testing.
     */
    testId?: string,

    /**
     * Specifies the type of relationship between the current document and the
     * linked document. Should only be used when `href` is specified. This
     * defaults to "noopener noreferrer" when `target="_blank"`, but can be
     * overridden by setting this prop to something else.
     */
    rel?: string,

    /**
     * A target destination window for a link to open in. Should only be used
     * when `href` is specified.
     */
    target?: "_blank",

    /**
     * Set the tabindex attribute on the rendered element.
     */
    tabIndex?: number,

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
    skipClientNav?: boolean,

    /**
     * Optional custom styles.
     */
    style?: StyleType,
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
     * Adds CSS classes to the Button.
     */
    className?: string,

    // NOTE(jeresig): Currently React Docgen (used by Styleguidist) doesn't
    // support ... inside of an exact object type. Thus we had to move the
    // following propers into this SharedProps, even though they should be
    // external. Once that's fixed we can split them back apart.

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
    onClick?: (e: SyntheticEvent<>) => mixed,
|};

// We structure the props in this way to ensure that whenever we're using
// beforeNav or safeWithNav that we're also using href.  We also need to specify
// a number of different variations to avoid ambigious situations where flow
// finds more than one valid object type in the disjoint union.
type Props =
    | {|
          ...SharedProps,

          /**
           * URL to navigate to.
           */
          href?: string,
      |}
    | {|
          ...SharedProps,

          /**
           * Used for buttons within <form>s.
           */
          type: "submit",
      |}
    | {|
          ...SharedProps,

          href: string,

          /**
           * Run async code before navigating. If the promise returned rejects then
           * navigation will not occur.
           *
           * If both safeWithNav and beforeNav are provided, beforeNav will be run
           * first and safeWithNav will only be run if beforeNav does not reject.
           */
          beforeNav: () => Promise<mixed>,
      |}
    | {|
          ...SharedProps,

          href: string,

          /**
           * Run async code in the background while client-side navigating. If the
           * browser does a full page load navigation, the callback promise must be
           * settled before the navigation will occur. Errors are ignored so that
           * navigation is guaranteed to succeed.
           */
          safeWithNav: () => Promise<mixed>,
      |}
    | {|
          ...SharedProps,

          href: string,

          /**
           * Run async code before navigating. If the promise returned rejects then
           * navigation will not occur.
           *
           * If both safeWithNav and beforeNav are provided, beforeNav will be run
           * first and safeWithNav will only be run if beforeNav does not reject.
           */
          beforeNav: () => Promise<mixed>,

          /**
           * Run async code in the background while client-side navigating. If the
           * browser does a full page load navigation, the callback promise must be
           * settled before the navigation will occur. Errors are ignored so that
           * navigation is guaranteed to succeed.
           */
          safeWithNav: () => Promise<mixed>,
      |};

type ContextTypes = {|
    router: $FlowFixMe,
|};

type DefaultProps = {|
    color: $PropertyType<Props, "color">,
    kind: $PropertyType<Props, "kind">,
    light: $PropertyType<Props, "light">,
    size: $PropertyType<Props, "size">,
    disabled: $PropertyType<Props, "disabled">,
    spinner: $PropertyType<Props, "spinner">,
|};

/**
 * Reusable button component.
 *
 * Consisting of a [`ClickableBehavior`](#clickablebehavior) surrounding a
 * `ButtonCore`. `ClickableBehavior` handles interactions and state changes.
 * `ButtonCore` is a stateless component which displays the different states
 * the `Button` can take.
 *
 * ### Usage
 *
 * ```jsx
 * import Button from "@khanacademy/wonder-blocks-button";
 *
 * <Button
 *     onClick={(e) => console.log("Hello, world!")}
 * >
 *     Hello, world!
 * </Button>
 * ```
 */
export default class Button extends React.Component<Props> {
    static contextTypes: ContextTypes = {router: PropTypes.any};

    static defaultProps: DefaultProps = {
        color: "default",
        kind: "primary",
        light: false,
        size: "medium",
        disabled: false,
        spinner: false,
    };

    render(): React.Node {
        const {
            href = undefined,
            type = undefined,
            children,
            skipClientNav,
            spinner,
            disabled,
            onClick,
            beforeNav = undefined,
            safeWithNav = undefined,
            tabIndex,
            target,
            rel,
            ...sharedButtonCoreProps
        } = this.props;

        const ClickableBehavior = getClickableBehavior(
            href,
            skipClientNav,
            this.context.router,
        );

        const renderProp = (
            state,
            {tabIndex: clickableTabIndex, ...restChildProps},
        ) => {
            return (
                <ButtonCore
                    {...sharedButtonCoreProps}
                    {...state}
                    {...restChildProps}
                    disabled={disabled}
                    spinner={spinner || state.waiting}
                    skipClientNav={skipClientNav}
                    href={href}
                    target={target}
                    type={type}
                    // If tabIndex is provide to the component we allow
                    // it to override the tabIndex provide to use by
                    // ClickableBehavior.
                    tabIndex={tabIndex || clickableTabIndex}
                >
                    {children}
                </ButtonCore>
            );
        };

        if (beforeNav) {
            return (
                <ClickableBehavior
                    disabled={spinner || disabled}
                    href={href}
                    role="button"
                    type={type}
                    onClick={onClick}
                    beforeNav={beforeNav}
                    safeWithNav={safeWithNav}
                    rel={rel}
                >
                    {renderProp}
                </ClickableBehavior>
            );
        } else {
            return (
                <ClickableBehavior
                    disabled={spinner || disabled}
                    href={href}
                    role="button"
                    type={type}
                    onClick={onClick}
                    safeWithNav={safeWithNav}
                    target={target}
                    rel={rel}
                >
                    {renderProp}
                </ClickableBehavior>
            );
        }
    }
}
