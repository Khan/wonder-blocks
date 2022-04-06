// flow
import * as wst from "@khanacademy/wonder-stuff-testing";

describe("ResponseImpl", () => {
    const globalResponse = globalThis.Response;

    beforeEach(() => {
        if (globalResponse) {
            delete globalThis.Response;
        }
    });

    afterEach(() => {
        if (globalResponse) {
            globalThis.Response = globalResponse;
        } else {
            delete globalThis.Response;
        }
    });

    it("should use Response from node-fetch if Response does not exist", () => {
        // Arrange

        // Act
        const {ResponseImpl: result, NodeFetchResponse} =
            wst.jest.isolateModules(() => ({
                ResponseImpl: require("../response-impl.js").ResponseImpl,
                NodeFetchResponse: require("node-fetch").Response,
            }));

        // Assert
        expect(result).toBe(NodeFetchResponse);
    });

    it("should return the existing Response type if it exists", () => {
        // Arrange
        globalThis.Response = class CustomResponse {};

        // Act
        const result = wst.jest.isolateModules(
            () => require("../response-impl.js").ResponseImpl,
        );

        // Assert
        expect(result).toBe(globalThis.Response);
    });
});
