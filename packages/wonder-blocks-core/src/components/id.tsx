import {useId} from "react";
import * as React from "react";

type Props = {
    /**
     * A function that to render children with the given identifier.
     */
    children: (id: string) => React.ReactNode;
};

/**
 * A component that provides a unique identifier to its children.
 *
 * This component is useful when you need to generate unique identifiers for
 * elements in components that cannot use hooks. Where possible, use `useId`
 * instead.
 */
export const Id = ({children}: Props) => {
    const id = useId();
    return <>{children(id)}</>;
};
