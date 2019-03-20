// @flow
import React from "react";
import {StyleSheet} from "aphrodite";

import type {StyleType} from "@khanacademy/wonder-blocks-core";
import {processStyleList} from "../util/util.js";

import type {TextViewSharedProps} from "../util/types.js";

type Props = {
    ...TextViewSharedProps,
    tag: string,
};

const isHeaderRegex = /^h[1-6]$/;

const styles = StyleSheet.create({
    text: {
        // Disable subpixel antialiasing on Mac desktop for consistency of
        // rendering with mobile and Sketch (neither of which support it).
        // See https://bjango.com/articles/subpixeltext/ for more details.
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
    },
    header: {
        // User agent stylesheets add vertical margins to header tags by
        // default. We prefer to be more deliberate in our spacing instead.
        marginTop: 0,
        marginBottom: 0,
    },
});

/**
 * Text is a building block for constructing other components. `Text` roughly
 * maps to `span`. You can override which tag is used to render the component
 * (for semantic purposes) by specifying the `tag` prop.
 *
 * These components can take styles (via the `style` prop) in a variety of
 * manners:
 *
 * - An inline style object
 * - An `aphrodite` StyleSheet style
 * - An array combining the above
 */
export default class Text extends React.Component<Props> {
    static defaultProps = {
        tag: "span",
    };

    render() {
        const {children, style, tag: Tag, testId, ...otherProps} = this.props;

        const isHeader = isHeaderRegex.test(Tag);
        const styleAttributes = processStyleList([
            styles.text,
            isHeader && styles.header,
            style,
        ]);

        return (
            <Tag
                {...otherProps}
                style={styleAttributes.style}
                className={styleAttributes.className}
                data-test-id={testId}
            >
                {children}
            </Tag>
        );
    }
}
