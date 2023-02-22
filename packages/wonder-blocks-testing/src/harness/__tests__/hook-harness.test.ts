import {jest as ws} from "@khanacademy/wonder-stuff-testing";
import * as MHH from "../make-hook-harness";
import {DefaultAdapters, DefaultConfigs} from "../adapters/adapters";

jest.mock("../make-hook-harness", () => {
    const returnValueFake = {
        thisisa: "PRETEND REACT COMPONENT",
    } as const;
    const harnessFake = jest.fn().mockReturnValue(returnValueFake);
    return {
        harnessFake,
        returnValueFake,
        makeHookHarness: jest.fn().mockReturnValue(harnessFake),
    };
});

describe("#hookHarness", () => {
    it("should be created by calling makeHookHarness with the DefaultAdapters and DefaultConfigs", async () => {
        // Arrange
        const makeHookHarnessSpy = jest.spyOn(MHH, "makeHookHarness");

        // Act
        await ws.isolateModules(() => import("../hook-harness"));

        // Assert
        expect(makeHookHarnessSpy).toHaveBeenCalledWith(
            DefaultAdapters,
            DefaultConfigs,
        );
    });

    it("should invoke the function made by makeHookHarness", async () => {
        // Arrange
        const config = {
            router: "/boo",
        } as const;
        // @ts-expect-error [FEI-5019] - TS2339 - Property 'harnessFake' does not exist on type 'typeof import("/Users/kevinbarabash/khan/wonder-blocks/packages/wonder-blocks-testing/src/harness/make-hook-harness")'.
        const [{harnessFake}, {hookHarness}] = await ws.isolateModules(() =>
            Promise.all([
                import("../make-hook-harness"),
                import("../hook-harness"),
            ]),
        );

        // Act
        hookHarness(config);

        // Assert
        expect(harnessFake).toHaveBeenCalledWith(config);
    });

    it("should return the returned value of the function made by makeHookHarness", async () => {
        // Arrange
        const config = {
            router: "/boo",
        } as const;
        // @ts-expect-error [FEI-5019] - TS2339 - Property 'returnValueFake' does not exist on type 'typeof import("/Users/kevinbarabash/khan/wonder-blocks/packages/wonder-blocks-testing/src/harness/make-hook-harness")'.
        const [{returnValueFake}, {hookHarness}] = await ws.isolateModules(() =>
            Promise.all([
                import("../make-hook-harness"),
                import("../hook-harness"),
            ]),
        );

        // Act
        const result = hookHarness(config);

        // Assert
        expect(result).toBe(returnValueFake);
    });
});
