// @flow
import React from "react";
import {shallow, mount} from "enzyme";

import ModalLauncher from "./modal-launcher.js";

describe("ModalLauncher", () => {
    test("Children can launch the modal", () => {
        const wrapper = shallow(
            <ModalLauncher modal={<div />}>
                {({openModal}) => <button onClick={openModal} />}
            </ModalLauncher>,
        );
        expect(wrapper.find("ModalLauncherPortal")).toHaveLength(0);
        wrapper.find("button").simulate("click");
        expect(wrapper.find("ModalLauncherPortal")).toHaveLength(1);
    });

    test("Modal can close itself after launching", (done) => {
        let opened = false;

        // Once the modal mounts, we'll immediately self-close it on the next
        // tick, to test the children's ability to self-close. (We wait a tick
        // because the API for the `children` prop says not to call `closeModal`
        // while rendering.)
        //
        // NOTE(mdr): It would be nice to have this be, like, a close button
        //     that closes when you click it. But that requires the button to
        //     actually _mount_, which means we'd need to do a full DOM render
        //     including `ModalLauncherPortal`, and that seems to be going
        //     beyond the scope of this test. Really we just want to check that
        //     this function receives a `closeModal` argument that works.
        const modalFn = ({closeModal}: {closeModal: () => void}) => {
            expect(opened).toBe(true);
            setImmediate(closeModal);
            return <div />;
        };

        // Once the modal closes, we'll check that it _really_ closed, and
        // finish the test.
        const onClose = () => {
            wrapper.update();
            expect(wrapper.find("ModalLauncherPortal")).toHaveLength(0);
            done();
        };

        // Mount the modal launcher. This shouldn't trigger any closing yet,
        // because we shouldn't be calling the `modal` function yet.
        const wrapper = shallow(
            <ModalLauncher modal={modalFn} onClose={onClose}>
                {({openModal}) => <button onClick={openModal} />}
            </ModalLauncher>,
        );
        expect(wrapper.find("ModalLauncherPortal")).toHaveLength(0);

        // Launch the modal. This should trigger closing, because we'll call
        // the modal function.
        opened = true;
        wrapper.find("button").simulate("click");
        expect(wrapper.find("ModalLauncherPortal")).toHaveLength(1);
    });

    test("Pressing Escape closes the modal", async () => {
        // We mount into a real DOM, in order to simulate and capture real key
        // presses anywhere in the document.
        const wrapper = mount(
            <ModalLauncher modal={<div data-modal-child />}>
                {({openModal}) => <button onClick={openModal} />}
            </ModalLauncher>,
        );

        // Launch the modal.
        wrapper.find("button").simulate("click");
        expect(document.querySelector("[data-modal-child]")).toBeTruthy();

        // Simulate an Escape keypress.
        const event: KeyboardEvent = (document.createEvent("Event"): any);
        event.key = "Escape";
        event.initEvent("keyup", true, true);
        document.dispatchEvent(event);

        // Confirm that the modal is no longer mounted.
        //
        // NOTE(mdr): This might be fragile once React's async rendering lands.
        //     I wonder if we'll be able to force synchronous rendering in unit
        //     tests?
        expect(document.querySelector("[data-modal-child]")).toBeFalsy();
    });

    test("Disable scrolling when the modal is open", () => {
        let savedCloseModal = () => {
            throw new Error(`closeModal wasn't saved`);
        };

        // Rather than test this rigorously, we'll just check that a
        // ScrollDisabler is present, and trust ScrollDisabler to do its job.
        const wrapper = shallow(
            <ModalLauncher
                modal={({closeModal}) => {
                    savedCloseModal = closeModal;
                    return <div data-modal-child />;
                }}
            >
                {({openModal}) => <button onClick={openModal} />}
            </ModalLauncher>,
        );

        // When the modal isn't open yet, there should be no ScrollDisabler.
        expect(wrapper.find("ScrollDisabler")).toHaveLength(0);

        // Launch the modal.
        wrapper.find("button").simulate("click");

        // Now that the modal is open, there should be a ScrollDisabler.
        expect(wrapper.find("ScrollDisabler")).toHaveLength(1);

        // Close the modal.
        savedCloseModal();
        wrapper.update();

        // Now that the modal is closed, there should be no ScrollDisabler.
        expect(wrapper.find("ScrollDisabler")).toHaveLength(0);
    });
});
