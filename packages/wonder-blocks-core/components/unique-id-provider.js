// @flow
import * as React from "react";

import NoSSR from "./no-ssr.js";

import UniqueIDFactory from "../util/unique-id-factory.js";
import SsrIDFactory from "../util/ssr-id-factory.js";

import type {IIdentifierFactory} from "../util/types.js";

type Props = {|
    /**
     * A render prop that takes an instance of IIdentifierFactory and returns
     * the content to be rendered.
     *
     * If mockOnFirstRender is false, this is only called after
     * the initial render has occurred and will always be called with the same
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
    mockOnFirstRender?: boolean,

    /**
     * If this prop is specified, any identifiers provided will contain the
     * given scope. This can be useful for making easily readable identifiers.
     */
    +scope?: string,
|};

export default class UniqueIDProvider extends React.Component<Props> {
    _idFactory: IIdentifierFactory;

    _performRender(firstRender: boolean) {
        const {children, mockOnFirstRender, scope} = this.props;

        // If this is our first render, we're going to stop right here.
        if (firstRender) {
            // We'll be needing this on the next render, so let's set it up.
            this._idFactory = new UniqueIDFactory(scope);

            if (mockOnFirstRender) {
                // We're allowing an initial render, so let's pass our mock
                // identifier factory to support SSR.
                return children(SsrIDFactory);
            }
            return null;
        }

        // It's a regular render, so let's use our identifier factory.
        return children(this._idFactory);
    }

    render() {
        // Here we use the NoSSR component to control when we render and whether
        // we provide a mock or real identifier factory.
        return (
            <NoSSR placeholder={() => this._performRender(true)}>
                {() => this._performRender(false)}
            </NoSSR>
        );
    }
}
