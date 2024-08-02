import * as React from "react";
import {renderHookStatic} from "@khanacademy/wonder-blocks-testing-core";
import {renderHook} from "@testing-library/react";

import {useRenderState} from "../use-render-state";
import {RenderStateRoot} from "../../components/render-state-root";
import {RenderState} from "../../components/render-state-context";

describe("useRenderState", () => {
    test("server-side render returns RenderState.Initial", () => {
        // Arrange
        const wrapper = ({children}: any) => (
            <RenderStateRoot>{children}</RenderStateRoot>
        );

        // Act
        const {result} = renderHookStatic(() => useRenderState(), {
            wrapper,
        });

        // Assert
        expect(result.current).toEqual(RenderState.Initial);
    });

    describe("client-side rendering", () => {
        test("first render returns RenderState.Initial", () => {
            // Arrange
            const wrapper = ({children}: any) => (
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
            const wrapper = ({children}: any) => (
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
