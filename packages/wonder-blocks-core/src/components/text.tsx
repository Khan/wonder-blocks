import * as React from "react";

import {processStyleList} from "../util/util";

import type {TextViewSharedProps} from "../util/types";

import styles from "./text.module.css";

type Props = TextViewSharedProps & {
    tag?: string;
};

const isHeaderRegex = /^h[1-6]$/;

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
const Text = React.forwardRef(function Text(
    {children, style, tag = "span", testId, ...otherProps}: Props,
    ref,
) {
    // `tag` is typed as `string`, so we cast it to `React.ElementType` to
    // allow rendering it as a JSX element that accepts arbitrary DOM props
    // (e.g. `style`, `className`).
    const Tag = tag as React.ElementType;
    const isHeader = isHeaderRegex.test(tag);
    const styleAttributes = processStyleList([
        styles.text,
        isHeader && styles.header,
        style,
    ]);

    // Make sure we include the className from the parent component, if any.
    const classNames = otherProps.className
        ? [otherProps.className, styleAttributes.className].join(" ")
        : styleAttributes.className;

    return (
        <Tag
            {...otherProps}
            style={styleAttributes.style}
            className={classNames}
            data-testid={testId}
            ref={ref}
        >
            {children}
        </Tag>
    );
});

export default Text;
