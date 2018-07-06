// @flow
import SuppressionTracker from "./suppression-tracker.js";

import * as Core from "@khanacademy/wonder-blocks-core";

import type {ICanBeSuppressed} from "./types.js";

jest.mock("@khanacademy/wonder-blocks-core");

class TestSuppressee implements ICanBeSuppressed {
    suppress = jest.fn();
    unsuppress = jest.fn();

    clearAllMocks = () => {
        this.suppress.mockClear();
        this.unsuppress.mockClear();
    };
}

describe("SuppressionTracker", () => {
    let setFlushableTimeoutReturnValues = [];
    const clearSetFlushableTimeoutMock = () => {
        setFlushableTimeoutReturnValues = [];
        // Flow doesn't like jest mocks $FlowFixMe
        Core.setFlushableTimeout.mockClear();
    };

    beforeAll(() => {
        // Flow doesn't like jest mocks $FlowFixMe
        Core.setFlushableTimeout.mockImplementation((fn, ms) => {
            let resolve;
            const promise = new Promise((r) => (resolve = r));
            const fakeTimeout = {
                flush: jest.fn(() => resolve(false)),
                clear: jest.fn(() => resolve(true)),
                promise,
            };
            setFlushableTimeoutReturnValues.push(fakeTimeout);
            return fakeTimeout;
        });
    });

    beforeEach(() => {
        clearSetFlushableTimeoutMock();
    });

    describe("#track", () => {
        describe("no first unsuppress delay", () => {
            test("track already tracked suppressee, throws", () => {
                // Arrange
                const tracker = new SuppressionTracker();
                const suppressee = new TestSuppressee();
                tracker.track(suppressee);

                // Act
                const underTest = () => tracker.track(suppressee);

                // Assert
                expect(underTest).toThrowErrorMatchingSnapshot();
            });

            test("first suppressee instantly unsuppressed", () => {
                // Arrange
                const tracker = new SuppressionTracker();
                const suppressee = new TestSuppressee();

                // Act
                tracker.track(suppressee);

                // Assert
                expect(suppressee.unsuppress).toHaveBeenCalledWith(true);
            });

            test("track new suppressee, old active suppressee is instantly suppressed", () => {
                // Arrange
                const tracker = new SuppressionTracker();
                const suppresseeOld = new TestSuppressee();
                const suppresseeNew = new TestSuppressee();
                tracker.track(suppresseeOld);

                // Act
                tracker.track(suppresseeNew);

                // Assert
                expect(suppresseeOld.suppress).toHaveBeenCalledWith(true);
            });

            test("track new suppressee, new suppressee is instantly unsuppressed", () => {
                // Arrange
                const tracker = new SuppressionTracker();
                const suppresseeOld = new TestSuppressee();
                const suppresseeNew = new TestSuppressee();
                tracker.track(suppresseeOld);

                // Act
                tracker.track(suppresseeNew);

                // Assert
                expect(suppresseeNew.unsuppress).toHaveBeenCalledWith(true);
            });
        });

        describe("with first unsuppress delay", () => {
            test("track already tracked suppressee, throws", () => {
                // Arrange
                const tracker = new SuppressionTracker(100);
                const suppressee = new TestSuppressee();
                tracker.track(suppressee);

                // Act
                const underTest = () => tracker.track(suppressee);

                // Assert
                expect(underTest).toThrowErrorMatchingSnapshot();
            });

            describe("first suppressee gets unsuppressed after delay", () => {
                test("timeout is schedule", () => {
                    // Arrange
                    const delay = 100;
                    const tracker = new SuppressionTracker(delay);
                    const suppressee = new TestSuppressee();

                    // Act
                    tracker.track(suppressee);

                    // Assert
                    expect(Core.setFlushableTimeout).toHaveBeenCalledWith(
                        expect.any(Function),
                        delay,
                    );
                });

                test("timeout calls unsuppress", () => {
                    // Arrange
                    const tracker = new SuppressionTracker(100);
                    const suppressee = new TestSuppressee();
                    tracker.track(suppressee);

                    // Act
                    // Flow doesn't like jest mocks $FlowFixMe
                    Core.setFlushableTimeout.mock.calls[0][0]("whatever");

                    // Assert
                    // NOTE: We mocked the timeout code, which would actually
                    // pass true/false. We don't need to test that part as there
                    // are already tests for the flushable timeout code to test
                    // that it properly invokes it's timeout method.
                    expect(suppressee.unsuppress).toHaveBeenCalledWith(
                        "whatever",
                    );
                });
            });

            test("track new suppressee, pending unsuppress timeout cleared", () => {
                // Arrange
                const unsurpressDelay = 99;
                const tracker = new SuppressionTracker(unsurpressDelay);
                const suppresseeOld = new TestSuppressee();
                const suppresseeNew = new TestSuppressee();
                tracker.track(suppresseeOld);

                // Act
                tracker.track(suppresseeNew);

                // Assert
                // We should have been called to setup an unsuppress twice
                // and cancelled the first one.
                expect(Core.setFlushableTimeout).toHaveBeenCalledTimes(2);
                // Check that we were called as we expect.
                // Flow doesn't get jest mocks $FlowFixMe
                expect(Core.setFlushableTimeout.mock.calls[0][1]).toBe(
                    unsurpressDelay,
                );
                // Flow doesn't get jest mocks $FlowFixMe
                expect(Core.setFlushableTimeout.mock.calls[1][1]).toBe(
                    unsurpressDelay,
                );
                expect(
                    setFlushableTimeoutReturnValues[0].clear,
                ).toHaveBeenCalledTimes(1);
            });

            test("track new suppressee, pending suppress timeout flushed", async () => {
                // Arrange
                const unsuppressDelay = 75;
                const suppressDelay = 100;
                const tracker = new SuppressionTracker(
                    unsuppressDelay,
                    suppressDelay,
                );
                const suppressee1 = new TestSuppressee();
                const suppressee2 = new TestSuppressee();
                tracker.track(suppressee1);
                // Make sure the track occurs. Since we mocked this out, we have
                // to do this ourselves.
                expect(Core.setFlushableTimeout).toHaveBeenCalledTimes(1);
                setFlushableTimeoutReturnValues[0].flush();
                await setFlushableTimeoutReturnValues[0].promise;
                clearSetFlushableTimeoutMock();

                tracker.untrack(suppressee1);

                // Act
                tracker.track(suppressee2);

                // Assert
                expect(Core.setFlushableTimeout).toHaveBeenCalledTimes(1);
                // Flow doesn't like jest mocks $FlowFixMe
                expect(Core.setFlushableTimeout.mock.calls[0][1]).toBe(
                    suppressDelay,
                );
                expect(
                    setFlushableTimeoutReturnValues[0].flush,
                ).toHaveBeenCalledTimes(1);
            });

            test("track new suppressee, old active suppressee is instantly suppressed", async () => {
                // Arrange
                const tracker = new SuppressionTracker(100);
                const suppresseeOld = new TestSuppressee();
                const suppresseeNew = new TestSuppressee();
                tracker.track(suppresseeOld);
                // Make sure the track occurs. Since we mocked this out, we have
                // to do this ourselves.
                expect(Core.setFlushableTimeout).toHaveBeenCalledTimes(1);
                setFlushableTimeoutReturnValues[0].flush();
                await setFlushableTimeoutReturnValues[0].promise;

                // Act
                tracker.track(suppresseeNew);

                // Assert
                expect(suppresseeOld.suppress).toHaveBeenCalledWith(true);
            });

            test("track new suppressee, new suppressee is instantly unsuppressed", async () => {
                // Arrange
                const tracker = new SuppressionTracker(100);
                const suppresseeOld = new TestSuppressee();
                const suppresseeNew = new TestSuppressee();
                tracker.track(suppresseeOld);
                // Make sure the track occurs. Since we mocked this out, we have
                // to do this ourselves.
                expect(Core.setFlushableTimeout).toHaveBeenCalledTimes(1);
                setFlushableTimeoutReturnValues[0].flush();
                await setFlushableTimeoutReturnValues[0].promise;

                // Act
                tracker.track(suppresseeNew);

                // Assert
                expect(suppresseeNew.unsuppress).toHaveBeenCalledWith(true);
            });
        });
    });

    describe("#untrack", () => {
        describe("no first unsuppress delay", () => {
            test("untrack an untracked suppressee, throws", () => {
                // Arrange
                const tracker = new SuppressionTracker();
                const suppressee = new TestSuppressee();

                // Act
                const underTest = () => tracker.untrack(suppressee);

                // Assert
                expect(underTest).toThrowErrorMatchingSnapshot();
            });

            test("untrack active suppressee, next surpressee instantly unsuppressed", () => {
                // Arrange
                const tracker = new SuppressionTracker();
                const oldActiveSuppressee = new TestSuppressee();
                const newActiveSuppressee = new TestSuppressee();
                tracker.track(newActiveSuppressee);
                tracker.track(oldActiveSuppressee);
                oldActiveSuppressee.clearAllMocks();
                newActiveSuppressee.clearAllMocks();

                // Act
                tracker.untrack(oldActiveSuppressee);

                // Assert
                expect(newActiveSuppressee.unsuppress).toHaveBeenCalledWith(
                    true,
                );
            });

            test("untrack active suppressee, active surpressee instantly suppressed", () => {
                // Arrange
                const tracker = new SuppressionTracker();
                const oldActiveSuppressee = new TestSuppressee();
                const newActiveSuppressee = new TestSuppressee();
                tracker.track(newActiveSuppressee);
                tracker.track(oldActiveSuppressee);
                oldActiveSuppressee.clearAllMocks();
                newActiveSuppressee.clearAllMocks();

                // Act
                tracker.untrack(oldActiveSuppressee);

                // Assert
                expect(oldActiveSuppressee.suppress).toHaveBeenCalledWith(true);
            });

            test("untrack inactive suppressee, suppressee gets instantly surpressed", () => {
                // Arrange
                const tracker = new SuppressionTracker();
                const activeSuppressee = new TestSuppressee();
                const untrackedSuppressee = new TestSuppressee();
                tracker.track(untrackedSuppressee);
                tracker.track(activeSuppressee);

                // Clear the mocks so that we can see that nothing gets called from
                // this point on.
                activeSuppressee.clearAllMocks();
                untrackedSuppressee.clearAllMocks();

                // Act
                tracker.untrack(untrackedSuppressee);

                // Assert
                expect(untrackedSuppressee.suppress).toHaveBeenCalledWith(true);
            });
        });

        describe("with last suppress delay", () => {
            test("untrack an untracked suppressee, throws", () => {
                // Arrange
                const tracker = new SuppressionTracker(null, 100);
                const suppressee = new TestSuppressee();

                // Act
                const underTest = () => tracker.untrack(suppressee);

                // Assert
                expect(underTest).toThrowErrorMatchingSnapshot();
            });

            describe("untrack last suppressee, suppressee is suppressed after delay", () => {
                test("timeout is schedule", () => {
                    // Arrange
                    const delay = 100;
                    const tracker = new SuppressionTracker(null, delay);
                    const suppressee = new TestSuppressee();
                    tracker.track(suppressee);

                    // Act
                    tracker.untrack(suppressee);

                    // Assert
                    expect(Core.setFlushableTimeout).toHaveBeenCalledWith(
                        expect.any(Function),
                        delay,
                    );
                });

                test("timeout calls suppress", () => {
                    // Arrange
                    const tracker = new SuppressionTracker(null, 100);
                    const suppressee = new TestSuppressee();
                    tracker.track(suppressee);
                    tracker.untrack(suppressee);

                    // Act
                    // Flow doesn't like jest mocks $FlowFixMe
                    Core.setFlushableTimeout.mock.calls[0][0]("whatever");

                    // Assert
                    // NOTE: We mocked the timeout code, which would actually
                    // pass true/false. We don't need to test that part as there
                    // are already tests for the flushable timeout code to test
                    // that it properly invokes it's timeout method.
                    expect(suppressee.suppress).toHaveBeenCalledWith(
                        "whatever",
                    );
                });
            });

            test("untrack active suppressee, next surpressee instantly unsuppressed", () => {
                // Arrange
                const tracker = new SuppressionTracker(null, 100);
                const oldActiveSuppressee = new TestSuppressee();
                const newActiveSuppressee = new TestSuppressee();
                tracker.track(newActiveSuppressee);
                tracker.track(oldActiveSuppressee);
                oldActiveSuppressee.clearAllMocks();
                newActiveSuppressee.clearAllMocks();

                // Act
                tracker.untrack(oldActiveSuppressee);

                // Assert
                expect(newActiveSuppressee.unsuppress).toHaveBeenCalledWith(
                    true,
                );
            });

            test("untrack active suppressee before it was unsurpressed, pending unsurpress cancelled", () => {
                // Arrange
                const tracker = new SuppressionTracker(100, 100);
                const oldActiveSuppressee = new TestSuppressee();
                tracker.track(oldActiveSuppressee);

                // Act
                tracker.untrack(oldActiveSuppressee);

                // Assert
                expect(Core.setFlushableTimeout).toHaveBeenCalledTimes(1);
                expect(
                    setFlushableTimeoutReturnValues[0].clear,
                ).toHaveBeenCalledTimes(1);
            });
        });
    });
});
