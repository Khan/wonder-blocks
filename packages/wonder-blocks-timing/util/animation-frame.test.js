// @flow
import AnimationFrame from "./animation-frame.js";

describe("AnimationFrame", () => {
    beforeEach(() => {
        jest.useFakeTimers();

        // Jest doesn't fake out the animation frame API, so we're going to do
        // it here and map it to timeouts, that way we can use the fake timer
        // API to test our animation frame things.
        jest.spyOn(global, "requestAnimationFrame").mockImplementation(
            (fn, ...args) => setTimeout(fn, 0),
        );
        jest.spyOn(global, "cancelAnimationFrame").mockImplementation(
            (id, ...args) => clearTimeout(id),
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
            const underTest = () => new AnimationFrame((null: any));

            // Assert
            expect(underTest).toThrowErrorMatchingInlineSnapshot(
                `"Action must be a function"`,
            );
        });

        it("requests an animation frame when autoSchedule is true", () => {
            // Arrange

            // Act
            // eslint-disable-next-line no-new
            new AnimationFrame(() => {}, true);

            // Assert
            expect(requestAnimationFrame).toHaveBeenCalledTimes(1);
        });
    });

    describe("isSet", () => {
        it("is false when the request has not been set", () => {
            // Arrange
            const animationFrame = new AnimationFrame(() => {}, false);

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
            const animationFrame = new AnimationFrame(() => {});

            // Act
            animationFrame.set();

            // Assert
            expect(requestAnimationFrame).toHaveBeenNthCalledWith(
                1,
                expect.any(Function),
            );
        });

        it("should invoke requestAnimationFrame to call the given action", () => {
            // Arrange
            const action = jest.fn();
            const animationFrame = new AnimationFrame(() => action());
            animationFrame.set();
            // Flow doesn't know we added jest mocks to this $FlowFixMe
            const scheduledAction = requestAnimationFrame.mock.calls[0][0];

            // Act
            scheduledAction();

            // Assert
            expect(action).toHaveBeenCalledTimes(1);
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
            const action = jest.fn();
            const animationFrame = new AnimationFrame(action, false);
            animationFrame.set();
            jest.runOnlyPendingTimers();

            // Act
            animationFrame.set();

            // Assert
            expect(requestAnimationFrame).toHaveBeenCalledTimes(2);
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

        it("should invoke the action if resolve is true", () => {
            // Arrange
            const action = jest.fn();
            const animationFrame = new AnimationFrame(action);
            animationFrame.set();

            // Act
            animationFrame.clear(true);
            jest.runOnlyPendingTimers();

            // Assert
            expect(action).toHaveBeenCalledTimes(1);
        });

        it("should not invoke the action if resolve is false", () => {
            // Arrange
            const action = jest.fn();
            const animationFrame = new AnimationFrame(action, true);

            // Act
            animationFrame.clear(false);
            jest.runOnlyPendingTimers();

            // Assert
            expect(action).not.toHaveBeenCalled();
        });

        it("should not invoke the action if timeout is not pending", () => {
            // Arrange
            const action = jest.fn();
            const animationFrame = new AnimationFrame(action, false);

            // Act
            animationFrame.clear(true);
            jest.runOnlyPendingTimers();

            // Assert
            expect(action).not.toHaveBeenCalled();
        });
    });
});
