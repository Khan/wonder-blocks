import * as React from "react";
import {render, screen} from "@testing-library/react";

import Accordion from "../accordion";
import AccordionSection from "../accordion-section";

describe("data-wb-component", () => {
    it("should set the Accordion name on the root element", () => {
        // Arrange
        render(
            <Accordion>
                <AccordionSection header="Section">Content</AccordionSection>
                <AccordionSection header="Section 2">Content</AccordionSection>
            </Accordion>,
        );

        // Act
        const root = screen.getByRole("list");

        // Assert
        expect(root).toHaveAttribute("data-wb-component", "Accordion");
    });

    it("should set the AccordionSection name on the root element", () => {
        // Arrange
        render(
            <AccordionSection header="Section" testId="section">
                Content
            </AccordionSection>,
        );

        // Act
        const root = screen.getByTestId("section");

        // Assert
        expect(root).toHaveAttribute("data-wb-component", "AccordionSection");
    });
});
