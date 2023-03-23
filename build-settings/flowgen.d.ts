// Adapted from https://github.com/joarwilk/flowgen/blob/master/index.js.flow

declare module "flowgen" {
    export type Options = {
        jsdoc?: boolean;
        interfaceRecords?: boolean;
        moduleExports?: boolean;
        quiet?: boolean;
        inexact?: boolean;
    };

    export type Compiler = {
        compileTest(path: string, target: string): void;
        compileDefinitionString(
            string: string,
            options?: Options,
            mapSourceCode?: (
                source: string | void,
                fileName: string,
            ) => string | void,
        ): string;
        compileDefinitionFile(
            path: string,
            options?: Options,
            mapSourceCode?: (
                source: string | void,
                fileName: string,
            ) => string | void,
        ): string;

        // Low-level exports
        reset(options?: Options): void;
        setChecker(checker: any /* ts.TypeChecker */): void;
        compile(sourceFile: any /* ts.SourceFile */): string;
    };

    export function beautify(str: string): string;
    export const compiler: Compiler;
}
