// This file is auto-generated by gen-snapshot-tests.js
// Do not edit this file.  To make changes to these snapshot tests:
//   1. edit the markdown documentation files in the package,
//        packages/wonder-blocks-icon
//   2. Run `yarn run gen-snapshot-tests`.
import React from "react";
import renderer from "react-test-renderer";

// Mock react-dom as jest doesn't like findDOMNode.
jest.mock("react-dom");
import Icon from "./components/icon.js";

describe("wonder-blocks-icon", () => {
    it("example 1", () => {
        const {StyleSheet, css} = require("aphrodite");
        const {View} = require("@khanacademy/wonder-blocks-core");
        const {
            default: Icon,
            icons,
        } = require("@khanacademy/wonder-blocks-icon");

        const headings = ["small", "medium"];

        const styles = StyleSheet.create({
            emptyCell: {
                background: "#EEE",
            },
            nameCell: {
                fontFamily: "monospace",
                textAlign: "right",
                paddingRight: 4,
            },
            iconCell: {
                minWidth: 75,
                textAlign: "center",
                padding: 4,
            },
            tableBorder: {
                border: "1px #DDD solid",
            },
        });

        const example = (
            <table
                className={css(styles.table)}
                style={{borderCollapse: "collapse"}}
            >
                <thead>
                    <tr>
                        <th className={css(styles.tableBorder)} />
                        {headings.map((heading) => (
                            <th
                                className={css(styles.tableBorder)}
                                key={heading}
                            >
                                {heading}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(icons).map((iconName) => (
                        <tr key={iconName}>
                            <td
                                className={css(
                                    styles.nameCell,
                                    styles.tableBorder,
                                )}
                            >
                                {iconName}
                            </td>
                            {headings.map((size) => {
                                if (icons[iconName][size]) {
                                    return (
                                        <td
                                            className={css(
                                                styles.iconCell,
                                                styles.tableBorder,
                                            )}
                                            key={size}
                                        >
                                            <Icon
                                                icon={icons[iconName]}
                                                size={size}
                                            />
                                        </td>
                                    );
                                }
                                return (
                                    <td
                                        className={css(
                                            styles.emptyCell,
                                            styles.tableBorder,
                                        )}
                                        key={size}
                                    />
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        );

        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("example 2", () => {
        const {icons} = require("@khanacademy/wonder-blocks-icon");

        const example = <Icon icon={icons.search} size="small" />;
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("example 3", () => {
        const {View} = require("@khanacademy/wonder-blocks-core");
        const {icons} = require("@khanacademy/wonder-blocks-icon");

        const example = (
            <View>
                {["small", "medium", "large", "xlarge"].map((size) => (
                    <Icon key={size} size={size} icon={icons.search} />
                ))}
            </View>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("example 4", () => {
        const {View} = require("@khanacademy/wonder-blocks-core");
        const {icons} = require("@khanacademy/wonder-blocks-icon");
        const Color = require("@khanacademy/wonder-blocks-color").default;

        const example = (
            <View>
                Here is an icon inline:
                <Icon
                    size="small"
                    icon={icons.info}
                    color={Color.red}
                    style={{margin: 2}}
                />
                It has color, too.
            </View>
        );

        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
