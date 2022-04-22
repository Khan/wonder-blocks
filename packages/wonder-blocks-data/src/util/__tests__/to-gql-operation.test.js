// @flow
import {toGqlOperation} from "../to-gql-operation.js";
import * as GDNP from "../graphql-document-node-parser.js";

jest.mock("../graphql-document-node-parser.js");

describe("#toGqlOperation", () => {
    it("should parse the document node", () => {
        // Arrange
        const documentNode: any = {};
        const parserSpy = jest
            .spyOn(GDNP, "graphQLDocumentNodeParser")
            .mockReturnValue({
                name: "operationName",
                type: "query",
            });

        // Act
        toGqlOperation(documentNode);

        // Assert
        expect(parserSpy).toHaveBeenCalledWith(documentNode);
    });

    it("should return the Wonder Blocks Data representation of the given document node", () => {
        // Arrange
        const documentNode: any = {};
        jest.spyOn(GDNP, "graphQLDocumentNodeParser").mockReturnValue({
            name: "operationName",
            type: "mutation",
        });

        // Act
        const result = toGqlOperation(documentNode);

        // Assert
        expect(result).toStrictEqual({
            id: "operationName",
            type: "mutation",
        });
    });
});
