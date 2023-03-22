import * as React from "react";
import {StyleSheet} from "aphrodite";

import {processStyleList} from "./util";

import type {StyleType} from "./types";

// export default function addStyle<
//     T extends React.ComponentType<any> | keyof JSX.IntrinsicElements,
// >(Component: T, defaultStyle?: StyleType) {
//     type Props = SpreadType<
//         JSX.LibraryManagedAttributes<T, React.ComponentProps<T>>,
//         {style?: StyleType}
//     >;

//     const StyleComponent: React.ForwardRefExoticComponent<
//         Props & React.RefAttributes<HTMLElement>
//     > = React.forwardRef<HTMLElement, Props extends {className?: string, style?: any}>((props: Props, ref) => {
//         const {className, style, ...otherProps} = props;
//         const reset =
//             typeof Component === "string" ? overrides[Component] : null;

//         const {className: aphroditeClassName, style: inlineStyles} =
//             processStyleList([reset, defaultStyle, style]);

//         return (
//             // @ts-expect-error [FEI-5019] - TS2604 - JSX element type 'Component' does not have any construct or call signatures.
//             <Component
//                 {...otherProps}
//                 ref={ref}
//                 className={[aphroditeClassName, className]
//                     .filter(Boolean)
//                     .join(" ")}
//                 style={inlineStyles}
//             />
//         );
//     });

//     return StyleComponent;
// }

// what do we want return?
// - a component that has a `style` prop with type StyleType (prop we're adding/overriding)

// Notes:
// - function defn can have type params, and those params can have constraints (i.e. extends ...)
// - function calls have be passed type args, but those can't use extends ...

// function add(x: number, y: number) {
//     return x + y;
// };
//
// add(5: number, 10);

// keyof JSX.IntrinsicElements == "a" | "abbr" | ... | "div" | ... | "input"
// string | number | ...
// {foo: number, bar: string} | { ... } | ...

// <div id="5"></div> => React.elementCreate("div", {id: 5})

// {foo: number, bar: string} & {foo: boolean, baz: RegExp} =>
// {foo: number & boolean, bar: string, baz: RegExp} =>
// {foo: never, bar: string, baz: RegExp}

// React.ComponentProps<T> returns the prop types for T, in the case of "div", "a", etc.
// style is defined as         style?: CSSProperties | undefined;
// and that conflicts with our style?: StyleType;

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
