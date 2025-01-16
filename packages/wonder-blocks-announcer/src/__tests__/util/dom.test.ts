import {screen, waitFor} from "@testing-library/react";
import {
    createRegionWrapper,
    createDuplicateRegions,
    createRegion,
    removeMessage,
} from "../../util/dom";
import {PolitenessLevel} from "../../../types/announcer.types";

jest.useFakeTimers();
jest.spyOn(global, "setTimeout");

describe("Announcer utility functions", () => {
    describe("createRegionWrapper", () => {
        test("it creates a polite region wrapper element", () => {
            const element = createRegionWrapper("polite");

            expect(element.tagName).toBe("DIV");
            expect(element.id).toEqual("wbAWrap-polite");
        });

        test("it creates an assertive region wrapper element", () => {
            const element = createRegionWrapper("assertive");

            expect(element.tagName).toBe("DIV");
            expect(element.id).toEqual("wbAWrap-assertive");
        });
    });

    describe("createDuplicateRegions", () => {
        test.each(["polite", "assertive"])(
            "it creates a group of multiple %s Live Region elements",
            (politenessLevel) => {
                const wrapper = document.createElement("div");
                const dictionary = new Map();

                const regionList = createDuplicateRegions(
                    wrapper,
                    politenessLevel as PolitenessLevel,
                    2,
                    dictionary,
                );

                expect(regionList.length).toBe(2);
                expect(regionList[0].id).toBe(`wbARegion-${politenessLevel}0`);
                expect(regionList[1].id).toBe(`wbARegion-${politenessLevel}1`);
                expect(dictionary.size).toBe(2);
            },
        );
    });

    describe("createRegion", () => {
        test.each(["polite", "assertive"])(
            "it creates a %s Live Region element",
            (politenessLevel) => {
                // Arrange
                const dictionary = new Map();

                // Act
                const region = createRegion(
                    politenessLevel as PolitenessLevel,
                    0,
                    dictionary,
                );

                // Assert
                expect(region.getAttribute("aria-live")).toBe(politenessLevel);
                expect(region.getAttribute("role")).toBe("log");
                expect(dictionary.size).toBe(1);
            },
        );

        test("it allows the role to be overridden", () => {
            const dictionary = new Map();
            const region = createRegion("polite", 0, dictionary, "timer");

            expect(region.getAttribute("aria-live")).toBe("polite");
            expect(region.getAttribute("role")).toBe("timer");
        });
    });

    describe("removeMessage", () => {
        test("it removes an element from the DOM", async () => {
            // Arrange
            const message = document.createElement("p");
            document.body.appendChild(message);
            expect(message).toBeInTheDocument();

            // Act
            removeMessage(message, 0);

            // Assert
            await waitFor(() => {
                expect(message).not.toBeInTheDocument();
            });
        });

        test("it removes an element after a configurable delay", async () => {
            // Arrange
            const messageText = "Thar she blows";
            const message = document.createElement("p");
            message.textContent = messageText;
            document.body.appendChild(message);

            const delay = 300;

            // Act
            removeMessage(message, delay);

            // Assert
            expect(setTimeout).toHaveBeenLastCalledWith(
                expect.any(Function),
                delay,
            );
            await waitFor(() => {
                expect(screen.queryByText(messageText)).not.toBeInTheDocument();
            });
        });
    });
});
