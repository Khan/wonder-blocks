// @flow

import {getGqlRequestId} from "../get-gql-request-id.js";

describe("#getGqlRequestId", () => {
    it("should include the id of the query", () => {
        // Arrange
        const operation = {
            type: "query",
            id: "myQuery",
        };

        // Act
        const requestId = getGqlRequestId(operation, null, {
            module: "MODULE",
            curriculum: "CURRICULUM",
            targetLocale: "LOCALE",
        });
        const result = new Set(requestId.split("|"));

        // Assert
        expect(result).toContain("myQuery");
    });

    it("should include the context values sorted by key", () => {
        // Arrange
        const operation = {
            type: "query",
            id: "myQuery",
        };
        const context = {
            context3: "value3",
            context2: "value2",
            context1: "value1",
        };

        // Act
        const requestId = getGqlRequestId(operation, null, context);
        const result = new Set(requestId.split("|"));

        // Assert
        expect(result).toContain(
            `context1=value1;context2=value2;context3=value3`,
        );
    });

    it("should include the variables, sorted by key, if present", () => {
        // Arrange
        const operation = {
            type: "query",
            id: "myQuery",
        };
        const variables = {
            variable4: null,
            variable2: 42,
            variable1: "value1",
            variable5: true,
            variable3: undefined,
        };

        // Act
        const requestId = getGqlRequestId(operation, variables, {
            module: "MODULE",
            curriculum: "CURRICULUM",
            targetLocale: "LOCALE",
        });
        const result = new Set(requestId.split("|"));

        // Assert
        expect(result).toContain(
            `variable1=value1;variable2=42;variable3=;variable4=null;variable5=true`,
        );
    });
});
