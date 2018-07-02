// @flow
import * as React from "react";

import NoSSR from "./no-ssr.js";

import UniqueIDFactory from "../util/unique-id-factory.js";
import SsrIDFactory from "../util/ssr-id-factory.js";

import type {IIdentifierFactory} from "../util/types.js";

type Props = {|
    // A render prop that takes an instance of IIdentifierFactory and returns
    // the content to be rendered. See the comments for placeholder prop for
    // more details.
    children: (IIdentifierFactory) => React.Node,

    // If provided, this render prop is called when rendering for the very first
    // time. This is useful to support server-side rendering with different
    // content than will eventually be rendered in the client. The first client
    // render and the server render will use this prop.
    //
    // If not provided, the children render prop will be called on first render.
    //
    // Whether this render prop, or children, the first render will receive an
    // instance of IIdentifierFactory where the id method returns the same
    // string with which it is called, rather than guaranteeing uniqueness.
    placeholder?: (IIdentifierFactory) => React.Node,

    // If this prop is specified, any identifiers provided will contain the
    // given scope. This can be useful for making easily readable identifiers.
    scope?: string,
|};

export default class UniqueIDProvider extends React.Component<Props> {
    _idFactory: IIdentifierFactory;

    _performRender() {
        const {children, placeholder, scope} = this.props;
        if (this._idFactory) {
            return children(this._idFactory);
        }
        // We haven't rendered yet. This must be our first render.
        // Let's create our real id factory for use in subsequent renders
        // and then call our placeholder prop with our SSR-friendly factory.
        this._idFactory = new UniqueIDFactory(scope);

        return (placeholder || children)(SsrIDFactory);
    }

    render() {
        return (
            <NoSSR placeholder={() => this._performRender()}>
                {() => this._performRender()}
            </NoSSR>
        );
    }
}
