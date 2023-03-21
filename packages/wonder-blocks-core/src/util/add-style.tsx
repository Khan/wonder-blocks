import * as React from "react";
import {StyleSheet} from "aphrodite";

import {processStyleList} from "./util";

import type {StyleType} from "./types";

export default function addStyle<
    T extends React.ComponentType<any> | keyof JSX.IntrinsicElements,
>(Component: T, defaultStyle?: StyleType) {
    type Props = SpreadType<
        JSX.LibraryManagedAttributes<T, React.ComponentProps<T>>,
        {style?: StyleType}
    >;

    const StyleComponent: React.ForwardRefExoticComponent<
        Props & React.RefAttributes<HTMLElement>
    > = React.forwardRef<HTMLElement, Props extends {className?: string, style?: any}>((props: Props, ref) => {
        const {className, style, ...otherProps} = props;
        const reset =
            typeof Component === "string" ? overrides[Component] : null;

        const {className: aphroditeClassName, style: inlineStyles} =
            processStyleList([reset, defaultStyle, style]);

        return (
            // @ts-expect-error [FEI-5019] - TS2604 - JSX element type 'Component' does not have any construct or call signatures.
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

    return StyleComponent;
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
