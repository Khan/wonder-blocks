// @flow
import * as React from "react";

import {Toolbar} from "@khanacademy/wonder-blocks-toolbar";

type Props = {
    /**
     * The title of the modal, appearing in the titlebar.
     *
     * If a subtitle is also present, this becomes smaller to accommodate both
     * within the title bar.
     */
    title: string,

    /**
     * The subtitle of the modal, appearing in the titlebar, below the title.
     */
    subtitle?: string,

    color: "light" | "dark",
};

export default class ModalTitleBar extends React.Component<Props> {
    static defaultProps = {
        color: "light",
    };

    render() {
        const {color, title, subtitle} = this.props;

        // TODO(scottgrant): Set size appropriately using mediaSize.
        return <Toolbar color={color} title={title} subtitle={subtitle} />;
    }
}
