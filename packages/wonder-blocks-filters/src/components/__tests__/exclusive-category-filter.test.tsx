import * as React from "react";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {PropsFor} from "@khanacademy/wonder-blocks-core";
import {
    ExclusiveCategoryFilter,
    ExclusiveCategoryFilterOption,
} from "../exclusive-category-filter";

describe("ExclusiveCategoryFilter", () => {
    const options: ReadonlyArray<ExclusiveCategoryFilterOption> = [
        {value: "all", label: "All"},
        {value: "math", label: "Math"},
        {value: "science", label: "Science"},
    ];

    const ControlledFilter = (
        props: Omit<
            PropsFor<typeof ExclusiveCategoryFilter>,
            "onChange" | "label" | "options"
        > & {onChange?: (value: string) => unknown},
    ) => {
        const [selectedValue, setSelectedValue] = React.useState(
            props.selectedValue,
        );

        return (
            <ExclusiveCategoryFilter
                {...props}
                label="Filter by subject"
                options={options}
                selectedValue={selectedValue}
                onChange={(value) => {
                    setSelectedValue(value);
                    props.onChange?.(value);
                }}
            />
        );
    };

    describe("Semantics", () => {
        it("should render a radio group named by the visible label", async () => {
            // Arrange
            render(<ControlledFilter selectedValue="all" />);

            // Act
            const radiogroup = await screen.findByRole("radiogroup", {
                name: "Filter by subject",
            });

            // Assert
            expect(radiogroup).toBeInTheDocument();
        });

        it("should show the label", async () => {
            // Arrange
            render(<ControlledFilter selectedValue="all" />);

            // Act
            const label = await screen.findByText("Filter by subject");

            // Assert
            expect(label).toBeVisible();
        });

        it("should render a radio for each option", async () => {
            // Arrange
            render(<ControlledFilter selectedValue="all" />);

            // Act
            const radios = await screen.findAllByRole("radio");

            // Assert
            expect(radios).toHaveLength(options.length);
        });

        it("should check the selected option", async () => {
            // Arrange
            render(<ControlledFilter selectedValue="math" />);

            // Act
            const radio = await screen.findByRole("radio", {name: "Math"});

            // Assert
            expect(radio).toBeChecked();
        });

        it("should only check one option", async () => {
            // Arrange
            render(<ControlledFilter selectedValue="math" />);

            // Act
            const checkedRadios = (await screen.findAllByRole("radio")).filter(
                (radio) => radio.getAttribute("aria-checked") === "true",
            );

            // Assert
            expect(checkedRadios).toHaveLength(1);
        });

        it("should render nothing when there are no options", () => {
            // Arrange
            const {container} = render(
                <ExclusiveCategoryFilter
                    label="Filter by subject"
                    options={[]}
                    selectedValue="all"
                    onChange={jest.fn()}
                />,
            );

            // Act
            const content = container.innerHTML;

            // Assert
            expect(content).toBe("");
        });
    });

    describe("Ids and test ids", () => {
        it("should use the id for the root", async () => {
            // Arrange
            render(
                <ControlledFilter
                    id="filter"
                    testId="filter-root"
                    selectedValue="all"
                />,
            );

            // Act
            const root = await screen.findByTestId("filter-root");

            // Assert
            expect(root).toHaveAttribute("id", "filter");
        });

        it("should base the option ids on the id", async () => {
            // Arrange
            render(<ControlledFilter id="filter" selectedValue="all" />);

            // Act
            const radio = await screen.findByRole("radio", {name: "Math"});

            // Assert
            expect(radio).toHaveAttribute("id", "filter-option-1");
        });

        it("should base the option test ids on the testId", async () => {
            // Arrange
            render(<ControlledFilter testId="filter" selectedValue="all" />);

            // Act
            const radio = await screen.findByTestId("filter-math");

            // Assert
            expect(radio).toHaveAccessibleName("Math");
        });

        it("should use the option's own testId when set", async () => {
            // Arrange
            render(
                <ExclusiveCategoryFilter
                    testId="filter"
                    label="Filter by subject"
                    options={[
                        {value: "all", label: "All", testId: "custom-all"},
                        {value: "math", label: "Math"},
                    ]}
                    selectedValue="all"
                    onChange={jest.fn()}
                />,
            );

            // Act
            const radio = await screen.findByTestId("custom-all");

            // Assert
            expect(radio).toHaveAccessibleName("All");
        });
    });

    describe("Tab order", () => {
        it("should focus the selected option when tabbing into the group", async () => {
            // Arrange
            render(<ControlledFilter selectedValue="math" />);

            // Act
            await userEvent.tab();

            // Assert
            expect(
                await screen.findByRole("radio", {name: "Math"}),
            ).toHaveFocus();
        });

        it("should have a single tab stop", async () => {
            // Arrange
            render(
                <>
                    <ControlledFilter selectedValue="math" />
                    <button>After</button>
                </>,
            );
            await userEvent.tab();

            // Act
            await userEvent.tab();

            // Assert
            expect(
                await screen.findByRole("button", {name: "After"}),
            ).toHaveFocus();
        });

        it("should make the first option the tab stop when selectedValue matches no option", async () => {
            // Arrange
            render(<ControlledFilter selectedValue="unknown" />);

            // Act
            await userEvent.tab();

            // Assert
            expect(
                await screen.findByRole("radio", {name: "All"}),
            ).toHaveFocus();
        });

        it("should select the first option when selectedValue matches no option", async () => {
            // Arrange
            render(<ControlledFilter selectedValue="unknown" />);

            // Act
            const radio = await screen.findByRole("radio", {name: "All"});

            // Assert
            expect(radio).toBeChecked();
        });

        it("should call onChange when the first option is clicked and selectedValue matches no option", async () => {
            // Arrange
            const onChange = jest.fn();
            render(
                <ControlledFilter
                    selectedValue="unknown"
                    onChange={onChange}
                />,
            );

            // Act
            await userEvent.click(
                await screen.findByRole("radio", {name: "All"}),
            );

            // Assert
            expect(onChange).toHaveBeenCalledExactlyOnceWith("all");
        });

        it("should not call onChange when selectedValue matches no option", async () => {
            // Arrange
            const onChange = jest.fn();

            // Act
            render(
                <ControlledFilter
                    selectedValue="unknown"
                    onChange={onChange}
                />,
            );

            // Assert
            expect(onChange).not.toHaveBeenCalled();
        });
    });

    describe("Mouse interactions", () => {
        it("should call onChange with the clicked option's value", async () => {
            // Arrange
            const onChange = jest.fn();
            render(
                <ControlledFilter selectedValue="all" onChange={onChange} />,
            );

            // Act
            await userEvent.click(
                await screen.findByRole("radio", {name: "Science"}),
            );

            // Assert
            expect(onChange).toHaveBeenCalledExactlyOnceWith("science");
        });

        it("should not call onChange when the selected option is clicked", async () => {
            // Arrange
            const onChange = jest.fn();
            render(
                <ControlledFilter selectedValue="all" onChange={onChange} />,
            );

            // Act
            await userEvent.click(
                await screen.findByRole("radio", {name: "All"}),
            );

            // Assert
            expect(onChange).not.toHaveBeenCalled();
        });

        it("should keep the selected option checked when it is clicked again", async () => {
            // Arrange
            render(<ControlledFilter selectedValue="all" />);
            const radio = await screen.findByRole("radio", {name: "All"});

            // Act
            await userEvent.click(radio);

            // Assert
            expect(radio).toBeChecked();
        });

        it("should focus the clicked option", async () => {
            // Arrange
            render(<ControlledFilter selectedValue="all" />);
            const radio = await screen.findByRole("radio", {name: "Science"});

            // Act
            await userEvent.click(radio);

            // Assert
            expect(radio).toHaveFocus();
        });
    });

    describe("Keyboard interactions", () => {
        it.each([
            {key: "{ArrowRight}", expected: "Math"},
            {key: "{ArrowDown}", expected: "Math"},
            {key: "{ArrowLeft}", expected: "Science"},
            {key: "{ArrowUp}", expected: "Science"},
        ])(
            "should focus $expected when pressing $key from the first option",
            async ({key, expected}) => {
                // Arrange
                render(<ControlledFilter selectedValue="all" />);
                await userEvent.tab();

                // Act
                await userEvent.keyboard(key);

                // Assert
                expect(
                    await screen.findByRole("radio", {name: expected}),
                ).toHaveFocus();
            },
        );

        it.each([
            {key: "{ArrowRight}", expected: "math"},
            {key: "{ArrowDown}", expected: "math"},
            {key: "{ArrowLeft}", expected: "science"},
            {key: "{ArrowUp}", expected: "science"},
        ])(
            "should call onChange with $expected when pressing $key from the first option",
            async ({key, expected}) => {
                // Arrange
                const onChange = jest.fn();
                render(
                    <ControlledFilter
                        selectedValue="all"
                        onChange={onChange}
                    />,
                );
                await userEvent.tab();

                // Act
                await userEvent.keyboard(key);

                // Assert
                expect(onChange).toHaveBeenCalledExactlyOnceWith(expected);
            },
        );

        it("should wrap from the last option to the first", async () => {
            // Arrange
            render(<ControlledFilter selectedValue="science" />);
            await userEvent.tab();

            // Act
            await userEvent.keyboard("{ArrowRight}");

            // Assert
            expect(
                await screen.findByRole("radio", {name: "All"}),
            ).toBeChecked();
        });

        it("should move selection with repeated arrow presses", async () => {
            // Arrange
            render(<ControlledFilter selectedValue="all" />);
            await userEvent.tab();

            // Act
            await userEvent.keyboard("{ArrowRight}{ArrowRight}");

            // Assert
            expect(
                await screen.findByRole("radio", {name: "Science"}),
            ).toBeChecked();
        });

        it.each([
            {key: "{ArrowRight}", expected: "Science"},
            {key: "{ArrowLeft}", expected: "Math"},
        ])(
            "should focus $expected when pressing $key in RTL",
            async ({key, expected}) => {
                // Arrange
                render(
                    <div dir="rtl">
                        <ControlledFilter selectedValue="all" />
                    </div>,
                );
                await userEvent.tab();

                // Act
                await userEvent.keyboard(key);

                // Assert
                expect(
                    await screen.findByRole("radio", {name: expected}),
                ).toHaveFocus();
            },
        );

        it("should use the nearest dir attribute for arrow key direction", async () => {
            // Arrange
            render(
                <div dir="rtl">
                    <div dir="ltr">
                        <ControlledFilter selectedValue="all" />
                    </div>
                </div>,
            );
            await userEvent.tab();

            // Act
            await userEvent.keyboard("{ArrowRight}");

            // Assert
            expect(
                await screen.findByRole("radio", {name: "Math"}),
            ).toHaveFocus();
        });

        it.each(["{Enter}", " ", "{Home}", "{End}"])(
            "should not call onChange when pressing %s",
            async (key) => {
                // Arrange
                const onChange = jest.fn();
                render(
                    <ControlledFilter
                        selectedValue="all"
                        onChange={onChange}
                    />,
                );
                await userEvent.tab();

                // Act
                await userEvent.keyboard(key);

                // Assert
                expect(onChange).not.toHaveBeenCalled();
            },
        );
    });
});
