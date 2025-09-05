import * as React from "react";
import {render, screen, act} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";

import {
    getLayerRootModalState,
    removeLayerRoot,
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

describe("DrawerLauncher Multiple Drawers Integration", () => {
    beforeEach(() => {
        removeLayerRoot();
        document.body.innerHTML = "";
    });

    afterEach(() => {
        removeLayerRoot();
        document.body.innerHTML = "";
    });

    describe("Multiple DrawerLaunchers Reference Counting", () => {
        it("should have modal state false initially with multiple drawers", () => {
            // Arrange
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

            // Assert
            expect(getLayerRootModalState()).toBe(false);
        });

        it("should set modal state true when first drawer opens", async () => {
            // Arrange
            const user = userEvent.setup();
            const TestSingleDrawer = () => {
                const [drawer1Open, setDrawer1Open] = React.useState(false);

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
                        <button
                            data-testid="open-drawer-1"
                            onClick={() => setDrawer1Open(true)}
                        >
                            Open Drawer 1
                        </button>
                    </div>
                );
            };

            render(<TestSingleDrawer />);

            // Act
            await user.click(screen.getByTestId("open-drawer-1"));

            // Assert
            expect(getLayerRootModalState()).toBe(true);
        });

        it("should keep modal state true when second drawer opens while first is open", async () => {
            // Arrange
            const user = userEvent.setup();
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

            // Act
            await user.click(screen.getByTestId("open-drawer-1"));
            await user.click(screen.getByTestId("open-drawer-2"));

            // Assert
            expect(getLayerRootModalState()).toBe(true);
        });

        it("should keep modal state true when one drawer closes but another remains open", async () => {
            // Arrange
            const user = userEvent.setup();
            const TestMultipleDrawers = () => {
                const [drawer1Open, setDrawer1Open] = React.useState(false);
                const [drawer2Open, setDrawer2Open] = React.useState(false);

                return (
                    <div>
                        <DrawerLauncher
                            alignment="inlineStart"
                            opened={drawer1Open}
                            onClose={() => setDrawer1Open(false)}
                            testId="drawer-backdrop-1"
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
                            testId="drawer-backdrop-2"
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

            // Act
            await user.click(screen.getByTestId("open-drawer-1"));
            await user.click(screen.getByTestId("open-drawer-2"));
            await user.click(screen.getByTestId("drawer-backdrop-1"));

            await act(async () => {
                await new Promise((resolve) => setTimeout(resolve, 50));
            });

            // Assert
            expect(getLayerRootModalState()).toBe(true);
        });

        it("should set modal state false when last drawer closes", async () => {
            // Arrange
            const user = userEvent.setup();
            const TestMultipleDrawers = () => {
                const [drawer1Open, setDrawer1Open] = React.useState(false);
                const [drawer2Open, setDrawer2Open] = React.useState(false);

                return (
                    <div>
                        <DrawerLauncher
                            alignment="inlineStart"
                            opened={drawer1Open}
                            onClose={() => setDrawer1Open(false)}
                            testId="drawer-backdrop-1"
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
                            testId="drawer-backdrop-2"
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

            // Act
            await user.click(screen.getByTestId("open-drawer-1"));
            await user.click(screen.getByTestId("open-drawer-2"));
            await user.click(screen.getByTestId("drawer-backdrop-1"));
            await user.click(screen.getByTestId("drawer-backdrop-2"));

            await act(async () => {
                await new Promise((resolve) => setTimeout(resolve, 50));
            });

            // Assert
            expect(getLayerRootModalState()).toBe(false);
        });
    });

    describe("Complex Multiple Drawer Scenarios", () => {
        it("should set modal state true when opening three drawers simultaneously", async () => {
            // Arrange
            const user = userEvent.setup();
            const TestComplexDrawers = () => {
                const [drawer1Open, setDrawer1Open] = React.useState(false);
                const [drawer2Open, setDrawer2Open] = React.useState(false);
                const [drawer3Open, setDrawer3Open] = React.useState(false);

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
                        <DrawerLauncher
                            alignment="blockEnd"
                            opened={drawer3Open}
                            onClose={() => setDrawer3Open(false)}
                            modal={
                                <DrawerDialog
                                    title="Drawer 3"
                                    content={
                                        <div data-testid="drawer-3">
                                            Drawer 3
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
                        <button
                            data-testid="open-drawer-3"
                            onClick={() => setDrawer3Open(true)}
                        >
                            Open Drawer 3
                        </button>
                    </div>
                );
            };

            render(<TestComplexDrawers />);

            // Act
            await user.click(screen.getByTestId("open-drawer-1"));
            await user.click(screen.getByTestId("open-drawer-2"));
            await user.click(screen.getByTestId("open-drawer-3"));

            // Assert
            expect(getLayerRootModalState()).toBe(true);
        });

        it("should set modal state false when closing all drawers simultaneously", async () => {
            // Arrange
            const user = userEvent.setup();
            const TestComplexDrawers = () => {
                const [drawer1Open, setDrawer1Open] = React.useState(false);
                const [drawer2Open, setDrawer2Open] = React.useState(false);
                const [drawer3Open, setDrawer3Open] = React.useState(false);

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
                        <DrawerLauncher
                            alignment="blockEnd"
                            opened={drawer3Open}
                            onClose={() => setDrawer3Open(false)}
                            modal={
                                <DrawerDialog
                                    title="Drawer 3"
                                    content={
                                        <div data-testid="drawer-3">
                                            Drawer 3
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
                        <button
                            data-testid="open-drawer-3"
                            onClick={() => setDrawer3Open(true)}
                        >
                            Open Drawer 3
                        </button>
                        <button
                            data-testid="close-all"
                            onClick={() => {
                                setDrawer1Open(false);
                                setDrawer2Open(false);
                                setDrawer3Open(false);
                            }}
                        >
                            Close All
                        </button>
                    </div>
                );
            };

            render(<TestComplexDrawers />);

            // Act
            await user.click(screen.getByTestId("open-drawer-1"));
            await user.click(screen.getByTestId("open-drawer-2"));
            await user.click(screen.getByTestId("open-drawer-3"));
            await user.click(screen.getByTestId("close-all"));

            await act(async () => {
                await new Promise((resolve) => setTimeout(resolve, 50));
            });

            // Assert
            expect(getLayerRootModalState()).toBe(false);
        });

        it("should set modal state true when opening controlled drawer", async () => {
            // Arrange
            const user = userEvent.setup();
            const TestMixedDrawers = () => {
                const [controlledOpen, setControlledOpen] =
                    React.useState(false);

                return (
                    <div>
                        <DrawerLauncher
                            alignment="inlineStart"
                            opened={controlledOpen}
                            onClose={() => setControlledOpen(false)}
                            modal={
                                <DrawerDialog
                                    title="Controlled Drawer"
                                    content={
                                        <div data-testid="controlled-drawer">
                                            Controlled
                                        </div>
                                    }
                                />
                            }
                        />
                        <button
                            data-testid="open-controlled"
                            onClick={() => setControlledOpen(true)}
                        >
                            Open Controlled
                        </button>
                    </div>
                );
            };

            render(<TestMixedDrawers />);

            // Act
            await user.click(screen.getByTestId("open-controlled"));

            // Assert
            expect(getLayerRootModalState()).toBe(true);
        });

        it("should keep modal state true when opening uncontrolled drawer while controlled is open", async () => {
            // Arrange
            const user = userEvent.setup();
            const TestMixedDrawers = () => {
                const [controlledOpen, setControlledOpen] =
                    React.useState(false);

                return (
                    <div>
                        <DrawerLauncher
                            alignment="inlineStart"
                            opened={controlledOpen}
                            onClose={() => setControlledOpen(false)}
                            modal={
                                <DrawerDialog
                                    title="Controlled Drawer"
                                    content={
                                        <div data-testid="controlled-drawer">
                                            Controlled
                                        </div>
                                    }
                                />
                            }
                        />
                        <DrawerLauncher
                            alignment="inlineEnd"
                            modal={
                                <DrawerDialog
                                    title="Uncontrolled Drawer"
                                    content={
                                        <div data-testid="uncontrolled-drawer">
                                            Uncontrolled
                                        </div>
                                    }
                                />
                            }
                            testId="uncontrolled-backdrop"
                        >
                            {({openModal}) => (
                                <button
                                    data-testid="open-uncontrolled"
                                    onClick={openModal}
                                >
                                    Open Uncontrolled
                                </button>
                            )}
                        </DrawerLauncher>
                        <button
                            data-testid="open-controlled"
                            onClick={() => setControlledOpen(true)}
                        >
                            Open Controlled
                        </button>
                    </div>
                );
            };

            render(<TestMixedDrawers />);

            // Act
            await user.click(screen.getByTestId("open-controlled"));
            await user.click(screen.getByTestId("open-uncontrolled"));

            // Assert
            expect(getLayerRootModalState()).toBe(true);
        });

        it("should keep modal state true when closing uncontrolled drawer while controlled remains open", async () => {
            // Arrange
            const user = userEvent.setup();
            const TestMixedDrawers = () => {
                const [controlledOpen, setControlledOpen] =
                    React.useState(false);

                return (
                    <div>
                        <DrawerLauncher
                            alignment="inlineStart"
                            opened={controlledOpen}
                            onClose={() => setControlledOpen(false)}
                            modal={
                                <DrawerDialog
                                    title="Controlled Drawer"
                                    content={
                                        <div data-testid="controlled-drawer">
                                            Controlled
                                        </div>
                                    }
                                />
                            }
                        />
                        <DrawerLauncher
                            alignment="inlineEnd"
                            modal={
                                <DrawerDialog
                                    title="Uncontrolled Drawer"
                                    content={
                                        <div data-testid="uncontrolled-drawer">
                                            Uncontrolled
                                        </div>
                                    }
                                />
                            }
                            testId="uncontrolled-backdrop"
                        >
                            {({openModal}) => (
                                <button
                                    data-testid="open-uncontrolled"
                                    onClick={openModal}
                                >
                                    Open Uncontrolled
                                </button>
                            )}
                        </DrawerLauncher>
                        <button
                            data-testid="open-controlled"
                            onClick={() => setControlledOpen(true)}
                        >
                            Open Controlled
                        </button>
                    </div>
                );
            };

            render(<TestMixedDrawers />);

            // Act
            await user.click(screen.getByTestId("open-controlled"));
            await user.click(screen.getByTestId("open-uncontrolled"));
            await user.click(screen.getByTestId("uncontrolled-backdrop"));

            await act(async () => {
                await new Promise((resolve) => setTimeout(resolve, 50));
            });

            // Assert
            expect(getLayerRootModalState()).toBe(true);
        });
    });
});
