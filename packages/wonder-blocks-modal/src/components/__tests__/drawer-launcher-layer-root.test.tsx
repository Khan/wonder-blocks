import * as React from "react";
import {render, screen, act} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";

import {
    getLayerRootElement,
    getLayerRootModalState,
    removeLayerRoot,
    LAYER_ROOT_ID,
} from "@khanacademy/wonder-blocks-announcer";
import DrawerLauncher from "../drawer-launcher";
import DrawerDialog from "../drawer-dialog";

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

const TestDrawer = ({closeModal}: {closeModal?: () => void}) => (
    <DrawerDialog
        title="Test Drawer"
        content={
            <div>
                <div data-testid="drawer-content">Drawer Content</div>
                {closeModal && (
                    <button data-testid="close-button" onClick={closeModal}>
                        Close
                    </button>
                )}
            </div>
        }
    />
);

describe("DrawerLauncher Basic Layer Root Integration", () => {
    beforeEach(() => {
        // Clean up any existing layer root and reset modal state
        removeLayerRoot();
        document.body.innerHTML = "";
        document.body.style.overflow = "";
    });

    afterEach(() => {
        removeLayerRoot();
        document.body.innerHTML = "";
        document.body.style.overflow = "";
    });

    describe("Uncontrolled DrawerLauncher - Layer Root Creation", () => {
        it("should have modal state false initially", () => {
            // Arrange
            render(
                <DrawerLauncher alignment="inlineStart" modal={<TestDrawer />}>
                    {({openModal}) => (
                        <button data-testid="open-button" onClick={openModal}>
                            Open Drawer
                        </button>
                    )}
                </DrawerLauncher>,
            );

            // Assert - Modal state should be false when no drawer is open
            expect(getLayerRootModalState()).toBe(false);
        });

        it("should create layer root when drawer opens", async () => {
            // Arrange
            render(
                <DrawerLauncher alignment="inlineStart" modal={<TestDrawer />}>
                    {({openModal}) => (
                        <button data-testid="open-button" onClick={openModal}>
                            Open Drawer
                        </button>
                    )}
                </DrawerLauncher>,
            );

            // Act
            await user.click(screen.getByTestId("open-button"));

            // Assert
            expect(getLayerRootElement()).toBeInTheDocument();
        });

        it("should set correct layer root ID when drawer opens", async () => {
            // Arrange
            render(
                <DrawerLauncher alignment="inlineStart" modal={<TestDrawer />}>
                    {({openModal}) => (
                        <button data-testid="open-button" onClick={openModal}>
                            Open Drawer
                        </button>
                    )}
                </DrawerLauncher>,
            );

            // Act
            await user.click(screen.getByTestId("open-button"));
            const layerRoot = getLayerRootElement();

            // Assert
            expect(layerRoot?.id).toBe(LAYER_ROOT_ID);
        });

        it("should set modal state to true when drawer opens", async () => {
            // Arrange
            render(
                <DrawerLauncher alignment="inlineStart" modal={<TestDrawer />}>
                    {({openModal}) => (
                        <button data-testid="open-button" onClick={openModal}>
                            Open Drawer
                        </button>
                    )}
                </DrawerLauncher>,
            );

            // Act
            await user.click(screen.getByTestId("open-button"));

            // Assert
            expect(getLayerRootModalState()).toBe(true);
        });
    });
    describe("Uncontrolled DrawerLauncher - User Interactions", () => {
        it("should set aria-modal to false when drawer closes via close button", async () => {
            // Arrange
            render(
                <DrawerLauncher
                    alignment="inlineStart"
                    modal={({closeModal}) => (
                        <TestDrawer closeModal={closeModal} />
                    )}
                >
                    {({openModal}) => (
                        <button data-testid="open-button" onClick={openModal}>
                            Open Drawer
                        </button>
                    )}
                </DrawerLauncher>,
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
            // Arrange
            render(
                <DrawerLauncher
                    alignment="inlineStart"
                    modal={<TestDrawer />}
                    testId="drawer-backdrop"
                >
                    {({openModal}) => (
                        <button data-testid="open-button" onClick={openModal}>
                            Open Drawer
                        </button>
                    )}
                </DrawerLauncher>,
            );

            // Act
            await user.click(screen.getByTestId("open-button"));
            await user.click(screen.getByTestId("drawer-backdrop"));

            await act(async () => {
                await new Promise((resolve) => setTimeout(resolve, 50));
            });

            // Assert
            expect(getLayerRootModalState()).toBe(false);
        });

        it("should handle escape key dismiss", async () => {
            // Arrange
            render(
                <DrawerLauncher alignment="inlineStart" modal={<TestDrawer />}>
                    {({openModal}) => (
                        <button data-testid="open-button" onClick={openModal}>
                            Open Drawer
                        </button>
                    )}
                </DrawerLauncher>,
            );

            // Act
            await user.click(screen.getByTestId("open-button"));
            await user.keyboard("{Escape}");

            await act(async () => {
                await new Promise((resolve) => setTimeout(resolve, 50));
            });

            // Assert
            expect(getLayerRootModalState()).toBe(false);
        });
    });

    describe("Controlled DrawerLauncher - Basic State Management", () => {
        it("should have modal state false initially for controlled drawer", () => {
            // Arrange
            const TestControlledDrawer = () => {
                const [opened, setOpened] = React.useState(false);

                return (
                    <div>
                        <button
                            data-testid="control-button"
                            onClick={() => setOpened(!opened)}
                        >
                            Toggle Drawer
                        </button>
                        <DrawerLauncher
                            alignment="inlineStart"
                            opened={opened}
                            onClose={() => setOpened(false)}
                            modal={<TestDrawer />}
                        />
                    </div>
                );
            };

            // Act
            render(<TestControlledDrawer />);

            // Assert
            expect(getLayerRootModalState()).toBe(false);
        });

        it("should set modal state to true when controlled drawer opens", async () => {
            // Arrange
            const TestControlledDrawer = () => {
                const [opened, setOpened] = React.useState(false);

                return (
                    <div>
                        <button
                            data-testid="control-button"
                            onClick={() => setOpened(!opened)}
                        >
                            Toggle Drawer
                        </button>
                        <DrawerLauncher
                            alignment="inlineStart"
                            opened={opened}
                            onClose={() => setOpened(false)}
                            modal={<TestDrawer />}
                        />
                    </div>
                );
            };

            render(<TestControlledDrawer />);

            // Act
            await user.click(screen.getByTestId("control-button"));

            // Assert
            expect(getLayerRootModalState()).toBe(true);
        });

        it("should set modal state to false when controlled drawer closes", async () => {
            // Arrange
            const TestControlledDrawer = () => {
                const [opened, setOpened] = React.useState(false);

                return (
                    <div>
                        <button
                            data-testid="control-button"
                            onClick={() => setOpened(!opened)}
                        >
                            Toggle Drawer
                        </button>
                        <DrawerLauncher
                            alignment="inlineStart"
                            opened={opened}
                            onClose={() => setOpened(false)}
                            modal={<TestDrawer />}
                        />
                    </div>
                );
            };

            render(<TestControlledDrawer />);

            // Act
            await user.click(screen.getByTestId("control-button")); // Open
            await user.click(screen.getByTestId("control-button")); // Close

            await act(async () => {
                await new Promise((resolve) => setTimeout(resolve, 50));
            });

            // Assert
            expect(getLayerRootModalState()).toBe(false);
        });
    });
    describe("Controlled DrawerLauncher - Rapid State Changes", () => {
        it("should handle rapid open operation correctly", async () => {
            // Arrange
            const TestRapidChanges = () => {
                const [opened, setOpened] = React.useState(false);

                return (
                    <div>
                        <button
                            data-testid="open"
                            onClick={() => setOpened(true)}
                        >
                            Open
                        </button>
                        <DrawerLauncher
                            alignment="blockEnd"
                            opened={opened}
                            onClose={() => setOpened(false)}
                            modal={<TestDrawer />}
                        />
                    </div>
                );
            };

            render(<TestRapidChanges />);

            // Act
            await user.click(screen.getByTestId("open"));

            // Assert
            expect(getLayerRootModalState()).toBe(true);
        });

        it("should handle rapid close operation correctly", async () => {
            // Arrange
            const TestRapidChanges = () => {
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
                        <DrawerLauncher
                            alignment="blockEnd"
                            opened={opened}
                            onClose={() => setOpened(false)}
                            modal={<TestDrawer />}
                        />
                    </div>
                );
            };

            render(<TestRapidChanges />);

            // Act
            await user.click(screen.getByTestId("open"));
            await user.click(screen.getByTestId("close"));

            // Assert
            expect(getLayerRootModalState()).toBe(false);
        });
    });

    describe("Function-based Modals", () => {
        it("should work with function-based drawer modals", () => {
            // Arrange
            render(
                <DrawerLauncher
                    alignment="inlineStart"
                    opened={true}
                    onClose={() => {}}
                    modal={({closeModal}) => (
                        <DrawerDialog
                            title="Function Modal"
                            content={
                                <div>
                                    <div data-testid="function-content">
                                        Function Content
                                    </div>
                                    <button
                                        data-testid="function-close"
                                        onClick={closeModal}
                                    >
                                        Close via Function
                                    </button>
                                </div>
                            }
                        />
                    )}
                />,
            );

            // Assert
            expect(getLayerRootModalState()).toBe(true);
        });
    });

    describe("Error Scenarios", () => {
        it("should set modal state even when drawer content fails to render", () => {
            // Arrange / Act
            render(
                <DrawerLauncher
                    alignment="inlineStart"
                    opened={true}
                    onClose={() => {}}
                    modal={null as any} // Intentionally invalid modal
                />,
            );

            // Assert - Modal state should still be set even if content is invalid
            expect(getLayerRootModalState()).toBe(true);
        });
    });

    describe("Drawer Content Rendering", () => {
        it("should render layer root element when drawer is open", () => {
            // Arrange
            render(
                <DrawerLauncher
                    alignment="inlineStart"
                    opened={true}
                    onClose={() => {}}
                    modal={<TestDrawer />}
                />,
            );

            // Act
            const layerRoot = getLayerRootElement();

            // Assert
            expect(layerRoot).toBeInTheDocument();
        });

        it("should render drawer content when drawer is open", () => {
            // Arrange
            render(
                <DrawerLauncher
                    alignment="inlineStart"
                    opened={true}
                    onClose={() => {}}
                    modal={<TestDrawer />}
                />,
            );

            // Assert
            expect(screen.getByTestId("drawer-content")).toBeInTheDocument();
        });

        it("should contain drawer content within layer root", () => {
            // Arrange
            render(
                <DrawerLauncher
                    alignment="inlineStart"
                    opened={true}
                    onClose={() => {}}
                    modal={<TestDrawer />}
                />,
            );

            // Act
            const layerRoot = getLayerRootElement();
            const drawerContent = screen.getByTestId("drawer-content");

            // Assert
            expect(layerRoot).toContainElement(drawerContent);
        });

        it("should still be accessible from document.body through layer root", () => {
            // Arrange
            render(
                <DrawerLauncher
                    alignment="inlineStart"
                    opened={true}
                    onClose={() => {}}
                    modal={<TestDrawer />}
                />,
            );

            // Act
            const drawerContent = screen.getByTestId("drawer-content");

            // Assert
            expect(document.body).toContainElement(drawerContent);
        });

        it("should render drawer content inside layer root only", () => {
            // Arrange
            render(
                <DrawerLauncher
                    alignment="inlineStart"
                    opened={true}
                    onClose={() => {}}
                    modal={<TestDrawer />}
                />,
            );

            // Act
            const layerRoot = getLayerRootElement();
            const drawerContent = screen.getByTestId("drawer-content");

            // Assert
            expect(layerRoot).toContainElement(drawerContent);
        });
    });

    describe("Different Drawer Alignments", () => {
        it("should work correctly with inlineStart alignment", () => {
            // Arrange / Act
            render(
                <DrawerLauncher
                    alignment="inlineStart"
                    opened={true}
                    onClose={() => {}}
                    modal={<TestDrawer />}
                />,
            );

            // Assert
            expect(getLayerRootModalState()).toBe(true);
        });

        it("should work correctly with inlineEnd alignment", () => {
            // Arrange/Act
            render(
                <DrawerLauncher
                    alignment="inlineEnd"
                    opened={true}
                    onClose={() => {}}
                    modal={<TestDrawer />}
                />,
            );

            // Assert
            expect(getLayerRootModalState()).toBe(true);
        });

        it("should work correctly with blockEnd alignment", () => {
            // Arrange/Act
            render(
                <DrawerLauncher
                    alignment="blockEnd"
                    opened={true}
                    onClose={() => {}}
                    modal={<TestDrawer />}
                />,
            );

            // Assert
            expect(getLayerRootModalState()).toBe(true);
        });
    });
});
