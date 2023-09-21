import * as React from "react";
import moment from "moment";
import {render, screen} from "@testing-library/react";
import * as DateMock from "jest-date-mock";
import userEvent from "@testing-library/user-event";

import BirthdayPicker, {defaultLabels} from "../birthday-picker";

import type {Labels} from "../birthday-picker";

describe("BirthdayPicker", () => {
    const today = new Date("2021-07-19T09:30:00Z");

    describe("render", () => {
        beforeEach(() => {
            DateMock.advanceTo(today);
        });

        it("renders without a default value", () => {
            // Arrange

            // Act
            render(<BirthdayPicker onChange={() => {}} />);

            const monthPicker = screen.getByTestId("birthday-picker-month");
            const dayPicker = screen.getByTestId("birthday-picker-day");
            const yearPicker = screen.getByTestId("birthday-picker-year");

            // Assert
            expect(monthPicker).toHaveTextContent("Month");
            expect(dayPicker).toHaveTextContent("Day");
            expect(yearPicker).toHaveTextContent("Year");
        });

        it("renders without the day field if monthYearOnly is set", () => {
            // Arrange

            // Act
            render(<BirthdayPicker monthYearOnly={true} onChange={() => {}} />);

            const dayPicker = screen.queryByTestId("birthday-picker-day");

            // Assert
            expect(dayPicker).not.toBeInTheDocument();
        });

        it("renders with a valid default value", () => {
            // Arrange
            const date = moment(today);
            const defaultValue = date.format("YYYY-MM-DD");

            // Act
            render(
                <BirthdayPicker
                    defaultValue={defaultValue}
                    onChange={() => {}}
                />,
            );

            const monthPicker = screen.getByTestId("birthday-picker-month");
            const dayPicker = screen.getByTestId("birthday-picker-day");
            const yearPicker = screen.getByTestId("birthday-picker-year");

            // Assert
            expect(monthPicker).toHaveTextContent("Jul");
            expect(dayPicker).toHaveTextContent("19");
            expect(yearPicker).toHaveTextContent("2021");
            expect(screen.queryByRole("alert")).not.toBeInTheDocument();
        });

        it("renders with a invalid default future value", () => {
            // Arrange
            DateMock.advanceTo(today);
            const date = moment(today).add(1, "day");
            const defaultValue = date.format("YYYY-MM-DD");

            // Act
            render(
                <BirthdayPicker
                    defaultValue={defaultValue}
                    onChange={() => {}}
                />,
            );

            const monthPicker = screen.getByTestId("birthday-picker-month");
            const dayPicker = screen.getByTestId("birthday-picker-day");
            const yearPicker = screen.getByTestId("birthday-picker-year");

            // Assert
            expect(monthPicker).toHaveTextContent("Jul");
            expect(dayPicker).toHaveTextContent("20");
            expect(yearPicker).toHaveTextContent("2021");
        });

        it("renders an error with a invalid default future value", () => {
            // Arrange
            const date = moment(today).add(1, "day");
            const defaultValue = date.format("YYYY-MM-DD");

            // Act
            render(
                <BirthdayPicker
                    defaultValue={defaultValue}
                    onChange={() => {}}
                />,
            );

            // Assert
            expect(screen.getByRole("alert")).toBeInTheDocument();
        });

        it("renders with an invalid default value", () => {
            // Arrange
            const defaultValue = "2021-02-31"; // There is no Feb 31st

            // Act
            render(
                <BirthdayPicker
                    defaultValue={defaultValue}
                    onChange={() => {}}
                />,
            );

            const monthPicker = screen.getByTestId("birthday-picker-month");
            const dayPicker = screen.getByTestId("birthday-picker-day");
            const yearPicker = screen.getByTestId("birthday-picker-year");

            // Assert
            expect(monthPicker).toHaveTextContent("Month");
            expect(dayPicker).toHaveTextContent("Day");
            expect(yearPicker).toHaveTextContent("Year");
        });

        it("renders correctly the disabled state", () => {
            // Arrange

            // Act
            render(<BirthdayPicker disabled={true} onChange={() => {}} />);

            const monthPicker = screen.getByTestId("birthday-picker-month");
            const dayPicker = screen.getByTestId("birthday-picker-day");
            const yearPicker = screen.getByTestId("birthday-picker-year");

            // Assert
            expect(monthPicker).toBeDisabled();
            expect(dayPicker).toBeDisabled();
            expect(yearPicker).toBeDisabled();
        });

        it("renders an error with an invalid default value", () => {
            // Arrange
            const defaultValue = "2021-02-31";

            // Act
            render(
                <BirthdayPicker
                    defaultValue={defaultValue}
                    onChange={() => {}}
                />,
            );

            // Assert
            expect(screen.getByRole("alert")).toBeInTheDocument();
        });

        it.each(["day", "month", "year"])(
            "%s > renders the listbox as invalid with an invalid default value",
            async (fragment) => {
                // Arrange
                const defaultValue = "2021-02-31";

                render(
                    <BirthdayPicker
                        defaultValue={defaultValue}
                        onChange={() => {}}
                    />,
                );

                const button = screen.getByTestId(
                    `birthday-picker-${fragment}`,
                );
                userEvent.click(button);

                // Act
                // wait for the listbox (options list) to appear
                const listbox = await screen.findByRole("listbox");

                // Assert
                expect(listbox).toHaveAttribute("aria-invalid", "true");
            },
        );
    });

    describe("onChange", () => {
        it("onChange triggers when a new value is selected", () => {
            // Arrange
            const onChange = jest.fn();

            render(<BirthdayPicker onChange={onChange} />);

            // Act
            userEvent.click(screen.getByTestId("birthday-picker-month"));
            const monthOption = screen.getByRole("option", {
                name: "Jul",
            });
            userEvent.click(monthOption, undefined, {
                skipPointerEventsCheck: true,
            });

            userEvent.click(screen.getByTestId("birthday-picker-day"));
            const dayOption = screen.getByRole("option", {name: "5"});
            userEvent.click(dayOption, undefined, {
                skipPointerEventsCheck: true,
            });

            userEvent.click(screen.getByTestId("birthday-picker-year"));
            const yearOption = screen.getByRole("option", {
                name: "2021",
            });
            userEvent.click(yearOption, undefined, {
                skipPointerEventsCheck: true,
            });

            // Assert
            expect(onChange).toHaveBeenCalledWith("2021-07-05");
        });

        it("onChange triggers multiple times when a new value is selected", () => {
            // Arrange
            const onChange = jest.fn();
            render(<BirthdayPicker onChange={onChange} />);
            // Pick one date
            userEvent.click(screen.getByTestId("birthday-picker-month"));
            const monthOption = screen.getByRole("option", {
                name: "Jul",
            });
            userEvent.click(monthOption, undefined, {
                skipPointerEventsCheck: true,
            });

            userEvent.click(screen.getByTestId("birthday-picker-day"));
            const dayOption = screen.getByRole("option", {name: "5"});

            userEvent.click(dayOption, undefined, {
                skipPointerEventsCheck: true,
            });

            userEvent.click(screen.getByTestId("birthday-picker-year"));
            const yearOption = screen.getByRole("option", {
                name: "2021",
            });
            userEvent.click(yearOption, undefined, {
                skipPointerEventsCheck: true,
            });

            // Act
            // Pick Another Date
            userEvent.click(screen.getByTestId("birthday-picker-month"));
            const monthOptionNew = screen.getByRole("option", {
                name: "Aug",
            });
            userEvent.click(monthOptionNew, undefined, {
                skipPointerEventsCheck: true,
            });

            userEvent.click(screen.getByTestId("birthday-picker-day"));
            const dayOptionNew = screen.getByRole("option", {name: "9"});
            userEvent.click(dayOptionNew, undefined, {
                skipPointerEventsCheck: true,
            });

            userEvent.click(screen.getByTestId("birthday-picker-year"));
            const yearOptionNew = screen.getByRole("option", {
                name: "2020",
            });
            userEvent.click(yearOptionNew, undefined, {
                skipPointerEventsCheck: true,
            });

            // Assert
            expect(onChange).toHaveBeenLastCalledWith("2020-08-09");
        });

        it("onChange triggers when a new value is selected after a default value is set", () => {
            // Arrange
            const onChange = jest.fn();

            render(
                <BirthdayPicker
                    defaultValue="2017-07-17"
                    onChange={onChange}
                />,
            );

            // Act
            userEvent.click(screen.getByTestId("birthday-picker-month"));
            const monthOption = screen.getByRole("option", {
                name: "Aug",
            });
            userEvent.click(monthOption, undefined, {
                skipPointerEventsCheck: true,
            });

            userEvent.click(screen.getByTestId("birthday-picker-day"));
            const dayOption = screen.getByRole("option", {name: "9"});

            userEvent.click(dayOption, undefined, {
                skipPointerEventsCheck: true,
            });

            userEvent.click(screen.getByTestId("birthday-picker-year"));
            const yearOption = screen.getByRole("option", {
                name: "2018",
            });
            userEvent.click(yearOption, undefined, {
                skipPointerEventsCheck: true,
            });

            // Assert
            expect(onChange).toHaveBeenCalledWith("2018-08-09");
        });

        it("onChange triggers with null when an invalid value is selected after a default value is set", () => {
            // Arrange
            const onChange = jest.fn();
            let maybeInstance: BirthdayPicker | null | undefined = null;

            // Act
            render(
                <BirthdayPicker
                    defaultValue="2017-07-17"
                    onChange={onChange}
                    ref={(node: any) => (maybeInstance = node)}
                />,
            );

            if (!maybeInstance) {
                throw new Error("BirthdayPicker instance is undefined");
            }
            const instance = maybeInstance;

            // This test was written by calling methods on the instance because
            // react-window (used by SingleSelect) doesn't show all of the items
            // in the dropdown.
            // @ts-expect-error [FEI-5019] - TS2339 - Property 'handleMonthChange' does not exist on type 'never'.
            instance.handleMonthChange("1");
            // @ts-expect-error [FEI-5019] - TS2339 - Property 'handleDayChange' does not exist on type 'never'.
            instance.handleDayChange("31");
            // @ts-expect-error [FEI-5019] - TS2339 - Property 'handleYearChange' does not exist on type 'never'.
            instance.handleYearChange("2021");

            // Assert
            expect(onChange).toHaveBeenCalledWith(null);
        });

        it("onChange triggers only one null when multiple invalid values are selected after a default value is set", () => {
            // Arrange
            const onChange = jest.fn();

            render(
                <BirthdayPicker
                    defaultValue="2021-02-31"
                    onChange={onChange}
                />,
            );

            // Act
            userEvent.click(screen.getByTestId("birthday-picker-year"));
            const yearOption = screen.getByRole("option", {
                name: "2020",
            });
            userEvent.click(yearOption, undefined, {
                skipPointerEventsCheck: true,
            });

            // Assert
            expect(onChange).toHaveBeenCalledTimes(1);
        });

        it("onChange triggers the first day of the month when monthYearOnly is set", () => {
            // Arrange
            const onChange = jest.fn();

            render(<BirthdayPicker monthYearOnly={true} onChange={onChange} />);

            // Act
            userEvent.click(screen.getByTestId("birthday-picker-month"));
            const monthOption = screen.getByRole("option", {
                name: "Aug",
            });
            userEvent.click(monthOption, undefined, {
                skipPointerEventsCheck: true,
            });

            userEvent.click(screen.getByTestId("birthday-picker-year"));
            const yearOption = screen.getByRole("option", {
                name: "2018",
            });
            userEvent.click(yearOption, undefined, {
                skipPointerEventsCheck: true,
            });

            // Assert
            // Verify that we passed the first day of the month
            expect(onChange).toHaveBeenCalledWith("2018-08-01");
        });

        it("onChange triggers the passed-in day intact when defaultValue and monthYearOnly are set", () => {
            // Arrange
            const onChange = jest.fn();

            render(
                <BirthdayPicker
                    defaultValue="2017-07-17"
                    monthYearOnly={true}
                    onChange={onChange}
                />,
            );

            // Act
            userEvent.click(screen.getByTestId("birthday-picker-month"));
            const monthOption = screen.getByRole("option", {
                name: "Aug",
            });
            userEvent.click(monthOption, undefined, {
                skipPointerEventsCheck: true,
            });

            userEvent.click(screen.getByTestId("birthday-picker-year"));
            const yearOption = screen.getByRole("option", {
                name: "2018",
            });
            userEvent.click(yearOption, undefined, {
                skipPointerEventsCheck: true,
            });

            // Assert
            // Verify that we passed the same day originally passed in.
            expect(onChange).toHaveBeenCalledWith("2018-08-17");
        });
    });

    describe("labels", () => {
        const translatedLabels: Labels = {
            month: "Mes",
            day: "Día",
            year: "Año",
            errorMessage: "Por favor ingrese una fecha valida.",
        };

        beforeEach(() => {
            DateMock.advanceTo(today);
        });

        it.each([defaultLabels.month, defaultLabels.day, defaultLabels.year])(
            "renders the placeholder as %s",
            (label: any) => {
                // Arrange

                // Act
                render(<BirthdayPicker onChange={() => {}} />);

                // Assert
                expect(screen.getByText(label)).toBeInTheDocument();
            },
        );

        it.each([
            translatedLabels.month,
            translatedLabels.day,
            translatedLabels.year,
        ])(
            "renders the translated placeholder as %s",
            (translatedLabel: any) => {
                // Arrange

                // Act
                render(
                    <BirthdayPicker
                        onChange={() => {}}
                        labels={translatedLabels}
                    />,
                );

                // Assert
                expect(screen.getByText(translatedLabel)).toBeInTheDocument();
            },
        );

        it("merges correctly the labels", () => {
            // Arrange

            // Only passing some of the labels to verify if the others are
            // merged correctly.
            const partialLabels: Partial<Labels> = {
                month: "Mes",
                year: "Año",
            };

            // Act
            render(
                // @ts-expect-error [FEI-5019] - TS2322 - Type 'Partial<Labels>' is not assignable to type 'Labels'.
                <BirthdayPicker onChange={() => {}} labels={partialLabels} />,
            );

            // Assert
            expect(screen.getByText("Mes")).toBeInTheDocument(); // es
            expect(screen.getByText("Año")).toBeInTheDocument(); // es
            expect(screen.getByText("Day")).toBeInTheDocument(); // EN
        });

        it("renders a translated error with an invalid default value", () => {
            // Arrange
            const defaultValue = "2021-02-31"; // There is no Feb 31st

            // Act
            render(
                <BirthdayPicker
                    defaultValue={defaultValue}
                    onChange={() => {}}
                    labels={translatedLabels}
                />,
            );

            // Assert
            expect(
                screen.getByText(translatedLabels.errorMessage),
            ).toBeInTheDocument();
        });
    });

    describe("keyboard", () => {
        beforeEach(() => {
            jest.useFakeTimers();
        });

        it("should find and select an item using the keyboard", () => {
            // Arrange
            const onChange = jest.fn();
            const lastYear = String(new Date().getFullYear() - 1);

            render(<BirthdayPicker onChange={onChange} />);

            // Act
            // Focus on the month selector
            userEvent.tab();
            userEvent.keyboard("Jul");
            jest.advanceTimersByTime(501);

            // Focus on the day selector
            userEvent.tab();
            userEvent.keyboard("5");
            jest.advanceTimersByTime(501);

            // Focus on the year selector
            userEvent.tab();
            userEvent.keyboard(lastYear);
            jest.advanceTimersByTime(501);

            // Assert
            expect(onChange).toHaveBeenCalledWith(`${lastYear}-07-05`);
        });
    });
});
