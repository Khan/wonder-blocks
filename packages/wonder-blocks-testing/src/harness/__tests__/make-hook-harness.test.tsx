import * as React from "react";
import {render} from "@testing-library/react";
import {makeHookHarness} from "../make-hook-harness";
import * as MTH from "../make-test-harness";

describe("#makeHookHarness", () => {
    it("should call makeTestHarness", () => {
        // Arrange
        const makeTestHarnessSpy = jest.spyOn(MTH, "makeTestHarness");
        const adapters = {
            adapter: jest.fn(),
        } as const;
        const defaultConfigs = {
            adapter: {},
        } as const;

        // Act
        makeHookHarness(adapters, defaultConfigs);

        // Assert
        expect(makeTestHarnessSpy).toHaveBeenCalledWith(
            adapters,
            defaultConfigs,
        );
    });

    it("should return a function", () => {
        const adapters = {
            adapter: jest.fn(),
        } as const;
        const defaultConfigs = {
            adapter: {},
        } as const;

        // Act
        const result = makeHookHarness(adapters, defaultConfigs);

        // Assert
        // @ts-expect-error [FEI-5019] - TS2339 - Property 'toBeFunction' does not exist on type 'JestMatchers<(configs?: any) => Flow.AbstractComponent<any, any>>'.
        expect(result).toBeFunction();
    });

    describe("returned function", () => {
        it("should invoke the function returned by makeTestHarness with component and the configs", () => {
            // Arrange
            const harnessSpy = jest.fn();
            jest.spyOn(MTH, "makeTestHarness").mockReturnValue(harnessSpy);
            const adapters = {
                adapter: jest.fn(),
            } as const;
            const defaultConfigs = {
                adapter: {},
            } as const;
            const configs = {
                adapter: {},
            } as const;
            const hookHarness = makeHookHarness(adapters, defaultConfigs);

            // Act
            hookHarness(configs);

            // Assert
            expect(harnessSpy).toHaveBeenCalledWith(
                expect.any(Function),
                configs,
            );
        });

        it("should pass a component that just renders the children it is given", () => {
            // Arrange
            const harnessSpy = jest.fn();
            jest.spyOn(MTH, "makeTestHarness").mockReturnValue(harnessSpy);
            const adapters = {
                adapter: jest.fn(),
            } as const;
            const defaultConfigs = {
                adapter: {},
            } as const;
            const configs = {
                adapter: {},
            } as const;
            const children = "THE CHILDREN";

            // Act
            const hookHarness = makeHookHarness(adapters, defaultConfigs);
            hookHarness(configs);
            const Component = harnessSpy.mock.calls[0][0];
            const {container} = render(<Component>{children}</Component>);

            // Assert
            expect(container).toHaveTextContent(children);
        });
    });
});
