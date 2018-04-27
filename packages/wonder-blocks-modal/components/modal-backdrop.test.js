// @flow
import React from "react";
import {mount} from "enzyme";

import ModalBackdrop from "./modal-backdrop";

describe("ModalBackdrop", () => {
    test("Clicking the backdrop triggers `onClickBackdrop`", () => {
        const onClickBackdrop = jest.fn();

        // We use `mount` instead of `shallow` here, because the component's
        // click handler expects actual DOM events.
        const wrapper = mount(
            <ModalBackdrop onClickBackdrop={onClickBackdrop}>
                <button>Hello, world!</button>
            </ModalBackdrop>,
        );

        expect(onClickBackdrop).not.toHaveBeenCalled();
        wrapper.simulate("click");
        expect(onClickBackdrop).toHaveBeenCalled();
    });

    test("Clicking the modal content does not trigger `onClickBackdrop`", () => {
        const onClickBackdrop = jest.fn();

        // We use `mount` instead of `shallow` here, because the component's
        // click handler expects actual DOM events.
        const wrapper = mount(
            <ModalBackdrop onClickBackdrop={onClickBackdrop}>
                <button>Hello, world!</button>
            </ModalBackdrop>,
        );

        wrapper.find("button").simulate("click");
        expect(onClickBackdrop).not.toHaveBeenCalled();
    });
});
