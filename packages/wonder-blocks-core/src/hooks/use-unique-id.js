// @flow
import {useRef} from "react";

import {useRenderState} from "./use-render-state";
import SsrIDFactory from "../util/ssr-id-factory";
import UniqueIDFactory from "../util/unique-id-factory";

import {RenderState} from "../components/render-state-context";

import type {IIdentifierFactory} from "../util/types";

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
