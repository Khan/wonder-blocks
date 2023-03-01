import * as React from "react";
import {StyleSheet} from "aphrodite";

import addStyle from "../util/add-style";

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
    tag: ValidViewTags;
};

type DefaultProps = {
    tag: Props["tag"];
};

const StyledDiv = addStyle<"div">("div", styles.default);
const StyledArticle = addStyle<"article">("article", styles.default);
const StyledAside = addStyle<"aside">("aside", styles.default);
const StyledNav = addStyle<"nav">("nav", styles.default);
const StyledSection = addStyle<"section">("section", styles.default);

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
export default class View extends React.Component<Props> {
    static defaultProps: DefaultProps = {
        tag: "div",
    };

    render(): React.ReactElement {
        const {testId, tag, ...restProps} = this.props;
        const props = {
            ...restProps,
            "data-test-id": testId,
        } as const;

        switch (tag) {
            case "article":
                return <StyledArticle {...props} />;
            case "aside":
                return <StyledAside {...props} />;
            case "nav":
                return <StyledNav {...props} />;
            case "section":
                return <StyledSection {...props} />;
            case "div":
                return <StyledDiv {...props} />;
            default:
                // eslint-disable-next-line no-unused-expressions
                tag as never;
                throw Error(
                    `${tag} is not an allowed value for the 'tag' prop`,
                );
        }
    }
}
