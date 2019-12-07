// @flow
import * as React from "react";

import UniqueIDProvider from "./unique-id-provider.js";

import type {IIdentifierFactory} from "../util/types.js";

type Props = {|
    /**
     * Use the children-as-function pattern to pass a uniqueId string for
     * use anywhere within children. This provides a way of adding a unique identifier
     * to a given component for a11y purposes.
     */
    children: (uniqueId: string) => React.Node,

    /**
     * Scope for the unique identifier
     */
    scope: string,

    /**
     * An optional id parameter for the title. If one is
     * not provided, a unique id will be generated.
     */
    id?: string,

    /**
     * Test ID used for e2e testing.
     */
    testId?: string,
|};

/**
 * This is a wrapper that returns an identifier. If the `id` prop is set, the component will
 * return the same id to be consumed by its children. Otherwise, a unique id will be provided.
 * This is beneficial for accessibility purposes, among other things.
 *
 * The main difference with UniqueIDProvider is that IDProvider has a single responsibility,
 * to return an identifier that can by used by the children that are rendered internally.
 *
 * This way, the wrapped component will receive this custom ID and will use it to connect
 * different elements.
 *
 * e.g. It uses the same generated id to connect a Dialog with its main title, or form label
 * with the associated input element, etc.
 */
export default class IDProvider extends React.Component<Props> {
    static defaultId = "wb-id";

    renderChildren(ids?: IIdentifierFactory) {
        const {id, children} = this.props;
        const uniqueId = ids ? ids.get(IDProvider.defaultId) : id;

        if (!uniqueId) {
            throw new Error("Did not get an identifier factory nor a id prop");
        }

        return children(uniqueId);
    }

    render() {
        const {id, scope} = this.props;

        if (id) {
            // Let's bypass the extra weight of an id provider since we don't
            // need it.
            return this.renderChildren();
        } else {
            return (
                <UniqueIDProvider scope={scope} mockOnFirstRender={true}>
                    {(ids) => this.renderChildren(ids)}
                </UniqueIDProvider>
            );
        }
    }
}
