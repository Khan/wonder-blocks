// This file is auto-generated by gen-snapshot-tests.js
// Do not edit this file.  To make changes to these snapshot tests:
//   1. edit the markdown documentation files in the package,
//        packages/wonder-blocks-modal
//   2. Run `yarn run gen-snapshot-tests`.
import React from "react";
import renderer from "react-test-renderer";

// Mock react-dom as jest doesn't like findDOMNode.
jest.mock("react-dom");
import ModalLauncher from "./components/modal-launcher.js";
import OnePaneDialog from "./components/one-pane-dialog/one-pane-dialog.js";
import ModalDialog from "./components/modal-dialog.js";
import ModalPanel from "./components/modal-panel.js";
import ModalHeader from "./components/modal-header.js";
import ModalFooter from "./components/modal-footer.js";

describe("wonder-blocks-modal", () => {
    it("example 1", () => {
        const React = require("react");
        const {StyleSheet} = require("aphrodite");

        const {Title} = require("@khanacademy/wonder-blocks-typography");
        const {View} = require("@khanacademy/wonder-blocks-core");
        const Button = require("@khanacademy/wonder-blocks-button").default;
        const {Strut} = require("@khanacademy/wonder-blocks-layout");
        const Spacing = require("@khanacademy/wonder-blocks-spacing").default;

        const styles = StyleSheet.create({
            example: {
                padding: Spacing.xLarge,
                alignItems: "center",
            },
        });

        const modalInitialFocus = ({closeModal}) => (
            <OnePaneDialog
                title="Single-line title"
                content={
                    <View>
                        <View>
                            <label>Label</label>
                            <input type="text" />
                            <Strut size={Spacing.medium} />
                            <Button id="initial-focus">
                                Button to receive initial focus
                            </Button>
                        </View>
                    </View>
                }
                footer={
                    <React.Fragment>
                        <Button kind="tertiary" onClick={closeModal}>
                            Cancel
                        </Button>
                        <Strut size={Spacing.medium} />
                        <Button>Submit</Button>
                    </React.Fragment>
                }
            />
        );

        const example = (
            <View style={styles.example}>
                <ModalLauncher
                    onClose={() => window.alert("you closed the modal")}
                    initialFocusId="initial-focus"
                    modal={modalInitialFocus}
                >
                    {({openModal}) => (
                        <Button onClick={openModal}>
                            Open modal with initial focus
                        </Button>
                    )}
                </ModalLauncher>
            </View>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("example 2", () => {
        const React = require("react");
        const {StyleSheet} = require("aphrodite");

        const Spacing = require("@khanacademy/wonder-blocks-spacing").default;
        const {View} = require("@khanacademy/wonder-blocks-core");
        const Button = require("@khanacademy/wonder-blocks-button").default;

        const styles = StyleSheet.create({
            example: {
                padding: Spacing.xLarge,
                alignItems: "center",
            },
            row: {
                flexDirection: "row",
                justifyContent: "flex-end",
            },
            footer: {
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
            },
        });

        class ExerciseModal extends React.Component {
            render() {
                const {
                    current,
                    handleNextButton,
                    handlePrevButton,
                    question,
                    total,
                } = this.props;

                return (
                    <OnePaneDialog
                        title="Exercises"
                        content={
                            <View>
                                <Body>
                                    This is the current question: {question}
                                </Body>
                            </View>
                        }
                        footer={
                            <View style={styles.footer}>
                                <LabelLarge>
                                    Step {current + 1} of {total}
                                </LabelLarge>
                                <View style={styles.row}>
                                    <Button
                                        kind="tertiary"
                                        onClick={handlePrevButton}
                                    >
                                        Previous
                                    </Button>
                                    <Strut size={16} />
                                    <Button
                                        kind="primary"
                                        onClick={handleNextButton}
                                    >
                                        Next
                                    </Button>
                                </View>
                            </View>
                        }
                    />
                );
            }
        }

        class ExerciseContainer extends React.Component {
            constructor(props) {
                super(props);

                this.state = {
                    currentQuestion: 0,
                };
            }

            handleNextButton() {
                this.setState({
                    currentQuestion: Math.min(
                        this.state.currentQuestion + 1,
                        this.props.questions.length - 1,
                    ),
                });
            }

            handlePrevButton() {
                this.setState({
                    currentQuestion: Math.max(
                        0,
                        this.state.currentQuestion - 1,
                    ),
                });
            }

            render() {
                return (
                    <ModalLauncher
                        onClose={() => console.log("you closed the modal")}
                        modal={
                            <ExerciseModal
                                question={
                                    this.props.questions[
                                        this.state.currentQuestion
                                    ]
                                }
                                current={this.state.currentQuestion}
                                total={this.props.questions.length}
                                handlePrevButton={() => this.handlePrevButton()}
                                handleNextButton={() => this.handleNextButton()}
                            />
                        }
                    >
                        {({openModal}) => (
                            <Button onClick={openModal}>
                                Open flexible modal
                            </Button>
                        )}
                    </ModalLauncher>
                );
            }
        }

        const example = (
            <View style={styles.example}>
                <ExerciseContainer
                    questions={[
                        "First question",
                        "Second question",
                        "Last question",
                    ]}
                />
            </View>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("example 3", () => {
        const {StyleSheet} = require("aphrodite");
        const {View} = require("@khanacademy/wonder-blocks-core");
        const {Title, Body} = require("@khanacademy/wonder-blocks-typography");
        const {MediaLayout} = require("@khanacademy/wonder-blocks-layout");

        const styles = StyleSheet.create({
            previewSizer: {
                height: 512,
            },

            modalPositioner: {
                // Checkerboard background
                backgroundImage:
                    "linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)",
                backgroundSize: "20px 20px",
                backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",

                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",

                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
            },
        });

        const styleSheets = {
            mdOrLarger: StyleSheet.create({
                customModal: {
                    maxWidth: 300,
                    maxHeight: 200,
                },

                below: {
                    background: "url(/blue-blob.png)",
                    backgroundSize: "cover",
                    width: 294,
                    height: 306,
                    position: "absolute",
                    top: 0,
                    left: -60,
                },

                above: {
                    background: "url(/asteroid.png)",
                    backgroundSize: "cover",
                    width: 418,
                    height: 260,
                    position: "absolute",
                    top: -10,
                    left: -5,
                },
            }),
        };

        const example = (
            <View style={styles.previewSizer}>
                <View style={styles.modalPositioner}>
                    <MediaLayout styleSheets={styleSheets}>
                        {({styles}) => (
                            <OnePaneDialog
                                style={styles.customModal}
                                title="Single-line title"
                                content={
                                    <View>
                                        <Body>Hello World!</Body>
                                    </View>
                                }
                                onClose={() =>
                                    alert("This would close the modal.")
                                }
                                below={<View style={styles.below} />}
                                above={<View style={styles.above} />}
                            />
                        )}
                    </MediaLayout>
                </View>
            </View>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("example 4", () => {
        const {StyleSheet} = require("aphrodite");
        const {View} = require("@khanacademy/wonder-blocks-core");
        const {Body} = require("@khanacademy/wonder-blocks-typography");
        const Button = require("@khanacademy/wonder-blocks-button").default;
        const Spacing = require("@khanacademy/wonder-blocks-spacing").default;

        const styles = StyleSheet.create({
            example: {
                padding: Spacing.xLarge,
                alignItems: "center",
            },

            title: {
                marginBottom: Spacing.medium,
            },

            modalContent: {
                margin: "0 auto",
                maxWidth: 544,
            },

            above: {
                background: "url(/modal-above.png)",
                width: 874,
                height: 551,
                position: "absolute",
                top: 40,
                left: -140,
            },

            below: {
                background: "url(/modal-below.png)",
                width: 868,
                height: 521,
                position: "absolute",
                top: -100,
                left: -300,
            },
        });

        const onePaneDialog = ({closeModal}) => (
            <OnePaneDialog
                title="Title"
                subtitle="You're reading the subtitle!"
                above={<View style={styles.above} />}
                below={<View style={styles.below} />}
                content={
                    <View style={styles.modalContent}>
                        <Body tag="p">
                            {
                                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est."
                            }
                        </Body>
                    </View>
                }
                footer={<Button onClick={closeModal}>Close modal</Button>}
            />
        );

        const example = (
            <View style={styles.example}>
                <ModalLauncher modal={onePaneDialog}>
                    {({openModal}) => (
                        <Button onClick={openModal}>OnePaneDialog</Button>
                    )}
                </ModalLauncher>
            </View>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("example 5", () => {
        const {StyleSheet} = require("aphrodite");
        const {View} = require("@khanacademy/wonder-blocks-core");
        const {Body} = require("@khanacademy/wonder-blocks-typography");
        const Button = require("@khanacademy/wonder-blocks-button").default;
        const Spacing = require("@khanacademy/wonder-blocks-spacing").default;

        const styles = StyleSheet.create({
            example: {
                padding: Spacing.xLarge,
                alignItems: "center",
            },

            modalContent: {
                margin: "0 auto",
                maxWidth: 544,
            },
        });

        const exampleModal = ({closeModal}) => (
            <OnePaneDialog
                title="Backdrop dismission disabled"
                content={
                    <View style={styles.modalContent}>
                        <Body tag="p">
                            {
                                "This window won't be closed if you click/tap outside of the ModalPanel. To do that, you can still press `esc` or use the close button located on the top right."
                            }
                        </Body>
                    </View>
                }
            />
        );

        const example = (
            <View style={styles.example}>
                <ModalLauncher
                    modal={exampleModal}
                    backdropDismissEnabled={false}
                >
                    {({openModal}) => (
                        <Button onClick={openModal}>Open modal</Button>
                    )}
                </ModalLauncher>
            </View>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("example 6", () => {
        const React = require("react");

        const {Title} = require("@khanacademy/wonder-blocks-typography");
        const {View} = require("@khanacademy/wonder-blocks-core");
        const Button = require("@khanacademy/wonder-blocks-button").default;
        const {
            ActionMenu,
            ActionItem,
        } = require("@khanacademy/wonder-blocks-dropdown");

        class Example extends React.Component {
            constructor(props) {
                super(props);
                this.state = {
                    opened: false,
                };
            }

            handleOpen() {
                console.log("opening modal");
                this.setState({opened: true});
            }

            handleClose() {
                console.log("closing modal");
                this.setState({opened: false});
            }

            render() {
                return (
                    <View>
                        <ActionMenu menuText="actions">
                            <ActionItem
                                label="Open modal"
                                onClick={() => this.handleOpen()}
                            />
                        </ActionMenu>
                        <ModalLauncher
                            onClose={() => this.handleClose()}
                            opened={this.state.opened}
                            modal={({closeModal}) => (
                                <OnePaneDialog
                                    title="Triggered from action menu"
                                    content={
                                        <View>
                                            <Title>Hello, world</Title>
                                        </View>
                                    }
                                    footer={
                                        <Button onClick={closeModal}>
                                            Close Modal
                                        </Button>
                                    }
                                />
                            )}
                        />
                    </View>
                );
            }
        }

        const example = <Example />;
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("example 7", () => {
        const {StyleSheet} = require("aphrodite");
        const {View} = require("@khanacademy/wonder-blocks-core");
        const {Body} = require("@khanacademy/wonder-blocks-typography");
        const Button = require("@khanacademy/wonder-blocks-button").default;

        const styles = StyleSheet.create({
            previewSizer: {
                height: 512,
            },

            modalPositioner: {
                // Checkerboard background
                backgroundImage:
                    "linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)",
                backgroundSize: "20px 20px",
                backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",

                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",

                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
            },

            modalContent: {
                margin: "0 auto",
                maxWidth: 544,
            },

            above: {
                background: "url(/modal-above.png)",
                backgroundSize: "cover",
                width: 787,
                height: 496,
                position: "absolute",
                top: -20,
                left: -100,
            },
        });

        const example = (
            <View style={styles.previewSizer}>
                <View style={styles.modalPositioner}>
                    <OnePaneDialog
                        title="Single-line title"
                        subtitle="Subtitle that provides additional context to the title"
                        content={
                            <View style={styles.modalContent}>
                                <Body>
                                    {
                                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est."
                                    }
                                </Body>
                                <Body>
                                    {
                                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est."
                                    }
                                </Body>
                                <Body>
                                    {
                                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est."
                                    }
                                </Body>
                            </View>
                        }
                        footer={<Button type="button">Button (no-op)</Button>}
                        showCloseButton={false}
                        onClose={() => alert("This would close the modal.")}
                        above={<View style={styles.above} />}
                    />
                </View>
            </View>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("example 8", () => {
        const {StyleSheet} = require("aphrodite");
        const {View} = require("@khanacademy/wonder-blocks-core");
        const {Body} = require("@khanacademy/wonder-blocks-typography");
        const Button = require("@khanacademy/wonder-blocks-button").default;
        const Spacing = require("@khanacademy/wonder-blocks-spacing").default;
        const {
            Breadcrumbs,
            BreadcrumbsItem,
        } = require("@khanacademy/wonder-blocks-breadcrumbs");
        const {MediaLayout} = require("@khanacademy/wonder-blocks-layout");

        const styles = StyleSheet.create({
            previewSizer: {
                height: 512,
            },

            modalPositioner: {
                // Checkerboard background
                backgroundImage:
                    "linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)",
                backgroundSize: "20px 20px",
                backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",

                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",

                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
            },
        });

        const defaultStyles = StyleSheet.create({
            row: {
                flexDirection: "row",
                justifyContent: "flex-end",
            },
            button: {
                marginRight: Spacing.medium,
            },
        });

        const smallStyles = StyleSheet.create({
            row: {
                flexDirection: "column-reverse",
                width: "100%",
            },
            button: {
                marginBottom: Spacing.medium,
            },
        });

        const styleSheets = {
            mdOrLarger: defaultStyles,
            small: smallStyles,
        };

        const Footer = () => (
            <MediaLayout styleSheets={styleSheets}>
                {({styles}) => (
                    <View style={styles.row}>
                        <Button style={styles.button} kind="tertiary">
                            Tertiary action
                        </Button>
                        <Button style={styles.button} kind="tertiary">
                            Secondary action
                        </Button>
                        <Button style={styles.button}>Primary action</Button>
                    </View>
                )}
            </MediaLayout>
        );

        const example = (
            <View style={styles.previewSizer}>
                <View style={styles.modalPositioner}>
                    <OnePaneDialog
                        title="Multi-line title that wraps to show how this component adjusts with longer content"
                        breadcrumbs={
                            <Breadcrumbs>
                                <BreadcrumbsItem>Bread</BreadcrumbsItem>
                                <BreadcrumbsItem>Crumb</BreadcrumbsItem>
                                <BreadcrumbsItem>Trail</BreadcrumbsItem>
                            </Breadcrumbs>
                        }
                        content={
                            <View>
                                <Body>
                                    {
                                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est."
                                    }
                                </Body>
                            </View>
                        }
                        footer={<Footer />}
                        onClose={() => alert("This would close the modal.")}
                    />
                </View>
            </View>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("example 9", () => {
        const {StyleSheet} = require("aphrodite");
        const {View} = require("@khanacademy/wonder-blocks-core");
        const {Body} = require("@khanacademy/wonder-blocks-typography");
        const {Strut} = require("@khanacademy/wonder-blocks-layout");
        const {LabelLarge} = require("@khanacademy/wonder-blocks-typography");
        const Button = require("@khanacademy/wonder-blocks-button").default;
        const {MediaLayout} = require("@khanacademy/wonder-blocks-layout");

        const exampleStyles = StyleSheet.create({
            previewSizer: {
                height: 512,
            },

            modalPositioner: {
                // Checkerboard background
                backgroundImage:
                    "linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)",
                backgroundSize: "20px 20px",
                backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",

                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",

                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
            },
        });

        const styles = StyleSheet.create({
            row: {
                flexDirection: "row",
                justifyContent: "flex-end",
            },
            footer: {
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
            },
        });

        const example = (
            <View style={exampleStyles.previewSizer}>
                <View style={exampleStyles.modalPositioner}>
                    <OnePaneDialog
                        title="Dialog with multi-step footer"
                        content={
                            <View>
                                <Body>
                                    {
                                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est."
                                    }
                                </Body>
                            </View>
                        }
                        footer={
                            <View style={styles.footer}>
                                <LabelLarge>Step 1 of 4</LabelLarge>
                                <View style={styles.row}>
                                    <Button kind="tertiary">Previous</Button>
                                    <Strut size={16} />
                                    <Button kind="primary">Next</Button>
                                </View>
                            </View>
                        }
                    />
                </View>
            </View>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("example 10", () => {
        const {StyleSheet} = require("aphrodite");
        const {View} = require("@khanacademy/wonder-blocks-core");
        const Button = require("@khanacademy/wonder-blocks-button").default;
        const {Title, Body} = require("@khanacademy/wonder-blocks-typography");
        const {
            MediaLayout,
            Strut,
        } = require("@khanacademy/wonder-blocks-layout");

        const styles = StyleSheet.create({
            previewSizer: {
                height: 512,
            },

            modalPositioner: {
                // Checkerboard background
                backgroundImage:
                    "linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)",
                backgroundSize: "20px 20px",
                backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",

                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",

                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
            },
        });

        const styleSheets = {
            mdOrLarger: StyleSheet.create({
                dialog: {
                    width: "86.72%",
                    maxWidth: 888,
                    height: "60.42%",
                    minHeight: 308,
                },

                panelGroup: {
                    flexDirection: "row",
                    flex: 1,
                },

                below: {
                    background: "url(/blue-blob.png)",
                    backgroundSize: "cover",
                    width: 294,
                    height: 306,
                    position: "absolute",
                    top: 100,
                    left: -60,
                },

                above: {
                    background: "url(/asteroid.png)",
                    backgroundSize: "cover",
                    width: 650,
                    height: 400,
                    position: "absolute",
                    top: -35,
                    left: 50,
                },
            }),

            small: StyleSheet.create({
                dialog: {
                    width: "100%",
                    height: "100%",
                    overflow: "hidden",
                },

                panelGroup: {
                    flexDirection: "column",
                    flex: 1,
                },
            }),
        };

        const example = (
            <View style={styles.previewSizer}>
                <View style={styles.modalPositioner}>
                    <MediaLayout styleSheets={styleSheets}>
                        {({mediaSize, styles}) => (
                            <ModalDialog
                                style={styles.dialog}
                                below={<View style={styles.below} />}
                                above={<View style={styles.above} />}
                            >
                                <View style={styles.panelGroup}>
                                    <ModalPanel
                                        onClose={() =>
                                            alert("This would close the modal.")
                                        }
                                        content={
                                            <View>
                                                <Title style={styles.title}>
                                                    Sidebar
                                                </Title>
                                                <Body>
                                                    Lorem ipsum dolor sit amet,
                                                    consectetur adipiscing elit,
                                                    sed do eiusmod tempor
                                                    incididunt ut labore et
                                                    dolore magna aliqua. Ut enim
                                                    ad minim veniam, quis
                                                    nostrud exercitation ullamco
                                                    laboris.
                                                </Body>
                                            </View>
                                        }
                                        light={false}
                                        closeButtonVisible={
                                            mediaSize === "small"
                                        }
                                    />
                                    <ModalPanel
                                        onClose={() =>
                                            alert("This would close the modal.")
                                        }
                                        content={
                                            <View>
                                                <Title style={styles.title}>
                                                    Contents
                                                </Title>
                                                <Body>
                                                    Lorem ipsum dolor sit amet,
                                                    consectetur adipiscing elit,
                                                    sed do eiusmod tempor
                                                    incididunt ut labore et
                                                    dolore magna aliqua.
                                                </Body>
                                                <Strut size={16} />
                                                <Button>Primary action</Button>
                                            </View>
                                        }
                                        closeButtonVisible={
                                            mediaSize !== "small"
                                        }
                                    />
                                </View>
                            </ModalDialog>
                        )}
                    </MediaLayout>
                </View>
            </View>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
