// @flow
import * as React from "react";
import * as ReactDOM from "react-dom";
import {mount} from "enzyme";

import getNearestModalLauncherPortal from "./get-nearest-modal-launcher-portal.js";
import ModalLauncher from "../components/modal-launcher.js";
import StandardModal from "../components/standard-modal.js";

describe("getNearestModalLauncherPortal", () => {
    test("when candidate is null, returns null", () => {
        // Arrange
        const candidateElement = null;

        // Act
        const result = getNearestModalLauncherPortal(candidateElement);

        // Assert
        expect(result).toBe(null);
    });

    test("when candidate is not hosted in modal, returns null", () => {
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
        const result = getNearestModalLauncherPortal(candidateElement);

        // Assert
        expect(result).toBe(null);
        expect(candidateElement).not.toBe(null);
    });

    test("when candidate is hosted in modal, returns modal portal", (done) => {
        const runTest = (node) => {
            if (node) {
                const candidateElement = ReactDOM.findDOMNode(node);

                // Act
                const result = getNearestModalLauncherPortal(candidateElement);

                // Assert
                expect(result).not.toBe(null);
                expect(candidateElement).not.toBe(null);
                done();
            }
        };

        // Arrange
        const modalContent = (
            <div>
                Fake modal things
                <div>
                    <span ref={runTest}>Candidate</span>
                </div>
            </div>
        );
        const modal = (
            <StandardModal
                title="Testing"
                footer="Footer"
                content={modalContent}
            />
        );
        const launcher = (
            <ModalLauncher modal={modal}>
                {({openModal}) => <button onClick={openModal}>Modal</button>}
            </ModalLauncher>
        );
        const wrapper = mount(launcher);
        wrapper.find("button").simulate("click");
    });
});
