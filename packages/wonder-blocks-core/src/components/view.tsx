// WARNING: If you modify this file you must update view.js.flow.
import {StyleSheet} from "aphrodite";
import * as React from "react";

// import addStyle from "../util/add-style";

import type {StyleType, TextViewSharedProps} from "../util/types";

import {processStyleList} from "../util/util";

import styles from "./view.module.css";

const stylesOld = StyleSheet.create({
    // https://github.com/facebook/css-layout#default-values
    default: {
        alignItems: "stretch",
        borderWidth: 0,
        borderStyle: "solid",
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
    },
});

type ValidViewTags = "div" | "article" | "aside" | "nav" | "section";
type Props = TextViewSharedProps & {
    /**
     * The HTML tag to render.
     */
    tag?: ValidViewTags;
};

// const StyledDiv = addStyle("div", styles.default);
// const StyledArticle = addStyle("article", styles.default);
// const StyledAside = addStyle("aside", styles.default);
// const StyledNav = addStyle("nav", styles.default);
// const StyledSection = addStyle("section", styles.default);

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

const isStyleString = (style: string | StyleType) =>
    style && typeof style === "string";

const View: React.ForwardRefExoticComponent<
    Props & React.RefAttributes<HTMLElement>
> = React.forwardRef<HTMLElement, Props>(function View(props, ref) {
    const {style, testId, tag = "div", ...restProps} = props;

    let className = styles.default;
    let aphroditeStyle = null;

    if (isStyleString(style)) {
        className += ` ${style}`;
        // StyleType
    } else {
        aphroditeStyle = processStyleList([stylesOld.default, style]);
    }

    const commonProps = {
        ...restProps,
        // Note: this matches the default test id that Testing Library uses!
        "data-testid": testId,
        className: isStyleString(style) ? className : aphroditeStyle?.className,
        style: aphroditeStyle?.style,
    } as const;

    switch (tag) {
        case "article":
            return <article {...commonProps} ref={ref} />;
        case "aside":
            return <aside {...commonProps} ref={ref} />;
        case "nav":
            return <nav {...commonProps} ref={ref} />;
        case "section":
            return <section {...commonProps} ref={ref} />;
        case "div":
            return (
                <div {...commonProps} ref={ref as React.Ref<HTMLDivElement>} />
            );
        default:
            // eslint-disable-next-line no-unused-expressions
            tag as never;
            throw Error(`${tag} is not an allowed value for the 'tag' prop`);
    }
});

export default View;
