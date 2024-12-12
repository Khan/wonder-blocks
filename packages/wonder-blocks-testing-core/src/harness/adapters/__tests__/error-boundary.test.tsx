import * as React from "react";
import {it, describe, expect} from "@jest/globals";
import {render, renderHook} from "@testing-library/react";

import * as ErrorBoundary from "../error-boundary";

describe("ErrorBoundary.adapter", () => {
    describe("when rendering components", () => {
        it("should render the children when no error is thrown", () => {
            // Arrange
            const onError = jest.fn();

            // Act
            const {container} = render(
                ErrorBoundary.adapter(<div>CHILDREN</div>, onError),
            );

            // Assert
            expect(container).toHaveTextContent("CHILDREN");
        });

        it("should not call the onError callback when no error is thrown during rendering", () => {
            // Arrange
            const onError = jest.fn();
            const Component = () => <>SUCCESS</>;

            // Act
            render(ErrorBoundary.adapter(<Component />, onError));

            // Assert
            expect(onError).not.toHaveBeenCalled();
        });

        it("should call the onError callback when an error is thrown during rendering", () => {
            // Arrange
            jest.spyOn(console, "error").mockImplementation(() => {});
            const onError = jest.fn();
            const error = new Error("ErrorComponent");
            const ErrorComponent = () => {
                throw error;
            };

            // Act
            render(ErrorBoundary.adapter(<ErrorComponent />, onError));

            // Assert
            expect(onError).toHaveBeenCalledWith(error, expect.anything());
        });

        it("should render the error message returned by onError", () => {
            // Arrange
            jest.spyOn(console, "error").mockImplementation(() => {});
            const onError = jest.fn(() => "ERROR");
            const error = new Error("ErrorComponent");
            const ErrorComponent = () => {
                throw error;
            };

            // Act
            const {container} = render(
                ErrorBoundary.adapter(<ErrorComponent />, onError),
            );

            // Assert
            expect(container).toHaveTextContent("ERROR");
        });

        it("should render a default error message if onError does not return anything", () => {
            // Arrange
            jest.spyOn(console, "error").mockImplementation(() => {});
            const onError = jest.fn();
            const error = new Error("ErrorComponent");
            const ErrorComponent = () => {
                throw error;
            };

            // Act
            const {container} = render(
                ErrorBoundary.adapter(<ErrorComponent />, onError),
            );

            // Assert
            expect(container).toHaveTextContent("An error occurred");
        });
    });

    describe("when rendering hooks", () => {
        it("should call the onError callback when an error is thrown during rendering", () => {
            // Arrange
            jest.spyOn(console, "error").mockImplementation(() => {});
            const onError = jest.fn();
            const error = new Error("ErrorHook");
            const hook = () => {
                throw error;
            };
            const Component = ({children}: any) =>
                ErrorBoundary.adapter(children, onError);

            // Act
            renderHook(hook, {wrapper: Component});

            // Assert
            expect(onError).toHaveBeenCalledWith(error, expect.anything());
        });

        it("should not call the onError callback when no error is thrown during rendering", () => {
            // Arrange
            const onError = jest.fn();
            const hook = () => "SUCCESS";
            const Component = ({children}: any) =>
                ErrorBoundary.adapter(children, onError);

            // Act
            renderHook(hook, {wrapper: Component});

            // Assert
            expect(onError).not.toHaveBeenCalled();
        });
    });
});
