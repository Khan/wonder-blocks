import {Flow} from "flow-to-typescript-codemod";
import * as React from "react";
import {StyleSheet} from "aphrodite";

import {processStyleList} from "./util";

import type {StyleType} from "./types";

// TODO(kevinb): have an a version which uses exact object types
export default function addStyle<
    T extends Flow.AbstractComponent<any> | string,
>(
    Component: T,
    defaultStyle?: StyleType,
): Flow.AbstractComponent<
    // @ts-expect-error [FEI-5019] - TS2344 - Type 'T' does not satisfy the constraint 'keyof IntrinsicElements | JSXElementConstructor<any>'.
    JSX.LibraryManagedAttributes<T, React.ComponentProps<T>> & {
        style?: StyleType;
    }
> {
    function StyleComponent(
        // @ts-expect-error [FEI-5019] - TS2344 - Type 'T' does not satisfy the constraint 'keyof IntrinsicElements | JSXElementConstructor<any>'.
        props: JSX.LibraryManagedAttributes<T, React.ComponentProps<T>> & {
            style: StyleType;
        },
    ) {
        // @ts-expect-error [FEI-5019] - TS2339 - Property 'className' does not exist on type '{ style: any; }'.
        const {className, style, ...tmpOtherProps} = props;
        // NOTE(jeresig): We need to cast the remaining props to be the right
        // value to ensure that they're typed properly.
        const otherProps: JSX.LibraryManagedAttributes<
            T,
            // @ts-expect-error [FEI-5019] - TS2344 - Type 'T' does not satisfy the constraint 'keyof IntrinsicElements | JSXElementConstructor<any>'.
            React.ComponentProps<T>
        > = tmpOtherProps as any;
        const reset =
            // @ts-expect-error [FEI-5019] - TS2536 - Type 'T & string' cannot be used to index type '{ button: { margin: number; "::-moz-focus-inner": { border: number; }; }; }'.
            typeof Component === "string" ? overrides[Component] : null;

        const {className: aphroditeClassName, style: inlineStyles} =
            processStyleList([reset, defaultStyle, style]);

        return (
            // @ts-expect-error [FEI-5019] - TS2604 - JSX element type 'Component' does not have any construct or call signatures.
            <Component
                {...otherProps}
                className={[aphroditeClassName, className]
                    .filter(Boolean)
                    .join(" ")}
                style={inlineStyles}
            />
        );
    }

    // @ts-expect-error: this will be fixed in a future PR when HOCs are converted
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
