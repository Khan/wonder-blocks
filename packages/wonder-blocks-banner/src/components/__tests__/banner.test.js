// @flow
import * as React from "react";
import {render, screen} from "@testing-library/react";

import Button from "@khanacademy/wonder-blocks-button";

import Banner from "../banner";

describe("Banner", () => {
    test("having no `onDismiss` prop causes the 'X' button NOT to appear", () => {
        // Arrange

        // Act
        render(<Banner text="test text" layout="floating" />);

        // Assert
        const button = screen.queryByRole("button");
        expect(button).not.toBeInTheDocument();
    });

    test("passing in `onDismiss` prop causes 'X' button to appear", () => {
        // Arrange

        // Act
        render(
            <Banner text="test text" onDismiss={() => {}} layout="floating" />,
        );

        // Assert
        const button = screen.queryByRole("button");
        expect(button).toBeInTheDocument();
    });

    test("clicking the dismiss button triggers `onDismiss`", () => {
        // Arrange
        const onDismissSpy = jest.fn();
        render(
            <Banner
                text="test text"
                onDismiss={onDismissSpy}
                layout="floating"
            />,
        );

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
                text="test text"
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
                text="test text"
                layout="floating"
                actions={[{title: "some button", onClick: () => {}}]}
            />,
        );

        // Assert
        const link = screen.getByRole("button");
        expect(link).toBeInTheDocument();
    });

    test("passing a custom action causes the action to appear", async () => {
        // Arrange

        // Act
        render(
            <Banner
                text="some text"
                layout="floating"
                actions={[
                    {
                        type: "custom",
                        node: (
                            <Button
                                kind="tertiary"
                                size="small"
                                onClick={() => {}}
                                spinner={true}
                                testId="custom-button-in-banner"
                            >
                                Spinner Button
                            </Button>
                        ),
                    },
                ]}
            />,
        );

        // Assert
        const button = await screen.findByTestId("custom-button-in-banner");
        expect(button).toBeInTheDocument();
    });

    test("passing multiple actions causes multiple actions to appear", async () => {
        // Arrange

        // Act
        render(
            <Banner
                text="test text"
                layout="floating"
                actions={[
                    {title: "button 1", onClick: () => {}},
                    {title: "button 2", onClick: () => {}},
                    {
                        type: "custom",
                        node: (
                            <Button
                                kind="tertiary"
                                size="small"
                                onClick={() => {}}
                                spinner={true}
                            >
                                Spinner Button
                            </Button>
                        ),
                    },
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
                text="test text"
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
                text="test text"
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
                text="test text"
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
        render(<Banner text="test text" layout="floating" />);

        // Assert
        const icon = screen.getByTestId("banner-kind-icon");
        expect(icon).toHaveAttribute("aria-label", "info");
    });

    it.each(["info", "success", "warning", "critical"])(
        "%s kind displays %s icon",
        (kind) => {
            // Arrange

            // Act
            render(<Banner text="test text" kind={kind} layout="floating" />);

            // Assert
            const icon = screen.getByTestId("banner-kind-icon");
            expect(icon).toHaveAttribute("aria-label", kind);
        },
    );

    // Test accessibility

    test("dismiss button has aria label by default", () => {
        // Arrange

        // Act
        render(
            <Banner text="test text" layout="floating" onDismiss={() => {}} />,
        );

        // Assert
        const dismissButton = screen.getByRole("button");
        expect(dismissButton).toHaveAttribute("aria-label", "Dismiss banner.");
    });

    test("dismiss button has the aria label that was passed in", () => {
        // Arrange

        // Act
        render(
            <Banner
                text="test text"
                layout="floating"
                onDismiss={() => {}}
                dismissAriaLabel="Test dismiss aria label"
            />,
        );

        // Assert
        const dismissButton = screen.getByRole("button");
        expect(dismissButton).toHaveAttribute(
            "aria-label",
            "Test dismiss aria label",
        );
    });

    test("buttons have their title as the aria label by default", () => {
        // Arrange

        // Act
        render(
            <Banner
                text="test text"
                layout="floating"
                actions={[{title: "Test button title", onClick: () => {}}]}
            />,
        );

        // Assert
        const actionButton = screen.getByRole("button");
        expect(actionButton).toHaveAttribute("aria-label", "Test button title");
    });

    test("links have their title as the aria label by default", () => {
        // Arrange

        // Act
        render(
            <Banner
                text="test text"
                layout="floating"
                actions={[{title: "Test link title", href: "/"}]}
            />,
        );

        // Assert
        const actionLink = screen.getByRole("link");
        expect(actionLink).toHaveAttribute("aria-label", "Test link title");
    });

    test("buttons use the passed in aria label", () => {
        // Arrange

        // Act
        render(
            <Banner
                text="test text"
                layout="floating"
                actions={[
                    {
                        title: "Test button title",
                        onClick: () => {},
                        ariaLabel: "Button aria label passed in",
                    },
                ]}
            />,
        );

        // Assert
        const actionButton = screen.getByRole("button");
        expect(actionButton).toHaveAttribute(
            "aria-label",
            "Button aria label passed in",
        );
    });

    test("links use the passed in aria label", () => {
        // Arrange

        // Act
        render(
            <Banner
                text="test text"
                layout="floating"
                actions={[
                    {
                        title: "Test link title",
                        href: "/",
                        ariaLabel: "Link aria label passed in",
                    },
                ]}
            />,
        );

        // Assert
        const actionLink = screen.getByRole("link");
        expect(actionLink).toHaveAttribute(
            "aria-label",
            "Link aria label passed in",
        );
    });

    it.each([
        ["info", "status"],
        ["success", "status"],
        ["warning", "alert"],
        ["critical", "alert"],
    ])("%s banners have role: %s", (kind, role) => {
        // Arrange

        // Act
        render(
            <Banner
                text="test text"
                kind={kind}
                layout="floating"
                testId="wonder-blocks-banner-test-id"
            />,
        );

        // Assert
        const banner = screen.getByTestId("wonder-blocks-banner-test-id");
        expect(banner).toHaveAttribute("role", role);
    });

    test("warning banners have aria-live polite", () => {
        // Arrange

        // Act
        render(
            <Banner
                text="test text"
                kind="warning"
                layout="floating"
                testId="wonder-blocks-banner-test-id"
            />,
        );

        // Assert
        const banner = screen.getByTestId("wonder-blocks-banner-test-id");
        expect(banner).toHaveAttribute("aria-live", "polite");
    });

    test("aria-label prop becomes aria-label attribute on the banner", () => {
        // Arrange

        // Act
        render(
            <Banner
                text="test text"
                layout="full-width"
                testId="wonder-blocks-banner-test-id"
                aria-label="This is a banner aria label."
            />,
        );

        // Assert
        const banner = screen.getByTestId("wonder-blocks-banner-test-id");
        expect(banner).toHaveAttribute(
            "aria-label",
            "This is a banner aria label.",
        );
    });
});
