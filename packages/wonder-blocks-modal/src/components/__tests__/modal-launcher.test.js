// @flow
import * as React from "react";
import {mount, shallow} from "enzyme";
import "jest-enzyme";
import {render, screen, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ModalLauncher from "../modal-launcher.js";
import OnePaneDialog from "../one-pane-dialog.js";
import {View} from "@khanacademy/wonder-blocks-core";
import {Body} from "@khanacademy/wonder-blocks-typography";
import Button from "@khanacademy/wonder-blocks-button";

import {unmountAll} from "../../../../../utils/testing/enzyme-shim.js";
import {getElementAttachedToDocument} from "../../../../../utils/testing/get-element-attached-to-document.js";

const wait = (duration: number = 0) =>
    new Promise((resolve, reject) => setTimeout(resolve, duration));

const exampleModal = (
    <OnePaneDialog
        title="Modal launcher test"
        content={<div data-modal-child />}
    />
);

describe("ModalLauncher", () => {
    beforeEach(() => {
        jest.useRealTimers();
    });

    afterEach(() => {
        unmountAll();
        if (document.body) {
            document.body.innerHTML = "";
        }
    });

    window.scrollTo = jest.fn();

    test("Children can launch the modal", async () => {
        // Arrange
        // We need the elements in the DOM document, it seems, for this test
        // to work. Changing to testing-library will likely fix this.
        const containerDiv = getElementAttachedToDocument("container");
        const wrapper = mount(
            <ModalLauncher modal={exampleModal}>
                {({openModal}) => <button onClick={openModal} />}
            </ModalLauncher>,
            {attachTo: containerDiv},
        );

        // Act
        wrapper.find("button").simulate("click");
        await wait();

        const portal = global.document.querySelector(
            "[data-modal-launcher-portal]",
        );

        // Assert
        expect(portal).toBeInstanceOf(HTMLDivElement);
    });

    test("Modal can be manually opened and closed", () => {
        const wrapper = mount(
            <ModalLauncher
                modal={exampleModal}
                opened={false}
                onClose={() => {}}
            />,
        );
        expect(wrapper.find("[data-modal-launcher-portal]")).not.toExist();
        wrapper.setProps({opened: true});
        expect(wrapper.find("[data-modal-launcher-portal]")).toExist();
        wrapper.setProps({opened: false});
        expect(wrapper.find("[data-modal-launcher-portal]")).not.toExist();
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
        const modalFn = ({closeModal}: {|closeModal: () => void|}) => {
            expect(opened).toBe(true);
            setTimeout(closeModal, 0);
            return exampleModal;
        };

        // Once the modal closes, we'll check that it _really_ closed, and
        // finish the test.
        const onClose = () => {
            wrapper.update();
            expect(wrapper.find("ModalBackdrop")).toHaveLength(0);
            done();
        };

        // Mount the modal launcher. This shouldn't trigger any closing yet,
        // because we shouldn't be calling the `modal` function yet.
        const wrapper = mount(
            <ModalLauncher modal={modalFn} onClose={onClose}>
                {({openModal}) => <button onClick={openModal} />}
            </ModalLauncher>,
        );
        expect(
            global.document.querySelector("[data-modal-launcher-portal]"),
        ).toBeNull();

        // Launch the modal. This should trigger closing, because we'll call
        // the modal function.
        opened = true;
        wrapper.find("button").simulate("click");
        const portal = global.document.querySelector(
            "[data-modal-launcher-portal]",
        );
        expect(portal instanceof HTMLDivElement).toBe(true);
    });

    test("Pressing Escape closes the modal", async () => {
        // We mount into a real DOM, in order to simulate and capture real key
        // presses anywhere in the document.
        const wrapper = mount(
            <ModalLauncher modal={exampleModal}>
                {({openModal}) => <button onClick={openModal} />}
            </ModalLauncher>,
        );

        // Launch the modal.
        wrapper.find("button").simulate("click");
        expect(document.querySelector("[data-modal-child]")).toBeTruthy();

        // Simulate an Escape keypress.
        const event: KeyboardEvent = (document.createEvent("Event"): any);
        // $FlowIgnore[cannot-write]
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
        const wrapper = mount(
            <ModalLauncher
                modal={({closeModal}) => {
                    savedCloseModal = closeModal;
                    return exampleModal;
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

    test("using `opened` and `children` should warn", () => {
        // Arrange
        jest.spyOn(console, "warn");

        // Act
        render(
            // $FlowIgnore
            <ModalLauncher
                modal={exampleModal}
                opened={false}
                onClose={() => {}}
            >
                {({openModal}) => <button onClick={openModal} />}
            </ModalLauncher>,
        );

        // Assert
        // eslint-disable-next-line no-console
        expect(console.warn).toHaveBeenCalledWith(
            "'children' and 'opened' can't be used together",
        );
    });

    test("using `opened` without `onClose` should throw", () => {
        // Arrange
        jest.spyOn(console, "warn");

        // Act
        // $FlowIgnore
        render(<ModalLauncher modal={exampleModal} opened={false} />);

        // Assert
        // eslint-disable-next-line no-console
        expect(console.warn).toHaveBeenCalledWith(
            "'onClose' should be used with 'opened'",
        );
    });

    test("using neither `opened` nor `children` should throw", () => {
        // Arrange
        jest.spyOn(console, "warn");

        // Act
        // $FlowIgnore
        render(<ModalLauncher modal={exampleModal} />);

        // Assert
        // eslint-disable-next-line no-console
        expect(console.warn).toHaveBeenCalledWith(
            "either 'children' or 'opened' must be set",
        );
    });

    test("If backdropDismissEnabled set to false, clicking the backdrop does not trigger `onClose`", () => {
        // Arrange
        const onClose = jest.fn();

        // We use `mount` instead of `shallow` here, because the component's
        // click handler expects actual DOM events.
        const wrapper = mount(
            <ModalLauncher
                onClose={onClose}
                modal={exampleModal}
                opened={true}
                backdropDismissEnabled={false}
            />,
        );

        // Act
        const backdrop = wrapper.find("[data-modal-launcher-portal]").first();
        backdrop.simulate("click");

        // Assert
        expect(onClose).not.toHaveBeenCalled();
    });

    test("if modal is launched, move focus inside the modal", async () => {
        // Arrange
        const wrapper = mount(
            <ModalLauncher modal={exampleModal}>
                {({openModal}) => (
                    <button onClick={openModal} data-last-focused-button />
                )}
            </ModalLauncher>,
        );

        const lastButton = wrapper
            .find("[data-last-focused-button]")
            .getDOMNode();
        // force focus
        lastButton.focus();

        // Act
        // Launch the modal.
        wrapper.find("button").simulate("click");

        // wait for styles to be applied
        await wait();

        // Assert
        expect(document.activeElement).not.toBe(lastButton);
    });

    test("if modal is closed, return focus to the last element focused outside the modal", async () => {
        // Arrange
        let savedCloseModal = () => {
            throw new Error(`closeModal wasn't saved`);
        };

        render(
            <View>
                <Button>Not last element button</Button>
                <ModalLauncher
                    modal={({closeModal}) => {
                        savedCloseModal = closeModal;
                        return exampleModal;
                    }}
                >
                    {({openModal}) => (
                        <button
                            onClick={openModal}
                            data-test-id="data-last-focused-button"
                        />
                    )}
                </ModalLauncher>
            </View>,
        );

        const lastButton = await screen.findByTestId(
            "data-last-focused-button",
        );

        // Launch the modal.
        userEvent.click(lastButton);

        // Act
        savedCloseModal(); // close the modal

        // Assert
        await waitFor(() => {
            expect(lastButton).toHaveFocus();
        });
    });

    test("if `closedFocusId` is passed, shift focus to specified element after the modal closes", async () => {
        // Arrange
        const ModalLauncherWrapper = () => {
            const [opened, setOpened] = React.useState(false);

            const handleOpen = () => {
                console.log("opening modal");
                setOpened(true);
            };

            const handleClose = () => {
                console.log("closing modal");
                setOpened(false);
            };

            return (
                <View style={{gap: 20}}>
                    <Button>Top of page (should not receive focus)</Button>
                    <Button id="button-to-focus-on" testId="focused-button">
                        Focus here after close
                    </Button>
                    <Button
                        testId="launcher-button"
                        onClick={() => handleOpen()}
                    >
                        Open modal
                    </Button>
                    <ModalLauncher
                        onClose={() => handleClose()}
                        opened={opened}
                        closedFocusId="button-to-focus-on"
                        modal={({closeModal}) => (
                            <OnePaneDialog
                                title="Triggered from action menu"
                                content={<View>Hello World</View>}
                                footer={
                                    <Button
                                        testId="modal-close-button"
                                        onClick={closeModal}
                                    >
                                        Close Modal
                                    </Button>
                                }
                            />
                        )}
                    />
                </View>
            );
        };

        render(<ModalLauncherWrapper />);

        // Act
        // Launch modal
        const launcherButton = await screen.findByTestId("launcher-button");
        userEvent.click(launcherButton);

        // Close modal
        const modalCloseButton = await screen.findByTestId(
            "modal-close-button",
        );
        userEvent.click(modalCloseButton);

        // Assert
        const focusedButton = await screen.findByTestId("focused-button");
        await waitFor(() => {
            expect(focusedButton).toHaveFocus();
        });
    });

    test("testId should be added to the Backdrop", () => {
        // Arrange
        const wrapper = mount(
            <ModalLauncher
                opened={true}
                onClose={jest.fn()}
                modal={<div role="dialog">dialog</div>}
                testId="test-id-example"
            />,
        );

        // Act
        const backdrop = wrapper.find("[data-modal-launcher-portal]").first();

        // Assert
        expect(backdrop.prop("testId")).toBe("test-id-example");
    });
});
