// @flow
import * as React from "react";
import {render, act as reactAct} from "@testing-library/react";
import {renderHook} from "@testing-library/react-hooks";

import {useOnline} from "../use-online.js";

describe("useOnline", () => {
    it("should return true when navigator.onLine is true", () => {
        // Arrange
        jest.spyOn(navigator, "onLine", "get").mockReturnValue(true);

        // Act
        const {result} = renderHook(useOnline);

        // Assert
        expect(result.current).toBeTrue();
    });

    it("should return false when navigator.onLine is false", () => {
        // Arrange
        jest.spyOn(navigator, "onLine", "get").mockReturnValue(false);

        // Act
        const {result} = renderHook(useOnline);

        // Assert
        expect(result.current).toBeFalse();
    });

    it("should re-render component when the online event fires", () => {
        // Arrange
        let renderCount = 0;
        const UnderTest = React.memo(() => {
            const online = useOnline();
            renderCount++;
            return <div>{online ? "online" : "offline"}</div>;
        });

        // Act
        render(<UnderTest />);
        reactAct(() => {
            window.dispatchEvent(new Event("online"));
        });

        // Assert
        expect(renderCount).toBe(2);
    });

    it("should re-render component when the offline event fires", () => {
        // Arrange
        let renderCount = 0;
        const UnderTest = React.memo(() => {
            const online = useOnline();
            renderCount++;
            return <div>{online ? "online" : "offline"}</div>;
        });

        // Act
        render(<UnderTest />);
        reactAct(() => {
            window.dispatchEvent(new Event("offline"));
        });

        // Assert
        expect(renderCount).toBe(2);
    });
});
