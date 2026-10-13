import * as React from "react";
import {View} from "@khanacademy/wonder-blocks-core";
import styles from "./modal-footer.module.css";

type Props = {
    children: React.ReactNode;
};

/**
 * Modal footer included after the content.
 *
 * **Implementation notes**:
 *
 * If you are creating a custom Dialog, make sure to follow these guidelines:
 * - Make sure to include it as part of [ModalPanel](/#modalpanel) by using the `footer` prop.
 * - The footer is completely flexible. Meaning the developer needs to add its own custom layout to match design specs.
 *
 * **Usage**
 *
 * ```js
 * <ModalFooter>
 *     <Button onClick={() => {}}>Submit</Button>
 * </ModalFooter>
 * ```
 */
export default function ModalFooter({children}: Props) {
    return <View style={[styles.root, styles.footer]}>{children}</View>;
}

ModalFooter.__IS_MODAL_FOOTER__ = true;

ModalFooter.isComponentOf = (instance: any): boolean => {
    return instance && instance.type && instance.type.__IS_MODAL_FOOTER__;
};
