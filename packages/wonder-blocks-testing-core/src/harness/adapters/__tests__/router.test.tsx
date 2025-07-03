import * as React from "react";
import {Redirect, useLocation as useLocationV5} from "react-router-dom";
import {useLocation, useNavigate} from "react-router-dom-v5-compat";
import {render} from "@testing-library/react";
import * as Router from "../router";

describe("Router.adapter", () => {
    it("should throw if the config does not match any expecations", () => {
        // Arrange
        const badConfig: any = {
            bad: "config",
        };

        // Act
        const underTest = () => Router.adapter("CHILDREN", badConfig);

        // Assert
        expect(underTest).toThrowErrorMatchingInlineSnapshot(
            `"A location or initial history entries must be provided."`,
        );
    });

    describe.each`
        type          | config
        ${"string"}   | ${"/math"}
        ${"location"} | ${{location: "/math"}}
        ${"full"}     | ${{initialEntries: ["/math"]}}
    `("with $type config", ({config}: any) => {
        it("should allow navigation", () => {
            // Arrange
            const navigateListen = jest.fn();
            const NavigateListener = (): React.ReactElement | null => {
                const navigate = useNavigate();
                const location = useLocation();
                React.useEffect(() => navigateListen(location), [location]);
                if (location.pathname === "/math") {
                    navigate("/math/calculator");
                }
                return null;
            };

            // Act
            render(Router.adapter(<NavigateListener />, config));

            // Assert
            expect(navigateListen).toHaveBeenCalledOnce();
            expect(navigateListen).toHaveBeenCalledWith(
                expect.objectContaining({
                    pathname: "/math",
                }),
            );
        });

        it("should have default route match of /math", () => {
            // Arrange
            const locationCatcherFn = jest.fn();
            const LocationCatcher = (): React.ReactElement | null => {
                const location = useLocation();
                React.useEffect(() => {
                    locationCatcherFn(location);
                }, [location]);
                return null;
            };

            // Act
            render(Router.adapter(<LocationCatcher />, config));

            // Assert
            expect(locationCatcherFn).toHaveBeenLastCalledWith(
                expect.objectContaining({
                    pathname: "/math",
                }),
            );
        });
    });

    describe.each`
        type          | config
        ${"location"} | ${{location: "/math/calculator", path: "/math/*"}}
        ${"full"}     | ${{initialEntries: ["/math/calculator"], path: "/math/*"}}
    `("with $type config including path", ({config}: any) => {
        it("should include routing for the given path", () => {
            // Arrange
            const locationCatcherFn = jest.fn();
            const LocationCatcher = (): React.ReactElement | null => {
                const location = useLocation();
                React.useEffect(() => {
                    locationCatcherFn(location);
                }, [location]);
                return null;
            };

            // Act
            render(Router.adapter(<LocationCatcher />, config));

            // Assert
            expect(locationCatcherFn).toHaveBeenLastCalledWith(
                expect.objectContaining({
                    pathname: "/math/calculator",
                }),
            );
        });

        it("should throw if the path does not match the location", () => {
            // Arrange
            // This is going to cause an error to be logged, so let's silence
            // that.
            jest.spyOn(console, "error").mockImplementation(() => {});
            const badConfig = {
                ...config,
                path: "/something/else/entirely",
            } as const;

            // Act
            const underTest = () =>
                render(Router.adapter("CHILDREN", badConfig));

            // Assert
            expect(underTest).toThrowErrorMatchingSnapshot();
        });
    });

    describe("with forceStatic", () => {
        it("should not navigate", () => {
            // Arrange
            const navigateListen = jest.fn();
            const NavigateListener = (): React.ReactElement | null => {
                const navigate = useNavigate();
                const location = useLocation();
                React.useEffect(() => navigateListen(location), [location]);
                if (location.pathname === "/math") {
                    navigate("/math/calculator");
                }
                return null;
            };

            // Act
            render(
                Router.adapter(<NavigateListener />, {
                    location: "/math",
                    forceStatic: true,
                }),
            );

            // Assert
            expect(navigateListen).toHaveBeenCalledOnce();
            expect(navigateListen).toHaveBeenCalledWith(
                expect.objectContaining({
                    pathname: "/math",
                }),
            );
        });

        it("should support turning off the CompatRouter", () => {
            // Arrange
            const navigateListen = jest.fn();
            const NavigateListener = (): React.ReactElement | null => {
                const location = useLocationV5();
                React.useEffect(() => navigateListen(location), [location]);
                if (location.pathname === "/math") {
                    return <Redirect to="/math/calculator" />;
                }
                return null;
            };

            // Act
            render(
                Router.adapter(<NavigateListener />, {
                    location: "/math",
                    forceStatic: true,
                    disableCompatRouter: true,
                }),
            );

            // Assert
            expect(navigateListen).toHaveBeenCalledOnce();
            expect(navigateListen).toHaveBeenCalledWith(
                expect.objectContaining({
                    pathname: "/math",
                }),
            );
        });
    });

    describe("with initialEntries", () => {
        it("should use the defaultConfig location if initialEntries is empty", () => {
            // Arrange
            const locationCatcherFn = jest.fn();
            const LocationCatcher = (): React.ReactElement | null => {
                const location = useLocation();
                React.useEffect(() => {
                    locationCatcherFn(location);
                }, [location]);
                return null;
            };

            // Act
            render(
                Router.adapter(<LocationCatcher />, {
                    initialEntries: [],
                }),
            );

            // Assert
            expect(locationCatcherFn).toHaveBeenLastCalledWith(
                expect.objectContaining({
                    pathname: Router.defaultConfig.location,
                }),
            );
        });

        it("should set initialIndex prop on MemoryRouter if given in configuration", () => {
            // Arrange
            const locationCatcherFn = jest.fn();
            const LocationCatcher = (): React.ReactElement | null => {
                const location = useLocation();
                React.useEffect(() => {
                    locationCatcherFn(location);
                }, [location]);
                return null;
            };

            // Act
            render(
                Router.adapter(<LocationCatcher />, {
                    initialEntries: ["/location/old", "/location/current"],
                    initialIndex: 1,
                    path: "/location/*",
                }),
            );

            // Assert
            expect(locationCatcherFn).toHaveBeenLastCalledWith(
                expect.objectContaining({
                    pathname: "/location/current",
                }),
            );
        });
    });
});
