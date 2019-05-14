// @flow
import * as React from "react";
import * as ReactDOM from "react-dom";
import {mount} from "enzyme";

import {ModalLauncherPortalAttributeName} from "./constants.js";
import maybeGetPortalMountedModalHostElement from "./maybe-get-portal-mounted-modal-host-element.js";
import ModalLauncher from "../components/modal-launcher.js";
import OnePaneDialog from "../components/one-pane-dialog/one-pane-dialog.js";

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
        const wrapper = mount(nodes);
        const candidateElement = wrapper.find("button")[0];

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

            const wrapper = mount(modal);
            const candidateElement = wrapper.find("button")[0];

            // Act
            const result = maybeGetPortalMountedModalHostElement(
                candidateElement,
            );

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
                const wrapper = mount(launcher);
                wrapper.find("button").simulate("click");
            };

            const actAndAssert = (node) => {
                if (node) {
                    // Act
                    const candidateElement = ReactDOM.findDOMNode(node);
                    const result = maybeGetPortalMountedModalHostElement(
                        candidateElement,
                    );

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
