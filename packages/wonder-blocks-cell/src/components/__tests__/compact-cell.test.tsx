import * as React from "react";
import {render, screen} from "@testing-library/react";

import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {Heading} from "@khanacademy/wonder-blocks-typography";
import caretRightIcon from "@phosphor-icons/core/regular/caret-right.svg";

import CompactCell from "../compact-cell";

describe("CompactCell", () => {
    it("should render the default CompactCell component", () => {
        // Arrange

        // Act
        render(<CompactCell title="Compact cell" />);

        // Assert
        expect(screen.getByText("Compact cell")).toBeInTheDocument();
    });

    it("should render the title using a Typography element", () => {
        // Arrange

        // Act
        render(<CompactCell title={<Heading>Compact cell</Heading>} />);

        // Assert
        expect(
            screen.getByRole("heading", {name: "Compact cell"}),
        ).toBeInTheDocument();
    });

    it("should render the leftAccessory", () => {
        // Arrange

        // Act
        render(
            <CompactCell
                title="Compact cell"
                leftAccessory={
                    <PhosphorIcon
                        icon={caretRightIcon}
                        aria-label="Caret icon"
                    />
                }
            />,
        );

        // Assert
        expect(screen.getByLabelText("Caret icon")).toBeInTheDocument();
    });

    it("should render the rightAccessory", () => {
        // Arrange

        // Act
        render(
            <CompactCell
                title="Compact cell"
                rightAccessory={
                    <PhosphorIcon
                        icon={caretRightIcon}
                        aria-label="Caret icon"
                    />
                }
            />,
        );

        // Assert
        expect(screen.getByLabelText("Caret icon")).toBeInTheDocument();
    });

    it("should add testId to the content wrapper", () => {
        // Arrange

        // Act
        render(<CompactCell title="Compact cell" testId="cellId" />);

        // Assert
        expect(screen.getByTestId("cellId")).toHaveTextContent("Compact cell");
    });

    it("should add a button if onClick is set", () => {
        // Arrange

        // Act
        render(<CompactCell title="Compact cell" onClick={jest.fn()} />);

        // Assert
        expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("should allow clicking the cell if onClick is set", () => {
        // Arrange
        const onClickMock = jest.fn();
        render(<CompactCell title="Compact cell" onClick={onClickMock} />);

        // Act
        screen.getByRole("button").click();

        // Assert
        expect(onClickMock).toHaveBeenCalled();
    });
});
