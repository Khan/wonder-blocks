// @flow
import * as React from "react";

import WithSSRPlaceholder from "./with-ssr-placeholder.js";

import UniqueIDFactory from "../util/unique-id-factory.js";
import SsrIDFactory from "../util/ssr-id-factory.js";

import type {IIdentifierFactory} from "../util/types.js";

// TODO(FEI-4202): update to use `useUniqueId`
type Props = {|
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
    children: (IIdentifierFactory) => React.Node,

    /**
     * If mockOnFirstRender is false, children is only called
     * after the initial render has occurred.
     * If mockOnFirstRender is true, children is called once with
     * a mock IIdentifierFactory for the initial render, and then a unique ID
     * factory thereafter.
     */
    mockOnFirstRender: boolean,

    /**
     * If this prop is specified, any identifiers provided will contain the
     * given scope. This can be useful for making easily readable identifiers.
     */
    +scope?: string,
|};

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

    _performRender(firstRender: boolean): React.Node {
        const {children, mockOnFirstRender, scope} = this.props;

        // If this is our first render, we're going to stop right here.
        // Note: `firstRender` will be `false` on the first render if this
        // component is a descendant of a `WithSSRPlaceholder`.
        if (firstRender) {
            if (mockOnFirstRender) {
                // We're allowing an initial render, so let's pass our mock
                // identifier factory to support SSR.
                return children(SsrIDFactory);
            }
            return null;
        }

        // Create an identifier factory if we don't already have one
        if (!this._idFactory) {
            this._idFactory = new UniqueIDFactory(scope);
        }

        // It's a regular render, so let's use our identifier factory.
        return children(this._idFactory);
    }

    render(): React.Node {
        // Here we use the WithSSRPlaceholder component to control
        // when we render and whether we provide a mock or real
        // identifier factory.
        return (
            <WithSSRPlaceholder placeholder={() => this._performRender(true)}>
                {() => this._performRender(false)}
            </WithSSRPlaceholder>
        );
    }
}
