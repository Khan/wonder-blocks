// @flow
import {AdapterGroup} from "../adapter-group.js";

describe("AdapterGroup", () => {
    describe("#constructor", () => {
        it("should throw if closeGroupFn is not valid", () => {
            // Arrange
            const badCloseGroupFn: any = null;

            // Act
            const act = () =>
                new AdapterGroup(badCloseGroupFn, {
                    title: "TITLE",
                    description: null,
                    getDefaultTitle: () => {
                        throw new Error("NOT IMPLEMENTED");
                    },
                });

            expect(act).toThrowErrorMatchingInlineSnapshot(
                `"closeGroupFn must be a function"`,
            );
        });

        it.each([null, "a string"])(
            "should throw if options are not valid (%s)",
            (badOptions) => {
                // Arrange

                // Act
                const act = () => new AdapterGroup(() => {}, badOptions);

                // Assert
                expect(act).toThrowErrorMatchingSnapshot();
            },
        );
    });

    describe("#closeGroup", () => {
        it("should call closeGroupFn with group options and empty fixtures if there are none", () => {
            // Arrange
            const closeGroupFn = jest.fn();
            const groupOptions = {
                title: "TITLE",
                description: null,
                getDefaultTitle: () => {
                    throw new Error("NOT IMPLEMENTED");
                },
            };
            const adapterGroup = new AdapterGroup(closeGroupFn, groupOptions);

            // Act
            adapterGroup.closeGroup();

            // Assert
            expect(closeGroupFn).toHaveBeenCalledWith(groupOptions, null, []);
        });

        it("should call closeGroupFn with group options, adapter options,  and empty fixtures if there are none", () => {
            // Arrange
            const closeGroupFn = jest.fn();
            const groupOptions = {
                title: "TITLE",
                description: null,
                getDefaultTitle: () => {
                    throw new Error("NOT IMPLEMENTED");
                },
            };
            const adapterSpecificOptions = {
                adapterSpecificOption: "adapterSpecificOption",
            };
            const adapterGroup = new AdapterGroup(closeGroupFn, groupOptions);

            // Act
            adapterGroup.closeGroup(adapterSpecificOptions);

            // Assert
            expect(closeGroupFn).toHaveBeenCalledWith(
                groupOptions,
                adapterSpecificOptions,
                [],
            );
        });

        it("should call closeGroupFn with fixtures if some were declared", () => {
            // Arrange
            const closeGroupFn = jest.fn();
            const groupOptions = {
                title: "TITLE",
                description: "DESCRIPTION",
                getDefaultTitle: () => {
                    throw new Error("NOT IMPLEMENTED");
                },
            };
            const adapterGroup = new AdapterGroup(closeGroupFn, groupOptions);
            const fixture = {
                component: () => null,
                description: "FIXTURE_DESCRIPTION",
                getProps: jest.fn(),
            };

            // Act
            adapterGroup.declareFixture(fixture);
            adapterGroup.closeGroup();

            // Assert
            expect(closeGroupFn).toHaveBeenCalledWith(groupOptions, null, [
                fixture,
            ]);
        });

        it("should throw if called when group has already closed", () => {
            // Arrange
            const closeGroupFn = jest.fn();
            const groupOptions = {
                title: "TITLE",
                description: null,
                getDefaultTitle: () => {
                    throw new Error("NOT IMPLEMENTED");
                },
            };
            const adapterGroup = new AdapterGroup(closeGroupFn, groupOptions);
            adapterGroup.closeGroup();

            // Act
            const act = () => adapterGroup.closeGroup();

            // Assert
            expect(act).toThrowErrorMatchingInlineSnapshot(
                `"Group already closed"`,
            );
        });
    });

    describe("#declareFixture", () => {
        it.each([null, "a string"])(
            "should throw if options are not valid (%s)",
            (badFixtureOptions) => {
                // Arrange
                const closeGroupFn = jest.fn();
                const groupOptions = {
                    title: "TITLE",
                    description: null,
                    getDefaultTitle: () => {
                        throw new Error("NOT IMPLEMENTED");
                    },
                };
                const adapterGroup = new AdapterGroup(
                    closeGroupFn,
                    groupOptions,
                );

                // Act
                const act = () =>
                    adapterGroup.declareFixture(badFixtureOptions);

                // Assert
                expect(act).toThrowErrorMatchingSnapshot();
            },
        );

        it("should add fixtures for inclusion in the closeGroup call", () => {
            // Arrange
            const closeGroupFn = jest.fn();
            const groupOptions = {
                title: "TITLE",
                description: "DESCRIPTION",
                getDefaultTitle: () => {
                    throw new Error("NOT IMPLEMENTED");
                },
            };
            const adapterGroup = new AdapterGroup(closeGroupFn, groupOptions);
            const fixture1 = {
                component: () => null,
                description: "FIXTURE_DESCRIPTION1",
                getProps: jest.fn(),
            };
            const fixture2 = {
                component: () => null,
                description: "FIXTURE_DESCRIPTION2",
                getProps: jest.fn(),
            };

            // Act
            adapterGroup.declareFixture(fixture1);
            adapterGroup.declareFixture(fixture2);
            adapterGroup.closeGroup();

            // Assert
            expect(closeGroupFn).toHaveBeenCalledWith(groupOptions, null, [
                fixture1,
                fixture2,
            ]);
        });

        it("should throw if called when group has already closed", () => {
            // Arrange
            const closeGroupFn = jest.fn();
            const groupOptions = {
                title: "TITLE",
                description: null,
                getDefaultTitle: () => {
                    throw new Error("NOT IMPLEMENTED");
                },
            };
            const adapterGroup = new AdapterGroup(closeGroupFn, groupOptions);
            adapterGroup.closeGroup();

            // Act
            const act = () =>
                adapterGroup.declareFixture({
                    component: () => null,
                    description: "FIXTURE_DESCRIPTION",
                    getProps: jest.fn(),
                });

            // Assert
            expect(act).toThrowErrorMatchingInlineSnapshot(
                `"Cannot declare fixtures after closing the group"`,
            );
        });
    });
});
