import * as React from "react";
import {render, screen} from "@testing-library/react";
import Link from "@khanacademy/wonder-blocks-link";
import {NavigationTabItem} from "../navigation-tab-item";

describe("NavigationTabItem", () => {
    const children = <Link href="/link-1">Link 1</Link>;

    it("should render a list item element", async () => {
        // Arrange
        render(
            <NavigationTabItem>
                <Link href="/link-1">Link 1</Link>
            </NavigationTabItem>,
        );

        // Act
        const listItem = await screen.findByRole("listitem");

        // Assert
        expect(listItem).toBeInTheDocument();
    });

    it("should render the provided children", async () => {
        // Arrange
        render(
            <NavigationTabItem>
                <Link href="/link-1">Link 1</Link>
            </NavigationTabItem>,
        );

        // Act
        const link1 = await screen.findByRole("link", {name: "Link 1"});

        // Assert
        expect(link1).toBeInTheDocument();
    });

    describe("props", () => {
        it("should use the id prop for the listitem element", async () => {
            // Arrange
            const id = "unique-id";
            render(<NavigationTabItem id={id}>{children}</NavigationTabItem>);

            // Act
            const listitem = await screen.findByRole("listitem");

            // Assert
            expect(listitem).toHaveAttribute("id", id);
        });

        it("should use the testId prop for the listitem element", async () => {
            // Arrange
            const testId = "test-id";
            render(
                <NavigationTabItem testId={testId}>
                    {children}
                </NavigationTabItem>,
            );

            // Act
            const listItem = await screen.findByRole("listitem");

            // Assert
            expect(listItem).toHaveAttribute("data-testid", testId);
        });
    });

    describe("a11y", () => {
        describe("axe", () => {
            it("should have no a11y violations", async () => {
                // Arrange
                // Act
                const {container} = render(
                    // Wrap NavigationTabItem in <ul> since NavigationTabs
                    // renders the list element
                    <ul>
                        <NavigationTabItem>
                            <Link href="/link-1">Link 1</Link>
                        </NavigationTabItem>
                    </ul>,
                );

                // Assert
                await expect(container).toHaveNoA11yViolations();
            });
        });

        describe("ARIA", () => {
            it("should set aria props on the listitem element", async () => {
                // Arrange
                const ariaDescribedBy = "aria-describedby-value";
                render(
                    <NavigationTabItem aria-describedby={ariaDescribedBy}>
                        {children}
                    </NavigationTabItem>,
                );

                // Act
                const listItem = await screen.findByRole("listitem");

                // Assert
                expect(listItem).toHaveAttribute(
                    "aria-describedby",
                    ariaDescribedBy,
                );
            });
        });
    });
});
