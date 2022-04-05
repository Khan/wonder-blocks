// @flow
import {RespondWith} from "../make-mock-response.js";
import {mockRequester} from "../mock-requester.js";

describe("#mockRequester", () => {
    it("should return a function", () => {
        // Arrange

        // Act
        const result = mockRequester(jest.fn(), jest.fn());

        // Assert
        expect(result).toBeInstanceOf(Function);
    });

    it("should provide mockOperation API", () => {
        // Arrange

        // Act
        const result = mockRequester(jest.fn(), jest.fn());

        // Assert
        expect(result).toHaveProperty("mockOperation", expect.any(Function));
    });

    it("should provide mockOperationOnce API", () => {
        // Arrange

        // Act
        const result = mockRequester(jest.fn(), jest.fn());

        // Assert
        expect(result).toHaveProperty(
            "mockOperationOnce",
            expect.any(Function),
        );
    });

    it("should throw with helpful details formatted by operationToString if no matching mock is found", async () => {
        // Arrange
        const mockFn = mockRequester(
            jest.fn(),
            (...args) => `TEST FORMATTING: ${JSON.stringify(args)}`,
        );

        // Act
        const underTest = mockFn("any", "arguments", {we: {want: 42}});

        // Assert
        await expect(underTest).rejects.toThrowErrorMatchingInlineSnapshot(`
                    "No matching mock response found for request:
                        TEST FORMATTING: [\\"any\\",\\"arguments\\",{\\"we\\":{\\"want\\":42}}]"
                `);
    });

    describe("mockOperation", () => {
        it("should invoke matcher with mock for a request", async () => {
            // Arrange
            const matcher = jest.fn().mockReturnValue(true);
            const operationToString = jest.fn();
            const mockFn = mockRequester(matcher, operationToString);

            // Act
            mockFn.mockOperation(
                "THE MOCK DESCRIPTION",
                RespondWith.text("TADA!"),
            );
            await mockFn("any", "arguments", {we: {want: 42}});

            // Assert
            expect(matcher).toHaveBeenCalledWith(
                "THE MOCK DESCRIPTION",
                "any",
                "arguments",
                {
                    we: {want: 42},
                },
            );
        });

        it("should return mocked operation response if matcher returns true", async () => {
            // Arrange
            const matcher = jest.fn().mockReturnValue(true);
            const operationToString = jest.fn();
            const mockFn = mockRequester(matcher, operationToString);

            // Act
            mockFn.mockOperation(
                "THE MOCK DESCRIPTION",
                RespondWith.text("TADA!"),
            );
            const response = await mockFn("DO SOMETHING");
            const result = response.text();

            // Assert
            await expect(result).resolves.toBe("TADA!");
        });

        it("should skip mock if matcher returns false and try more mocks", async () => {
            // Arrange
            const matcher = jest
                .fn()
                .mockReturnValueOnce(false)
                .mockReturnValueOnce(true);
            const operationToString = jest.fn();
            const mockFn = mockRequester(matcher, operationToString);

            // Act
            mockFn.mockOperation(
                "THE MOCK DESCRIPTION 1",
                RespondWith.text("ONE"),
            );
            mockFn.mockOperation(
                "THE MOCK DESCRIPTION 2",
                RespondWith.text("TWO"),
            );
            const response = await mockFn("DO SOMETHING");
            const result = response.text();

            // Assert
            await expect(result).resolves.toBe("TWO");
        });
    });

    describe("mockOperationOnce", () => {
        it("should invoke matcher with mock for a request", async () => {
            // Arrange
            const matcher = jest.fn().mockReturnValue(true);
            const operationToString = jest.fn();
            const mockFn = mockRequester(matcher, operationToString);

            // Act
            mockFn.mockOperationOnce(
                "THE MOCK DESCRIPTION",
                RespondWith.text("TADA!"),
            );
            await mockFn("any", "arguments", {we: {want: 42}});

            // Assert
            expect(matcher).toHaveBeenCalledWith(
                "THE MOCK DESCRIPTION",
                "any",
                "arguments",
                {
                    we: {want: 42},
                },
            );
        });

        it("should match once", async () => {
            // Arrange
            const matcher = jest.fn().mockReturnValue(true);
            const operationToString = jest.fn();
            const mockFn = mockRequester(matcher, operationToString);

            // Act
            mockFn.mockOperationOnce(
                "THE MOCK DESCRIPTION",
                RespondWith.text("TADA!"),
            );
            const response = await mockFn("DO SOMETHING");
            const result = response.text();

            // Assert
            await expect(result).resolves.toBe("TADA!");
        });

        it("should only match once", async () => {
            // Arrange
            const matcher = jest.fn().mockReturnValue(true);
            const operationToString = jest.fn();
            const mockFn = mockRequester(matcher, operationToString);

            // Act
            mockFn.mockOperationOnce(
                "THE MOCK DESCRIPTION",
                RespondWith.text("TADA!"),
            );
            const result = Promise.all([
                mockFn("DO SOMETHING"),
                mockFn("DO SOMETHING"),
            ]);

            // Assert
            await expect(result).rejects.toThrowError();
        });

        it("should skip mock if matcher returns false and try more mocks", async () => {
            // Arrange
            const matcher = jest
                .fn()
                .mockReturnValueOnce(false)
                .mockReturnValueOnce(true);
            const operationToString = jest.fn();
            const mockFn = mockRequester(matcher, operationToString);

            // Act
            mockFn.mockOperationOnce(
                "THE MOCK DESCRIPTION 1",
                RespondWith.text("ONE"),
            );
            mockFn.mockOperationOnce(
                "THE MOCK DESCRIPTION 2",
                RespondWith.text("TWO"),
            );
            const response = await mockFn("DO SOMETHING");
            const result = response.text();

            // Assert
            await expect(result).resolves.toBe("TWO");
        });
    });
});
