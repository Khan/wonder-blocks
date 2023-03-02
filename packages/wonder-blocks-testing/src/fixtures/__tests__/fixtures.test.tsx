import * as React from "react";
import {render, screen} from "@testing-library/react";
import * as AddonActionsModule from "@storybook/addon-actions";
import {fixtures} from "../fixtures";

jest.mock("@storybook/addon-actions");

describe("fixtures", () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it("should create return a function", () => {
        // Arrange

        // Act
        const result = fixtures(() => <div />);

        // Assert
        expect(result).toBeFunction();
    });

    describe("returned function", () => {
        it("should return a story component function", () => {
            // Arrange
            const fixture = fixtures(() => <div />);

            // Act
            const result = fixture("My fixture", {});

            // Assert
            expect(result).toBeFunction();
        });

        it("should inject API into getProps generator", () => {
            // Arrange
            const fixture = fixtures(() => <div />);
            const getPropsFn = jest.fn();

            // Act
            fixture("My fixture", getPropsFn);

            // Assert
            expect(getPropsFn).toHaveBeenCalledWith({
                log: expect.any(Function),
                logHandler: expect.any(Function),
            });
        });

        it("should inject log function that logs to storybook actions", () => {
            // Arrange
            const fixture = fixtures(() => <div />);
            const getPropsFn = jest.fn();
            const actionReturnFn = jest.fn();
            const actionSpy = jest
                .spyOn(AddonActionsModule, "action")
                .mockReturnValue(actionReturnFn);
            fixture("My fixture", getPropsFn);
            const {log: logFn} = getPropsFn.mock.calls[0][0];

            // Act
            logFn("MESSAGE", "ARG1", "ARG2");

            // Assert
            expect(actionSpy).toHaveBeenCalledWith("MESSAGE");
            expect(actionReturnFn).toHaveBeenCalledWith("ARG1", "ARG2");
        });

        it("should inject logHandler function that logs to storybook actions", () => {
            // Arrange
            const fixture = fixtures(() => <div />);
            const getPropsFn = jest.fn();
            const actionReturnFn = jest.fn();
            const actionSpy = jest
                .spyOn(AddonActionsModule, "action")
                .mockReturnValue(actionReturnFn);
            fixture("My fixture", getPropsFn);
            const {logHandler: logHandlerFn} = getPropsFn.mock.calls[0][0];

            // Act
            const logFn = logHandlerFn("MESSAGE");
            logFn("ARG1", "ARG2");

            // Assert
            expect(actionSpy).toHaveBeenCalledWith("MESSAGE");
            expect(actionReturnFn).toHaveBeenCalledWith("ARG1", "ARG2");
        });

        it("should have args attached", () => {
            // Arrange
            const fixture = fixtures(() => <div />);
            const props = {
                this: "isAProp",
                andSo: "isThis",
            } as const;

            // Act
            const result = fixture("A simple story", props);

            // Assert
            expect(result).toHaveProperty("args", props);
        });

        it("should have story name attached", () => {
            // Arrange
            const fixture = fixtures(() => <div />);

            // Act
            const result = fixture("A simple story", {});

            // Assert
            expect(result).toHaveProperty("storyName", "1 A simple story");
        });

        it("should render the component", () => {
            // Arrange
            const fixture = fixtures(
                // @ts-expect-error [FEI-5019] - TS2345 - Argument of type '(props: any) => string' is not assignable to parameter of type 'ComponentType<any>'.
                (props: any) => `I rendered ${JSON.stringify(props)}`,
            );
            const Fixture: any = fixture("A simple story", {});

            // Act
            render(<Fixture aProp="aValue" />);

            // Assert
            expect(
                screen.getByText('I rendered {"aProp":"aValue"}'),
            ).toBeInTheDocument();
        });

        it("should render the wrapper", () => {
            // Arrange
            const fixture = fixtures(
                // @ts-expect-error [FEI-5019] - TS2345 - Argument of type '(props: any) => string' is not assignable to parameter of type 'ComponentType<any>'.
                (props: any) => `I rendered ${JSON.stringify(props)}`,
            );
            const Fixture: any = fixture(
                "A simple story",
                {},
                // @ts-expect-error [FEI-5019] - TS2345 - Argument of type '() => string' is not assignable to parameter of type 'ComponentType<any> | undefined'.
                () => "I am a wrapper",
            );

            // Act
            render(<Fixture aProp="aValue" />);

            // Assert
            expect(screen.getByText("I am a wrapper")).toBeInTheDocument();
        });
    });
});
