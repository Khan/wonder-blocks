import {toGqlOperation} from "../to-gql-operation";
import * as GDNP from "../graphql-document-node-parser";

jest.mock("../graphql-document-node-parser");

describe("#toGqlOperation", () => {
    it("should parse the document node", () => {
        // Arrange
        const documentNode: any = {};
        const parserSpy = jest
            .spyOn(GDNP, "graphQLDocumentNodeParser")
            // @ts-expect-error [FEI-5019] - TS2345 - Argument of type '{ name: string; type: string; }' is not assignable to parameter of type 'IDocumentDefinition'.
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
        // @ts-expect-error [FEI-5019] - TS2345 - Argument of type '{ name: string; type: string; }' is not assignable to parameter of type 'IDocumentDefinition'.
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
