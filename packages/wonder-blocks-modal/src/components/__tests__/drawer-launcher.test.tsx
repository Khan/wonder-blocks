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
    beforeEach(() => {
        jest.spyOn(window, "scrollTo").mockImplementation(() => {});
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

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

    test("Modal can be manually opened and closed via modal prop", async () => {
        // Arrange
        const UnderTest = ({isOpen}: {isOpen: boolean}) => (
            <DrawerLauncher
                alignment="inlineEnd"
                animated={false}
                modal={isOpen ? exampleModal : null}
                onClose={() => {}}
                testId="modal-launcher-portal"
            />
        );
        const {rerender} = render(<UnderTest isOpen={false} />);

        // Act
        expect(
            screen.queryByTestId("modal-launcher-portal"),
        ).not.toBeInTheDocument();
        rerender(<UnderTest isOpen={true} />);
        expect(
            await screen.findByTestId("modal-launcher-portal"),
        ).toBeInTheDocument();
        rerender(<UnderTest isOpen={false} />);
        // Without animation the portal should be gone immediately
        expect(
            screen.queryByTestId("modal-launcher-portal"),
        ).not.toBeInTheDocument();
    });

    test("Modal can close itself after launching", async () => {
        // Arrange
        const modalFn = ({closeModal}: {closeModal: () => void}) => (
            <FlexibleDialog
                title="Drawer launcher test"
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
            <DrawerLauncher
                animated={false}
                alignment="inlineEnd"
                modal={exampleModal}
            >
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

    test("If backdropDismissEnabled set to false, clicking the backdrop does not trigger `onClose`", async () => {
        // Arrange
        const onClose = jest.fn();

        render(
            <DrawerLauncher
                alignment="inlineEnd"
                onClose={onClose}
                modal={exampleModal}
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
                        title="Drawer launcher test"
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
                            <DrawerLauncher
                                alignment="inlineStart"
                                animated={false}
                                onClose={() => setIsOpen(false)}
                                modal={
                                    isOpen
                                        ? ({closeModal}: any) => (
                                              <FlexibleDialog
                                                  title="Regular modal"
                                                  content={
                                                      <View>
                                                          <BodyText>
                                                              Hello World
                                                          </BodyText>
                                                          <Button
                                                              testId="modal-close-button"
                                                              onClick={
                                                                  closeModal
                                                              }
                                                          >
                                                              Close Modal
                                                          </Button>
                                                      </View>
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
                    <DrawerLauncher
                        alignment="inlineStart"
                        animated={false}
                        onClose={() => setIsOpen(false)}
                        closedFocusId="button-to-focus-on"
                        modal={
                            isOpen
                                ? ({closeModal}: any) => (
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
                                  )
                                : null
                        }
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

    describe("Slide animations", () => {
        test("Modal closes and notifies parent when animated=true", async () => {
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
                    onClose={onCloseMock}
                />,
            );

            // Act
            const closeButton = await screen.findByRole("button", {
                name: "Close modal",
            });
            await userEvent.click(closeButton);

            // Assert - onClose is called immediately in controlled mode
            expect(onCloseMock).toHaveBeenCalled();
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

        test("Modal notifies parent when closing via backdrop click", async () => {
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
                    onClose={onCloseMock}
                    testId="modal-backdrop"
                />,
            );

            // Act
            const backdrop = await screen.findByTestId("modal-backdrop");
            await userEvent.click(backdrop);

            // Assert - onClose is called immediately in controlled mode
            expect(onCloseMock).toHaveBeenCalled();
        });

        test("Modal notifies parent when closing via escape key", async () => {
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
                    onClose={onCloseMock}
                />,
            );

            // Act
            await userEvent.keyboard("{Escape}");

            // Assert - onClose is called immediately in controlled mode
            expect(onCloseMock).toHaveBeenCalled();
        });

        test("Uncontrolled modal is removed from DOM after closing", async () => {
            // Arrange
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
                    onClose={() => {}}
                >
                    {({openModal}: any) => <button onClick={openModal} />}
                </DrawerLauncher>,
            );

            // Act
            // Launch the modal.
            await userEvent.click(await screen.findByRole("button"));

            // Verify modal is in the DOM and scroll is disabled
            const dialog = await screen.findByRole("dialog");
            expect(dialog).toBeInTheDocument();

            const closeButton = await screen.findByRole("button", {
                name: "Close modal",
            });
            await userEvent.click(closeButton);

            // Assert - with no animation, removal should be immediate
            await expect(dialog).not.toBeInTheDocument();
        });

        test("Scroll is re-enabled after closing uncontrolled modal", async () => {
            // Arrange
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
                    onClose={() => {}}
                >
                    {({openModal}: any) => <button onClick={openModal} />}
                </DrawerLauncher>,
            );

            // Act
            // Launch the modal.
            await userEvent.click(await screen.findByRole("button"));

            expect(document.body).toHaveStyle("overflow: hidden");

            const closeButton = await screen.findByRole("button", {
                name: "Close modal",
            });
            await userEvent.click(closeButton);

            // Assert - with no animation, removal should be immediate
            await expect(document.body).not.toHaveStyle("overflow: hidden");
        });

        test("Controlled modal is removed from DOM after closing without animation", async () => {
            // Arrange
            const TestComponent = () => {
                const [isOpen, setIsOpen] = React.useState(true);
                return (
                    <DrawerLauncher
                        alignment="inlineEnd"
                        animated={false}
                        modal={
                            isOpen ? (
                                <FlexibleDialog
                                    title="Animation test"
                                    content={
                                        <div data-testid="modal-content" />
                                    }
                                />
                            ) : null
                        }
                        onClose={() => setIsOpen(false)}
                    />
                );
            };

            render(<TestComponent />);

            // Act
            const closeButton = await screen.findByRole("button", {
                name: "Close modal",
            });
            await userEvent.click(closeButton);

            // Assert - with no animation, removal should be immediate
            expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
        });

        test("Scroll is re-enabled after closing controlled modal without animation", async () => {
            // Arrange
            const TestComponent = () => {
                const [isOpen, setIsOpen] = React.useState(true);
                return (
                    <DrawerLauncher
                        alignment="inlineEnd"
                        animated={false}
                        modal={
                            isOpen ? (
                                <FlexibleDialog
                                    title="Animation test"
                                    content={
                                        <div data-testid="modal-content" />
                                    }
                                />
                            ) : null
                        }
                        onClose={() => setIsOpen(false)}
                    />
                );
            };

            // Act
            render(<TestComponent />);

            // Assert
            expect(document.body).toHaveStyle("overflow: hidden");

            const closeButton = await screen.findByRole("button", {
                name: "Close modal",
            });
            await userEvent.click(closeButton);

            // Assert - with no animation, removal should be immediate
            expect(document.body).not.toHaveStyle("overflow: hidden");
        });

        test("Controlled modal is removed from DOM after animation", async () => {
            // Arrange
            const TestComponent = () => {
                const [isOpen, setIsOpen] = React.useState(true);
                return (
                    <DrawerLauncher
                        alignment="inlineEnd"
                        animated={true}
                        timingDuration={100} // Short duration for test
                        modal={
                            isOpen ? (
                                <FlexibleDialog
                                    title="Animation test"
                                    content={
                                        <div data-testid="modal-content" />
                                    }
                                />
                            ) : null
                        }
                        onClose={() => setIsOpen(false)}
                    />
                );
            };

            render(<TestComponent />);

            // Act
            const closeButton = await screen.findByRole("button", {
                name: "Close modal",
            });
            await userEvent.click(closeButton);

            // Assert - with animation, need to wait for cleanup
            await waitFor(
                () => {
                    expect(
                        screen.queryByRole("dialog"),
                    ).not.toBeInTheDocument();
                },
                {timeout: 200}, // A bit longer than animation duration
            );
        });

        test("Scroll is re-enabled after animated close of controlled modal", async () => {
            // Arrange
            const TestComponent = () => {
                const [isOpen, setIsOpen] = React.useState(true);
                return (
                    <DrawerLauncher
                        alignment="inlineEnd"
                        animated={true}
                        timingDuration={100} // Short duration for test
                        modal={
                            isOpen ? (
                                <FlexibleDialog
                                    title="Animation test"
                                    content={
                                        <div data-testid="modal-content" />
                                    }
                                />
                            ) : null
                        }
                        onClose={() => setIsOpen(false)}
                    />
                );
            };

            render(<TestComponent />);

            // Verify modal is in the DOM and scroll is disabled
            expect(document.body).toHaveStyle("overflow: hidden");

            // Act
            const closeButton = await screen.findByRole("button", {
                name: "Close modal",
            });
            await userEvent.click(closeButton);

            // Assert - with animation, need to wait for cleanup
            await waitFor(
                () => {
                    expect(document.body).not.toHaveStyle("overflow: hidden");
                },
                {timeout: 200},
            );
        });
    });
});
