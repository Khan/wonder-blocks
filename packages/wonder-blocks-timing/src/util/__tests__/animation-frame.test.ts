import AnimationFrame from "../animation-frame";
import {SchedulePolicy, ClearPolicy} from "../policies";

describe("AnimationFrame", () => {
    beforeEach(() => {
        jest.useFakeTimers();

        // Jest doesn't fake out the animation frame API, so we're going to do
        // it here and map it to timeouts, that way we can use the fake timer
        // API to test our animation frame things.
        jest.spyOn(global, "requestAnimationFrame").mockImplementation(
            (fn: any, ...args: any) => setTimeout(fn, 0) as any,
        );
        jest.spyOn(global, "cancelAnimationFrame").mockImplementation(
            (id: any, ...args: any) => clearTimeout(id),
        );
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe("constructor", () => {
        it("creates instance", () => {
            // Arrange

            // Act
            const result = new AnimationFrame(() => {});

            // Assert
            expect(result).toBeDefined();
        });

        it("throws if the action is not a function", () => {
            // Arrange

            // Act
            const underTest = () => new AnimationFrame(null as any);

            // Assert
            expect(underTest).toThrowErrorMatchingInlineSnapshot(
                `"Action must be a function"`,
            );
        });

        it("requests an animation frame when schedule policy is SchedulePolicy.Immediately", () => {
            // Arrange
            const spy = jest.spyOn(global, "requestAnimationFrame");

            // Act
            // eslint-disable-next-line no-new
            new AnimationFrame(() => {}, SchedulePolicy.Immediately);

            // Assert
            expect(spy).toHaveBeenCalledTimes(1);
        });
    });

    describe("isSet", () => {
        it("is false when the request has not been set", () => {
            // Arrange
            const animationFrame = new AnimationFrame(() => {},
            SchedulePolicy.OnDemand);

            // Act
            const result = animationFrame.isSet;

            // Assert
            expect(result).toBeFalsy();
        });

        it("is true when the request is pending", () => {
            // Arrange
            const animationFrame = new AnimationFrame(() => {});
            animationFrame.set();

            // Act
            const result = animationFrame.isSet;

            // Assert
            expect(result).toBeTruthy();
        });

        it("is false when the request has executed", () => {
            // Arrange
            const animationFrame = new AnimationFrame(() => {});
            animationFrame.set();
            jest.runOnlyPendingTimers();

            // Act
            const result = animationFrame.isSet;

            // Assert
            expect(result).toBeFalsy();
        });
    });

    describe("#set", () => {
        it("should call requestAnimationFrame", () => {
            // Arrange
            const spy = jest.spyOn(global, "requestAnimationFrame");
            const animationFrame = new AnimationFrame(() => {});

            // Act
            animationFrame.set();

            // Assert
            expect(spy).toHaveBeenNthCalledWith(1, expect.any(Function));
        });

        it("should invoke requestAnimationFrame to call the given action", () => {
            // Arrange
            const spy = jest.spyOn(global, "requestAnimationFrame");
            const action = jest.fn();
            const animationFrame = new AnimationFrame((time: any) =>
                action(time),
            );
            animationFrame.set();
            const scheduledAction = spy.mock.calls[0][0];

            // Act
            scheduledAction(2001);

            // Assert
            expect(action).toHaveBeenCalledTimes(1);
            expect(action).toHaveBeenCalledWith(2001);
        });

        it("should clear any pending request", () => {
            // Arrange
            const action = jest.fn();
            const animationFrame = new AnimationFrame(() => action());
            animationFrame.set();

            // Act
            animationFrame.set();
            jest.runOnlyPendingTimers();

            // Assert
            expect(action).toHaveBeenCalledTimes(1);
        });

        it("should set the timeout again if it has already executed", () => {
            // Arrange
            const spy = jest.spyOn(global, "requestAnimationFrame");
            const action = jest.fn();
            const animationFrame = new AnimationFrame(
                action,
                SchedulePolicy.OnDemand,
            );
            animationFrame.set();
            jest.runOnlyPendingTimers();

            // Act
            animationFrame.set();

            // Assert
            expect(spy).toHaveBeenCalledTimes(2);
        });
    });

    describe("#clear", () => {
        it("should clear a pending timout", () => {
            // Arrange
            const action = jest.fn();
            const animationFrame = new AnimationFrame(action);
            animationFrame.set();

            // Act
            animationFrame.clear();
            jest.runOnlyPendingTimers();

            // Assert
            expect(action).not.toHaveBeenCalled();
        });

        it("should invoke the action if clear policy is ClearPolicy.Resolve", () => {
            // Arrange
            jest.spyOn(performance, "now").mockReturnValue(42);
            const action = jest.fn();
            const animationFrame = new AnimationFrame(action);
            animationFrame.set();

            // Act
            animationFrame.clear(ClearPolicy.Resolve);
            jest.runOnlyPendingTimers();

            // Assert
            expect(action).toHaveBeenCalledTimes(1);
            expect(action).toHaveBeenCalledWith(42);
        });

        it("should not invoke the action if clear policy is ClearPolicy.Cancel", () => {
            // Arrange
            const action = jest.fn();
            const animationFrame = new AnimationFrame(
                action,
                SchedulePolicy.Immediately,
            );

            // Act
            animationFrame.clear(ClearPolicy.Cancel);
            jest.runOnlyPendingTimers();

            // Assert
            expect(action).not.toHaveBeenCalled();
        });

        it("should not invoke the action if timeout is not pending and clear policy is ClearPolicy.Resolve", () => {
            // Arrange
            const action = jest.fn();
            const animationFrame = new AnimationFrame(
                action,
                SchedulePolicy.OnDemand,
            );

            // Act
            animationFrame.clear(ClearPolicy.Resolve);
            jest.runOnlyPendingTimers();

            // Assert
            expect(action).not.toHaveBeenCalled();
        });
    });
});
