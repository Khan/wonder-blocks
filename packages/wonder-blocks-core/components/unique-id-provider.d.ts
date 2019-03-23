import React, { ReactNode } from "react";
import { IIdentifierFactory } from "../util/types";
declare type Props = Readonly<{
    /**
     * A render prop that takes an instance of IIdentifierFactory and returns
     * the content to be rendered.
     *
     * If mockOnFirstRender is false, this is only called after
     * the initial render has occurred -- it will be blank for the
     * the first render -- and will always be called with the same
     * IIdentifierFactory instance.
     *
     * If mockOnFirstRender is true, this is called once with
     * a mock IIdentifierFactory for the initial render, and then a unique ID
     * factory thereafter.
     *
     * Full type with `IIdentifierFactory` definition inlined is:
     *
     * `{get(id: string): string} => React.Node`
     */
    children: (arg: IIdentifierFactory) => ReactNode;
    /**
     * If mockOnFirstRender is false, children is only called
     * after the initial render has occurred.
     * If mockOnFirstRender is true, children is called once with
     * a mock IIdentifierFactory for the initial render, and then a unique ID
     * factory thereafter.
     */
    mockOnFirstRender: boolean;
    /**
     * If this prop is specified, any identifiers provided will contain the
     * given scope. This can be useful for making easily readable identifiers.
     */
    scope?: string;
}>;
/**
 * The `UniqueIDProvider` component is how Wonder Blocks components obtain
 * unique identifiers. This component ensures that server-side rendering and
 * initial client rendering match while allowing the provision of unique
 * identifiers for the client.
 *
 * In all but the first render, the children are rendered with the same
 * `IIdentifierFactory` instance, ensuring that the same calls will return the
 * same identifiers.
 *
 * The `get` method of the identifier factory ensures that the same identifier
 * is returned for like requests, but also that all identifiers provided are
 * unique. Therefore, `get("test")` will always equal `get("test")`, and
 * `get("test2")` will always equal `get("test2")`, but `get("test")` will
 * never equal `get("test2")`.
 */
export default class UniqueIDProvider extends React.Component<Props> {
    _idFactory: IIdentifierFactory;
    _performRender(firstRender: boolean): {};
    render(): JSX.Element;
}
export {};
