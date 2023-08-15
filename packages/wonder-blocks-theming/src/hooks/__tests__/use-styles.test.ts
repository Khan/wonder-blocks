import {renderHook} from "@testing-library/react-hooks";
import {StyleSheet} from "aphrodite";
import {ThemedStylesFn} from "../../types";

import useStyles from "../use-styles";

describe("useStyles", () => {
    it("should return the stylesheet", () => {
        // Arrange
        const theme = {
            color: {
                blue: "#0000f0",
                green: "#00ff00",
            },
            spacing: {
                medium: 8,
                large: 16,
            },
        };

        const styles: ThemedStylesFn<typeof theme> = (theme) =>
            StyleSheet.create({
                testContainer: {
                    color: theme.color.blue,
                },
            });

        // Act
        const {result} = renderHook(() => useStyles(styles, theme));

        // Assert
        expect(result.current).toMatchObject(
            expect.objectContaining({
                testContainer: expect.any(Object),
            }),
        );
    });

    it("should return the theme value in the stylesheet", () => {
        // Arrange
        const theme = {
            color: {
                blue: "#0000f0",
                green: "#00ff00",
            },
            spacing: {
                medium: 8,
                large: 16,
            },
        };

        const styles: ThemedStylesFn<typeof theme> = (theme) =>
            StyleSheet.create({
                testContainer: {
                    color: theme.color.blue,
                },
            });

        // Act
        const {result} = renderHook(() => useStyles(styles, theme));

        // Assert
        // NOTE: Aphrodite doesn't expose the style object, so we have to access
        // it through the private properties.
        expect(result.current).toHaveProperty(
            "testContainer._definition._definition.color",
            "#0000f0",
        );
    });
});
