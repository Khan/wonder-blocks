// WARNING: If you modify this file you must update view.js.flow.
import * as React from "react";

import {useMemo} from "react";
import addStyle from "../util/add-style";

import type {TextViewSharedProps} from "../util/types";
import styles from "./view.module.css";

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
 * - CSS module classes
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
