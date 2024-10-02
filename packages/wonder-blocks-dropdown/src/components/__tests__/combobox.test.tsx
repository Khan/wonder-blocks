import * as React from "react";
import {render, screen, waitFor} from "@testing-library/react";
import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";

import {PointerEventsCheckLevel, userEvent} from "@testing-library/user-event";
import Combobox from "../combobox";
import OptionItem from "../option-item";
import {defaultComboboxLabels} from "../../util/constants";
import {MaybeValueOrValues} from "../../util/types";

const doRender = (element: React.ReactElement) => {
    render(element, {wrapper: RenderStateRoot});
    return userEvent.setup({
        pointerEventsCheck: PointerEventsCheckLevel.Never,
    });
};

describe("Combobox", () => {
    it("should render the combobox", () => {
        // Arrange

        // Act
        doRender(
            <Combobox selectionType="single" value={null}>
                <OptionItem label="option 1" value="option1" />
                <OptionItem label="option 2" value="option2" />
                <OptionItem label="option 3" value="option3" />
            </Combobox>,
        );

        // Assert
        expect(screen.getByRole("combobox")).toBeInTheDocument();
    });

    it("should assign the correct label when value is passed in", () => {
        // Arrange

        // Act
        doRender(
            <Combobox selectionType="single" value="option2">
                <OptionItem label="option 1" value="option1" />
                <OptionItem label="option 2" value="option2" />
                <OptionItem label="option 3" value="option3" />
            </Combobox>,
        );

        // Assert
        expect(screen.getByRole("combobox")).toHaveValue("option 2");
    });

    it("should open the listbox when the button is clicked", async () => {
        // Arrange
        const userEvent = doRender(
            <Combobox selectionType="single" value="option2">
                <OptionItem label="option 1" value="option1" />
                <OptionItem label="option 2" value="option2" />
                <OptionItem label="option 3" value="option3" />
            </Combobox>,
        );

        // Act
        await userEvent.click(
            screen.getByRole("button", {name: /toggle listbox/i}),
        );

        // Assert
        await screen.findByRole("listbox", {hidden: true});
    });

    it("should not open the listbox when disabled", async () => {
        // Arrange
        const userEvent = doRender(
            <Combobox selectionType="single" value="option2" disabled={true}>
                <OptionItem label="option 1" value="option1" />
                <OptionItem label="option 2" value="option2" />
                <OptionItem label="option 3" value="option3" />
            </Combobox>,
        );

        // Act
        // Focus the combobox
        await userEvent.tab();

        // Assert
        await waitFor(() => {
            expect(
                screen.queryByRole("listbox", {hidden: true}),
            ).not.toBeInTheDocument();
        });
    });

    it("should close the listbox when the button is clicked again", async () => {
        // Arrange
        const userEvent = doRender(
            <Combobox selectionType="single" value="option2">
                <OptionItem label="option 1" value="option1" />
                <OptionItem label="option 2" value="option2" />
                <OptionItem label="option 3" value="option3" />
            </Combobox>,
        );

        await userEvent.click(
            screen.getByRole("button", {name: /toggle listbox/i}),
        );
        await screen.findByRole("listbox", {hidden: true});

        // Act
        await userEvent.click(
            screen.getByRole("button", {name: /toggle listbox/i}),
        );

        // Assert
        expect(
            screen.queryByRole("listbox", {hidden: true}),
        ).not.toBeInTheDocument();
    });

    it("should close the listbox when the user presses Escape", async () => {
        // Arrange
        const userEvent = doRender(
            <Combobox selectionType="single" value="option2">
                <OptionItem label="option 1" value="option1" />
                <OptionItem label="option 2" value="option2" />
                <OptionItem label="option 3" value="option3" />
            </Combobox>,
        );

        // Focus the combobox
        await userEvent.tab();
        await screen.findByRole("listbox", {hidden: true});

        // Act
        await userEvent.keyboard("{Escape}");

        // Assert
        expect(
            screen.queryByRole("listbox", {hidden: true}),
        ).not.toBeInTheDocument();
    });

    it("should reset the value when the user presses Escape", async () => {
        // Arrange
        const userEvent = doRender(
            <Combobox selectionType="single" value="">
                <OptionItem label="option 1" value="option1" />
                <OptionItem label="option 2" value="option2" />
                <OptionItem label="option 3" value="option3" />
            </Combobox>,
        );

        // Focus the combobox
        await userEvent.tab();
        await screen.findByRole("listbox", {hidden: true});

        // Act
        // Input an invalid value, then press Escape
        await userEvent.keyboard("Test{Escape}");

        // Assert
        expect(screen.getByRole("combobox")).toHaveValue("");
    });

    it("should reset the input to its previous selected value when the user presses Escape", async () => {
        // Arrange
        const userEvent = doRender(
            <Combobox selectionType="single" value="option2">
                <OptionItem label="option 1" value="option1" />
                <OptionItem label="option 2" value="option2" />
                <OptionItem label="option 3" value="option3" />
            </Combobox>,
        );

        // Focus the combobox
        await userEvent.tab();
        await screen.findByRole("listbox", {hidden: true});

        // Act
        const combobox = screen.getByRole("combobox");
        // Input an invalid value, then press Escape
        await userEvent.type(combobox, "Test{Escape}");

        // Assert
        expect(screen.getByRole("combobox")).toHaveValue("option 2");
    });

    it("should reopen the listbox when the user presses ArrowDown", async () => {
        // Arrange
        const userEvent = doRender(
            <Combobox selectionType="single" value="option2">
                <OptionItem label="option 1" value="option1" />
                <OptionItem label="option 2" value="option2" />
                <OptionItem label="option 3" value="option3" />
            </Combobox>,
        );

        // Focus the combobox
        await userEvent.tab();
        await screen.findByRole("listbox", {hidden: true});
        // Close the listbox
        await userEvent.keyboard("{Escape}");

        // Act
        await userEvent.keyboard("{ArrowDown}");

        // Assert
        await screen.findByRole("listbox", {hidden: true});
    });

    it("should call the onChange callback when the value changes", async () => {
        // Arrange
        const onChange = jest.fn();
        const userEvent = doRender(
            <Combobox
                selectionType="single"
                value="option2"
                onChange={onChange}
            >
                <OptionItem label="option 1" value="option1" />
                <OptionItem label="option 2" value="option2" />
                <OptionItem label="option 3" value="option3" />
            </Combobox>,
        );

        await userEvent.click(
            screen.getByRole("button", {name: /toggle listbox/i}),
        );
        await screen.findByRole("listbox", {hidden: true});

        // Act
        const options = screen.getAllByRole("option", {hidden: true});
        await userEvent.click(options[2]);

        // Assert
        expect(onChange).toHaveBeenCalledWith("option3");
    });

    it("should focus on the correct option when typing", async () => {
        // Arrange
        const onChange = jest.fn();
        const userEvent = doRender(
            <Combobox
                selectionType="single"
                value=""
                onChange={onChange}
                id="combobox"
            >
                <OptionItem label="option 1" value="option1" />
                <OptionItem label="option 2" value="option2" />
                <OptionItem label="option 3" value="option3" />
            </Combobox>,
        );

        // Act
        await userEvent.type(screen.getByRole("combobox"), "3");

        // Assert
        const combobox = screen.getByRole("combobox");
        // Make sure the combobox has DOM focus.
        expect(combobox).toHaveFocus();
        // Verify that the option has visual focus.
        expect(combobox).toHaveAttribute(
            "aria-activedescendant",
            "combobox-option-2",
        );
    });

    it("should search for the correct option when typing", async () => {
        // Arrange
        const onChange = jest.fn();
        const userEvent = doRender(
            <Combobox selectionType="single" value="" onChange={onChange}>
                <OptionItem label="option 1" value="option1" />
                <OptionItem label="option 2" value="option2" />
                <OptionItem label="option 3" value="option3" />
            </Combobox>,
        );

        await userEvent.type(screen.getByRole("combobox"), "3");

        // Act
        await userEvent.keyboard("{enter}");

        // Assert
        expect(screen.getByRole("combobox")).toHaveValue("option 3");
    });

    it("should blur the combobox when tabbing out", async () => {
        // Arrange
        const userEvent = doRender(
            <Combobox selectionType="single" value="option2">
                <OptionItem label="option 1" value="option1" />
                <OptionItem label="option 2" value="option2" />
                <OptionItem label="option 3" value="option3" />
            </Combobox>,
        );

        // Focus the combobox
        await userEvent.tab();

        // Act
        // Tab out of the combobox
        await userEvent.tab();

        // Assert
        expect(screen.getByRole("combobox")).not.toHaveFocus();
    });

    it("should clear the value when the user presses the clear button (x)", async () => {
        // Arrange
        const userEvent = doRender(
            <Combobox selectionType="single" value="option2">
                <OptionItem label="option 1" value="option1" />
                <OptionItem label="option 2" value="option2" />
                <OptionItem label="option 3" value="option3" />
            </Combobox>,
        );

        // Act
        await userEvent.click(
            screen.getByRole("button", {name: /clear selection/i}),
        );

        // Assert
        expect(screen.getByRole("combobox")).toHaveValue("");
    });

    describe("error", () => {
        it("should use aria-invalid=false by default", () => {
            // Arrange

            // Act
            doRender(
                <Combobox selectionType="single" value="">
                    <OptionItem label="option 1" value="option1" />
                    <OptionItem label="option 2" value="option2" />
                    <OptionItem label="option 3" value="option3" />
                </Combobox>,
            );

            // Assert
            expect(screen.getByRole("combobox")).toHaveAttribute(
                "aria-invalid",
                "false",
            );
        });

        it("should use aria-invalid=true if error is true", async () => {
            // Arrange
            const userEvent = doRender(
                <Combobox selectionType="single" value="" error={true}>
                    <OptionItem label="option 1" value="option1" />
                    <OptionItem label="option 2" value="option2" />
                    <OptionItem label="option 3" value="option3" />
                </Combobox>,
            );

            // Act
            await userEvent.tab();

            // Assert
            expect(screen.getByRole("combobox")).toHaveAttribute(
                "aria-invalid",
                "true",
            );
        });

        it("should mark the combobox as aria-invalid=false when the value is valid", async () => {
            // Arrange
            const UnderTest = () => {
                const [value, setValue] =
                    React.useState<MaybeValueOrValues>("");
                // empty value should mark the combobox as invalid
                const [error, setError] = React.useState(value === "");

                return (
                    <Combobox
                        selectionType="single"
                        value={value}
                        error={error}
                        onChange={(newValue) => {
                            if (newValue) {
                                setValue(newValue);
                            }

                            setError(newValue === "");
                        }}
                    >
                        <OptionItem label="option 1" value="option1" />
                        <OptionItem label="option 2" value="option2" />
                        <OptionItem label="option 3" value="option3" />
                    </Combobox>
                );
            };

            const userEvent = doRender(<UnderTest />);

            // Act
            await userEvent.type(
                screen.getByRole("combobox"),
                "option 1{Enter}",
            );

            // Assert
            expect(screen.getByRole("combobox")).toHaveAttribute(
                "aria-invalid",
                "false",
            );
        });
    });

    describe("autoComplete", () => {
        it("should filter the options when typing", async () => {
            // Arrange
            const onChange = jest.fn();
            const userEvent = doRender(
                <Combobox
                    selectionType="single"
                    value=""
                    onChange={onChange}
                    autoComplete="list"
                >
                    <OptionItem label="Pear" value="pear" />
                    <OptionItem label="Orange" value="orange" />
                    <OptionItem label="Pinneaple" value="pinneaple" />
                </Combobox>,
            );

            // Act
            await userEvent.type(screen.getByRole("combobox"), "p");

            // Assert
            const options = screen.getAllByRole("option", {hidden: true});
            expect(options).toHaveLength(2);
            expect(options[0]).toHaveTextContent("Pear");
            expect(options[1]).toHaveTextContent("Pinneaple");
        });

        it("should still focus on the first option found", async () => {
            // Arrange
            const onChange = jest.fn();
            const userEvent = doRender(
                <Combobox
                    id="combobox"
                    selectionType="single"
                    value=""
                    onChange={onChange}
                    autoComplete="list"
                >
                    <OptionItem label="Pear" value="pear" />
                    <OptionItem label="Orange" value="orange" />
                    <OptionItem label="Pinneaple" value="pinneaple" />
                </Combobox>,
            );

            // Act
            await userEvent.type(screen.getByRole("combobox"), "o");

            // Assert
            const combobox = screen.getByRole("combobox");
            expect(combobox).toHaveAttribute(
                "aria-activedescendant",
                "combobox-option-0",
            );
        });

        it("should hide the listbox when there are no options", async () => {
            // Arrange
            const onChange = jest.fn();
            const userEvent = doRender(
                <Combobox
                    selectionType="single"
                    value=""
                    onChange={onChange}
                    autoComplete="list"
                >
                    <OptionItem label="Pear" value="pear" />
                    <OptionItem label="Orange" value="orange" />
                    <OptionItem label="Pinneaple" value="pinneaple" />
                </Combobox>,
            );

            // Act
            await userEvent.type(screen.getByRole("combobox"), "not-found");

            // Assert
            expect(
                screen.queryByRole("listbox", {hidden: true}),
            ).not.toBeInTheDocument();
        });
    });

    describe("multiple selection", () => {
        it("should render the combobox", () => {
            // Arrange

            // Act
            doRender(
                <Combobox selectionType="multiple" value={["option2"]}>
                    <OptionItem label="option 1" value="option1" />
                    <OptionItem label="option 2" value="option2" />
                    <OptionItem label="option 3" value="option3" />
                </Combobox>,
            );

            // Assert
            expect(screen.getByRole("combobox")).toBeInTheDocument();
        });

        it("should assign the correct values when passed in", () => {
            // Arrange

            // Act
            doRender(
                <Combobox
                    selectionType="multiple"
                    value={["option2", "option3"]}
                    opened={true}
                >
                    <OptionItem label="option 1" value="option1" />
                    <OptionItem label="option 2" value="option2" />
                    <OptionItem label="option 3" value="option3" />
                </Combobox>,
            );

            // Assert
            const selectedOptions = screen.getAllByRole("option", {
                hidden: true,
                selected: true,
            });
            expect(selectedOptions).toHaveLength(2);
            //Also verify that the selected options are correct.
            expect(selectedOptions[0]).toHaveTextContent("option 2");
            expect(selectedOptions[1]).toHaveTextContent("option 3");
        });

        it("should display the correct pill when one value is selected", () => {
            // Arrange

            // Act
            doRender(
                <Combobox
                    selectionType="multiple"
                    testId="test"
                    value={["option2"]}
                >
                    <OptionItem label="option 1" value="option1" />
                    <OptionItem label="option 2" value="option2" />
                    <OptionItem label="option 3" value="option3" />
                </Combobox>,
            );

            // Assert
            // pills
            expect(screen.getByTestId("test-pill-0")).toHaveTextContent(
                "option 2",
            );
        });

        it("should use the correct label for a selected item (pills)", () => {
            // Arrange

            // Act
            doRender(
                <Combobox selectionType="multiple" value={["option2"]}>
                    <OptionItem label="option 1" value="option1" />
                    <OptionItem label="option 2" value="option2" />
                    <OptionItem label="option 3" value="option3" />
                </Combobox>,
            );

            // Assert
            // pills
            expect(
                screen.getByRole("button", {name: "Remove option 2"}),
            ).toBeInTheDocument();
        });

        it("should call the onChange callback when the value changes", async () => {
            // Arrange
            const onChange = jest.fn();
            const userEvent = doRender(
                <Combobox
                    selectionType="multiple"
                    value={["option2"]}
                    onChange={onChange}
                >
                    <OptionItem label="option 1" value="option1" />
                    <OptionItem label="option 2" value="option2" />
                    <OptionItem label="option 3" value="option3" />
                </Combobox>,
            );

            await userEvent.click(
                screen.getByRole("button", {name: /toggle listbox/i}),
            );
            await screen.findByRole("listbox", {hidden: true});

            // Act
            const options = screen.getAllByRole("option", {
                hidden: true,
            });
            await userEvent.click(options[2]);

            // Assert
            expect(onChange).toHaveBeenCalledWith(["option2", "option3"]);
        });

        it("should reset the input value after selecting an option", async () => {
            // Arrange
            const userEvent = doRender(
                <Combobox
                    selectionType="multiple"
                    value={["option2"]}
                    opened={true}
                >
                    <OptionItem label="option 1" value="option1" />
                    <OptionItem label="option 2" value="option2" />
                    <OptionItem label="option 3" value="option3" />
                </Combobox>,
            );

            // Act
            await userEvent.click(
                screen.getByRole("button", {name: /toggle listbox/i}),
            );
            await screen.findByRole("listbox", {hidden: true});
            const options = screen.getAllByRole("option", {hidden: true});
            await userEvent.click(options[2]);

            // Assert
            expect(screen.getByRole("combobox")).toHaveValue("");
        });

        it("should reset the list of filtered options after selecting an option", async () => {
            // Arrange
            const userEvent = doRender(
                <Combobox selectionType="multiple" value={null} opened={true}>
                    <OptionItem label="option 1" value="option1" />
                    <OptionItem label="option 2" value="option2" />
                    <OptionItem label="option 3" value="option3" />
                </Combobox>,
            );

            await userEvent.click(
                screen.getByRole("button", {name: /toggle listbox/i}),
            );

            await screen.findByRole("listbox", {hidden: true});

            // Act
            await userEvent.keyboard("3{Enter}");

            const options = screen.getAllByRole("option", {hidden: true});

            // Assert
            expect(options).toHaveLength(3);
        });

        it("should move visual focus to the selected pill", async () => {
            // Arrange
            const userEvent = doRender(
                <Combobox
                    testId="combobox"
                    id="combobox"
                    selectionType="multiple"
                    value={["option1", "option2"]}
                >
                    <OptionItem label="option 1" value="option1" />
                    <OptionItem label="option 2" value="option2" />
                    <OptionItem label="option 3" value="option3" />
                </Combobox>,
            );

            // Focus the combobox
            await userEvent.tab();

            // Act
            // Navigate to the last pill in the stack
            await userEvent.keyboard("{ArrowLeft}");

            // Assert
            expect(screen.getByRole("combobox")).toHaveAttribute(
                "aria-activedescendant",
                "combobox-pill-1",
            );
        });

        it("should remove the last pill using the left arrow key", async () => {
            // Arrange
            const userEvent = doRender(
                <Combobox
                    testId="combobox"
                    selectionType="multiple"
                    value={["option1", "option2"]}
                >
                    <OptionItem label="option 1" value="option1" />
                    <OptionItem label="option 2" value="option2" />
                    <OptionItem label="option 3" value="option3" />
                </Combobox>,
            );

            // Focus the combobox
            await userEvent.tab();
            // Navigate to the last pill in the stack
            await userEvent.keyboard("{ArrowLeft}");

            // Act
            await userEvent.keyboard("{Enter}");

            // Assert
            expect(
                screen.getAllByRole("button", {name: /remove/i}),
            ).toHaveLength(1);
            expect(
                screen.getByRole("button", {name: "Remove option 1"}),
            ).toBeInTheDocument();
        });

        it("should remove the first pill using the right arrow key", async () => {
            // Arrange
            const userEvent = doRender(
                <Combobox
                    testId="combobox"
                    selectionType="multiple"
                    value={["option1", "option2"]}
                >
                    <OptionItem label="option 1" value="option1" />
                    <OptionItem label="option 2" value="option2" />
                    <OptionItem label="option 3" value="option3" />
                </Combobox>,
            );

            // Focus the combobox
            await userEvent.tab();
            // Navigate to the last pill in the stack
            await userEvent.keyboard("{ArrowRight}");

            // Act
            await userEvent.keyboard("{Enter}");

            // Assert
            expect(
                screen.getAllByRole("button", {name: /remove/i}),
            ).toHaveLength(1);
            expect(
                screen.getByRole("button", {name: "Remove option 2"}),
            ).toBeInTheDocument();
        });

        it("should remove a pill using the delete key", async () => {
            // Arrange
            const userEvent = doRender(
                <Combobox
                    testId="combobox"
                    selectionType="multiple"
                    value={["option1", "option2"]}
                >
                    <OptionItem label="option 1" value="option1" />
                    <OptionItem label="option 2" value="option2" />
                    <OptionItem label="option 3" value="option3" />
                </Combobox>,
            );

            // Focus the combobox
            await userEvent.tab();
            // Navigate to the last pill in the stack
            await userEvent.keyboard("{ArrowLeft}");

            // Act
            await userEvent.keyboard("{Backspace}");

            // Assert
            expect(
                screen.getAllByRole("button", {name: /remove/i}),
            ).toHaveLength(1);
        });

        it("should remove all the pills using the delete key", async () => {
            // Arrange
            const userEvent = doRender(
                <Combobox
                    testId="combobox"
                    selectionType="multiple"
                    value={["option1", "option2"]}
                >
                    <OptionItem label="option 1" value="option1" />
                    <OptionItem label="option 2" value="option2" />
                    <OptionItem label="option 3" value="option3" />
                </Combobox>,
            );

            // Focus the combobox
            await userEvent.tab();

            // Act
            await userEvent.keyboard("{Backspace}");
            await userEvent.keyboard("{Backspace}");

            // Assert
            expect(
                screen.queryAllByRole("button", {name: /remove/i}),
            ).toHaveLength(0);
        });

        it("should remove a pill by pressing it", async () => {
            // Arrange
            const userEvent = doRender(
                <Combobox
                    testId="combobox"
                    selectionType="multiple"
                    value={["option1", "option2"]}
                >
                    <OptionItem label="option 1" value="option1" />
                    <OptionItem label="option 2" value="option2" />
                    <OptionItem label="option 3" value="option3" />
                </Combobox>,
            );

            // Act
            await userEvent.click(
                screen.getByRole("button", {name: "Remove option 1"}),
            );

            // Assert
            expect(
                screen.getAllByRole("button", {name: /remove/i}),
            ).toHaveLength(1);
            expect(
                screen.getByRole("button", {name: "Remove option 2"}),
            ).toBeInTheDocument();
        });

        describe("LiveRegion", () => {
            it("should announce when an item is selected", async () => {
                // Arrange
                doRender(
                    <Combobox selectionType="multiple" value={["option1"]}>
                        <OptionItem label="Option 1" value="option1" />
                        <OptionItem label="Option 2" value="option2" />
                        <OptionItem label="Option 3" value="option3" />
                    </Combobox>,
                );

                // focus on the combobox (input)
                await userEvent.tab();

                // Move to second option item
                await userEvent.keyboard("{ArrowDown}");

                // Act
                // Select the second option item
                await userEvent.keyboard("{Enter}");

                // Assert
                expect(screen.getByRole("log")).toHaveTextContent(
                    "Option 2 selected, 2 of 3. 3 results available.",
                );
            });

            it("should announce when there are no items associated with the combobox input value", async () => {
                // Arrange
                doRender(
                    <Combobox
                        value=""
                        selectionType="single"
                        autoComplete="list"
                    >
                        <OptionItem label="Option 1" value="option1" />
                        <OptionItem label="Option 2" value="option2" />
                        <OptionItem label="Option 3" value="option3" />
                    </Combobox>,
                );

                // Act
                await userEvent.type(screen.getByRole("combobox"), "not-found");

                // Assert
                expect(screen.getByRole("log")).toHaveTextContent(
                    defaultComboboxLabels.noItems,
                );
            });

            it("should announce when the current selected value is cleared", async () => {
                // Arrange
                doRender(
                    <Combobox value="option1" selectionType="single">
                        <OptionItem label="Option 1" value="option1" />
                        <OptionItem label="Option 2" value="option2" />
                        <OptionItem label="Option 3" value="option3" />
                    </Combobox>,
                );

                // Act
                await userEvent.click(
                    screen.getByRole("button", {name: /clear selection/i}),
                );

                // Assert
                expect(screen.getByRole("log")).toHaveTextContent(
                    defaultComboboxLabels.selectionCleared,
                );
            });
        });
    });
});
