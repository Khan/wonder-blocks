import {debounce} from "../../util/util";

describe("Debouncing messages", () => {
    jest.useFakeTimers();

    test("a single message", async () => {
        // ARRANGE
        const callback = jest.fn((message: string) => message);
        const debounced = debounce(callback, 300);

        // ACT
        const resultPromise = debounced("Hello, World!");
        jest.advanceTimersByTime(300);

        // ASSERT
        await expect(resultPromise).resolves.toBe("Hello, World!");
    });

    test("resolving with the first argument passed if debounced multiple times", async () => {
        // ARRANGE
        const callback = jest.fn((message: string) => message);
        const debounced = debounce(callback, 500);

        // ACT
        debounced("First message");
        debounced("Second message");
        debounced("Third message");

        jest.advanceTimersByTime(500);

        expect(callback).toHaveBeenCalledTimes(1);

        // ASSERT
        expect(callback).toHaveBeenCalledWith("First message");
    });
});
