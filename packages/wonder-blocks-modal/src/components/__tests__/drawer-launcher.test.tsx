import * as React from "react";
import {render, screen, waitFor} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";
import {MemoryRouter} from "react-router-dom";
import {CompatRouter} from "react-router-dom-v5-compat";

import {View} from "@khanacademy/wonder-blocks-core";
import Button from "@khanacademy/wonder-blocks-button";

import {BodyText} from "@khanacademy/wonder-blocks-typography";
import DrawerLauncher from "../drawer-launcher";
import FlexibleDialog from "../flexible-dialog";

const exampleModal = (
    <FlexibleDialog
        title="drawer launcher test"
        content={<div data-modal-child />}
    />
);

describe("DrawerLauncher", () => {
    window.scrollTo = jest.fn();

    test("Children can launch the modal", async () => {
        // Arrange
        render(
            <DrawerLauncher
                alignment="inlineEnd"
                modal={exampleModal}
                testId="modal-launcher-portal"
            >
                {({openModal}: any) => <button onClick={openModal} />}
            </DrawerLauncher>,
        );

        // Act
        await userEvent.click(await screen.findByRole("button"));

        const portal = await screen.findByTestId("modal-launcher-portal");

        // Assert
        expect(portal).toBeInTheDocument();
    });

    test("Modal can be manually opened and closed", async () => {
        // Arrange
        const UnderTest = ({opened}: {opened: boolean}) => (
            <DrawerLauncher
                alignment="inlineEnd"
                modal={exampleModal}
                opened={opened}
                onClose={() => {}}
                testId="modal-launcher-portal"
            />
        );
        const {rerender} = render(<UnderTest opened={false} />);

        // Act
        expect(
            screen.queryByTestId("modal-launcher-portal"),
        ).not.toBeInTheDocument();
        rerender(<UnderTest opened={true} />);
        expect(
            await screen.findByTestId("modal-launcher-portal"),
        ).toBeInTheDocument();
        rerender(<UnderTest opened={false} />);
        expect(
            screen.queryByTestId("modal-launcher-portal"),
        ).not.toBeInTheDocument();
    });

    test("Modal can close itself after launching", async () => {
        // Arrange
        const modalFn = ({closeModal}: {closeModal: () => void}) => (
            <FlexibleDialog
                title="Modal launcher test"
                content={
                    <View>
                        <Button onClick={closeModal}>Close it!</Button>
                    </View>
                }
            />
        );

        const onCloseMock = jest.fn();

        // Mount the modal launcher. This shouldn't trigger any closing yet,
        // because we shouldn't be calling the `modal` function yet.
        render(
            <DrawerLauncher
                alignment="inlineEnd"
                animated={false}
                modal={modalFn}
                onClose={onCloseMock}
                testId="modal-launcher-portal"
            >
                {({openModal}: any) => <button onClick={openModal} />}
            </DrawerLauncher>,
        );

        await userEvent.click(await screen.findByRole("button"));

        // wait until the modal is open
        await screen.findByRole("dialog");

        // Act
        await userEvent.click(
            await screen.findByRole("button", {name: "Close it!"}),
        );

        // Assert
        expect(onCloseMock).toHaveBeenCalled();
    });

    test("Pressing Escape closes the modal", async () => {
        // Arrange
        render(
            <DrawerLauncher alignment="inlineEnd" modal={exampleModal}>
                {({openModal}: any) => <button onClick={openModal} />}
            </DrawerLauncher>,
        );

        // Launch the modal.
        await userEvent.click(await screen.findByRole("button"));

        // wait until the modal is open
        await screen.findByRole("dialog");

        // Act
        // Simulate an Escape keypress.
        await userEvent.keyboard("{Escape}");

        // Assert
        // Confirm that the modal is no longer mounted.
        await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    });

    test("Disable scrolling when the modal is open", async () => {
        // Arrange
        render(
            <DrawerLauncher alignment="inlineEnd" modal={exampleModal}>
                {({openModal}: any) => <button onClick={openModal} />}
            </DrawerLauncher>,
        );

        // Act
        // Launch the modal.
        await userEvent.click(await screen.findByRole("button"));

        // wait until the modal is open
        await screen.findByRole("dialog");

        // Assert
        // Now that the modal is open, there should be a ScrollDisabler.
        expect(document.body).toHaveStyle("overflow: hidden");
    });

    test("re-enable scrolling after the modal is closed", async () => {
        // Arrange
        render(
            <DrawerLauncher
                alignment="inlineEnd"
                animated={false}
                modal={exampleModal}
            >
                {({openModal}: any) => <button onClick={openModal} />}
            </DrawerLauncher>,
        );

        // Launch the modal.
        await userEvent.click(await screen.findByRole("button"));

        await screen.findByRole("dialog");

        // Close the modal.
        await userEvent.click(
            await screen.findByRole("button", {name: "Close modal"}),
        );

        // Assert
        // Now that the modal is closed, there should be no ScrollDisabler.
        expect(document.body).not.toHaveStyle("overflow: hidden");
    });

    test("using `opened` and `children` should warn", async () => {
        // Arrange
        jest.spyOn(console, "warn").mockImplementation(() => {});

        // Act
        render(
            <DrawerLauncher
                alignment="inlineEnd"
                modal={exampleModal}
                opened={false}
                onClose={() => {}}
            >
                {({openModal}: any) => <button onClick={openModal} />}
            </DrawerLauncher>,
        );

        // Assert
        // eslint-disable-next-line no-console
        expect(console.warn).toHaveBeenCalledWith(
            "'children' and 'opened' can't be used together",
        );
    });

    test("using `opened` without `onClose` should throw", async () => {
        // Arrange
        jest.spyOn(console, "warn").mockImplementation(() => {});

        // Act
        render(
            <DrawerLauncher
                alignment="inlineEnd"
                modal={exampleModal}
                opened={false}
            />,
        );

        // Assert
        // eslint-disable-next-line no-console
        expect(console.warn).toHaveBeenCalledWith(
            "'onClose' should be used with 'opened'",
        );
    });

    test("using neither `opened` nor `children` should throw", async () => {
        // Arrange
        jest.spyOn(console, "warn").mockImplementation(() => {});

        // Act
        render(<DrawerLauncher alignment="inlineEnd" modal={exampleModal} />);

        // Assert
        // eslint-disable-next-line no-console
        expect(console.warn).toHaveBeenCalledWith(
            "either 'children' or 'opened' must be set",
        );
    });

    test("If backdropDismissEnabled set to false, clicking the backdrop does not trigger `onClose`", async () => {
        // Arrange
        const onClose = jest.fn();

        render(
            <DrawerLauncher
                alignment="inlineEnd"
                onClose={onClose}
                modal={exampleModal}
                opened={true}
                backdropDismissEnabled={false}
                testId="modal-launcher-backdrop"
            />,
        );

        // Act
        const backdrop = await screen.findByTestId("modal-launcher-backdrop");
        await userEvent.click(backdrop);

        // Assert
        expect(onClose).not.toHaveBeenCalled();
    });

    test("if modal is launched, move focus to first focusable element inside dialog", async () => {
        // Arrange
        render(
            <DrawerLauncher
                alignment="inlineEnd"
                modal={
                    <FlexibleDialog
                        title="Modal launcher test"
                        content={
                            <View>
                                <Button>Button in modal</Button>
                            </View>
                        }
                    />
                }
            >
                {({openModal}: any) => (
                    <button onClick={openModal}>Open modal</button>
                )}
            </DrawerLauncher>,
        );

        // focus on the open modal button
        await userEvent.tab();

        // Act
        // Launch the modal.
        await userEvent.keyboard("{enter}");

        // wait until the modal is open
        await screen.findByRole("dialog");

        // Assert
        await waitFor(async () =>
            expect(
                await screen.findByRole("button", {name: "Close modal"}),
            ).toHaveFocus(),
        );
    });

    test("if modal is closed, return focus to the last element focused outside the modal", async () => {
        // Arrange
        const DrawerLauncherWrapper = () => {
            const [opened, setOpened] = React.useState(false);

            const handleOpen = () => {
                setOpened(true);
            };

            const handleClose = () => {
                setOpened(false);
            };

            return (
                <MemoryRouter>
                    <CompatRouter>
                        <View>
                            <Button>
                                Top of page (should not receive focus)
                            </Button>
                            <Button
                                testId="launcher-button"
                                onClick={() => handleOpen()}
                            >
                                Open modal
                            </Button>
                            <DrawerLauncher
                                alignment="inlineStart"
                                onClose={() => handleClose()}
                                opened={opened}
                                modal={({closeModal}: any) => (
                                    <FlexibleDialog
                                        title="Regular modal"
                                        content={
                                            <View>
                                                <BodyText>Hello World</BodyText>
                                                <Button
                                                    testId="modal-close-button"
                                                    onClick={closeModal}
                                                >
                                                    Close Modal
                                                </Button>
                                            </View>
                                        }
                                    />
                                )}
                            />
                        </View>
                    </CompatRouter>
                </MemoryRouter>
            );
        };

        render(<DrawerLauncherWrapper />);

        const lastButton = await screen.findByTestId("launcher-button");

        // Launch the modal.
        await userEvent.click(lastButton);

        // Act
        // Close modal
        const modalCloseButton =
            await screen.findByTestId("modal-close-button");
        await userEvent.click(modalCloseButton);

        // Assert
        await waitFor(() => {
            expect(lastButton).toHaveFocus();
        });
    });

    test("if `closedFocusId` is passed, shift focus to specified element after the modal closes", async () => {
        // Arrange
        const DrawerLauncherWrapper = () => {
            const [opened, setOpened] = React.useState(false);

            const handleOpen = () => {
                setOpened(true);
            };

            const handleClose = () => {
                setOpened(false);
            };

            return (
                <View>
                    <Button>Top of page (should not receive focus)</Button>
                    <Button id="button-to-focus-on" testId="focused-button">
                        Focus here after close
                    </Button>
                    <Button
                        testId="launcher-button"
                        onClick={() => handleOpen()}
                    >
                        Open modal
                    </Button>
                    <DrawerLauncher
                        alignment="inlineStart"
                        onClose={() => handleClose()}
                        opened={opened}
                        closedFocusId="button-to-focus-on"
                        modal={({closeModal}: any) => (
                            <FlexibleDialog
                                title="Triggered from action menu"
                                content={
                                    <View>
                                        {" "}
                                        <Button
                                            testId="modal-close-button"
                                            onClick={closeModal}
                                        >
                                            Close Modal
                                        </Button>
                                    </View>
                                }
                            />
                        )}
                    />
                </View>
            );
        };

        render(<DrawerLauncherWrapper />);

        // Launch modal
        const launcherButton = await screen.findByTestId("launcher-button");
        await userEvent.click(launcherButton);

        // Act
        // Close modal
        const modalCloseButton =
            await screen.findByTestId("modal-close-button");
        await userEvent.click(modalCloseButton);

        // Assert
        const focusedButton = await screen.findByTestId("focused-button");
        await waitFor(() => {
            expect(focusedButton).toHaveFocus();
        });
    });

    test("testId should be added to the Backdrop", async () => {
        // Arrange
        render(
            <DrawerLauncher
                alignment="inlineEnd"
                opened={true}
                onClose={jest.fn()}
                modal={<div role="dialog">dialog</div>}
                testId="test-id-example"
            />,
        );

        // Act
        const backdrop = await screen.findByTestId("test-id-example");

        // Assert
        expect(backdrop).toBeInTheDocument();
    });

    test("FlexibleDialog receives correct animation props when passed directly", async () => {
        // Arrange
        render(
            <DrawerLauncher
                alignment="inlineEnd"
                animated={false}
                timingDuration={200}
                modal={
                    <FlexibleDialog
                        title="Animation test"
                        content={<div data-testid="modal-content" />}
                    />
                }
                opened={true}
                onClose={() => {}}
            />,
        );

        // Act
        const dialog = await screen.findByRole("dialog");

        // Assert
        expect(dialog).toHaveStyle({
            animationDuration: "200ms",
        });
    });

    test("FlexibleDialog receives correct animation props when returned from function", async () => {
        // Arrange
        render(
            <DrawerLauncher
                alignment="inlineEnd"
                animated={false}
                timingDuration={200}
                modal={({animated, timingDuration}) => (
                    <FlexibleDialog
                        title="Animation test"
                        content={
                            <div
                                data-testid="modal-content"
                                data-animated={animated}
                                data-timing={timingDuration}
                            />
                        }
                    />
                )}
                opened={true}
                onClose={() => {}}
            />,
        );

        // Act
        const content = await screen.findByTestId("modal-content");

        // Assert
        expect(content).toHaveAttribute("data-animated", "false");
        expect(content).toHaveAttribute("data-timing", "200");
    });

    test("Modal closes with animation when animated=true", async () => {
        // Arrange
        const onCloseMock = jest.fn();
        render(
            <DrawerLauncher
                alignment="inlineEnd"
                animated={true}
                timingDuration={100} // Short duration for test
                modal={
                    <FlexibleDialog
                        title="Animation test"
                        content={<div data-testid="modal-content" />}
                    />
                }
                opened={true}
                onClose={onCloseMock}
            />,
        );

        // Act
        const closeButton = await screen.findByRole("button", {
            name: "Close modal",
        });
        await userEvent.click(closeButton);

        // Assert
        expect(onCloseMock).not.toHaveBeenCalled();
        // Wait for animation
        await waitFor(
            () => {
                expect(onCloseMock).toHaveBeenCalled();
            },
            {timeout: 200}, // A bit longer than animation duration
        );
    });

    test("Modal closes immediately when animated=false", async () => {
        // Arrange
        const onCloseMock = jest.fn();
        render(
            <DrawerLauncher
                alignment="inlineEnd"
                animated={false}
                modal={
                    <FlexibleDialog
                        title="Animation test"
                        content={<div data-testid="modal-content" />}
                    />
                }
                opened={true}
                onClose={onCloseMock}
            />,
        );

        // Act
        const closeButton = await screen.findByRole("button", {
            name: "Close modal",
        });
        await userEvent.click(closeButton);

        // Assert
        expect(onCloseMock).toHaveBeenCalled();
    });

    test("Modal shows exit animation when closing via backdrop click", async () => {
        // Arrange
        const onCloseMock = jest.fn();
        render(
            <DrawerLauncher
                alignment="inlineEnd"
                animated={true}
                timingDuration={100} // Short duration for test
                modal={
                    <FlexibleDialog
                        title="Animation test"
                        content={<div data-testid="modal-content" />}
                    />
                }
                opened={true}
                onClose={onCloseMock}
                testId="modal-backdrop"
            />,
        );

        // Act
        const backdrop = await screen.findByTestId("modal-backdrop");
        await userEvent.click(backdrop);

        // Assert
        expect(onCloseMock).not.toHaveBeenCalled();
        // Wait for animation
        await waitFor(
            () => {
                expect(onCloseMock).toHaveBeenCalled();
            },
            {timeout: 200}, // A bit longer than animation duration
        );
    });

    test("Modal shows exit animation when closing via escape key", async () => {
        // Arrange
        const onCloseMock = jest.fn();
        render(
            <DrawerLauncher
                alignment="inlineEnd"
                animated={true}
                timingDuration={100} // Short duration for test
                modal={
                    <FlexibleDialog
                        title="Animation test"
                        content={<div data-testid="modal-content" />}
                    />
                }
                opened={true}
                onClose={onCloseMock}
            />,
        );

        // Act
        await userEvent.keyboard("{Escape}");

        // Assert
        expect(onCloseMock).not.toHaveBeenCalled();
        // Wait for animation
        await waitFor(
            () => {
                expect(onCloseMock).toHaveBeenCalled();
            },
            {timeout: 200}, // A bit longer than animation duration
        );
    });
});
