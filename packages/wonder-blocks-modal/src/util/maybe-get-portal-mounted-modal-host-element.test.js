// @flow
import * as React from "react";
import * as ReactDOM from "react-dom";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {ModalLauncherPortalAttributeName} from "./constants.js";
import maybeGetPortalMountedModalHostElement from "./maybe-get-portal-mounted-modal-host-element.js";
import ModalLauncher from "../components/modal-launcher.js";
import OnePaneDialog from "../components/one-pane-dialog.js";

describe("maybeGetPortalMountedModalHostElement", () => {
    test("when candidate is null, returns null", () => {
        // Arrange
        const candidateElement = null;

        // Act
        const result = maybeGetPortalMountedModalHostElement(candidateElement);

        // Assert
        expect(result).toBeFalsy();
    });

    test("when candidate is not hosted in a modal portal, returns null", () => {
        // Arrange
        const nodes = (
            <div>
                <div>
                    <button>Button</button>
                </div>
            </div>
        );
        render(nodes);
        const candidateElement = screen.getByRole("button");

        // Act
        const result = maybeGetPortalMountedModalHostElement(candidateElement);

        // Assert
        expect(result).toBeFalsy();
        expect(candidateElement).not.toBe(null);
    });

    describe("hosted in a modal", () => {
        test("modal is not mounted in a modal portal, returns null", () => {
            // Arrange
            const modalContent = (
                <div>
                    Fake modal things
                    <div>
                        <button>Candidate</button>
                    </div>
                </div>
            );

            const modal = (
                <OnePaneDialog
                    title="Testing"
                    footer="Footer"
                    content={modalContent}
                />
            );

            render(modal);
            const candidateElement = screen.getByRole("button", {
                name: "Candidate",
            });

            // Act
            const result =
                maybeGetPortalMountedModalHostElement(candidateElement);

            // Assert
            expect(result).toBeFalsy();
            expect(candidateElement).not.toBe(null);
        });

        test("modal is mounted in a modal portal, returns host", (done) => {
            const arrange = (checkDone) => {
                // Arrange
                const modalContent = (
                    <div>
                        Fake modal things
                        <div>
                            <span ref={checkDone}>Candidate</span>
                        </div>
                    </div>
                );
                const modal = (
                    <OnePaneDialog
                        title="Testing"
                        footer="Footer"
                        content={modalContent}
                    />
                );
                const launcher = (
                    <ModalLauncher modal={modal}>
                        {({openModal}) => (
                            <button onClick={openModal}>Modal</button>
                        )}
                    </ModalLauncher>
                );
                render(launcher);
                userEvent.click(screen.getByRole("button"));
            };

            const actAndAssert = (node) => {
                if (node) {
                    // Act
                    const candidateElement = ReactDOM.findDOMNode(node);
                    const result =
                        maybeGetPortalMountedModalHostElement(candidateElement);

                    // Assert
                    expect(result).toBeTruthy();

                    const modalPortalElement = result;
                    expect(modalPortalElement).not.toBe(null);

                    const isModalPortal =
                        modalPortalElement &&
                        modalPortalElement.hasAttribute(
                            ModalLauncherPortalAttributeName,
                        );
                    expect(isModalPortal).toBeTruthy();

                    done();
                }
            };

            arrange(actAndAssert);
        });
    });
});
