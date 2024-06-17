import {StyleSheet} from "aphrodite";
import * as React from "react";
import {css, cx} from "@/styled-system/css";
// import type {SystemStyleObject} from "@/styled-system/types";

import type {StyleType, TextViewSharedProps} from "../util/types";

import {processStyleList} from "../util/util";

// import addStyle from "../util/add-style";

function isAphroditeStyle(style: StyleType): style is StyleType {
    return (
        (typeof style === "object" &&
            Object.prototype.hasOwnProperty.call(style, "_definition")) ||
        (Array.isArray(style) &&
            style.length > 0 &&
            style.some(
                (s) =>
                    s &&
                    typeof s === "object" &&
                    Object.prototype.hasOwnProperty.call(s, "_definition"),
            ))
    );
}

// https://github.com/facebook/css-layout#default-values
const defaultStyle = {
    alignItems: "stretch",
    border: "transparent solid 0px",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    margin: 0,
    padding: 0,
    position: "relative",
    zIndex: 0,
    // fix flexbox bugs
    minHeight: 0,
    minWidth: 0,
};

const styles = StyleSheet.create({
    default: defaultStyle as React.CSSProperties,
});

type ValidViewTags = "div" | "article" | "aside" | "nav" | "section";
type Props = TextViewSharedProps & {
    /**
     * The HTML tag to render.
     */
    tag?: ValidViewTags;
};

const StyledDiv = "div"; //addStyle("div", styles.default);
const StyledArticle = "article"; // addStyle("article", styles.default);
const StyledAside = "aside"; // addStyle("aside", styles.default);
const StyledNav = "nav"; // addStyle("nav", styles.default);
const StyledSection = "section"; // addStyle("section", styles.default);

/**
 * View is a building block for constructing other components. `View` roughly
 * maps to `div`. You can override which tag is used to render the component
 * (for semantic purposes) by specifying the `tag` prop.
 *
 * These components can take styles (via the `style` prop) in a variety of
 * manners:
 *
 * - An inline style object
 * - An `aphrodite` StyleSheet style
 * - An array combining the above
 *
 * `View` sets the following defaults:
 *
 * - `display: "flex"`
 * - `flexDirection: "column"`
 * - they each get their own stacking context.
 *
 * ### Usage
 *
 * ```jsx
 * import {View} from "@khanacademy/wonder-blocks-core";
 *
 * <View>This is a View!</View>
 * ```
 */

const View: React.ForwardRefExoticComponent<
    Props & React.RefAttributes<HTMLElement>
> = React.forwardRef<HTMLElement, Props>(function View(props, ref) {
    const {style, testId, tag = "div", ...restProps} = props;

    let className = null;
    let aphroditeStyle = null;

    // StyleType
    if (isAphroditeStyle(style)) {
        aphroditeStyle = processStyleList([styles.default, style]);
    } else {
        const extraStyles = Array.isArray(style) ? [...style] : style;
        className = css(defaultStyle, extraStyles);
    }

    const finalStyles = isAphroditeStyle(style)
        ? aphroditeStyle?.className
        : className;

    const commonProps = {
        ...restProps,
        className: cx(props.className, finalStyles),
        style: aphroditeStyle?.style,
        // Note: this matches the default test id that Testing Library uses!
        "data-testid": testId,
    } as const;

    switch (tag) {
        case "article":
            return <StyledArticle {...commonProps} ref={ref} />;
        case "aside":
            return <StyledAside {...commonProps} ref={ref} />;
        case "nav":
            return <StyledNav {...commonProps} ref={ref} />;
        case "section":
            return <StyledSection {...commonProps} ref={ref} />;
        case "div":
            return (
                <StyledDiv
                    {...commonProps}
                    ref={ref as React.Ref<HTMLDivElement>}
                />
            );
        default:
            // eslint-disable-next-line no-unused-expressions
            tag as never;
            throw Error(`${tag} is not an allowed value for the 'tag' prop`);
    }
});

export default View;
