import * as React from "react";
import {render, screen, waitFor} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";
import {MemoryRouter} from "react-router-dom";
import {CompatRouter} from "react-router-dom-v5-compat";

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
    beforeEach(() => {
        jest.spyOn(window, "scrollTo").mockImplementation(() => {});
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("Children can launch the modal", async () => {
        // Arrange
        render(
            <ModalLauncher modal={exampleModal} testId="modal-launcher-portal">
                {({openModal}: any) => <button onClick={openModal} />}
            </ModalLauncher>,
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
            <ModalLauncher modal={exampleModal}>
                {({openModal}: any) => <button onClick={openModal} />}
            </ModalLauncher>,
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
            <ModalLauncher modal={exampleModal}>
                {({openModal}: any) => <button onClick={openModal} />}
            </ModalLauncher>,
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
            <ModalLauncher modal={exampleModal}>
                {({openModal}: any) => <button onClick={openModal} />}
            </ModalLauncher>,
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

    test("using `opened` without `onClose` should throw", async () => {
        // Arrange
        jest.spyOn(console, "warn").mockImplementation(() => {});

        // Act
        render(<ModalLauncher modal={exampleModal} opened={false} />);

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
        render(<ModalLauncher modal={exampleModal} />);

        // Assert
        // eslint-disable-next-line no-console
        expect(console.warn).toHaveBeenCalledWith(
            "either 'children' or 'opened' must be set",
        );
    });

    test("Clicking outside the modal dialog closes it by default", async () => {
        // Arrange
        const ModalLauncherWrapper = () => {
            const [opened, setOpened] = React.useState(true);

            return (
                <ModalLauncher
                    modal={exampleModal}
                    opened={opened}
                    onClose={() => setOpened(false)}
                    testId="modal-launcher-backdrop"
                />
            );
        };

        render(<ModalLauncherWrapper />);

        await screen.findByRole("dialog");
        const backdrop = await screen.findByTestId("modal-launcher-backdrop");

        // Act
        // Click at top-left corner of the backdrop (outside the modal dialog)
        // This simulates a real user clicking outside the dialog
        await userEvent.pointer([
            {target: backdrop, coords: {clientX: 10, clientY: 10}},
            {keys: "[MouseLeft>]", target: backdrop},
            {keys: "[/MouseLeft]", target: backdrop},
        ]);

        // Assert - modal should be removed from DOM
        await expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    test("Clicking outside the modal dialog closes it when backdropDismissEnabled is true", async () => {
        // Arrange
        const ModalLauncherWrapper = () => {
            const [opened, setOpened] = React.useState(true);

            return (
                <ModalLauncher
                    modal={exampleModal}
                    opened={opened}
                    onClose={() => setOpened(false)}
                    backdropDismissEnabled={true}
                    testId="modal-launcher-backdrop"
                />
            );
        };

        render(<ModalLauncherWrapper />);

        const backdrop = screen.getByTestId("modal-launcher-backdrop");

        // Act
        // Click at top-left corner of the backdrop (outside the modal dialog)
        // This simulates a real user clicking outside the dialog
        await userEvent.pointer([
            {target: backdrop, coords: {clientX: 10, clientY: 10}},
            {keys: "[MouseLeft>]", target: backdrop},
            {keys: "[/MouseLeft]", target: backdrop},
        ]);

        // Assert - modal should be removed from DOM
        await expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    test("If backdropDismissEnabled set to false, clicking outside the modal does not close it", async () => {
        // Arrange
        const ModalLauncherWrapper = () => {
            const [opened, setOpened] = React.useState(true);

            return (
                <ModalLauncher
                    modal={exampleModal}
                    opened={opened}
                    onClose={() => setOpened(false)}
                    backdropDismissEnabled={false}
                    testId="modal-launcher-backdrop"
                />
            );
        };

        render(<ModalLauncherWrapper />);

        const backdrop = screen.getByTestId("modal-launcher-backdrop");

        // Act
        // Click at top-left corner of the backdrop (outside the modal dialog)
        // This simulates a real user clicking outside the dialog
        await userEvent.pointer([
            {target: backdrop, coords: {clientX: 10, clientY: 10}},
            {keys: "[MouseLeft>]", target: backdrop},
            {keys: "[/MouseLeft]", target: backdrop},
        ]);

        // Assert - modal should still be in DOM
        expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    test("Clicking outside the modal closes it with children render prop pattern", async () => {
        // Arrange
        render(
            <ModalLauncher
                modal={exampleModal}
                testId="modal-launcher-backdrop"
            >
                {({openModal}: any) => <button onClick={openModal} />}
            </ModalLauncher>,
        );

        // Open the modal
        await userEvent.click(screen.getByRole("button"));

        const backdrop = screen.getByTestId("modal-launcher-backdrop");

        // Act
        // Click at top-left corner of the backdrop (outside the modal dialog)
        // This simulates a real user clicking outside the dialog
        await userEvent.pointer([
            {target: backdrop, coords: {clientX: 10, clientY: 10}},
            {keys: "[MouseLeft>]", target: backdrop},
            {keys: "[/MouseLeft]", target: backdrop},
        ]);

        // Assert - modal should be removed from DOM
        await expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    test("Clicking modal content does not close the modal", async () => {
        // Arrange
        const ModalLauncherWrapper = () => {
            const [opened, setOpened] = React.useState(true);

            return (
                <ModalLauncher
                    modal={exampleModal}
                    opened={opened}
                    onClose={() => setOpened(false)}
                    testId="modal-launcher-backdrop"
                />
            );
        };

        render(<ModalLauncherWrapper />);

        const dialog = screen.getByRole("dialog");

        // Act
        await userEvent.click(dialog);

        // Assert - modal should still be in DOM
        expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    test("if modal is launched, move focus to first focusable element inside dialog", async () => {
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
        const ModalLauncherWrapper = () => {
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
                    </CompatRouter>
                </MemoryRouter>
            );
        };

        render(<ModalLauncherWrapper />);

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

    test("if modal with opened=true is closed, return focus to the last element focused outside the modal", async () => {
        // Arrange
        const ModalLauncherWrapper = () => {
            const [opened, setOpened] = React.useState(false);

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
                                onClick={() => setOpened(true)}
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
                    </CompatRouter>
                </MemoryRouter>
            );
        };

        render(<ModalLauncherWrapper />);

        const lastButton = await screen.findByTestId("launcher-button");
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
            <ModalLauncher
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

    test("should handle focus correctly when opened programmatically through a wrapper component", async () => {
        // Arrange
        const WrappedModalLauncher = () => {
            const [opened, setOpened] = React.useState(false);

            const handleClose = () => {
                setOpened(false);
            };

            return (
                <View>
                    <Button
                        testId="focused-button"
                        onClick={() => setOpened(true)}
                    >
                        Button that should receive focus
                    </Button>
                    <ModalLauncher
                        onClose={handleClose}
                        opened={opened}
                        modal={({closeModal}) => (
                            <OnePaneDialog
                                title="Modal"
                                content={<View>Content</View>}
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

        render(<WrappedModalLauncher />);

        // Focus the button before the modal opens
        const buttonToFocus = await screen.findByTestId("focused-button");
        await userEvent.click(buttonToFocus); // Move focus to the button

        // Act
        // Close modal
        const modalCloseButton =
            await screen.findByTestId("modal-close-button");
        await userEvent.click(modalCloseButton);

        // Assert
        await waitFor(() => {
            expect(buttonToFocus).toHaveFocus();
        });
    });

    describe("Conditional modal content pattern", () => {
        type Student = {
            id: string;
            name: string;
            progress: number;
        };

        const mockStudents: Array<Student> = [
            {id: "1", name: "Alice Smith", progress: 85},
            {id: "2", name: "Bob Johnson", progress: 70},
            {id: "3", name: "Charlie Brown", progress: 95},
        ];

        // Shared component for all tests
        const ConditionalModalContainer = () => {
            const [selectedItem, setSelectedItem] = React.useState<{
                type: "content" | "mastery";
                id: string;
            } | null>(null);
            const [modalTriggerId, setModalTriggerId] = React.useState<
                string | null
            >(null);

            const handleOpenModal = (
                type: "content" | "mastery",
                triggerId: string,
                studentId: string,
            ) => {
                setModalTriggerId(triggerId);
                setSelectedItem({type, id: studentId});
            };

            const handleCloseModal = () => {
                setSelectedItem(null);
                setModalTriggerId(null);
            };

            const selectedStudent = mockStudents.find(
                (s) => s.id === selectedItem?.id,
            );

            const conditionalModal = React.useMemo(() => {
                if (selectedItem?.type === "content") {
                    return (
                        <OnePaneDialog
                            title={`Content: ${selectedStudent?.name}`}
                            content={
                                <View testId="content-modal-content">
                                    Content completion details
                                </View>
                            }
                        />
                    );
                }
                if (selectedItem?.type === "mastery") {
                    return (
                        <OnePaneDialog
                            title={`Mastery: ${selectedStudent?.name}`}
                            content={
                                <View testId="mastery-modal-content">
                                    Mastery progress details
                                </View>
                            }
                        />
                    );
                }
                return null;
            }, [selectedItem, selectedStudent]);

            return (
                <View>
                    {mockStudents.map((student) => {
                        const contentTriggerId = `content-modal-trigger-${student.id}`;
                        const masteryTriggerId = `mastery-modal-trigger-${student.id}`;
                        return (
                            <View key={student.id}>
                                <Button
                                    testId={contentTriggerId}
                                    id={contentTriggerId}
                                    onClick={() =>
                                        handleOpenModal(
                                            "content",
                                            contentTriggerId,
                                            student.id,
                                        )
                                    }
                                >
                                    {`${student.name} - Content`}
                                </Button>
                                <Button
                                    testId={masteryTriggerId}
                                    id={masteryTriggerId}
                                    onClick={() =>
                                        handleOpenModal(
                                            "mastery",
                                            masteryTriggerId,
                                            student.id,
                                        )
                                    }
                                >
                                    {`${student.name} - Mastery`}
                                </Button>
                            </View>
                        );
                    })}
                    <ModalLauncher
                        opened={!!selectedItem}
                        onClose={handleCloseModal}
                        closedFocusId={modalTriggerId || undefined}
                        modal={conditionalModal}
                    />
                </View>
            );
        };

        // Parameterized tests for opening modals
        [
            {
                name: "opens content modal when clicking content button",
                triggerId: "content-modal-trigger-1",
                expectedTitle: "Content: Alice Smith",
            },
            {
                name: "opens mastery modal when clicking mastery button",
                triggerId: "mastery-modal-trigger-2",
                expectedTitle: "Mastery: Bob Johnson",
            },
        ].forEach(({name, triggerId, expectedTitle}) => {
            test(name, async () => {
                // Arrange
                render(<ConditionalModalContainer />);

                // Act
                const button = await screen.findByTestId(triggerId);
                await userEvent.click(button);

                // Assert
                expect(
                    await screen.findByText(expectedTitle),
                ).toBeInTheDocument();
            });
        });

        // Parameterized tests for focus management
        [
            {
                name: "returns focus to correct button after closing content modal",
                triggerId: "content-modal-trigger-1",
            },
            {
                name: "returns focus to correct button after closing mastery modal from different row",
                triggerId: "mastery-modal-trigger-3",
            },
        ].forEach(({name, triggerId}) => {
            test(name, async () => {
                // Arrange
                render(<ConditionalModalContainer />);
                const button = await screen.findByTestId(triggerId);

                // Act
                await userEvent.click(button);
                await userEvent.click(
                    await screen.findByRole("button", {name: "Close modal"}),
                );

                // Assert
                await waitFor(() => expect(button).toHaveFocus());
            });
        });

        test("closes modal and removes it from DOM", async () => {
            // Arrange
            render(<ConditionalModalContainer />);
            const contentButton = await screen.findByTestId(
                "content-modal-trigger-1",
            );
            await userEvent.click(contentButton);

            // Act
            await userEvent.click(
                await screen.findByRole("button", {name: "Close modal"}),
            );

            // Assert
            await waitFor(() =>
                expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
            );
        });

        test("opens different modal type after closing previous modal", async () => {
            // Arrange
            render(<ConditionalModalContainer />);
            const contentButton = await screen.findByTestId(
                "content-modal-trigger-1",
            );
            await userEvent.click(contentButton);
            await userEvent.click(
                await screen.findByRole("button", {name: "Close modal"}),
            );

            // Act
            const masteryButton = await screen.findByTestId(
                "mastery-modal-trigger-2",
            );
            await userEvent.click(masteryButton);

            // Assert
            expect(
                await screen.findByText("Mastery: Bob Johnson"),
            ).toBeInTheDocument();
        });

        test("returns focus to second button after closing its modal", async () => {
            // Arrange
            render(<ConditionalModalContainer />);
            const masteryButton2 = await screen.findByTestId(
                "mastery-modal-trigger-2",
            );
            await userEvent.click(masteryButton2);

            // Act
            await userEvent.click(
                await screen.findByRole("button", {name: "Close modal"}),
            );

            // Assert
            await waitFor(() => expect(masteryButton2).toHaveFocus());
        });
    });
});
