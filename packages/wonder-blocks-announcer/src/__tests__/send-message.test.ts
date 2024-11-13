import {sendMessage} from "../index";

describe("Announcer.sendMessage", () => {
    it("creates the live region elements when called", () => {
        // ARRANGE
        const message = "Ta-da!";

        // ACT: call function
        sendMessage({message});

        // ASSERT: expect live regions to exist
        const wrapperElement = document.getElementById("wbAnnouncer");
        expect(wrapperElement).toBeInTheDocument();
    });

    xit("appends to polite live regions by default", () => {
        // ARRANGE
        const message = "Ta-da!";

        // ACT: call function
        sendMessage({message});

        // ASSERT: expect live regions to exist
        const wrapperElement = document.getElementById("wbAnnounceWrapper");
        expect(wrapperElement).toBeInTheDocument();
    });

    xit("appends messages in alternating polite live region elements", () => {});

    xit("appends messages in alternating assertive live region elements", () => {});

    xit("appends messages after an optional delay", () => {});

    xit("returns a targeted element IDREF", () => {});
});
