import * as React from "react";
import {renderHookStatic} from "@khanacademy/wonder-blocks-testing-core";
import {renderHook, waitFor} from "@testing-library/react";

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
            expect(result.current).toEqual(RenderState.Initial);
        });

        test("second render returns RenderState.Standard", async () => {
            // Arrange
            const wrapper = ({children}: any) => (
                <RenderStateRoot>{children}</RenderStateRoot>
            );

            const {result, rerender} = renderHook(() => useRenderState(), {
                wrapper,
            });

            // Act
            rerender();

            // Assert
            await waitFor(() => {
                expect(result.current).toEqual(RenderState.Standard);
            });
        });
    });
});
