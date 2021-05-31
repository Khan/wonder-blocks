// @flow
import type {ReferenceObject} from "popper.js";

type Sizes = {|
    top: number,
    left: number,
    bottom: number,
    right: number,
|};

type Edges = {|
    margin: Sizes,
    border: Sizes,
    padding: Sizes,
|};

const EmptySizes: Sizes = Object.freeze({
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
});

/**
 * Get the margin, padding, and border edges for a given element.
 */
export default function getEdges(
    element: Element | ReferenceObject,
    withoutEdges: boolean,
): Edges {
    if (!withoutEdges && element instanceof Element) {
        const style =
            ((element: any).currentStyle: ?CSSStyleDeclaration) ||
            window.getComputedStyle(element);
        return {
            margin: {
                left: parseFloat(style.marginLeft),
                top: parseFloat(style.marginTop),
                right: parseFloat(style.marginRight),
                bottom: parseFloat(style.marginBottom),
            },
            padding: {
                left: parseFloat(style.paddingLeft),
                top: parseFloat(style.paddingTop),
                right: parseFloat(style.paddingRight),
                bottom: parseFloat(style.paddingBottom),
            },
            border: {
                left: parseFloat(style.borderLeftWidth),
                top: parseFloat(style.borderTopWidth),
                right: parseFloat(style.borderRightWidth),
                bottom: parseFloat(style.borderBottomWidth),
            },
        };
    }

    return {
        margin: EmptySizes,
        padding: EmptySizes,
        border: EmptySizes,
    };
}
