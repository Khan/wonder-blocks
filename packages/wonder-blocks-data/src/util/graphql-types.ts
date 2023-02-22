// NOTE(somewhatabstract):
// These types are bare minimum to support document parsing. They're derived
// from graphql@14.5.8, the last version that provided flow types.
// Doing this avoids us having to take a dependency on that library just for
// these types.
export interface DefinitionNode {
    readonly kind: string;
}

export type VariableDefinitionNode = {
    readonly kind: "VariableDefinition";
};

export interface OperationDefinitionNode extends DefinitionNode {
    readonly kind: "OperationDefinition";
    readonly operation: string;
    readonly variableDefinitions: ReadonlyArray<VariableDefinitionNode>;
    readonly name?: {
        readonly kind: unknown;
        readonly value: string;
    };
}

export type DocumentNode = {
    readonly kind: "Document";
    readonly definitions: ReadonlyArray<DefinitionNode>;
};
