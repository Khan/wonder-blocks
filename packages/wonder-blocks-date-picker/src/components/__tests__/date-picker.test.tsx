import * as React from "react";
import {describe, it} from "@jest/globals";
import {render, screen, waitFor, within} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as DateMock from "jest-date-mock";
import {Temporal} from "temporal-polyfill";
import {enUS, es, fr, de} from "date-fns/locale";

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

    it("opens the date picker if Enter is pressed when closed", async () => {
        // Arrange
        render(<DatePicker updateDate={() => {}} />);
        await userEvent.tab(); // Focus opens overlay
        await userEvent.keyboard("{Escape}"); // Close it

        // Act
        await userEvent.keyboard("{Enter}");

        // Assert
        expect(screen.getByTestId("focus-sentinel-prev")).toBeInTheDocument();
    });

    it("closes the date picker if Enter is pressed when open", async () => {
        // Arrange
        render(<DatePicker updateDate={() => {}} />);
        await userEvent.tab(); // Focus opens overlay

        // Act
        await userEvent.keyboard("{Enter}");

        // Assert
        expect(
            screen.queryByTestId("focus-sentinel-prev"),
        ).not.toBeInTheDocument();
    });

    it("opens the date picker if down arrow is pressed when closed", async () => {
        // Arrange
        render(<DatePicker updateDate={() => {}} />);
        await userEvent.tab(); // Focus opens overlay
        await userEvent.keyboard("{Escape}"); // Close it

        // Act
        await userEvent.keyboard("{ArrowDown}");

        // Assert
        expect(screen.getByTestId("focus-sentinel-prev")).toBeInTheDocument();
    });

    it("does not close overlay on Enter if closeOnSelect is false", async () => {
        // Arrange
        render(<DatePicker updateDate={() => {}} closeOnSelect={false} />);
        await userEvent.tab();

        // Act
        await userEvent.type(screen.getByRole("textbox"), "{Enter}");

        // Assert
        expect(screen.getByTestId("focus-sentinel-prev")).toBeInTheDocument();
    });

    it("allows keyboard users to select a date using Tab and Enter", async () => {
        // Arrange
        const selectedDate = Temporal.PlainDate.from("2021-05-07");
        const updateDateMock = jest.fn();
        const dateFormat = "YYYY-MM-DD";

        render(
            <DatePicker
                selectedDate={selectedDate}
                updateDate={updateDateMock}
                dateFormat={dateFormat}
            />,
        );

        // Act - Tab to input, then Tab to reach a day button and press Enter
        await userEvent.tab(); // Focus input, opens overlay
        screen.getByRole("textbox");
        // Tab through calendar to a different date button
        await userEvent.tab();
        await userEvent.tab();
        await userEvent.tab();
        await userEvent.keyboard("{Enter}");

        // Assert - updateDate should be called
        await waitFor(() => {
            expect(updateDateMock).toHaveBeenCalled();
        });
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
        expect(
            screen.getByRole("button", {
                name: "Monday, May 10th, 2021, selected",
            }),
        ).toBeInTheDocument();
    });

    it("accepts unpadded date input for MM/DD/YYYY format", async () => {
        // Arrange
        const selectedDate = Temporal.PlainDate.from("2026-01-16");
        const updateDateMock = jest.fn();

        render(
            <DatePicker
                selectedDate={selectedDate}
                updateDate={updateDateMock}
                dateFormat="MM/DD/YYYY"
            />,
        );

        // Act
        await userEvent.tab();
        const input = screen.getByRole("textbox");
        await userEvent.clear(input);
        await userEvent.type(input, "1/30/2026");

        // Assert - updateDate should be called with the new date
        await waitFor(() => {
            expect(updateDateMock).toHaveBeenCalledWith(
                expect.objectContaining({
                    year: 2026,
                    month: 1,
                    day: 30,
                }),
            );
        });
    });

    it("preserves partial input while editing date", async () => {
        // Arrange
        const selectedDate = Temporal.PlainDate.from("2026-01-16");
        const updateDateMock = jest.fn();

        render(
            <DatePicker
                selectedDate={selectedDate}
                updateDate={updateDateMock}
            />,
        );

        // Act - Select and delete the day portion "16" to replace it
        await userEvent.tab();
        const input = screen.getByRole("textbox");
        await userEvent.clear(input);
        await userEvent.type(input, "1/");

        // Assert - Input should preserve partial value, not clear completely
        expect(input).toHaveValue("1/");
    });

    it.each([
        {
            testInput: "1/5/2026",
            desc: "out-of-range date",
            selectedDate: Temporal.PlainDate.from("2026-01-16"),
            minDate: Temporal.PlainDate.from("2026-01-10"),
            maxDate: undefined,
            expected: "1/16/2026",
        },
        {
            testInput: "invalid date",
            desc: "malformed text",
            selectedDate: Temporal.PlainDate.from("2026-01-16"),
            minDate: undefined,
            maxDate: undefined,
            expected: "1/16/2026",
        },
        {
            testInput: "1/20/2026",
            desc: "editing to out-of-range",
            selectedDate: Temporal.PlainDate.from("2026-01-28"),
            minDate: Temporal.PlainDate.from("2026-01-25"),
            maxDate: Temporal.PlainDate.from("2026-01-31"),
            expected: "1/28/2026",
        },
    ])(
        "reverts $desc by default on blur",
        async ({testInput, selectedDate, minDate, maxDate, expected}) => {
            render(
                <>
                    <DatePicker
                        selectedDate={selectedDate}
                        updateDate={jest.fn()}
                        minDate={minDate}
                        maxDate={maxDate}
                    />
                    <button>Other element</button>
                </>,
            );
            await userEvent.tab();
            const input = screen.getByRole("textbox");
            await userEvent.clear(input);
            await userEvent.type(input, testInput);
            await userEvent.keyboard("{Escape}{Tab}");
            await waitFor(() => {
                expect(input).toHaveValue(expected);
            });
        },
    );

    it.each([
        {
            testInput: "invalid date",
            expectedValue: "invalid date",
            desc: "malformed text",
            minDate: undefined,
            expectedCall: null,
        },
        {
            testInput: "1/5/2026",
            expectedValue: "1/5/2026",
            desc: "out-of-range date",
            minDate: Temporal.PlainDate.from("2026-01-10"),
            expectedCall: expect.objectContaining({
                year: 2026,
                month: 1,
                day: 5,
            }),
        },
    ])(
        "keeps $desc with keepInvalidText prop",
        async ({testInput, expectedValue, minDate, expectedCall}) => {
            const updateDateMock = jest.fn();
            render(
                <>
                    <DatePicker
                        selectedDate={Temporal.PlainDate.from("2026-01-16")}
                        updateDate={updateDateMock}
                        minDate={minDate}
                        keepInvalidText
                    />
                    <button>Other element</button>
                </>,
            );

            await userEvent.tab();
            const input = screen.getByRole("textbox");
            await userEvent.clear(input);
            await userEvent.type(input, testInput);
            await userEvent.keyboard("{Escape}");
            await userEvent.tab();

            await waitFor(() => {
                expect(input).toHaveValue(expectedValue);
            });
            expect(updateDateMock).toHaveBeenLastCalledWith(expectedCall);
        },
    );

    it.each([{keepInvalidText: false}, {keepInvalidText: true}])(
        "clicking calendar clears invalid text (keepInvalidText=$keepInvalidText)",
        async ({keepInvalidText}) => {
            render(
                <DatePicker
                    selectedDate={Temporal.PlainDate.from("2026-01-16")}
                    updateDate={jest.fn()}
                    keepInvalidText={keepInvalidText}
                />,
            );
            const input = screen.getByRole("textbox");
            await userEvent.clear(input);
            await userEvent.type(input, "asdf");
            await userEvent.click(input);
            await userEvent.click(await screen.findByText("20"));
            await waitFor(() => {
                expect(input).toHaveValue("1/20/2026");
            });
        },
    );
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

    it("uses custom aria-label when inputAriaLabel prop is provided", async () => {
        // Arrange
        render(
            <DatePicker
                updateDate={() => {}}
                inputAriaLabel="Choose or enter a date"
            />,
        );

        // Act
        const input = screen.getByRole("textbox");

        // Assert
        expect(input).toHaveAttribute("aria-label", "Choose or enter a date");
    });

    it("respects dir attribute from ancestor", async () => {
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

        describe("dateFormat prop", () => {
            it.each([
                {
                    format: undefined,
                    locale: undefined,
                    expected: "1/16/2026",
                    desc: "defaults to locale-aware",
                },
                {
                    format: undefined,
                    locale: de,
                    expected: "16.1.2026",
                    desc: "locale-aware for de-DE",
                },
                {
                    format: "MMMM D, YYYY",
                    locale: undefined,
                    expected: "January 16, 2026",
                    desc: "MMMM D, YYYY",
                },
                {
                    format: "MM/DD/YYYY",
                    locale: undefined,
                    expected: "01/16/2026",
                    desc: "MM/DD/YYYY",
                },
                {
                    format: "YYYY-MM-DD",
                    locale: undefined,
                    expected: "2026-01-16",
                    desc: "YYYY-MM-DD",
                },
            ])("formats date: $desc", ({format, locale, expected}) => {
                render(
                    <DatePicker
                        selectedDate={Temporal.PlainDate.from("2026-01-16")}
                        updateDate={() => {}}
                        dateFormat={format}
                        locale={locale}
                    />,
                );
                const input = screen.getByRole("textbox");
                if (expected.includes(".")) {
                    expect(input).toHaveValue(expected);
                } else {
                    expect(
                        screen.getByDisplayValue(expected),
                    ).toBeInTheDocument();
                }
            });
        });

        describe("Localized text formats", () => {
            it.each([
                {locale: es, expected: "enero 16, 2026", name: "Spanish"},
                {locale: fr, expected: "janvier 16, 2026", name: "French"},
            ])("displays $name text date", ({locale, expected}) => {
                render(
                    <DatePicker
                        selectedDate={Temporal.PlainDate.from("2026-01-16")}
                        updateDate={() => {}}
                        dateFormat="MMMM D, YYYY"
                        locale={locale}
                    />,
                );
                expect(screen.getByDisplayValue(expected)).toBeInTheDocument();
            });
            it("updates input to Spanish text format when date is selected from calendar", async () => {
                // Arrange
                const selectedDate = Temporal.PlainDate.from("2026-01-05");
                const updateDateMock = jest.fn();
                render(
                    <DatePicker
                        selectedDate={selectedDate}
                        updateDate={updateDateMock}
                        dateFormat="MMMM D, YYYY"
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
        describe("Localized numeric formats", () => {
            it("displays Spanish numeric date in DD/MM/YYYY format", () => {
                // Arrange
                const selectedDate = Temporal.PlainDate.from("2026-01-16");
                // Act
                render(
                    <DatePicker
                        selectedDate={selectedDate}
                        updateDate={() => {}}
                        dateFormat="DD/MM/YYYY"
                        locale={es}
                    />,
                );
                // Assert
                expect(
                    screen.getByDisplayValue("01/16/2026"),
                ).toBeInTheDocument();
            });
            it("updates input when date is selected from Spanish calendar", async () => {
                // Arrange
                const selectedDate = Temporal.PlainDate.from("2026-01-05");
                const updateDateMock = jest.fn();
                render(
                    <DatePicker
                        selectedDate={selectedDate}
                        updateDate={updateDateMock}
                        dateFormat="DD/MM/YYYY"
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
        describe("LL format (locale-aware long date)", () => {
            it.each([
                {
                    locale: undefined,
                    expected: /January\s+16,?\s+2026/,
                    name: "English",
                },
                {
                    locale: es,
                    expected: /16\s+de\s+enero\s+de\s+2026/,
                    name: "Spanish",
                },
            ])("displays LL format in $name", ({locale, expected}) => {
                render(
                    <DatePicker
                        selectedDate={Temporal.PlainDate.from("2026-01-16")}
                        updateDate={() => {}}
                        dateFormat="LL"
                        locale={locale}
                    />,
                );
                expect(screen.getByRole("textbox")).toHaveDisplayValue(
                    expected,
                );
            });
            it("parses edited LL format text in English", async () => {
                // Arrange
                const updateDateMock = jest.fn();
                render(
                    <DatePicker
                        selectedDate={Temporal.PlainDate.from("2026-01-16")}
                        updateDate={updateDateMock}
                        dateFormat="LL"
                    />,
                );
                // Act
                const input = screen.getByRole("textbox");
                await userEvent.clear(input);
                await userEvent.type(input, "January 20, 2026");
                // Assert
                expect(updateDateMock).toHaveBeenLastCalledWith(
                    expect.objectContaining({
                        year: 2026,
                        month: 1,
                        day: 20,
                    }),
                );
            });
            it("parses edited LL format text in Spanish", async () => {
                // Arrange
                const updateDateMock = jest.fn();
                render(
                    <DatePicker
                        selectedDate={Temporal.PlainDate.from("2026-01-16")}
                        updateDate={updateDateMock}
                        dateFormat="LL"
                        locale={es}
                    />,
                );
                // Act
                const input = screen.getByRole("textbox");
                await userEvent.clear(input);
                await userEvent.type(input, "20 de enero de 2026");
                // Assert
                expect(updateDateMock).toHaveBeenLastCalledWith(
                    expect.objectContaining({
                        year: 2026,
                        month: 1,
                        day: 20,
                    }),
                );
            });
        });
    });
});
