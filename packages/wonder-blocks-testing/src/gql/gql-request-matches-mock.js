// @flow
import type {GqlOperation, GqlContext} from "@khanacademy/wonder-blocks-data";
import type {GqlMockOperation} from "./types.js";

const safeHasOwnProperty = (obj: any, prop: string): boolean =>
    // Flow really shouldn't be raising this error here.
    // $FlowFixMe[method-unbinding]
    Object.prototype.hasOwnProperty.call(obj, prop);

const areObjectsEqual = (a: any, b: any): boolean => {
    if (a === b) {
        return true;
    }
    if (a == null || b == null) {
        return false;
    }
    if (typeof a !== "object" || typeof b !== "object") {
        return false;
    }
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);
    if (aKeys.length !== bKeys.length) {
        return false;
    }
    for (let i = 0; i < aKeys.length; i++) {
        const key = aKeys[i];
        if (!safeHasOwnProperty(b, key) || !areObjectsEqual(a[key], b[key])) {
            return false;
        }
    }
    return true;
};

export const gqlRequestMatchesMock = (
    mock: GqlMockOperation<any, any, any, any>,
    operation: GqlOperation<any, any, any>,
    variables: ?{...},
    context: GqlContext,
): boolean => {
    // If they don't represent the same operation, then they can't match.
    if (
        mock.operation.id !== operation.id ||
        mock.operation.type !== operation.type
    ) {
        return false;
    }

    // We do a loose match, so if the lhs doesn't define variables,
    // we just assume it matches everything.
    if (mock.variables != null) {
        // Variables have to match.
        if (!areObjectsEqual(mock.variables, variables)) {
            return false;
        }
    }

    // We do a loose match, so if the lhs doesn't define context,
    // we just assume it matches everything.
    if (mock.context != null) {
        // Context has to match.
        if (!areObjectsEqual(mock.context, context)) {
            return false;
        }
    }

    // If we get here, we have a match.
    return true;
};
