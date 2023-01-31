// @flow
import * as React from "react";
import {render, screen} from "@testing-library/react";
import * as Data from "../data.js";

describe("WonderBlocksData.adapter", () => {
    it("should render children when configuration arrays are empty", () => {
        // Arrange
        const children = <div>CONTENT</div>;

        // Act
        render(Data.adapter(children, []));

        // Assert
        expect(screen.getByText("CONTENT")).toBeInTheDocument();
    });

    it("should render like we expect", () => {
        // Snapshot test is handy to visualize what's going on and help debug
        // test failures of the other cases. The other cases assert specifics.
        // Arrange
        const children = <div>CONTENT</div>;

        // Act
        const {container} = render(
            Data.adapter(children, () =>
                Promise.resolve(("INTERCEPTED!": any)),
            ),
        );

        // Assert
        expect(container).toMatchInlineSnapshot(`
            <div>
              <div>
                CONTENT
              </div>
            </div>
        `);
    });
});
