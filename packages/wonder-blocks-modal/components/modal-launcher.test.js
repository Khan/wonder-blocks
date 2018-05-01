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
        const modalFn = ({closeModal}) => {
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

    test("Pressing Escape closes the modal", () => {
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

        // Simulate an Escape keypress. This will happen synchronously, because
        // we're using `dispatchEvent`.
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
});
