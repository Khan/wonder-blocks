import * as React from "react";
import { TextViewSharedProps } from "../util/types";
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
export default class View extends React.Component<TextViewSharedProps> {
    render(): JSX.Element;
}
