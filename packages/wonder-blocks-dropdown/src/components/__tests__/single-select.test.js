//@flow
import * as React from "react";
import {render, screen} from "@testing-library/react";
// eslint-disable-next-line import/no-unassigned-import
import "@testing-library/jest-dom/extend-expect";

import OptionItem from "../option-item.js";
import SingleSelect from "../single-select.js";

import userEvent from "../../../../../utils/testing/user-event.js";

describe("SingleSelect", () => {
    const onChange = jest.fn();

    beforeEach(() => {
        jest.useFakeTimers();

        window.scrollTo = jest.fn();

        // We mock console.error() because React logs a bunch of errors pertaining
        // to the use href="javascript:void(0);".
        jest.spyOn(console, "error").mockImplementation(() => {});
    });

    afterEach(() => {
        window.scrollTo.mockClear();
        onChange.mockReset();
        // $FlowIgnore[prop-missing]: Flow doesn't understand that we're mocking console.error
        console.error.mockReset(); // eslint-disable-line no-console
    });

    afterEach(() => {
        window.scrollTo.mockClear();
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
                expect(screen.queryByRole("listbox")).toBeInTheDocument();
            });

            it("the opener should keep the focus after opening", () => {
                // Arrange
                render(uncontrolledSingleSelect);
                const opener = screen.getByText("Choose");

                // Act
                userEvent.click(opener);

                expect(screen.getByRole("button")).toHaveFocus();
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
        });

        describe("keyboard", () => {
            describe.each([{key: "{enter}"}, {key: "{space}"}])(
                "$key",
                ({key}) => {
                    it("should open when pressing the key when the default opener is focused", () => {
                        // Arrange
                        render(uncontrolledSingleSelect);
                        userEvent.tab();

                        // Act
                        userEvent.keyboard(key);

                        // Assert
                        expect(
                            screen.queryByRole("listbox"),
                        ).toBeInTheDocument();
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

            it("should not select an item when pressing {enter}", () => {
                // Arrange
                render(uncontrolledSingleSelect);
                userEvent.tab();
                userEvent.keyboard("{enter}"); // open

                // Act
                userEvent.keyboard("{enter}");

                // Assert
                expect(onChange).not.toHaveBeenCalled();
                expect(screen.queryByRole("listbox")).toBeInTheDocument();
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
        type Props = {|
            opened?: boolean,
            onToggle?: (opened: boolean) => mixed,
        |};

        type State = {|
            opened?: boolean,
        |};

        class ControlledComponent extends React.Component<Props, State> {
            state: State = {
                opened: this.props.opened,
            };

            handleToggleMenu = (opened) => {
                this.setState({
                    opened: opened,
                });

                this.props.onToggle && this.props.onToggle(opened);
            };

            render(): React.Node {
                return (
                    <React.Fragment>
                        <SingleSelect
                            opened={this.state.opened}
                            onToggle={this.handleToggleMenu}
                            onChange={onChange}
                            placeholder="Choose"
                        >
                            <OptionItem label="item 1" value="1" />
                            <OptionItem label="item 2" value="2" />
                            <OptionItem label="item 3" value="3" />
                        </SingleSelect>
                        <button
                            data-test-id="parent-button"
                            onClick={() => this.handleToggleMenu(true)}
                        />
                    </React.Fragment>
                );
            }
        }

        it("opens the menu when the parent updates its state", () => {
            // Arrange
            const onToggleMock = jest.fn();
            render(<ControlledComponent onToggle={onToggleMock} />);

            // Act
            userEvent.click(screen.getByTestId("parent-button"));

            // Assert
            expect(onToggleMock).toHaveBeenCalledWith(true);
        });

        it("closes the menu when the parent updates its state", () => {
            // Arrange
            const onToggleMock = jest.fn();
            render(<ControlledComponent onToggle={onToggleMock} />);
            // open the menu from the outside
            userEvent.click(screen.getByTestId("parent-button"));

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
            expect(screen.queryByRole("listbox")).toBeInTheDocument();
        });

        it("closes the menu when the anchor is clicked", () => {
            // Arrange
            render(<ControlledComponent />);

            // Act
            // open the menu from the outside
            userEvent.click(screen.getByTestId("parent-button"));
            // click on the dropdown anchor to hide the menu
            userEvent.click(screen.getByText("Choose"));

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
                    opener={(eventState) => (
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
            expect(screen.queryByRole("listbox")).toBeInTheDocument();
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
                    opener={({text}) => (
                        <button
                            onClick={jest.fn()}
                            data-test-id="custom-opener"
                        >
                            {text}
                        </button>
                    )}
                >
                    <OptionItem label="Toggle A" value="toggle_a" />
                    <OptionItem label="Toggle B" value="toggle_b" />
                </SingleSelect>,
            );

            // Act
            const opener = screen.getByTestId("custom-opener");
            // open dropdown
            userEvent.click(opener);

            // Assert
            expect(opener).toHaveTextContent("Custom placeholder");
        });

        it("passes the selected label to the custom opener", () => {
            // Arrange
            type Props = {||};

            type State = {|
                selectedValue: ?string,
            |};

            class ControlledComponent extends React.Component<Props, State> {
                state: State = {
                    selectedValue: null,
                };

                render(): React.Node {
                    return (
                        <React.Fragment>
                            <SingleSelect
                                onChange={(value) =>
                                    this.setState({selectedValue: value})
                                }
                                selectedValue={this.state.selectedValue}
                                placeholder="Custom placeholder"
                                opener={({text}) => (
                                    <button
                                        onClick={jest.fn()}
                                        data-test-id="custom-opener"
                                    >
                                        {text}
                                    </button>
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
            const opener = screen.getByTestId("custom-opener");
            // open dropdown
            userEvent.click(opener);
            userEvent.click(screen.getByText("Toggle B"));
            jest.advanceTimersByTime(100);

            // Assert
            // NOTE: the opener text is only updated in response to changes to the
            // `selectedValue` prop.
            expect(opener).toHaveTextContent("Toggle B");
        });
    });

    describe("isFilterable", () => {
        it("displays SearchTextInput when isFilterable is true", () => {
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

        it("Type something in SearchTextInput should update searchText in SingleSelect", () => {
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
    });
});
