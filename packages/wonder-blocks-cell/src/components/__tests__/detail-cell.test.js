// @flow
import * as React from "react";
import {render, screen} from "@testing-library/react";

import {HeadingMedium} from "@khanacademy/wonder-blocks-typography";

import DetailCell from "../detail-cell.js";

describe("DetailCell", () => {
    it("should render the default DetailCell component", () => {
        // Arrange

        // Act
        render(<DetailCell title="Detail cell" />);

        // Assert
        expect(screen.getByText("Detail cell")).toBeInTheDocument();
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
                subtitle1={
                    <HeadingMedium>Detail cell subtitle 1</HeadingMedium>
                }
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
                subtitle2={
                    <HeadingMedium>Detail cell subtitle 2</HeadingMedium>
                }
            />,
        );

        // Assert
        expect(
            screen.getByRole("heading", {name: "Detail cell subtitle 2"}),
        ).toBeInTheDocument();
    });
});
