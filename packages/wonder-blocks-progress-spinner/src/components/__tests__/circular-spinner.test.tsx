import * as React from "react";
import {render, screen} from "@testing-library/react";

import CircularSpinner from "../circular-spinner";

describe("CircularSpinner", () => {
    describe("testId", () => {
        test("uses 'circular-spinner' as the default testId", () => {
            // Arrange / Act
            render(<CircularSpinner />);

            // Assert
            expect(screen.getByTestId("circular-spinner")).toBeInTheDocument();
        });

        test("uses the provided testId when given", () => {
            // Arrange / Act
            render(<CircularSpinner testId="custom-spinner" />);

            // Assert
            expect(screen.getByTestId("custom-spinner")).toBeInTheDocument();
            expect(
                screen.queryByTestId("circular-spinner"),
            ).not.toBeInTheDocument();
        });

        test("renders the testId on the root wrapping element (not the svg)", () => {
            // Arrange / Act
            render(<CircularSpinner testId="root-spinner" />);

            // Assert
            expect(screen.getByTestId("root-spinner").tagName).toBe("DIV");
        });
    });

    describe("style", () => {
        test("applies the provided style to the root element", () => {
            // Arrange / Act
            render(
                <CircularSpinner
                    testId="styled-spinner"
                    style={{marginBlockStart: 20}}
                />,
            );

            // Assert
            const root = screen.getByTestId("styled-spinner");
            expect(root).toHaveStyle({marginBlockStart: "20px"});
        });
    });
});
