/* eslint-disable max-lines */
import * as React from "react";
import {
    fireEvent,
    render,
    screen,
    within,
    waitFor,
} from "@testing-library/react";
import {
    userEvent as ue,
    PointerEventsCheckLevel,
} from "@testing-library/user-event";

import {PropsFor} from "@khanacademy/wonder-blocks-core";

import OptionItem from "../option-item";
import SingleSelect from "../single-select";
import type {SingleSelectLabelsValues} from "../single-select";

const doRender = (element: React.ReactElement) => {
    return {
        ...render(element),
        userEvent: ue.setup({
            advanceTimers: jest.advanceTimersByTime,
            pointerEventsCheck: PointerEventsCheckLevel.Never,
        }),
    };
};

jest.mock("react-popper", () => ({
    ...jest.requireActual("react-popper"),
    Popper: jest.fn().mockImplementation(({children}) => {
        // Mock `isReferenceHidden` to always return false (or true for testing visibility)
        return children({
            ref: jest.fn(),
            style: {},
            placement: "bottom",
            isReferenceHidden: false, // Mocking isReferenceHidden
        });
    }),
}));

describe("SingleSelect", () => {
    const onChange = jest.fn();

    beforeEach(() => {
        window.scrollTo = jest.fn();

        // We mock console.error() because React logs a bunch of errors pertaining
        // to the use href="javascript:void(0);".
        jest.spyOn(console, "error").mockImplementation(() => {});

        jest.useFakeTimers();
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

        describe("opener", () => {
            it("should render the placeholder if no selections are made", async () => {
                // Arrange
                doRender(
                    <SingleSelect
                        placeholder="Default placeholder"
                        onChange={jest.fn()}
                    >
                        <OptionItem label="Toggle A" value="toggle_a" />
                        <OptionItem label="Toggle B" value="toggle_b" />
                    </SingleSelect>,
                );

                // Act
                const opener = await screen.findByRole("combobox");

                // Assert
                expect(opener).toHaveTextContent("Default placeholder");
            });

            it("should render an aria-label if passed in as a prop", async () => {
                // Arrange
                doRender(
                    <SingleSelect
                        placeholder="Default placeholder"
                        onChange={jest.fn()}
                        aria-label="Select a thing"
                    >
                        <OptionItem label="" value="" />
                        <OptionItem label="Toggle A" value="toggle_a" />
                        <OptionItem label="Toggle B" value="toggle_b" />
                    </SingleSelect>,
                );

                // Act
                const opener = await screen.findByRole("combobox");

                // Assert
                expect(opener).toHaveAccessibleName("Select a thing");
            });

            it("should preserve the original aria-label when an option is selected", async () => {
                // Arrange
                doRender(
                    <SingleSelect
                        placeholder="Default placeholder"
                        onChange={jest.fn()}
                        aria-label="Select a thing"
                        selectedValue="toggle_a"
                    >
                        <OptionItem label="" value="" />
                        <OptionItem label="Toggle A" value="toggle_a" />
                        <OptionItem label="Toggle B" value="toggle_b" />
                    </SingleSelect>,
                );

                // Act
                const opener = await screen.findByRole("combobox");

                // Assert
                expect(opener).toHaveAccessibleName("Select a thing");
            });

            it("should render empty if the selected option has an empty value", async () => {
                // Arrange
                doRender(
                    <SingleSelect
                        placeholder="Default placeholder"
                        onChange={jest.fn()}
                        selectedValue=""
                    >
                        <OptionItem label="" value="" />
                        <OptionItem label="Toggle A" value="toggle_a" />
                        <OptionItem label="Toggle B" value="toggle_b" />
                    </SingleSelect>,
                );

                // Act
                const opener = await screen.findByRole("combobox");

                // Assert
                expect(opener).toHaveTextContent("");
            });

            it("should render the label of the selected option", async () => {
                // Arrange
                doRender(
                    <SingleSelect
                        placeholder="Default placeholder"
                        onChange={jest.fn()}
                        selectedValue="toggle_a"
                    >
                        <OptionItem label="Toggle A" value="toggle_a" />
                        <OptionItem label="Toggle B" value="toggle_b" />
                    </SingleSelect>,
                );

                // Act
                const opener = await screen.findByRole("combobox");

                // Assert
                expect(opener).toHaveTextContent("Toggle A");
            });

            it("should render labelAsText of the selected option for opener value", async () => {
                // Arrange
                doRender(
                    <SingleSelect
                        placeholder="Default placeholder"
                        onChange={jest.fn()}
                        selectedValue="toggle_a"
                    >
                        <OptionItem
                            label={<div>custom item A</div>}
                            value="toggle_a"
                            labelAsText="Plain Toggle A"
                        />
                        <OptionItem
                            label={<div>custom item B</div>}
                            value="toggle_b"
                            labelAsText="Plain Toggle B"
                        />
                    </SingleSelect>,
                );

                // Act
                const opener = await screen.findByRole("combobox");

                // Assert
                expect(opener).toHaveTextContent("Plain Toggle A");
            });

            it("can render a Node as an opener value", async () => {
                // Arrange
                doRender(
                    <SingleSelect
                        placeholder="Default placeholder"
                        onChange={jest.fn()}
                        selectedValue="toggle_a"
                        showOpenerLabelAsText={false}
                    >
                        <OptionItem
                            label={<div>custom item A</div>}
                            value="toggle_a"
                            labelAsText="Plain Toggle A"
                        />
                        <OptionItem
                            label={<div>custom item B</div>}
                            value="toggle_b"
                            labelAsText="Plain Toggle B"
                        />
                    </SingleSelect>,
                );

                // Act
                const opener = await screen.findByRole("combobox");
                const menuLabel = within(opener).getByText("custom item A");

                // Assert
                expect(menuLabel).toBeVisible();
            });
        });

        describe("mouse", () => {
            it("should open when clicking on the default opener", async () => {
                // Arrange
                const {userEvent} = doRender(uncontrolledSingleSelect);
                const opener = await screen.findByText("Choose");

                // Act
                await userEvent.click(opener);

                // Assert
                expect(
                    await screen.findByRole("listbox", {hidden: true}),
                ).toBeInTheDocument();
            });

            it("should not submit a surrounding form when clicked", async () => {
                // Arrange
                const submit = jest.fn();
                const {userEvent} = doRender(
                    <form
                        onSubmit={() => {
                            submit();
                        }}
                    >
                        <SingleSelect
                            aria-label="Choose"
                            placeholder="Default placeholder"
                            onChange={jest.fn()}
                            selectedValue="toggle_a"
                            showOpenerLabelAsText={false}
                        >
                            <OptionItem
                                label={<div>custom item A</div>}
                                value="toggle_a"
                                labelAsText="Plain Toggle A"
                            />
                            <OptionItem
                                label={<div>custom item B</div>}
                                value="toggle_b"
                                labelAsText="Plain Toggle B"
                            />
                        </SingleSelect>
                    </form>,
                );
                const opener = await screen.findByRole("combobox");

                // Act
                await userEvent.click(opener);

                // Assert
                expect(submit).not.toHaveBeenCalled();
            });

            it("should focus the first item in the dropdown", async () => {
                // Arrange
                const {userEvent} = doRender(uncontrolledSingleSelect);
                const opener = await screen.findByText("Choose");

                // Act
                await userEvent.click(opener);

                // Assert
                const options = screen.getAllByRole("option", {hidden: true});
                expect(options[0]).toHaveFocus();
            });

            it("should close when clicking on the default opener a second time", async () => {
                // Arrange
                const {userEvent} = doRender(uncontrolledSingleSelect);
                const opener = await screen.findByText("Choose");
                await userEvent.click(opener);

                // Act
                await userEvent.click(opener);

                // Assert
                expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
            });

            it("should close when clicking on an item", async () => {
                // Arrange
                const {userEvent} = doRender(uncontrolledSingleSelect);
                const opener = await screen.findByText("Choose");
                await userEvent.click(opener);

                // Act
                await userEvent.click(await screen.findByText("item 1"));

                // Assert
                expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
            });

            it("should call onChange() with the item's value when clicking it", async () => {
                // Arrange
                const {userEvent} = doRender(uncontrolledSingleSelect);
                const opener = await screen.findByText("Choose");
                await userEvent.click(opener);

                // Act
                await userEvent.click(await screen.findByText("item 1")); // closed

                // Assert
                expect(onChange).toHaveBeenCalledWith("1"); // value
            });

            it("should not focus in the first item if autoFocus is disabled", async () => {
                // Arrange
                const {userEvent} = doRender(
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
                await userEvent.click(await screen.findByRole("combobox"));

                // wait for the dropdown to open
                await screen.findByRole("listbox", {hidden: true});

                // Assert
                expect(await screen.findByRole("combobox")).toHaveFocus();
            });
        });

        describe("keyboard", () => {
            beforeEach(() => {
                jest.useFakeTimers();
            });

            describe.each([{key: "{Enter}"}, {key: " "}])(
                "$key",
                ({key}: any) => {
                    it("should open when pressing the key when the default opener is focused", async () => {
                        // Arrange
                        const {userEvent} = doRender(uncontrolledSingleSelect);
                        await userEvent.tab();

                        // Act
                        await userEvent.keyboard(key);

                        // Assert
                        const listbox = await screen.findByRole("listbox");
                        expect(listbox).toBeInTheDocument();
                    });

                    it("should focus the first item in the dropdown", async () => {
                        // Arrange
                        const {userEvent} = doRender(uncontrolledSingleSelect);
                        await userEvent.tab();

                        // Act
                        await userEvent.keyboard(key);

                        // Assert
                        const options = screen.getAllByRole("option", {
                            hidden: true,
                        });
                        expect(options[0]).toHaveFocus();
                    });
                },
            );

            it("should focus on the first option when pressing {Enter} on the opener", async () => {
                // Arrange
                const {userEvent} = doRender(uncontrolledSingleSelect);
                await userEvent.tab();

                // Act
                await userEvent.keyboard("{Enter}"); // open

                // Ensure first option is focused, not the opener
                const firstItem = await screen.findByRole("option", {
                    name: /item 1/,
                });
                // Assert
                expect(firstItem).toHaveFocus();
            });

            it("should select an item when pressing {Enter}", async () => {
                // Arrange
                const {userEvent} = doRender(uncontrolledSingleSelect);
                await userEvent.tab();
                await userEvent.keyboard("{Enter}"); // open

                // Act
                await userEvent.keyboard("{Enter}");

                // Assert
                expect(onChange).toHaveBeenCalledWith("1");

                await waitFor(() =>
                    expect(
                        screen.queryByRole("listbox"),
                    ).not.toBeInTheDocument(),
                );
            });

            it("should focus on the first option when pressing {Space} on the opener", async () => {
                // Arrange
                const {userEvent} = doRender(uncontrolledSingleSelect);
                await userEvent.tab();

                // Act
                await userEvent.keyboard(" "); // open

                // Ensure first option is focused, not the opener
                const firstItem = await screen.findByRole("option", {
                    name: /item 1/,
                });

                // Assert
                expect(firstItem).toHaveFocus();
            });

            it("should select an item when pressing {Space}", async () => {
                // Arrange
                const {userEvent} = doRender(uncontrolledSingleSelect);
                await userEvent.tab();
                await userEvent.keyboard("{Enter}"); // open

                const firstItem = await screen.findByRole("option", {
                    name: /item 1/,
                });
                expect(firstItem).toHaveFocus();

                // Act
                await userEvent.keyboard(" ");

                // Assert
                expect(onChange).toHaveBeenCalledWith("1");
                await waitFor(() => {
                    expect(
                        screen.queryByRole("listbox"),
                    ).not.toBeInTheDocument();
                });
            });

            /*
            TODO (FEI-5533): The keyboard events (I tried .keyboard and .type) are not working as
            needed. From what I can tell, they are going to the wrong element or
            otherwise not getting handled as they would in a non-test world.
            We had this issue with elsewhere too and haven't resolved it (since
            updating to UserEvents v14, it seems). Skipping this test for now
            until we can work out how to replicate things again. This could be
            changed to a storybook test perhaps.
            */
            it.skip("should find and select an item using the keyboard", async () => {
                // Arrange
                const {userEvent} = doRender(
                    <SingleSelect onChange={onChange} placeholder="Choose">
                        <OptionItem label="apple" value="apple" />
                        <OptionItem label="orange" value="orange" />
                        <OptionItem label="pear" value="pear" />
                    </SingleSelect>,
                );
                await userEvent.tab();

                // Act
                // find first occurrence
                await userEvent.keyboard("or");
                jest.advanceTimersByTime(501);

                // Assert
                expect(onChange).toHaveBeenCalledWith("orange");
                expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
            });

            it("should NOT find/select an item using the keyboard if enableTypeAhead is set false", async () => {
                // Arrange
                const {userEvent} = doRender(
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
                await userEvent.tab();

                // Act

                // Try to find first occurrence but it should not be found
                // as we have disabled type ahead.
                await userEvent.keyboard("or");
                jest.advanceTimersByTime(501);

                // Assert
                expect(onChange).not.toHaveBeenCalled();
            });

            it("should dismiss the dropdown when pressing {Escape}", async () => {
                // Arrange
                const {userEvent} = doRender(uncontrolledSingleSelect);
                await userEvent.tab();
                await userEvent.keyboard("{Enter}"); // open

                // Act
                await userEvent.keyboard("{Escape}");

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
                        aria-label="Choose"
                    >
                        <OptionItem label="item 1" value="1" />
                        <OptionItem label="item 2" value="2" />
                        <OptionItem label="item 3" value="3" />
                    </SingleSelect>
                    <button
                        data-testid="parent-button"
                        onClick={() => handleToggleMenu(true)}
                    />
                </React.Fragment>
            );
        };

        it("opens the menu when the parent updates its state", async () => {
            // Arrange
            const onToggleMock = jest.fn();
            const {userEvent} = doRender(
                <ControlledComponent onToggle={onToggleMock} />,
            );

            // Act
            await userEvent.click(
                await screen.findByRole("combobox", {name: /choose/i}),
            );

            // Assert
            expect(onToggleMock).toHaveBeenCalledWith(true);
        });

        it("closes the menu when the parent updates its state", async () => {
            // Arrange
            const onToggleMock = jest.fn();
            const {userEvent} = doRender(
                <ControlledComponent onToggle={onToggleMock} />,
            );
            // open the menu from the outside
            await userEvent.click(
                await screen.findByRole("combobox", {name: /choose/i}),
            );

            // Act
            // click on first item
            await userEvent.click(await screen.findByText("item 1"));

            // Assert
            expect(onToggleMock).toHaveBeenCalledWith(false);
        });

        it("should still allow the opener to open the menu", async () => {
            // Arrange
            const onToggleMock = jest.fn();
            const {userEvent} = doRender(
                <ControlledComponent onToggle={onToggleMock} />,
            );

            // Act
            await userEvent.click(await screen.findByText("Choose"));

            // Assert
            expect(onToggleMock).toHaveBeenCalledWith(true);
        });

        it("opens the menu when the anchor is clicked once", async () => {
            // Arrange
            const {userEvent} = doRender(<ControlledComponent />);

            // Act
            // click on the anchor
            await userEvent.click(await screen.findByText("Choose"));

            // Assert
            expect(
                await screen.findByRole("listbox", {hidden: true}),
            ).toBeInTheDocument();
        });

        it("closes the menu when the anchor is clicked", async () => {
            // Arrange
            const {userEvent} = doRender(<ControlledComponent />);

            // Act
            const opener = await screen.findByRole("combobox", {
                name: /choose/i,
            });
            // open the menu from the outside
            await userEvent.click(opener);
            // click on the dropdown anchor to hide the menu
            await userEvent.click(opener);

            // Assert
            expect(
                screen.queryByRole("listbox", {hidden: true}),
            ).not.toBeInTheDocument();
        });
    });

    describe("Custom Opener", () => {
        it("labels the custom opener with `aria-label` on SingleSelect", async () => {
            // Arrange
            doRender(
                <SingleSelect
                    aria-label="Custom opener"
                    placeholder="e.g. item 1"
                    onChange={jest.fn()}
                    opener={(eventState: any) => <button onClick={jest.fn()} />}
                >
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                    <OptionItem label="item 3" value="3" />
                </SingleSelect>,
            );

            // Act
            const opener = await screen.findByRole("combobox");

            // Assert
            expect(opener).toHaveAccessibleName("Custom opener");
        });

        it("prioritizes `aria-label` on the custom opener", async () => {
            // Arrange
            doRender(
                <SingleSelect
                    aria-label="Not winning the label race"
                    placeholder="Choose an item"
                    onChange={jest.fn()}
                    opener={(eventState: any) => (
                        <button
                            aria-label="Custom opener button"
                            onClick={jest.fn()}
                        />
                    )}
                >
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                    <OptionItem label="item 3" value="3" />
                </SingleSelect>,
            );

            // Act
            const opener = await screen.findByRole("combobox");

            // Assert
            expect(opener).toHaveAccessibleName("Custom opener button");
        });

        it("opens the menu when clicking on the custom opener", async () => {
            // Arrange
            const {userEvent} = doRender(
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
            const opener = await screen.findByText("Search");
            await userEvent.click(opener);

            // Assert
            expect(
                await screen.findByRole("listbox", {hidden: true}),
            ).toBeInTheDocument();
        });

        it("should not submit a surrounding form when a custom opener is clicked", async () => {
            // Arrange
            const submit = jest.fn();
            const {userEvent} = doRender(
                <form
                    onSubmit={() => {
                        submit();
                    }}
                >
                    <SingleSelect
                        aria-label="Choose"
                        placeholder="Select an option"
                        onChange={jest.fn()}
                        selectedValue="toggle_a"
                        showOpenerLabelAsText={false}
                        opener={(eventState: any) => (
                            <button aria-label="Search">Search</button>
                        )}
                    >
                        <OptionItem
                            label={<div>custom item A</div>}
                            value="toggle_a"
                            labelAsText="Plain Toggle A"
                        />
                        <OptionItem
                            label={<div>custom item B</div>}
                            value="toggle_b"
                            labelAsText="Plain Toggle B"
                        />
                    </SingleSelect>
                </form>,
            );
            const opener = await screen.findByRole("combobox");

            // Act
            await userEvent.click(opener);

            // Assert
            expect(submit).not.toHaveBeenCalled();
        });

        it("calls the custom onClick handler", async () => {
            // Arrange
            const onClickMock = jest.fn();

            const {userEvent} = doRender(
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
            const opener = await screen.findByLabelText("Custom opener");
            await userEvent.click(opener);

            // Assert
            expect(onClickMock).toHaveBeenCalledTimes(1);
        });

        it("verifies testId is not passed from the parent element", async () => {
            // Arrange
            doRender(
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
            const opener = await screen.findByLabelText("Custom opener");

            // Assert
            expect(opener).not.toHaveAttribute("data-testid");
        });

        it("passes the placeholder content to the custom opener", async () => {
            // Arrange
            const {userEvent} = doRender(
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
            const opener = await screen.findByRole("combobox");
            // open dropdown
            await userEvent.click(opener);

            // Assert
            expect(opener).toHaveTextContent("Custom placeholder");
        });

        it("passes the selected value to the custom opener", async () => {
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

            const {userEvent} = doRender(<ControlledComponent />);

            // Act
            const opener = await screen.findByRole("combobox");
            // open dropdown
            await userEvent.click(opener);
            await userEvent.click(await screen.findByText("Toggle B"));

            // Assert
            // NOTE: the opener value text is only updated in response to changes to the
            // `selectedValue` prop.
            expect(opener).toHaveTextContent("Toggle B");
        });
    });

    describe("isFilterable", () => {
        it("displays SearchField when isFilterable is true", async () => {
            // Arrange
            const {userEvent} = doRender(
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
            await userEvent.click(await screen.findByText("Choose"));

            // Act
            const searchInput = await screen.findByPlaceholderText("Filter");

            // Assert
            expect(searchInput).toBeInTheDocument();
        });

        it("filters the items by the search input (case insensitive)", async () => {
            // Arrange
            const {userEvent} = doRender(
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
            await userEvent.click(await screen.findByText("Choose"));

            // Act
            const searchInput = await screen.findByPlaceholderText("Filter");
            await userEvent.type(searchInput, "Item 2");

            // Assert
            const option = await screen.findByText("item 2");
            expect(option).toHaveTextContent("item 2");
        });

        it("Type something in SearchField should update searchText in SingleSelect", async () => {
            // Arrange
            const {userEvent} = doRender(
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
            await userEvent.click(await screen.findByText("Choose"));
            const searchInput = await screen.findByPlaceholderText("Filter");
            await userEvent.type(searchInput, "Item 2");

            // Act
            await userEvent.clear(searchInput);
            await userEvent.type(searchInput, "Item 1");

            // Assert
            const option = await screen.findByText("item 1");
            expect(option).toHaveTextContent("item 1");
        });

        it("Click dismiss button should clear the searchText in SingleSelect", async () => {
            // Arrange
            const {userEvent} = doRender(
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
            await userEvent.click(await screen.findByText("Choose"));
            const searchInput = await screen.findByPlaceholderText("Filter");
            await userEvent.type(searchInput, "Should be cleared");

            const dismissBtn = await screen.findByLabelText("Clear search");

            // Act
            await userEvent.click(dismissBtn);

            // Assert
            expect(searchInput.textContent).toEqual("");
        });

        it("Open SingleSelect should clear the searchText", async () => {
            // Arrange
            const {userEvent} = doRender(
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
            const opener = await screen.findByText("Choose");
            await userEvent.click(opener);
            const searchInput = await screen.findByPlaceholderText("Filter");
            await userEvent.type(searchInput, "some text");

            // Act
            await userEvent.click(opener);

            // Assert
            expect(searchInput.textContent).toEqual("");
        });

        it("should move focus to the dismiss button after pressing {tab} on the text input", async () => {
            // Arrange
            const {userEvent} = doRender(
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
            await userEvent.click(await screen.findByRole("combobox"));

            const searchInput = await screen.findByPlaceholderText("Filter");
            await userEvent.click(searchInput);
            await userEvent.paste("some text");

            // Act
            await userEvent.tab();

            // Assert
            const dismissBtn = await screen.findByLabelText("Clear search");
            expect(dismissBtn).toHaveFocus();
        });

        it("should filter an option", async () => {
            // Arrange
            const {userEvent} = doRender(
                <SingleSelect
                    onChange={onChange}
                    placeholder="Choose"
                    isFilterable={true}
                    opened={true}
                >
                    <OptionItem label="Canada" value="ca" />
                    <OptionItem label="Colombia" value="co" />
                </SingleSelect>,
            );

            // Act
            // NOTE: We search using the lowercased version of the label.
            await userEvent.type(await screen.findByRole("textbox"), "col");

            // Assert
            const filteredOption = await screen.findByText("Colombia");
            expect(filteredOption).toBeInTheDocument();
        });

        it("should filter out an option if it's not part of the results", async () => {
            // Arrange
            const {userEvent} = doRender(
                <SingleSelect
                    onChange={onChange}
                    placeholder="Choose"
                    isFilterable={true}
                    opened={true}
                >
                    <OptionItem label="Canada" value="ca" />
                    <OptionItem label="Colombia" value="co" />
                </SingleSelect>,
            );

            // Act
            // NOTE: We search using the lowercased version of the label.
            await userEvent.type(await screen.findByRole("textbox"), "col");

            // Assert
            const filteredOutOption = screen.queryByRole("option", {
                name: "Canada",
            });
            expect(filteredOutOption).not.toBeInTheDocument();
        });
    });

    describe("Custom listbox styles", () => {
        it("should apply the default maxHeight to the listbox wrapper", async () => {
            // Arrange

            // Act
            doRender(
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
            const dropdownMenuWrapper = await screen.findByTestId(
                "dropdown-core-container",
            );
            expect(dropdownMenuWrapper).toHaveStyle(
                "max-height: var(--popper-max-height)",
            );
        });

        it("should apply the default maxHeight to a virtualized listbox wrapper", async () => {
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
            doRender(
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
            const dropdownMenuWrapper = await screen.findByTestId(
                "dropdown-core-container",
            );
            // Max allowed height
            expect(dropdownMenuWrapper).toHaveStyle(
                "max-height: var(--popper-max-height)",
            );
        });

        it("should override the default maxHeight to the listbox if a custom dropdownStyle is set", async () => {
            // Arrange
            const customMaxHeight = 200;

            // Act
            doRender(
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
            const dropdownMenu = await screen.findByTestId(
                "dropdown-core-container",
            );
            expect(dropdownMenu).toHaveStyle("max-height: 200px");
        });
    });

    describe("a11y > Live region", () => {
        let announceMessageSpy: any;
        beforeAll(() => {
            announceMessageSpy = jest.spyOn(
                require("@khanacademy/wonder-blocks-announcer"),
                "announceMessage",
            );
        });

        afterAll(() => {
            announceMessageSpy.mockRestore();
        });

        it("should change the number of options after using the search filter", async () => {
            // Arrange
            const {userEvent} = doRender(
                <SingleSelect
                    onChange={onChange}
                    placeholder="Choose"
                    isFilterable={true}
                    opened={true}
                >
                    <OptionItem label="ITEM 0" value="0" />
                    <OptionItem label="ITEM 1" value="1" />
                    <OptionItem label="ITEM 2" value="2" />
                </SingleSelect>,
            );

            // Act
            // NOTE: We search using the lowercased version of the label.
            await userEvent.type(await screen.findByRole("textbox"), "item 0");

            // Assert
            await expect(announceMessageSpy).toHaveBeenCalledWith({
                message: "1 item",
            });
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

        const enLabels: SingleSelectLabelsValues = {
            clearSearch: "Clear Search",
            filter: "Filter",
            noResults: "No Results",
            someResults: (numOptions: number) => "Some Results",
        };

        it("passes the custom label to the search input field", async () => {
            // Arrange
            const labels: SingleSelectLabelsValues = {
                ...enLabels,
                filter: "Filtrar",
            };

            // Act
            doRender(
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
            expect(
                await screen.findByPlaceholderText("Filtrar"),
            ).toBeInTheDocument();
        });

        it("passes the custom label to the dismiss filter icon", async () => {
            // Arrange
            const labels: SingleSelectLabelsValues = {
                ...enLabels,
                clearSearch: "Limpiar busqueda",
                filter: "Filtrar",
            };

            const {userEvent} = doRender(
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
            await userEvent.type(
                await screen.findByPlaceholderText("Filtrar"),
                "m",
            );

            // Assert
            expect(
                await screen.findByLabelText("Limpiar busqueda"),
            ).toBeInTheDocument();
        });

        it("passes the custom label to the no results label", async () => {
            // Arrange
            const labels: SingleSelectLabelsValues = {
                ...enLabels,
                filter: "Filtrar",
                noResults: "No hay resultados",
            };

            const {userEvent} = doRender(
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
            await userEvent.type(
                await screen.findByPlaceholderText("Filtrar"),
                "invalid",
            );

            // Assert
            expect(
                await screen.findByText("No hay resultados"),
            ).toBeInTheDocument();
        });
    });

    describe("a11y > Focusable", () => {
        it("should be focusable", () => {
            // Arrange
            doRender(
                <SingleSelect
                    placeholder="Default placeholder"
                    onChange={jest.fn()}
                    testId="select-focus-test"
                >
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                    <OptionItem label="item 3" value="3" />
                </SingleSelect>,
            );

            // Act
            const singleSelect = screen.getByTestId("select-focus-test");
            singleSelect.focus();

            // Assert
            expect(singleSelect).toHaveFocus();
        });

        it("should be focusable when disabled", () => {
            // Arrange
            doRender(
                <SingleSelect
                    placeholder="Default placeholder"
                    onChange={jest.fn()}
                    testId="select-focus-test"
                    disabled={true}
                >
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                    <OptionItem label="item 3" value="3" />
                </SingleSelect>,
            );

            // Act
            const singleSelect = screen.getByTestId("select-focus-test");
            singleSelect.focus();

            // Assert
            expect(singleSelect).toHaveFocus();
        });
    });

    describe("Disabled state", () => {
        it("should set the `aria-disabled` attribute to `true` if `disabled` prop is `true`", () => {
            // Arrange

            // Act
            doRender(
                <SingleSelect
                    placeholder="Default placeholder"
                    onChange={jest.fn()}
                    testId="select-focus-test"
                    disabled={true}
                >
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                    <OptionItem label="item 3" value="3" />
                </SingleSelect>,
            );
            const singleSelect = screen.getByTestId("select-focus-test");

            // Assert
            expect(singleSelect).toHaveAttribute("aria-disabled", "true");
        });

        it("should not set the `disabled` attribute if `disabled` prop is `true` since `aria-disabled` is used instead", () => {
            // Arrange

            // Act
            doRender(
                <SingleSelect
                    placeholder="Default placeholder"
                    onChange={jest.fn()}
                    testId="select-focus-test"
                    disabled={true}
                >
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                    <OptionItem label="item 3" value="3" />
                </SingleSelect>,
            );
            const singleSelect = screen.getByTestId("select-focus-test");

            // Assert
            expect(singleSelect).not.toHaveAttribute("disabled");
        });

        it("should not be opened if it is disabled and `open` prop is set to true", () => {
            // Arrange

            // Act
            doRender(
                <SingleSelect
                    placeholder="Default placeholder"
                    onChange={jest.fn()}
                    disabled={true}
                    opened={true}
                >
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                    <OptionItem label="item 3" value="3" />
                </SingleSelect>,
            );

            // Assert
            expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
        });

        it("should not be able to open the select using the keyboard if there are no items", async () => {
            // Arrange
            doRender(
                <SingleSelect
                    placeholder="Default placeholder"
                    onChange={jest.fn()}
                />,
            );

            // Act
            // Press the button
            const button = await screen.findByRole("combobox");
            // NOTE: we need to use fireEvent here because await userEvent doesn't
            // support keyUp/Down events and we use these handlers to override
            // the default behavior of the button.
            // eslint-disable-next-line testing-library/prefer-user-event
            fireEvent.keyDown(button, {
                keyCode: 40,
            });
            // eslint-disable-next-line testing-library/prefer-user-event
            fireEvent.keyUp(button, {
                keyCode: 40,
            });

            // Assert
            expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
        });

        it("should not be able to open the select using the keyboard if all items are disabled", async () => {
            // Arrange
            doRender(
                <SingleSelect
                    placeholder="Default placeholder"
                    onChange={jest.fn()}
                >
                    <OptionItem label="item 1" value="1" disabled={true} />
                    <OptionItem label="item 2" value="2" disabled={true} />
                </SingleSelect>,
            );

            // Act
            // Press the button
            const button = await screen.findByRole("combobox");
            // NOTE: we need to use fireEvent here because await userEvent doesn't
            // support keyUp/Down events and we use these handlers to override
            // the default behavior of the button.
            // eslint-disable-next-line testing-library/prefer-user-event
            fireEvent.keyDown(button, {
                keyCode: 40,
            });
            // eslint-disable-next-line testing-library/prefer-user-event
            fireEvent.keyUp(button, {
                keyCode: 40,
            });

            // Assert
            expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
        });
    });

    describe("a11y > Focusable", () => {
        it("should be focusable", () => {
            // Arrange
            doRender(
                <SingleSelect
                    placeholder="Default placeholder"
                    onChange={jest.fn()}
                    testId="select-focus-test"
                >
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                    <OptionItem label="item 3" value="3" />
                </SingleSelect>,
            );

            // Act
            const singleSelect = screen.getByTestId("select-focus-test");
            singleSelect.focus();

            // Assert
            expect(singleSelect).toHaveFocus();
        });

        it("should be focusable when disabled", () => {
            // Arrange
            doRender(
                <SingleSelect
                    placeholder="Default placeholder"
                    onChange={jest.fn()}
                    testId="select-focus-test"
                    disabled={true}
                >
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                    <OptionItem label="item 3" value="3" />
                </SingleSelect>,
            );

            // Act
            const singleSelect = screen.getByTestId("select-focus-test");
            singleSelect.focus();

            // Assert
            expect(singleSelect).toHaveFocus();
        });
    });

    describe("Disabled state", () => {
        it("should set the `aria-disabled` attribute to `true` if `disabled` prop is `true`", () => {
            // Arrange

            // Act
            doRender(
                <SingleSelect
                    placeholder="Default placeholder"
                    onChange={jest.fn()}
                    testId="select-focus-test"
                    disabled={true}
                >
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                    <OptionItem label="item 3" value="3" />
                </SingleSelect>,
            );
            const singleSelect = screen.getByTestId("select-focus-test");

            // Assert
            expect(singleSelect).toHaveAttribute("aria-disabled", "true");
        });

        it("should not set the `disabled` attribute if `disabled` prop is `true` since `aria-disabled` is used instead", () => {
            // Arrange

            // Act
            doRender(
                <SingleSelect
                    placeholder="Default placeholder"
                    onChange={jest.fn()}
                    testId="select-focus-test"
                    disabled={true}
                >
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                    <OptionItem label="item 3" value="3" />
                </SingleSelect>,
            );
            const singleSelect = screen.getByTestId("select-focus-test");

            // Assert
            expect(singleSelect).not.toHaveAttribute("disabled");
        });
    });

    describe("Ids", () => {
        it("Should auto-generate an id for the opener if `id` prop is not provided", async () => {
            // Arrange
            doRender(
                <SingleSelect placeholder="Choose" onChange={jest.fn()}>
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                </SingleSelect>,
            );

            // Act
            const opener = await screen.findByRole("combobox");

            // Assert
            expect(opener).toHaveAttribute("id", expect.any(String));
        });

        it("Should use the `id` prop if provided", async () => {
            // Arrange
            const id = "test-id";
            doRender(
                <SingleSelect placeholder="Choose" onChange={jest.fn()} id={id}>
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                </SingleSelect>,
            );

            // Act
            const opener = await screen.findByRole("combobox");

            // Assert
            expect(opener).toHaveAttribute("id", id);
        });

        it("Should auto-generate an id for the dropdown if `dropdownId` prop is not provided", async () => {
            // Arrange
            const {userEvent} = doRender(
                <SingleSelect placeholder="Choose" onChange={jest.fn()}>
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                </SingleSelect>,
            );

            // Act
            // Open the dropdown
            const opener = await screen.findByRole("combobox");
            await userEvent.click(opener);

            // Assert
            expect(
                await screen.findByRole("listbox", {hidden: true}),
            ).toHaveAttribute("id", expect.any(String));
        });

        it("Should use the `dropdownId` prop if provided", async () => {
            // Arrange
            const dropdownId = "test-id";
            const {userEvent} = doRender(
                <SingleSelect
                    placeholder="Choose"
                    onChange={jest.fn()}
                    dropdownId={dropdownId}
                >
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                </SingleSelect>,
            );

            // Act
            // Open the dropdown
            const opener = await screen.findByRole("combobox");
            await userEvent.click(opener);

            // Assert
            expect(
                await screen.findByRole("listbox", {hidden: true}),
            ).toHaveAttribute("id", dropdownId);
        });
    });

    describe("a11y > aria-controls", () => {
        it("Should set the `aria-controls` attribute on the default opener to the provided dropdownId prop", async () => {
            // Arrange
            const dropdownId = "test-id";
            const {userEvent} = doRender(
                <SingleSelect
                    placeholder="Choose"
                    onChange={jest.fn()}
                    dropdownId={dropdownId}
                >
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                </SingleSelect>,
            );

            // Act
            const opener = await screen.findByRole("combobox");
            await userEvent.click(opener);
            const dropdown = await screen.findByRole("listbox", {hidden: true});

            // Assert
            expect(opener).toHaveAttribute("aria-controls", dropdown.id);
            expect(opener).toHaveAttribute("aria-controls", dropdownId);
        });

        it("Should set the `aria-controls` attribute on the default opener to the auto-generated dropdownId", async () => {
            // Arrange
            const {userEvent} = doRender(
                <SingleSelect placeholder="Choose" onChange={jest.fn()}>
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                </SingleSelect>,
            );

            // Act
            const opener = await screen.findByRole("combobox");
            await userEvent.click(opener);
            const dropdown = await screen.findByRole("listbox", {hidden: true});

            // Assert
            expect(opener).toHaveAttribute("aria-controls", dropdown.id);
            expect(opener).toHaveAttribute("aria-controls", expect.any(String));
        });

        it("Should set the `aria-controls` attribute on the custom opener to the provided dropdownId prop", async () => {
            // Arrange
            const dropdownId = "test-id";
            const {userEvent} = doRender(
                <SingleSelect
                    placeholder="Choose"
                    onChange={jest.fn()}
                    dropdownId={dropdownId}
                    opener={() => (
                        <button aria-label="Search" onClick={jest.fn()} />
                    )}
                >
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                </SingleSelect>,
            );

            // Act
            const opener = await screen.findByLabelText("Search");
            await userEvent.click(opener);
            const dropdown = await screen.findByRole("listbox", {hidden: true});

            // Assert
            expect(opener).toHaveAttribute("aria-controls", dropdown.id);
            expect(opener).toHaveAttribute("aria-controls", dropdownId);
        });

        it("Should set the `aria-controls` attribute on the custom opener to the auto-generated dropdownId", async () => {
            // Arrange
            const {userEvent} = doRender(
                <SingleSelect
                    placeholder="Choose"
                    onChange={jest.fn()}
                    opener={() => (
                        <button aria-label="Search" onClick={jest.fn()} />
                    )}
                >
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                </SingleSelect>,
            );

            // Act
            const opener = await screen.findByLabelText("Search");
            await userEvent.click(opener);
            const dropdown = await screen.findByRole("listbox", {hidden: true});

            // Assert
            expect(opener).toHaveAttribute("aria-controls", dropdown.id);
            expect(opener).toHaveAttribute("aria-controls", expect.any(String));
        });
    });

    describe("a11y > aria-haspopup", () => {
        it("should have aria-haspopup set on the opener", async () => {
            // Arrange
            doRender(
                <SingleSelect placeholder="Choose" onChange={jest.fn()}>
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                </SingleSelect>,
            );

            // Act
            const opener = await screen.findByRole("combobox");

            // Assert
            expect(opener).toHaveAttribute("aria-haspopup", "listbox");
        });

        it("should have aria-haspopup set on the custom opener", async () => {
            // Arrange
            doRender(
                <SingleSelect
                    placeholder="Choose"
                    onChange={jest.fn()}
                    opener={() => (
                        <button aria-label="Search" onClick={jest.fn()} />
                    )}
                >
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                </SingleSelect>,
            );

            // Act
            const opener = await screen.findByLabelText("Search");

            // Assert
            expect(opener).toHaveAttribute("aria-haspopup", "listbox");
        });
    });

    describe("a11y > aria-expanded", () => {
        it("should have aria-expanded=false when closed", async () => {
            // Arrange
            doRender(
                <SingleSelect placeholder="Choose" onChange={jest.fn()}>
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                </SingleSelect>,
            );

            // Act
            const opener = await screen.findByRole("combobox");

            // Assert
            expect(opener).toHaveAttribute("aria-expanded", "false");
        });

        it("updates the aria-expanded value when opening", async () => {
            // Arrange
            const {userEvent} = doRender(
                <SingleSelect placeholder="Choose" onChange={jest.fn()}>
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                </SingleSelect>,
            );

            // Act
            const opener = await screen.findByRole("combobox");
            await userEvent.click(opener);

            // Assert
            expect(opener).toHaveAttribute("aria-expanded", "true");
        });

        it("should have aria-expanded=false when closed and using a custom opener", async () => {
            // Arrange
            doRender(
                <SingleSelect
                    placeholder="Choose"
                    onChange={jest.fn()}
                    opener={() => (
                        <button aria-label="Search" onClick={jest.fn()} />
                    )}
                >
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                </SingleSelect>,
            );

            // Act
            const opener = await screen.findByLabelText("Search");

            // Assert
            expect(opener).toHaveAttribute("aria-expanded", "false");
        });

        it("updates the aria-expanded value when opening and using a custom opener", async () => {
            // Arrange
            const {userEvent} = doRender(
                <SingleSelect
                    placeholder="Choose"
                    onChange={jest.fn()}
                    opener={() => (
                        <button aria-label="Search" onClick={jest.fn()} />
                    )}
                >
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                </SingleSelect>,
            );

            // Act
            const opener = await screen.findByLabelText("Search");
            await userEvent.click(opener);

            // Assert
            expect(opener).toHaveAttribute("aria-expanded", "true");
        });
    });

    describe("a11y > aria-invalid", () => {
        it.each([
            {error: true, ariaInvalid: "true"},
            {error: false, ariaInvalid: "false"},
            {error: undefined, ariaInvalid: "false"},
        ])(
            "should set aria-invalid to $ariaInvalid if error is $error",
            async ({error, ariaInvalid}) => {
                // Arrange
                doRender(
                    <SingleSelect
                        placeholder="Choose"
                        onChange={jest.fn()}
                        error={error}
                    />,
                );

                // Act
                const opener = await screen.findByRole("combobox");

                // Assert
                expect(opener).toHaveAttribute("aria-invalid", ariaInvalid);
            },
        );

        it.each([
            {error: true, ariaInvalid: "true"},
            {error: false, ariaInvalid: "false"},
            {error: undefined, ariaInvalid: "false"},
        ])(
            "should set aria-invalid to $ariaInvalid if error is $error and there is a custom opener",
            async ({error, ariaInvalid}) => {
                // Arrange
                doRender(
                    <SingleSelect
                        placeholder="Choose"
                        onChange={jest.fn()}
                        error={error}
                        opener={() => (
                            <button aria-label="Search" onClick={jest.fn()} />
                        )}
                    />,
                );

                // Act
                const opener = await screen.findByRole("combobox");

                // Assert
                expect(opener).toHaveAttribute("aria-invalid", ariaInvalid);
            },
        );
    });

    describe("a11y > violations", () => {
        afterEach(() => {
            jest.useFakeTimers();
        });

        it("should not have any violations", async () => {
            // Arrange
            const {container} = doRender(
                <SingleSelect
                    onChange={jest.fn()}
                    opened={true}
                    placeholder="Choose"
                    aria-label="Choose"
                >
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                </SingleSelect>,
            );

            // Act
            // Flush any pending timers before switching to real timers
            // https://testing-library.com/docs/using-fake-timers/
            jest.runOnlyPendingTimers();
            // Use real timers for the jest-axe check otherwise the test will timeout
            // https://github.com/dequelabs/axe-core/issues/3055
            jest.useRealTimers();

            // Assert
            await expect(container).toHaveNoA11yViolations();
        });

        it("should not have any violations when it is open", async () => {
            // Arrange
            const {container} = doRender(
                <SingleSelect
                    onChange={jest.fn()}
                    opened={true}
                    placeholder="Choose"
                    aria-label="Choose"
                >
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                </SingleSelect>,
            );

            // Act
            // Flush any pending timers before switching to real timers
            // https://testing-library.com/docs/using-fake-timers/
            jest.runOnlyPendingTimers();
            // Use real timers for the jest-axe check otherwise the test will timeout
            // https://github.com/dequelabs/axe-core/issues/3055
            jest.useRealTimers();

            // Assert
            await expect(container).toHaveNoA11yViolations();
        });
    });

    describe("validation", () => {
        const ControlledSingleSelect = (
            props: Partial<PropsFor<typeof SingleSelect>>,
        ) => {
            const [value, setValue] = React.useState<string | undefined>(
                props.selectedValue || undefined,
            );
            return (
                <SingleSelect
                    {...props}
                    aria-label="Choose"
                    placeholder="Choose"
                    selectedValue={value}
                    onChange={setValue}
                >
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                </SingleSelect>
            );
        };
        describe("when a value is selected", () => {
            it("should call validate prop", async () => {
                // Arrange
                const validate = jest.fn();
                const {userEvent} = doRender(
                    <ControlledSingleSelect validate={validate} />,
                );
                const opener = await screen.findByRole("combobox");
                await userEvent.click(opener);

                // Act
                await userEvent.click(screen.getByText("item 1"));
                // Assert
                expect(validate).toHaveBeenCalledExactlyOnceWith("1");
            });

            it("should call onValidate prop", async () => {
                // Arrange
                const errorMessage = "error";
                const onValidate = jest.fn();
                const {userEvent} = doRender(
                    <ControlledSingleSelect
                        validate={() => errorMessage}
                        onValidate={onValidate}
                    />,
                );
                const opener = await screen.findByRole("combobox");
                await userEvent.click(opener);

                // Act
                await userEvent.click(screen.getByText("item 1"));

                // Assert
                expect(onValidate).toHaveBeenCalledExactlyOnceWith(
                    errorMessage,
                );
            });

            it("should be in an error state when validation fails", async () => {
                // Arrange
                const {userEvent} = doRender(
                    <ControlledSingleSelect validate={() => "Error"} />,
                );
                const opener = await screen.findByRole("combobox");
                await userEvent.click(opener);

                // Act
                await userEvent.click(screen.getByText("item 1"));

                // Assert
                expect(opener).toHaveAttribute("aria-invalid", "true");
            });

            it("should be in an error state when validation fails with a custom opener", async () => {
                // Arrange
                const {userEvent} = doRender(
                    <ControlledSingleSelect
                        validate={() => "Error"}
                        opener={() => (
                            <button aria-label="Search" onClick={jest.fn()} />
                        )}
                    />,
                );
                const opener = await screen.findByLabelText("Search");
                await userEvent.click(opener);

                // Act
                await userEvent.click(screen.getByText("item 1"));

                // Assert
                expect(opener).toHaveAttribute("aria-invalid", "true");
            });
        });

        describe("validation on mount", () => {
            it("should validate twice when first rendered if there is a selected value (once on initalization, once after mount)", () => {
                // Arrange
                const validate = jest.fn();
                // Act
                doRender(
                    <ControlledSingleSelect
                        validate={validate}
                        selectedValue={"1"}
                    />,
                );
                // Assert
                expect(validate.mock.calls).toStrictEqual([["1"], ["1"]]);
            });

            it("should be in an error state on mount if there is an invalid selected value", async () => {
                // Arrange
                // Act
                doRender(
                    <ControlledSingleSelect
                        validate={(value) => {
                            if (value === "1") {
                                return "Error";
                            }
                        }}
                        selectedValue={"1"}
                    />,
                );
                // Assert
                expect(await screen.findByRole("combobox")).toHaveAttribute(
                    "aria-invalid",
                    "true",
                );
            });

            it("should not be in an error state on mount if there is a valid selected value", async () => {
                // Arrange
                // Act
                doRender(
                    <ControlledSingleSelect
                        validate={(value) => {
                            if (value === "1") {
                                return "Error";
                            }
                        }}
                        selectedValue={"2"}
                    />,
                );
                // Assert
                expect(await screen.findByRole("combobox")).toHaveAttribute(
                    "aria-invalid",
                    "false",
                );
            });

            it("should not validate on mount if there is no selected value", () => {
                // Arrange
                // Act
                const validate = jest.fn();
                doRender(
                    <ControlledSingleSelect
                        validate={validate}
                        selectedValue={undefined}
                    />,
                );

                // Assert
                expect(validate).not.toHaveBeenCalled();
            });

            it("should not be in an error state on mount if there is no selected value", async () => {
                // Arrange
                // Act
                doRender(
                    <ControlledSingleSelect
                        validate={() => "Error"}
                        selectedValue={undefined}
                    />,
                );
                // Assert
                expect(await screen.findByRole("combobox")).toHaveAttribute(
                    "aria-invalid",
                    "false",
                );
            });
        });

        describe("interactions after there is a validation error", () => {
            it("should still be in an error state before a value is picked", async () => {
                // Arrange
                const errorMessage = "Error message";
                const {userEvent} = doRender(
                    <ControlledSingleSelect
                        validate={(value) =>
                            value === "1" ? errorMessage : undefined
                        }
                        selectedValue={"1"}
                    />,
                );

                // Act
                await userEvent.click(await screen.findByRole("combobox")); // Open the dropdown

                // Assert
                expect(await screen.findByRole("combobox")).toHaveAttribute(
                    "aria-invalid",
                    "true",
                );
            });

            it("should not be in an error state once a value is picked", async () => {
                // Arrange
                const errorMessage = "Error message";
                const {userEvent} = doRender(
                    <ControlledSingleSelect
                        validate={(value) =>
                            value === "1" ? errorMessage : undefined
                        }
                        selectedValue={"1"}
                    />,
                );
                await userEvent.click(await screen.findByRole("combobox")); // Open the dropdown

                // Act
                await userEvent.click(await screen.findByText("item 2")); // Pick a value

                // Assert
                expect(await screen.findByRole("combobox")).toHaveAttribute(
                    "aria-invalid",
                    "false",
                );
            });
        });

        describe("required", () => {
            describe("tabbing through without picking a value", () => {
                it("should call onValidate prop", async () => {
                    // Arrange
                    const requiredMessage = "Required field";
                    const onValidate = jest.fn();
                    const {userEvent} = doRender(
                        <ControlledSingleSelect
                            onValidate={onValidate}
                            required={requiredMessage}
                        />,
                    );

                    // Act
                    await userEvent.tab(); // focus on the select
                    await userEvent.tab(); // leave the select

                    // Assert
                    expect(onValidate).toHaveBeenCalledExactlyOnceWith(
                        requiredMessage,
                    );
                });

                it("should be in an error state", async () => {
                    // Arrange
                    const requiredMessage = "Required field";
                    const {userEvent} = doRender(
                        <ControlledSingleSelect required={requiredMessage} />,
                    );
                    await userEvent.tab(); // focus on the select

                    // Act
                    await userEvent.tab(); // leave the select

                    // Assert
                    expect(screen.getByRole("combobox")).toHaveAttribute(
                        "aria-invalid",
                        "true",
                    );
                });

                it("should call onValidate prop with a custom opener", async () => {
                    // Arrange
                    const requiredMessage = "Required field";
                    const onValidate = jest.fn();
                    const {userEvent} = doRender(
                        <ControlledSingleSelect
                            onValidate={onValidate}
                            required={requiredMessage}
                            opener={() => (
                                <button
                                    aria-label="Search"
                                    onClick={jest.fn()}
                                />
                            )}
                        />,
                    );

                    // Act
                    await userEvent.tab(); // focus on the select
                    await userEvent.tab(); // leave the select

                    // Assert
                    expect(onValidate).toHaveBeenCalledExactlyOnceWith(
                        requiredMessage,
                    );
                });

                it("should be in an error state with a custom opener", async () => {
                    // Arrange
                    const requiredMessage = "Required field";
                    const {userEvent} = doRender(
                        <ControlledSingleSelect
                            opener={() => (
                                <button
                                    aria-label="Search"
                                    onClick={jest.fn()}
                                />
                            )}
                            required={requiredMessage}
                        />,
                    );

                    // Act
                    await userEvent.tab(); // focus on the select
                    await userEvent.tab(); // leave the select

                    // Assert
                    expect(screen.getByLabelText("Search")).toHaveAttribute(
                        "aria-invalid",
                        "true",
                    );
                });

                it("should not call onValidate prop if it is disabled", async () => {
                    // Arrange
                    const requiredMessage = "Required field";
                    const onValidate = jest.fn();
                    const {userEvent} = doRender(
                        <ControlledSingleSelect
                            onValidate={onValidate}
                            required={requiredMessage}
                            disabled={true}
                        />,
                    );

                    // Act
                    await userEvent.tab(); // focus on the select
                    await userEvent.tab(); // leave the select

                    // Assert
                    expect(onValidate).not.toHaveBeenCalled();
                });

                it("should not be in an error state if it is disabled", async () => {
                    // Arrange
                    const requiredMessage = "Required field";
                    const {userEvent} = doRender(
                        <ControlledSingleSelect
                            required={requiredMessage}
                            disabled={true}
                        />,
                    );

                    // Act
                    await userEvent.tab(); // focus on the select
                    await userEvent.tab(); // leave the select

                    // Assert
                    expect(screen.getByRole("combobox")).toHaveAttribute(
                        "aria-invalid",
                        "false",
                    );
                });
            });
            describe("opening and closing the dropdown without picking a value", () => {
                it("should call the onValidate prop when it is closed", async () => {
                    // Arrange
                    const onValidate = jest.fn();
                    const requiredMessage = "Required field";
                    const {userEvent} = doRender(
                        <ControlledSingleSelect
                            onValidate={onValidate}
                            required={requiredMessage}
                        />,
                    );

                    // Act
                    await userEvent.click(await screen.findByRole("combobox")); // Open the dropdown
                    await userEvent.click(await screen.findByRole("combobox")); // Close the dropdown

                    // Assert
                    expect(onValidate).toHaveBeenCalledExactlyOnceWith(
                        requiredMessage,
                    );
                });

                it("should be in an error state when it is closed", async () => {
                    // Arrange
                    const requiredMessage = "Required field";
                    const {userEvent} = doRender(
                        <ControlledSingleSelect required={requiredMessage} />,
                    );

                    // Act
                    await userEvent.click(await screen.findByRole("combobox")); // Open the dropdown
                    await userEvent.click(await screen.findByRole("combobox")); // Close the dropdown

                    // Assert
                    expect(await screen.findByRole("combobox")).toHaveAttribute(
                        "aria-invalid",
                        "true",
                    );
                });

                it("should not call the onValidate prop when it is only opened", async () => {
                    // Arrange
                    const requiredMessage = "Required field";
                    const onValidate = jest.fn();
                    const {userEvent} = doRender(
                        <ControlledSingleSelect
                            required={requiredMessage}
                            onValidate={onValidate}
                        />,
                    );

                    // Act
                    await userEvent.click(await screen.findByRole("combobox")); // Open the dropdown

                    // Assert
                    expect(onValidate).not.toHaveBeenCalled();
                });

                it("should not be in an error state when it is only opened", async () => {
                    // Arrange
                    const requiredMessage = "Required field";
                    const {userEvent} = doRender(
                        <ControlledSingleSelect required={requiredMessage} />,
                    );

                    // Act
                    await userEvent.click(await screen.findByRole("combobox")); // Open the dropdown

                    // Assert
                    expect(await screen.findByRole("combobox")).toHaveAttribute(
                        "aria-invalid",
                        "false",
                    );
                });
            });

            describe("opening and closing the dropdown by pressing escape without picking a value", () => {
                it("should call the onValidate prop", async () => {
                    // Arrange
                    const requiredMessage = "Required field";
                    const onValidate = jest.fn();
                    const {userEvent} = doRender(
                        <ControlledSingleSelect
                            onValidate={onValidate}
                            required={requiredMessage}
                        />,
                    );

                    // Act
                    await userEvent.tab();
                    await userEvent.keyboard("{Enter}"); // Open the dropdown
                    await userEvent.keyboard("{Escape}"); // Close the dropdown

                    // Assert
                    expect(onValidate).toHaveBeenCalledExactlyOnceWith(
                        requiredMessage,
                    );
                });

                it("should be in an error state", async () => {
                    // Arrange
                    const requiredMessage = "Required field";
                    const {userEvent} = doRender(
                        <ControlledSingleSelect required={requiredMessage} />,
                    );

                    // Act
                    await userEvent.tab();
                    await userEvent.keyboard("{Enter}"); // Open the dropdown
                    await userEvent.keyboard("{Escape}"); // Close the dropdown

                    // Assert
                    expect(await screen.findByRole("combobox")).toHaveAttribute(
                        "aria-invalid",
                        "true",
                    );
                });
            });

            describe("initial render", () => {
                it("should not call onValidate if there is no selected value on the initial render", () => {
                    // Arrange
                    const requiredMessage = "Required field";
                    const onValidate = jest.fn();
                    // Act
                    doRender(
                        <ControlledSingleSelect
                            onValidate={onValidate}
                            required={requiredMessage}
                        />,
                    );

                    // Assert
                    expect(onValidate).not.toHaveBeenCalled();
                });
                it("should call onValidate with null if there is a selected value on the initial render", () => {
                    // Arrange
                    const requiredMessage = "Required field";
                    const onValidate = jest.fn();

                    // Act
                    doRender(
                        <ControlledSingleSelect
                            onValidate={onValidate}
                            required={requiredMessage}
                            selectedValue={"1"}
                        />,
                    );

                    // Assert
                    // onValidate is called with null because required validation
                    // is triggered and clears any errors
                    expect(onValidate).toHaveBeenCalledExactlyOnceWith(null);
                });
            });

            describe("picking a value after there was an error", () => {
                it("should still be in an error state before a value is picked", async () => {
                    // Arrange
                    const requiredMessage = "Required field";
                    const {userEvent} = doRender(
                        <ControlledSingleSelect required={requiredMessage} />,
                    );
                    await userEvent.tab();
                    await userEvent.tab(); // Tab through the select to trigger error

                    // Act
                    await userEvent.click(await screen.findByRole("combobox")); // Open the dropdown

                    // Assert
                    expect(await screen.findByRole("combobox")).toHaveAttribute(
                        "aria-invalid",
                        "true",
                    );
                });

                it("should not be in an error state once a value is picked", async () => {
                    // Arrange
                    const requiredMessage = "Required field";
                    const {userEvent} = doRender(
                        <ControlledSingleSelect required={requiredMessage} />,
                    );
                    await userEvent.tab();
                    await userEvent.tab(); // Tab through the select to trigger error
                    await userEvent.click(await screen.findByRole("combobox")); // Open the dropdown

                    // Act
                    await userEvent.click(await screen.findByText("item 1")); // Pick a value

                    // Assert
                    expect(await screen.findByRole("combobox")).toHaveAttribute(
                        "aria-invalid",
                        "false",
                    );
                });
            });

            it("should use the default required error message if required is set to true", async () => {
                // Arrange
                const onValidate = jest.fn();
                const {userEvent} = doRender(
                    <ControlledSingleSelect
                        onValidate={onValidate}
                        required={true}
                    />,
                );

                // Act
                await userEvent.tab();
                await userEvent.tab();

                // Assert
                expect(onValidate).toHaveBeenCalledExactlyOnceWith(
                    "This field is required.",
                );
            });
        });
    });
});
