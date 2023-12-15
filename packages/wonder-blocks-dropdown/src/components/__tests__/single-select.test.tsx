import * as React from "react";
import {fireEvent, render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import OptionItem from "../option-item";
import SingleSelect from "../single-select";
import type {SingleSelectLabels} from "../single-select";

describe("SingleSelect", () => {
    const onChange = jest.fn();

    beforeEach(() => {
        window.scrollTo = jest.fn();

        // We mock console.error() because React logs a bunch of errors pertaining
        // to the use href="javascript:void(0);".
        jest.spyOn(console, "error").mockImplementation(() => {});
    });

    afterEach(() => {
        // @ts-expect-error [FEI-5019] - TS2339 - Property 'mockClear' does not exist on type '{ (options?: ScrollToOptions | undefined): void; (x: number, y: number): void; } & { (options?: ScrollToOptions | undefined): void; (x: number, y: number): void; }'.
        window.scrollTo.mockClear();
        onChange.mockReset();
        jest.spyOn(console, "error").mockReset();
    });

    describe("uncontrolled", () => {
        const uncontrolledSingleSelect = (
            <SingleSelect onChange={onChange} placeholder="Choose">
                <OptionItem label="item 1" value="1" />
                <OptionItem label="item 2" value="2" />
                <OptionItem label="item 3" value="3" />
            </SingleSelect>
        );

        describe("mouse", () => {
            it("should open when clicking on the default opener", () => {
                // Arrange
                render(uncontrolledSingleSelect);
                const opener = screen.getByText("Choose");

                // Act
                userEvent.click(opener);

                // Assert
                expect(screen.getByRole("listbox")).toBeInTheDocument();
            });

            it("should focus the first item in the dropdown", () => {
                // Arrange
                render(uncontrolledSingleSelect);
                const opener = screen.getByText("Choose");

                // Act
                userEvent.click(opener);

                // Assert
                const options = screen.getAllByRole("option");
                expect(options[0]).toHaveFocus();
            });

            it("should close when clicking on the default opener a second time", () => {
                // Arrange
                render(uncontrolledSingleSelect);
                const opener = screen.getByText("Choose");
                userEvent.click(opener);

                // Act
                userEvent.click(opener);

                // Assert
                expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
            });

            it("should close when clicking on an item", () => {
                // Arrange
                render(uncontrolledSingleSelect);
                const opener = screen.getByText("Choose");
                userEvent.click(opener);

                // Act
                userEvent.click(screen.getByText("item 1"));

                // Assert
                expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
            });

            it("should call onChange() with the item's value when clicking it", () => {
                // Arrange
                render(uncontrolledSingleSelect);
                const opener = screen.getByText("Choose");
                userEvent.click(opener);

                // Act
                userEvent.click(screen.getByText("item 1")); // closed

                // Assert
                expect(onChange).toHaveBeenCalledWith("1"); // value
            });

            it("should not focus in the first item if autoFocus is disabled", async () => {
                // Arrange
                render(
                    <SingleSelect
                        autoFocus={false}
                        onChange={onChange}
                        placeholder="Choose"
                        opener={() => <input type="text" />}
                    >
                        <OptionItem label="item 1" value="1" />
                        <OptionItem label="item 2" value="2" />
                        <OptionItem label="item 3" value="3" />
                    </SingleSelect>,
                );

                // Act
                userEvent.click(screen.getByRole("textbox"));

                // wait for the dropdown to open
                await screen.findByRole("listbox");

                // Assert
                expect(screen.getByRole("textbox")).toHaveFocus();
            });
        });

        describe("keyboard", () => {
            beforeEach(() => {
                jest.useFakeTimers();
            });

            describe.each([{key: "{enter}"}, {key: "{space}"}])(
                "$key",
                ({key}: any) => {
                    it("should open when pressing the key when the default opener is focused", () => {
                        // Arrange
                        render(uncontrolledSingleSelect);
                        userEvent.tab();

                        // Act
                        userEvent.keyboard(key);

                        // Assert
                        expect(screen.getByRole("listbox")).toBeInTheDocument();
                    });

                    it("should focus the first item in the dropdown", () => {
                        // Arrange
                        render(uncontrolledSingleSelect);
                        userEvent.tab();

                        // Act
                        userEvent.keyboard(key);

                        // Assert
                        const options = screen.getAllByRole("option");
                        expect(options[0]).toHaveFocus();
                    });
                },
            );

            it("should select an item when pressing {enter}", () => {
                // Arrange
                render(uncontrolledSingleSelect);
                userEvent.tab();
                userEvent.keyboard("{enter}"); // open

                // Act
                userEvent.keyboard("{enter}");

                // Assert
                expect(onChange).toHaveBeenCalledWith("1");
                expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
            });

            it("should select an item when pressing {space}", () => {
                // Arrange
                render(uncontrolledSingleSelect);
                userEvent.tab();
                userEvent.keyboard("{enter}"); // open

                // Act
                userEvent.keyboard("{space}");

                // Assert
                expect(onChange).toHaveBeenCalledWith("1");
                expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
            });

            it("should find and select an item using the keyboard", () => {
                // Arrange
                render(
                    <SingleSelect onChange={onChange} placeholder="Choose">
                        <OptionItem label="apple" value="apple" />
                        <OptionItem label="orange" value="orange" />
                        <OptionItem label="pear" value="pear" />
                    </SingleSelect>,
                );
                userEvent.tab();

                // Act
                // find first occurrence
                userEvent.keyboard("or");
                jest.advanceTimersByTime(501);

                // Assert
                expect(onChange).toHaveBeenCalledWith("orange");
                expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
            });

            it("should NOT find/select an item using the keyboard if enableTypeAhead is set false", () => {
                // Arrange
                render(
                    <SingleSelect
                        onChange={onChange}
                        placeholder="Choose"
                        enableTypeAhead={false}
                    >
                        <OptionItem label="apple" value="apple" />
                        <OptionItem label="orange" value="orange" />
                        <OptionItem label="pear" value="pear" />
                    </SingleSelect>,
                );
                userEvent.tab();

                // Act

                // Try to find first occurrence but it should not be found
                // as we have disabled type ahead.
                userEvent.keyboard("or");
                jest.advanceTimersByTime(501);

                // Assert
                expect(onChange).not.toHaveBeenCalled();
            });

            it("should dismiss the dropdown when pressing {escape}", () => {
                // Arrange
                render(uncontrolledSingleSelect);
                userEvent.tab();
                userEvent.keyboard("{enter}"); // open

                // Act
                userEvent.keyboard("{escape}");

                // Assert
                expect(onChange).not.toHaveBeenCalled();
                expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
            });
        });
    });

    describe("Controlled component", () => {
        type Props = {
            opened?: boolean;
            onToggle?: (opened: boolean) => unknown;
        };

        const ControlledComponent = function (
            props: Props,
        ): React.ReactElement {
            const [opened, setOpened] = React.useState(props.opened);

            const handleToggleMenu = (opened: any) => {
                setOpened(opened);

                props.onToggle?.(opened);
            };

            return (
                <React.Fragment>
                    <SingleSelect
                        opened={opened}
                        onToggle={handleToggleMenu}
                        onChange={onChange}
                        placeholder="Choose"
                    >
                        <OptionItem label="item 1" value="1" />
                        <OptionItem label="item 2" value="2" />
                        <OptionItem label="item 3" value="3" />
                    </SingleSelect>
                    <button
                        data-test-id="parent-button"
                        onClick={() => handleToggleMenu(true)}
                    />
                </React.Fragment>
            );
        };

        it("opens the menu when the parent updates its state", () => {
            // Arrange
            const onToggleMock = jest.fn();
            render(<ControlledComponent onToggle={onToggleMock} />);

            // Act
            userEvent.click(screen.getByRole("button", {name: "Choose"}));

            // Assert
            expect(onToggleMock).toHaveBeenCalledWith(true);
        });

        it("closes the menu when the parent updates its state", () => {
            // Arrange
            const onToggleMock = jest.fn();
            render(<ControlledComponent onToggle={onToggleMock} />);
            // open the menu from the outside
            userEvent.click(screen.getByRole("button", {name: "Choose"}));

            // Act
            // click on first item
            userEvent.click(screen.getByText("item 1"));

            // Assert
            expect(onToggleMock).toHaveBeenCalledWith(false);
        });

        it("should still allow the opener to open the menu", () => {
            // Arrange
            const onToggleMock = jest.fn();
            render(<ControlledComponent onToggle={onToggleMock} />);

            // Act
            userEvent.click(screen.getByText("Choose"));

            // Assert
            expect(onToggleMock).toHaveBeenCalledWith(true);
        });

        it("opens the menu when the anchor is clicked once", () => {
            // Arrange
            render(<ControlledComponent />);

            // Act
            // click on the anchor
            userEvent.click(screen.getByText("Choose"));

            // Assert
            expect(screen.getByRole("listbox")).toBeInTheDocument();
        });

        it("closes the menu when the anchor is clicked", () => {
            // Arrange
            render(<ControlledComponent />);

            // Act
            const opener = screen.getByRole("button", {name: "Choose"});
            // open the menu from the outside
            userEvent.click(opener);
            // click on the dropdown anchor to hide the menu
            userEvent.click(opener);

            // Assert
            expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
        });
    });

    describe("Custom Opener", () => {
        it("opens the menu when clicking on the custom opener", () => {
            // Arrange
            render(
                <SingleSelect
                    onChange={jest.fn()}
                    placeholder="custom opener"
                    testId="openTest"
                    opener={(eventState: any) => (
                        <button aria-label="Search" onClick={jest.fn()}>
                            Search
                        </button>
                    )}
                >
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                    <OptionItem label="item 3" value="3" />
                </SingleSelect>,
            );

            // Act
            const opener = screen.getByText("Search");
            userEvent.click(opener);

            // Assert
            expect(screen.getByRole("listbox")).toBeInTheDocument();
        });

        it("calls the custom onClick handler", () => {
            // Arrange
            const onClickMock = jest.fn();

            render(
                <SingleSelect
                    onChange={jest.fn()}
                    placeholder="custom opener"
                    opener={() => (
                        <button
                            aria-label="Custom opener"
                            onClick={onClickMock}
                        />
                    )}
                >
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                    <OptionItem label="item 3" value="3" />
                </SingleSelect>,
            );

            // Act
            const opener = screen.getByLabelText("Custom opener");
            userEvent.click(opener);

            // Assert
            expect(onClickMock).toHaveBeenCalledTimes(1);
        });

        it("verifies testId is not passed from the parent element", () => {
            // Arrange
            render(
                <SingleSelect
                    onChange={onChange}
                    placeholder="Choose"
                    testId="custom-opener"
                    opener={() => <button aria-label="Custom opener" />}
                >
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                </SingleSelect>,
            );

            // Act
            const opener = screen.getByLabelText("Custom opener");

            // Assert
            expect(opener).not.toHaveAttribute("data-test-id");
        });

        it("passes the placeholder text to the custom opener", () => {
            // Arrange
            render(
                <SingleSelect
                    placeholder="Custom placeholder"
                    testId="openTest"
                    onChange={jest.fn()}
                    opener={({text}: any) => (
                        <button onClick={jest.fn()}>{text}</button>
                    )}
                >
                    <OptionItem label="Toggle A" value="toggle_a" />
                    <OptionItem label="Toggle B" value="toggle_b" />
                </SingleSelect>,
            );

            // Act
            const opener = screen.getByRole("button");
            // open dropdown
            userEvent.click(opener);

            // Assert
            expect(opener).toHaveTextContent("Custom placeholder");
        });

        it("passes the selected label to the custom opener", () => {
            // Arrange
            type Props = Record<any, any>;

            type State = {
                selectedValue: string | null | undefined;
            };

            class ControlledComponent extends React.Component<Props, State> {
                state: State = {
                    selectedValue: null,
                };

                render(): React.ReactElement {
                    return (
                        <React.Fragment>
                            <SingleSelect
                                onChange={(value: any) =>
                                    this.setState({selectedValue: value})
                                }
                                selectedValue={this.state.selectedValue}
                                placeholder="Custom placeholder"
                                opener={({text}: any) => (
                                    <button onClick={jest.fn()}>{text}</button>
                                )}
                            >
                                <OptionItem label="Toggle A" value="toggle_a" />
                                <OptionItem label="Toggle B" value="toggle_b" />
                            </SingleSelect>
                        </React.Fragment>
                    );
                }
            }

            render(<ControlledComponent />);

            // Act
            const opener = screen.getByRole("button");
            // open dropdown
            userEvent.click(opener);
            userEvent.click(screen.getByText("Toggle B"));

            // Assert
            // NOTE: the opener text is only updated in response to changes to the
            // `selectedValue` prop.
            expect(opener).toHaveTextContent("Toggle B");
        });
    });

    describe("isFilterable", () => {
        it("displays SearchField when isFilterable is true", () => {
            // Arrange
            render(
                <SingleSelect
                    light={true}
                    onChange={onChange}
                    isFilterable={true}
                    placeholder="Choose"
                >
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                    <OptionItem label="item 3" value="3" />
                </SingleSelect>,
            );
            userEvent.click(screen.getByText("Choose"));

            // Act
            const searchInput = screen.queryByRole("textbox");

            // Assert
            expect(searchInput).toBeInTheDocument();
        });

        it("filters the items by the search input (case insensitive)", () => {
            // Arrange
            render(
                <SingleSelect
                    onChange={onChange}
                    isFilterable={true}
                    placeholder="Choose"
                >
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                    <OptionItem label="item 3" value="3" />
                </SingleSelect>,
            );
            userEvent.click(screen.getByText("Choose"));

            // Act
            const searchInput = screen.getByRole("textbox");
            userEvent.paste(searchInput, "Item 2");

            // Assert
            const options = screen.getAllByRole("option");
            expect(options).toHaveLength(1);
            expect(options[0]).toHaveTextContent("item 2");
        });

        it("Type something in SearchField should update searchText in SingleSelect", () => {
            // Arrange
            render(
                <SingleSelect
                    onChange={onChange}
                    isFilterable={true}
                    placeholder="Choose"
                >
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                    <OptionItem label="item 3" value="3" />
                </SingleSelect>,
            );
            userEvent.click(screen.getByText("Choose"));
            const searchInput = screen.getByRole("textbox");
            userEvent.paste(searchInput, "Item 2");

            // Act
            userEvent.clear(searchInput);
            userEvent.paste(searchInput, "Item 1");

            // Assert
            const options = screen.getAllByRole("option");
            expect(options).toHaveLength(1);
            expect(options[0]).toHaveTextContent("item 1");
        });

        it("Click dismiss button should clear the searchText in SingleSelect", () => {
            // Arrange
            render(
                <SingleSelect
                    onChange={onChange}
                    isFilterable={true}
                    placeholder="Choose"
                >
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                    <OptionItem label="item 3" value="3" />
                </SingleSelect>,
            );
            userEvent.click(screen.getByText("Choose"));
            const searchInput = screen.getByRole("textbox");
            userEvent.paste(searchInput, "Should be cleared");

            const dismissBtn = screen.getByLabelText("Clear search");

            // Act
            userEvent.click(dismissBtn);

            // Assert
            expect(searchInput.textContent).toEqual("");
        });

        it("Open SingleSelect should clear the searchText", () => {
            // Arrange
            render(
                <SingleSelect
                    onChange={onChange}
                    isFilterable={true}
                    placeholder="Choose"
                >
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                    <OptionItem label="item 3" value="3" />
                </SingleSelect>,
            );
            const opener = screen.getByText("Choose");
            userEvent.click(opener);
            const searchInput = screen.getByRole("textbox");
            userEvent.paste(searchInput, "some text");

            // Act
            userEvent.click(opener);

            // Assert
            expect(searchInput.textContent).toEqual("");
        });

        it("should move focus to the dismiss button after pressing {tab} on the text input", () => {
            // Arrange
            render(
                <SingleSelect
                    onChange={onChange}
                    isFilterable={true}
                    placeholder="Choose"
                    selectedValue="2"
                >
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                    <OptionItem label="item 3" value="3" />
                </SingleSelect>,
            );
            // open the dropdown menu
            userEvent.click(screen.getByRole("button"));

            const searchInput = screen.getByPlaceholderText("Filter");
            userEvent.paste(searchInput, "some text");

            // Act
            userEvent.tab();

            // Assert
            const dismissBtn = screen.getByLabelText("Clear search");
            expect(dismissBtn).toHaveFocus();
        });
    });

    describe("Custom listbox styles", () => {
        it("should apply the default maxHeight to the listbox wrapper", () => {
            // Arrange

            // Act
            render(
                <SingleSelect
                    onChange={onChange}
                    opened={true}
                    placeholder="Choose"
                    selectedValue="2"
                >
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                    <OptionItem label="item 3" value="3" />
                </SingleSelect>,
            );

            // Assert
            const dropdownMenuWrapper = screen.getByTestId(
                "dropdown-core-container",
            );
            expect(dropdownMenuWrapper).toHaveStyle(
                "max-height: var(--popper-max-height)",
            );
        });

        it("should apply the default maxHeight to a virtualized listbox wrapper", () => {
            // Arrange
            const optionItems = new Array(1000)
                .fill(null)
                .map((_: any, i: any) => (
                    <OptionItem
                        key={i}
                        value={(i + 1).toString()}
                        label={`item ${i + 1}`}
                    />
                ));

            // Act
            render(
                <SingleSelect
                    onChange={onChange}
                    opened={true}
                    isFilterable={true}
                    placeholder="Choose"
                    selectedValue="2"
                >
                    {optionItems}
                </SingleSelect>,
            );

            // Assert
            const dropdownMenuWrapper = screen.getByTestId(
                "dropdown-core-container",
            );
            // Max allowed height
            expect(dropdownMenuWrapper).toHaveStyle(
                "max-height: var(--popper-max-height)",
            );
        });

        it("should override the default maxHeight to the listbox if a custom dropdownStyle is set", () => {
            // Arrange
            const customMaxHeight = 200;

            // Act
            render(
                <SingleSelect
                    onChange={onChange}
                    opened={true}
                    placeholder="Choose"
                    selectedValue="2"
                    dropdownStyle={{maxHeight: customMaxHeight}}
                >
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                    <OptionItem label="item 3" value="3" />
                </SingleSelect>,
            );

            // Assert
            const dropdownMenu = screen.getByTestId("dropdown-core-container");
            expect(dropdownMenu).toHaveStyle("max-height: 200px");
        });
    });

    describe("a11y > Live region", () => {
        it("should change the number of options after using the search filter", () => {
            // Arrange
            render(
                <SingleSelect
                    onChange={onChange}
                    placeholder="Choose"
                    isFilterable={true}
                    opened={true}
                >
                    <OptionItem label="item 0" value="0" />
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                </SingleSelect>,
            );

            // Act
            userEvent.paste(screen.getByRole("textbox"), "item 0");

            // Assert
            const liveRegionText = screen.getByTestId(
                "dropdown-live-region",
            ).textContent;

            expect(liveRegionText).toEqual("1 item");
        });
    });

    describe("Custom labels", () => {
        const translatedItems = [
            <OptionItem label="Banano" value="banano" />,
            <OptionItem label="Fresa" value="fresa" disabled />,
            <OptionItem label="Pera" value="pera" />,
            <OptionItem label="Naranja" value="naranja" />,
            <OptionItem label="Sandia" value="sandia" />,
            <OptionItem label="Manzana" value="manzana" />,
            <OptionItem label="Uva" value="uva" />,
            <OptionItem label="Limon" value="limon" />,
            <OptionItem label="Mango" value="mango" />,
        ];

        const enLabels: SingleSelectLabels = {
            clearSearch: "Clear Search",
            filter: "Filter",
            noResults: "No Results",
            someResults: (numOptions: number) => "Some Results",
        };

        it("passes the custom label to the search input field", () => {
            // Arrange
            const labels: SingleSelectLabels = {
                ...enLabels,
                filter: "Filtrar",
            };

            // Act
            render(
                <SingleSelect
                    onChange={onChange}
                    placeholder="Escoge una fruta"
                    isFilterable={true}
                    opened={true}
                    labels={labels}
                >
                    {translatedItems}
                </SingleSelect>,
            );

            // Assert
            expect(screen.getByPlaceholderText("Filtrar")).toBeInTheDocument();
        });

        it("passes the custom label to the dismiss filter icon", () => {
            // Arrange
            const labels: SingleSelectLabels = {
                ...enLabels,
                clearSearch: "Limpiar busqueda",
                filter: "Filtrar",
            };

            render(
                <SingleSelect
                    onChange={onChange}
                    placeholder="Escoge una fruta"
                    isFilterable={true}
                    opened={true}
                    labels={labels}
                >
                    {translatedItems}
                </SingleSelect>,
            );

            // Act
            // Add text to the filter input to display the dismiss icon button.
            userEvent.type(screen.getByPlaceholderText("Filtrar"), "m");

            // Assert
            expect(
                screen.getByLabelText("Limpiar busqueda"),
            ).toBeInTheDocument();
        });

        it("passes the custom label to the no results label", () => {
            // Arrange
            const labels: SingleSelectLabels = {
                ...enLabels,
                filter: "Filtrar",
                noResults: "No hay resultados",
            };

            render(
                <SingleSelect
                    onChange={onChange}
                    placeholder="Escoge una fruta"
                    isFilterable={true}
                    opened={true}
                    labels={labels}
                >
                    {translatedItems}
                </SingleSelect>,
            );

            // Act
            // Add text to the filter input with a random word.
            userEvent.type(screen.getByPlaceholderText("Filtrar"), "invalid");

            // Assert
            expect(screen.getByText("No hay resultados")).toBeInTheDocument();
        });
    });

    describe("error state styles", () => {
        it("should apply the error styles to the dropdown on hover", () => {
            // Arrange
            render(
                <SingleSelect
                    onChange={onChange}
                    placeholder="Choose a fruit"
                    error={true}
                    testId="singleselect-error-hover"
                >
                    {[<OptionItem label="Banana" value="banana" />]}
                </SingleSelect>,
            );
            const dropdown = screen.getByTestId("singleselect-error-hover");

            // Act
            userEvent.hover(dropdown);

            // Assert
            expect(dropdown).toHaveStyle("border-color: #d92916");
            expect(dropdown).toHaveStyle("border-width: 2px");
        });

        it("should apply the error styles to the dropdown on mouse down", () => {
            // Arrange
            render(
                <SingleSelect
                    onChange={onChange}
                    placeholder="Choose a fruit"
                    error={true}
                    testId="singleselect-error-active"
                >
                    {[<OptionItem label="Banana" value="banana" />]}
                </SingleSelect>,
            );
            const dropdown = screen.getByTestId("singleselect-error-active");

            // Act
            // eslint-disable-next-line testing-library/prefer-user-event
            fireEvent.mouseDown(dropdown);

            // Assert
            expect(dropdown).toHaveStyle("border-color: #d92916");
            expect(dropdown).toHaveStyle("border-width: 2px");
            expect(dropdown).toHaveStyle(
                "background-color: rgb(243, 187, 180)",
            );
        });
    });
});
