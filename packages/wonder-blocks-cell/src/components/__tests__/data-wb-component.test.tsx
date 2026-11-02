/* eslint-disable testing-library/no-node-access, testing-library/no-container */
import * as React from "react";
import {render, screen} from "@testing-library/react";

import CompactCell from "../compact-cell";
import DetailCell from "../detail-cell";

describe("data-wb-component", () => {
    it.each([
        ["CompactCell", <CompactCell key="1" title="Title" />],
        ["DetailCell", <DetailCell key="2" title="Title" />],
    ])("should set the %s name on the root element", (name, element) => {
        // Arrange
        const {container} = render(element);

        // Act
        // NOTE: The root element doesn't expose a role or a test id.
        const root = container.firstChild;

        // Assert
        expect(root).toHaveAttribute("data-wb-component", name);
    });

    it.each([
        [
            "CompactCell",
            <CompactCell key="1" title="Title" onClick={() => {}} />,
        ],
        ["DetailCell", <DetailCell key="2" title="Title" onClick={() => {}} />],
    ])(
        "should set the %s name on the root element when it is clickable",
        (name, element) => {
            // Arrange
            render(element);

            // Act
            const root = screen.getByRole("button");

            // Assert
            expect(root).toHaveAttribute("data-wb-component", name);
        },
    );
});
