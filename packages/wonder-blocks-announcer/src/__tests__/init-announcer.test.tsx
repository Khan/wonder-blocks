import {screen} from "@testing-library/react";
import Announcer from "../announcer";
import {initAnnouncer} from "../init-announcer";
import {announceMessage} from "../announce-message";

describe("Announcer.initAnnouncer", () => {
    let announcer: Announcer;
    afterEach(() => {
        announcer.reset();
    });

    it("injects the Announcer when called", () => {
        // Arrange
        announcer = initAnnouncer();
        // Act
        const regionWrapper = screen.getByTestId("wbAnnounce");
        // Assert
        expect(regionWrapper).toBeInTheDocument();
    });

    it("only injects one Announcer", () => {
        // Arrange
        announcer = initAnnouncer();
        announceMessage({message: "A thing"});
        // Act
        const regionWrapper = screen.getAllByTestId("wbAnnounce");
        // Assert
        expect(regionWrapper.length).toEqual(1);
    });
});
