// @flow
import ActionScheduler from "../action-scheduler.js";
import Timeout from "../timeout.js";
import Interval from "../interval.js";
import AnimationFrame from "../animation-frame.js";
import {SchedulePolicy, ClearPolicy} from "../policies.js";

jest.mock("../timeout.js");
jest.mock("../interval.js");
jest.mock("../animation-frame.js");

describe("ActionScheduler", () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    describe("constructor", () => {
        it("creates instance", () => {
            // Arrange

            // Act
            const result = new ActionScheduler();

            // Assert
            expect(result).toBeDefined();
        });
    });

    describe("#timeout", () => {
        it("should create a timeout", () => {
            // Arrange
            const actionScheduler = new ActionScheduler();
            const action = jest.fn();

            // Act
            const result = actionScheduler.timeout(action, 0);

            // Assert
            expect(result).toBeDefined();
        });

        it("should pass schedule policy to Timeout", () => {
            // Arrange
            const actionScheduler = new ActionScheduler();
            const action = jest.fn();
            const options = {
                schedulePolicy: SchedulePolicy.Immediately,
            };

            // Act
            actionScheduler.timeout(action, 42, options);

            // Assert
            expect(Timeout).toHaveBeenCalledWith(
                action,
                42,
                SchedulePolicy.Immediately,
            );
        });

        it("should pass clear policy to timeout.clear on clearAll", () => {
            // Arrange
            const actionScheduler = new ActionScheduler();
            const action = jest.fn();
            const options = {
                clearPolicy: ClearPolicy.Resolve,
            };
            const testTimeout = actionScheduler.timeout(action, 42, options);

            // Act
            actionScheduler.clearAll();

            // Assert
            // $FlowIgnore[method-unbinding]
            expect(testTimeout.clear).toHaveBeenCalledWith(ClearPolicy.Resolve);
        });

        describe("when scheduler is disabled", () => {
            it("should return a noop timeout", () => {
                // Arrange
                const actionScheduler = new ActionScheduler();
                const action = jest.fn();

                // Act
                actionScheduler.disable();
                const result = actionScheduler.timeout(action, 42);

                // Assert
                expect(result).toBe(ActionScheduler.NoopAction);
            });
        });
    });

    describe("#interval", () => {
        it("should create an interval", () => {
            // Arrange
            const actionScheduler = new ActionScheduler();
            const action = jest.fn();

            // Act
            const result = actionScheduler.interval(action, 1);

            // Assert
            expect(result).toBeDefined();
        });

        it("should pass schedule policy to Interval", () => {
            // Arrange
            const actionScheduler = new ActionScheduler();
            const action = jest.fn();
            const options = {
                schedulePolicy: SchedulePolicy.Immediately,
            };

            // Act
            actionScheduler.interval(action, 42, options);

            // Assert
            expect(Interval).toHaveBeenCalledWith(
                action,
                42,
                SchedulePolicy.Immediately,
            );
        });

        it("should pass clear policy to interval.clear on clearAll", () => {
            // Arrange
            const actionScheduler = new ActionScheduler();
            const action = jest.fn();
            const options = {
                clearPolicy: ClearPolicy.Resolve,
            };
            const testInterval = actionScheduler.interval(action, 42, options);

            // Act
            actionScheduler.clearAll();

            // Assert
            // $FlowIgnore[method-unbinding]
            expect(testInterval.clear).toHaveBeenCalledWith(
                ClearPolicy.Resolve,
            );
        });

        describe("when scheduler is disabled", () => {
            it("should return a noop interval", () => {
                // Arrange
                const actionScheduler = new ActionScheduler();
                const action = jest.fn();

                // Act
                actionScheduler.disable();
                const result = actionScheduler.interval(action, 42);

                // Assert
                expect(result).toBe(ActionScheduler.NoopAction);
            });
        });
    });

    describe("#animationFrame", () => {
        it("should create an animationframe", () => {
            // Arrange
            const actionScheduler = new ActionScheduler();
            const action = jest.fn();

            // Act
            const result = actionScheduler.animationFrame(action);

            // Assert
            expect(result).toBeDefined();
        });

        it("should pass schedule policy to AnimationFrame", () => {
            // Arrange
            const actionScheduler = new ActionScheduler();
            const action = jest.fn();
            const options = {
                schedulePolicy: SchedulePolicy.Immediately,
            };

            // Act
            actionScheduler.animationFrame(action, options);

            // Assert
            expect(AnimationFrame).toHaveBeenCalledWith(
                action,
                SchedulePolicy.Immediately,
            );
        });

        it("should pass clear policy to animationFrame.clear on clearAll", () => {
            // Arrange
            const actionScheduler = new ActionScheduler();
            const action = jest.fn();
            const options = {
                clearPolicy: ClearPolicy.Resolve,
            };
            const testFrame = actionScheduler.animationFrame(action, options);

            // Act
            actionScheduler.clearAll();

            // Assert
            // $FlowIgnore[method-unbinding]
            expect(testFrame.clear).toHaveBeenCalledWith(ClearPolicy.Resolve);
        });

        describe("when scheduler is disabled", () => {
            it("should return a noop interval", () => {
                // Arrange
                const actionScheduler = new ActionScheduler();
                const action = jest.fn();

                // Act
                actionScheduler.disable();
                const result = actionScheduler.animationFrame(action);

                // Assert
                expect(result).toBe(ActionScheduler.NoopAction);
            });
        });
    });

    describe("#clearAll", () => {
        it("should call clear on all registered items", () => {
            // Arrange
            const actionScheduler = new ActionScheduler();
            const action = jest.fn();
            const timeout = actionScheduler.timeout(action, 10);
            const interval = actionScheduler.interval(action, 10);
            const animationFrame = actionScheduler.animationFrame(action);

            // Act
            actionScheduler.clearAll();

            // Assert
            // $FlowIgnore[method-unbinding]
            expect(timeout.clear).toHaveBeenCalledTimes(1);
            // $FlowIgnore[method-unbinding]
            expect(interval.clear).toHaveBeenCalledTimes(1);
            // $FlowIgnore[method-unbinding]
            expect(animationFrame.clear).toHaveBeenCalledTimes(1);
        });

        it("should not call clear on items more than once", () => {
            // Arrange
            const actionScheduler = new ActionScheduler();
            const action = jest.fn();
            const timeout = actionScheduler.timeout(action, 10);
            const interval = actionScheduler.interval(action, 10);
            const animationFrame = actionScheduler.animationFrame(action);
            actionScheduler.clearAll();

            // Act
            actionScheduler.clearAll();

            // Assert
            // $FlowIgnore[method-unbinding]
            expect(timeout.clear).toHaveBeenCalledTimes(1);
            // $FlowIgnore[method-unbinding]
            expect(interval.clear).toHaveBeenCalledTimes(1);
            // $FlowIgnore[method-unbinding]
            expect(animationFrame.clear).toHaveBeenCalledTimes(1);
        });
    });

    describe("#disable", () => {
        it("should clear all scheduled actions", () => {
            // Arrange
            const actionScheduler = new ActionScheduler();
            const clearAllSpy = jest.spyOn(actionScheduler, "clearAll");

            // Act
            actionScheduler.disable();

            // Assert
            expect(clearAllSpy).toHaveBeenCalledTimes(1);
        });
    });
});
