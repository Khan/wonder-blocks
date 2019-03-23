import React from "react";
import { TextViewSharedProps } from "../util/types";
declare type Props = {
    tag: keyof JSX.IntrinsicElements;
} & TextViewSharedProps;
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
    static defaultProps: {
        tag: string;
    };
    render(): JSX.Element;
}
export {};
