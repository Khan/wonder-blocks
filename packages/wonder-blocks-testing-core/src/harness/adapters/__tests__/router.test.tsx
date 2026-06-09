import * as React from "react";
import {Redirect, useLocation as useLocationV5} from "react-router-dom";
import {
    useLocation,
    useNavigate,
    useLoaderData,
    useRouteError,
} from "react-router-dom-v5-compat";
import {render, screen} from "@testing-library/react";
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

    describe("data-routes mode", () => {
        const LoaderConsumer = (): React.ReactElement => {
            const data = useLoaderData() as {greeting: string};
            return <div>{data.greeting}</div>;
        };

        const RouteErrorConsumer = (): React.ReactElement => {
            const error = useRouteError() as Error;
            return <div>Caught: {error.message}</div>;
        };

        it("should mount the harnessed component as the matched leaf route's element (array form)", async () => {
            // Arrange
            const Component = () => <div>CALCULATOR</div>;
            const config = {
                routes: [{path: "/math", children: [{path: "calculator"}]}],
                initialEntries: ["/math/calculator"],
            };

            // Act
            render(Router.adapter(<Component />, config));

            // Assert
            expect(await screen.findByText("CALCULATOR")).toBeInTheDocument();
        });

        it("should run a route loader and pass resolved data to the component (function form)", async () => {
            // Arrange
            const config = {
                routes: (harnessedComponent: React.ReactNode) => [
                    {
                        path: "/",
                        loader: () => ({greeting: "hello"}),
                        element: harnessedComponent,
                    },
                ],
                initialEntries: ["/"],
            };

            // Act
            render(Router.adapter(<LoaderConsumer />, config));

            // Assert
            expect(await screen.findByText("hello")).toBeInTheDocument();
        });

        it("should render the errorElement when a route loader rejects (function form)", async () => {
            // Arrange
            const config = {
                routes: (harnessedComponent: React.ReactNode) => [
                    {
                        path: "/",
                        loader: () => {
                            throw new Error("loader failed");
                        },
                        element: <div>content</div>,
                        errorElement: harnessedComponent,
                    },
                ],
                initialEntries: ["/"],
            };

            // Act
            render(Router.adapter(<RouteErrorConsumer />, config));

            // Assert
            expect(
                await screen.findByText("Caught: loader failed"),
            ).toBeInTheDocument();
        });

        it("should render the errorElement synchronously from pre-resolved hydrationData", () => {
            // Arrange
            const config = {
                routes: (harnessedComponent: React.ReactNode) => [
                    {
                        id: "root",
                        path: "/",
                        loader: () => ({}),
                        element: <div>content</div>,
                        errorElement: harnessedComponent,
                    },
                ],
                initialEntries: ["/"],
                hydrationData: {
                    loaderData: {},
                    errors: {root: new Error("hydrated failure")},
                },
            };

            // Act
            render(Router.adapter(<RouteErrorConsumer />, config));

            // Assert
            expect(
                screen.getByText("Caught: hydrated failure"),
            ).toBeInTheDocument();
        });

        it("should not run route loaders when hydrationData is provided", () => {
            // Arrange
            const loader = jest.fn(() => ({greeting: "hi"}));
            const config = {
                routes: (harnessedComponent: React.ReactNode) => [
                    {
                        id: "root",
                        path: "/",
                        loader,
                        element: harnessedComponent,
                    },
                ],
                initialEntries: ["/"],
                hydrationData: {
                    loaderData: {root: {greeting: "hydrated hi"}},
                },
            };

            // Act
            render(Router.adapter(<LoaderConsumer />, config));

            // Assert
            expect(loader).not.toHaveBeenCalled();
        });

        it("should throw if no route matches the location (array form)", () => {
            // Arrange
            const config = {
                routes: [{path: "/math"}],
                initialEntries: ["/science"],
            };

            // Act
            const underTest = () => Router.adapter(<div />, config);

            // Assert
            expect(underTest).toThrow(
                /No route in `routes` matches the location/,
            );
        });

        it("should throw if the matched leaf route already defines an element (array form)", () => {
            // Arrange
            const config = {
                routes: [{path: "/math", element: <div>existing</div>}],
                initialEntries: ["/math"],
            };

            // Act
            const underTest = () => Router.adapter(<div />, config);

            // Assert
            expect(underTest).toThrow(/already defines an `element`/);
        });

        it("should throw a helpful error when the Fetch API is unavailable and loaders would run", () => {
            // Arrange
            // @ts-expect-error: simulate an environment without the Fetch API.
            delete globalThis.Request;
            const config = {
                routes: (harnessedComponent: React.ReactNode) => [
                    {
                        path: "/",
                        loader: () => ({}),
                        element: harnessedComponent,
                    },
                ],
                initialEntries: ["/"],
            };

            // Act
            const underTest = () => Router.adapter(<div />, config);

            // Assert
            expect(underTest).toThrow(/require the Fetch API `Request` global/);
        });
    });
});
