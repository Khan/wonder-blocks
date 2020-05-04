// This file is auto-generated by gen-snapshot-tests.js
// Do not edit this file.  To make changes to these snapshot tests:
//   1. edit the markdown documentation files in the package,
//        packages/wonder-blocks-clickable
//   2. Run `yarn run gen-snapshot-tests`.
import React from "react";
import renderer from "react-test-renderer";

// Mock react-dom as jest doesn't like findDOMNode.
jest.mock("react-dom");
import {StyleSheet} from "aphrodite";
import Clickable from "@khanacademy/wonder-blocks-clickable";
import {View} from "@khanacademy/wonder-blocks-core";
import Color from "@khanacademy/wonder-blocks-color";
import {Body} from "@khanacademy/wonder-blocks-typography";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {MemoryRouter, Route, Switch} from "react-router-dom";

describe("wonder-blocks-clickable", () => {
    it("example 1", () => {
        const styles = StyleSheet.create({
            hovered: {
                textDecoration: "underline",
                backgroundColor: Color.teal,
            },
            pressed: {
                color: Color.blue,
            },
            focused: {
                outline: `solid 4px ${Color.offBlack64}`,
            },
        });
        const example = (
            <View>
                <Clickable onClick={() => alert("You clicked some text!")}>
                    {({hovered, focused, pressed}) => (
                        <View
                            style={[
                                hovered && styles.hovered,
                                focused && styles.focused,
                                pressed && styles.pressed,
                            ]}
                        >
                            <Body>This text is clickable!</Body>
                        </View>
                    )}
                </Clickable>
            </View>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("example 2", () => {
        const styles = StyleSheet.create({
            row: {
                flexDirection: "row",
                alignItems: "center",
            },
            h1: {
                marginRight: Spacing.large,
            },
        }); // NOTE: In actual code you would use BrowserRouter instead

        const example = (
            <MemoryRouter>
                <View style={styles.row}>
                    <Clickable
                        href="/foo"
                        style={styles.h1}
                        onClick={() =>
                            console.log("I'm still on the same page!")
                        }
                    >
                        {(eventState) => <h1>Uses Client-side Nav</h1>}
                    </Clickable>
                    <Clickable href="/foo" style={styles.h1} skipClientNav>
                        {(eventState) => <h1>Avoids Client-side Nav</h1>}
                    </Clickable>
                    <Switch>
                        <Route path="/foo">
                            <View id="foo">Hello, world!</View>
                        </Route>
                    </Switch>
                </View>
            </MemoryRouter>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("example 3", () => {
        const styles = StyleSheet.create({
            hovered: {
                textDecoration: "underline",
                backgroundColor: Color.teal,
            },
            pressed: {
                color: Color.blue,
            },
            focused: {
                outline: `solid 4px ${Color.lightBlue}`,
            },
        });
        const example = (
            <View>
                <Clickable href="https://khanacademy.org" skipClientNav={true}>
                    {({hovered, focused, pressed}) => (
                        <View
                            style={[
                                hovered && styles.hovered,
                                focused && styles.focused,
                                pressed && styles.pressed,
                            ]}
                        >
                            <Body>
                                This text should navigate using the keyboard
                            </Body>
                        </View>
                    )}
                </Clickable>
            </View>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
