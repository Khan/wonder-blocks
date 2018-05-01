// @flow
import React from "react";
import {shallow, mount} from "enzyme";

import ModalBackdrop from "./modal-backdrop.js";
import StandardModal from "./standard-modal.js";

const exampleModal = (
    <StandardModal
        content={<div data-modal-content />}
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

    test("Adds an `onClickCloseButton` prop to the provided modal", () => {
        const onCloseModal = jest.fn();

        const wrapper = shallow(
            <ModalBackdrop onCloseModal={onCloseModal}>
                <StandardModal
                    title="Title"
                    content={<div />}
                    footer={<div />}
                />
            </ModalBackdrop>,
        );

        // Assert that the modal inside the backdrop was created from the
        // provided modal: their titles match.
        const modalInBackdrop = wrapper.find("StandardModal");
        expect(modalInBackdrop.prop("title")).toBe(exampleModal.props.title);

        // Confirm that we also added a new `onClickCloseButton` prop, which is
        // wired to our `onCloseModal` callback.
        const onClickCloseButton = modalInBackdrop.prop("onClickCloseButton");
        expect(onClickCloseButton).toBeDefined();
        expect(onCloseModal).not.toHaveBeenCalled();
        onClickCloseButton();
        expect(onCloseModal).toHaveBeenCalled();
    });

    test(
        "We merge with the modal's existing `onClickCloseButton`, " +
            "rather than overwriting it",
        () => {
            const onCloseModal = jest.fn();
            const customOnClickCloseButton = jest.fn();

            const wrapper = shallow(
                <ModalBackdrop onCloseModal={onCloseModal}>
                    <StandardModal
                        title="Title"
                        content={<div />}
                        footer={<div />}
                        onClickCloseButton={customOnClickCloseButton}
                    />
                </ModalBackdrop>,
            );

            // Assert that the modal inside the backdrop was created from the
            // provided modal: their titles match.
            const modalInBackdrop = wrapper.find("StandardModal");
            expect(modalInBackdrop.prop("title")).toBe(
                exampleModal.props.title,
            );

            // Confirm that we also added a new `onClickCloseButton` prop, which
            // is wired to our `onCloseModal` callback _and_ the custom
            // `onClickCloseButton` provided to the modal element itself.
            const onClickCloseButton = modalInBackdrop.prop(
                "onClickCloseButton",
            );
            expect(onClickCloseButton).toBeDefined();
            expect(onCloseModal).not.toHaveBeenCalled();
            expect(customOnClickCloseButton).not.toHaveBeenCalled();
            onClickCloseButton();
            expect(onCloseModal).toHaveBeenCalled();
            expect(customOnClickCloseButton).toHaveBeenCalled();
        },
    );
});
