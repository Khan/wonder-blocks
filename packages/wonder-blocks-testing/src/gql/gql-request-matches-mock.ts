import type {GqlOperation, GqlContext} from "@khanacademy/wonder-blocks-data";
import type {GqlMockOperation} from "./types";

// TODO(somewhatabstract, FEI-4268): use a third-party library to do this and
// possibly make it also support the jest `jest.objectContaining` type matching
// to simplify mock declaration (note that it would need to work in regular
// tests and stories/fixtures).
const areObjectsEquivalent = (a: any, b: any): boolean => {
    if (a === b) {
        return true;
    }
    if (a == null || b == null) {
        return false;
    }
    if (typeof a !== "object" || typeof b !== "object") {
        return false;
    }

    // Now, we need to compare the values of the objects.
    // We can't just compare key sets as we want to consider an explicit
    // key with an undefined value to be the same as a missing key.
    // It makes for a nicer API when defining mocks.
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);

    const allKeys = new Set([...aKeys, ...bKeys]);

    for (const key of allKeys) {
        if (!areObjectsEquivalent(a[key], b[key])) {
            return false;
        }
    }
    return true;
};

export const gqlRequestMatchesMock = (
    mock: GqlMockOperation<any, any>,
    operation: GqlOperation<any, any>,
    variables: Record<any, any> | null | undefined,
    context: GqlContext,
): boolean => {
    // If they don't represent the same operation, then they can't match.
    // NOTE: Operations can include more fields than id and type, but we only
    // care about id and type. The rest is ignored.
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
        if (!areObjectsEquivalent(mock.variables, variables)) {
            return false;
        }
    }

    // We do a loose match, so if the lhs doesn't define context,
    // we just assume it matches everything.
    if (mock.context != null) {
        // Context has to match.
        if (!areObjectsEquivalent(mock.context, context)) {
            return false;
        }
    }

    // If we get here, we have a match.
    return true;
};
