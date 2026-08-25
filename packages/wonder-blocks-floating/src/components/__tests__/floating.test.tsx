import * as React from "react";
import {render, screen, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Floating from "../floating";
import {useFloatingReference} from "../../util/floating-reference-context";

/**
 * A trigger that can't receive a ref (a plain function component), so it
 * registers its DOM element as the reference element through context instead.
 */
const HookTrigger = (props: {
    children: React.ReactNode;
    onClick?: () => void;
}) => {
    const setFloatingReference = useFloatingReference();

    return (
        <button ref={setFloatingReference} onClick={props.onClick}>
            {props.children}
        </button>
    );
};

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

        it("should not render a wrapper element around the trigger", () => {
            // Arrange
            render(
                <div data-testid="trigger-parent">
                    <Floating content="Floating content" open={false}>
                        <button>Trigger</button>
                    </Floating>
                </div>,
            );

            // Act
            const parent = screen.getByTestId("trigger-parent");

            // Assert
            // eslint-disable-next-line testing-library/no-node-access -- explicitly check that no wrapper element is rendered around the trigger
            expect(parent.firstElementChild).toBe(
                screen.getByRole("button", {name: "Trigger"}),
            );
        });
    });

    describe("reference element", () => {
        it("should use the trigger registered with useFloatingReference when the trigger can't receive a ref", () => {
            // Arrange
            render(
                <Floating content="Floating content" open={true}>
                    <HookTrigger>Trigger</HookTrigger>
                </Floating>,
            );

            // Act
            // The floating content is only rendered once the reference element
            // has been resolved.
            const content = screen.getByText("Floating content");

            // Assert
            expect(content).toBeInTheDocument();
        });

        it("should keep the reference element of each instance independent when multiple are open", async () => {
            // Arrange
            const MultipleFloating = () => {
                const [firstMounted, setFirstMounted] = React.useState(true);

                return (
                    <div>
                        {firstMounted && (
                            <Floating content="First content" open={true}>
                                <HookTrigger>First trigger</HookTrigger>
                            </Floating>
                        )}
                        <Floating content="Second content" open={true}>
                            <HookTrigger>Second trigger</HookTrigger>
                        </Floating>
                        <button onClick={() => setFirstMounted(false)}>
                            Unmount first
                        </button>
                    </div>
                );
            };

            render(<MultipleFloating />);

            // Both instances resolved their own reference element, so both are
            // rendered at the same time.
            expect(screen.getByText("First content")).toBeInTheDocument();
            expect(screen.getByText("Second content")).toBeInTheDocument();

            // Act
            // Removing the first trigger clears the reference element of the
            // first instance only.
            await userEvent.click(
                screen.getByRole("button", {name: "Unmount first"}),
            );

            // Assert
            expect(screen.queryByText("First content")).not.toBeInTheDocument();
            expect(screen.getByText("Second content")).toBeInTheDocument();
        });

        it("should not expose its reference setter to the floating content", () => {
            // Arrange
            // Only the trigger subtree can register a reference element, so
            // components rendered in the floating content (e.g. the trigger of a
            // nested floating element) can't take over this instance's
            // reference element.
            let triggerSetter: unknown;
            let contentSetter: unknown;

            const TriggerProbe = () => {
                triggerSetter = useFloatingReference();
                return <button ref={triggerSetter as any}>Trigger</button>;
            };
            const ContentProbe = () => {
                contentSetter = useFloatingReference();
                return <span>Floating content</span>;
            };

            // Act
            render(
                <Floating content={<ContentProbe />} open={true}>
                    <TriggerProbe />
                </Floating>,
            );

            // Assert
            expect(screen.getByText("Floating content")).toBeInTheDocument();
            expect(contentSetter).not.toBe(triggerSetter);
        });

        it("should render nested floating elements, each anchored to its own trigger", async () => {
            // Arrange
            // The inner trigger is rendered in the outer floating content, so
            // the inner instance is the one that must resolve it.
            const NestedFloating = () => (
                <Floating
                    content={
                        <Floating content="Inner content" open={true}>
                            <HookTrigger>Inner trigger</HookTrigger>
                        </Floating>
                    }
                    open={true}
                >
                    <HookTrigger>Outer trigger</HookTrigger>
                </Floating>
            );

            render(<NestedFloating />);

            // Act
            const innerContent = await screen.findByText("Inner content");

            // Assert
            // The inner content is only rendered once the inner instance has
            // resolved the inner trigger as its reference element. Queried by
            // text because the outer floating element is hidden in jsdom (the
            // `hide` middleware can't measure the reference element).
            expect(innerContent).toBeInTheDocument();
            expect(screen.getByText("Inner trigger")).toBeInTheDocument();
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

        describe("focusManagerEnabled", () => {
            it("should not move focus to the floating element when it is opened and focusManagerEnabled is false", () => {
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
                        focusManagerEnabled={false}
                    >
                        <button>Trigger</button>
                    </Floating>,
                );

                // Assert
                expect(document.body).toHaveFocus();
            });

            it("should move focus to the floating element when it is opened and focusManagerEnabled is true", async () => {
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
                            focusManagerEnabled={true}
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

        describe("initialFocusRef", () => {
            it("should focus the initialFocusRef when it is provided", async () => {
                // Arrange
                const initialFocusRef = React.createRef<HTMLButtonElement>();
                const ControlledFloating = () => {
                    const [open, setOpen] = React.useState(false);
                    return (
                        <Floating
                            content={
                                <div data-testid="floating-content">
                                    <button>First focusable element</button>
                                    <button ref={initialFocusRef}>
                                        Initial focusable element
                                    </button>
                                </div>
                            }
                            open={open}
                            portal={true}
                            focusManagerEnabled={true}
                            initialFocusRef={initialFocusRef}
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

                // Assert
                await waitFor(() => {
                    expect(initialFocusRef.current).toHaveFocus();
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

            it("should not dismiss the floating element when the escape key is pressed and dismissEnabled is false", async () => {
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
                            dismissEnabled={false}
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
                    expect(onOpenChangeMock).not.toHaveBeenCalled();
                });
            });
        });

        describe("onPlacementChange", () => {
            it("should call onPlacementChange with the resolved placement", async () => {
                // Arrange
                const onPlacementChange = jest.fn();

                // Act
                render(
                    <Floating
                        content="Floating content"
                        open={true}
                        placement="bottom"
                        onPlacementChange={onPlacementChange}
                    >
                        <button>Trigger</button>
                    </Floating>,
                );

                // Assert
                await waitFor(() => {
                    expect(onPlacementChange).toHaveBeenCalledWith("bottom");
                });
            });
        });

        describe("closeOnFocusOut", () => {
            // NOTE: The positive case (closing when focus moves out) relies on
            // portal focus guards and `focusout` events that jsdom does not
            // reproduce reliably. That behavior is covered end-to-end by the
            // Popover test suite, which consumes this prop.
            it("should not close the floating element when focus leaves it and closeOnFocusOut is false", async () => {
                // Arrange
                const onOpenChangeMock = jest.fn();
                const ControlledFloating = () => {
                    const [open, setOpen] = React.useState(true);
                    return (
                        <div>
                            <Floating
                                content={
                                    <div>
                                        <button>Inside</button>
                                    </div>
                                }
                                open={open}
                                portal={true}
                                focusManagerEnabled={true}
                                closeOnFocusOut={false}
                                onOpenChange={(open) => {
                                    setOpen(open);
                                    onOpenChangeMock(open);
                                }}
                            >
                                <button>Trigger</button>
                            </Floating>
                            <button>Outside</button>
                        </div>
                    );
                };

                render(<ControlledFloating />);

                // Act
                await userEvent.tab();

                // Assert
                await waitFor(() => {
                    expect(onOpenChangeMock).not.toHaveBeenCalledWith(false);
                });
            });
        });
    });

    describe("Accessibility", () => {
        describe("axe", () => {
            it("should have no a11y violations", async () => {
                // Arrange
                const {container} = render(
                    <Floating
                        content="Floating content"
                        open={true}
                        // NOTE: Setting portal to false as we don't need to
                        // test the focus guards.
                        // @see https://github.com/floating-ui/floating-ui/issues/2823#issuecomment-2010715019
                        portal={false}
                    >
                        <button>Trigger</button>
                    </Floating>,
                );

                // Assert
                await expect(container).toHaveNoA11yViolations();
            });
        });
    });
});
