/* eslint-disable testing-library/no-node-access, testing-library/no-container */
import * as React from "react";
import {render, screen} from "@testing-library/react";

import DrawerDialog from "../drawer-dialog";
import DrawerLauncher from "../drawer-launcher";
import FlexibleDialog from "../flexible-dialog";
import ModalDialog from "../modal-dialog";
import ModalFooter from "../modal-footer";
import ModalHeader from "../modal-header";
import ModalLauncher from "../modal-launcher";
import ModalPanel from "../modal-panel";
import OnePaneDialog from "../one-pane-dialog";

describe("data-wb-component", () => {
    it.each([
        [
            "ModalDialog",
            <ModalDialog key="1" aria-labelledby="title">
                Content
            </ModalDialog>,
        ],
        [
            "OnePaneDialog",
            <OnePaneDialog
                key="2"
                title="Title"
                content={<div>Content</div>}
            />,
        ],
        [
            "FlexibleDialog",
            <FlexibleDialog
                key="3"
                title="Title"
                content={<div>Content</div>}
            />,
        ],
        [
            "DrawerDialog",
            <DrawerDialog key="4" title="Title" content={<div>Content</div>} />,
        ],
        ["ModalFooter", <ModalFooter key="5">Footer</ModalFooter>],
    ])("should set the %s name on the root element", (name, element) => {
        // Arrange
        const {container} = render(element);

        // Act
        // NOTE: The root element doesn't expose a role or a test id (the
        // role and test id are applied to an inner element).
        const root = container.firstChild;

        // Assert
        expect(root).toHaveAttribute("data-wb-component", name);
    });

    it("should set the ModalPanel name on the root element", () => {
        // Arrange
        render(<ModalPanel content={<div>Content</div>} testId="modal" />);

        // Act
        const root = screen.getByTestId("modal-panel");

        // Assert
        expect(root).toHaveAttribute("data-wb-component", "ModalPanel");
    });

    it("should set the ModalHeader name on the root element", () => {
        // Arrange
        render(<ModalHeader title="Title" titleId="title" testId="header" />);

        // Act
        const root = screen.getByTestId("header");

        // Assert
        expect(root).toHaveAttribute("data-wb-component", "ModalHeader");
    });

    it("should set the ModalLauncher name on the backdrop", async () => {
        // Arrange
        render(
            <ModalLauncher
                modal={
                    <OnePaneDialog title="Title" content={<div>Content</div>} />
                }
                opened={true}
                onClose={() => {}}
                testId="launcher"
            />,
        );

        // Act
        const backdrop = await screen.findByTestId("launcher");

        // Assert
        expect(backdrop).toHaveAttribute("data-wb-component", "ModalLauncher");
    });

    it("should set the DrawerLauncher name on the backdrop", async () => {
        // Arrange
        render(
            <DrawerLauncher
                alignment="inlineEnd"
                modal={
                    <DrawerDialog title="Title" content={<div>Content</div>} />
                }
                opened={true}
                onClose={() => {}}
                testId="launcher"
            />,
        );

        // Act
        const backdrop = await screen.findByTestId("launcher");

        // Assert
        expect(backdrop).toHaveAttribute("data-wb-component", "DrawerLauncher");
    });
});
