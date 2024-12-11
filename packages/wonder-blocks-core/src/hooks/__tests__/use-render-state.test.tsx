import * as React from "react";
import {renderHookStatic} from "@khanacademy/wonder-blocks-testing-core";
import {render} from "@testing-library/react";

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
            const mockRenderState = jest.fn();

            const UnderTest = () => {
                const renderState = useRenderState();
                // Mock the render state so we can test every state change
                return mockRenderState(renderState);
            };

            // Act
            render(<UnderTest />, {
                wrapper: RenderStateRoot,
            });

            // Assert
            expect(mockRenderState).toHaveBeenNthCalledWith(
                1,
                RenderState.Initial,
            );
        });

        test("second render returns RenderState.Standard", async () => {
            // Arrange
            const mockRenderState = jest.fn();

            const UnderTest = () => {
                const renderState = useRenderState();
                // Mock the render state so we can test every state change
                return mockRenderState(renderState);
            };

            // Act
            render(<UnderTest />, {
                wrapper: RenderStateRoot,
            });

            // Assert
            expect(mockRenderState).toHaveBeenNthCalledWith(
                2,
                RenderState.Standard,
            );
        });
    });
});
