// @flow
import {Request} from "node-fetch";
import {fetchRequestMatchesMock} from "../fetch-request-matches-mock.js";

const TEST_URL = "http://example.com/foo?querya=1&queryb=elephants#fragment";

describe("#fetchRequestMatchesMock", () => {
    it("should throw if mock is not valid", () => {
        // Arrange
        const mock = {
            operation: {
                id: "foo",
                type: "query",
            },
        };

        // Act
        const underTest = () =>
            fetchRequestMatchesMock((mock: any), TEST_URL, null);

        // Assert
        expect(underTest).toThrowErrorMatchingInlineSnapshot(
            `"Unsupported mock operation: {\\"operation\\":{\\"id\\":\\"foo\\",\\"type\\":\\"query\\"}}"`,
        );
    });

    it("should throw if input is not valid", () => {
        // Arrange
        const mock = "http://example.com/foo";

        // Act
        const underTest = () =>
            fetchRequestMatchesMock(
                mock,
                ({not: "a valid request"}: any),
                null,
            );

        // Assert
        expect(underTest).toThrowErrorMatchingInlineSnapshot(
            `"Unsupported input type"`,
        );
    });

    describe.each([TEST_URL, new URL(TEST_URL), new Request(TEST_URL)])(
        "for valid inputs",
        (input) => {
            it("should return false if mock is a string and it does not match the fetched URL", () => {
                // Arrange
                const mock = "http://example.com/bar";

                // Act
                const result = fetchRequestMatchesMock(mock, input, null);

                // Assert
                expect(result).toBe(false);
            });

            it("should return false if the mock is a regular expression and it doesn't match the fetched URL", () => {
                // Arrange
                const mock = /\/bar/;

                // Act
                const result = fetchRequestMatchesMock(mock, input, null);

                // Assert
                expect(result).toBe(false);
            });

            it("should return true if the mock is a string and matches the fetched URL", () => {
                // Arrange
                const mock = TEST_URL;

                // Act
                const result = fetchRequestMatchesMock(mock, input, null);

                // Assert
                expect(result).toBe(true);
            });

            it.each([
                /http:\/\/example.com\/foo/,
                /queryb=elephants/,
                /^.*#fragment$/,
            ])(
                "should return true if the mock is a %s and matches the fetched URL",
                (regex) => {
                    // Arrange

                    // Act
                    const result = fetchRequestMatchesMock(regex, input, null);

                    // Assert
                    expect(result).toBe(true);
                },
            );
        },
    );
});
