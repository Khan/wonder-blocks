import {debounce} from "../../util/util";

describe("Debouncing messages", () => {
    jest.useFakeTimers();

    test("a single message", async () => {
        // ARRANGE
        const callback = jest.fn((message: string) => message);
        const debounced = debounce(callback, 300);

        // ACT
        const resultPromise = debounced("Hello, World!");

        // ASSERT
        expect(resultPromise).toBeInstanceOf(Promise);

        jest.advanceTimersByTime(300);

        await expect(resultPromise).resolves.toBe("Hello, World!");
    });

    test("resolving with the last argument passed if debounced multiple times", async () => {
        // ARRANGE
        const callback = jest.fn((message: string) => message);
        const debounced = debounce(callback, 500);

        // ACT
        debounced("First message");
        debounced("Second message");
        const thirdCall = debounced("Third message");

        jest.advanceTimersByTime(500);

        await expect(thirdCall).resolves.toBe("Third message");
        expect(callback).toHaveBeenCalledTimes(1);

        // ASSERT
        expect(callback).toHaveBeenCalledWith("Third message");
    });
});
