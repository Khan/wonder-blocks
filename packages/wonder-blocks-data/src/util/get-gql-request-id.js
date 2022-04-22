// @flow
import type {GqlOperation, GqlContext} from "./gql-types.js";

const toString = (valid: mixed): string => {
    if (typeof valid === "string") {
        return valid;
    }
    return JSON.stringify(valid) ?? "";
};

/**
 * Get an identifier for a given request.
 */
export const getGqlRequestId = <TData, TVariables: {...}>(
    operation: GqlOperation<TData, TVariables>,
    variables: ?TVariables,
    context: GqlContext,
): string => {
    // We add all the bits for this into an array and then join them with
    // a chosen separator.
    const parts = [];

    // First, we push the context values.
    const sortableContext = new URLSearchParams(context);
    // $FlowIgnore[prop-missing] Flow has incomplete support for URLSearchParams
    sortableContext.sort();
    parts.push(sortableContext.toString());

    // Now we add the operation identifier.
    parts.push(operation.id);

    // Finally, if we have variables, we add those too.
    if (variables != null) {
        // We need to turn each variable into a string.
        const stringifiedVariables = Object.keys(variables).reduce(
            (acc, key) => {
                acc[key] = toString(variables[key]);
                return acc;
            },
            {},
        );
        // We use the same mechanism as context to sort and arrange the
        // variables.
        const sortableVariables = new URLSearchParams(stringifiedVariables);
        // $FlowIgnore[prop-missing] Flow has incomplete support for URLSearchParams
        sortableVariables.sort();
        parts.push(sortableVariables.toString());
    }
    return parts.join("|");
};
