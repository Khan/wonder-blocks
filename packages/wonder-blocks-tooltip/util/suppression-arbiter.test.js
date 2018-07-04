// @flow
import SuppressionArbiter from "./suppression-arbiter";

import type {ICanBeSuppressed} from "./types.js";

class TestSuppressee implements ICanBeSuppressed {
    suppress = jest.fn();
    unsuppress = jest.fn();

    clearAllMocks = () => {
        this.suppress.mockClear();
        this.unsuppress.mockClear();
    };
}

describe("SuppressionArbiter", () => {
    describe("#track", () => {
        test("first suppressee gets non-instantly unsuppressed", () => {
            // Arrange
            const arbiter = new SuppressionArbiter();
            const suppressee = new TestSuppressee();

            // Act
            arbiter.track(suppressee);

            // Assert
            expect(suppressee.unsuppress).toHaveBeenCalledWith(false);
        });

        test("track already tracked suppressee, throws", () => {
            // Arrange
            const arbiter = new SuppressionArbiter();
            const suppressee = new TestSuppressee();
            arbiter.track(suppressee);

            // Act
            const underTest = () => arbiter.track(suppressee);

            // Assert
            expect(underTest).toThrowErrorMatchingSnapshot();
        });

        test("track new suppressee, suppresses old active suppressee", () => {
            // Arrange
            const arbiter = new SuppressionArbiter();
            const suppresseeOld = new TestSuppressee();
            const suppresseeNew = new TestSuppressee();
            arbiter.track(suppresseeOld);

            // Act
            arbiter.track(suppresseeNew);

            // Assert
            expect(suppresseeOld.suppress).toHaveBeenCalledTimes(1);
        });

        test("track new suppressee, new suppressee is instantly active", () => {
            // Arrange
            const arbiter = new SuppressionArbiter();
            const suppresseeOld = new TestSuppressee();
            const suppresseeNew = new TestSuppressee();
            arbiter.track(suppresseeOld);

            // Act
            arbiter.track(suppresseeNew);

            // Assert
            expect(suppresseeNew.unsuppress).toHaveBeenCalledWith(true);
        });
    });

    describe("#untrack", () => {
        test("untrack an untracked suppressee, throws", () => {
            // Arrange
            const arbiter = new SuppressionArbiter();
            const suppressee = new TestSuppressee();

            // Act
            const underTest = () => arbiter.untrack(suppressee);

            // Assert
            expect(underTest).toThrowErrorMatchingSnapshot();
        });

        test("untrack active suppressee, suppressee is suppressed", () => {
            // Arrange
            const arbiter = new SuppressionArbiter();
            const suppressee = new TestSuppressee();
            arbiter.track(suppressee);

            // Act
            arbiter.untrack(suppressee);

            // Assert
            expect(suppressee.suppress).toHaveBeenCalledTimes(1);
        });

        test("untrack active suppressee, next surpressee instantly unsuppressed", () => {
            // Arrange
            const arbiter = new SuppressionArbiter();
            const oldActiveSuppressee = new TestSuppressee();
            const newActiveSuppressee = new TestSuppressee();
            arbiter.track(newActiveSuppressee);
            arbiter.track(oldActiveSuppressee);
            oldActiveSuppressee.clearAllMocks();
            newActiveSuppressee.clearAllMocks();

            // Act
            arbiter.untrack(oldActiveSuppressee);

            // Assert
            expect(newActiveSuppressee.unsuppress).toHaveBeenCalledWith(true);
        });

        test("untrack inactive suppressee, suppressee gets surpressed", () => {
            // Arrange
            const arbiter = new SuppressionArbiter();
            const activeSuppressee = new TestSuppressee();
            const untrackedSuppressee = new TestSuppressee();
            arbiter.track(untrackedSuppressee);
            arbiter.track(activeSuppressee);

            // Clear the mocks so that we can see that nothing gets called from
            // this point on.
            activeSuppressee.clearAllMocks();
            untrackedSuppressee.clearAllMocks();

            // Act
            arbiter.untrack(untrackedSuppressee);

            // Assert
            expect(untrackedSuppressee.suppress).toHaveBeenCalledTimes(1);
        });
    });
});
