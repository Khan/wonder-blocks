import * as React from "react";
import {render, screen, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {View} from "@khanacademy/wonder-blocks-core";
import Button from "@khanacademy/wonder-blocks-button";

import ModalLauncher from "../modal-launcher";
import OnePaneDialog from "../one-pane-dialog";

const exampleModal = (
    <OnePaneDialog
        title="Modal launcher test"
        content={<div data-modal-child />}
    />
);

describe("ModalLauncher", () => {
    window.scrollTo = jest.fn();

    test("Children can launch the modal", async () => {
        // Arrange
        render(
            <ModalLauncher modal={exampleModal} testId="modal-launcher-portal">
                {({openModal}: any) => <button onClick={openModal} />}
            </ModalLauncher>,
        );

        // Act
        userEvent.click(screen.getByRole("button"));

        const portal = screen.getByTestId("modal-launcher-portal");

        // Assert
        expect(portal).toBeInTheDocument();
    });

    test("Modal can be manually opened and closed", () => {
        // Arrange
        const UnderTest = ({opened}: {opened: boolean}) => (
            <ModalLauncher
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
        expect(screen.getByTestId("modal-launcher-portal")).toBeInTheDocument();
        rerender(<UnderTest opened={false} />);
        expect(
            screen.queryByTestId("modal-launcher-portal"),
        ).not.toBeInTheDocument();
    });

    test("Modal can close itself after launching", async () => {
        // Arrange
        const modalFn = ({closeModal}: {closeModal: () => void}) => (
            <OnePaneDialog
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
            <ModalLauncher
                modal={modalFn}
                onClose={onCloseMock}
                testId="modal-launcher-portal"
            >
                {({openModal}: any) => <button onClick={openModal} />}
            </ModalLauncher>,
        );

        userEvent.click(screen.getByRole("button"));

        // wait until the modal is open
        await screen.findByRole("dialog");

        // Act
        userEvent.click(screen.getByRole("button", {name: "Close it!"}));

        // Assert
        expect(onCloseMock).toHaveBeenCalled();
    });

    test("Pressing Escape closes the modal", async () => {
        // Arrange
        render(
            <ModalLauncher modal={exampleModal}>
                {({openModal}: any) => <button onClick={openModal} />}
            </ModalLauncher>,
        );

        // Launch the modal.
        userEvent.click(screen.getByRole("button"));

        // wait until the modal is open
        await screen.findByRole("dialog");

        // Act
        // Simulate an Escape keypress.
        userEvent.keyboard("{esc}");

        // Assert
        // Confirm that the modal is no longer mounted.
        await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    });

    test("Disable scrolling when the modal is open", async () => {
        // Arrange
        render(
            <ModalLauncher modal={exampleModal}>
                {({openModal}: any) => <button onClick={openModal} />}
            </ModalLauncher>,
        );

        // Act
        // Launch the modal.
        userEvent.click(screen.getByRole("button"));

        // wait until the modal is open
        await screen.findByRole("dialog");

        // Assert
        // Now that the modal is open, there should be a ScrollDisabler.
        expect(document.body).toHaveStyle("overflow: hidden");
    });

    test("re-enable scrolling after the modal is closed", async () => {
        // Arrange
        render(
            <ModalLauncher modal={exampleModal}>
                {({openModal}: any) => <button onClick={openModal} />}
            </ModalLauncher>,
        );

        // Launch the modal.
        userEvent.click(screen.getByRole("button"));

        await screen.findByRole("dialog");

        // Close the modal.
        userEvent.click(screen.getByRole("button", {name: "Close modal"}));

        // Assert
        // Now that the modal is closed, there should be no ScrollDisabler.
        expect(document.body).not.toHaveStyle("overflow: hidden");
    });

    test("using `opened` and `children` should warn", () => {
        // Arrange
        jest.spyOn(console, "warn");

        // Act
        render(
            <ModalLauncher
                modal={exampleModal}
                opened={false}
                onClose={() => {}}
            >
                {({openModal}: any) => <button onClick={openModal} />}
            </ModalLauncher>,
        );

        // Assert
        // eslint-disable-next-line no-console
        expect(console.warn).toHaveBeenCalledWith(
            "'children' and 'opened' can't be used together",
        );
    });

    test("using `opened` without `onClose` should throw", () => {
        // Arrange
        jest.spyOn(console, "warn");

        // Act
        render(<ModalLauncher modal={exampleModal} opened={false} />);

        // Assert
        // eslint-disable-next-line no-console
        expect(console.warn).toHaveBeenCalledWith(
            "'onClose' should be used with 'opened'",
        );
    });

    test("using neither `opened` nor `children` should throw", () => {
        // Arrange
        jest.spyOn(console, "warn");

        // Act
        render(<ModalLauncher modal={exampleModal} />);

        // Assert
        // eslint-disable-next-line no-console
        expect(console.warn).toHaveBeenCalledWith(
            "either 'children' or 'opened' must be set",
        );
    });

    test("If backdropDismissEnabled set to false, clicking the backdrop does not trigger `onClose`", () => {
        // Arrange
        const onClose = jest.fn();

        render(
            <ModalLauncher
                onClose={onClose}
                modal={exampleModal}
                opened={true}
                backdropDismissEnabled={false}
                testId="modal-launcher-backdrop"
            />,
        );

        // Act
        const backdrop = screen.getByTestId("modal-launcher-backdrop");
        userEvent.click(backdrop);

        // Assert
        expect(onClose).not.toHaveBeenCalled();
    });

    test("if modal is launched, move focus inside the modal", async () => {
        // Arrange
        render(
            <ModalLauncher
                modal={
                    <OnePaneDialog
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
            </ModalLauncher>,
        );

        const modalOpener = screen.getByRole("button", {name: "Open modal"});
        // force focus
        modalOpener.focus();

        // Act
        // Launch the modal.
        userEvent.type(modalOpener, "{enter}");

        // wait until the modal is open
        await screen.findByRole("dialog");

        // Assert
        await waitFor(() =>
            expect(
                screen.getByRole("button", {name: "Button in modal"}),
            ).toHaveFocus(),
        );
    });

    test("if modal is closed, return focus to the last element focused outside the modal", async () => {
        // Arrange
        const ModalLauncherWrapper = () => {
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
                    <Button
                        testId="launcher-button"
                        onClick={() => handleOpen()}
                    >
                        Open modal
                    </Button>
                    <ModalLauncher
                        onClose={() => handleClose()}
                        opened={opened}
                        modal={({closeModal}: any) => (
                            <OnePaneDialog
                                title="Regular modal"
                                content={<View>Hello World</View>}
                                footer={
                                    <Button
                                        testId="modal-close-button"
                                        onClick={closeModal}
                                    >
                                        Close Modal
                                    </Button>
                                }
                            />
                        )}
                    />
                </View>
            );
        };

        render(<ModalLauncherWrapper />);

        const lastButton = await screen.findByTestId("launcher-button");

        // Launch the modal.
        userEvent.click(lastButton);

        // Act
        // Close modal
        const modalCloseButton = await screen.findByTestId(
            "modal-close-button",
        );
        userEvent.click(modalCloseButton);

        // Assert
        await waitFor(() => {
            expect(lastButton).toHaveFocus();
        });
    });

    test("if `closedFocusId` is passed, shift focus to specified element after the modal closes", async () => {
        // Arrange
        const ModalLauncherWrapper = () => {
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
                    <ModalLauncher
                        onClose={() => handleClose()}
                        opened={opened}
                        closedFocusId="button-to-focus-on"
                        modal={({closeModal}: any) => (
                            <OnePaneDialog
                                title="Triggered from action menu"
                                content={<View>Hello World</View>}
                                footer={
                                    <Button
                                        testId="modal-close-button"
                                        onClick={closeModal}
                                    >
                                        Close Modal
                                    </Button>
                                }
                            />
                        )}
                    />
                </View>
            );
        };

        render(<ModalLauncherWrapper />);

        // Launch modal
        const launcherButton = await screen.findByTestId("launcher-button");
        userEvent.click(launcherButton);

        // Act
        // Close modal
        const modalCloseButton = await screen.findByTestId(
            "modal-close-button",
        );
        userEvent.click(modalCloseButton);

        // Assert
        const focusedButton = await screen.findByTestId("focused-button");
        await waitFor(() => {
            expect(focusedButton).toHaveFocus();
        });
    });

    test("testId should be added to the Backdrop", () => {
        // Arrange
        render(
            <ModalLauncher
                opened={true}
                onClose={jest.fn()}
                modal={<div role="dialog">dialog</div>}
                testId="test-id-example"
            />,
        );

        // Act
        const backdrop = screen.getByTestId("test-id-example");

        // Assert
        expect(backdrop).toBeInTheDocument();
    });
});
