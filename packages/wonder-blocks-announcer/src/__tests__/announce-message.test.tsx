import * as React from "react";
import {render, screen, waitFor} from "@testing-library/react";
import Announcer, {REMOVAL_TIMEOUT_DELAY} from "../announcer";
import {AnnounceMessageButton} from "./components/announce-message-button";
import {announceMessage} from "../announce-message";

jest.useFakeTimers();
jest.spyOn(global, "setTimeout");

describe("Announcer.announceMessage", () => {
    afterEach(() => {
        const announcer = Announcer.getInstance();
        jest.advanceTimersByTime(REMOVAL_TIMEOUT_DELAY);
        announcer.reset();
    });

    test("returns a targeted element IDREF", async () => {
        // ARRANGE
        const message1 = "One Fish Two Fish";

        // ACT
        const announcement1Id = await announceMessage({
            message: message1,
            initialTimeout: 0,
            debounceThreshold: 0,
        });
        jest.advanceTimersByTime(500);

        // ASSERT
        expect(announcement1Id).toBe("wbARegion-polite1");
    });

    test("creates the live region elements when called", () => {
        // ARRANGE
        const message = "Ta-da!";
        render(
            <AnnounceMessageButton message={message} debounceThreshold={0} />,
        );

        // ACT: call function
        const button = screen.getByRole("button");
        button.click();

        // ASSERT: expect live regions to exist
        const wrapperElement = screen.getByTestId("wbAnnounce");
        const regionElements = screen.queryAllByRole("log");
        expect(wrapperElement).toBeInTheDocument();
        expect(regionElements).toHaveLength(4);
    });

    test("appends to polite live regions by default", () => {
        // ARRANGE
        const message = "Ta-da, nicely!";
        render(
            <AnnounceMessageButton message={message} debounceThreshold={0} />,
        );

        // ACT: call function
        const button = screen.getByRole("button");
        button.click();

        // ASSERT: expect live regions to exist
        const politeRegion1 = screen.queryByTestId("wbARegion-polite0");
        const politeRegion2 = screen.queryByTestId("wbARegion-polite1");
        expect(politeRegion1).toHaveAttribute("aria-live", "polite");
        expect(politeRegion1).toHaveAttribute("id", "wbARegion-polite0");
        expect(politeRegion2).toHaveAttribute("aria-live", "polite");
        expect(politeRegion2).toHaveAttribute("id", "wbARegion-polite1");
    });

    test("appends messages in alternating polite live region elements", async () => {
        // ARRANGE
        const rainierMsg = "Rainier McCheddarton";
        const bagleyMsg = "Bagley Fluffpants";
        render(
            <AnnounceMessageButton
                message={rainierMsg}
                debounceThreshold={0}
            />,
        );
        render(
            <AnnounceMessageButton message={bagleyMsg} debounceThreshold={0} />,
        );

        // ACT: post two messages
        const button = screen.getAllByRole("button");
        button[0].click();

        jest.advanceTimersByTime(250);

        // ASSERT: check messages were appended to elements
        // The second region will be targeted first
        const message1Region = screen.queryByTestId("wbARegion-polite1");
        await waitFor(() => {
            expect(message1Region).toHaveTextContent(rainierMsg);
        });

        button[1].click();
        const message2Region = screen.queryByTestId("wbARegion-polite0");
        await waitFor(() => {
            expect(message2Region).toHaveTextContent(bagleyMsg);
        });
    });

    test("appends messages in alternating assertive live region elements", async () => {
        const rainierMsg = "Rainier McCheese";
        const bagleyMsg = "Bagley The Cat";
        render(
            <AnnounceMessageButton
                message={rainierMsg}
                level="assertive"
                debounceThreshold={0}
            />,
        );
        render(
            <AnnounceMessageButton
                message={bagleyMsg}
                level="assertive"
                debounceThreshold={0}
            />,
        );

        // ACT: post two messages
        const button = screen.getAllByRole("button");
        button[0].click();

        jest.advanceTimersByTime(250);

        // ASSERT: check messages were appended to elements
        // The second region will be targeted first
        const message1Region = screen.queryByTestId("wbARegion-assertive1");
        await waitFor(() => {
            expect(message1Region).toHaveTextContent(rainierMsg);
        });
        button[1].click();
        jest.advanceTimersByTime(250);

        const message2Region = screen.queryByTestId("wbARegion-assertive0");
        await waitFor(() => {
            expect(message2Region).toHaveTextContent(bagleyMsg);
        });
    });

    test("removes messages after a length of time", async () => {
        const message1 = "A Thing";

        // default timeout is 5000ms + 250ms (removalDelay + debounceThreshold)
        render(
            <AnnounceMessageButton message={message1} debounceThreshold={1} />,
        );

        const button = screen.getAllByRole("button");
        button[0].click();

        const message1Region = screen.queryByTestId("wbARegion-polite1");

        // Assert
        jest.advanceTimersByTime(500);
        expect(message1Region).toHaveTextContent(message1);

        expect(setTimeout).toHaveBeenNthCalledWith(
            1,
            expect.any(Function),
            5250,
        );

        jest.advanceTimersByTime(5250);
        await waitFor(() => {
            expect(screen.queryByText(message1)).not.toBeInTheDocument();
        });
    });
});
