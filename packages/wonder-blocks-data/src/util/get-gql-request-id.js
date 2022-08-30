// @flow
import type {GqlOperation, GqlContext} from "./gql-types.js";

const toString = (value: mixed): string => {
    if (typeof value === "string") {
        return value;
    }
    return JSON.stringify(value) ?? "";
};

const toStringifiedVariables = (acc: any, key: string, value: mixed): any => {
    if (typeof value === "object" && value !== null) {
        // If we have an object or array, we build sub-variables so that
        // the ID is easily human-readable rather than having lots of
        // extra %-encodings.
        return Object.entries(value).reduce((innerAcc, [i, v]) => {
            const subKey = `${key}.${i}`;
            return toStringifiedVariables(innerAcc, subKey, v);
        }, acc);
    } else {
        acc[key] = toString(value);
    }
    return acc;
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
        // We also need to ensure we sort any sub-object keys.
        const stringifiedVariables = Object.keys(variables).reduce(
            (acc, key) => {
                const value = variables[key];
                return toStringifiedVariables(acc, key, value);
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
