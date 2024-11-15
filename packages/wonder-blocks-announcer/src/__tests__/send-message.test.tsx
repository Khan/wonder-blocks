import * as React from "react";
import {render, screen} from "@testing-library/react";
import {SendMessageButton} from "../components/send-message-button";
import {sendMessage} from "../index";

describe("Announcer.sendMessage", () => {
    test("creates the live region elements when called", () => {
        // ARRANGE
        const message = "Ta-da!";
        render(<SendMessageButton message={message} />);

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
        render(<SendMessageButton message={message} />);

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
        render(<SendMessageButton message={rainierMsg} />);
        render(<SendMessageButton message={bagleyMsg} />);

        // ACT: post two messages
        const button = screen.getAllByRole("button");
        button[0].click();

        // ASSERT: check messages were appended to elements
        // The second region will be targeted first
        const message1Region = screen.queryByTestId("wbARegion-polite1");
        expect(message1Region).toHaveTextContent(rainierMsg);

        button[1].click();
        const message2Region = screen.queryByTestId("wbARegion-polite0");
        expect(message2Region).toHaveTextContent(bagleyMsg);
    });

    test("returns a targeted element IDREF", () => {
        // ARRANGE
        const message1 = "One Fish Two Fish";
        const message2 = "Red Fish Blue Fish";

        // ACT
        const announcement1Id = sendMessage({message: message1});
        const announcement2Id = sendMessage({message: message2});

        // ASSERT
        expect(announcement1Id).toBe("wbARegion-polite1");
        expect(announcement2Id).toBe("wbARegion-polite0");
    });

    test("appends messages in alternating assertive live region elements", () => {
        const rainierMsg = "Rainier McCheddarton";
        const bagleyMsg = "Bagley Fluffpants";
        render(<SendMessageButton message={rainierMsg} level="assertive" />);
        render(<SendMessageButton message={bagleyMsg} level="assertive" />);

        // ACT: post two messages
        const button = screen.getAllByRole("button");
        button[0].click();

        // ASSERT: check messages were appended to elements
        // The second region will be targeted first
        const message1Region = screen.queryByTestId("wbARegion-assertive1");
        expect(message1Region).toHaveTextContent(rainierMsg);

        button[1].click();
        const message2Region = screen.queryByTestId("wbARegion-assertive0");
        expect(message2Region).toHaveTextContent(bagleyMsg);
    });

    // test("removes messages after an optional delay", () => {
    //     const rainierMsg = "Rainier McCheddarton";
    //     const bagleyMsg = "Bagley Fluffpants";
    //     // default timeout is 5000ms
    //     render(<SendMessageButton message={rainierMsg} />);
    //     render(<SendMessageButton message={bagleyMsg} timeoutDelay={10000} />);
    // });
});
