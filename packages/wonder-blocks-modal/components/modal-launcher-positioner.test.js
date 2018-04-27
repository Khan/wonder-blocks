// @flow
import React from "react";
import {mount} from "enzyme";

import ModalLauncherPositioner from "./modal-launcher-positioner";

describe("ModalLauncherPositioner", () => {
    test("Clicking the backdrop closes the modal", () => {
        const closeModal = jest.fn();

        // We use `mount` instead of `shallow` here, because the component's
        // click handler expects actual DOM events.
        const wrapper = mount(
            <ModalLauncherPositioner closeModal={closeModal}>
                <button>Hello, world!</button>
            </ModalLauncherPositioner>,
        );

        expect(closeModal).not.toHaveBeenCalled();
        wrapper.simulate("click");
        expect(closeModal).toHaveBeenCalled();
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
