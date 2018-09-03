import {ModalLauncher, StandardModal} from "@khanacademy/wonder-blocks-modal";
import Button from "@khanacademy/wonder-blocks-button";
import {Body} from "@khanacademy/wonder-blocks-typography";
import {
    describe,
    expect,
    test,
    render,
    simulate,
    waitForSelectorToAppear,
    waitForSelectorToDisappear,
} from "@khanacademy/vite-helpers";

describe("Modal", () => {
    test("StandardModal", async () => {
        // focus the window
        await simulate({type: "mousemove", clientX: 1, clientY: 1});
        await simulate({type: "click"});

        const standardModal = ({closeModal}: any) => (
            <StandardModal
                title="Title"
                subtitle="You're reading the subtitle!"
                content={
                    <Body tag="p">
                        {
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est."
                        }
                    </Body>
                }
                footer={
                    // TODO(mdr): Use Wonder Blocks Button.
                    <Button onClick={closeModal} testId="close-modal">
                        Close modal
                    </Button>
                }
            />
        );

        await render(
            <ModalLauncher modal={standardModal}>
                {({openModal}) => (
                    <Button onClick={openModal}>Standard modal</Button>
                )}
            </ModalLauncher>,
        );

        // open the modal
        await simulate({type: "mousemove", clientX: 50, clientY: 25});
        await simulate({type: "click"});
        await waitForSelectorToAppear(`[data-test-id="close-modal"]`);
        // TODO: remove hover state from buttons under the modal backdrop
        await simulate({type: "mousemove", clientX: 512, clientY: 384});
        await expect(document.body).toMatchScreenshot();

        // tab repeatedly to verify that the focus trap works
        await simulate({type: "keypress", key: "tab"});
        await expect(document.body).toMatchScreenshot();
        await simulate({type: "keypress", key: "tab"});
        await expect(document.body).toMatchScreenshot();

        // get the location of the close button and move the mouse over it
        const closeButton = document.querySelector(
            `[data-test-id="close-modal"]`,
        );
        const bounds = closeButton.getBoundingClientRect();
        await simulate({
            type: "mousemove",
            clientX: bounds.left + bounds.width / 2,
            clientY: bounds.top + bounds.height / 2,
        });
        await expect(document.body).toMatchScreenshot();

        // test that closing the modal works
        await simulate({type: "click"});
        await waitForSelectorToDisappear(`[data-test-id="close-modal"]`);
        await expect(document.body).toMatchScreenshot();
    });
});
