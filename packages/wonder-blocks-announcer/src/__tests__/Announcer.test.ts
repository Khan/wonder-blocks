import {screen} from "@testing-library/react";
import Announcer from "../Announcer";

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

    describe("announcing messages", () => {
        afterEach(() => {
            const announcer = Announcer.getInstance();
            announcer.reset();
        });

        test("appending a message", () => {
            // Arrange
            const announcer = Announcer.getInstance();
            expect(announcer.regionFactory.pIndex).toBe(0);

            // Act
            announcer.announce("a thing", "polite");

            // Assert
            expect(announcer.regionFactory.pIndex).toBe(1);
            expect(
                announcer.dictionary.get("wbARegion-polite1")?.element
                    .textContent,
            ).toBe("a thing");
        });

        test("appending two messages", () => {
            // Arrange
            const announcer = Announcer.getInstance();
            expect(announcer.regionFactory.pIndex).toBe(0);

            // Act
            announcer.announce("a nice thing", "polite");

            // Assert
            expect(announcer.regionFactory.pIndex).toBe(1);
            expect(
                announcer.dictionary.get("wbARegion-polite1")?.element
                    .textContent,
            ).toBe("a nice thing");

            announcer.announce("another nice thing", "polite");

            // Assert
            expect(announcer.regionFactory.pIndex).toBe(0);
            expect(
                announcer.dictionary.get("wbARegion-polite0")?.element
                    .textContent,
            ).toBe("another nice thing");
        });

        test("returning an IDREF", () => {
            // Arrange
            const announcer = Announcer.getInstance();
            expect(announcer.regionFactory.pIndex).toBe(0);

            // Act
            const idRef = announcer.announce("another thing", "polite");

            // Assert
            expect(idRef).toBe("wbARegion-polite1");
        });
    });

    describe("clearing messages", () => {
        test("clearing by IDREF", async () => {
            // Arrange
            const announcer = Announcer.getInstance();
            expect(announcer.regionFactory.pIndex).toBe(0);

            // Act
            const idRef = await announcer.announce("something", "polite");
            const firstRegion = announcer.dictionary.get(idRef)?.element;
            expect(firstRegion?.textContent).toBe("something");

            announcer.clear(idRef);

            // Assert
            expect(firstRegion?.textContent).not.toBe("something");
        });

        test("clearing all elements", () => {
            // Arrange
            const announcer = Announcer.getInstance();

            // Act
            announcer.announce("One Fish", "polite");
            announcer.announce("Loud Fish", "assertive");
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
