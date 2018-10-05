// @flow
import * as React from "react";
import {mount} from "enzyme";

import ModalBackdrop from "./modal-backdrop.js";
import StandardModal from "./standard-modal.js";

const exampleModal = (
    <StandardModal
        content={<div data-modal-content />}
        title="Title"
        footer={<div data-modal-footer />}
    />
);

const exampleModalWithButtons = (
    <StandardModal
        content={
            <div>
                <button data-button-id="1" />
                <button data-button-id="2" />
                <button data-button-id="3" data-last-button />
            </div>
        }
        title="Title"
        footer={<div data-modal-footer />}
    />
);

describe("ModalBackdrop", () => {
    test("Clicking the backdrop triggers `onCloseModal`", () => {
        const onCloseModal = jest.fn();

        // We use `mount` instead of `shallow` here, because the component's
        // click handler expects actual DOM events.
        const wrapper = mount(
            <ModalBackdrop onCloseModal={onCloseModal}>
                {exampleModal}
            </ModalBackdrop>,
        );

        expect(onCloseModal).not.toHaveBeenCalled();

        wrapper.simulate("click");
        expect(onCloseModal).toHaveBeenCalled();
    });

    test("Clicking the modal content does not trigger `onCloseModal`", () => {
        const onCloseModal = jest.fn();

        // We use `mount` instead of `shallow` here, because the component's
        // click handler expects actual DOM events.
        const wrapper = mount(
            <ModalBackdrop onCloseModal={onCloseModal}>
                {exampleModal}
            </ModalBackdrop>,
        );

        wrapper.find("[data-modal-content]").simulate("click");
        expect(onCloseModal).not.toHaveBeenCalled();
    });

    test("Clicking the modal footer does not trigger `onCloseModal`", () => {
        const onCloseModal = jest.fn();

        // We use `mount` instead of `shallow` here, because the component's
        // click handler expects actual DOM events.
        const wrapper = mount(
            <ModalBackdrop onCloseModal={onCloseModal}>
                {exampleModal}
            </ModalBackdrop>,
        );

        wrapper.find("[data-modal-footer]").simulate("click");
        expect(onCloseModal).not.toHaveBeenCalled();
    });

    test("On mount, we focus the last button in the modal", () => {
        const wrapper = mount(
            <ModalBackdrop onCloseModal={() => {}}>
                {exampleModalWithButtons}
            </ModalBackdrop>,
        );

        const lastButton = wrapper.find("[data-last-button]").getDOMNode();
        expect(document.activeElement).toBe(lastButton);
    });

    // TODO(mdr): I haven't figured out how to actually simulate tab keystrokes
    //     or focus events in a way that JSDOM will recognize, so triggering the
    //     global focus handler isn't feasible. I had to do manual testing
    //     instead :( Here's what I had, though!
    test.skip("Tabbing inside the modal wraps around", () => {
        const wrapper = mount(
            <div>
                <button data-button-id="A" />
                <ModalBackdrop onCloseModal={() => {}}>
                    {exampleModalWithButtons}
                </ModalBackdrop>
                <button data-button-id="Z" />
            </div>,
        );

        const buttonA = wrapper.find('[data-button-id="A"]').getDOMNode();
        const button1 = wrapper.find('[data-button-id="1"]').getDOMNode();
        const button2 = wrapper.find('[data-button-id="2"]').getDOMNode();
        const button3 = wrapper.find('[data-button-id="3"]').getDOMNode();
        const buttonZ = wrapper.find('[data-button-id="Z"]').getDOMNode();

        // First, go forward. Confirm that, when we get to button Z, we wrap
        // back to button 1. (I wish we could just simulate tab keypresses!
        // Instead, we depend on the implementation detail that _which_ node you
        // exit from determines where you'll end up.)
        button1.focus();
        expect(document.activeElement).toBe(button1);
        button2.focus();
        expect(document.activeElement).toBe(button2);
        button3.focus();
        expect(document.activeElement).toBe(button3);
        buttonZ.focus();
        expect(document.activeElement).toBe(button1);

        // Then, go backward. Confirm that, when we get to button A, we wrap
        // back to button 3.
        button3.focus();
        expect(document.activeElement).toBe(button3);
        button2.focus();
        expect(document.activeElement).toBe(button2);
        button1.focus();
        expect(document.activeElement).toBe(button1);
        buttonA.focus();
        expect(document.activeElement).toBe(button3);
    });
});
