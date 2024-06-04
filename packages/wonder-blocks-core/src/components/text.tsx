// WARNING: If you modify this file you must update text.js.flow.
import * as React from "react";
// import {StyleSheet} from "aphrodite";

import {cx} from "class-variance-authority";
// import {processStyleList} from "../util/util";

import type {TextViewSharedProps} from "../util/types";

import styles from "./text.module.css";

type Props = TextViewSharedProps & {
    tag?: string;
};

const isHeaderRegex = /^h[1-6]$/;

// const styles = StyleSheet.create({
//     text: {
//         // Disable subpixel antialiasing on Mac desktop for consistency of
//         // rendering with mobile and Sketch (neither of which support it).
//         // See https://bjango.com/articles/subpixeltext/ for more details.
//         WebkitFontSmoothing: "antialiased",
//         MozOsxFontSmoothing: "grayscale",
//     },
//     header: {
//         // User agent stylesheets add vertical margins to header tags by
//         // default. We prefer to be more deliberate in our spacing instead.
//         marginTop: 0,
//         marginBottom: 0,
//     },
// });

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
    {children, style, tag: Tag = "span", testId, ...otherProps}: Props,
    ref,
) {
    const isHeader = isHeaderRegex.test(Tag);
    // const styleAttributes = processStyleList([
    //     styles.text,
    //     isHeader && styles.header,
    //     style,
    // ]);

    const styleAttributes = cx(styles.text, isHeader && styles.header, style);

    // Make sure we include the className from the parent component, if any.
    const classNames = otherProps.className
        ? [otherProps.className, styleAttributes].join(" ")
        : styleAttributes;

    return (
        // @ts-expect-error [FEI-5019] - TS2322 - Type '{ children: ReactNode; style: any; className: string; "data-testid": string | undefined; tabIndex?: number | undefined; id?: string | undefined; "data-modal-launcher-portal"?: boolean | undefined; ... 69 more ...; onBlur?: ((e: FocusEvent<...>) => unknown) | undefined; }' is not assignable to type 'IntrinsicAttributes'.
        <Tag
            {...otherProps}
            // style={styleAttributes.style}
            className={classNames}
            data-testid={testId}
            ref={ref}
        >
            {children}
        </Tag>
    );
});

export default Text;
