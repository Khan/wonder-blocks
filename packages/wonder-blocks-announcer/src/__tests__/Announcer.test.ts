import {screen} from "@testing-library/react";
import Announcer from "../Announcer";
import {
    createTestRegionList,
    createTestElements,
    resetTestElements,
} from "./util/util";

describe("Announcer class", () => {
    describe("instantiation", () => {
        test("creating one singleton instance", () => {
            // Arrange/Act
            const announcer = Announcer.getInstance();
            const announcer2 = Announcer.getInstance();

            // Assert: is this testing anything useful?
            expect(announcer).toEqual(announcer2);
        });

        test("initializing the element structure", () => {
            // Arrange/Act
            const announcer = Announcer.getInstance();
            const wrapperElement = announcer.node;
            const regions = announcer.dictionary;

            // Assert
            expect(wrapperElement).toBeInTheDocument();
            expect(wrapperElement?.childElementCount).toBe(2);
            expect(regions.size).toBe(4);
        });
    });

    describe("Debouncing messages", () => {
        jest.useFakeTimers();

        test("a single message", async () => {
            // ARRANGE
            const announcer = Announcer.getInstance();
            const callback = jest.fn((message: string) => message);
            const debounced = announcer.debounce(callback, 300);

            // ACT
            const resultPromise = debounced("Hello, World!");

            // ASSERT
            expect(resultPromise).toBeInstanceOf(Promise);

            jest.advanceTimersByTime(300);

            await expect(resultPromise).resolves.toBe("Hello, World!");
        });

        test("resolving with the last argument passed if debounced multiple times", async () => {
            // ARRANGE
            const announcer = Announcer.getInstance();
            const callback = jest.fn((message: string) => message);
            const debounced = announcer.debounce(callback, 500);

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

    describe("Appending messages", () => {
        let element1: HTMLElement | null = null;
        let element2: HTMLElement | null = null;

        beforeEach(() => {
            ({testElement1: element1, testElement2: element2} =
                createTestElements());
        });
        afterEach(() => {
            const announcer = Announcer.getInstance();
            resetTestElements(element1, element2);
            announcer.reset();
        });

        test("adding a polite message to a specific element index", () => {
            // ARRANGE
            const announcer = Announcer.getInstance();

            const regionList = createTestRegionList(
                "polite",
                element1 as HTMLElement,
                element2 as HTMLElement,
            );

            // ACT
            const index = announcer.appendMessage(
                "Saved by the bell!",
                "polite",
                regionList,
            );

            // ASSERT
            expect(index).toBe(1);
        });

        test("adding an assertive message to the DOM", () => {
            // ARRANGE
            const announcer = Announcer.getInstance();

            const regionList = createTestRegionList(
                "assertive",
                element1 as HTMLElement,
                element2 as HTMLElement,
            );

            // ACT
            const index = announcer.appendMessage(
                "Saved by the bell!",
                "assertive",
                regionList,
            );

            // ASSERT
            expect(index).toBe(1);
        });
    });

    describe("Announcing messages", () => {
        afterEach(() => {
            const announcer = Announcer.getInstance();
            announcer.reset();
        });

        test("a single message", async () => {
            // Arrange
            const announcer = Announcer.getInstance();
            expect(announcer.regionFactory.pIndex).toBe(0);

            // Act
            announcer.announce("a thing", "polite");

            // // Assert
            jest.advanceTimersByTime(500);
            expect(announcer.regionFactory.pIndex).toBe(1);
            expect(
                announcer.dictionary.get("wbARegion-polite1")?.element
                    .textContent,
            ).toBe("a thing");
        });

        test("two messages", async () => {
            // Arrange
            const announcer = Announcer.getInstance();
            expect(announcer.regionFactory.pIndex).toBe(0);

            // Act
            announcer.announce("a nice thing", "polite");

            // Assert
            jest.advanceTimersByTime(500);
            expect(announcer.regionFactory.pIndex).toBe(1);

            expect(
                announcer.dictionary.get("wbARegion-polite1")?.element
                    .textContent,
            ).toBe("a nice thing");

            announcer.announce("another nice thing", "polite");

            // Assert
            jest.advanceTimersByTime(500);
            expect(announcer.regionFactory.pIndex).toBe(0);
            expect(
                announcer.dictionary.get("wbARegion-polite0")?.element
                    .textContent,
            ).toBe("another nice thing");
        });

        test("returning an IDREF", async () => {
            // Arrange
            const announcer = Announcer.getInstance();
            expect(announcer.regionFactory.pIndex).toBe(0);

            // Act
            const idRef = announcer.announce("another thing", "polite");

            // Assert
            jest.advanceTimersByTime(500);
            await expect(idRef).resolves.toBe("wbARegion-polite1");
        });
    });

    describe("clearing messages", () => {
        test("clearing by IDREF", async () => {
            // Arrange
            const announcer = Announcer.getInstance();
            expect(announcer.regionFactory.pIndex).toBe(0);

            // Act
            const idRef = "wbARegion-polite0";
            const message = "This is a test";

            const firstRegion = announcer.dictionary.get(idRef)?.element;
            if (firstRegion) {
                firstRegion.textContent = message;
            }
            expect(firstRegion?.textContent).toBe(message);
            announcer.clear(idRef);

            // Assert
            expect(firstRegion?.textContent).not.toBe(message);
        });

        test("clearing all elements", async () => {
            // Arrange
            const announcer = Announcer.getInstance();

            // Act
            announcer.announce("One Fish", "polite");
            announcer.announce("Loud Fish", "assertive");

            jest.advanceTimersByTime(500);
            expect(screen.getByText("One Fish")).toBeInTheDocument();
            expect(screen.getByText("Loud Fish")).toBeInTheDocument();

            announcer.clear();

            // Assert
            expect(screen.queryByText("One Fish")).not.toBeInTheDocument();
            expect(screen.queryByText("Loud Fish")).not.toBeInTheDocument();
        });

        test("handling calls when nothing has been announced", () => {
            const announcer = Announcer.getInstance();

            expect(() => announcer.clear()).not.toThrow();
        });

        test("handling calls with an invalid IDREF", () => {
            const announcer = Announcer.getInstance();

            expect(() => announcer.clear("random-id")).not.toThrow();
        });
    });
});
