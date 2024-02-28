import * as React from "react";
import {render, screen} from "@testing-library/react";
import * as ReactRouterDOM from "react-router-dom";

import {HeadingSmall} from "@khanacademy/wonder-blocks-typography";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";

import plusIcon from "@phosphor-icons/core/regular/plus.svg";
import ActionItem from "../action-item";

jest.mock("react-router-dom", () => ({
    __esModule: true,
    ...jest.requireActual("react-router-dom"),
    Link: jest.fn().mockReturnValue(<a href="/link">some link</a>),
}));

describe("ActionItem", () => {
    it("should render with disabled styles", () => {
        // Arrange

        // Act
        render(<ActionItem href="/foo" label="Example" disabled={true} />);

        // Assert
        expect(screen.getByRole("menuitem")).toHaveAttribute(
            "aria-disabled",
            "true",
        );
    });

    it("should render an anchor if there's no router", () => {
        // Arrange

        // Act
        render(<ActionItem href="/foo" label="Example" />);

        // Assert
        // eslint-disable-next-line testing-library/no-node-access
        expect(document.querySelectorAll("a")).toHaveLength(1);
    });

    it("should render a Link if there's a router", () => {
        // Arrange
        const linkSpy = jest.spyOn(ReactRouterDOM, "Link");

        // Act
        render(
            <ReactRouterDOM.MemoryRouter>
                <ActionItem href="/foo" label="Example" />
            </ReactRouterDOM.MemoryRouter>,
        );

        // Assert
        expect(linkSpy).toHaveBeenCalled();
    });

    it("should set the lang attribute if it's passed down", () => {
        // Arrange

        // Act
        render(<ActionItem label="Español" lang="es" />);

        // Assert
        expect(screen.getByText("Español")).toHaveAttribute("lang", "es");
    });

    it("should allow passing an accessory", () => {
        // Arrange

        // Act
        render(
            <ActionItem
                label="ActionItem"
                leftAccessory={<PhosphorIcon icon={plusIcon} role="img" />}
            />,
        );

        // Assert
        expect(screen.getByRole("img")).toBeInTheDocument();
    });

    it("should allow passing a custom label", () => {
        // Arrange

        // Act
        render(
            <ActionItem
                label={<HeadingSmall>A heading as an item</HeadingSmall>}
            />,
        );

        // Assert
        expect(screen.getByRole("heading")).toBeInTheDocument();
    });
});
