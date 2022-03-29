// @flow
import * as SetupModule from "../setup.js";
import * as CombineOptionsModule from "../combine-options.js";
import {fixtures} from "../fixtures.js";

jest.mock("../setup.js");
jest.mock("../combine-options.js");

describe("#fixtures", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should declare a group on the configured adapter based off the given component", () => {
        // Arrange
        const fakeGroup = {
            closeGroup: jest.fn(),
        };
        const adapter = {
            declareGroup: jest.fn().mockReturnValue(fakeGroup),
            name: "testadapter",
        };
        jest.spyOn(SetupModule, "getConfiguration").mockReturnValue({
            adapter,
        });

        // Act
        fixtures(() => "COMPONENT", jest.fn());

        // Assert
        expect(adapter.declareGroup).toHaveBeenCalledWith({
            getDefaultTitle: expect.any(Function),
        });
    });

    it("should declare a group on the configured adapter with the given title and description", () => {
        // Arrange
        const fakeGroup = {
            closeGroup: jest.fn(),
        };
        const adapter = {
            declareGroup: jest.fn().mockReturnValue(fakeGroup),
            name: "testadapter",
        };
        jest.spyOn(SetupModule, "getConfiguration").mockReturnValue({
            adapter,
        });

        // Act
        fixtures(
            {
                title: "TITLE",
                description: "DESCRIPTION",
                component: () => "COMPONENT",
            },
            jest.fn(),
        );

        // Assert
        expect(adapter.declareGroup).toHaveBeenCalledWith({
            title: "TITLE",
            description: "DESCRIPTION",
            getDefaultTitle: expect.any(Function),
        });
    });

    it("should default the title to the component.displayName in the absence of title", () => {
        // Arrange
        const fakeGroup = {
            closeGroup: jest.fn(),
        };
        const adapter = {
            declareGroup: jest.fn().mockReturnValue(fakeGroup),
            name: "testadapter",
        };
        jest.spyOn(SetupModule, "getConfiguration").mockReturnValue({
            adapter,
        });
        const component = () => "COMPONENT";
        component.displayName = "DISPLAYNAME";

        // Act
        fixtures(
            {
                component,
            },
            jest.fn(),
        );
        const {getDefaultTitle} = adapter.declareGroup.mock.calls[0][0];
        const result = getDefaultTitle();

        // Assert
        expect(result).toBe("DISPLAYNAME");
    });

    it("should default the title to the component.name in the absence of component.displayName", () => {
        // Arrange
        const fakeGroup = {
            closeGroup: jest.fn(),
        };
        const adapter = {
            declareGroup: jest.fn().mockReturnValue(fakeGroup),
            name: "testadapter",
        };
        jest.spyOn(SetupModule, "getConfiguration").mockReturnValue({
            adapter,
        });
        const component = function FUNCTIONNAME() {
            return "COMPONENT";
        };

        // Act
        fixtures(component, jest.fn());
        const {getDefaultTitle} = adapter.declareGroup.mock.calls[0][0];
        const result = getDefaultTitle();

        // Assert
        expect(result).toBe("FUNCTIONNAME");
    });

    it("should default the title to 'Component' in the absence of component.name", () => {
        // Arrange
        const fakeGroup = {
            closeGroup: jest.fn(),
        };
        const adapter = {
            declareGroup: jest.fn().mockReturnValue(fakeGroup),
            name: "testadapter",
        };
        jest.spyOn(SetupModule, "getConfiguration").mockReturnValue({
            adapter,
        });

        // Act
        fixtures(() => "test", jest.fn());
        const {getDefaultTitle} = adapter.declareGroup.mock.calls[0][0];
        const result = getDefaultTitle();

        // Assert
        expect(result).toBe("Component");
    });

    it("should invoke the passed fn with function argument", () => {
        // Arrange
        const fakeGroup = {
            declareFixture: jest.fn(),
            closeGroup: jest.fn(),
        };
        const adapter = {
            declareGroup: jest.fn().mockReturnValue(fakeGroup),
            name: "testadapter",
        };
        jest.spyOn(SetupModule, "getConfiguration").mockReturnValue({
            adapter,
        });
        const fn = jest.fn();

        // Act
        fixtures(
            {
                title: "GROUP_TITLE",
                description: "GROUP_DESCRIPTION",
                component: () => "COMPONENT",
            },
            fn,
        );

        // Assert
        expect(fn).toHaveBeenCalledWith(expect.any(Function));
    });

    it("should combine additionalAdapterOptions for the appropriate adapter with defaultAdapterOptions", () => {
        // Arrange
        const combineOptionsSpy = jest.spyOn(
            CombineOptionsModule,
            "combineOptions",
        );
        const fakeGroup = {
            declareFixture: jest.fn(),
            closeGroup: jest.fn(),
        };
        const adapter = {
            declareGroup: jest.fn().mockReturnValue(fakeGroup),
            name: "testadapter",
        };
        const defaultAdapterOptions = {
            foo: "bar",
        };
        jest.spyOn(SetupModule, "getConfiguration").mockReturnValue({
            adapter,
            defaultAdapterOptions,
        });
        const additionalTestAdapterOptions = {
            bim: "bop",
        };

        // Act
        fixtures(
            {
                component: () => "COMPONENT",
                additionalAdapterOptions: {
                    testadapter: additionalTestAdapterOptions,
                    otheradapterwedontcareabout: {
                        fig: "fug",
                    },
                },
            },
            jest.fn(),
        );

        // Assert
        expect(combineOptionsSpy).toHaveBeenCalledWith(
            defaultAdapterOptions,
            additionalTestAdapterOptions,
        );
    });

    it("should call group.closeGroup with the combined adapter options", () => {
        // Arrange
        jest.spyOn(CombineOptionsModule, "combineOptions").mockReturnValue(
            "COMBINED_OPTIONS",
        );
        const fakeGroup = {
            declareFixture: jest.fn(),
            closeGroup: jest.fn(),
        };
        const adapter = {
            declareGroup: jest.fn().mockReturnValue(fakeGroup),
            name: "testadapter",
        };
        const defaultAdapterOptions = {
            foo: "bar",
        };
        jest.spyOn(SetupModule, "getConfiguration").mockReturnValue({
            adapter,
            defaultAdapterOptions,
        });
        const additionalTestAdapterOptions = {
            bim: "bop",
        };

        // Act
        fixtures(
            {
                component: () => "COMPONENT",
                additionalAdapterOptions: {
                    testadapter: additionalTestAdapterOptions,
                    otheradapterwedontcareabout: {
                        fig: "fug",
                    },
                },
            },
            jest.fn(),
        );

        // Assert
        expect(fakeGroup.closeGroup).toHaveBeenCalledWith("COMBINED_OPTIONS");
    });

    it("should return the result of group.closeGroup", () => {
        // Arrange
        const fakeGroup = {
            declareFixture: jest.fn(),
            closeGroup: jest.fn().mockReturnValue("RESULT"),
        };
        const adapter = {
            declareGroup: jest.fn().mockReturnValue(fakeGroup),
            name: "testadapter",
        };
        jest.spyOn(SetupModule, "getConfiguration").mockReturnValue({
            adapter,
        });

        // Act
        const result = fixtures(
            {
                component: () => "COMPONENT",
            },
            jest.fn(),
        );

        // Assert
        expect(result).toEqual("RESULT");
    });

    describe("injected fixture fn", () => {
        it("should call group.declareFixture with description and props getter", () => {
            // Arrange
            const fakeGroup = {
                declareFixture: jest.fn(),
                closeGroup: jest.fn(),
            };
            const adapter = {
                declareGroup: jest.fn().mockReturnValue(fakeGroup),
                name: "testadapter",
            };
            jest.spyOn(SetupModule, "getConfiguration").mockReturnValue({
                adapter,
            });
            const component = () => "COMPONENT";

            // Act
            fixtures(
                {
                    title: "GROUP_TITLE",
                    description: "GROUP_DESCRIPTION",
                    component,
                },
                (fixture) => {
                    fixture("FIXTURE_DESCRIPTION", {these: "areProps"});
                },
            );

            // Assert
            expect(fakeGroup.declareFixture).toHaveBeenCalledWith({
                description: "FIXTURE_DESCRIPTION",
                getProps: expect.any(Function),
                component,
            });
        });

        it("should pass wrapper component to group.declareFixture", () => {
            // Arrange
            const fakeGroup = {
                declareFixture: jest.fn(),
                closeGroup: jest.fn(),
            };
            const adapter = {
                declareGroup: jest.fn().mockReturnValue(fakeGroup),
                name: "testadapter",
            };
            jest.spyOn(SetupModule, "getConfiguration").mockReturnValue({
                adapter,
            });
            const defaultWrapper = () => "DEFAULT_WRAPPER";
            const wrapper = () => "WRAPPER";

            // Act
            fixtures(
                {
                    title: "GROUP_TITLE",
                    description: "GROUP_DESCRIPTION",
                    component: () => "COMPONENT",
                    defaultWrapper,
                },
                (fixture) => {
                    fixture(
                        "FIXTURE_DESCRIPTION",
                        {these: "areProps"},
                        wrapper,
                    );
                },
            );

            // Assert
            expect(fakeGroup.declareFixture).toHaveBeenCalledWith({
                description: "FIXTURE_DESCRIPTION",
                getProps: expect.any(Function),
                component: wrapper,
            });
        });

        it("should pass defaultWrapper component to group.declareFixture if no wrapper", () => {
            // Arrange
            const fakeGroup = {
                declareFixture: jest.fn(),
                closeGroup: jest.fn(),
            };
            const adapter = {
                declareGroup: jest.fn().mockReturnValue(fakeGroup),
                name: "testadapter",
            };
            jest.spyOn(SetupModule, "getConfiguration").mockReturnValue({
                adapter,
            });
            const defaultWrapper = () => "DEFAULT_WRAPPER";

            // Act
            fixtures(
                {
                    title: "GROUP_TITLE",
                    description: "GROUP_DESCRIPTION",
                    component: () => "COMPONENT",
                    defaultWrapper,
                },
                (fixture) => {
                    fixture("FIXTURE_DESCRIPTION", {these: "areProps"});
                },
            );

            // Assert
            expect(fakeGroup.declareFixture).toHaveBeenCalledWith({
                description: "FIXTURE_DESCRIPTION",
                getProps: expect.any(Function),
                component: defaultWrapper,
            });
        });

        describe("getProps fn passed to group.declareFixture", () => {
            it("should return the props when props is an object", () => {
                // Arrange
                const fakeGroup = {
                    declareFixture: jest.fn(),
                    closeGroup: jest.fn(),
                };
                const adapter = {
                    declareGroup: jest.fn().mockReturnValue(fakeGroup),
                    name: "testadapter",
                };
                jest.spyOn(SetupModule, "getConfiguration").mockReturnValue({
                    adapter,
                });

                // Act
                fixtures(
                    {
                        component: () => "COMPONENT",
                    },
                    (fixture) => {
                        fixture("FIXTURE_DESCRIPTION", {these: "areProps"});
                    },
                );
                const getPropsFn =
                    fakeGroup.declareFixture.mock.calls[0][0].getProps;
                const result = getPropsFn("OPTIONS");

                // Assert
                expect(result).toEqual({these: "areProps"});
            });

            it("should invoke the props function with given options when props is a function", () => {
                // Arrange
                const fakeGroup = {
                    declareFixture: jest.fn(),
                    closeGroup: jest.fn(),
                };
                const adapter = {
                    declareGroup: jest.fn().mockReturnValue(fakeGroup),
                    name: "testadapter",
                };
                jest.spyOn(SetupModule, "getConfiguration").mockReturnValue({
                    adapter,
                });
                const props = jest.fn().mockReturnValue({these: "areProps"});

                // Act
                fixtures(
                    {
                        component: () => "COMPONENT",
                    },
                    (fixture) => {
                        fixture("FIXTURE_DESCRIPTION", props);
                    },
                );
                const getPropsFn =
                    fakeGroup.declareFixture.mock.calls[0][0].getProps;
                getPropsFn("OPTIONS");

                // Assert
                expect(props).toHaveBeenCalledWith("OPTIONS");
            });

            it("should return the result of the props function when props is a function", () => {
                // Arrange
                const fakeGroup = {
                    declareFixture: jest.fn(),
                    closeGroup: jest.fn(),
                };
                const adapter = {
                    declareGroup: jest.fn().mockReturnValue(fakeGroup),
                    name: "testadapter",
                };
                jest.spyOn(SetupModule, "getConfiguration").mockReturnValue({
                    adapter,
                });
                const props = jest.fn().mockReturnValue({these: "areProps"});

                // Act
                fixtures(
                    {
                        component: () => "COMPONENT",
                    },
                    (fixture) => {
                        fixture("FIXTURE_DESCRIPTION", props);
                    },
                );
                const getPropsFn =
                    fakeGroup.declareFixture.mock.calls[0][0].getProps;
                const result = getPropsFn("OPTIONS");

                // Assert
                expect(result).toEqual({these: "areProps"});
            });
        });
    });
});
