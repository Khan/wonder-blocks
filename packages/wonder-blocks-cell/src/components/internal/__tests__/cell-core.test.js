// @flow
import * as React from "react";
import {render, screen} from "@testing-library/react";

import CellCore from "../cell-core.js";

describe("CellCore", () => {
    it("should render the CellCore component", () => {
        // Arrange

        // Act
        render(
            <CellCore>
                <div>cell core content</div>
            </CellCore>,
        );

        // Assert
        expect(screen.getByText("cell core content")).toBeInTheDocument();
    });
});
