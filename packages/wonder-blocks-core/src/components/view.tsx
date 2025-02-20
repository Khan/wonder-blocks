// WARNING: If you modify this file you must update view.js.flow.
import * as React from "react";
import {StyleSheet} from "aphrodite";

import {useMemo} from "react";
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

type Props = TextViewSharedProps & {
    /**
     * The HTML tag to render.
     */
    tag?: keyof JSX.IntrinsicElements;
};

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

    const StyledTag = useMemo(() => addStyle(tag, styles.default), [tag]);

    return <StyledTag {...commonProps} ref={ref} />;
});

export default View;
