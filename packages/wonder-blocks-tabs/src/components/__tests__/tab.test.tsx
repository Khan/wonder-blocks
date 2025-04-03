import * as React from "react";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {Tab} from "../tab";

describe("Tab", () => {
    const id = "tab-id";
    const ariaControlsId = "aria-controls-id";

    const props = {
        id,
        "aria-controls": ariaControlsId,
    };

    it("should render a button element with role=tab", async () => {
        // Arrange
        render(
            <Tab id={id} aria-controls={ariaControlsId}>
                Tab
            </Tab>,
        );

        // Act
        const tab = await screen.findByRole("tab");

        // Assert
        expect(tab.tagName).toBe("BUTTON");
    });

    it("should render the provided children", async () => {
        // Arrange
        const childrenId = "children-id";
        render(
            <Tab id={id} aria-controls={ariaControlsId}>
                <span data-testid={childrenId}>Tab contents</span>
            </Tab>,
        );

        // Act
        const children = await screen.findByTestId(childrenId);

        // Assert
        expect(children).toBeInTheDocument();
    });

    it("should forward the ref to the tab element", async () => {
        // Arrange
        const ref = React.createRef<HTMLButtonElement>();

        // Act
        render(
            <Tab {...props} ref={ref}>
                Tab
            </Tab>,
        );

        // Assert
        expect(await screen.findByRole("tab")).toBe(ref.current);
    });

    describe("Props", () => {
        it("should set the id prop for the tab", async () => {
            // Arrange
            const id = "test-id";
            render(
                <Tab {...props} id={id}>
                    Tab
                </Tab>,
            );

            // Act
            const tab = await screen.findByRole("tab");

            // Assert
            expect(tab).toHaveAttribute("id", id);
        });
    });

    describe("Event Handlers", () => {
        it("should call the onClick prop when the tab is pressed", async () => {
            // Arrange
            const onClick = jest.fn();
            render(
                <Tab {...props} onClick={onClick}>
                    Tab
                </Tab>,
            );
            const tab = await screen.findByRole("tab");

            // Act
            await userEvent.click(tab);

            // Assert
            expect(onClick).toHaveBeenCalledOnce();
        });

        it("should call onKeyDown when a key is pressed", async () => {
            // Arrange
            const onKeyDown = jest.fn();
            render(
                <Tab {...props} onKeyDown={onKeyDown} selected={true}>
                    Tab
                </Tab>,
            );
            await userEvent.tab();

            // Act
            await userEvent.keyboard("{Enter}");

            // Assert
            expect(onKeyDown).toHaveBeenCalledExactlyOnceWith(
                expect.objectContaining({
                    key: "Enter",
                }),
            );
        });
    });

    describe("Accessibility", () => {
        describe("axe", () => {
            it("should have no a11y violations", async () => {
                // Arrange
                // Act
                const {container} = render(
                    <div>
                        <div role="tablist">
                            <Tab {...props}>Tab</Tab>
                            <Tab
                                id={id}
                                aria-controls={ariaControlsId}
                                selected={true}
                            >
                                Tab
                            </Tab>
                        </div>
                        <div
                            role="tabpanel"
                            id={ariaControlsId}
                            aria-labelledby={id}
                        >
                            Tab panel
                        </div>
                    </div>,
                );

                // Assert
                await expect(container).toHaveNoA11yViolations();
            });
        });

        describe("ARIA", () => {
            it("should set the aria-controls attribute based on the prop", async () => {
                // Arrange
                const ariaControlsId = "test-aria-controls-id";
                render(
                    <Tab {...props} aria-controls={ariaControlsId}>
                        Tab
                    </Tab>,
                );

                // Act
                const tab = await screen.findByRole("tab");

                // Assert
                expect(tab).toHaveAttribute("aria-controls", ariaControlsId);
            });

            it.each([
                {selected: true, expected: "true"},
                {selected: false, expected: "false"},
            ])(
                "should set aria-selected to $expected when the selected prop is set to $selected",
                async ({selected, expected}) => {
                    // Arrange
                    render(
                        <Tab {...props} selected={selected}>
                            Tab
                        </Tab>,
                    );

                    // Act
                    const tab = await screen.findByRole("tab");

                    // Assert
                    expect(tab).toHaveAttribute("aria-selected", expected);
                },
            );

            it("should not set the aria-selected attribute if the selected prop is not provided", async () => {
                // Arrange
                render(<Tab {...props}>Tab</Tab>);

                // Act
                const tab = await screen.findByRole("tab");

                // Assert
                expect(tab).not.toHaveAttribute("aria-selected");
            });

            it("should set aria attributes when provided", async () => {
                // Arrange
                const ariaLabel = "Specific aria label";
                render(
                    <Tab {...props} aria-label={ariaLabel}>
                        Label
                    </Tab>,
                );

                // Act
                const tab = await screen.findByRole("tab");

                // Assert
                expect(tab).toHaveAttribute("aria-label", ariaLabel);
            });
        });

        describe("Focus", () => {
            it("should be focusable if it is selected", async () => {
                // Arrange
                render(
                    <Tab {...props} selected={true}>
                        Tab
                    </Tab>,
                );
                const tab = await screen.findByRole("tab");

                // Act
                await userEvent.tab();

                // Assert
                expect(tab).toHaveFocus();
            });

            it("should not be focusable if it is not selected", async () => {
                // Arrange
                render(
                    <Tab {...props} selected={false}>
                        Tab
                    </Tab>,
                );
                const tab = await screen.findByRole("tab");

                // Act
                await userEvent.tab();

                // Assert
                expect(tab).not.toHaveFocus();
            });
        });
    });
});
