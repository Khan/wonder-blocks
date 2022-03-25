// @flow
import ActiveTracker from "../active-tracker.js";
import type {IActiveTrackerSubscriber} from "../active-tracker.js";

class MockSubscriber implements IActiveTrackerSubscriber {
    activeStateStolen = jest.fn();
}

describe("ActiveTracker", () => {
    describe("#subscribe", () => {
        test("subscribes to notifications", () => {
            // Arrange
            const tracker = new ActiveTracker();
            const subscriber = new MockSubscriber();
            const thief = new MockSubscriber();

            // Act
            tracker.subscribe(subscriber);
            tracker.steal(thief);

            // Assert
            expect(subscriber.activeStateStolen).toHaveBeenCalledTimes(1);
        });

        test("if already subscribed, throws", () => {
            // Arrange
            const tracker = new ActiveTracker();
            const subscriber = new MockSubscriber();
            tracker.subscribe(subscriber);

            // Act
            const underTest = () => tracker.subscribe(subscriber);

            // Assert
            expect(underTest).toThrowErrorMatchingSnapshot();
        });

        test("returns a function", () => {
            // Arrange
            const tracker = new ActiveTracker();
            const subscriber = new MockSubscriber();

            // Act
            const result = tracker.subscribe(subscriber);

            // Assert
            expect(result).toBeInstanceOf(Function);
        });

        test("returned function unsubscribes from notifications", () => {
            // Arrange
            const tracker = new ActiveTracker();
            const subscriber1 = new MockSubscriber();
            const testCase = new MockSubscriber();
            const subscriber3 = new MockSubscriber();
            const subscriber4 = new MockSubscriber();
            tracker.subscribe(subscriber1);
            const unsubscribe = tracker.subscribe(testCase);
            tracker.subscribe(subscriber3);

            // Act
            unsubscribe();
            tracker.steal(subscriber4);

            // Assert
            expect(testCase.activeStateStolen).not.toHaveBeenCalled();
            expect(subscriber1.activeStateStolen).toHaveBeenCalledTimes(1);
            expect(subscriber3.activeStateStolen).toHaveBeenCalledTimes(1);
        });
    });

    describe("#steal", () => {
        test("notifies subscribers of theft attempt", () => {
            // Arrange
            const tracker = new ActiveTracker();
            const thief = new MockSubscriber();
            const subscriber = new MockSubscriber();
            tracker.subscribe(subscriber);

            // Act
            tracker.steal(thief);

            // Assert
            expect(subscriber.activeStateStolen).toHaveBeenCalledTimes(1);
        });

        test("does not notifier thief of their own theft attempt", () => {
            // Arrange
            const tracker = new ActiveTracker();
            const thief = new MockSubscriber();
            tracker.subscribe(thief);

            // Act
            tracker.steal(thief);

            // Assert
            expect(thief.activeStateStolen).not.toHaveBeenCalledTimes(1);
        });

        test("returns falsy if active state was not stolen", () => {
            // Arrange
            const tracker = new ActiveTracker();
            const thief = new MockSubscriber();

            // Act
            const result = tracker.steal(thief);

            // Assert
            expect(result).toBeFalsy();
        });

        test("returns truthy if active state was stolen", () => {
            // Arrange
            const tracker = new ActiveTracker();
            const thief = new MockSubscriber();
            const owner = new MockSubscriber();
            tracker.steal(owner);

            // Act
            const result = tracker.steal(thief);

            // Assert
            expect(result).toBeTruthy();
        });
    });

    describe("#giveup", () => {
        test("marks the active state as false", () => {
            // Arrange
            const tracker = new ActiveTracker();
            const owner = new MockSubscriber();
            tracker.steal(owner);

            // Act
            expect(tracker.steal(owner)).toBeTruthy();
            tracker.giveup();
            const result = tracker.steal(owner);

            // Assert
            expect(result).toBeFalsy();
        });
    });
});
