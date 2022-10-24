// @flow
import * as React from "react";
import {render, screen} from "@testing-library/react";

import Banner from "../banner.js";

describe("Banner", () => {
    test("having no `onDismiss` prop causes the 'X' button NOT to appear", () => {
        // Arrange

        // Act
        render(<Banner text="" layout="floating" />);

        // Assert
        const button = screen.queryByRole("button");
        expect(button).not.toBeInTheDocument();
    });

    test("passing in `onDismiss` prop causes 'X' button to appear", () => {
        // Arrange

        // Act
        render(<Banner text="" onDismiss={() => {}} layout="floating" />);

        // Assert
        const button = screen.queryByRole("button");
        expect(button).toBeInTheDocument();
    });

    test("clicking the dismiss button triggers `onDismiss`", () => {
        // Arrange
        const onDismissSpy = jest.fn();
        render(<Banner text="" onDismiss={onDismissSpy} layout="floating" />);

        // Act
        const button = screen.getByRole("button");
        button.click();

        // Assert
        expect(onDismissSpy).toHaveBeenCalled();
    });

    test("passing an href into an `actions` element causes a Link to appear", () => {
        // Arrange

        // Act
        render(
            <Banner
                text=""
                layout="floating"
                actions={[{title: "some link", href: "/", onClick: () => {}}]}
            />,
        );

        // Assert
        const link = screen.getByRole("link");
        expect(link).toBeInTheDocument();
    });

    test("passing an onClick without href into an `actions` element causes a Button to appear", () => {
        // Arrange

        // Act
        render(
            <Banner
                text=""
                layout="floating"
                actions={[{title: "some button", onClick: () => {}}]}
            />,
        );

        // Assert
        const link = screen.getByRole("button");
        expect(link).toBeInTheDocument();
    });

    test("passing multiple actions causes multiple actions to appear", async () => {
        // Arrange

        // Act
        render(
            <Banner
                text=""
                layout="floating"
                actions={[
                    {title: "button 1", onClick: () => {}},
                    {title: "button 2", onClick: () => {}},
                    {title: "button 3", onClick: () => {}},
                ]}
            />,
        );

        // Assert
        const buttons = await screen.findAllByRole("button");
        expect(buttons).toHaveLength(3);
    });

    test("clicking a button triggers the onClick from the action prop", () => {
        // Arrange
        const actionSpy = jest.fn();

        render(
            <Banner
                text=""
                layout="floating"
                actions={[{title: "a button", onClick: actionSpy}]}
            />,
        );

        // Act
        const button = screen.getByRole("button");
        button.click();

        // Assert
        expect(actionSpy).toHaveBeenCalled();
    });

    test("clicking a link triggers the onClick from the action prop", () => {
        // Arrange
        const actionSpy = jest.fn();

        render(
            <Banner
                text=""
                layout="floating"
                actions={[{title: "a link", onClick: actionSpy, href: "/"}]}
            />,
        );

        // Act
        const link = screen.getByRole("link");
        link.click();

        // Assert
        expect(actionSpy).toHaveBeenCalled();
    });

    test("action href becomes link href", () => {
        // Arrange

        render(
            <Banner
                text=""
                layout="floating"
                actions={[{title: "a button", onClick: () => {}, href: "/foo"}]}
            />,
        );

        // Act
        const link = screen.getByRole("link");

        // Assert
        expect(link).toHaveAttribute("href", "/foo");
    });

    // Test kind

    test("default kind displays info icon", () => {
        // Arrange

        // Act
        render(<Banner text="" layout="floating" />);

        // Assert
        const icon = screen.getByTestId("banner-kind-icon");
        expect(icon).toHaveAttribute("aria-label", "info");
    });

    it.each(["info", "success", "warning", "critical"])(
        "%s kind displays %s icon",
        (kind) => {
            // Arrange

            // Act
            render(<Banner text="" kind={kind} layout="floating" />);

            // Assert
            const icon = screen.getByTestId("banner-kind-icon");
            expect(icon).toHaveAttribute("aria-label", kind);
        },
    );
});
