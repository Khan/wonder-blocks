import plugins from "..";
import {ruleName} from "../rules/prefer-semantic-color-over-graphics-palette";

describe("stylelint-plugin-wonder-blocks", () => {
    it("exports a plugin for each rule", () => {
        // Arrange — the plugins are created when the package is loaded

        // Act
        const ruleNames = plugins.map((plugin) =>
            "ruleName" in plugin ? plugin.ruleName : undefined,
        );

        // Assert
        expect(ruleNames).toEqual([ruleName]);
    });
});
