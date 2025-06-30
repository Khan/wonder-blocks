import * as React from "react";
import {render, screen} from "@testing-library/react";

import {Heading} from "@khanacademy/wonder-blocks-typography";

import DetailCell from "../detail-cell";

describe("DetailCell", () => {
    it("should render the default DetailCell component", () => {
        // Arrange

        // Act
        render(<DetailCell title="Detail cell" />);

        // Assert
        expect(screen.getByText("Detail cell")).toBeInTheDocument();
    });

    it("should render the title using a Typography element", () => {
        // Arrange

        // Act
        render(<DetailCell title={<Heading>Detail cell title</Heading>} />);

        // Assert
        expect(
            screen.getByRole("heading", {name: "Detail cell title"}),
        ).toBeInTheDocument();
    });

    it("should render the subtitle1 using a plain text", () => {
        // Arrange

        // Act
        render(
            <DetailCell
                title="Detail cell"
                subtitle1="Detail cell subtitle 1"
            />,
        );

        // Assert
        expect(screen.getByText("Detail cell subtitle 1")).toBeInTheDocument();
    });

    it("should render the subtitle1 using a Typography element", () => {
        // Arrange

        // Act
        render(
            <DetailCell
                title="Detail cell"
                subtitle1={<Heading>Detail cell subtitle 1</Heading>}
            />,
        );

        // Assert
        expect(
            screen.getByRole("heading", {name: "Detail cell subtitle 1"}),
        ).toBeInTheDocument();
    });

    it("should render the subtitle2 using a plain text", () => {
        // Arrange

        // Act
        render(
            <DetailCell
                title="Detail cell"
                subtitle2="Detail cell subtitle 2"
            />,
        );

        // Assert
        expect(screen.getByText("Detail cell subtitle 2")).toBeInTheDocument();
    });

    it("should render the subtitle2 using a Typography element", () => {
        // Arrange

        // Act
        render(
            <DetailCell
                title="Detail cell"
                subtitle2={<Heading>Detail cell subtitle 2</Heading>}
            />,
        );

        // Assert
        expect(
            screen.getByRole("heading", {name: "Detail cell subtitle 2"}),
        ).toBeInTheDocument();
    });
});
