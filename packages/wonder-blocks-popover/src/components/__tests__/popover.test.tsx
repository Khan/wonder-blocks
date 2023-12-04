import * as React from "react";
import {render, screen, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {View} from "@khanacademy/wonder-blocks-core";
import Button from "@khanacademy/wonder-blocks-button";

import {fireEvent} from "@storybook/testing-library";
import Popover from "../popover";
import PopoverContent from "../popover-content";
import {PopoverContentCore} from "../../index";

describe("Popover", () => {
    it("should set the anchor as the popover ref", async () => {
        // Arrange
        const ref: React.RefObject<HTMLButtonElement> = React.createRef();

        render(
            <Popover
                placement="top"
                content={<PopoverContent title="Title" content="content" />}
            >
                {({open}: any) => (
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

    it("should shift-tab back to the anchor after popover is closed", async () => {
        // Arrange
        const PopoverComponent = () => {
            const [opened, setOpened] = React.useState(true);
            return (
                <View>
                    <Popover
                        opened={opened}
                        onClose={() => {
                            setOpened(false);
                        }}
                        content={({close}) => (
                            <PopoverContent
                                title="Controlled popover"
                                content="This popover is controlled programatically."
                                actions={
                                    <Button
                                        onClick={() => {
                                            close();
                                        }}
                                    >
                                        Click to close the popover
                                    </Button>
                                }
                            />
                        )}
                    >
                        <Button>Anchor element</Button>
                    </Popover>
                    <Button onClick={() => setOpened(true)}>
                        Outside button (click here to re-open the popover)
                    </Button>
                </View>
            );
        };

        render(<PopoverComponent />);

        // Act
        const closeButton = screen.getByRole("button", {
            name: "Click to close the popover",
        });
        closeButton.click();
        // Shift-tab over to the anchor button
        userEvent.tab({shift: true});
        userEvent.tab({shift: true});

        // Assert
        const anchorButton = screen.getByRole("button", {
            name: "Anchor element",
        });
        expect(anchorButton).toHaveFocus();
    });

    it("should close the popover when pressing Enter on the close button", async () => {
        // Arrange
        render(
            <Popover
                placement="top"
                onClose={jest.fn()}
                content={
                    <PopoverContent
                        title="Title"
                        content="content"
                        closeButtonVisible={true}
                        closeButtonLabel="Click to close popover"
                    />
                }
            >
                <Button onClick={jest.fn()}>Open default popover</Button>
            </Popover>,
        );

        // open the popover by focusing on the trigger element
        userEvent.tab();
        userEvent.keyboard("{enter}");

        // Act
        // Close the popover by pressing Enter on the close button.
        // NOTE: we need to use fireEvent here because userEvent doesn't support
        // keyUp/Down events and we use these handlers to override the default
        // behavior of the button.
        // eslint-disable-next-line testing-library/prefer-user-event
        fireEvent.keyDown(
            screen.getByRole("button", {name: "Click to close popover"}),
            {key: "Enter", code: "Enter", charCode: 13},
        );
        // eslint-disable-next-line testing-library/prefer-user-event
        fireEvent.keyDown(
            screen.getByRole("button", {name: "Click to close popover"}),
            {key: "Enter", code: "Enter", charCode: 13},
        );
        // eslint-disable-next-line testing-library/prefer-user-event
        fireEvent.keyUp(
            screen.getByRole("button", {name: "Click to close popover"}),
            {key: "Enter", code: "Enter", charCode: 13},
        );

        // Assert
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    describe("a11y", () => {
        it("should announce a popover correctly by reading the title contents", async () => {
            // Arrange
            render(
                <Popover
                    onClose={jest.fn()}
                    content={
                        <PopoverContent
                            title="The title is read by the screen reader"
                            content="content"
                            closeButtonVisible={true}
                            closeButtonLabel="Click to close popover"
                        />
                    }
                >
                    <Button>Open default popover</Button>
                </Popover>,
            );

            // Act
            // Open the popover
            userEvent.click(
                screen.getByRole("button", {name: "Open default popover"}),
            );

            // Assert
            expect(
                screen.getByRole("dialog", {
                    name: "The title is read by the screen reader",
                }),
            ).toBeInTheDocument();
        });

        it("should announce a custom popover correctly by reading the title contents", async () => {
            // Arrange
            render(
                <Popover
                    onClose={jest.fn()}
                    id="custom-popover"
                    content={
                        <PopoverContentCore closeButtonVisible={true}>
                            <h1 id="custom-popover-title">
                                This is a custom popover title
                            </h1>
                            <p id="custom-popover-content">
                                The custom popover description
                            </p>
                        </PopoverContentCore>
                    }
                >
                    <Button>Open default popover</Button>
                </Popover>,
            );

            // Act
            // Open the popover
            userEvent.click(
                screen.getByRole("button", {name: "Open default popover"}),
            );

            // Assert
            expect(
                screen.getByRole("dialog", {
                    name: "This is a custom popover title",
                }),
            ).toBeInTheDocument();
        });
    });
});
