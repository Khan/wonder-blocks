// @flow
// Opt this file out of coverage because it's super hard to test.
/* istanbul ignore file */

/**
 * Isolate imports within a given action using jest.isolateModules.
 *
 * This is a helper for the `jest.isolateModules` API, allowing
 * code to avoid the clunky closure syntax in their tests.
 *
 * @param {() => T} action The action that contains the isolated module imports.
 * We do it this way so that any `require` calls are relative to the calling
 * code and not this function. Note that we don't support promises here to
 * discourage dynamic `import` use, which doesn't play well with standard
 * jest yet.
 */
export const isolateModules = <T>(action: () => T): T => {
    if (typeof jest === "undefined") {
        throw new Error(`jest is not available in global scope`);
    }

    let result = undefined;
    jest.isolateModules(() => {
        result = action();
    });
    // We know that we'll have a result of the appropriate type at this point.
    // We could use a promise to make everything happy, but this doesn't need
    // to be async, so why bother.
    // $FlowIgnore[incompatible-return]
    return result;
};
