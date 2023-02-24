import * as React from "react";

import UniqueIDProvider from "./unique-id-provider";

import type {IIdentifierFactory} from "../util/types";

type Props = {
    /**
     * Use the children-as-function pattern to pass a uniqueId string for
     * use anywhere within children. This provides a way of adding a unique identifier
     * to a given component for a11y purposes.
     */
    children: (uniqueId: string) => React.ReactElement;
    /**
     * Scope for the unique identifier
     */
    scope: string;
    /**
     * An optional id parameter for the title. If one is
     * not provided, a unique id will be generated.
     */
    id?: string;
    /**
     * Test ID used for e2e testing.
     */
    testId?: string;
};

/**
 * This is a wrapper that returns an identifier. If the `id` prop is set, the
 * component will return the same id to be consumed by its children. Otherwise,
 * a unique id will be provided. This is beneficial for accessibility purposes,
 * among other things.
 *
 * The main difference with `UniqueIDProvider` is that `IDProvider` has a single
 * responsibility, to return an identifier that can by used by the children that
 * are rendered internally.
 *
 * This way, the wrapped component will receive this custom ID and will use it
 * to connect different elements.
 *
 * e.g. It uses the same generated id to connect a Dialog with its main title,
 * or form label with the associated input element, etc.
 *
 * ## Usage
 *
 * ```jsx
 * import {IDProvider} from "@khanacademy/wonder-blocks-core";
 *
 * <IDProvider scope="field">
 *  {(uniqueId) => (
 *     Unique ID: {uniqueId}
 *  )}
 * </IDProvider>
 * ```
 *
 */
export default class IDProvider extends React.Component<Props> {
    static defaultId = "wb-id";

    renderChildren(ids?: IIdentifierFactory): React.ReactNode {
        const {id, children} = this.props;
        const uniqueId = ids ? ids.get(IDProvider.defaultId) : id;

        if (!uniqueId) {
            throw new Error("Did not get an identifier factory nor a id prop");
        }

        return children(uniqueId);
    }

    render(): React.ReactElement {
        const {id, scope} = this.props;

        if (id) {
            // Let's bypass the extra weight of an id provider since we don't
            // need it.
            // @ts-expect-error [FEI-5019] - TS2322 - Type 'ReactNode' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'.
            return this.renderChildren();
        } else {
            return (
                <UniqueIDProvider scope={scope} mockOnFirstRender={true}>
                    {/* @ts-expect-error [FEI-5019] - TS2769 - No overload matches this call. */}
                    {(ids) => this.renderChildren(ids)}
                </UniqueIDProvider>
            );
        }
    }
}
