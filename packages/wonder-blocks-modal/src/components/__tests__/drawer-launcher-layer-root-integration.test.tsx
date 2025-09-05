import * as React from "react";
import {render, screen, fireEvent, act} from "@testing-library/react";

import {
    getLayerRootElement,
    getLayerRootModalState,
    removeLayerRoot,
    LAYER_ROOT_ID,
} from "@khanacademy/wonder-blocks-announcer";
import DrawerLauncher from "../drawer-launcher";
import DrawerDialog from "../drawer-dialog";

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

describe("DrawerLauncher Layer Root Integration", () => {
    beforeEach(() => {
        removeLayerRoot();
        document.body.innerHTML = "";
    });

    afterEach(() => {
        removeLayerRoot();
        document.body.innerHTML = "";
    });

    describe("Uncontrolled DrawerLauncher", () => {
        it("should create layer root and set modal state when drawer opens", async () => {
            render(
                <DrawerLauncher alignment="inlineStart" modal={<TestDrawer />}>
                    {({openModal}) => (
                        <button data-testid="open-button" onClick={openModal}>
                            Open Drawer
                        </button>
                    )}
                </DrawerLauncher>,
            );

            // Initially no layer root
            expect(getLayerRootElement()).toBeNull();
            expect(getLayerRootModalState()).toBe(false);

            // Open the drawer
            fireEvent.click(screen.getByTestId("open-button"));

            // Layer root should be created and set to modal state
            const layerRoot = getLayerRootElement();
            expect(layerRoot).toBeInTheDocument();
            expect(layerRoot?.id).toBe(LAYER_ROOT_ID);
            expect(getLayerRootModalState()).toBe(true);
        });

        it("should set aria-modal to false when drawer closes via close button", async () => {
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

            // Open the drawer
            fireEvent.click(screen.getByTestId("open-button"));
            expect(getLayerRootModalState()).toBe(true);

            // Close the drawer
            fireEvent.click(screen.getByTestId("close-button"));

            // Wait for state updates (drawer might be animated)
            await act(async () => {
                await new Promise((resolve) => setTimeout(resolve, 10));
            });

            expect(getLayerRootModalState()).toBe(false);
        });

        it("should handle backdrop dismiss", async () => {
            render(
                <DrawerLauncher alignment="inlineStart" modal={<TestDrawer />}>
                    {({openModal}) => (
                        <button data-testid="open-button" onClick={openModal}>
                            Open Drawer
                        </button>
                    )}
                </DrawerLauncher>,
            );

            // Open the drawer
            fireEvent.click(screen.getByTestId("open-button"));
            expect(getLayerRootModalState()).toBe(true);

            // Click backdrop to close
            const backdrop = screen.getByTestId("drawer-backdrop");
            fireEvent.click(backdrop);

            await act(async () => {
                await new Promise((resolve) => setTimeout(resolve, 10));
            });

            expect(getLayerRootModalState()).toBe(false);
        });

        it("should handle escape key dismiss", async () => {
            render(
                <DrawerLauncher alignment="inlineStart" modal={<TestDrawer />}>
                    {({openModal}) => (
                        <button data-testid="open-button" onClick={openModal}>
                            Open Drawer
                        </button>
                    )}
                </DrawerLauncher>,
            );

            // Open the drawer
            fireEvent.click(screen.getByTestId("open-button"));
            expect(getLayerRootModalState()).toBe(true);

            // Press escape key
            fireEvent.keyUp(window, {key: "Escape"});

            await act(async () => {
                await new Promise((resolve) => setTimeout(resolve, 10));
            });

            expect(getLayerRootModalState()).toBe(false);
        });
    });

    describe("Controlled DrawerLauncher", () => {
        it("should set modal state when opened prop changes from false to true", () => {
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

            expect(getLayerRootModalState()).toBe(false);

            // Open the drawer
            fireEvent.click(screen.getByTestId("control-button"));
            expect(getLayerRootModalState()).toBe(true);

            // Close the drawer
            fireEvent.click(screen.getByTestId("control-button"));

            act(() => {
                // Allow state updates to complete
            });

            expect(getLayerRootModalState()).toBe(false);
        });

        it("should handle rapid controlled state changes", () => {
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

            expect(getLayerRootModalState()).toBe(false);

            // Rapid open/close cycles
            fireEvent.click(screen.getByTestId("open"));
            expect(getLayerRootModalState()).toBe(true);

            fireEvent.click(screen.getByTestId("close"));
            expect(getLayerRootModalState()).toBe(false);

            fireEvent.click(screen.getByTestId("open"));
            expect(getLayerRootModalState()).toBe(true);

            fireEvent.click(screen.getByTestId("close"));
            expect(getLayerRootModalState()).toBe(false);
        });
    });

    describe("Different drawer alignments", () => {
        it("should work correctly with inlineStart alignment", () => {
            render(
                <DrawerLauncher
                    alignment="inlineStart"
                    opened={true}
                    onClose={() => {}}
                    modal={<TestDrawer />}
                />,
            );

            expect(getLayerRootModalState()).toBe(true);
            expect(screen.getByTestId("drawer-content")).toBeInTheDocument();
        });

        it("should work correctly with inlineEnd alignment", () => {
            render(
                <DrawerLauncher
                    alignment="inlineEnd"
                    opened={true}
                    onClose={() => {}}
                    modal={<TestDrawer />}
                />,
            );

            expect(getLayerRootModalState()).toBe(true);
            expect(screen.getByTestId("drawer-content")).toBeInTheDocument();
        });

        it("should work correctly with blockEnd alignment", () => {
            render(
                <DrawerLauncher
                    alignment="blockEnd"
                    opened={true}
                    onClose={() => {}}
                    modal={<TestDrawer />}
                />,
            );

            expect(getLayerRootModalState()).toBe(true);
            expect(screen.getByTestId("drawer-content")).toBeInTheDocument();
        });
    });

    describe("Animation scenarios", () => {
        it("should handle modal state correctly with animations enabled", async () => {
            render(
                <DrawerLauncher
                    alignment="inlineStart"
                    animated={true}
                    timingDuration={100}
                    opened={true}
                    onClose={() => {}}
                    modal={<TestDrawer />}
                />,
            );

            expect(getLayerRootModalState()).toBe(true);
        });

        it("should handle modal state correctly with animations disabled", () => {
            render(
                <DrawerLauncher
                    alignment="inlineStart"
                    animated={false}
                    opened={true}
                    onClose={() => {}}
                    modal={<TestDrawer />}
                />,
            );

            expect(getLayerRootModalState()).toBe(true);
        });

        it("should handle close with animation timing", async () => {
            const TestAnimatedClose = () => {
                const [opened, setOpened] = React.useState(true);

                return (
                    <div>
                        <button
                            data-testid="close-animated"
                            onClick={() => setOpened(false)}
                        >
                            Close
                        </button>
                        <DrawerLauncher
                            alignment="inlineStart"
                            animated={true}
                            timingDuration={50} // Short duration for testing
                            opened={opened}
                            onClose={() => setOpened(false)}
                            modal={<TestDrawer />}
                        />
                    </div>
                );
            };

            render(<TestAnimatedClose />);

            expect(getLayerRootModalState()).toBe(true);

            // Close with animation
            fireEvent.click(screen.getByTestId("close-animated"));

            // Modal state should be set to false immediately on close
            expect(getLayerRootModalState()).toBe(false);
        });
    });

    describe("Drawer content rendering in layer root", () => {
        it("should render drawer content in layer root element", () => {
            render(
                <DrawerLauncher
                    alignment="inlineStart"
                    opened={true}
                    onClose={() => {}}
                    modal={<TestDrawer />}
                />,
            );

            const layerRoot = getLayerRootElement();
            const drawerContent = screen.getByTestId("drawer-content");

            expect(layerRoot).toBeInTheDocument();
            expect(drawerContent).toBeInTheDocument();
            expect(layerRoot?.contains(drawerContent)).toBe(true);
        });

        it("should use layer root as portal target instead of document.body", () => {
            render(
                <DrawerLauncher
                    alignment="inlineStart"
                    opened={true}
                    onClose={() => {}}
                    modal={<TestDrawer />}
                />,
            );

            const layerRoot = getLayerRootElement();
            const drawerContent = screen.getByTestId("drawer-content");

            // Drawer should be in layer root, not directly in document.body
            expect(layerRoot?.contains(drawerContent)).toBe(true);
            expect(document.body.contains(drawerContent)).toBe(true); // Still in body through layer root

            // But not a direct child of body
            expect(
                [...document.body.children].some(
                    (child) =>
                        child.contains(drawerContent) && child !== layerRoot,
                ),
            ).toBe(false);
        });
    });

    describe("Multiple DrawerLaunchers", () => {
        it("should handle multiple drawers with shared layer root state", async () => {
            const TestMultipleDrawers = () => {
                const [drawer1Open, setDrawer1Open] = React.useState(false);
                const [drawer2Open, setDrawer2Open] = React.useState(false);

                return (
                    <div>
                        <DrawerLauncher
                            alignment="inlineStart"
                            opened={drawer1Open}
                            onClose={() => setDrawer1Open(false)}
                            modal={
                                <DrawerDialog
                                    title="Drawer 1"
                                    content={
                                        <div data-testid="drawer-1">
                                            Drawer 1
                                        </div>
                                    }
                                />
                            }
                        />
                        <DrawerLauncher
                            alignment="inlineEnd"
                            opened={drawer2Open}
                            onClose={() => setDrawer2Open(false)}
                            modal={
                                <DrawerDialog
                                    title="Drawer 2"
                                    content={
                                        <div data-testid="drawer-2">
                                            Drawer 2
                                        </div>
                                    }
                                />
                            }
                        />
                        <button
                            data-testid="open-drawer-1"
                            onClick={() => setDrawer1Open(true)}
                        >
                            Open Drawer 1
                        </button>
                        <button
                            data-testid="open-drawer-2"
                            onClick={() => setDrawer2Open(true)}
                        >
                            Open Drawer 2
                        </button>
                    </div>
                );
            };

            render(<TestMultipleDrawers />);

            expect(getLayerRootModalState()).toBe(false);

            // Open first drawer
            fireEvent.click(screen.getByTestId("open-drawer-1"));
            expect(getLayerRootModalState()).toBe(true);

            // Open second drawer while first is open
            fireEvent.click(screen.getByTestId("open-drawer-2"));
            expect(getLayerRootModalState()).toBe(true);

            // Close first drawer (second should still be open)
            const firstDrawerBackdrop =
                screen.getAllByTestId("drawer-backdrop")[0];
            fireEvent.click(firstDrawerBackdrop);

            await act(async () => {
                await new Promise((resolve) => setTimeout(resolve, 10));
            });

            // State should still be true because second drawer is open
            expect(getLayerRootModalState()).toBe(true);

            // Close second drawer
            const secondDrawerBackdrop = screen.getByTestId("drawer-backdrop");
            fireEvent.click(secondDrawerBackdrop);

            await act(async () => {
                await new Promise((resolve) => setTimeout(resolve, 10));
            });

            expect(getLayerRootModalState()).toBe(false);
        });
    });

    describe("Integration with function-based modals", () => {
        it("should work with function-based drawer modals", () => {
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

            expect(getLayerRootModalState()).toBe(true);
            expect(screen.getByTestId("function-content")).toBeInTheDocument();
        });
    });

    describe("Error scenarios", () => {
        it("should handle alignment prop correctly", () => {
            expect(() => {
                render(
                    <DrawerLauncher
                        alignment="inlineStart"
                        opened={true}
                        onClose={() => {}}
                        modal={<TestDrawer />}
                    />,
                );
            }).not.toThrow();

            expect(getLayerRootModalState()).toBe(true);
        });

        it("should set modal state even when drawer content fails to render", () => {
            render(
                <DrawerLauncher
                    alignment="inlineStart"
                    opened={true}
                    onClose={() => {}}
                    modal={null as any} // Intentionally invalid modal
                />,
            );

            // Modal state should still be set even if content is invalid
            expect(getLayerRootModalState()).toBe(true);
        });
    });
});
