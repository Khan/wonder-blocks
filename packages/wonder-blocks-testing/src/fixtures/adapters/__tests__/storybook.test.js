// @flow
import * as React from "react";
import {render, screen} from "@testing-library/react";
import * as AddonActionsModule from "@storybook/addon-actions";
import {getAdapter} from "../storybook.js";

import * as AdapterModule from "../adapter.js";

jest.mock("../adapter.js");
jest.mock("@storybook/addon-actions");

describe("Storybook Adapter", () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    describe("#getAdapter", () => {
        it("should create an Adapter instance", () => {
            // Arrange
            const adapterSpy = jest
                .spyOn(AdapterModule, "Adapter")
                .mockImplementation(() => {});

            // Act
            getAdapter();

            // Assert
            expect(adapterSpy).toHaveBeenCalledWith(
                "storybook",
                expect.any(Function),
            );
        });

        it("should return the created Adapter instance", () => {
            // Arrangejest
            const fakeAdapter = {
                iAmA: "FAKE_ADAPTER",
            };
            jest.spyOn(AdapterModule, "Adapter").mockImplementation(
                () => fakeAdapter,
            );

            // Act
            const result = getAdapter();

            // Assert
            expect(result).toBe(fakeAdapter);
        });

        describe("closeGroupFn", () => {
            it("should return the storybook exports", () => {
                // Arrange
                const adapterSpy = jest
                    .spyOn(AdapterModule, "Adapter")
                    .mockImplementation(() => {});
                getAdapter();
                const closeGroupFn = adapterSpy.mock.calls[0][1];

                // Act
                const result = closeGroupFn(
                    {
                        title: "TITLE",
                        description: "DESCRIPTION",
                    },
                    {
                        adapterOption1: "adapterOption1",
                        adapterOption2: "adapterOption2",
                    },
                    [
                        {
                            description:
                                "🎉 This is a story with legal and illegal characters",
                            component: () => "I AM A COMPONENT",
                            getProps: () => ({
                                these: "areProps",
                            }),
                        },
                    ],
                );

                // Assert
                expect(result).toStrictEqual({
                    default: {
                        title: "TITLE",
                        adapterOption1: "adapterOption1",
                        adapterOption2: "adapterOption2",
                    },
                    "1ThisIsAStoryWithLegalAndIllegalCharacters":
                        expect.any(Function),
                });
            });
        });

        describe("exported story", () => {
            it("should inject API into getProps generator", () => {
                // Arrange
                const adapterSpy = jest
                    .spyOn(AdapterModule, "Adapter")
                    .mockImplementation(() => {});
                getAdapter();
                const closeGroupFn = adapterSpy.mock.calls[0][1];
                const getPropsStub = jest.fn();

                // Act
                closeGroupFn(
                    {
                        title: "TITLE",
                        description: "DESCRIPTION",
                    },
                    null,
                    [
                        {
                            description:
                                "🎉 This is a story with legal and illegal characters",
                            component: () => "I AM A COMPONENT",
                            getProps: getPropsStub,
                        },
                    ],
                );

                // Assert
                expect(getPropsStub).toHaveBeenCalledWith({
                    log: expect.any(Function),
                });
            });

            it("should inject log function that logs to storybook actions", () => {
                // Arrange
                const adapterSpy = jest
                    .spyOn(AdapterModule, "Adapter")
                    .mockImplementation(() => {});
                getAdapter();
                const actionReturnFn = jest.fn();
                const actionSpy = jest
                    .spyOn(AddonActionsModule, "action")
                    .mockReturnValue(actionReturnFn);
                const closeGroupFn = adapterSpy.mock.calls[0][1];
                const getPropsStub = jest.fn();
                closeGroupFn(
                    {
                        title: "TITLE",
                        description: "DESCRIPTION",
                    },
                    null,
                    [
                        {
                            description:
                                "🎉 This is a story with legal and illegal characters",
                            component: () => "I AM A COMPONENT",
                            getProps: getPropsStub,
                        },
                    ],
                );
                const {log: logFn} = getPropsStub.mock.calls[0][0];

                // Act
                logFn("MESSAGE", "ARG1", "ARG2");

                // Assert
                expect(actionSpy).toHaveBeenCalledWith("MESSAGE");
                expect(actionReturnFn).toHaveBeenCalledWith("ARG1", "ARG2");
            });

            it("should have args attached", () => {
                // Arrange
                const adapterSpy = jest
                    .spyOn(AdapterModule, "Adapter")
                    .mockImplementation(() => {});
                getAdapter();
                const closeGroupFn = adapterSpy.mock.calls[0][1];
                const props = {
                    this: "isAProp",
                    andSo: "isThis",
                };

                // Act
                const {"1ASimpleStory": result} = closeGroupFn(
                    {
                        title: "TITLE",
                        description: "DESCRIPTION",
                    },
                    null,
                    [
                        {
                            description: "A simple story",
                            component: () => "I AM A COMPONENT",
                            getProps: () => props,
                        },
                    ],
                );

                // Assert
                expect(result).toHaveProperty("args", props);
            });

            it("should have story name attached", () => {
                // Arrange
                const adapterSpy = jest
                    .spyOn(AdapterModule, "Adapter")
                    .mockImplementation(() => {});
                getAdapter();
                const closeGroupFn = adapterSpy.mock.calls[0][1];

                // Act
                const {"1ASimpleStory": result} = closeGroupFn(
                    {
                        title: "TITLE",
                        description: "DESCRIPTION",
                    },
                    null,
                    [
                        {
                            description: "A simple story",
                            component: () => "I AM A COMPONENT",
                            getProps: () => ({}),
                        },
                    ],
                );

                // Assert
                expect(result).toHaveProperty("storyName", "1 A simple story");
            });

            it("should render the component", () => {
                // Arrange
                const adapterSpy = jest
                    .spyOn(AdapterModule, "Adapter")
                    .mockImplementation(() => {});
                getAdapter();
                const closeGroupFn = adapterSpy.mock.calls[0][1];
                const {"1ASimpleStory": Fixture} = closeGroupFn(
                    {
                        title: "TITLE",
                        description: "DESCRIPTION",
                    },
                    null,
                    [
                        {
                            description: "A simple story",
                            component: (props) =>
                                `I rendered ${JSON.stringify(props)}`,
                            getProps: () => ({}),
                        },
                    ],
                );

                // Act
                render(<Fixture aProp="aValue" />);

                // Assert
                expect(
                    screen.getByText('I rendered {"aProp":"aValue"}'),
                ).toBeInTheDocument();
            });

            it("should render the MountingComponent when provided", () => {
                // Arrange
                const adapterSpy = jest
                    .spyOn(AdapterModule, "Adapter")
                    .mockImplementation(() => {});
                const MountingComponent = (props) =>
                    "I AM A MOUNTING COMPONENT";
                getAdapter(MountingComponent);
                const closeGroupFn = adapterSpy.mock.calls[0][1];
                const {"1ASimpleStory": Fixture} = closeGroupFn(
                    {
                        title: "TITLE",
                        description: "DESCRIPTION",
                    },
                    null,
                    [
                        {
                            description: "A simple story",
                            component: (props) =>
                                `I rendered ${JSON.stringify(props)}`,
                            getProps: () => ({}),
                        },
                    ],
                );

                // Act
                render(<Fixture aProp="aValue" />);

                // Assert
                expect(
                    screen.getByText("I AM A MOUNTING COMPONENT"),
                ).toBeInTheDocument();
            });

            it("should render the mounting component with the expected API", () => {
                // Arrange
                // Have to use the real Adapter here or the closure around
                // the MountingComponent doesn't work for this test.
                const adapterSpy = jest.spyOn(AdapterModule, "Adapter");
                const mountingComponentStub = jest.fn().mockReturnValue(null);
                const MountingComponent = (props) =>
                    mountingComponentStub(props);
                getAdapter(MountingComponent);
                const closeGroupFn = adapterSpy.mock.calls[0][1];
                const Component = (props) =>
                    `I rendered ${JSON.stringify(props)}`;
                const {"1ASimpleStory": Fixture} = closeGroupFn(
                    {
                        title: "TITLE",
                        description: "DESCRIPTION",
                    },
                    null,
                    [
                        {
                            description: "A simple story",
                            component: Component,
                            getProps: () => ({}),
                        },
                    ],
                );

                // Act
                render(<Fixture aProp="aValue" />);

                // Assert
                expect(mountingComponentStub).toHaveBeenCalledWith({
                    component: Component,
                    props: {aProp: "aValue"},
                    log: expect.any(Function),
                });
            });
        });
    });
});
