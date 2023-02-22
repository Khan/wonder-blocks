// @flow
import {jest as ws} from "@khanacademy/wonder-stuff-testing";
import * as MHH from "../make-hook-harness";
import {DefaultAdapters, DefaultConfigs} from "../adapters/adapters";

jest.mock("../make-hook-harness.js", () => {
    const returnValueFake = {
        thisisa: "PRETEND REACT COMPONENT",
    };
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
        await ws.isolateModules(() => import("../hook-harness.js"));

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
        };
        // $FlowIgnore[prop-missing]  - we add this into our mock at the top.
        const [{harnessFake}, {hookHarness}] = await ws.isolateModules(() =>
            Promise.all([
                import("../make-hook-harness.js"),
                import("../hook-harness.js"),
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
        };
        // $FlowIgnore[prop-missing]  - we add this into our mock at the top.
        const [{returnValueFake}, {hookHarness}] = await ws.isolateModules(() =>
            Promise.all([
                import("../make-hook-harness.js"),
                import("../hook-harness.js"),
            ]),
        );

        // Act
        const result = hookHarness(config);

        // Assert
        expect(result).toBe(returnValueFake);
    });
});
