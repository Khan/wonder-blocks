// @flow
import {useEffect, useRef, useState} from "react";

import SsrIDFactory from "../util/ssr-id-factory.js";
import UniqueIDFactory from "../util/unique-id-factory.js";
import {useRenderState} from "./use-render-state.js";

// TODO(somewhatabstract, FEI-4174): Update eslint-plugin-import when they
// have fixed:
// https://github.com/import-js/eslint-plugin-import/issues/2073
// eslint-disable-next-line import/named
import {RenderState} from "../components/render-state-context.js";

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
    const [isMounted, setIsMounted] = useState(false);
    const idFactory = useRef<?IIdentifierFactory>(null);

    useEffect(() => {
        // triggers a re-render now that the component is mounted
        setIsMounted(true);
    }, []);

    if (
        renderState === RenderState.Initial ||
        (renderState === RenderState.Root && !isMounted)
    ) {
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
    const [isMounted, setIsMounted] = useState(false);
    const idFactory = useRef<?IIdentifierFactory>(null);

    useEffect(() => {
        // triggers a re-render now that the component is mounted
        setIsMounted(true);
    }, []);

    if (
        renderState === RenderState.Initial ||
        (renderState === RenderState.Root && !isMounted)
    ) {
        return null;
    }

    if (!idFactory.current) {
        idFactory.current = new UniqueIDFactory(scope);
    }

    return idFactory.current;
};
