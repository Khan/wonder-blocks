// @flow
import * as React from "react";
import moment from "moment";
import {render, screen} from "@testing-library/react";
import * as DateMock from "jest-date-mock";
import userEvent from "../../../../../utils/testing/user-event.js";

import BirthdayPicker, {defaultLabels} from "../birthday-picker.js";

import type {Labels} from "../birthday-picker.js";

describe("BirthdayPicker", () => {
    const today = new Date("2021-07-19T09:30:00Z");

    describe("render", () => {
        beforeEach(() => {
            jest.useRealTimers();
            DateMock.advanceTo(today);
        });

        it("renders without a default value", () => {
            // Arrange

            // Act
            render(<BirthdayPicker onChange={() => {}} />);

            // Assert
            expect(
                screen.getByTestId("birthday-picker-month"),
            ).toHaveTextContent("Month");
            expect(screen.getByTestId("birthday-picker-day")).toHaveTextContent(
                "Day",
            );
            expect(
                screen.getByTestId("birthday-picker-year"),
            ).toHaveTextContent("Year");
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

            // Assert
            expect(
                screen.getByTestId("birthday-picker-month"),
            ).toHaveTextContent("Jul");
            expect(screen.getByTestId("birthday-picker-day")).toHaveTextContent(
                "19",
            );
            expect(
                screen.getByTestId("birthday-picker-year"),
            ).toHaveTextContent("2021");
            expect(screen.queryByRole("alert")).not.toBeInTheDocument();
        });

        it("renders with a invalid default future value", () => {
            // Arrange
            jest.useRealTimers();
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

            // Assert
            expect(
                screen.getByTestId("birthday-picker-month"),
            ).toHaveTextContent("Jul");
            expect(screen.getByTestId("birthday-picker-day")).toHaveTextContent(
                "20",
            );
            expect(
                screen.getByTestId("birthday-picker-year"),
            ).toHaveTextContent("2021");
        });

        it("renders an error with a invalid default future value", async () => {
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

            // Assert
            expect(
                screen.getByTestId("birthday-picker-month"),
            ).toHaveTextContent("Month");
            expect(screen.getByTestId("birthday-picker-day")).toHaveTextContent(
                "Day",
            );
            expect(
                screen.getByTestId("birthday-picker-year"),
            ).toHaveTextContent("Year");
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
            expect(screen.getByRole("alert")).toBeInTheDocument();
        });
    });

    describe("onChange", () => {
        beforeEach(() => {
            jest.useFakeTimers();
        });

        afterEach(() => {
            jest.runOnlyPendingTimers();
            jest.useRealTimers();
        });

        it("onChange triggers when a new value is selected", async () => {
            // Arrange
            const onChange = jest.fn();

            // Act
            render(<BirthdayPicker onChange={onChange} />);

            userEvent.click(screen.getByTestId("birthday-picker-month"));
            const monthOption = await screen.findByRole("option", {
                name: "Jul",
            });
            userEvent.click(monthOption, undefined, {
                skipPointerEventsCheck: true,
            });

            userEvent.click(screen.getByTestId("birthday-picker-day"));
            const dayOption = await screen.findByRole("option", {name: "5"});
            userEvent.click(dayOption, undefined, {
                skipPointerEventsCheck: true,
            });

            userEvent.click(screen.getByTestId("birthday-picker-year"));
            // const yearOption = await screen.findByTestId(
            //     "birthday-picker-year-2021",
            // );
            const yearOption = await screen.findByRole("option", {
                name: "2021",
            });
            userEvent.click(yearOption, undefined, {
                skipPointerEventsCheck: true,
            });

            // Assert
            expect(onChange).toHaveBeenCalledWith("2021-07-05");
        });

        it("onChange triggers multiple times when a new value is selected", async () => {
            // Arrange
            const onChange = jest.fn();
            render(<BirthdayPicker onChange={onChange} />);
            // Pick one date
            userEvent.click(screen.getByTestId("birthday-picker-month"));
            const monthOption = await screen.findByRole("option", {
                name: "Jul",
            });
            userEvent.click(monthOption, undefined, {
                skipPointerEventsCheck: true,
            });

            userEvent.click(screen.getByTestId("birthday-picker-day"));
            const dayOption = await screen.findByRole("option", {name: "5"});

            userEvent.click(dayOption, undefined, {
                skipPointerEventsCheck: true,
            });

            userEvent.click(screen.getByTestId("birthday-picker-year"));
            const yearOption = await screen.findByRole("option", {
                name: "2021",
            });
            userEvent.click(yearOption, undefined, {
                skipPointerEventsCheck: true,
            });

            // Act
            // Pick Another Date
            userEvent.click(screen.getByTestId("birthday-picker-month"));
            const monthOptionNew = await screen.findByRole("option", {
                name: "Aug",
            });
            userEvent.click(monthOptionNew, undefined, {
                skipPointerEventsCheck: true,
            });

            userEvent.click(screen.getByTestId("birthday-picker-day"));
            const dayOptionNew = await screen.findByRole("option", {name: "9"});
            userEvent.click(dayOptionNew, undefined, {
                skipPointerEventsCheck: true,
            });

            userEvent.click(screen.getByTestId("birthday-picker-year"));
            const yearOptionNew = await screen.findByRole("option", {
                name: "2020",
            });
            userEvent.click(yearOptionNew, undefined, {
                skipPointerEventsCheck: true,
            });

            // Assert
            expect(onChange).toHaveBeenLastCalledWith("2020-08-09");
        });

        it("onChange triggers when a new value is selected after a default value is set", async () => {
            // Arrange
            const onChange = jest.fn();

            // Act
            render(
                <BirthdayPicker
                    defaultValue="2017-07-17"
                    onChange={onChange}
                />,
            );

            userEvent.click(screen.getByTestId("birthday-picker-month"));
            const monthOption = await screen.findByRole("option", {
                name: "Aug",
            });
            userEvent.click(monthOption, undefined, {
                skipPointerEventsCheck: true,
            });

            userEvent.click(screen.getByTestId("birthday-picker-day"));
            const dayOption = await screen.findByRole("option", {name: "9"});

            userEvent.click(dayOption, undefined, {
                skipPointerEventsCheck: true,
            });

            userEvent.click(screen.getByTestId("birthday-picker-year"));
            const yearOption = await screen.findByRole("option", {
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
            let maybeInstance: ?BirthdayPicker = null;

            // Act
            render(
                <BirthdayPicker
                    defaultValue="2017-07-17"
                    onChange={onChange}
                    ref={(node) => (maybeInstance = node)}
                />,
            );

            if (!maybeInstance) {
                throw new Error("BirthdayPicker instance is undefined");
            }
            const instance = maybeInstance;

            // This test was written by calling methods on the instance because
            // react-window (used by SingleSelect) doesn't show all of the items
            // in the dropdown.
            instance.handleMonthChange("1");
            instance.handleDayChange("31");
            instance.handleYearChange("2021");

            // Assert
            expect(onChange).toHaveBeenCalledWith(null);
        });

        it("onChange triggers only one null when multiple invalid values are selected after a default value is set", async () => {
            // Arrange
            const onChange = jest.fn();

            // Act
            render(
                <BirthdayPicker
                    defaultValue="2021-02-31"
                    onChange={onChange}
                />,
            );

            userEvent.click(screen.getByTestId("birthday-picker-year"));
            const yearOption = await screen.findByRole("option", {
                name: "2020",
            });
            userEvent.click(yearOption, undefined, {
                skipPointerEventsCheck: true,
            });

            // Assert
            expect(onChange).toHaveBeenCalledTimes(1);
        });
    });

    describe("labels", () => {
        const translatedLabels: $Shape<Labels> = {
            month: "Mes",
            day: "Día",
            year: "Año",
            errorMessage: "Por favor ingrese una fecha valida.",
        };

        beforeEach(() => {
            jest.useRealTimers();
            DateMock.advanceTo(today);
        });

        it.each([defaultLabels.month, defaultLabels.day, defaultLabels.year])(
            "renders the placeholder as %s",
            (label) => {
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
        ])("renders the translated placeholder as %s", (translatedLabel) => {
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
            expect(
                screen.getByText(translatedLabels.errorMessage),
            ).toBeInTheDocument();
        });
    });
});
