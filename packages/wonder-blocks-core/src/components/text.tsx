// WARNING: If you modify this file you must update the following file:
// build-settings/overrides/wonder-blocks-core/components/view.js.flow
import * as React from "react";
import {StyleSheet} from "aphrodite";

import {processStyleList} from "../util/util";

import type {TextViewSharedProps} from "../util/types";

type Props = TextViewSharedProps & {
    tag: string;
};

type DefaultProps = {
    tag: Props["tag"];
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
    static defaultProps: DefaultProps = {
        tag: "span",
    };

    render(): React.ReactNode {
        const {children, style, tag: Tag, testId, ...otherProps} = this.props;

        const isHeader = isHeaderRegex.test(Tag);
        const styleAttributes = processStyleList([
            styles.text,
            isHeader && styles.header,
            style,
        ]);

        return (
            // @ts-expect-error [FEI-5019] - TS2322 - Type '{ children: ReactNode; style: any; className: string; "data-test-id": string | undefined; tabIndex?: number | undefined; id?: string | undefined; "data-modal-launcher-portal"?: boolean | undefined; ... 69 more ...; onBlur?: ((e: FocusEvent<...>) => unknown) | undefined; }' is not assignable to type 'IntrinsicAttributes'.
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
