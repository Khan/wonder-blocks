// @flow
import {Adapter} from "../adapter.js";

import * as AdapterGroupModule from "../adapter-group.js";

jest.mock("../adapter-group.js");

describe("Adapter", () => {
    describe("#constructor", () => {
        it.each([null, 8, "", "     "])(
            "should throw if the name is invalid (%s)",
            (invalidName) => {
                // Arrange

                // Act
                const act = () => new Adapter(invalidName, () => {});

                // Assert
                expect(act).toThrowErrorMatchingSnapshot();
            },
        );

        it.each([null, 5])(
            "should throw if closeGroupFn is invalid",
            (invalidCloseGroupFn) => {
                // Arrange

                // Act
                const act = () => new Adapter("name", invalidCloseGroupFn);

                // Assert
                expect(act).toThrowErrorMatchingSnapshot();
            },
        );
    });

    describe("@name", () => {
        it("should match the value passed during construction", () => {
            // Arrange
            const name = "adapter_name";
            const adapter = new Adapter(name, () => {});

            // Act
            const result = adapter.name;

            // Assert
            expect(result).toBe(name);
        });
    });

    describe("#declareGroup", () => {
        it("should pass the closeGroupFn and options to the adapter group", () => {
            // Arrange
            const closeGroupFn = jest.fn();
            const adapter = new Adapter("adapter_name", closeGroupFn);
            const options = {
                title: "group_title",
                description: "group_description",
                getDefaultTitle: () => {
                    throw new Error("NOT IMPLEMENTED");
                },
            };
            const adapterGroupSpy = jest
                .spyOn(AdapterGroupModule, "AdapterGroup")
                .mockImplementation(() => {});

            // Act
            adapter.declareGroup(options);

            // Assert
            expect(adapterGroupSpy).toHaveBeenCalledWith(closeGroupFn, options);
        });

        it("should return the created AdapterGroup", () => {
            // Arrange
            const adapter = new Adapter("adapter_name", () => {});
            const adapterGroup: any = {
                whatAmI: "ADAPTER_GROUP",
            };
            jest.spyOn(AdapterGroupModule, "AdapterGroup").mockImplementation(
                () => adapterGroup,
            );

            // Act
            const result = adapter.declareGroup({
                title: "group_title",
                description: "group_description",
                getDefaultTitle: () => {
                    throw new Error("NOT IMPLEMENTED");
                },
            });

            // Assert
            expect(result).toBe(adapterGroup);
        });
    });
});
