import * as React from "react";
import {render, screen, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Popover from "../popover";
import PopoverContent from "../popover-content";
import {PopoverContentCore} from "../../index";

describe("Popover", () => {
    it("should set the anchor as the popover ref", async () => {
        // Arrange
        const ref = React.createRef();

        render(
            <Popover
                placement="top"
                content={<PopoverContent title="Title" content="content" />}
            >
                {({open}: any) => (
                    // @ts-expect-error [FEI-5019] - TS2322 - Type 'RefObject<unknown>' is not assignable to type 'LegacyRef<HTMLButtonElement> | undefined'.
                    <button data-anchor onClick={open} ref={ref}>
                        Open default popover
                    </button>
                )}
            </Popover>,
        );

        // Act

        // Assert
        await waitFor(() => {
            expect(ref.current).toBeInstanceOf(HTMLButtonElement);
        });
    });

    it("should hide the popover dialog by default", () => {
        // Arrange, Act
        render(
            <Popover
                placement="top"
                content={<PopoverContent title="Title" content="content" />}
            >
                {({open}: any) => (
                    <button data-anchor onClick={open}>
                        Open default popover
                    </button>
                )}
            </Popover>,
        );

        // Assert
        expect(screen.queryByText("Title")).not.toBeInTheDocument();
    });

    it("should render the popover content after clicking the trigger", () => {
        // Arrange
        render(
            <Popover
                placement="top"
                content={<PopoverContent title="Title" content="content" />}
            >
                {({open}: any) => (
                    <button data-anchor onClick={open}>
                        Open default popover
                    </button>
                )}
            </Popover>,
        );

        // Act
        userEvent.click(screen.getByRole("button"));

        // Assert
        expect(screen.getByText("Title")).toBeInTheDocument();
    });

    it("should close the popover from inside the content", () => {
        // Arrange
        const onCloseMock = jest.fn();

        render(
            <Popover
                placement="top"
                onClose={onCloseMock}
                content={({close}: any) => (
                    <PopoverContentCore>
                        <span>custom popover</span>
                        <button data-close-button onClick={close}>
                            close popover
                        </button>
                    </PopoverContentCore>
                )}
            >
                {({open}: any) => (
                    <button data-anchor onClick={open}>
                        Open default popover
                    </button>
                )}
            </Popover>,
        );

        // open the popover
        userEvent.click(screen.getByRole("button"));

        // Act
        // we try to close it from inside the content
        userEvent.click(screen.getByRole("button", {name: "close popover"}));

        // Assert
        expect(screen.queryByText("Title")).not.toBeInTheDocument();
        expect(onCloseMock).toBeCalled();
    });

    it("should close the Popover using the default close button", () => {
        // Arrange
        const onCloseMock = jest.fn();

        render(
            <Popover
                placement="top"
                onClose={onCloseMock}
                content={
                    <PopoverContent
                        title="Title"
                        content="content"
                        closeButtonVisible={true}
                        closeButtonLabel="Click to close popover"
                    />
                }
            >
                {({open}: any) => (
                    <button data-anchor onClick={open}>
                        Open default popover
                    </button>
                )}
            </Popover>,
        );

        // open the popover
        userEvent.click(screen.getByRole("button"));

        // Act
        // we try to close it using the default close button
        userEvent.click(
            screen.getByRole("button", {name: "Click to close popover"}),
        );

        // Assert
        expect(screen.queryByText("Title")).not.toBeInTheDocument();
        expect(onCloseMock).toBeCalled();
    });

    it("should close the Popover if dismissEnabled is set", async () => {
        // Arrange
        render(
            <Popover
                dismissEnabled={true}
                placement="top"
                content={<PopoverContent title="Title" content="content" />}
            >
                {({open}: any) => (
                    <button data-anchor onClick={open}>
                        Open default popover
                    </button>
                )}
            </Popover>,
        );

        // open the popover
        userEvent.click(
            screen.getByRole("button", {name: "Open default popover"}),
        );

        // Act
        // we try to close it using the same trigger element
        userEvent.click(
            screen.getByRole("button", {name: "Open default popover"}),
        );

        // Assert
        await waitFor(() => {
            expect(screen.queryByText("Title")).not.toBeInTheDocument();
        });
    });
});
