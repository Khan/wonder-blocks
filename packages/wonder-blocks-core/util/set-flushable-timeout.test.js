// @flow
import setFlushableTimeout from "./set-flushable-timeout.js";

import timeout from "../../../utils/testing/timeout.js";

describe("setFlushableTimeout", () => {
    test("executes given function with false after timeout", async () => {
        // Arrange
        const workFn = jest.fn();

        // Act
        setFlushableTimeout(workFn, 100);

        // Assert
        expect(workFn).not.toHaveBeenCalled();
        await timeout(100);
        expect(workFn).toHaveBeenCalledWith(false);
    });

    test("resolves promise with false", async () => {
        // Arrange
        const workFn = jest.fn();
        const testee = setFlushableTimeout(workFn, 100);

        // Act
        const result = await testee.promise.then((cancelled) => cancelled);

        // Assert
        expect(result).toBeFalsy();
    });

    describe("#flush", () => {
        test("invokes function immediately with true", () => {
            // Arrange
            const workFn = jest.fn();
            const testee = setFlushableTimeout(workFn, 100);

            // Act
            testee.flush();

            // Assert
            expect(workFn).toHaveBeenCalledWith(true);
        });

        test("resolves promise with false", async () => {
            // Arrange
            const workFn = jest.fn();
            const testee = setFlushableTimeout(workFn, 100);

            // Act
            testee.flush();
            const result = await testee.promise;

            // Assert
            expect(result).toBeFalsy();
        });

        test("cancels timeout", async () => {
            // Arrange
            const workFn = jest.fn();
            const testee = setFlushableTimeout(workFn, 100);

            // Act
            testee.flush();
            workFn.mockClear();
            await timeout(100);

            // Assert
            expect(workFn).not.toHaveBeenCalled();
        });

        test("if already cleared, does not throw", () => {
            // Arrange
            const workFn = jest.fn();
            const testee = setFlushableTimeout(workFn, 100);
            testee.clear();

            // Act
            const underTest = () => testee.flush();

            // Assert
            expect(underTest).not.toThrowError();
        });

        test("if already cleared, does not invoke function", () => {
            // Arrange
            const workFn = jest.fn();
            const testee = setFlushableTimeout(workFn, 100);
            testee.clear();

            // Act
            testee.flush();

            // Assert
            expect(workFn).not.toHaveBeenCalled();
        });

        test("if delayed function already executed, does not throw", async () => {
            // Arrange
            const workFn = jest.fn();
            const testee = setFlushableTimeout(workFn, 0);
            await testee.promise;

            // Act
            const underTest = () => testee.flush();

            // Assert
            expect(underTest).not.toThrowError();
        });

        test("if delayed function already executed, does not invoke function again", async () => {
            // Arrange
            const workFn = jest.fn();
            const testee = setFlushableTimeout(workFn, 100);
            await testee.promise;
            workFn.mockClear();

            // Act
            testee.flush();

            // Assert
            expect(workFn).not.toHaveBeenCalled();
        });

        test("if delayed function already flushed, does not throw", () => {
            // Arrange
            const workFn = jest.fn();
            const testee = setFlushableTimeout(workFn, 0);
            testee.flush();

            // Act
            const underTest = () => testee.flush();

            // Assert
            expect(underTest).not.toThrowError();
        });

        test("if delayed function already flushed, does not invoke function again", async () => {
            // Arrange
            const workFn = jest.fn();
            const testee = setFlushableTimeout(workFn, 100);
            testee.flush();
            workFn.mockClear();

            // Act
            testee.flush();

            // Assert
            expect(workFn).not.toHaveBeenCalled();
        });
    });

    describe("#clear", () => {
        test("cancels timeout without invoking function", async () => {
            // Arrange
            const workFn = jest.fn();
            const testee = setFlushableTimeout(workFn, 100);

            // Act
            testee.clear();
            await timeout(100);
            await testee.promise;

            // Assert
            expect(workFn).not.toHaveBeenCalled();
        });

        test("resolves promise with true", async () => {
            // Arrange
            const workFn = jest.fn();
            const testee = setFlushableTimeout(workFn, 100);

            // Act
            testee.clear();
            const result = await testee.promise;

            // Assert
            expect(result).toBeTruthy();
        });

        test("if already cleared, does not throw", () => {
            // Arrange
            const workFn = jest.fn();
            const testee = setFlushableTimeout(workFn, 0);
            testee.clear();

            // Act
            const underTest = () => testee.clear();

            // Assert
            expect(underTest).not.toThrowError();
        });

        test("if delayed function already executed, does not throw", async () => {
            // Arrange
            const workFn = jest.fn();
            const testee = setFlushableTimeout(workFn, 0);
            await testee.promise;

            // Act
            const underTest = () => testee.clear();

            // Assert
            expect(underTest).not.toThrowError();
        });

        test("if delayed function already flushed, does not throw", () => {
            // Arrange
            const workFn = jest.fn();
            const testee = setFlushableTimeout(workFn, 0);
            testee.flush();

            // Act
            const underTest = () => testee.clear();

            // Assert
            expect(underTest).not.toThrowError();
        });
    });
});
