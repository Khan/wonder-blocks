// @flow
import React from "react";
import {mount} from "enzyme";

import ModalLauncherPositioner from "./modal-launcher-positioner";

describe("ModalLauncherPositioner", () => {
    test("Clicking the backdrop closes the modal", (done) => {
        let clickedBackdrop = false;

        // When `closeModal` is triggered, confirm that it happened _after_ the
        // backdrop was clicked, and end the test.
        const closeModal = () => {
            expect(clickedBackdrop).toBe(true);
            done();
        };

        // We use `mount` instead of `shallow` here, because the component's
        // click handler expects actual DOM events.
        const wrapper = mount(
            <ModalLauncherPositioner closeModal={closeModal}>
                <button>Hello, world!</button>
            </ModalLauncherPositioner>,
        );

        clickedBackdrop = true;
        wrapper.simulate("click");
    });

    test("Clicking the modal content does not close the modal", () => {
        const closeModal = jest.fn();

        // We use `mount` instead of `shallow` here, because the component's
        // click handler expects actual DOM events.
        const wrapper = mount(
            <ModalLauncherPositioner closeModal={closeModal}>
                <button>Hello, world!</button>
            </ModalLauncherPositioner>,
        );

        wrapper.find("button").simulate("click");
        expect(closeModal).not.toHaveBeenCalled();
    });
});
