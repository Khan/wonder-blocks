import {getGqlRequestId} from "../get-gql-request-id";

describe("#getGqlRequestId", () => {
    it("should include the id of the query", () => {
        // Arrange
        const operation = {
            type: "query",
            id: "myQuery",
        } as const;

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
        } as const;
        const context = {
            context3: "value3",
            context2: "value2",
            context1: "value1",
        } as const;

        // Act
        const requestId = getGqlRequestId(operation, null, context);
        const result = new Set(requestId.split("|"));

        // Assert
        expect(result).toContain(
            `context1=value1&context2=value2&context3=value3`,
        );
    });

    it("should include the variables, sorted by key, if present", () => {
        // Arrange
        const operation = {
            type: "query",
            id: "myQuery",
        } as const;
        const variables = {
            variable4: null,
            variable2: 42,
            variable1: "value1",
            variable5: true,
            variable3: undefined,
        } as const;

        // Act
        const requestId = getGqlRequestId(operation, variables, {
            module: "MODULE",
            curriculum: "CURRICULUM",
            targetLocale: "LOCALE",
        });
        const result = new Set(requestId.split("|"));

        // Assert
        expect(result).toContain(
            `variable1=value1&variable2=42&variable3=&variable4=null&variable5=true`,
        );
    });

    it("should sort nested variable properties", () => {
        // Arrange
        const operation = {
            type: "query",
            id: "myQuery",
        } as const;
        const variables = {
            variable4: null,
            variable2: 42,
            variable1: "value1",
            variable5: true,
            variable3: undefined,
            variable6: {
                nested2: "nested2",
                nested1: "nested1",
            },
            variable7: [1, 2, 3],
        } as const;

        // Act
        const requestId = getGqlRequestId(operation, variables, {
            module: "MODULE",
            curriculum: "CURRICULUM",
            targetLocale: "LOCALE",
        });
        const result = new Set(requestId.split("|"));

        // Assert
        expect(result).toContain(
            `variable1=value1&variable2=42&variable3=&variable4=null&variable5=true&variable6.nested1=nested1&variable6.nested2=nested2&variable7.0=1&variable7.1=2&variable7.2=3`,
        );
    });

    it("should handle non-primitive values in variables", () => {
        // Arrange
        const operation = {
            type: "query",
            id: "myQuery",
        } as const;
        const variables = {
            variable1: {
                date: new Date("2020-01-01"),
                error: new Error("BOOM!"),
            },
        } as const;

        // Act
        const requestId = getGqlRequestId(operation, variables, {
            module: "MODULE",
            curriculum: "CURRICULUM",
            targetLocale: "LOCALE",
        });
        const result = new Set(requestId.split("|"));

        // Assert
        expect(result).toContain(
            `variable1.date=2020-01-01T00%3A00%3A00.000Z&variable1.error=Error%3A+BOOM%21`,
        );
    });
});
