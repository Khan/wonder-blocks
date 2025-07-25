import * as React from "react";
import {render, screen} from "@testing-library/react";
import * as ReactRouterDOM from "react-router-dom";
import * as ReactRouterDOMV5Compat from "react-router-dom-v5-compat";

import {Heading} from "@khanacademy/wonder-blocks-typography";
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

    // NOTE(john): After upgrading to React Router v6, the Link component
    // appears to not be mockable, it's an object instead of a function.
    it.skip("should render a Link if there's a router", () => {
        // Arrange
        const linkSpy = jest.spyOn(ReactRouterDOMV5Compat, "Link");

        // Act
        render(
            <ReactRouterDOM.MemoryRouter>
                <ReactRouterDOMV5Compat.CompatRouter>
                    <ActionItem href="/foo" label="Example" />
                </ReactRouterDOMV5Compat.CompatRouter>
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
        render(<ActionItem label={<Heading>A heading as an item</Heading>} />);

        // Assert
        expect(screen.getByRole("heading")).toBeInTheDocument();
    });

    it("should apply aria-current if active is true", () => {
        // Arrange

        // Act
        render(<ActionItem label="Example" active={true} />);

        // Assert
        expect(screen.getByRole("menuitem")).toHaveAttribute(
            "aria-current",
            "true",
        );
    });

    it("should allow passing subtitle1", () => {
        // Arrange

        // Act
        render(<ActionItem label="ActionItem" subtitle1={"Subtitle 1"} />);

        // Assert
        expect(screen.getByText("Subtitle 1")).toBeInTheDocument();
    });

    it("should allow passing subtitle2", () => {
        // Arrange

        // Act
        render(<ActionItem label="ActionItem" subtitle2={"Subtitle 2"} />);

        // Assert
        expect(screen.getByText("Subtitle 2")).toBeInTheDocument();
    });
});
