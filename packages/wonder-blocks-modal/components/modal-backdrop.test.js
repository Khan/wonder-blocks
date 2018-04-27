// @flow
import React from "react";
import {mount} from "enzyme";

import ModalBackdrop from "./modal-backdrop";

describe("ModalBackdrop", () => {
    test("Clicking the backdrop closes the modal", () => {
        const closeModal = jest.fn();

        // We use `mount` instead of `shallow` here, because the component's
        // click handler expects actual DOM events.
        const wrapper = mount(
            <ModalBackdrop closeModal={closeModal}>
                <button>Hello, world!</button>
            </ModalBackdrop>,
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
            <ModalBackdrop closeModal={closeModal}>
                <button>Hello, world!</button>
            </ModalBackdrop>,
        );

        wrapper.find("button").simulate("click");
        expect(closeModal).not.toHaveBeenCalled();
    });
});
