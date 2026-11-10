import recommended from "../recommended";
import strict from "../strict";

const ruleName =
    "@khanacademy/wonder-blocks/prefer-semantic-color-over-graphics-palette";

describe("configs", () => {
    it.each([
        ["recommended", recommended],
        ["strict", strict],
    ])("%s loads the plugin", (_label, config) => {
        // Arrange — config provided by it.each

        // Act
        const plugins = config.plugins;

        // Assert
        expect(plugins).toEqual([
            "@khanacademy/stylelint-plugin-wonder-blocks",
        ]);
    });

    it.each([
        ["recommended", recommended],
        ["strict", strict],
    ])(
        "%s enables prefer-semantic-color-over-graphics-palette",
        (_label, config) => {
            // Arrange — config provided by it.each

            // Act
            const setting = config.rules?.[ruleName];

            // Assert
            expect(setting).toBe(true);
        },
    );

    it("strict includes every recommended rule", () => {
        // Arrange
        const recommendedRules = recommended.rules ?? {};

        // Act
        const strictRules = strict.rules ?? {};

        // Assert
        expect(strictRules).toMatchObject(recommendedRules);
    });
});
