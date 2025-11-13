import * as React from "react";
import {render, screen, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Floating from "../floating";

describe("Floating", () => {
    describe("rendering", () => {
        it("should render the trigger element", () => {
            // Arrange
            render(
                <Floating content="Floating content" open={false}>
                    <button>Trigger</button>
                </Floating>,
            );

            // Act
            const trigger = screen.getByRole("button", {name: "Trigger"});

            // Assert
            expect(trigger).toBeInTheDocument();
        });

        it("should not render the floating content when closed by default", () => {
            // Arrange
            render(
                <Floating content="Floating content" open={false}>
                    <button>Trigger</button>
                </Floating>,
            );

            // Act
            const content = screen.queryByText("Floating content");

            // Assert
            expect(content).not.toBeInTheDocument();
        });

        it("should render the floating content when open is true", () => {
            // Arrange
            render(
                <Floating content="Floating content" open={true}>
                    <button>Trigger</button>
                </Floating>,
            );

            // Act
            const content = screen.getByText("Floating content");

            // Assert
            expect(content).toBeInTheDocument();
        });
    });

    describe("Props", () => {
        describe("onOpenChange", () => {
            it("should call onOpenChange when open prop changes", async () => {
                // Arrange
                const onOpenChange = jest.fn();
                const ControlledFloating = () => {
                    const [open, setOpen] = React.useState(false);
                    return (
                        <Floating
                            content="Floating content"
                            open={open}
                            onOpenChange={onOpenChange}
                        >
                            <button onClick={() => setOpen(true)}>
                                Trigger
                            </button>
                        </Floating>
                    );
                };

                render(<ControlledFloating />);

                // Act
                const trigger = screen.getByRole("button", {name: "Trigger"});
                await userEvent.click(trigger);

                // Assert
                await waitFor(() => {
                    expect(onOpenChange).toHaveBeenCalledWith(true);
                });
            });

            it("should call onOpenChange with false when the floating content is closed", async () => {
                // Arrange
                const onOpenChange = jest.fn();
                const ControlledFloating = () => {
                    const [open, setOpen] = React.useState(false);
                    return (
                        <Floating
                            content="Floating content"
                            open={open}
                            onOpenChange={onOpenChange}
                        >
                            <button onClick={() => setOpen(!open)}>
                                Trigger
                            </button>
                        </Floating>
                    );
                };

                render(<ControlledFloating />);

                // Act
                const trigger = screen.getByRole("button", {name: "Trigger"});
                // Open the floating content
                await userEvent.click(trigger);
                // Close the floating content
                await userEvent.click(trigger);

                // Assert
                await waitFor(() => {
                    expect(onOpenChange).toHaveBeenLastCalledWith(false);
                });
            });
        });

        describe("placement", () => {
            it("should default to top placement", () => {
                // Arrange
                render(
                    <Floating content="Floating content" open={true}>
                        <button>Trigger</button>
                    </Floating>,
                );

                // Act
                const content = screen.getByText("Floating content");

                // Assert
                expect(content).toHaveAttribute("data-placement", "top");
            });

            it("should accept custom placement", () => {
                // Arrange
                render(
                    <Floating
                        content="Floating content"
                        open={true}
                        placement="bottom"
                    >
                        <button>Trigger</button>
                    </Floating>,
                );

                // Act
                const content = screen.getByText("Floating content");

                // Assert
                expect(content).toHaveAttribute("data-placement", "bottom");
            });
        });

        describe("arrow", () => {
            it("should show arrow by default", () => {
                // Arrange
                render(
                    <Floating content="Floating content" open={true}>
                        <button>Trigger</button>
                    </Floating>,
                );

                // Act
                // The arrow is an SVG element rendered by FloatingArrow
                // eslint-disable-next-line testing-library/no-node-access
                const arrow = document.querySelector("svg");

                // Assert
                expect(arrow).toBeInTheDocument();
            });

            it("should hide arrow when showArrow is false", () => {
                // Arrange
                render(
                    <Floating
                        content="Floating content"
                        open={true}
                        showArrow={false}
                    >
                        <button>Trigger</button>
                    </Floating>,
                );

                // Act
                // eslint-disable-next-line testing-library/no-node-access
                const arrow = document.querySelector("svg");

                // Assert
                expect(arrow).not.toBeInTheDocument();
            });
        });

        describe("testId", () => {
            it("should add the testId to the floating element", () => {
                // Arrange
                render(
                    <Floating
                        content="Floating content"
                        open={true}
                        testId="floating-content-id"
                    >
                        <button>Trigger</button>
                    </Floating>,
                );

                // Act
                const content = screen.getByText("Floating content");

                // Assert
                expect(content).toHaveAttribute(
                    "data-testid",
                    "floating-content-id",
                );
            });
        });

        describe("useFocusManager", () => {
            it("should not move focus to the floating element when it is opened and useFocusManager is false", () => {
                // Arrange

                // Act
                render(
                    <Floating
                        content={
                            <div>
                                <button>First focusable element</button>
                            </div>
                        }
                        open={true}
                        portal={true}
                        useFocusManager={false}
                    >
                        <button>Trigger</button>
                    </Floating>,
                );

                // Assert
                expect(document.body).toHaveFocus();
            });

            it("should move focus to the floating element when it is opened and useFocusManager is true", async () => {
                // Arrange
                const ControlledFloating = () => {
                    const [open, setOpen] = React.useState(false);
                    return (
                        <Floating
                            content={
                                <div>
                                    <button>First focusable element</button>
                                </div>
                            }
                            open={open}
                            portal={true}
                            useFocusManager={true}
                        >
                            <button
                                onClick={() => {
                                    setOpen(true);
                                }}
                            >
                                Trigger
                            </button>
                        </Floating>
                    );
                };

                render(<ControlledFloating />);

                // Act
                const trigger = screen.getByRole("button", {name: "Trigger"});
                await userEvent.click(trigger);

                const firstFocusableElement = await screen.findByText(
                    "First focusable element",
                );

                // Assert
                await waitFor(() => {
                    expect(firstFocusableElement).toHaveFocus();
                });
            });
        });

        describe("dismissEnabled", () => {
            it("should not dismiss the floating element when dismissEnabled is false", async () => {
                // Arrange
                const onOpenChangeMock = jest.fn();

                const {container} = render(
                    <Floating
                        content={
                            <div>
                                <button>First focusable element</button>
                            </div>
                        }
                        open={true}
                        dismissEnabled={false}
                        onOpenChange={onOpenChangeMock}
                    >
                        <button>Trigger</button>
                    </Floating>,
                );

                // Act
                // Click outside the floating element
                await userEvent.click(container);

                // Assert
                await waitFor(() => {
                    expect(onOpenChangeMock).not.toHaveBeenCalled();
                });
            });

            it("should dismiss the floating element when dismissEnabled is true", async () => {
                // Arrange
                const onOpenChangeMock = jest.fn();

                const ControlledFloating = () => {
                    const [open, setOpen] = React.useState(true);
                    return (
                        <Floating
                            content={
                                <div>
                                    <button>First focusable element</button>
                                </div>
                            }
                            dismissEnabled={true}
                            open={open}
                            onOpenChange={(open) => {
                                setOpen(open);
                                onOpenChangeMock(open);
                            }}
                        >
                            <button>Trigger</button>
                        </Floating>
                    );
                };

                const {container} = render(<ControlledFloating />);

                // Act
                // Click outside the floating element
                await userEvent.click(container);

                // Assert
                await waitFor(() => {
                    // False because the floating element is dismissed
                    expect(onOpenChangeMock).toHaveBeenCalledWith(false);
                });
            });

            it("should dismiss the floating element when the escape key is pressed", async () => {
                // Arrange
                const onOpenChangeMock = jest.fn();

                const ControlledFloating = () => {
                    const [open, setOpen] = React.useState(true);
                    return (
                        <Floating
                            content={
                                <div>
                                    <button>First focusable element</button>
                                </div>
                            }
                            dismissEnabled={true}
                            open={open}
                            onOpenChange={(open) => {
                                setOpen(open);
                                onOpenChangeMock(open);
                            }}
                        >
                            <button>Trigger</button>
                        </Floating>
                    );
                };

                render(<ControlledFloating />);

                // Act
                // Press the escape key
                await userEvent.keyboard("{Escape}");

                // Assert
                await waitFor(() => {
                    // False because the floating element is dismissed
                    expect(onOpenChangeMock).toHaveBeenCalledWith(false);
                });
            });
        });
    });

    describe("Accessibility", () => {
        describe("axe", () => {
            it("should have no a11y violations", async () => {
                // Arrange
                const {container} = render(
                    <Floating content="Floating content" open={true}>
                        <button>Trigger</button>
                    </Floating>,
                );

                // Assert
                await expect(container).toHaveNoA11yViolations();
            });
        });
    });
});
