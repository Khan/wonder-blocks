import * as React from "react";
import {render, screen} from "@testing-library/react";
import {sizing} from "@khanacademy/wonder-blocks-tokens";

import Plus from "@phosphor-icons/core/regular/plus.svg";
// mock out the custom icon
import customIcon from "./custom-icon-mock.svg";

import {PhosphorIcon} from "../phosphor-icon";

describe("PhosphorIcon", () => {
    it("forwards the ref to the `span` element", () => {
        // Arrange
        const ref: React.RefObject<HTMLSpanElement> = React.createRef();

        // Act
        render(<PhosphorIcon icon={Plus} ref={ref} />);

        // Assert
        expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    });

    it("applies role to icon", () => {
        // Arrange & Act
        render(<PhosphorIcon icon={Plus} role="img" />);

        // Assert
        expect(screen.getByRole("img")).toBeInTheDocument();
    });

    it("applies aria-label to icon", () => {
        // Arrange & Act
        render(<PhosphorIcon icon={Plus} aria-label="something" role="img" />);

        // Assert
        expect(screen.getByRole("img")).toHaveAttribute(
            "aria-label",
            "something",
        );
    });

    it("applies role=img when aria-label is provided", () => {
        // Arrange & Act
        render(<PhosphorIcon icon={Plus} aria-label="something" />);

        // Assert
        expect(screen.getByRole("img")).toBeInTheDocument();
    });

    describe("size styles", () => {
        it("applies small size by default", () => {
            // Arrange & Act
            render(<PhosphorIcon icon={Plus} testId="phosphor-icon" />);

            // Assert
            const icon = screen.getByTestId("phosphor-icon");
            expect(icon).toHaveStyle({
                width: sizing.size_160,
                height: sizing.size_160,
            });
        });

        it("applies medium size", () => {
            // Arrange & Act
            render(
                <PhosphorIcon
                    icon={Plus}
                    size="medium"
                    testId="phosphor-icon"
                />,
            );

            // Assert
            const icon = screen.getByTestId("phosphor-icon");
            expect(icon).toHaveStyle({
                width: sizing.size_240,
                height: sizing.size_240,
            });
        });

        it("applies large size", () => {
            // Arrange & Act
            render(
                <PhosphorIcon
                    icon={Plus}
                    size="large"
                    testId="phosphor-icon"
                />,
            );

            // Assert
            const icon = screen.getByTestId("phosphor-icon");
            expect(icon).toHaveStyle({
                width: sizing.size_480,
                height: sizing.size_480,
            });
        });

        it("applies xlarge size", () => {
            // Arrange & Act
            render(
                <PhosphorIcon
                    icon={Plus}
                    size="xlarge"
                    testId="phosphor-icon"
                />,
            );

            // Assert
            const icon = screen.getByTestId("phosphor-icon");
            expect(icon).toHaveStyle({
                width: sizing.size_960,
                height: sizing.size_960,
            });
        });
    });

    describe("style customization", () => {
        it("applies custom style prop", () => {
            // Arrange
            const customStyle = {
                margin: "10px",
            };

            // Act
            render(
                <PhosphorIcon
                    icon={Plus}
                    style={customStyle}
                    testId="phosphor-icon"
                />,
            );

            // Assert
            expect(screen.getByTestId("phosphor-icon")).toHaveStyle(
                customStyle,
            );
        });

        it("applies custom color", () => {
            // Arrange
            const customColor = "rgb(255, 0, 0)";

            // Act
            render(
                <PhosphorIcon
                    icon={Plus}
                    color={customColor}
                    testId="phosphor-icon"
                />,
            );

            // Assert
            expect(screen.getByTestId("phosphor-icon")).toHaveStyle({
                backgroundColor: customColor,
            });
        });

        it("defaults to currentColor", () => {
            // Arrange & Act
            render(<PhosphorIcon icon={Plus} testId="phosphor-icon" />);

            // Assert
            expect(screen.getByTestId("phosphor-icon")).toHaveStyle({
                backgroundColor: "currentColor",
            });
        });
    });

    describe("icon rendering", () => {
        it("includes SVG using the maskImage css attribute", () => {
            // Arrange & Act
            render(<PhosphorIcon icon={Plus} testId="phosphor-icon" />);

            // Assert
            expect(screen.getByTestId("phosphor-icon")).toHaveStyle({
                maskImage: `url(${Plus})`,
            });
        });

        it("allows importing an arbitrary SVG file (custom icon)", () => {
            // Arrange & Act
            render(<PhosphorIcon icon={customIcon} testId="phosphor-icon" />);

            // Assert
            expect(screen.getByTestId("phosphor-icon")).toHaveStyle({
                maskImage: `url(${customIcon})`,
            });
        });

        it("applies correct mask properties", () => {
            // Arrange & Act
            render(<PhosphorIcon icon={Plus} testId="phosphor-icon" />);

            // Assert
            const icon = screen.getByTestId("phosphor-icon");
            expect(icon).toHaveStyle({
                maskSize: "100%",
                maskRepeat: "no-repeat",
                maskPosition: "center",
            });
        });
    });

    it("supports `tabIndex`", async () => {
        // Arrange
        const ref: React.RefObject<HTMLSpanElement> = React.createRef();

        // Act
        render(<PhosphorIcon icon={Plus} ref={ref} tabIndex={-1} />);

        // Assert
        expect(ref.current).toHaveAttribute("tabindex", "-1");
    });
});
