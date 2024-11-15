import {sendMessage} from "../index";

describe("Announcer.sendMessage", () => {
    it("creates the live region elements when called", () => {
        // ARRANGE
        const message = "Ta-da!";

        // ACT: call function
        sendMessage({message});

        // ASSERT: expect live regions to exist
        const wrapperElement = document.getElementById("wbAnnounce");
        const regionElements = document.querySelectorAll("[id^='wbARegion']");
        expect(wrapperElement).toBeInTheDocument();
        expect(regionElements).toHaveLength(4);
    });

    it("appends to polite live regions by default", () => {
        // ARRANGE
        const message = "Ta-da, nicely!";

        // ACT: call function
        sendMessage({message});

        // ASSERT: expect live regions to exist
        const politeRegions = document.querySelectorAll(
            "[id^='wbARegion-polite']",
        );
        const wrapperElement = document.getElementById("wbAnnounce");
        expect(wrapperElement).toBeInTheDocument();
        expect(politeRegions).toHaveLength(2);
        expect(politeRegions[0]).toHaveAttribute("aria-live", "polite");
        expect(politeRegions[0]).toHaveAttribute("id", "wbARegion-polite0");
        expect(politeRegions[1]).toHaveAttribute("aria-live", "polite");
        expect(politeRegions[1]).toHaveAttribute("id", "wbARegion-polite1");
    });

    it("appends messages in alternating polite live region elements", async () => {
        // ARRANGE
        const message1 = "Rainier McCheddarton";
        const message2 = "Bagley Fluffpants";

        // ACT: post two messages
        sendMessage({message: message1, timeoutDelay: 10});
        // sendMessage({message: message2});

        // ASSERT: check messages were appended to elements
        const politeRegions = document.querySelectorAll(
            "[id^='wbARegion-polite']",
        );
        console.log("test:", politeRegions[0].textContent);
        // The second region will be targeted first
        expect(politeRegions[0].textContent).toBe(message2);
        expect(politeRegions[1].textContent).toBe(message1);
    });

    it("returns a targeted element IDREF", () => {
        // ARRANGE
        const message1 = "One Fish Two Fish";
        const message2 = "Red Fish Blue Fish";

        // ACT
        const announcement1 = sendMessage({message: message1});
        const announcement2 = sendMessage({message: message2});

        // ASSERT
        expect(announcement1).toBe("wbARegion-polite0");
        expect(announcement2).toBe("wbARegion-polite1");
    });

    xit("appends messages in alternating assertive live region elements", () => {});

    xit("appends messages after an optional delay", () => {});
});
