// Separate file to simplify the flow type override while we're still
// exporting flow types.
import * as React from "react";

/**
 * Get the props for a component, accounting for default props.
 *
 * This is equivalent to using `JSX.LibraryManagedAttributes`, but with a
 * simpler type signature. For those familiar with Flow types, this is
 * equivalent to `React.ElementConfig`.
 */
export type PropsFor<
    T extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>,
> = JSX.LibraryManagedAttributes<T, React.ComponentProps<T>>;
