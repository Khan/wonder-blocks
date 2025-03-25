import Announcer from "../../announcer";
import {createDebounceFunction} from "../../util/util";

describe("Debouncing messages", () => {
    jest.useFakeTimers();

    test("a single message", async () => {
        // ARRANGE
        const announcer = Announcer.getInstance();
        const callback = jest.fn((message: string) => message);
        const debounced = createDebounceFunction(announcer, callback, 10);

        // ACT
        const result = debounced("Hello, World!");
        jest.advanceTimersByTime(100);

        // ASSERT
        await expect(result).resolves.toBe("Hello, World!");
    });

    test("resolving with the last argument passed if debounced multiple times", async () => {
        // ARRANGE
        const announcer = Announcer.getInstance();
        const callback = jest.fn((message: string) => message);
        const debounced = createDebounceFunction(announcer, callback, 500);

        // ACT
        debounced("First message");
        debounced("Second message");
        debounced("Third message");

        jest.advanceTimersByTime(500);

        expect(callback).toHaveBeenCalledTimes(1);

        // ASSERT
        expect(callback).toHaveBeenCalledWith("Third message");
    });
});
