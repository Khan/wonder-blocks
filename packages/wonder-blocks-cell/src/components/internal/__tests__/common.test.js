// @flow

import {getHorizontalRuleStyles} from "../common.js";

describe("getHorizontalRuleStyles", () => {
    it("should get 'inset' styles as an array", () => {
        // Arrange

        // Act
        const styles = getHorizontalRuleStyles("inset");

        // Assert
        // Verify that both classes are injected
        expect(styles).toMatchObject([
            {
                _name: /horizontalRule/,
            },
            {
                _name: /horizontalRuleInset/,
            },
        ]);
    });

    it("should get 'full-width' styles as an object", () => {
        // Arrange

        // Act
        const styles = getHorizontalRuleStyles("full-width");

        // Assert
        // Verify that only one class is injected
        expect(styles).toMatchObject({
            _name: /horizontalRule/,
        });
    });

    it("should not inject styles with 'none'", () => {
        // Arrange

        // Act
        const styles = getHorizontalRuleStyles("none");

        // Assert
        // Verify that we don't inject any styles
        expect(styles).toMatchObject({});
    });
});
