// @flow
import {renderHook} from "@testing-library/react-hooks";

import {useInterval} from "../use-interval.js";

describe("useTimeout", () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    it("should not fire if 'active' is false", () => {
        // Arrange
        const action = jest.fn();

        // Act
        renderHook(() => useInterval(action, 500, false));
        jest.advanceTimersByTime(501);

        // Assert
        expect(action).not.toHaveBeenCalled();
    });

    it("should fire the action multiple times based on 'intervalMs'", () => {
        // Arrange
        const action = jest.fn();

        // Act
        renderHook(() => useInterval(action, 500, true));
        jest.advanceTimersByTime(1001);

        // Assert
        expect(action).toHaveBeenCalledTimes(2);
    });

    it("should fire after time after 'active' changes to true", () => {
        // Arrange
        const action = jest.fn();

        // Act
        const {rerender} = renderHook(
            ({active}) => useInterval(action, 500, active),
            {initialProps: {active: false}},
        );
        rerender({active: true});
        jest.advanceTimersByTime(501);

        // Assert
        expect(action).toHaveBeenCalled();
    });

    it("should not fire after 'intervalMs' if 'active' changes to false", () => {
        // Arrange
        const action = jest.fn();
        const {rerender} = renderHook(
            ({active}) => useInterval(action, 500, active),
            {initialProps: {active: true}},
        );

        // Act
        rerender({active: false});
        jest.advanceTimersByTime(501);

        // Assert
        expect(action).not.toHaveBeenCalled();
    });

    it("should reset the interval if 'intervalMs' is changes", () => {
        // Arrange
        const action = jest.fn();

        // Act
        const {rerender} = renderHook(
            ({timeoutMs}) => useInterval(action, timeoutMs, true),
            {initialProps: {timeoutMs: 500}},
        );
        rerender({timeoutMs: 1000});
        jest.advanceTimersByTime(501);

        // Assert
        expect(action).not.toHaveBeenCalled();
        jest.advanceTimersByTime(1001);
        expect(action).toHaveBeenCalled();
    });

    it("should not reset the interval if 'action' changes", () => {
        // Arrange
        const action1 = jest.fn();
        const action2 = jest.fn();
        const timeoutSpy = jest.spyOn(window, "setTimeout");

        // Act
        const {rerender} = renderHook(
            ({action}) => useInterval(action, 500, true),
            {initialProps: {action: action1}},
        );
        // NOTE: For some reason setTimeout is called twice by the time we get
        // here.  I've verified that it only gets called once inside the hook
        // so something else must be calling it.
        const callCount = timeoutSpy.mock.calls.length;
        rerender({action: action2});
        jest.advanceTimersByTime(501);

        // Assert
        expect(timeoutSpy).toHaveBeenCalledTimes(callCount);
    });

    it("should fire the current action if 'action' changes", () => {
        // Arrange
        const action1 = jest.fn();
        const action2 = jest.fn();

        // Act
        const {rerender} = renderHook(
            ({action}) => useInterval(action, 500, true),
            {initialProps: {action: action1}},
        );
        rerender({action: action2});
        jest.advanceTimersByTime(501);

        // Assert
        expect(action1).not.toHaveBeenCalledWith();
        expect(action2).toHaveBeenCalledWith();
    });
});
