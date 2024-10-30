// WARNING: If you modify this file you must update view.js.flow.
import * as React from "react";
import {StyleSheet} from "aphrodite";

import {makeStyled} from "../util/add-style";

import type {TextViewSharedProps} from "../util/types";

const styles = StyleSheet.create({
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

const {StyledDiv} = makeStyled("div", styles.default);
const {StyledArticle} = makeStyled("article", styles.default);
const {StyledAside} = makeStyled("aside", styles.default);
const {StyledNav} = makeStyled("nav", styles.default);
const {StyledSection} = makeStyled("section", styles.default);

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
    const {testId, tag = "div", ...restProps} = props;
    const commonProps = {
        ...restProps,
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
