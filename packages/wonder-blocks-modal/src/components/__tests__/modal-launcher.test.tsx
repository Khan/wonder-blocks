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

        // Assert
        expect(
            await screen.findByTestId("modal-launcher-portal"),
        ).toBeInTheDocument();
    });

    test("starts closed when modal prop is null", () => {
        // Arrange
        render(
            <ModalLauncher
                modal={null}
                onClose={() => {}}
                testId="modal-launcher-portal"
            />,
        );

        // Assert
        expect(
            screen.queryByTestId("modal-launcher-portal"),
        ).not.toBeInTheDocument();
    });

    test("shows portal when modal prop becomes non-null", async () => {
        // Arrange
        const UnderTest = ({isOpen}: {isOpen: boolean}) => (
            <ModalLauncher
                modal={isOpen ? exampleModal : null}
                onClose={() => {}}
                testId="modal-launcher-portal"
            />
        );
        const {rerender} = render(<UnderTest isOpen={false} />);

        // Act
        rerender(<UnderTest isOpen={true} />);

        // Assert
        expect(
            await screen.findByTestId("modal-launcher-portal"),
        ).toBeInTheDocument();
    });

    test("hides portal when modal prop returns to null", async () => {
        // Arrange
        const UnderTest = ({isOpen}: {isOpen: boolean}) => (
            <ModalLauncher
                modal={isOpen ? exampleModal : null}
                onClose={() => {}}
                testId="modal-launcher-portal"
            />
        );
        const {rerender} = render(<UnderTest isOpen={true} />);
        await screen.findByTestId("modal-launcher-portal");

        // Act
        rerender(<UnderTest isOpen={false} />);

        // Assert
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
        await userEvent.click(await screen.findByRole("button"));
        await screen.findByRole("dialog");

        // Act
        await userEvent.keyboard("{Escape}");

        // Assert
        await waitFor(() =>
            expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
        );
    });

    test("Disable scrolling when the modal is open", async () => {
        // Arrange
        render(
            <ModalLauncher modal={exampleModal}>
                {({openModal}: any) => <button onClick={openModal} />}
            </ModalLauncher>,
        );

        // Act
        await userEvent.click(await screen.findByRole("button"));
        await screen.findByRole("dialog");

        // Assert
        expect(document.body).toHaveStyle("overflow: hidden");
    });

    test("re-enable scrolling after the modal is closed", async () => {
        // Arrange
        render(
            <ModalLauncher modal={exampleModal}>
                {({openModal}: any) => <button onClick={openModal} />}
            </ModalLauncher>,
        );
        await userEvent.click(await screen.findByRole("button"));
        await screen.findByRole("dialog");

        // Act
        await userEvent.click(
            await screen.findByRole("button", {name: "Close modal"}),
        );

        // Assert
        expect(document.body).not.toHaveStyle("overflow: hidden");
    });

    test("using controlled mode (no children) without 'onClose' should warn", () => {
        // Arrange
        const warnSpy = jest
            .spyOn(console, "warn")
            .mockImplementation(() => {});

        // Act
        render(<ModalLauncher modal={exampleModal} />);

        // Assert
        expect(warnSpy).toHaveBeenCalledWith(
            "'onClose' should be provided when using ModalLauncher in controlled mode (without children)",
        );
    });

    test("using deprecated `opened` prop logs a deprecation warning", () => {
        // Arrange
        const warnSpy = jest
            .spyOn(console, "warn")
            .mockImplementation(() => {});

        // Act
        render(
            <ModalLauncher
                modal={exampleModal}
                opened={false}
                onClose={() => {}}
            />,
        );

        // Assert
        expect(warnSpy).toHaveBeenCalledWith(
            expect.stringContaining("`opened` prop is deprecated"),
        );
    });

    test("deprecated `opened` prop: starts closed when false", () => {
        // Arrange
        jest.spyOn(console, "warn").mockImplementation(() => {});

        // Act
        render(
            <ModalLauncher
                modal={exampleModal}
                opened={false}
                onClose={() => {}}
                testId="modal-launcher-portal"
            />,
        );

        // Assert
        expect(
            screen.queryByTestId("modal-launcher-portal"),
        ).not.toBeInTheDocument();
    });

    test("deprecated `opened` prop: shows portal when opened becomes true", async () => {
        // Arrange
        jest.spyOn(console, "warn").mockImplementation(() => {});
        const UnderTest = ({isOpen}: {isOpen: boolean}) => (
            <ModalLauncher
                modal={exampleModal}
                opened={isOpen}
                onClose={() => {}}
                testId="modal-launcher-portal"
            />
        );
        const {rerender} = render(<UnderTest isOpen={false} />);

        // Act
        rerender(<UnderTest isOpen={true} />);

        // Assert
        expect(
            await screen.findByTestId("modal-launcher-portal"),
        ).toBeInTheDocument();
    });

    test("deprecated `opened` prop: hides portal when opened becomes false", async () => {
        // Arrange
        jest.spyOn(console, "warn").mockImplementation(() => {});
        const UnderTest = ({isOpen}: {isOpen: boolean}) => (
            <ModalLauncher
                modal={exampleModal}
                opened={isOpen}
                onClose={() => {}}
                testId="modal-launcher-portal"
            />
        );
        const {rerender} = render(<UnderTest isOpen={true} />);
        await screen.findByTestId("modal-launcher-portal");

        // Act
        rerender(<UnderTest isOpen={false} />);

        // Assert
        expect(
            screen.queryByTestId("modal-launcher-portal"),
        ).not.toBeInTheDocument();
    });

    test("Clicking outside the modal dialog closes it by default", async () => {
        // Arrange
        const ModalLauncherWrapper = () => {
            const [isOpen, setIsOpen] = React.useState(true);

            return (
                <ModalLauncher
                    modal={isOpen ? exampleModal : null}
                    onClose={() => setIsOpen(false)}
                    testId="modal-launcher-backdrop"
                />
            );
        };
        render(<ModalLauncherWrapper />);
        await screen.findByRole("dialog");
        const backdrop = await screen.findByTestId("modal-launcher-backdrop");

        // Act
        await userEvent.pointer([
            {target: backdrop, coords: {clientX: 10, clientY: 10}},
            {keys: "[MouseLeft>]", target: backdrop},
            {keys: "[/MouseLeft]", target: backdrop},
        ]);

        // Assert
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    test("Clicking outside the modal dialog closes it when backdropDismissEnabled is true", async () => {
        // Arrange
        const ModalLauncherWrapper = () => {
            const [isOpen, setIsOpen] = React.useState(true);

            return (
                <ModalLauncher
                    modal={isOpen ? exampleModal : null}
                    onClose={() => setIsOpen(false)}
                    backdropDismissEnabled={true}
                    testId="modal-launcher-backdrop"
                />
            );
        };
        render(<ModalLauncherWrapper />);
        const backdrop = screen.getByTestId("modal-launcher-backdrop");

        // Act
        await userEvent.pointer([
            {target: backdrop, coords: {clientX: 10, clientY: 10}},
            {keys: "[MouseLeft>]", target: backdrop},
            {keys: "[/MouseLeft]", target: backdrop},
        ]);

        // Assert
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    test("If backdropDismissEnabled set to false, clicking outside the modal does not close it", async () => {
        // Arrange
        const ModalLauncherWrapper = () => {
            const [isOpen, setIsOpen] = React.useState(true);

            return (
                <ModalLauncher
                    modal={isOpen ? exampleModal : null}
                    onClose={() => setIsOpen(false)}
                    backdropDismissEnabled={false}
                    testId="modal-launcher-backdrop"
                />
            );
        };
        render(<ModalLauncherWrapper />);
        const backdrop = screen.getByTestId("modal-launcher-backdrop");

        // Act
        await userEvent.pointer([
            {target: backdrop, coords: {clientX: 10, clientY: 10}},
            {keys: "[MouseLeft>]", target: backdrop},
            {keys: "[/MouseLeft]", target: backdrop},
        ]);

        // Assert
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
        await userEvent.click(screen.getByRole("button"));
        const backdrop = screen.getByTestId("modal-launcher-backdrop");

        // Act
        await userEvent.pointer([
            {target: backdrop, coords: {clientX: 10, clientY: 10}},
            {keys: "[MouseLeft>]", target: backdrop},
            {keys: "[/MouseLeft]", target: backdrop},
        ]);

        // Assert
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    test("Clicking modal content does not close the modal", async () => {
        // Arrange
        const ModalLauncherWrapper = () => {
            const [isOpen, setIsOpen] = React.useState(true);

            return (
                <ModalLauncher
                    modal={isOpen ? exampleModal : null}
                    onClose={() => setIsOpen(false)}
                    testId="modal-launcher-backdrop"
                />
            );
        };
        render(<ModalLauncherWrapper />);

        // Act
        await userEvent.click(screen.getByRole("dialog"));

        // Assert
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
        await userEvent.tab();

        // Act
        await userEvent.keyboard("{enter}");
        await screen.findByRole("dialog");

        // Assert
        await waitFor(() =>
            expect(
                screen.getByRole("button", {name: "Close modal"}),
            ).toHaveFocus(),
        );
    });

    test("if modal is closed, return focus to the last element focused outside the modal", async () => {
        // Arrange
        const ModalLauncherWrapper = () => {
            const [isOpen, setIsOpen] = React.useState(false);

            return (
                <MemoryRouter>
                    <CompatRouter>
                        <View>
                            <Button>
                                Top of page (should not receive focus)
                            </Button>
                            <Button
                                testId="launcher-button"
                                onClick={() => setIsOpen(true)}
                            >
                                Open modal
                            </Button>
                            <ModalLauncher
                                onClose={() => setIsOpen(false)}
                                modal={
                                    isOpen
                                        ? ({closeModal}: any) => (
                                              <OnePaneDialog
                                                  title="Regular modal"
                                                  content={
                                                      <View>Hello World</View>
                                                  }
                                                  footer={
                                                      <Button
                                                          testId="modal-close-button"
                                                          onClick={closeModal}
                                                      >
                                                          Close Modal
                                                      </Button>
                                                  }
                                              />
                                          )
                                        : null
                                }
                            />
                        </View>
                    </CompatRouter>
                </MemoryRouter>
            );
        };
        render(<ModalLauncherWrapper />);
        const lastButton = await screen.findByTestId("launcher-button");
        await userEvent.click(lastButton);
        await screen.findByRole("dialog");

        // Act
        await userEvent.click(await screen.findByTestId("modal-close-button"));

        // Assert
        await waitFor(() => expect(lastButton).toHaveFocus());
    });

    test("if modal with controlled open state is closed, return focus to the last element focused outside the modal", async () => {
        // Arrange
        const ModalLauncherWrapper = () => {
            const [isOpen, setIsOpen] = React.useState(false);

            return (
                <MemoryRouter>
                    <CompatRouter>
                        <View>
                            <Button>
                                Top of page (should not receive focus)
                            </Button>
                            <Button
                                testId="launcher-button"
                                onClick={() => setIsOpen(true)}
                            >
                                Open modal
                            </Button>
                            <ModalLauncher
                                onClose={() => setIsOpen(false)}
                                modal={
                                    isOpen
                                        ? ({closeModal}: any) => (
                                              <OnePaneDialog
                                                  title="Regular modal"
                                                  content={
                                                      <View>Hello World</View>
                                                  }
                                                  footer={
                                                      <Button
                                                          testId="modal-close-button"
                                                          onClick={closeModal}
                                                      >
                                                          Close Modal
                                                      </Button>
                                                  }
                                              />
                                          )
                                        : null
                                }
                            />
                        </View>
                    </CompatRouter>
                </MemoryRouter>
            );
        };
        render(<ModalLauncherWrapper />);
        const lastButton = await screen.findByTestId("launcher-button");
        await userEvent.click(lastButton);
        await screen.findByRole("dialog");

        // Act
        await userEvent.click(await screen.findByTestId("modal-close-button"));

        // Assert
        await waitFor(() => expect(lastButton).toHaveFocus());
    });

    test("if `closedFocusId` is passed, shift focus to specified element after the modal closes", async () => {
        // Arrange
        const ModalLauncherWrapper = () => {
            const [isOpen, setIsOpen] = React.useState(false);

            return (
                <View>
                    <Button>Top of page (should not receive focus)</Button>
                    <Button id="button-to-focus-on" testId="focused-button">
                        Focus here after close
                    </Button>
                    <Button
                        testId="launcher-button"
                        onClick={() => setIsOpen(true)}
                    >
                        Open modal
                    </Button>
                    <ModalLauncher
                        onClose={() => setIsOpen(false)}
                        closedFocusId="button-to-focus-on"
                        modal={
                            isOpen
                                ? ({closeModal}: any) => (
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
                                  )
                                : null
                        }
                    />
                </View>
            );
        };
        render(<ModalLauncherWrapper />);
        await userEvent.click(await screen.findByTestId("launcher-button"));
        await screen.findByRole("dialog");

        // Act
        await userEvent.click(await screen.findByTestId("modal-close-button"));

        // Assert
        await waitFor(() =>
            expect(screen.getByTestId("focused-button")).toHaveFocus(),
        );
    });

    test("testId should be added to the Backdrop", async () => {
        // Arrange
        render(
            <ModalLauncher
                onClose={jest.fn()}
                modal={<div role="dialog">dialog</div>}
                testId="test-id-example"
            />,
        );

        // Assert
        expect(
            await screen.findByTestId("test-id-example"),
        ).toBeInTheDocument();
    });

    test("should handle focus correctly when opened programmatically through a wrapper component", async () => {
        // Arrange
        const WrappedModalLauncher = () => {
            const [isOpen, setIsOpen] = React.useState(false);

            return (
                <View>
                    <Button
                        testId="focused-button"
                        onClick={() => setIsOpen(true)}
                    >
                        Button that should receive focus
                    </Button>
                    <ModalLauncher
                        onClose={() => setIsOpen(false)}
                        modal={
                            isOpen
                                ? ({closeModal}) => (
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
                                  )
                                : null
                        }
                    />
                </View>
            );
        };
        render(<WrappedModalLauncher />);
        const buttonToFocus = await screen.findByTestId("focused-button");
        await userEvent.click(buttonToFocus);
        await screen.findByRole("dialog");

        // Act
        await userEvent.click(await screen.findByTestId("modal-close-button"));

        // Assert
        await waitFor(() => expect(buttonToFocus).toHaveFocus());
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
                        onClose={handleCloseModal}
                        closedFocusId={modalTriggerId || undefined}
                        modal={conditionalModal}
                    />
                </View>
            );
        };

        it.each([
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
        ])("$name", async ({triggerId, expectedTitle}) => {
            // Arrange
            render(<ConditionalModalContainer />);

            // Act
            await userEvent.click(await screen.findByTestId(triggerId));

            // Assert
            expect(await screen.findByText(expectedTitle)).toBeInTheDocument();
        });

        it.each([
            {
                name: "returns focus to correct button after closing content modal",
                triggerId: "content-modal-trigger-1",
            },
            {
                name: "returns focus to correct button after closing mastery modal from different row",
                triggerId: "mastery-modal-trigger-3",
            },
        ])("$name", async ({triggerId}) => {
            // Arrange
            render(<ConditionalModalContainer />);
            const button = await screen.findByTestId(triggerId);
            await userEvent.click(button);
            await screen.findByRole("dialog");

            // Act
            await userEvent.click(
                await screen.findByRole("button", {name: "Close modal"}),
            );

            // Assert
            await waitFor(() => expect(button).toHaveFocus());
        });

        test("closes modal and removes it from DOM", async () => {
            // Arrange
            render(<ConditionalModalContainer />);
            await userEvent.click(
                await screen.findByTestId("content-modal-trigger-1"),
            );
            await screen.findByRole("dialog");

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
            await userEvent.click(
                await screen.findByTestId("content-modal-trigger-1"),
            );
            await userEvent.click(
                await screen.findByRole("button", {name: "Close modal"}),
            );

            // Act
            await userEvent.click(
                await screen.findByTestId("mastery-modal-trigger-2"),
            );

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
            await screen.findByRole("dialog");

            // Act
            await userEvent.click(
                await screen.findByRole("button", {name: "Close modal"}),
            );

            // Assert
            await waitFor(() => expect(masteryButton2).toHaveFocus());
        });
    });
});
