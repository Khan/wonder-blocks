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
        const announcement1Id = announceMessage({
            message: message1,
            initialTimeout: 0,
            debounceThreshold: 0,
        });
        jest.advanceTimersByTime(500);

        // ASSERT
        await expect(announcement1Id).resolves.toBe("wbARegion-polite1");
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

        // default debounced content timeout is 5000ms + 250ms (removalDelay + debounceThreshold)
        render(
            <AnnounceMessageButton message={message1} debounceThreshold={1} />,
        );

        const button = screen.getAllByRole("button");
        button[0].click();

        const message1Region = screen.queryByTestId("wbARegion-polite1");

        // Assert
        jest.advanceTimersByTime(500);
        expect(message1Region).toHaveTextContent(message1);

        // This functional setTimeout (2) for the debounce comes after an initialTimeout
        // for Safari/VO in the announceMessage function (1).
        expect(setTimeout).toHaveBeenNthCalledWith(
            2,
            expect.any(Function),
            5250,
        );

        jest.advanceTimersByTime(5250);
        await waitFor(() => {
            expect(screen.queryByText(message1)).not.toBeInTheDocument();
        });
    });

    // eslint-disable-next-line testing-library/no-node-access
    // describe("modal context", () => {
    //     beforeEach(() => {
    //         // Create a mock modal element with aria-modal="true"
    //         const modalElement = document.createElement("div");
    //         modalElement.setAttribute("aria-modal", "true");
    //         modalElement.setAttribute("role", "dialog");
    //         modalElement.setAttribute("data-testid", "test-modal");
    //         document.body.appendChild(modalElement);
    //     });

    //     afterEach(() => {
    //         const announcer = Announcer.getInstance();
    //         jest.advanceTimersByTime(REMOVAL_TIMEOUT_DELAY);
    //         announcer.reset();

    //         // Clean up the modal element
    //         // eslint-disable-next-line testing-library/no-node-access
    //         const modalElement = document.querySelector('[aria-modal="true"]');
    //         if (modalElement) {
    //             modalElement.remove();
    //         }
    //     });

    //     test("creates modal-specific live regions when inModalContext is true", async () => {
    //         // ARRANGE
    //         const message = "Modal announcement";

    //         // ACT
    //         const announcement = announceMessage({
    //             message,
    //             inModalContext: true,
    //             initialTimeout: 0,
    //             debounceThreshold: 0,
    //         });

    //         jest.advanceTimersByTime(250);

    //         // ASSERT
    //         // eslint-disable-next-line testing-library/no-node-access
    //         const modalElement = document.querySelector('[aria-modal="true"]');
    //         expect(modalElement).toBeInTheDocument();

    //         // Check that modal-specific live regions were created
    //         const modalAnnouncer =
    //             modalElement?.querySelector("#wbAnnounce-modal");
    //         expect(modalAnnouncer).toBeInTheDocument();

    //         // Check that modal-specific regions have correct IDs
    //         const modalPoliteRegion = modalElement?.querySelector(
    //             "#wbARegion-modal-polite1",
    //         );
    //         expect(modalPoliteRegion).toBeInTheDocument();
    //         expect(modalPoliteRegion).toHaveAttribute("aria-live", "polite");

    //         // Check that the message was announced in the modal region
    //         await waitFor(() => {
    //             expect(modalPoliteRegion).toHaveTextContent(message);
    //         });

    //         // Check that the announcement returns the correct modal region ID
    //         await expect(announcement).resolves.toBe("wbARegion-modal-polite1");
    //     });

    //     test("creates modal-specific assertive regions", async () => {
    //         // ARRANGE
    //         const message = "Urgent modal announcement";

    //         // ACT
    //         const announcement = announceMessage({
    //             message,
    //             level: "assertive",
    //             inModalContext: true,
    //             initialTimeout: 0,
    //             debounceThreshold: 0,
    //         });

    //         jest.advanceTimersByTime(250);

    //         // ASSERT
    //         const modalElement = document.querySelector('[aria-modal="true"]');
    //         const modalAssertiveRegion = modalElement?.querySelector(
    //             "#wbARegion-modal-assertive1",
    //         );
    //         expect(modalAssertiveRegion).toBeInTheDocument();
    //         expect(modalAssertiveRegion).toHaveAttribute(
    //             "aria-live",
    //             "assertive",
    //         );

    //         await waitFor(() => {
    //             expect(modalAssertiveRegion).toHaveTextContent(message);
    //         });

    //         await expect(announcement).resolves.toBe(
    //             "wbARegion-modal-assertive1",
    //         );
    //     });

    //     test("alternates between modal regions for multiple messages", async () => {
    //         // ARRANGE
    //         const firstMessage = "First modal message";
    //         const secondMessage = "Second modal message";

    //         // ACT
    //         announceMessage({
    //             message: firstMessage,
    //             inModalContext: true,
    //             initialTimeout: 0,
    //             debounceThreshold: 0,
    //         });

    //         jest.advanceTimersByTime(250);

    //         announceMessage({
    //             message: secondMessage,
    //             inModalContext: true,
    //             initialTimeout: 0,
    //             debounceThreshold: 0,
    //         });

    //         jest.advanceTimersByTime(250);

    //         // ASSERT
    //         const modalElement = document.querySelector('[aria-modal="true"]');
    //         const modalRegion0 = modalElement?.querySelector(
    //             "#wbARegion-modal-polite0",
    //         );
    //         const modalRegion1 = modalElement?.querySelector(
    //             "#wbARegion-modal-polite1",
    //         );

    //         // First message should be in region 1
    //         expect(modalRegion1).toHaveTextContent(firstMessage);
    //         // Second message should be in region 0 (alternated)
    //         expect(modalRegion0).toHaveTextContent(secondMessage);
    //     });

    //     test("falls back to regular behavior when no modal is present", async () => {
    //         // ARRANGE
    //         const message = "No modal present";

    //         // Remove the modal element to simulate no modal present
    //         const modalElement = document.querySelector('[aria-modal="true"]');
    //         modalElement?.remove();

    //         // ACT
    //         const announcement = announceMessage({
    //             message,
    //             inModalContext: true,
    //             initialTimeout: 0,
    //             debounceThreshold: 0,
    //         });

    //         jest.advanceTimersByTime(250);

    //         // ASSERT
    //         // Should fall back to regular live regions
    //         const regularRegion = screen.queryByTestId("wbARegion-polite1");
    //         expect(regularRegion).toHaveTextContent(message);

    //         await expect(announcement).resolves.toBe("wbARegion-polite1");
    //     });

    //     test("reuses existing modal regions on subsequent calls", async () => {
    //         // ARRANGE
    //         const firstMessage = "First message";
    //         const secondMessage = "Second message";

    //         // ACT - First call creates modal regions
    //         announceMessage({
    //             message: firstMessage,
    //             inModalContext: true,
    //             initialTimeout: 0,
    //             debounceThreshold: 0,
    //         });

    //         jest.advanceTimersByTime(250);

    //         // Get reference to modal announcer after first call
    //         const modalElement = document.querySelector('[aria-modal="true"]');
    //         const modalAnnouncer =
    //             modalElement?.querySelector("#wbAnnounce-modal");

    //         // ACT - Second call should reuse existing regions
    //         announceMessage({
    //             message: secondMessage,
    //             inModalContext: true,
    //             initialTimeout: 0,
    //             debounceThreshold: 0,
    //         });

    //         jest.advanceTimersByTime(250);

    //         // ASSERT
    //         // Should still be the same modal announcer element
    //         const modalAnnouncerAfter =
    //             modalElement?.querySelector("#wbAnnounce-modal");
    //         expect(modalAnnouncerAfter).toBe(modalAnnouncer);

    //         // Should have both messages in different regions
    //         const modalRegion0 = modalElement?.querySelector(
    //             "#wbARegion-modal-polite0",
    //         );
    //         const modalRegion1 = modalElement?.querySelector(
    //             "#wbARegion-modal-polite1",
    //         );

    //         expect(modalRegion1).toHaveTextContent(firstMessage);
    //         expect(modalRegion0).toHaveTextContent(secondMessage);
    //     });
    // });
});
