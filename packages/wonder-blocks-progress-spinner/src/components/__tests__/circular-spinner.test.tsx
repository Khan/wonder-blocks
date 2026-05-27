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
            const root = screen.getByTestId("root-spinner");
            expect(root.tagName).toBe("DIV");
            expect(root.querySelector("svg")).toBeInTheDocument();
        });
    });

    describe("size", () => {
        test.each([
            ["xsmall", 16],
            ["small", 24],
            ["medium", 48],
            ["large", 96],
        ] as const)("renders %s at %ipx", (size, expected) => {
            // Arrange / Act
            const {container} = render(<CircularSpinner size={size} />);

            // Assert
            const svg = container.querySelector("svg")!;
            expect(svg).toHaveAttribute("width", String(expected));
            expect(svg).toHaveAttribute("height", String(expected));
            expect(svg).toHaveAttribute(
                "viewBox",
                `0 0 ${expected} ${expected}`,
            );
        });

        test("defaults to 'large' (96px) when size is not provided", () => {
            // Arrange / Act
            const {container} = render(<CircularSpinner />);

            // Assert
            const svg = container.querySelector("svg")!;
            expect(svg).toHaveAttribute("width", "96");
        });
    });

    describe("light", () => {
        test("renders the dark fill by default", () => {
            // Arrange / Act
            const {container} = render(<CircularSpinner />);

            // Assert
            const path = container.querySelector("path")!;
            // offBlack50 is the dark variant
            expect(path.getAttribute("style")).toMatch(/fill:/);
            expect(path.getAttribute("style")).not.toMatch(/#fff|white/i);
        });

        test("renders a white fill when light is true", () => {
            // Arrange / Act
            const {container} = render(<CircularSpinner light={true} />);

            // Assert
            const path = container.querySelector("path")!;
            expect(path.getAttribute("style")).toMatch(/#fff|white/i);
        });
    });

    describe("style", () => {
        test("applies the provided style to the root element", () => {
            // Arrange / Act
            render(
                <CircularSpinner
                    testId="styled-spinner"
                    style={{marginTop: 20}}
                />,
            );

            // Assert
            const root = screen.getByTestId("styled-spinner");
            expect(root).toHaveStyle({marginTop: "20px"});
        });
    });
});
