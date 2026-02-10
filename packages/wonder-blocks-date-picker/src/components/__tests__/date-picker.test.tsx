import * as React from "react";
import {describe, it} from "@jest/globals";
import {render, screen, waitFor, within} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as DateMock from "jest-date-mock";
import {Temporal} from "temporal-polyfill";
import {enUS, es, fr, de} from "date-fns/locale";

import Button from "@khanacademy/wonder-blocks-button";
import {DatePicker} from "@khanacademy/wonder-blocks-date-picker";

const MAY15_2021 = Temporal.PlainDate.from("2021-05-15");
const defaultPickerProps = {
    selectedDate: MAY15_2021,
    updateDate: () => {},
    dateFormat: "MMMM D, YYYY",
};

function renderPicker(props = {}) {
    return render(<DatePicker {...defaultPickerProps} {...props} />);
}

function expectOverlayVisible() {
    expect(screen.getByTestId("focus-sentinel-prev")).toBeInTheDocument();
}
function expectOverlayHidden() {
    expect(screen.queryByTestId("focus-sentinel-prev")).not.toBeInTheDocument();
}

describe("DatePicker", () => {
    beforeEach(() => {
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
        expectOverlayHidden();
    });

    it("shows the date picker overlay if the input is clicked", async () => {
        render(<DatePicker updateDate={() => {}} />);
        await userEvent.click(screen.getByRole("textbox"));
        expectOverlayVisible();
    });

    it("does not show the date picker overlay if disabled", async () => {
        render(<DatePicker disabled updateDate={() => {}} />);
        await userEvent.click(screen.getByRole("textbox"));
        expectOverlayHidden();
    });

    it("shows the date picker overlay if the input is focused", async () => {
        render(<DatePicker updateDate={() => {}} />);
        await userEvent.tab();
        expectOverlayVisible();
    });

    it("shows the calendar grid when input is focused", async () => {
        render(<DatePicker updateDate={() => {}} />);
        await userEvent.tab();
        await expect(screen.getByRole("grid")).toBeVisible();
    });

    it("includes a footer if set", async () => {
        render(
            <DatePicker
                updateDate={() => {}}
                footer={({close}) => (
                    <Button onClick={close}>Footer Button</Button>
                )}
            />,
        );
        await userEvent.tab();
        expect(
            screen.getByRole("button", {name: /footer button/i}),
        ).toBeInTheDocument();
    });

    it("allows closing the date picker from within the footer", async () => {
        render(
            <DatePicker
                updateDate={() => {}}
                footer={({close}) => (
                    <Button onClick={close}>Footer Button</Button>
                )}
            />,
        );
        await userEvent.tab();
        await userEvent.click(
            screen.getByRole("button", {name: /footer button/i}),
        );
        await waitFor(() =>
            expect(screen.queryByRole("grid")).not.toBeInTheDocument(),
        );
    });

    it("closes the date picker if ESC is pressed", async () => {
        render(<DatePicker updateDate={() => {}} />);
        await userEvent.tab();
        await userEvent.type(screen.getByRole("textbox"), "{Esc}");
        expectOverlayHidden();
    });

    it("returns focus to input after closing overlay with Escape", async () => {
        render(<DatePicker updateDate={() => {}} />);
        const input = screen.getByRole("textbox");
        await userEvent.tab();
        await userEvent.keyboard("{Escape}");
        await waitFor(() => expect(input).toHaveFocus());
    });

    it("does not reopen overlay when pressing Escape while closed", async () => {
        render(<DatePicker updateDate={() => {}} />);
        await userEvent.tab();
        await userEvent.keyboard("{Escape}");
        await waitFor(() => expectOverlayHidden());
        await userEvent.keyboard("{Escape}");
        expectOverlayHidden();
    });

    it("allows reopening overlay with ArrowDown after Escape", async () => {
        render(<DatePicker updateDate={() => {}} />);
        await userEvent.tab();
        await userEvent.keyboard("{Escape}");
        await waitFor(() => expectOverlayHidden());
        await userEvent.keyboard("{ArrowDown}");
        expectOverlayVisible();
    });

    it("opens the date picker if Enter is pressed when closed", async () => {
        render(<DatePicker updateDate={() => {}} />);
        await userEvent.tab();
        await userEvent.keyboard("{Escape}");
        await userEvent.keyboard("{Enter}");
        expectOverlayVisible();
    });

    it("closes the date picker if Enter is pressed when open", async () => {
        render(<DatePicker updateDate={() => {}} />);
        await userEvent.tab();
        await userEvent.keyboard("{Enter}");
        expectOverlayHidden();
    });

    it("opens the date picker if down arrow is pressed when closed", async () => {
        render(<DatePicker updateDate={() => {}} />);
        await userEvent.tab();
        await userEvent.keyboard("{Escape}");
        await userEvent.keyboard("{ArrowDown}");
        expectOverlayVisible();
    });

    it("does not close overlay on Enter if closeOnSelect is false", async () => {
        render(<DatePicker updateDate={() => {}} closeOnSelect={false} />);
        await userEvent.tab();
        await userEvent.type(screen.getByRole("textbox"), "{Enter}");
        expectOverlayVisible();
    });

    it("allows keyboard users to select a date using Tab and Enter", async () => {
        const updateDateMock = jest.fn();
        renderPicker({
            selectedDate: Temporal.PlainDate.from("2021-05-07"),
            updateDate: updateDateMock,
            dateFormat: "YYYY-MM-DD",
        });
        await userEvent.tab();
        await userEvent.tab();
        await userEvent.tab();
        await userEvent.tab();
        await userEvent.keyboard("{Enter}");
        await waitFor(() => expect(updateDateMock).toHaveBeenCalled());
    });

    it("closes the date picker if the input is blurred", async () => {
        render(<DatePicker updateDate={() => {}} />);
        await userEvent.click(screen.getByRole("textbox"));
        await userEvent.click(document.body);
        expectOverlayHidden();
    });

    it("closes the date picker if we click outside the container", async () => {
        render(<DatePicker updateDate={() => {}} />);
        await userEvent.tab();
        await userEvent.click(document.body);
        await waitFor(() => expectOverlayHidden());
    });
    it("closes the date picker if a date is selected", async () => {
        DateMock.advanceTo(new Date("2023-05-10T09:30:00"));
        render(
            <DatePicker
                minDate={Temporal.PlainDate.from("2023-05-07")}
                maxDate={Temporal.PlainDate.from("2023-05-22")}
                updateDate={jest.fn()}
            />,
        );
        await userEvent.tab();
        await userEvent.click(screen.getByText("15"));
        await waitFor(() =>
            expect(screen.queryByRole("grid")).not.toBeInTheDocument(),
        );
    });

    it("does not close the date picker if a date is selected and closeOnSelect is set false", async () => {
        DateMock.advanceTo(new Date("2023-05-10T09:30:00"));
        render(
            <DatePicker
                closeOnSelect={false}
                minDate={Temporal.PlainDate.from("2023-05-07")}
                maxDate={Temporal.PlainDate.from("2023-05-22")}
                updateDate={jest.fn()}
            />,
        );
        await userEvent.tab();
        await userEvent.click(screen.getByText("15"));
        await expect(screen.getByRole("grid")).toBeInTheDocument();
    });
    it("changes the date in the input if we pick a date from the overlay", async () => {
        const {container} = renderPicker({
            selectedDate: Temporal.PlainDate.from("2021-05-07"),
            updateDate: jest.fn(),
            dateFormat: "YYYY-MM-DD",
        });
        await userEvent.tab();
        await userEvent.click(screen.getByText("15"));
        await waitFor(() => {
            expect(within(container).getByRole("textbox")).toHaveValue(
                "2021-05-15",
            );
        });
    });

    it("changes the date in the picker if we type in a valid date", async () => {
        renderPicker({
            selectedDate: Temporal.PlainDate.from("2021-05-07"),
            dateFormat: "YYYY-MM-DD",
            minDate: Temporal.PlainDate.from("2021-05-05"),
            maxDate: Temporal.PlainDate.from("2021-05-12"),
        });
        await userEvent.tab();
        const input = screen.getByRole("textbox");
        await userEvent.clear(input);
        await userEvent.type(input, "2021-05-10");
        await userEvent.tab();
        expect(
            screen.getByRole("button", {
                name: "Monday, May 10th, 2021, selected",
            }),
        ).toBeInTheDocument();
    });
    it("accepts unpadded date input for MM/DD/YYYY format", async () => {
        const updateDateMock = jest.fn();
        renderPicker({
            selectedDate: Temporal.PlainDate.from("2026-01-16"),
            updateDate: updateDateMock,
            dateFormat: "MM/DD/YYYY",
        });
        await userEvent.tab();
        const input = screen.getByRole("textbox");
        await userEvent.clear(input);
        await userEvent.type(input, "1/30/2026");
        await waitFor(() =>
            expect(updateDateMock).toHaveBeenCalledWith(
                expect.objectContaining({
                    year: 2026,
                    month: 1,
                    day: 30,
                }),
            ),
        );
    });

    it("preserves partial input while editing date", async () => {
        renderPicker({selectedDate: Temporal.PlainDate.from("2026-01-16")});
        await userEvent.tab();
        const input = screen.getByRole("textbox");
        await userEvent.clear(input);
        await userEvent.type(input, "1/");
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
        },
        {
            testInput: "1/5/2026",
            expectedValue: "1/5/2026",
            desc: "out-of-range date",
            minDate: Temporal.PlainDate.from("2026-01-10"),
        },
    ])(
        "keeps input value as $expectedValue for $desc without resetInvalidValueOnBlur",
        async ({testInput, expectedValue, minDate}) => {
            // Arrange
            render(
                <>
                    <DatePicker
                        selectedDate={Temporal.PlainDate.from("2026-01-16")}
                        updateDate={jest.fn()}
                        minDate={minDate}
                        resetInvalidValueOnBlur={false}
                    />
                    <button>Other element</button>
                </>,
            );
            // Act
            await userEvent.tab();
            const input = screen.getByRole("textbox");
            await userEvent.clear(input);
            await userEvent.type(input, testInput);
            await userEvent.keyboard("{Escape}");
            await userEvent.tab();
            // Assert
            await waitFor(() => {
                expect(input).toHaveValue(expectedValue);
            });
        },
    );

    it.each([
        {
            testInput: "invalid date",
            desc: "malformed text",
            minDate: undefined,
            expectedCall: null,
        },
        {
            testInput: "1/5/2026",
            desc: "out-of-range date",
            minDate: Temporal.PlainDate.from("2026-01-10"),
            expectedCall: expect.objectContaining({
                year: 2026,
                month: 1,
                day: 5,
            }),
        },
    ])(
        "calls updateDate with expected arg for $desc without resetInvalidValueOnBlur",
        async ({testInput, minDate, expectedCall}) => {
            // Arrange
            const updateDateMock = jest.fn();
            render(
                <>
                    <DatePicker
                        selectedDate={Temporal.PlainDate.from("2026-01-16")}
                        updateDate={updateDateMock}
                        minDate={minDate}
                        resetInvalidValueOnBlur={false}
                    />
                    <button>Other element</button>
                </>,
            );
            // Act
            await userEvent.tab();
            const input = screen.getByRole("textbox");
            await userEvent.clear(input);
            await userEvent.type(input, testInput);
            await userEvent.keyboard("{Escape}");
            await userEvent.tab();
            // Assert
            expect(updateDateMock).toHaveBeenLastCalledWith(expectedCall);
        },
    );
    it.each([
        {resetInvalidValueOnBlur: true},
        {resetInvalidValueOnBlur: false},
    ])(
        "clicking calendar clears invalid text (resetInvalidValueOnBlur=$resetInvalidValueOnBlur)",
        async ({resetInvalidValueOnBlur}) => {
            render(
                <DatePicker
                    selectedDate={Temporal.PlainDate.from("2026-01-16")}
                    updateDate={jest.fn()}
                    resetInvalidValueOnBlur={resetInvalidValueOnBlur}
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
        renderPicker({
            selectedDate: Temporal.PlainDate.from("2021-05-07"),
            dateFormat: "YYYY-MM-DD",
            minDate: Temporal.PlainDate.from("2021-05-05"),
            maxDate: Temporal.PlainDate.from("2021-05-12"),
        });
        await userEvent.tab();
        await userEvent.clear(screen.getByRole("textbox"));
        await userEvent.type(screen.getByRole("textbox"), "2021-55-55");
        const gridcell = screen.getByRole("gridcell", {selected: true});
        expect(
            within(gridcell).getByRole("button", {
                name: "Friday, May 7th, 2021, selected",
            }),
        ).toBeInTheDocument();
    });

    it("receives an accessible name from an outside label", () => {
        render(
            <label htmlFor="label-example">
                Rainier McCheddarton
                <DatePicker id="label-example" updateDate={() => {}} />
            </label>,
        );
        expect(screen.getByRole("textbox")).toHaveAccessibleName(
            "Rainier McCheddarton",
        );
    });

    it("uses custom aria-label when inputAriaLabel prop is provided", () => {
        render(
            <DatePicker
                updateDate={() => {}}
                inputAriaLabel="Choose or enter a date"
            />,
        );
        expect(screen.getByRole("textbox")).toHaveAttribute(
            "aria-label",
            "Choose or enter a date",
        );
    });

    it("respects dir attribute from ancestor", async () => {
        render(
            <div dir="rtl">
                <DatePicker updateDate={() => {}} />
            </div>,
        );
        await userEvent.click(screen.getByRole("textbox"));
        const wrapper = screen.getByTestId("date-picker-overlay");
        expect(
            within(wrapper)
                .getAllByRole("generic")
                .some((div) => div.getAttribute("dir") === "rtl"),
        ).toBe(true);
    });

    it("navigates to next month when next button is clicked", async () => {
        renderPicker();
        await userEvent.click(screen.getByRole("textbox"));
        await userEvent.click(screen.getByLabelText(/next month/i));
        await screen.findByText("June 2021");
    });

    it("navigates to previous month when previous button is clicked", async () => {
        renderPicker();
        await userEvent.click(screen.getByRole("textbox"));
        await userEvent.click(screen.getByLabelText(/previous month/i));
        await screen.findByText("April 2021");
    });

    describe("Month navigation (uncontrolled overlay)", () => {
        it("shows selectedDate month when overlay opens", async () => {
            renderPicker({
                selectedDate: Temporal.PlainDate.from("2021-03-15"),
            });
            await userEvent.click(screen.getByRole("textbox"));
            expect(screen.getByText("March 2021")).toBeInTheDocument();
        });
        it.each([
            ["next", /next month/i],
            ["previous", /previous month/i],
        ])(
            "reopening after %s month and close shows selected date month",
            async (_, label) => {
                renderPicker();
                await userEvent.click(screen.getByRole("textbox"));
                await userEvent.click(screen.getByLabelText(label));
                await userEvent.keyboard("{Escape}");
                await userEvent.click(screen.getByRole("textbox"));
                expect(screen.getByText("May 2021")).toBeInTheDocument();
            },
        );
    });

    describe("Typing vs next/previous focus", () => {
        it("typing a month name updates the overlay to that month", async () => {
            renderPicker();
            await userEvent.click(screen.getByRole("textbox"));
            await userEvent.clear(screen.getByRole("textbox"));
            await userEvent.type(screen.getByRole("textbox"), "March 15, 2021");
            await screen.findByText("March 2021");
        });

        it("typing in the input keeps focus in the textbox", async () => {
            renderPicker();
            const input = screen.getByRole("textbox");
            await userEvent.click(input);
            await userEvent.type(input, "Mar");
            expect(input).toHaveFocus();
        });

        it("clicking next month keeps focus on the next button", async () => {
            renderPicker();
            await userEvent.click(screen.getByRole("textbox"));
            await userEvent.click(screen.getByLabelText(/next month/i));
            await waitFor(() =>
                expect(screen.getByLabelText(/next month/i)).toHaveFocus(),
            );
        });

        it("clicking previous month keeps focus on the previous button", async () => {
            renderPicker();
            await userEvent.click(screen.getByRole("textbox"));
            await userEvent.click(screen.getByLabelText(/previous month/i));
            await waitFor(() =>
                expect(screen.getByLabelText(/previous month/i)).toHaveFocus(),
            );
        });

        it("second click on next month keeps focus on next button", async () => {
            renderPicker();
            await userEvent.click(screen.getByRole("textbox"));
            await userEvent.click(screen.getByLabelText(/next month/i));
            await userEvent.click(screen.getByLabelText(/next month/i));
            await waitFor(() =>
                expect(screen.getByLabelText(/next month/i)).toHaveFocus(),
            );
        });

        it("after typing then clicking next, overlay shows next month", async () => {
            renderPicker();
            await userEvent.click(screen.getByRole("textbox"));
            await userEvent.clear(screen.getByRole("textbox"));
            await userEvent.type(screen.getByRole("textbox"), "March 15, 2021");
            await userEvent.click(screen.getByLabelText(/next month/i));
            await screen.findByText("April 2021");
        });

        it("after clicking next then typing in input, focus stays in input", async () => {
            renderPicker();
            await userEvent.click(screen.getByRole("textbox"));
            await userEvent.click(screen.getByLabelText(/next month/i));
            const input = screen.getByRole("textbox");
            await userEvent.click(input);
            await userEvent.type(input, "1");
            expect(input).toHaveFocus();
        });

        it("after typing full date, next button still navigates months", async () => {
            renderPicker();
            await userEvent.click(screen.getByRole("textbox"));
            await userEvent.clear(screen.getByRole("textbox"));
            await userEvent.type(screen.getByRole("textbox"), "March 15, 2021");
            await screen.findByText("March 2021");
            await userEvent.click(screen.getByLabelText(/next month/i));
            await userEvent.click(screen.getByLabelText(/next month/i));
            expect(await screen.findByText("May 2021")).toBeInTheDocument();
        });

        it("after clicking a day, next button still navigates months", async () => {
            renderPicker({closeOnSelect: false});
            await userEvent.click(screen.getByRole("textbox"));
            await userEvent.click(screen.getByText("15"));
            await userEvent.click(screen.getByLabelText(/next month/i));
            expect(await screen.findByText("June 2021")).toBeInTheDocument();
        });
    });

    describe("Localization", () => {
        const localeProps = {
            locale: enUS,
            updateDate: jest.fn(),
            dateFormat: "MMMM D, YYYY",
        };
        describe("locale prop accepts Locale object directly", () => {
            it("displays calendar when input is clicked", async () => {
                render(
                    <DatePicker {...localeProps} selectedDate={undefined} />,
                );
                await userEvent.click(screen.getByRole("textbox"));
                expect(await screen.findByRole("grid")).toBeInTheDocument();
            });

            it("updates calendar to January 2021 when user types that date", async () => {
                render(
                    <DatePicker {...localeProps} selectedDate={undefined} />,
                );
                await userEvent.click(screen.getByRole("textbox"));
                await userEvent.type(
                    screen.getByRole("textbox"),
                    "January 15, 2021",
                );
                await screen.findByText("January 2021");
            });

            it("updates calendar month when selectedDate prop changes", async () => {
                const {rerender} = render(
                    <DatePicker
                        {...localeProps}
                        selectedDate={Temporal.PlainDate.from("2026-01-15")}
                    />,
                );
                await userEvent.click(
                    screen.getByDisplayValue("January 15, 2026"),
                );
                rerender(
                    <DatePicker
                        {...localeProps}
                        selectedDate={Temporal.PlainDate.from("2021-07-20")}
                    />,
                );
                await screen.findByText("July 2021");
            });

            it("shows December 2021 when opening with that selected date", async () => {
                render(
                    <DatePicker
                        {...localeProps}
                        selectedDate={Temporal.PlainDate.from("2021-12-25")}
                    />,
                );
                await userEvent.click(
                    screen.getByDisplayValue("December 25, 2021"),
                );
                expect(
                    await screen.findByText("December 2021"),
                ).toBeInTheDocument();
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
            it("updates input to Spanish text when date selected from calendar", async () => {
                renderPicker({
                    selectedDate: Temporal.PlainDate.from("2026-01-05"),
                    dateFormat: "MMMM D, YYYY",
                    locale: es,
                });
                const input = screen.getByRole("textbox");
                await userEvent.click(input);
                await userEvent.click(screen.getByText("15"));
                await waitFor(() =>
                    expect(input).toHaveValue("enero 15, 2026"),
                );
            });
        });
        describe("Localized numeric formats", () => {
            it("displays Spanish numeric date in DD/MM/YYYY format", () => {
                render(
                    <DatePicker
                        selectedDate={Temporal.PlainDate.from("2026-01-16")}
                        updateDate={() => {}}
                        dateFormat="DD/MM/YYYY"
                        locale={es}
                    />,
                );
                expect(
                    screen.getByDisplayValue("01/16/2026"),
                ).toBeInTheDocument();
            });
            it("updates input when date selected from Spanish calendar", async () => {
                render(
                    <DatePicker
                        selectedDate={Temporal.PlainDate.from("2026-01-05")}
                        updateDate={() => {}}
                        dateFormat="DD/MM/YYYY"
                        locale={es}
                    />,
                );
                await userEvent.tab();
                await userEvent.click(screen.getByText("15"));
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
                const updateDateMock = jest.fn();
                renderPicker({
                    selectedDate: Temporal.PlainDate.from("2026-01-16"),
                    updateDate: updateDateMock,
                    dateFormat: "LL",
                });
                const input = screen.getByRole("textbox");
                await userEvent.clear(input);
                await userEvent.type(input, "January 20, 2026");
                expect(updateDateMock).toHaveBeenLastCalledWith(
                    expect.objectContaining({
                        year: 2026,
                        month: 1,
                        day: 20,
                    }),
                );
            });
            it("parses edited LL format text in Spanish", async () => {
                const updateDateMock = jest.fn();
                renderPicker({
                    selectedDate: Temporal.PlainDate.from("2026-01-16"),
                    updateDate: updateDateMock,
                    dateFormat: "LL",
                    locale: es,
                });
                const input = screen.getByRole("textbox");
                await userEvent.clear(input);
                await userEvent.type(input, "20 de enero de 2026");
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
