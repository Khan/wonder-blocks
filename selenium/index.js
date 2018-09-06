import * as React from "react";
import * as ReactDOM from "react-dom";

import Button from "@khanacademy/wonder-blocks-button";
import {Body} from "@khanacademy/wonder-blocks-typography";
import {ModalLauncher, StandardModal} from "@khanacademy/wonder-blocks-modal";

class App extends React.Component<> {
    renderModal() {
        const standardModal = ({closeModal}) => (
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

        return (
            <ModalLauncher modal={standardModal}>
                {({openModal}) => (
                    <Button onClick={openModal}>Standard modal</Button>
                )}
            </ModalLauncher>
        );
    }

    render() {
        const test = location.search.slice(1).split("=")[1];
        switch (test) {
            case "1":
                return <Button>Hello, world!</Button>;
            case "2":
                return <Button kind="secondary">Hello, world!</Button>;
            case "3":
                return <Button kind="tertiary">Hello, world!</Button>;
            case "4":
                return this.renderModal();
        }
    }
}

ReactDOM.render(<App />, document.body);
