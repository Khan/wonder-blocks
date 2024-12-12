import Announcer from "../../announcer";
import {createDebounceFunction} from "../../util/util";

describe("Debouncing messages", () => {
    jest.useFakeTimers();

    test("a single message", async () => {
        // ARRANGE
        const announcer = Announcer.getInstance();
        const callback = jest.fn((message: string) => message);
        const debounced = createDebounceFunction(announcer, callback, 100);

        // ACT
        const result = await debounced("Hello, World!");
        jest.advanceTimersByTime(100);

        // ASSERT
        expect(result).toBe("Hello, World!");
    });

    test("resolving with the first argument passed if debounced multiple times", async () => {
        // ARRANGE
        const callback = jest.fn((message: string) => message);
        const debounced = createDebounceFunction(window, callback, 500);

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
