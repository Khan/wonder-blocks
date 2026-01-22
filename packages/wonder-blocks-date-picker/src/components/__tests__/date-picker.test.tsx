import * as React from "react";
import {describe, it} from "@jest/globals";
import {render, screen, waitFor, within} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as DateMock from "jest-date-mock";
import {Temporal} from "temporal-polyfill";
import {enUS, es, fr} from "date-fns/locale";

import Button from "@khanacademy/wonder-blocks-button";
import {DatePicker} from "@khanacademy/wonder-blocks-date-picker";

describe("DatePicker", () => {
    beforeEach(() => {
        // Mock getBoundingClientRect to provide realistic dimensions
        // This prevents Popper from thinking elements are out of bounds
        Element.prototype.getBoundingClientRect = jest.fn(() => ({
            width: 300,
            height: 50,
            top: 100,
            left: 100,
            bottom: 150,
            right: 400,
            x: 100,
            y: 100,
            toJSON: () => {},
        }));
    });

    it("hides the date picker overlay by default", () => {
        // Arrange

        // Act
        render(<DatePicker updateDate={() => {}} />);

        // Assert
        expect(
            screen.queryByTestId("focus-sentinel-prev"),
        ).not.toBeInTheDocument();
    });

    it("shows the date picker overlay if the input is clicked", async () => {
        // Arrange
        render(<DatePicker updateDate={() => {}} />);

        // Act
        await userEvent.click(screen.getByRole("textbox"));

        // Assert
        expect(screen.getByTestId("focus-sentinel-prev")).toBeInTheDocument();
    });

    it("does not show the date picker overlay if disabled", async () => {
        // Arrange
        render(<DatePicker disabled updateDate={() => {}} />);

        // Act
        await userEvent.click(screen.getByRole("textbox"));

        // Assert
        expect(
            screen.queryByTestId("focus-sentinel-prev"),
        ).not.toBeInTheDocument();
    });

    it("shows the date picker overlay if the input is focused", async () => {
        // Arrange
        render(<DatePicker updateDate={() => {}} />);

        // Act
        await userEvent.tab();

        // Assert
        expect(screen.getByTestId("focus-sentinel-prev")).toBeInTheDocument();
    });

    it("shows the calendar grid when input is focused", async () => {
        // Arrange
        render(<DatePicker updateDate={() => {}} />);

        // Act
        await userEvent.tab();

        // Assert
        await expect(screen.getByRole("grid")).toBeVisible();
    });

    it("includes a footer if set", async () => {
        // Arrange
        render(
            <DatePicker
                updateDate={() => {}}
                footer={({close}) => (
                    <Button onClick={close}>Footer Button</Button>
                )}
            />,
        );

        // Act
        // We need first to focus on the input so we can display the picker.
        await userEvent.tab();

        // Assert
        expect(
            screen.getByRole("button", {name: /footer button/i}),
        ).toBeInTheDocument();
    });

    it("allows closing the date picker from within the footer", async () => {
        // Arrange
        render(
            <DatePicker
                updateDate={() => {}}
                footer={({close}) => (
                    <Button onClick={close}>Footer Button</Button>
                )}
            />,
        );

        // We need first to focus on the input so we can display the picker.
        await userEvent.tab();

        await userEvent.click(
            screen.getByRole("button", {name: /footer button/i}),
        );

        // Assert
        await waitFor(() => {
            expect(screen.queryByRole("grid")).not.toBeInTheDocument();
        });
    });

    it("closes the date picker if ESC is pressed", async () => {
        // Arrange
        render(<DatePicker updateDate={() => {}} />);

        // We need first to focus on the input so we can display the picker.
        await userEvent.tab();

        // Act
        await userEvent.type(screen.getByRole("textbox"), "{Esc}");

        // Assert
        expect(
            screen.queryByTestId("focus-sentinel-prev"),
        ).not.toBeInTheDocument();
    });

    it("closes the date picker if the input is blurred", async () => {
        // Arrange
        render(<DatePicker updateDate={() => {}} />);
        const input = screen.getByRole("textbox");
        await userEvent.click(input);

        // Act
        await userEvent.click(document.body);

        // Assert
        expect(
            screen.queryByTestId("focus-sentinel-prev"),
        ).not.toBeInTheDocument();
    });

    it("closes the date picker if we click outside the container", async () => {
        // Arrange
        render(<DatePicker updateDate={() => {}} />);
        await userEvent.tab();

        // Act
        await userEvent.click(document.body);

        // Assert
        await waitFor(() => {
            expect(
                screen.queryByTestId("focus-sentinel-prev"),
            ).not.toBeInTheDocument();
        });
    });

    it("closes the date picker if a date is selected", async () => {
        // Arrange
        const today = new Date("2023-05-10T09:30:00");
        // Allows opening the calendar on a specific date.
        // NOTE: This happens because the Calendar component uses the current
        // date to open the calendar by default (in case there's no initial
        // selectedDate set).
        DateMock.advanceTo(today);

        const minDate = Temporal.PlainDate.from("2023-05-07");
        const maxDate = Temporal.PlainDate.from("2023-05-22");
        const updateDateMock = jest.fn();

        render(
            <DatePicker
                minDate={minDate}
                maxDate={maxDate}
                updateDate={updateDateMock}
            />,
        );

        // We need first to focus on the input so we can display the picker.
        await userEvent.tab();

        // Act
        // Select a date
        await userEvent.click(screen.getByText("15"));

        // Assert
        await waitFor(() => {
            expect(screen.queryByRole("grid")).not.toBeInTheDocument();
        });
    });

    it("does not close the date picker if a date is selected and closeOnSelect is set false", async () => {
        // Arrange
        const today = new Date("2023-05-10T09:30:00");
        // Allows opening the calendar on a specific date.
        // NOTE: This happens because the Calendar component uses the current
        // date to open the calendar by default (in case there's no initial
        // selectedDate set).
        DateMock.advanceTo(today);

        const minDate = Temporal.PlainDate.from("2023-05-07");
        const maxDate = Temporal.PlainDate.from("2023-05-22");
        const updateDateMock = jest.fn();

        render(
            <DatePicker
                closeOnSelect={false}
                minDate={minDate}
                maxDate={maxDate}
                updateDate={updateDateMock}
            />,
        );

        // We need first to focus on the input so we can display the picker.
        await userEvent.tab();

        // Act
        // Select a date
        await userEvent.click(screen.getByText("15"));

        // Assert
        await expect(screen.getByRole("grid")).toBeInTheDocument();
    });

    it("changes the date in the input if we pick a date from the overlay", async () => {
        // Arrange
        const selectedDate = Temporal.PlainDate.from("2021-05-07");
        const updateDateMock = jest.fn();
        const dateFormat = "YYYY-MM-DD";

        const {container} = render(
            <DatePicker
                selectedDate={selectedDate}
                updateDate={updateDateMock}
                dateFormat={dateFormat}
            />,
        );

        // We need first to focus on the input so we can display the picker.
        await userEvent.tab();

        // Act
        // Calendar is in a portal, so use screen not within(container)
        await userEvent.click(screen.getByText("15"));

        // Assert
        // We'd want to ensure that the input is updated with the picker value.
        await waitFor(() => {
            const input = within(container).getByRole("textbox");
            expect(input).toHaveValue("2021-05-15");
        });
    });

    it("changes the date in the picker if we type in a valid date", async () => {
        // Arrange
        const minDate = Temporal.PlainDate.from("2021-05-05");
        const selectedDate = Temporal.PlainDate.from("2021-05-07");
        const maxDate = Temporal.PlainDate.from("2021-05-12");
        const updateDateMock = jest.fn();
        const dateFormat = "YYYY-MM-DD";

        render(
            <DatePicker
                selectedDate={selectedDate}
                updateDate={updateDateMock}
                dateFormat={dateFormat}
                minDate={minDate}
                maxDate={maxDate}
            />,
        );

        // We need first to focus on the input so we can display the picker.
        await userEvent.tab();

        const input = screen.getByRole("textbox");
        // Act
        await userEvent.clear(input);
        await userEvent.type(input, "2021-05-10");
        await userEvent.tab();

        // Assert
        const gridcell = screen.getByRole("gridcell", {selected: true});
        expect(
            within(gridcell).getByRole("button", {
                name: "Monday, May 10th, 2021, selected",
            }),
        ).toBeInTheDocument();
    });

    it("does not modify the current date if current input contains an invalid format", async () => {
        // Arrange
        const minDate = Temporal.PlainDate.from("2021-05-05");
        const selectedDate = Temporal.PlainDate.from("2021-05-07");
        const maxDate = Temporal.PlainDate.from("2021-05-12");
        const updateDateMock = jest.fn();
        const dateFormat = "YYYY-MM-DD";

        render(
            <DatePicker
                selectedDate={selectedDate}
                updateDate={updateDateMock}
                dateFormat={dateFormat}
                minDate={minDate}
                maxDate={maxDate}
            />,
        );

        // We need first to focus on the input so we can display the picker.
        await userEvent.tab();

        // Act
        await userEvent.clear(screen.getByRole("textbox"));
        await userEvent.type(screen.getByRole("textbox"), "2021-55-55");

        // Assert
        const gridcell = screen.getByRole("gridcell", {selected: true});
        expect(
            within(gridcell).getByRole("button", {
                name: "Friday, May 7th, 2021, selected",
            }),
        );
    });

    it("receives an accessible name from an outside label", async () => {
        // Arrange
        render(
            <label htmlFor="label-example">
                Rainier McCheddarton
                <DatePicker id="label-example" updateDate={() => {}} />
            </label>,
        );

        // Act
        const input = screen.getByRole("textbox");

        // Assert
        expect(input).toHaveAccessibleName("Rainier McCheddarton");
    });

    it("uses custom aria-label when inputAriaLabel prop is provided for start date", async () => {
        // Arrange
        render(
            <DatePicker
                updateDate={() => {}}
                inputAriaLabel="Choose or enter a start date"
            />,
        );

        // Act
        const input = screen.getByRole("textbox");

        // Assert
        expect(input).toHaveAttribute(
            "aria-label",
            "Choose or enter a start date",
        );
    });

    it("uses custom aria-label when inputAriaLabel prop is provided for end date", async () => {
        // Arrange
        render(
            <DatePicker
                updateDate={() => {}}
                inputAriaLabel="Choose or enter an end date"
            />,
        );

        // Act
        const input = screen.getByRole("textbox");

        // Assert
        expect(input).toHaveAttribute(
            "aria-label",
            "Choose or enter an end date",
        );
    });

    it("adds a dir attribute from an ancestor", async () => {
        // Arrange
        render(
            <div dir="rtl">
                <DatePicker updateDate={() => {}} />
            </div>,
        );
        await userEvent.click(screen.getByRole("textbox"));

        // Act
        const wrapper = screen.getByTestId("date-picker-overlay");
        const hasDirRtl = within(wrapper)
            .getAllByRole("generic")
            .some((div) => div.getAttribute("dir") === "rtl");

        // Assert
        expect(hasDirRtl).toBe(true);
    });

    it("adds uses dir=ltr by default", async () => {
        // Arrange
        render(<DatePicker updateDate={() => {}} />);
        await userEvent.click(screen.getByRole("textbox"));

        // Act
        const wrapper = screen.getByTestId("date-picker-overlay");
        const hasDirLTR = within(wrapper)
            .getAllByRole("generic")
            .some((div) => div.getAttribute("dir") === "ltr");

        // Assert
        expect(hasDirLTR).toBe(true);
    });

    it("navigates to next month when next button is clicked", async () => {
        // Arrange
        const selectedDate = Temporal.PlainDate.from("2021-05-15");
        render(
            <DatePicker
                selectedDate={selectedDate}
                updateDate={() => {}}
                dateFormat="MMMM D, YYYY"
            />,
        );
        await userEvent.click(screen.getByRole("textbox"));

        // Act
        const nextButton = screen.getByLabelText(/next month/i);
        await userEvent.click(nextButton);

        // Assert
        await waitFor(() => {
            expect(screen.getByText("June 2021")).toBeInTheDocument();
        });
    });

    it("navigates to previous month when previous button is clicked", async () => {
        // Arrange
        const selectedDate = Temporal.PlainDate.from("2021-05-15");
        render(
            <DatePicker
                selectedDate={selectedDate}
                updateDate={() => {}}
                dateFormat="MMMM D, YYYY"
            />,
        );
        await userEvent.click(screen.getByRole("textbox"));

        // Act
        const prevButton = screen.getByLabelText(/previous month/i);
        await userEvent.click(prevButton);

        // Assert
        await waitFor(() => {
            expect(screen.getByText("April 2021")).toBeInTheDocument();
        });
    });

    describe("Localization", () => {
        describe("locale prop accepts Locale object directly", () => {
            it("should display calendar when input is clicked", async () => {
                // Arrange
                const onUpdateDate = jest.fn();
                render(
                    <DatePicker
                        locale={enUS}
                        updateDate={onUpdateDate}
                        selectedDate={undefined}
                        dateFormat="MMMM D, YYYY"
                    />,
                );
                const input = screen.getByRole("textbox");

                // Act
                await userEvent.click(input);

                // Assert
                const calendar = await screen.findByRole("grid");
                expect(calendar).toBeInTheDocument();
            });

            it("should update calendar to show January 2021 when user types that date", async () => {
                // Arrange
                const onUpdateDate = jest.fn();
                render(
                    <DatePicker
                        locale={enUS}
                        updateDate={onUpdateDate}
                        selectedDate={undefined}
                        dateFormat="MMMM D, YYYY"
                    />,
                );
                const input = screen.getByRole("textbox");
                await userEvent.click(input);

                // Act
                await userEvent.type(input, "January 15, 2021");

                // Assert - Calendar should show January 2021
                await waitFor(() => {
                    const monthLabel = screen.getByText("January 2021");
                    expect(monthLabel).toBeInTheDocument();
                });
            });

            it("should update calendar month when selectedDate prop changes", async () => {
                // Arrange
                const onUpdateDate = jest.fn();
                const initialDate = Temporal.PlainDate.from("2026-01-15");
                const newDate = Temporal.PlainDate.from("2021-07-20");

                const {rerender} = render(
                    <DatePicker
                        locale={enUS}
                        updateDate={onUpdateDate}
                        selectedDate={initialDate}
                        dateFormat="MMMM D, YYYY"
                    />,
                );
                const input = screen.getByDisplayValue("January 15, 2026");
                await userEvent.click(input);

                // Act
                rerender(
                    <DatePicker
                        locale={enUS}
                        updateDate={onUpdateDate}
                        selectedDate={newDate}
                        dateFormat="MMMM D, YYYY"
                    />,
                );

                // Assert
                await waitFor(() => {
                    const monthLabel = screen.getByText("July 2021");
                    expect(monthLabel).toBeInTheDocument();
                });
            });

            it("should show December 2021 when opening calendar with that selected date", async () => {
                // Arrange
                const onUpdateDate = jest.fn();
                const selectedDate = Temporal.PlainDate.from("2021-12-25");

                render(
                    <DatePicker
                        locale={enUS}
                        updateDate={onUpdateDate}
                        selectedDate={selectedDate}
                        dateFormat="MMMM D, YYYY"
                    />,
                );
                const input = screen.getByDisplayValue("December 25, 2021");

                // Act
                await userEvent.click(input);

                // Assert
                const monthLabel = await screen.findByText("December 2021");
                expect(monthLabel).toBeInTheDocument();
            });
        });

        describe("dateFormat prop override", () => {
            it("displays date in MMMM D, YYYY format when dateFormat prop is set", () => {
                // Arrange
                const selectedDate = Temporal.PlainDate.from("2026-01-16");
                const dateFormat = "MMMM D, YYYY";

                // Act
                render(
                    <DatePicker
                        selectedDate={selectedDate}
                        updateDate={() => {}}
                        dateFormat={dateFormat}
                    />,
                );

                // Assert
                expect(
                    screen.getByDisplayValue("January 16, 2026"),
                ).toBeInTheDocument();
            });

            it("displays same date in MM/DD/YYYY format when dateFormat prop is changed", () => {
                // Arrange
                const selectedDate = Temporal.PlainDate.from("2026-01-16");
                const dateFormat = "MM/DD/YYYY";

                // Act
                render(
                    <DatePicker
                        selectedDate={selectedDate}
                        updateDate={() => {}}
                        dateFormat={dateFormat}
                    />,
                );

                // Assert
                expect(
                    screen.getByDisplayValue("01/16/2026"),
                ).toBeInTheDocument();
            });

            it("displays same date in MMM D, YYYY format when dateFormat prop is set to abbreviated", () => {
                // Arrange
                const selectedDate = Temporal.PlainDate.from("2026-01-16");
                const dateFormat = "MMM D, YYYY";

                // Act
                render(
                    <DatePicker
                        selectedDate={selectedDate}
                        updateDate={() => {}}
                        dateFormat={dateFormat}
                    />,
                );

                // Assert
                expect(
                    screen.getByDisplayValue("Jan 16, 2026"),
                ).toBeInTheDocument();
            });

            it("displays same date in ISO format when dateFormat prop is set to YYYY-MM-DD", () => {
                // Arrange
                const selectedDate = Temporal.PlainDate.from("2026-01-16");
                const dateFormat = "YYYY-MM-DD";

                // Act
                render(
                    <DatePicker
                        selectedDate={selectedDate}
                        updateDate={() => {}}
                        dateFormat={dateFormat}
                    />,
                );

                // Assert
                expect(
                    screen.getByDisplayValue("2026-01-16"),
                ).toBeInTheDocument();
            });
        });

        describe("MM/DD/YYYY format (English)", () => {
            it("displays English numeric date in MM/DD/YYYY format", () => {
                // Arrange
                const selectedDate = Temporal.PlainDate.from("2026-02-12");
                const dateFormat = "MM/DD/YYYY";

                // Act
                render(
                    <DatePicker
                        selectedDate={selectedDate}
                        updateDate={() => {}}
                        dateFormat={dateFormat}
                    />,
                );

                // Assert
                expect(
                    screen.getByDisplayValue("02/12/2026"),
                ).toBeInTheDocument();
            });

            it("displays another English numeric date in MM/DD/YYYY format", () => {
                // Arrange
                const selectedDate = Temporal.PlainDate.from("2026-01-22");
                const dateFormat = "MM/DD/YYYY";

                // Act
                render(
                    <DatePicker
                        selectedDate={selectedDate}
                        updateDate={() => {}}
                        dateFormat={dateFormat}
                    />,
                );

                // Assert
                expect(
                    screen.getByDisplayValue("01/22/2026"),
                ).toBeInTheDocument();
            });
        });

        describe("Text-based format (MMMM D, YYYY)", () => {
            it("displays English text date as January 16, 2026", () => {
                // Arrange
                const selectedDate = Temporal.PlainDate.from("2026-01-16");
                const dateFormat = "MMMM D, YYYY";

                // Act
                render(
                    <DatePicker
                        selectedDate={selectedDate}
                        updateDate={() => {}}
                        dateFormat={dateFormat}
                    />,
                );

                // Assert
                expect(
                    screen.getByDisplayValue("January 16, 2026"),
                ).toBeInTheDocument();
            });

            it("displays Spanish text date as enero 16, 2026", () => {
                // Arrange
                const selectedDate = Temporal.PlainDate.from("2026-01-16");
                const dateFormat = "MMMM D, YYYY";

                // Act
                render(
                    <DatePicker
                        selectedDate={selectedDate}
                        updateDate={() => {}}
                        dateFormat={dateFormat}
                        locale={es}
                    />,
                );

                // Assert
                expect(
                    screen.getByDisplayValue("enero 16, 2026"),
                ).toBeInTheDocument();
            });

            it("displays French text date as janvier 16, 2026", () => {
                // Arrange
                const selectedDate = Temporal.PlainDate.from("2026-01-16");
                const dateFormat = "MMMM D, YYYY";

                // Act
                render(
                    <DatePicker
                        selectedDate={selectedDate}
                        updateDate={() => {}}
                        dateFormat={dateFormat}
                        locale={fr}
                    />,
                );

                // Assert
                expect(
                    screen.getByDisplayValue("janvier 16, 2026"),
                ).toBeInTheDocument();
            });

            it("displays abbreviated Spanish month names with MMM format", () => {
                // Arrange
                const selectedDate = Temporal.PlainDate.from("2026-01-16");
                const dateFormat = "MMM D, YYYY";

                // Act
                render(
                    <DatePicker
                        selectedDate={selectedDate}
                        updateDate={() => {}}
                        dateFormat={dateFormat}
                        locale={es}
                    />,
                );

                // Assert
                expect(
                    screen.getByDisplayValue("ene 16, 2026"),
                ).toBeInTheDocument();
            });

            it("displays initial Spanish text date in input", () => {
                // Arrange
                const selectedDate = Temporal.PlainDate.from("2026-01-05");
                const dateFormat = "MMMM D, YYYY";

                // Act
                render(
                    <DatePicker
                        selectedDate={selectedDate}
                        updateDate={() => {}}
                        dateFormat={dateFormat}
                        locale={es}
                    />,
                );

                // Assert
                expect(screen.getByRole("textbox")).toHaveValue(
                    "enero 5, 2026",
                );
            });

            it("updates input to Spanish text format when date is selected from calendar", async () => {
                // Arrange
                const selectedDate = Temporal.PlainDate.from("2026-01-05");
                const updateDateMock = jest.fn();
                const dateFormat = "MMMM D, YYYY";

                render(
                    <DatePicker
                        selectedDate={selectedDate}
                        updateDate={updateDateMock}
                        dateFormat={dateFormat}
                        locale={es}
                    />,
                );
                const input = screen.getByRole("textbox");

                // Act
                await userEvent.click(input);
                await screen.findByTestId("date-picker-overlay");
                await userEvent.click(screen.getByText("15"));

                // Assert
                await waitFor(() => {
                    expect(input).toHaveValue("enero 15, 2026");
                });
            });
        });

        describe("Numeric formats (MM/DD/YYYY)", () => {
            it("displays Spanish numeric date as 01/22/2026", () => {
                // Arrange
                const selectedDate = Temporal.PlainDate.from("2026-01-22");
                const dateFormat = "DD/MM/YYYY";

                // Act
                render(
                    <DatePicker
                        selectedDate={selectedDate}
                        updateDate={() => {}}
                        dateFormat={dateFormat}
                        locale={es}
                    />,
                );

                // Assert
                expect(
                    screen.getByDisplayValue("01/22/2026"),
                ).toBeInTheDocument();
            });

            it("displays another Spanish date as 01/16/2026", () => {
                // Arrange
                const selectedDate = Temporal.PlainDate.from("2026-01-16");
                const dateFormat = "DD/MM/YYYY";

                // Act
                render(
                    <DatePicker
                        selectedDate={selectedDate}
                        updateDate={() => {}}
                        dateFormat={dateFormat}
                        locale={es}
                    />,
                );

                // Assert
                expect(
                    screen.getByDisplayValue("01/16/2026"),
                ).toBeInTheDocument();
            });

            it("displays French numeric date as 01/16/2026", () => {
                // Arrange
                const selectedDate = Temporal.PlainDate.from("2026-01-16");
                const dateFormat = "DD/MM/YYYY";

                // Act
                render(
                    <DatePicker
                        selectedDate={selectedDate}
                        updateDate={() => {}}
                        dateFormat={dateFormat}
                        locale={fr}
                    />,
                );

                // Assert
                expect(
                    screen.getByDisplayValue("01/16/2026"),
                ).toBeInTheDocument();
            });

            it("updates input to 01/15/2026 when date is selected from Spanish calendar", async () => {
                // Arrange
                const selectedDate = Temporal.PlainDate.from("2026-01-05");
                const updateDateMock = jest.fn();
                const dateFormat = "DD/MM/YYYY";

                render(
                    <DatePicker
                        selectedDate={selectedDate}
                        updateDate={updateDateMock}
                        dateFormat={dateFormat}
                        locale={es}
                    />,
                );

                // Act
                await userEvent.tab();
                await userEvent.click(screen.getByText("15"));

                // Assert
                expect(
                    screen.getByDisplayValue("01/15/2026"),
                ).toBeInTheDocument();
            });
        });
    });
});
