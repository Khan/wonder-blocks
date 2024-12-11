import {useId} from "react";
import * as React from "react";

type Props = {
    /**
     * An identifier to use.
     *
     * If this is omitted, an identifier is generated.
     */
    id?: string | undefined;

    /**
     * A function that to render children with the given identifier.
     */
    children: (id: string) => React.ReactNode;
};

/**
 * A component that provides an identifier to its children.
 *
 * If an `id` prop is provided, that is passed through to the children;
 * otherwise, a unique identifier is generated.
 */
export const Id = ({id, children}: Props) => {
    const generatedId = useId();

    // If we already have an ID, then use that.
    // Otherwise, use the generated ID.
    // NOTE: We can't call hooks conditionally, but it should be pretty cheap
    // to call useId() and not use the result, rather than the alternative
    // which would be to have a separate component for cases where we need
    // to call the hook and then render the component conditionally.
    return <>{children(id ?? generatedId)}</>;
};
