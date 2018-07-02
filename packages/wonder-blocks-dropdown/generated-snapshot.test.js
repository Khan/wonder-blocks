// This file is auto-generated by gen-snapshot-tests.js
// Do not edit this file.  To make changes to these snapshot tests:
//   1. edit the markdown documentation files in the package,
//        packages/wonder-blocks-dropdown
//   2. Run `yarn run gen-snapshot-tests`.
import React from "react";
import renderer from "react-test-renderer";

// Mock react-dom as jest doesn't like findDOMNode.
jest.mock("react-dom");
import ActionItem from "./components/action-item.js";
import SelectItem from "./components/select-item.js";
import SeparatorItem from "./components/separator-item.js";
import SelectBox from "./components/select-box.js";
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
            },
            darkBackgroundWrapper: {
                background: "black",
                padding: 10,
            },
            strutLike: {
                width: 8,
                height: 8,
            },
            sepContainer: {
                width: 200,
                height: 10,
            },
        });
        const example = (
            <View style={[styles.darkBackgroundWrapper]}>
                <View style={[styles.row]}>
                    <ActionItem
                        label={"Go to KA"}
                        href={"https://khanacademy.org"}
                    />
                    <View style={[styles.strutLike]} />
                    <ActionItem
                        label={"Disabled"}
                        disabled={true}
                        href={"https://khanacademy.org"}
                    />
                    <View style={[styles.strutLike]} />
                    <ActionItem
                        label={"Calls an onClick"}
                        onClick={() => console.log("Action item clicked")}
                    />
                    <View style={[styles.strutLike]} />
                    <ActionItem
                        label={"Indented"}
                        onClick={() => console.log("Intended item clicked")}
                    />
                </View>

                <View style={[styles.strutLike]} />

                <View style={[styles.row]}>
                    <SelectItem
                        label={"Item 1"}
                        selected={true}
                        value={"1"}
                        variant={"check"}
                        onToggle={(v, s) =>
                            console.log(`would now be ${s.toString()}`)
                        }
                    />
                    <View style={[styles.strutLike]} />
                    <SelectItem
                        label={"Item 2"}
                        selected={false}
                        value={"2"}
                        variant={"check"}
                        onToggle={(v, s) =>
                            console.log(`would now be ${s.toString()}`)
                        }
                    />
                    <View style={[styles.strutLike]} />
                    <SelectItem
                        label={"Item 3"}
                        selected={true}
                        value={"3"}
                        variant={"checkbox"}
                        onToggle={(v, s) =>
                            console.log(`would now be ${s.toString()}`)
                        }
                    />
                    <View style={[styles.strutLike]} />
                    <SelectItem
                        label={"Item 4"}
                        selected={false}
                        value={"4"}
                        variant={"checkbox"}
                        onToggle={(v, s) =>
                            console.log(`would now be ${s.toString()}`)
                        }
                    />
                    <View style={[styles.strutLike]} />
                    <SelectItem
                        label={"Item 5"}
                        selected={false}
                        disabled={true}
                        value={"5"}
                        variant={"checkbox"}
                        onToggle={(v, l, s) =>
                            console.log(`would now be ${s.toString()}`)
                        }
                    />
                </View>
            </View>
        );

        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("example 2", () => {
        const {View} = require("@khanacademy/wonder-blocks-core");
        const {Strut} = require("@khanacademy/wonder-blocks-layout");
        const {StyleSheet} = require("aphrodite");

        const styles = StyleSheet.create({
            row: {
                flexDirection: "row",
            },
        });
        const example = (
            <View style={[styles.row]}>
                <SelectBox
                    isPlaceholder={false}
                    onClick={() => console.log("regular selectbox selected")}
                    style={{width: 200}}
                >
                    Regular selectbox
                </SelectBox>
                <Strut size={8} />
                <SelectBox
                    isPlaceholder={true}
                    onClick={() => console.log("Selected")}
                    style={{width: 150}}
                >
                    Placeholder
                </SelectBox>
            </View>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("example 3", () => {
        const Color = require("@khanacademy/wonder-blocks-color");
        const {View} = require("@khanacademy/wonder-blocks-core");
        const {StyleSheet} = require("aphrodite");

        console.log(Color);
        const styles = StyleSheet.create({
            row: {
                flexDirection: "row",
            },
            darkBackgroundWrapper: {
                backgroundColor: Color.default.darkBlue,
                padding: 10,
            },
        });
        const example = (
            <View style={[styles.row]}>
                <View style={[styles.darkBackgroundWrapper]}>
                    <SelectBox
                        light={true}
                        isPlaceholder={false}
                        onClick={() => console.log("light selectbox selected")}
                    >
                        Light version
                    </SelectBox>
                </View>
            </View>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("example 4", () => {
        const {View} = require("@khanacademy/wonder-blocks-core");
        const {StyleSheet} = require("aphrodite");

        const styles = StyleSheet.create({
            row: {
                flexDirection: "row",
            },
        });
        const example = (
            <View style={[styles.row]}>
                <SelectBox
                    disabled={true}
                    onClick={() => console.log("error error!!")}
                >
                    Disabled
                </SelectBox>
            </View>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("example 5", () => {
        const {View} = require("@khanacademy/wonder-blocks-core");
        const {StyleSheet} = require("aphrodite");

        const styles = StyleSheet.create({
            row: {
                flexDirection: "row",
                height: 170,
            },
            strutLike: {
                width: 8,
            },
        });
        const example = (
            <View style={[styles.row]}>
                <ActionMenu
                    items={[
                        {
                            type: "action",
                            label: "Go to Google",
                            href: "https://google.com",
                            onClick: () => console.log("Trigger action google"),
                        },
                        {
                            type: "action",
                            label: "Go to KA",
                            disabled: true,
                            href: "https://khanacademy.org",
                            onClick: () => console.log("Trigger action KA"),
                        },
                        {
                            type: "separator",
                        },
                        {
                            type: "action",
                            label: "Go to KA",
                            disabled: false,
                            href: "https://khanacademy.org",
                            onClick: () => console.log("Trigger action KA"),
                        },
                    ]}
                    menuText={"Navigation menu"}
                    containsSelectionOptions={true}
                />
                <View style={[styles.strutLike]} />
                <ActionMenu
                    items={[
                        {
                            type: "action",
                            label: "Log action 1",
                            onClick: () => console.log("Action 1"),
                        },
                        {
                            type: "action",
                            label: "Log action 2",
                            onClick: () => console.log("Action 2"),
                        },
                    ]}
                    menuText={"Logging menu"}
                />
                <View style={[styles.strutLike]} />
                <ActionMenu
                    items={[
                        {
                            type: "action",
                            label: "Log action 1",
                            onClick: () => console.log("Action 1"),
                        },
                        {
                            type: "action",
                            label: "Log action 2",
                            onClick: () => console.log("Action 2"),
                        },
                    ]}
                    disabled={true}
                    menuText={"Disabled menu"}
                />
                <View style={[styles.strutLike]} />
                <ActionMenu
                    items={[
                        {
                            type: "action",
                            label: "Profile",
                            onClick: () => console.log("profile"),
                        },
                        {
                            type: "action",
                            label: "Teacher dashboard",
                            onClick: () => console.log("dashboard"),
                        },
                        {
                            type: "action",
                            label: "Settings",
                            onClick: () => console.log("settings"),
                        },
                        {
                            type: "action",
                            label: "Help",
                            onClick: () => console.log("help"),
                        },
                        {
                            type: "separator",
                        },
                        {
                            type: "action",
                            label: "Log out",
                            onClick: () => console.log("log out"),
                        },
                    ]}
                    menuText={"Betsy Appleseed"}
                    alignment={"right"}
                />
            </View>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("example 6", () => {
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
                                        `Show homework assignments ${state.toString()}`,
                                    ),
                                value: "homework",
                            },
                            {
                                type: "select",
                                label: "Show in-class assignments",
                                onClick: (state) =>
                                    console.log(
                                        `Show in-class assignments ${state.toString()}`,
                                    ),
                                value: "in-class",
                            },
                        ]}
                        menuText={"Assignments"}
                        containsSelectionItems={true}
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
    it("example 7", () => {
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
    it("example 6", () => {
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
    it("example 7", () => {
        const React = require("react");
        const {View} = require("@khanacademy/wonder-blocks-core");
        const {StyleSheet} = require("aphrodite");

        const styles = StyleSheet.create({
            row: {
                flexDirection: "row",
                height: 180,
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
    it("example 8", () => {
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
    it("example 9", () => {
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
    it("example 10", () => {
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
    it("example 11", () => {
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
    it("example 12", () => {
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
