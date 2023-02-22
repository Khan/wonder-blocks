// @flow
import * as React from "react";
import {renderHook as renderHookOnServer} from "@testing-library/react-hooks/server";
import {renderHook} from "@testing-library/react-hooks";

import {useRenderState} from "../use-render-state";
import {RenderStateRoot} from "../../components/render-state-root";
// TODO(somewhatabstract, FEI-4174): Update eslint-plugin-import when they
// have fixed:
// https://github.com/import-js/eslint-plugin-import/issues/2073
// eslint-disable-next-line import/named
import {RenderState} from "../../components/render-state-context";

describe("useRenderState", () => {
    test("server-side render returns RenderState.Initial", () => {
        // Arrange
        const wrapper = ({children}) => (
            <RenderStateRoot>{children}</RenderStateRoot>
        );

        // Act
        const {result} = renderHookOnServer(() => useRenderState(), {
            wrapper,
        });

        // Assert
        expect(result.current).toEqual(RenderState.Initial);
    });

    describe("client-side rendering", () => {
        test("first render returns RenderState.Initial", () => {
            // Arrange
            const wrapper = ({children}) => (
                <RenderStateRoot>{children}</RenderStateRoot>
            );

            // Act
            const {result} = renderHook(() => useRenderState(), {
                wrapper,
            });

            // Assert
            expect(result.all[0]).toEqual(RenderState.Initial);
        });

        test("second render returns RenderState.Standard", () => {
            // Arrange
            const wrapper = ({children}) => (
                <RenderStateRoot>{children}</RenderStateRoot>
            );

            // Act
            const {result} = renderHook(() => useRenderState(), {
                wrapper,
            });

            // Assert
            expect(result.all[1]).toEqual(RenderState.Standard);
        });
    });
});
