import * as React from "react";
import * as ReactDOM from "react-dom";
import {render, screen} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";

import Button from "@khanacademy/wonder-blocks-button";
import {ModalLauncherPortalAttributeName} from "./constants";
import maybeGetPortalMountedModalHostElement from "./maybe-get-portal-mounted-modal-host-element";
import ModalLauncher from "../components/modal-launcher";
import OnePaneDialog from "../components/one-pane-dialog";

describe("maybeGetPortalMountedModalHostElement", () => {
    test("when candidate is null, returns null", async () => {
        // Arrange
        const candidateElement = null;

        // Act
        const result = maybeGetPortalMountedModalHostElement(candidateElement);

        // Assert
        expect(result).toBeFalsy();
    });

    test("when candidate is not hosted in a modal portal, returns null", async () => {
        // Arrange
        const nodes = (
            <div>
                <div>
                    <Button>Button</Button>
                </div>
            </div>
        );
        render(nodes);
        const candidateElement = await screen.findByRole("button");

        // Act
        const result = maybeGetPortalMountedModalHostElement(candidateElement);

        // Assert
        expect(result).toBeFalsy();
        expect(candidateElement).not.toBe(null);
    });

    describe("hosted in a modal", () => {
        test("modal is not mounted in a modal portal, returns null", async () => {
            // Arrange
            const modalContent = (
                <div>
                    Fake modal things
                    <div>
                        <Button>Candidate</Button>
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
            const candidateElement = await screen.findByRole("button", {
                name: "Candidate",
            });

            // Act
            const result =
                maybeGetPortalMountedModalHostElement(candidateElement);

            // Assert
            expect(result).toBeFalsy();
            expect(candidateElement).not.toBe(null);
        });

        test("modal is mounted in a modal portal, returns host", (done: any) => {
            const arrange = async (checkDone: any) => {
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
                        {({openModal}: any) => (
                            <Button onClick={openModal}>Modal</Button>
                        )}
                    </ModalLauncher>
                );
                render(launcher);
                await userEvent.click(await screen.findByRole("button"));
            };

            const actAndAssert = (node: any) => {
                if (node) {
                    // Act
                    // eslint-disable-next-line import/no-deprecated
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
