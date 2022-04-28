// @flow
import * as React from "react";
import {withRouter} from "react-router-dom";
import {render} from "@testing-library/react";
import * as Router from "../router.js";

describe("Router.adapter", () => {
    describe.each`
        type          | config
        ${"string"}   | ${"/math"}
        ${"location"} | ${{location: "/math"}}
        ${"full"}     | ${{initialEntries: ["/math"]}}
    `("with $type config", ({config}) => {
        it("should allow navigation", () => {
            // Arrange
            const historyListen = jest.fn();
            const HistoryListener = withRouter(({history}): React.Node => {
                React.useEffect(() => history.listen(historyListen), [history]);
                if (history.location.pathname === "/math") {
                    history.push("/math/calculator");
                }
                return null;
            });

            // Act
            render(Router.adapter(<HistoryListener />, config));

            // Assert
            expect(historyListen).not.toHaveBeenCalled();
        });

        it("should have default route match of root /", () => {
            // Arrange
            const matchCatcherFn = jest.fn();
            const MatchCatcher = withRouter(({match, history}): React.Node => {
                React.useEffect(() => {
                    if (history.location.pathname === "/math") {
                        history.push("/math/calculator");
                    }
                    matchCatcherFn(match);
                }, [match, history]);
                return null;
            });

            // Act
            render(Router.adapter(<MatchCatcher />, config));

            // Assert
            expect(matchCatcherFn).toHaveBeenLastCalledWith(
                expect.objectContaining({
                    path: "/",
                    url: "/",
                }),
            );
        });
    });

    describe.each`
        type          | config
        ${"location"} | ${{location: "/math/calculator", path: "/math/*"}}
        ${"full"}     | ${{initialEntries: ["/math/calculator"], path: "/math/*"}}
    `("with $type config including path", ({config}) => {
        it("should include routing for the given path", () => {
            // Arrange
            const matchCatcherFn = jest.fn();
            const MatchCatcher = withRouter(({match}): React.Node => {
                React.useEffect(() => {
                    matchCatcherFn(match);
                }, [match]);
                return null;
            });

            // Act
            render(Router.adapter(<MatchCatcher />, config));

            // Assert
            expect(matchCatcherFn).toHaveBeenLastCalledWith(
                expect.objectContaining({
                    isExact: true,
                    path: "/math/*",
                    url: "/math/calculator",
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
            };

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
            const historyListen = jest.fn();
            const HistoryListener = withRouter(({history}): React.Node => {
                React.useEffect(() => history.listen(historyListen), [history]);
                if (history.location.pathname === "/math") {
                    history.push("/math/calculator");
                }
                return null;
            });

            // Act
            render(
                Router.adapter(<HistoryListener />, {
                    location: "/math",
                    forceStatic: true,
                }),
            );

            // Assert
            expect(historyListen).not.toHaveBeenCalled();
        });
    });
});
