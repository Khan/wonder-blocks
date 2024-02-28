import {API, FileInfo, Options} from "jscodeshift";

/**
 * Transforms:
 * const foo = true;
 *
 * to:
 * const bar = true;
 */
export default function transform(file: FileInfo, api: API, options: Options) {
    const j = api.jscodeshift;
    const root = j(file.source);

    root.find(j.Identifier, {name: "foo"}).forEach((path) => {
        j(path).replaceWith(j.identifier("bar"));
    });

    return root.toSource(options.printOptions);
}
