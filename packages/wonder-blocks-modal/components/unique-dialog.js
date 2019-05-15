// @flow
import * as React from "react";

import {UniqueIDProvider} from "@khanacademy/wonder-blocks-core";
import type {IIdentifierFactory} from "@khanacademy/wonder-blocks-core";

type Props = {|
    /**
     * Use the children-as-function pattern to pass a uniqueId string for
     * use anywhere within children. This provides a way of adding a unique title
     * to an existant modal variation (OnePaneDialog) or a custom modal implementation.
     */
    children: (uniqueId?: string) => React.Node,

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
 * This is a Dialog wrapper that returns a unique Modal Title for A11Y purposes.
 * This way, the wrapped Dialog will receive this custom ID and will use it to refer to a
 * visible dialog title.
 *
 * @see https://www.w3.org/TR/wai-aria-practices/#dialog_roles_states_props
 */
export default class UniqueDialog extends React.Component<Props> {
    static defaultTitleId = "wb-title";

    renderChildren(ids?: IIdentifierFactory) {
        const {id, children} = this.props;
        const titleId = ids ? ids.get(UniqueDialog.defaultTitleId) : id;

        if (!titleId) {
            throw new Error("Did not get an identifier factory nor a id prop");
        }

        return children(titleId);
    }

    render() {
        const {id} = this.props;

        if (id) {
            // Let's bypass the extra weight of an id provider since we don't
            // need it.
            return this.renderChildren();
        } else {
            return (
                <UniqueIDProvider scope="modal" mockOnFirstRender={true}>
                    {(ids) => this.renderChildren(ids)}
                </UniqueIDProvider>
            );
        }
    }
}
