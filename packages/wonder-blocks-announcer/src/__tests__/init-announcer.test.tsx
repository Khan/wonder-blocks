import {screen} from "@testing-library/react";
import Announcer from "../announcer";
import {initAnnouncer} from "../init-announcer";
import {announceMessage} from "../announce-message";

describe("Announcer.initAnnouncer", () => {
    it("injects the Announcer when called", () => {
        // Arrange
        initAnnouncer();
        // Act
        const regionWrapper = screen.getByTestId("wbAnnounce");
        // Assert
        expect(regionWrapper).toBeInTheDocument();
    });

    it("only injects one Announcer", () => {
        // Arrange
        initAnnouncer();
        announceMessage({message: "A thing"});
        // Act
        const regionWrapper = screen.getAllByTestId("wbAnnounce");
        // Assert
        expect(regionWrapper.length).toEqual(1);
    });

    describe("optional props: debounceThreshold", () => {
        it("updates the debounceThreshold", () => {
            // Arrange
            const announcer = Announcer.getInstance();
            const debounceConfigureSpy = jest.spyOn(
                announcer,
                "updateWaitThreshold",
            );
            // Act
            initAnnouncer({
                debounceThreshold: 0,
            });
            // Assert
            expect(debounceConfigureSpy).toHaveBeenCalledWith(0);
        });
    });

    describe("optional props: targetElement", () => {
        let announcer: Announcer;
        afterEach(() => {
            if (announcer) {
                announcer.destroy();
            }
        });

        it("mounts to document.body for Live Regions by default", () => {
            // Arrange
            announcer = initAnnouncer();

            // Act
            const liveRegionWrapper = screen.getByTestId("wbAnnounce");

            // Assert
            /* eslint-disable testing-library/no-node-access */
            expect(liveRegionWrapper.parentElement).toBe(document.body);
        });

        it("allows a custom targetElement for mounting Live Regions", async () => {
            // Arrange
            const div = document.createElement("div");
            div.setAttribute("data-testid", "wbAnnounceWrapper");
            document.body.appendChild(div);

            announcer = initAnnouncer({
                targetElement: div,
            });

            // Act
            const liveRegionWrapper = await screen.findByTestId("wbAnnounce");

            // Assert
            /* eslint-disable testing-library/no-node-access */
            expect(liveRegionWrapper.parentElement).toBe(div);
        });
    });
});
