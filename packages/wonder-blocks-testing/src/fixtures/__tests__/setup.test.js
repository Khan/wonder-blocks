// @flow
import {isolateModules} from "../../jest/isolate-modules.js";

describe("#getConfiguration", () => {
    it("should return the configuration passed during setup", () => {
        // Arrange
        const {setup, getConfiguration} = isolateModules(() =>
            require("../setup.js"),
        );
        const configuration = {
            adapter: {
                name: "mytestadapter",
                declareGroup: jest.fn(),
            },
            defaultAdapterOptions: {},
        };
        setup(configuration);

        // Act
        const result = getConfiguration();

        // Assert
        expect(result).toBe(configuration);
    });

    it("should throw if setup has not been performed", () => {
        // Arrange
        const {getConfiguration} = isolateModules(() => require("../setup.js"));

        // Act
        const underTest = () => getConfiguration();

        // Assert
        expect(underTest).toThrowErrorMatchingInlineSnapshot(
            `"Not configured"`,
        );
    });
});

describe("#setup", () => {
    it("should set the configuration returned by getConfiguration", () => {
        // Arrange
        const {setup, getConfiguration} = isolateModules(() =>
            require("../setup.js"),
        );
        const configuration1 = {
            adapter: {
                name: "mytestadapter1",
                declareGroup: jest.fn(),
            },
            defaultAdapterOptions: {},
        };
        const configuration2 = {
            adapter: {
                name: "mytestadapter2",
                declareGroup: jest.fn(),
            },
            defaultAdapterOptions: {},
        };

        // Act
        setup(configuration1);
        setup(configuration2);
        const result = getConfiguration();

        // Assert
        expect(result).toBe(configuration2);
    });
});
