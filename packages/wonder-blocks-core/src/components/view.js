// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";

import addStyle from "../util/add-style.js";

import type {TextViewSharedProps} from "../util/types.js";

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
// eslint-disable-next-line flowtype/require-exact-type
type Props = {
    ...TextViewSharedProps,
    tag: ValidViewTags,
    ...
};

type DefaultProps = {|
    tag: $PropertyType<Props, "tag">,
|};

const StyledDiv = addStyle<"div">("div", styles.default);
const StyledArticle = addStyle<"article">("article", styles.default);
const StyledAside = addStyle<"aside">("aside", styles.default);
const StyledNav = addStyle<"nav">("nav", styles.default);
const StyledSection = addStyle<"section">("section", styles.default);

/**
 * View is a building block for constructing other components. `View` roughly
 * maps to `div` and `Text` roughly maps to `span`. You can override which tag
 * is used to render the component (for semantic purposes) by specifying the
 * `tag` prop.
 *
 * These components can take styles (via the `style` prop) in a variety of
 * manners:
 *
 * - An inline style object
 * - An `aphrodite` StyleSheet style
 * - An array combining the above
 */
export default class View extends React.Component<Props> {
    static defaultProps: DefaultProps = {
        tag: "div",
    };

    render(): React.Node {
        const {testId, tag, ...restProps} = this.props;
        const props = {
            ...restProps,
            "data-test-id": testId,
        };

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
                (tag: empty);
                throw Error(
                    `${tag} is not an allowed value for the 'tag' prop`,
                );
        }
    }
}
