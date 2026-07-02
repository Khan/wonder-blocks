import {useImageRoleAttributes} from "../use-image-role-attributes";

describe("useImageRoleAttributes", () => {
    it("should return presentation only attributes if there is no aria-label or aria-labelledby defined", () => {
        // Arrange
        const props = {};

        // Act
        const attributes = useImageRoleAttributes(props);

        // Assert
        expect(attributes).toEqual({
            "aria-hidden": true,
        });
    });

    it("should return icon meaning attributes if there is an aria-label is defined", () => {
        // Arrange
        const props = {
            "aria-label": "Icon example",
        };

        // Act
        const attributes = useImageRoleAttributes(props);

        // Assert
        expect(attributes).toEqual({
            "aria-label": "Icon example",
            role: "img",
        });
    });

    it("should return icon meaning attributes if there is aria-labelledby is defined", () => {
        // Arrange
        const props = {
            "aria-labelledby": "id-of-label",
        };

        // Act
        const attributes = useImageRoleAttributes(props);

        // Assert
        expect(attributes).toEqual({
            "aria-labelledby": "id-of-label",
            role: "img",
        });
    });
});
