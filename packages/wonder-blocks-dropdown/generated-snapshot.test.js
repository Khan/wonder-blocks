// This file is auto-generated by gen-snapshot-tests.js
// Do not edit this file.  To make changes to these snapshot tests:
//   1. edit the markdown documentation files in the package,
//        packages/wonder-blocks-dropdown
//   2. Run `yarn run gen-snapshot-tests`.
import React from "react";
import renderer from "react-test-renderer";

// Mock react-dom as jest doesn't like findDOMNode.
jest.mock("react-dom");
import ActionMenu from "./components/action-menu.js";
import SingleSelectMenu from "./components/single-select-menu.js";
import MultiSelectMenu from "./components/multi-select-menu.js";

describe("wonder-blocks-dropdown", () => {
    it("example 1", () => {
        const {View} = require("@khanacademy/wonder-blocks-core");
        const {StyleSheet} = require("aphrodite");

        const styles = StyleSheet.create({
            row: {
                flexDirection: "row",
                height: 250,
            },
            wrapper: {
                width: "100%",
            },
        });
        const example = (
            <View style={[styles.row]}>
                <View style={[styles.wrapper]}>
                    <ActionMenu
                        items={[
                            {
                                type: "action",
                                label: "Profile",
                                href: "http://khanacademy.org/profile",
                            },
                            {
                                type: "action",
                                label: "Teacher dashboard",
                                href: "http://khanacademy.org/coach/dashboard",
                            },
                            {
                                type: "action",
                                label: "Settings (onClick)",
                                onClick: () =>
                                    console.log("user clicked on settings"),
                            },
                            {
                                type: "action",
                                disabled: true,
                                label: "Help",
                                onClick: () => console.log("help"),
                            },
                            {
                                type: "separator",
                            },
                            {
                                type: "action",
                                label: "Log out",
                                href: "http://khanacademy.org/logout",
                            },
                        ]}
                        menuText={"Betsy Appleseed"}
                        alignment={"right"}
                    />
                </View>
            </View>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("example 2", () => {
        const React = require("react");
        const {View} = require("@khanacademy/wonder-blocks-core");
        const {StyleSheet} = require("aphrodite");

        const styles = StyleSheet.create({
            row: {
                flexDirection: "row",
                height: 250,
            },
        });

        class HybridMenu extends React.Component {
            constructor() {
                super();
                this.state = {
                    selectedValues: ["homework"],
                };
            }

            handleChanges(update) {
                this.setState({
                    selectedValues: update,
                });
            }

            render() {
                return (
                    <ActionMenu
                        items={[
                            {
                                type: "action",
                                label: "Create...",
                                onClick: () => console.log("create action"),
                            },
                            {
                                type: "action",
                                label: "Edit...",
                                disabled: true,
                                onClick: () => console.log("edit action"),
                            },
                            {
                                type: "action",
                                label: "Delete",
                                disabled: true,
                                onClick: () => console.log("delete action"),
                            },
                            {
                                type: "separator",
                            },
                            {
                                type: "select",
                                label: "Show homework assignments",
                                onClick: (state) =>
                                    console.log(
                                        `Show homework assignments ${(!state).toString()}`,
                                    ),
                                value: "homework",
                            },
                            {
                                type: "select",
                                label: "Show in-class assignments",
                                onClick: (state) =>
                                    console.log(
                                        `Show in-class assignments ${(!state).toString()}`,
                                    ),
                                value: "in-class",
                            },
                        ]}
                        menuText={"Assignments"}
                        onChange={(selectedValues) =>
                            this.handleChanges(selectedValues)
                        }
                        selectedValues={this.state.selectedValues}
                    />
                );
            }
        }

        const example = (
            <View style={[styles.row]}>
                <HybridMenu />
            </View>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("example 3", () => {
        const React = require("react");
        const {View} = require("@khanacademy/wonder-blocks-core");
        const {StyleSheet} = require("aphrodite");

        const styles = StyleSheet.create({
            row: {
                flexDirection: "row",
                height: 180,
            },
        });

        class ExampleWithPlaceholder extends React.Component {
            constructor() {
                super();
                this.state = {
                    selectedValue: null,
                };
            }

            handleChange(selected) {
                console.log(`${selected} was selected!`);
                this.setState({
                    selectedValue: selected,
                });
            }

            render() {
                return (
                    <SingleSelectMenu
                        items={[
                            {
                                label: "Banana wrapped in a peel",
                                value: "banana",
                            },
                            {
                                label: "Apple",
                                value: "apple",
                            },
                            {
                                label: "Grape",
                                value: "grape",
                            },
                        ]}
                        light={false}
                        onChange={(selected) => this.handleChange(selected)}
                        placeholder={"Choose a fruit"}
                        selectedValue={this.state.selectedValue}
                        style={{
                            width: 170,
                            maxWidth: 170,
                        }}
                    />
                );
            }
        }

        const example = (
            <View style={[styles.row]}>
                <ExampleWithPlaceholder />
            </View>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("example 4", () => {
        const React = require("react");
        const {View} = require("@khanacademy/wonder-blocks-core");
        const {StyleSheet} = require("aphrodite");

        const styles = StyleSheet.create({
            row: {
                flexDirection: "row",
                height: 180,
            },
        });

        class ExampleWithStartingSelection extends React.Component {
            constructor() {
                super();
                this.state = {
                    selectedValue: "banana",
                };
            }

            handleChange(selected) {
                console.log(`${selected} was selected!`);
                this.setState({
                    selectedValue: selected,
                });
            }

            render() {
                return (
                    <SingleSelectMenu
                        items={[
                            {
                                label: "Banana juice!!!",
                                value: "banana",
                            },
                            {
                                disabled: true,
                                label: "Apple juice!!!",
                                value: "apple",
                            },
                            {
                                label: "Grape juice!!!",
                                value: "grape",
                            },
                        ]}
                        onChange={(selected) => this.handleChange(selected)}
                        placeholder={"Choose a juice"}
                        selectedValue={this.state.selectedValue}
                    />
                );
            }
        }

        const example = (
            <View style={[styles.row]}>
                <ExampleWithStartingSelection />
            </View>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("example 5", () => {
        const React = require("react");
        const {View} = require("@khanacademy/wonder-blocks-core");
        const {StyleSheet} = require("aphrodite");

        const styles = StyleSheet.create({
            row: {
                flexDirection: "row",
                height: 50,
            },
        });

        class DisabledExample extends React.Component {
            constructor() {
                super();
                this.state = {
                    selectedValue: "banana",
                };
            }

            handleChange(selected) {
                console.log(`${selected} was selected!`);
                this.setState({
                    selectedValue: selected,
                });
            }

            render() {
                return (
                    <SingleSelectMenu
                        disabled={true}
                        items={[
                            {
                                label: "Banana juice!!!",
                                value: "banana",
                            },
                            {
                                label: "Apple juice!!!",
                                value: "apple",
                            },
                            {
                                label: "Grape juice!!!",
                                value: "grape",
                            },
                        ]}
                        onChange={(selected) => this.handleChange(selected)}
                        placeholder={"Choose a fruit"}
                        selectedValue={this.state.selectedValue}
                    />
                );
            }
        }

        const example = (
            <View style={[styles.row]}>
                <DisabledExample />
            </View>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("example 6", () => {
        const React = require("react");
        const Color = require("@khanacademy/wonder-blocks-color");
        const {View} = require("@khanacademy/wonder-blocks-core");
        const {StyleSheet} = require("aphrodite");

        const styles = StyleSheet.create({
            row: {
                flexDirection: "row",
            },
            darkBackgroundWrapper: {
                backgroundColor: Color.default.darkBlue,
                width: 350,
                height: 200,
                paddingRight: 10,
                paddingTop: 10,
            },
        });

        class LightRightAlignedExample extends React.Component {
            constructor() {
                super();
                this.state = {
                    selectedValue: null,
                };
            }

            handleChange(selected) {
                console.log(`${selected} was selected!`);
                this.setState({
                    selectedValue: selected,
                });
            }

            render() {
                return (
                    <SingleSelectMenu
                        items={[
                            {
                                label: "Regular milk tea with boba",
                                value: "regular",
                            },
                            {
                                label: "Wintermelon milk tea with boba",
                                value: "wintermelon",
                            },
                            {
                                label: "Taro milk tea, half sugar",
                                value: "taro",
                            },
                        ]}
                        light={true}
                        onChange={(selected) => this.handleChange(selected)}
                        placeholder={"Boba order"}
                        selectedValue={this.state.selectedValue}
                        alignment={"right"}
                    />
                );
            }
        }

        const example = (
            <View style={[styles.row]}>
                <View style={[styles.darkBackgroundWrapper]}>
                    <LightRightAlignedExample />
                </View>
            </View>
        );

        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("example 7", () => {
        const React = require("react");
        const {View} = require("@khanacademy/wonder-blocks-core");
        const {StyleSheet} = require("aphrodite");

        const styles = StyleSheet.create({
            row: {
                flexDirection: "row",
                height: 250,
            },
            strutLike: {
                width: 8,
            },
        });

        class ExampleNoneSelected extends React.Component {
            constructor() {
                super();
                this.state = {
                    selectedValues: [],
                };
            }

            handleChanges(update) {
                console.log("changes happened!");
                this.setState({
                    selectedValues: update,
                });
            }

            render() {
                return (
                    <MultiSelectMenu
                        items={[
                            {
                                label: "Red",
                                value: "1",
                            },
                            {
                                disabled: true,
                                label: "Orange",
                                value: "2",
                            },
                            {
                                label: "Yellow",
                                value: "3",
                            },
                            {
                                label: "Green",
                                value: "4",
                            },
                            {
                                label: "Blue",
                                value: "5",
                            },
                        ]}
                        onChange={(selectedValues) =>
                            this.handleChanges(selectedValues)
                        }
                        placeholder={"Choose some colors"}
                        selectedValues={this.state.selectedValues}
                        selectItemType={"colors"}
                        style={{
                            width: 170,
                            maxWidth: 170,
                        }}
                    />
                );
            }
        }

        const example = (
            <View style={[styles.row]}>
                <ExampleNoneSelected />
            </View>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("example 8", () => {
        const React = require("react");
        const {View} = require("@khanacademy/wonder-blocks-core");
        const {StyleSheet} = require("aphrodite");

        const styles = StyleSheet.create({
            row: {
                flexDirection: "row",
                height: 350,
            },
        });

        class ExampleWithShortcuts extends React.Component {
            constructor() {
                super();
                this.state = {
                    selectedValues: ["1"],
                };
            }

            handleChanges(update) {
                console.log("changes happened!");
                this.setState({
                    selectedValues: update,
                });
            }

            render() {
                return (
                    <MultiSelectMenu
                        items={[
                            {
                                label: "Red",
                                value: "1",
                            },
                            {
                                label: "Orange",
                                value: "2",
                            },
                            {
                                label: "Yellow",
                                value: "3",
                            },
                            {
                                label: "Green",
                                value: "4",
                            },
                            {
                                label: "Blue",
                                value: "5",
                            },
                        ]}
                        shortcuts={true}
                        onChange={(selectedValues) =>
                            this.handleChanges(selectedValues)
                        }
                        selectedValues={this.state.selectedValues}
                        selectItemType={"colors"}
                    />
                );
            }
        }

        const example = (
            <View style={[styles.row]}>
                <ExampleWithShortcuts />
            </View>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("example 9", () => {
        const React = require("react");
        const {View} = require("@khanacademy/wonder-blocks-core");
        const {StyleSheet} = require("aphrodite");

        const styles = StyleSheet.create({
            row: {
                flexDirection: "row",
                height: 50,
            },
        });

        class ExampleNoneSelected extends React.Component {
            constructor() {
                super();
                this.state = {
                    selectedValues: [],
                };
            }

            handleChanges(update) {
                console.log("changes happened!");
                this.setState({
                    selectedValues: update,
                });
            }

            render() {
                return (
                    <MultiSelectMenu
                        items={[
                            {
                                label: "Red",
                                value: "1",
                            },
                        ]}
                        disabled={true}
                        onChange={(selectedValues) =>
                            this.handleChanges(selectedValues)
                        }
                        placeholder={"Choose some colors"}
                        selectedValues={this.state.selectedValues}
                        selectItemType={"colors"}
                    />
                );
            }
        }

        const example = (
            <View style={[styles.row]}>
                <ExampleNoneSelected />
            </View>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("example 10", () => {
        const React = require("react");
        const Color = require("@khanacademy/wonder-blocks-color");
        const {View} = require("@khanacademy/wonder-blocks-core");
        const {StyleSheet} = require("aphrodite");

        const styles = StyleSheet.create({
            row: {
                flexDirection: "row",
            },
            darkBackgroundWrapper: {
                backgroundColor: Color.default.darkBlue,
                width: 350,
                height: 370,
                paddingRight: 10,
                paddingTop: 10,
            },
        });

        class LightRightAlignedExample extends React.Component {
            constructor() {
                super();
                this.state = {
                    selectedValues: ["1"],
                };
            }

            handleChanges(update) {
                console.log("changes happened!");
                this.setState({
                    selectedValues: update,
                });
            }

            render() {
                return (
                    <MultiSelectMenu
                        items={[
                            {
                                label: "the philosopher's stone",
                                value: "1",
                            },
                            {
                                label: "the chamber of secrets",
                                value: "2",
                            },
                            {
                                label: "the prisoner of azkaban",
                                value: "3",
                            },
                            {
                                label: "the goblet of fire",
                                value: "4",
                            },
                            {
                                label: "the order of the phoenix",
                                value: "5",
                            },
                        ]}
                        alignment={"right"}
                        light={true}
                        shortcuts={true}
                        onChange={(selectedValues) =>
                            this.handleChanges(selectedValues)
                        }
                        selectedValues={this.state.selectedValues}
                        selectItemType={"harry potter books"}
                    />
                );
            }
        }

        const example = (
            <View style={[styles.row]}>
                <View style={[styles.darkBackgroundWrapper]}>
                    <LightRightAlignedExample />
                </View>
            </View>
        );

        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
