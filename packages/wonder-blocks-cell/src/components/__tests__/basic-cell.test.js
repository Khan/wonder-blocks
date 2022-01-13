// @flow
import * as React from "react";
import {render, screen} from "@testing-library/react";

import Icon, {icons} from "@khanacademy/wonder-blocks-icon";
import {HeadingMedium} from "@khanacademy/wonder-blocks-typography";

import BasicCell from "../basic-cell.js";

describe("BasicCell", () => {
    it("should render the default BasicCell component", () => {
        // Arrange

        // Act
        render(<BasicCell title="Basic cell" />);

        // Assert
        expect(screen.getByText("Basic cell")).toBeInTheDocument();
    });

    it("should render the title using a Typography element", () => {
        // Arrange

        // Act
        render(<BasicCell title={<HeadingMedium>Basic cell</HeadingMedium>} />);

        // Assert
        expect(
            screen.getByRole("heading", {name: "Basic cell"}),
        ).toBeInTheDocument();
    });

    it("should render the leftAccessory", () => {
        // Arrange

        // Act
        render(
            <BasicCell
                title="Basic cell"
                leftAccessory={
                    <Icon icon={icons.caretRight} aria-label="Caret icon" />
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
            <BasicCell
                title="Basic cell"
                rightAccessory={
                    <Icon icon={icons.caretRight} aria-label="Caret icon" />
                }
            />,
        );

        // Assert
        expect(screen.getByLabelText("Caret icon")).toBeInTheDocument();
    });

    it("should add testId to the content wrapper", () => {
        // Arrange

        // Act
        render(<BasicCell title="Basic cell" testId="cellId" />);

        // Assert
        expect(screen.getByTestId("cellId")).toHaveTextContent("Basic cell");
    });
});
