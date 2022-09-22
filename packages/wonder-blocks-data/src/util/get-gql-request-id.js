// @flow
import {entries} from "@khanacademy/wonder-stuff-core";
import type {GqlOperation, GqlContext} from "./gql-types.js";

const toString = (value: mixed): string => {
    if (typeof value === "string") {
        return value;
    }

    if (typeof value === "object" && value != null) {
        if (value instanceof Date) {
            return value.toISOString();
        } else if (typeof value.toString === "function") {
            return value.toString();
        }
    }
    return JSON.stringify(value) ?? "";
};

const toStringifiedVariables = (acc: any, key: string, value: mixed): any => {
    if (typeof value === "object" && value !== null) {
        // If we have an object or array, we build sub-variables so that
        // the ID is easily human-readable rather than having lots of
        // extra %-encodings. This means that an object or array variable
        // turns into x variables, where x is the field or element count of
        // variable. See below for example.
        const subValues = entries(value);

        // If we don't get any entries, it's possible this is a Date, Error,
        // or some other non-standard value. While these generally should be
        // avoided as variables, we should handle them gracefully.
        if (subValues.length !== 0) {
            return subValues.reduce((innerAcc, [i, v]) => {
                const subKey = `${key}.${i}`;
                return toStringifiedVariables(innerAcc, subKey, v);
            }, acc);
        }
    }

    acc[key] = toString(value);
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
        // `toStringifiedVariables` helps us with this by hoisting nested
        // data to individual variables for the purposes of ID generation.
        //
        // For example, consider variables:
        //    {x: [1,2,3], y: {a: 1, b: 2, c: 3}, z: 123}
        //
        // Each variable, x, y and z, would be stringified into
        // stringifiedVariables as follows:
        //  x becomes {"x.0": "1", "x.1": "2", "x.2": "3"}
        //  y becomes {"y.a": "1", "y.b": "2", "y.c": "3"}
        //  z becomes {"z": "123"}
        //
        // This then leads to stringifiedVariables being:
        //  {
        //    "x.0": "1",
        //    "x.1": "2",
        //    "x.2": "3",
        //    "y.a": "1",
        //    "y.b": "2",
        //    "y.c": "3",
        //    "z": "123",
        //  }
        //
        // Thus allowing our use of URLSearchParams to both sort and easily
        // encode the variables into an idempotent identifier for those
        // variable values that is also human-readable.
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
