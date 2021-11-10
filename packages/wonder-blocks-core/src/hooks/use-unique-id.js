// @flow
import * as React from "react";

import SsrIDFactory from "../util/ssr-id-factory.js";
import UniqueIDFactory from "../util/unique-id-factory.js";
import {useRenderState} from "./use-render-state.js";

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
    const isMounted = React.useRef(false);
    const idFactory = React.useRef<?IIdentifierFactory>(null);
    React.useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        };
    }, []);

    if (
        renderState === "initial" ||
        (renderState === "root" && !isMounted.current)
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
    const isMounted = React.useRef(false);
    const idFactory = React.useRef<?IIdentifierFactory>(null);
    React.useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        };
    }, []);

    if (
        renderState === "initial" ||
        (renderState === "root" && !isMounted.current)
    ) {
        return null;
    }

    if (!idFactory.current) {
        idFactory.current = new UniqueIDFactory(scope);
    }

    return idFactory.current;
};
