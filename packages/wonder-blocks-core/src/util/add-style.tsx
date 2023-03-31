import * as React from "react";
import {StyleSheet} from "aphrodite";

import {processStyleList} from "./util";

import type {StyleType} from "./types";

export default function addStyle<
    // We extend `React.ComponentType<any>` to support `addStyle(Link)` with
    // react-router's `Link` component.
    T extends React.ComponentType<any> | keyof JSX.IntrinsicElements,
    Props extends {
        className?: string;
        style?: StyleType;
        children?: React.ReactNode;
    } & Omit<React.ComponentProps<T>, "style">, // removes the 'style' prop from the original component
>(
    Component: T,
    defaultStyle?: StyleType,
): React.ForwardRefExoticComponent<
    React.PropsWithoutRef<Props> & React.RefAttributes<T>
> {
    return React.forwardRef<T, Props>((props, ref) => {
        // eslint-disable-next-line react/prop-types
        const {className, style, ...otherProps} = props;
        const reset =
            typeof Component === "string" ? overrides[Component] : null;

        const {className: aphroditeClassName, style: inlineStyles} =
            processStyleList([reset, defaultStyle, style]);

        return (
            // @ts-expect-error: TS says this is not assignable to the return forwardRef()'s return type.
            <Component
                {...otherProps}
                ref={ref}
                className={[aphroditeClassName, className]
                    .filter(Boolean)
                    .join(" ")}
                style={inlineStyles}
            />
        );
    });
}

/**
 * These are necessary to override various custom styles that browsers add so that
 * elements have consistent styles across all browsers.  Only add styles here if
 * they appear in https://github.com/necolas/normalize.css/blob/master/normalize.css.
 */
const overrides = StyleSheet.create({
    button: {
        margin: 0, // Safari adds 2px left/right margins
        "::-moz-focus-inner": {
            border: 0, // Firefox adds an inner focus ring around text
        },
    },
});
