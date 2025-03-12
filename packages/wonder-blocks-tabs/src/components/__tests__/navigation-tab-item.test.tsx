import * as React from "react";
import {render, screen} from "@testing-library/react";
import Link from "@khanacademy/wonder-blocks-link";
import {NavigationTabItem} from "../navigation-tab-item";

describe("NavigationTabItem", () => {
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
    });
});
