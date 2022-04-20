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
    const sortedContext = Object.keys(context)
        .sort()
        .map((key) => `${key}=${context[key]}`)
        .join(";");
    parts.push(sortedContext);

    // Now we add the operation identifier.
    parts.push(operation.id);

    // Finally, if we have variables, we add those too.
    if (variables != null) {
        // Turn the variables into a string of the form,
        //     "key1=;key2=value"
        const sortedVariables = Object.keys(variables)
            .sort()
            .map((key) => `${key}=${toString(variables[key])}`)
            .join(";");
        parts.push(sortedVariables);
    }
    return parts.join("|");
};
