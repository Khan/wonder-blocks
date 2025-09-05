import * as React from "react";
import {render, screen, act} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";

import {
    getLayerRootElement,
    getLayerRootModalState,
    removeLayerRoot,
    LAYER_ROOT_ID,
    LAYER_ROOT_TESTID,
} from "@khanacademy/wonder-blocks-announcer";
import ModalLauncher from "../modal-launcher";
import OnePaneDialog from "../one-pane-dialog";

const user = userEvent.setup();

// Mock the action scheduler
jest.mock("@khanacademy/wonder-blocks-timing", () => ({
    withActionScheduler: (Component: any) => (props: any) => (
        <Component
            {...props}
            schedule={{
                animationFrame: (callback: () => void) => {
                    // Use setTimeout to simulate async behavior
                    setTimeout(callback, 0);
                },
            }}
        />
    ),
}));

const TestModal = ({closeModal}: {closeModal?: () => void}) => (
    <OnePaneDialog
        title="Test Modal"
        content={<div data-testid="modal-content">Modal Content</div>}
        footer={
            closeModal && (
                <button data-testid="close-button" onClick={closeModal}>
                    Close
                </button>
            )
        }
    />
);

describe("ModalLauncher Layer Root Integration", () => {
    beforeEach(() => {
        // Clean up any existing layer root and reset DOM
        removeLayerRoot();
        document.body.innerHTML = "";
        // Reset document body style that might be set by ScrollDisabler
        document.body.style.overflow = "";
    });

    afterEach(() => {
        // Clean up layer root after each test
        removeLayerRoot();
        document.body.innerHTML = "";
        document.body.style.overflow = "";
    });

    describe("Uncontrolled ModalLauncher", () => {
        it("should create layer root when modal opens", async () => {
            // Arrange
            render(
                <ModalLauncher modal={<TestModal />} testId="modal-backdrop">
                    {({openModal}) => (
                        <button data-testid="open-button" onClick={openModal}>
                            Open Modal
                        </button>
                    )}
                </ModalLauncher>,
            );

            // Act
            await user.click(screen.getByTestId("open-button"));

            await act(async () => {
                await new Promise((resolve) => setTimeout(resolve, 50));
            });

            // Assert
            const layerRoot = screen.getByTestId(LAYER_ROOT_TESTID);
            expect(layerRoot).toBeInTheDocument();
        });

        it("should set correct layer root ID when modal opens", async () => {
            // Arrange
            render(
                <ModalLauncher modal={<TestModal />} testId="modal-backdrop">
                    {({openModal}) => (
                        <button data-testid="open-button" onClick={openModal}>
                            Open Modal
                        </button>
                    )}
                </ModalLauncher>,
            );

            // Act
            await user.click(screen.getByTestId("open-button"));

            await act(async () => {
                await new Promise((resolve) => setTimeout(resolve, 50));
            });

            // Assert
            const layerRoot = screen.getByTestId(LAYER_ROOT_TESTID);
            expect(layerRoot).toHaveAttribute("id", LAYER_ROOT_ID);
        });

        it("should set modal state to true when modal opens", async () => {
            // Arrange
            render(
                <ModalLauncher modal={<TestModal />} testId="modal-backdrop">
                    {({openModal}) => (
                        <button data-testid="open-button" onClick={openModal}>
                            Open Modal
                        </button>
                    )}
                </ModalLauncher>,
            );

            // Act
            await user.click(screen.getByTestId("open-button"));

            await act(async () => {
                await new Promise((resolve) => setTimeout(resolve, 50));
            });

            // Assert
            expect(getLayerRootModalState()).toBe(true);
        });

        it("should set aria-modal to false when modal closes", async () => {
            // Arrange
            render(
                <ModalLauncher
                    modal={({closeModal}) => (
                        <TestModal closeModal={closeModal} />
                    )}
                    testId="modal-backdrop"
                >
                    {({openModal}) => (
                        <button data-testid="open-button" onClick={openModal}>
                            Open Modal
                        </button>
                    )}
                </ModalLauncher>,
            );

            // Act
            await user.click(screen.getByTestId("open-button"));
            await user.click(screen.getByTestId("close-button"));

            await act(async () => {
                await new Promise((resolve) => setTimeout(resolve, 50));
            });

            // Assert
            expect(getLayerRootModalState()).toBe(false);
        });

        it("should handle backdrop dismiss", async () => {
            // Arrange: Render ModalLauncher with testId
            render(
                <ModalLauncher modal={<TestModal />} testId="modal-backdrop">
                    {({openModal}) => (
                        <button data-testid="open-button" onClick={openModal}>
                            Open Modal
                        </button>
                    )}
                </ModalLauncher>,
            );

            // Act: Open the modal
            await user.click(screen.getByTestId("open-button"));

            await act(async () => {
                await new Promise((resolve) => setTimeout(resolve, 0));
            });

            expect(getLayerRootModalState()).toBe(true);

            // Act: Click backdrop to close (requires mouseDown + mouseUp)
            const backdrop = screen.getByTestId("modal-backdrop");
            await user.pointer([
                {target: backdrop, keys: "[MouseLeft>]"},
                {keys: "[/MouseLeft]"},
            ]);

            await act(async () => {
                await new Promise((resolve) => setTimeout(resolve, 50));
            });

            // Assert: Modal should close
            expect(getLayerRootModalState()).toBe(false);
        });

        it("should handle escape key dismiss", async () => {
            render(
                <ModalLauncher modal={<TestModal />}>
                    {({openModal}) => (
                        <button data-testid="open-button" onClick={openModal}>
                            Open Modal
                        </button>
                    )}
                </ModalLauncher>,
            );

            // Open the modal
            await user.click(screen.getByTestId("open-button"));
            expect(getLayerRootModalState()).toBe(true);

            // Press escape key
            await user.keyboard("{Escape}");

            await act(async () => {
                await new Promise((resolve) => setTimeout(resolve, 10));
            });

            expect(getLayerRootModalState()).toBe(false);
        });
    });

    describe("Controlled ModalLauncher", () => {
        it("should set modal state when opened prop changes from false to true", async () => {
            const TestControlledModal = () => {
                const [opened, setOpened] = React.useState(false);

                return (
                    <div>
                        <button
                            data-testid="control-button"
                            onClick={() => setOpened(!opened)}
                        >
                            Toggle Modal
                        </button>
                        <ModalLauncher
                            opened={opened}
                            onClose={() => setOpened(false)}
                            modal={<TestModal />}
                        />
                    </div>
                );
            };

            render(<TestControlledModal />);

            expect(getLayerRootModalState()).toBe(false);

            // Open the modal
            await user.click(screen.getByTestId("control-button"));
            expect(getLayerRootModalState()).toBe(true);

            // Close the modal
            await user.click(screen.getByTestId("control-button"));

            await act(async () => {
                // Allow state updates to complete
                await new Promise((resolve) => setTimeout(resolve, 50));
            });

            expect(getLayerRootModalState()).toBe(false);
        });

        it("should handle prop changes correctly", async () => {
            const TestPropChanges = () => {
                const [opened, setOpened] = React.useState(false);

                return (
                    <div>
                        <button
                            data-testid="open"
                            onClick={() => setOpened(true)}
                        >
                            Open
                        </button>
                        <button
                            data-testid="close"
                            onClick={() => setOpened(false)}
                        >
                            Close
                        </button>
                        <ModalLauncher
                            opened={opened}
                            onClose={() => setOpened(false)}
                            modal={<TestModal />}
                        />
                    </div>
                );
            };

            render(<TestPropChanges />);

            expect(getLayerRootModalState()).toBe(false);

            // Open
            await user.click(screen.getByTestId("open"));
            expect(getLayerRootModalState()).toBe(true);

            // Close
            await user.click(screen.getByTestId("close"));

            await act(async () => {
                await new Promise((resolve) => setTimeout(resolve, 50));
            });

            expect(getLayerRootModalState()).toBe(false);

            // Open again
            await user.click(screen.getByTestId("open"));
            expect(getLayerRootModalState()).toBe(true);
        });
    });

    describe("Multiple ModalLaunchers", () => {
        it("should handle multiple modals with shared layer root state", async () => {
            const TestMultipleModals = () => {
                const [modal1Open, setModal1Open] = React.useState(false);
                const [modal2Open, setModal2Open] = React.useState(false);

                return (
                    <div>
                        <ModalLauncher
                            opened={modal1Open}
                            onClose={() => setModal1Open(false)}
                            testId="modal-backdrop-1"
                            modal={
                                <OnePaneDialog
                                    title="Modal 1"
                                    content={
                                        <div data-testid="modal-1">Modal 1</div>
                                    }
                                />
                            }
                        />
                        <ModalLauncher
                            opened={modal2Open}
                            onClose={() => setModal2Open(false)}
                            testId="modal-backdrop-2"
                            modal={
                                <OnePaneDialog
                                    title="Modal 2"
                                    content={
                                        <div data-testid="modal-2">Modal 2</div>
                                    }
                                />
                            }
                        />
                        <button
                            data-testid="open-modal-1"
                            onClick={() => setModal1Open(true)}
                        >
                            Open Modal 1
                        </button>
                        <button
                            data-testid="open-modal-2"
                            onClick={() => setModal2Open(true)}
                        >
                            Open Modal 2
                        </button>
                    </div>
                );
            };

            render(<TestMultipleModals />);

            expect(getLayerRootModalState()).toBe(false);

            // Open first modal
            await user.click(screen.getByTestId("open-modal-1"));
            expect(getLayerRootModalState()).toBe(true);

            // Open second modal while first is open
            await user.click(screen.getByTestId("open-modal-2"));
            expect(getLayerRootModalState()).toBe(true);

            // Close first modal (second should still be open)
            const firstModalBackdrop = screen.getByTestId("modal-backdrop-1");
            await user.pointer([
                {target: firstModalBackdrop, keys: "[MouseLeft>]"},
                {keys: "[/MouseLeft]"},
            ]);

            await act(async () => {
                await new Promise((resolve) => setTimeout(resolve, 50));
            });

            // State should still be true because second modal is open
            expect(getLayerRootModalState()).toBe(true);

            // Close second modal
            const secondModalBackdrop = screen.getByTestId("modal-backdrop-2");
            await user.pointer([
                {target: secondModalBackdrop, keys: "[MouseLeft>]"},
                {keys: "[/MouseLeft]"},
            ]);

            await act(async () => {
                await new Promise((resolve) => setTimeout(resolve, 50));
            });

            expect(getLayerRootModalState()).toBe(false);
        });
    });

    describe("Modal content rendering in layer root", () => {
        it("should render modal content in layer root element", () => {
            render(
                <ModalLauncher
                    opened={true}
                    onClose={() => {}}
                    modal={<TestModal />}
                />,
            );

            const layerRoot = getLayerRootElement();
            const modalContent = screen.getByTestId("modal-content");

            expect(layerRoot?.contains(modalContent)).toBe(true);
        });

        it("should use layer root as portal target instead of document.body", () => {
            render(
                <ModalLauncher
                    opened={true}
                    onClose={() => {}}
                    modal={<TestModal />}
                />,
            );

            const layerRoot = getLayerRootElement();
            const modalContent = screen.getByTestId("modal-content");

            // Modal should be in layer root, not directly in document.body
            expect(layerRoot).toContainElement(modalContent);
        });
    });
});
