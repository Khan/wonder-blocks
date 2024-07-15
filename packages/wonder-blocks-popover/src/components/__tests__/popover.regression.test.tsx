import * as React from "react";
import {render, screen, waitFor} from "@testing-library/react";
import Popover from "../popover";

describe("Popover", () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });
    it("should do something", async () => {
        render(
            <div style={{maxWidth: "400px", margin: "2em"}}>
                <Popover
                    content={<div>Hello world!</div>}
                    dismissEnabled
                    opened={true}
                >
                    <div>Open me</div>
                </Popover>
                <button aria-label="Keypad toggle">{"open keypad"}</button>
            </div>,
        );

        await waitFor(() => expect(screen.getByText("Open me")).toBeVisible());
    });
});
