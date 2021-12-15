// @flow
import {combineTopLevel} from "./combine-top-level.js";

/**
 * Combine one or more objects into a single object.
 *
 * Objects later in the argument list take precedence over those that are
 * earlier. Object and array values at the root level are merged.
 */
export const combineOptions = <Options: {...}>(
    ...toBeCombined: $ReadOnlyArray<Partial<Options>>
): $ReadOnly<Partial<Options>> => {
    const combined = toBeCombined.filter(Boolean).reduce((acc, cur) => {
        for (const key of Object.keys(cur)) {
            // We always call combine, even if acc[key] is undefined
            // because we need to make sure we clone values.
            acc[key] = combineTopLevel(acc[key], cur[key]);
        }
        return acc;
    }, {});

    // We know that we are creating a compatible return type.
    // $FlowIgnore[incompatible-return]
    return combined;
};
