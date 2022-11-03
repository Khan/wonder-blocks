// @flow
import {useRef} from "react";

import {useRenderState} from "./use-render-state.js";
import SsrIDFactory from "../util/ssr-id-factory.js";
import UniqueIDFactory from "../util/unique-id-factory.js";

import {
    // TODO(somewhatabstract, FEI-4174): Update eslint-plugin-import when they
    // have fixed:
    // https://github.com/import-js/eslint-plugin-import/issues/2073
    // eslint-disable-next-line import/named
    RenderState,
} from "../components/render-state-context.js";

import type {IIdentifierFactory} from "../util/types.js";

/**
 * Returns a unique identifier factory.  If the parent component hasn't
 * been mounted yet, the global SsrIDFactory will be returned until the
 * component becomes mounted.
 *
 * @param {string} [scope] optional string to prefix generated ids with.
 * @returns {IIdentifierFactory}
 */
export const useUniqueIdWithMock = (scope?: string): IIdentifierFactory => {
    const renderState = useRenderState();
    const idFactory = useRef<?IIdentifierFactory>(null);

    if (renderState === RenderState.Root) {
        throw new Error(
            "Components using useUniqueIdWithMock() should be descendants of <RenderStateRoot>",
        );
    }

    if (renderState === RenderState.Initial) {
        return SsrIDFactory;
    }

    if (!idFactory.current) {
        idFactory.current = new UniqueIDFactory(scope);
    }

    return idFactory.current;
};

/**
 * Returns a unique identifier factory.  If the parent component hasn't
 * been mounted yet, null will be returned.
 *
 * @param {string} [scope] optional string to prefix generated ids with.
 * @returns {?IIdentifierFactory}
 */
export const useUniqueIdWithoutMock = (scope?: string): ?IIdentifierFactory => {
    const renderState = useRenderState();
    const idFactory = useRef<?IIdentifierFactory>(null);

    if (renderState === RenderState.Root) {
        throw new Error(
            "Components using useUniqueIdWithoutMock() should be descendants of <RenderStateRoot>",
        );
    }

    if (renderState === RenderState.Initial) {
        return null;
    }

    if (!idFactory.current) {
        idFactory.current = new UniqueIDFactory(scope);
    }

    return idFactory.current;
};
