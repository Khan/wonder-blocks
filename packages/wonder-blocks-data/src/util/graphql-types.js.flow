// @flow
// NOTE(somewhatabstract):
// These types are bare minimum to support document parsing. They're derived
// from graphql@14.5.8, the last version that provided flow types.
// Doing this avoids us having to take a dependency on that library just for
// these types.
export interface DefinitionNode {
    +kind: string;
}

export type VariableDefinitionNode = {
    +kind: "VariableDefinition",
    ...
};

export interface OperationDefinitionNode extends DefinitionNode {
    +kind: "OperationDefinition";
    +operation: string;
    +variableDefinitions: $ReadOnlyArray<VariableDefinitionNode>;
    +name?: {|
        +kind: mixed,
        +value: string,
    |};
}

export type DocumentNode = {
    +kind: "Document",
    +definitions: $ReadOnlyArray<DefinitionNode>,
    ...
};
