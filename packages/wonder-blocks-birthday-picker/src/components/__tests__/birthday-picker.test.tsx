import * as React from "react";
import {render, act, screen, waitFor} from "@testing-library/react";
import * as DateMock from "jest-date-mock";
import {userEvent, PointerEventsCheckLevel} from "@testing-library/user-event";
import {Temporal} from "temporal-polyfill";

import BirthdayPicker, {defaultLabels} from "../birthday-picker";

import type {Labels} from "../birthday-picker";

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

describe("BirthdayPicker", () => {
    const today = new Date("2021-07-19T09:30:00Z");

    describe("render", () => {
        beforeEach(() => {
            DateMock.advanceTo(today);
        });

        it("renders without a default value", async () => {
            // Arrange

            // Act
            render(<BirthdayPicker onChange={() => {}} />);

            const monthPicker = await screen.findByTestId(
                "birthday-picker-month",
            );
            const dayPicker = await screen.findByTestId("birthday-picker-day");
            const yearPicker = await screen.findByTestId(
                "birthday-picker-year",
            );

            // Assert
            expect(monthPicker).toHaveTextContent("Month");
            expect(dayPicker).toHaveTextContent("Day");
            expect(yearPicker).toHaveTextContent("Year");
        });

        it("renders without the day field if monthYearOnly is set", async () => {
            // Arrange

            // Act
            render(<BirthdayPicker monthYearOnly={true} onChange={() => {}} />);

            const dayPicker = screen.queryByTestId("birthday-picker-day");

            // Assert
            expect(dayPicker).not.toBeInTheDocument();
        });

        it("renders with a valid default value", async () => {
            // Arrange
            const defaultValue = Temporal.Now.plainDateISO().toString();

            // Act
            render(
                <BirthdayPicker
                    defaultValue={defaultValue}
                    onChange={() => {}}
                />,
            );

            const monthPicker = await screen.findByTestId(
                "birthday-picker-month",
            );
            const dayPicker = await screen.findByTestId("birthday-picker-day");
            const yearPicker = await screen.findByTestId(
                "birthday-picker-year",
            );

            // Assert
            expect(monthPicker).toHaveTextContent("Jul");
            expect(dayPicker).toHaveTextContent("19");
            expect(yearPicker).toHaveTextContent("2021");
            expect(screen.queryByRole("alert")).not.toBeInTheDocument();
        });

        it("renders with a invalid default future value", async () => {
            // Arrange
            DateMock.advanceTo(today);
            const defaultValue = Temporal.Now.plainDateISO()
                .add({days: 1})
                .toString();

            // Act
            render(
                <BirthdayPicker
                    defaultValue={defaultValue}
                    onChange={() => {}}
                />,
            );

            const monthPicker = await screen.findByTestId(
                "birthday-picker-month",
            );
            const dayPicker = await screen.findByTestId("birthday-picker-day");
            const yearPicker = await screen.findByTestId(
                "birthday-picker-year",
            );

            // Assert
            expect(monthPicker).toHaveTextContent("Jul");
            expect(dayPicker).toHaveTextContent("20");
            expect(yearPicker).toHaveTextContent("2021");
        });

        it("renders an error with a invalid default future value", async () => {
            // Arrange
            const defaultValue = Temporal.PlainDate.from({
                year: today.getFullYear(),
                month: today.getMonth() + 1, // Temporal is 1-based
                day: today.getDate() + 1, // +1 for future date
            }).toString();

            // Act
            render(
                <BirthdayPicker
                    defaultValue={defaultValue}
                    onChange={() => {}}
                />,
            );

            // Assert
            expect(await screen.findByRole("alert")).toBeInTheDocument();
        });

        it("renders with an invalid default value", async () => {
            // Arrange
            const defaultValue = "2021-02-31"; // There is no Feb 31st

            // Act
            render(
                <BirthdayPicker
                    defaultValue={defaultValue}
                    onChange={() => {}}
                />,
            );

            const monthPicker = await screen.findByTestId(
                "birthday-picker-month",
            );
            const dayPicker = await screen.findByTestId("birthday-picker-day");
            const yearPicker = await screen.findByTestId(
                "birthday-picker-year",
            );

            // Assert
            expect(monthPicker).toHaveTextContent("Month");
            expect(dayPicker).toHaveTextContent("Day");
            expect(yearPicker).toHaveTextContent("Year");
        });

        it("renders correctly the disabled state", async () => {
            // Arrange

            // Act
            render(<BirthdayPicker disabled={true} onChange={() => {}} />);

            const monthPicker = await screen.findByTestId(
                "birthday-picker-month",
            );
            const dayPicker = await screen.findByTestId("birthday-picker-day");
            const yearPicker = await screen.findByTestId(
                "birthday-picker-year",
            );

            // Assert
            expect(monthPicker).toHaveAttribute("aria-disabled", "true");
            expect(dayPicker).toHaveAttribute("aria-disabled", "true");
            expect(yearPicker).toHaveAttribute("aria-disabled", "true");
        });

        it("renders an error with an invalid default value", async () => {
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
            expect(await screen.findByRole("alert")).toBeInTheDocument();
        });

        describe.each(["day", "month", "year"])(
            "$fragment",
            (fragment: string) => {
                it("%s > renders the listbox as invalid with an invalid default value", async () => {
                    // Arrange
                    const defaultValue = "2021-02-31";

                    render(
                        <BirthdayPicker
                            defaultValue={defaultValue}
                            onChange={() => {}}
                        />,
                    );

                    const button = await screen.findByTestId(
                        `birthday-picker-${fragment}`,
                    );
                    await userEvent.click(button);

                    // Act
                    // wait for the listbox (options list) to appear
                    const listbox = await screen.findByRole("listbox", {
                        hidden: true,
                    });

                    // Assert
                    expect(listbox).toHaveAttribute("aria-invalid", "true");
                });

                it("$s > labels the opener", async () => {
                    // Arrange
                    const defaultValue = "2021-02-31";
                    const testLabels: Labels = {
                        month: "Mois",
                        day: "Jour",
                        year: "Année",
                        errorMessage: "There was an error",
                    };

                    render(
                        <BirthdayPicker
                            defaultValue={defaultValue}
                            onChange={() => {}}
                            labels={testLabels}
                        />,
                    );

                    // Act
                    const button = await screen.findByTestId(
                        `birthday-picker-${fragment}`,
                    );

                    // Assert
                    expect(button).toHaveAccessibleName(
                        testLabels[fragment as keyof Labels],
                    );
                });
            },
        );
    });

    describe("onChange", () => {
        it("onChange triggers when a new value is selected", async () => {
            // Arrange
            const onChange = jest.fn();

            render(<BirthdayPicker onChange={onChange} />);

            const monthDropdown = await screen.findByTestId(
                "birthday-picker-month",
            );
            // Act
            await userEvent.click(monthDropdown);

            const monthOption = await screen.findByRole("option", {
                name: "Jul",
            });
            await userEvent.click(monthOption, {
                pointerEventsCheck: PointerEventsCheckLevel.Never,
            });

            await userEvent.click(
                await screen.findByTestId("birthday-picker-day"),
            );
            const dayOption = await screen.findByRole("option", {
                name: "5",
            });
            await userEvent.click(dayOption, {
                pointerEventsCheck: PointerEventsCheckLevel.Never,
            });

            await userEvent.click(
                await screen.findByTestId("birthday-picker-year"),
            );
            const yearOption = await screen.findByRole("option", {
                name: "2021",
            });
            await userEvent.click(yearOption, {
                pointerEventsCheck: PointerEventsCheckLevel.Never,
            });

            // Assert
            expect(onChange).toHaveBeenCalledWith("2021-07-05");
        });

        it("onChange triggers multiple times when a new value is selected", async () => {
            // Arrange
            const onChange = jest.fn();
            render(<BirthdayPicker onChange={onChange} />);
            // Pick one date
            await userEvent.click(
                await screen.findByTestId("birthday-picker-month"),
            );
            const monthOption = await screen.findByText("Jul");
            await userEvent.click(monthOption, {
                pointerEventsCheck: PointerEventsCheckLevel.Never,
            });

            await userEvent.click(
                await screen.findByTestId("birthday-picker-day"),
            );
            const dayOption = await screen.findByText("5");

            await userEvent.click(dayOption, {
                pointerEventsCheck: PointerEventsCheckLevel.Never,
            });

            await userEvent.click(
                await screen.findByTestId("birthday-picker-year"),
            );
            const yearOption = await screen.findByText("2021");
            await userEvent.click(yearOption, {
                pointerEventsCheck: PointerEventsCheckLevel.Never,
            });

            // Act
            // Pick Another Date
            await userEvent.click(
                await screen.findByTestId("birthday-picker-month"),
            );
            const monthOptionNew = await screen.findByText("Aug");
            await userEvent.click(monthOptionNew, {
                pointerEventsCheck: PointerEventsCheckLevel.Never,
            });

            await userEvent.click(
                await screen.findByTestId("birthday-picker-day"),
            );
            const dayOptionNew = await screen.findByText("9");
            await userEvent.click(dayOptionNew, {
                pointerEventsCheck: PointerEventsCheckLevel.Never,
            });

            await userEvent.click(
                await screen.findByTestId("birthday-picker-year"),
            );
            const yearOptionNew = await screen.findByText("2020");
            await userEvent.click(yearOptionNew, {
                pointerEventsCheck: PointerEventsCheckLevel.Never,
            });

            // Assert
            expect(onChange).toHaveBeenLastCalledWith("2020-08-09");
        });

        it("onChange triggers when a new value is selected after a default value is set", async () => {
            // Arrange
            const onChange = jest.fn();

            render(
                <BirthdayPicker
                    defaultValue="2017-07-17"
                    onChange={onChange}
                />,
            );

            // Act
            await userEvent.click(
                await screen.findByTestId("birthday-picker-month"),
            );
            const monthOption = await screen.findByText("Aug");
            await userEvent.click(monthOption, {
                pointerEventsCheck: PointerEventsCheckLevel.Never,
            });

            await userEvent.click(
                await screen.findByTestId("birthday-picker-day"),
            );
            const dayOption = await screen.findByText("9");

            await userEvent.click(dayOption, {
                pointerEventsCheck: PointerEventsCheckLevel.Never,
            });

            await userEvent.click(
                await screen.findByTestId("birthday-picker-year"),
            );
            const yearOption = await screen.findByText("2018");
            await userEvent.click(yearOption, {
                pointerEventsCheck: PointerEventsCheckLevel.Never,
            });

            // Assert
            expect(onChange).toHaveBeenCalledWith("2018-08-09");
        });

        it("onChange triggers with null when an invalid value is selected after a default value is set", async () => {
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
            const instance: any = maybeInstance;

            // This test was written by calling methods on the instance because
            // react-window (used by SingleSelect) doesn't show all of the items
            // in the dropdown.
            await act(() => instance.handleMonthChange("2"));
            await act(() => instance.handleDayChange("31"));
            await act(() => instance.handleYearChange("2021"));

            // Assert
            await waitFor(() => expect(onChange).toHaveBeenCalledWith(null));
        });

        it("onChange triggers only one null when multiple invalid values are selected after a default value is set", async () => {
            // Arrange
            const onChange = jest.fn();

            render(
                <BirthdayPicker
                    defaultValue="2021-02-31"
                    onChange={onChange}
                />,
            );

            // Act
            await userEvent.click(
                await screen.findByTestId("birthday-picker-year"),
            );
            const yearOption = await screen.findByText("2020");
            await userEvent.click(yearOption, {
                pointerEventsCheck: PointerEventsCheckLevel.Never,
            });

            // Assert
            expect(onChange).toHaveBeenCalledTimes(1);
        });

        it("onChange triggers the last day of the month when monthYearOnly is set", async () => {
            // Arrange
            const onChange = jest.fn();

            render(<BirthdayPicker monthYearOnly={true} onChange={onChange} />);

            // Act
            await userEvent.click(
                await screen.findByTestId("birthday-picker-month"),
            );
            const monthOption = await screen.findByText("Aug");
            await userEvent.click(monthOption, {
                pointerEventsCheck: PointerEventsCheckLevel.Never,
            });

            await userEvent.click(
                await screen.findByTestId("birthday-picker-year"),
            );
            const yearOption = await screen.findByText("2018");
            await userEvent.click(yearOption, {
                pointerEventsCheck: PointerEventsCheckLevel.Never,
            });

            // Assert
            // Verify that we passed the first day of the month
            expect(onChange).toHaveBeenCalledWith("2018-08-31");
        });

        it("onChange triggers the last day of month when defaultValue and monthYearOnly are set", async () => {
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
            await userEvent.click(
                await screen.findByTestId("birthday-picker-month"),
            );
            const monthOption = await screen.findByText("Aug");
            await userEvent.click(monthOption, {
                pointerEventsCheck: PointerEventsCheckLevel.Never,
            });

            await userEvent.click(
                await screen.findByTestId("birthday-picker-year"),
            );
            const yearOption = await screen.findByText("2018");
            await userEvent.click(yearOption, {
                pointerEventsCheck: PointerEventsCheckLevel.Never,
            });

            // Assert
            // Verify that we passed the same day originally passed in.
            expect(onChange).toHaveBeenCalledWith("2018-08-31");
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
            async (label: any) => {
                // Arrange

                // Act
                render(<BirthdayPicker onChange={() => {}} />);

                // Assert
                await screen.findByText(label);
            },
        );

        it.each([
            translatedLabels.month,
            translatedLabels.day,
            translatedLabels.year,
        ])(
            "renders the translated placeholder as %s",
            async (translatedLabel: any) => {
                // Arrange

                // Act
                render(
                    <BirthdayPicker
                        onChange={() => {}}
                        labels={translatedLabels}
                    />,
                );

                // Assert
                await screen.findByText(translatedLabel);
            },
        );

        it("merges correctly the labels", async () => {
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
            expect(await screen.findByText("Mes")).toBeInTheDocument(); // es
            expect(await screen.findByText("Año")).toBeInTheDocument(); // es
            expect(await screen.findByText("Day")).toBeInTheDocument(); // EN
        });

        it("renders a translated error with an invalid default value", async () => {
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
            await screen.findByText(translatedLabels.errorMessage);
        });
    });

    describe("keyboard", () => {
        /*
        The keyboard events (I tried .keyboard and .type) are not working as
        needed. From what I can tell, they are going to the wrong element or
        otherwise not getting handled as they would in a non-test world.
        We had this issue with elsewhere too and haven't resolved it (since
        updating to UserEvents v14, it seems). Skipping this test for now
        until we can work out how to replicate things again. This could be
        changed to a storybook test perhaps.
         */
        it.skip("should find and select an item using the keyboard", async () => {
            // Arrange
            jest.useFakeTimers();
            const ue = userEvent.setup({
                advanceTimers: jest.advanceTimersByTime,
                pointerEventsCheck: PointerEventsCheckLevel.Never,
            });
            const onChange = jest.fn();
            const lastYear = String(new Date().getFullYear() - 1);

            render(<BirthdayPicker onChange={onChange} />);

            // Act
            // Focus on the month selector
            await ue.tab();
            await ue.keyboard("Jul");
            jest.advanceTimersByTime(501);

            // Focus on the day selector
            await ue.tab();
            await ue.keyboard("5");
            jest.advanceTimersByTime(501);

            // Focus on the year selector
            await ue.tab();
            await ue.keyboard(lastYear);
            jest.advanceTimersByTime(501);

            // Assert
            expect(onChange).toHaveBeenCalledWith(`${lastYear}-07-05`);
        });
    });

    describe("locale", () => {
        it("renders the month names in the correct locale", async () => {
            // Arrange
            render(
                <BirthdayPicker
                    locale="es"
                    onChange={() => {}}
                    defaultValue="2021-01-19"
                />,
            );

            // Assert (January in Spanish is "ene")
            await screen.findByText("ene");
        });
    });
});
