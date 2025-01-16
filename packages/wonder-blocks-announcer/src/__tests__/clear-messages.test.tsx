import {screen, waitFor} from "@testing-library/react";
import {announceMessage} from "../announce-message";
import {clearMessages} from "../clear-messages";

jest.useFakeTimers();

describe("Announcer.clearMessages", () => {
    test("empties a targeted live region element by IDREF", async () => {
        // ARRANGE
        const message1 = "Shine a million stars";
        const message2 = "Dull no stars";

        // ACT
        const announcement1Id = await announceMessage({
            message: message1,
            initialTimeout: 0,
            debounceThreshold: 0,
        });

        const region1 = screen.getByTestId("wbARegion-polite1");

        jest.advanceTimersByTime(250);

        await waitFor(() => {
            expect(region1).toHaveTextContent(message1);
        });

        await announceMessage({
            message: message2,
            initialTimeout: 0,
            debounceThreshold: 0,
        });

        const region2 = screen.getByTestId("wbARegion-polite0");

        jest.advanceTimersByTime(250);
        clearMessages(announcement1Id);

        // ASSERT
        await waitFor(() => {
            expect(region1).toBeEmptyDOMElement();
        });
        expect(region2).toHaveTextContent(message2);
    });

    test("empties all live region elements by default", async () => {
        // ARRANGE
        const message1 = "One fish two fish";
        const message2 = "Red fish blue fish";

        // ACT
        await announceMessage({
            message: message1,
            initialTimeout: 0,
            debounceThreshold: 0,
        });

        jest.advanceTimersByTime(250);

        const region1 = screen.queryByTestId("wbARegion-polite1");
        expect(region1).toHaveTextContent(message1);

        await announceMessage({
            message: message2,
            initialTimeout: 0,
            debounceThreshold: 0,
        });
        jest.advanceTimersByTime(250);
        const region2 = screen.getByTestId("wbARegion-polite0");
        expect(region2).toHaveTextContent(message2);

        await announceMessage({
            message: message1,
            level: "assertive",
            initialTimeout: 0,
            debounceThreshold: 0,
        });
        jest.advanceTimersByTime(250);
        const region3 = screen.getByTestId("wbARegion-assertive1");
        expect(region3).toHaveTextContent(message1);

        clearMessages();

        // ASSERT
        expect(region1).toBeEmptyDOMElement();
        expect(region2).toBeEmptyDOMElement();
        expect(region3).toBeEmptyDOMElement();
    });
});
