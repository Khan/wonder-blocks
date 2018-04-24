// @flow
import React from "react";
import {mount} from "enzyme";

import ModalLauncherPortal from "./modal-launcher-portal.js";

describe("ModalPortal", () => {
    test("Mounts its children in document.body", (done) => {
        // Once the child mounts, check that it was mounted directly-ish into
        // `document.body`, and finish the test.
        const childrenRef = (element) => {
            if (element) {
                // Find the nearest parent, disregarding nodes created by
                // ModalLauncherPortal and by `ReactDOM.render`.
                let parent = element.parentNode;
                while (
                    parent.hasAttribute("data-modal-launcher-portal") ||
                    parent.hasAttribute("data-reactroot")
                ) {
                    parent = parent.parentNode;
                }

                // This nearest parent _should_ be document.body.
                expect(parent).toBe(document.body);
                done();
            }
        };

        const wrapper = mount(
            <ModalLauncherPortal>
                <div ref={childrenRef} />
            </ModalLauncherPortal>,
        );
    });

    test("Children unmount when the portal unmounts", (done) => {
        let unmounted = false;

        // Once the child unmounts, check that it wasn't too early (i.e.
        // check that unmounted is true), and finish the test.
        const childrenRef = (element) => {
            if (!element) {
                expect(unmounted).toBe(true);
                done();
            }
        };

        const wrapper = mount(
            <ModalLauncherPortal>
                <div ref={childrenRef} />
            </ModalLauncherPortal>,
        );

        unmounted = true;
        wrapper.unmount();
    });
});
