import * as React from "react";
import {View} from "@khanacademy/wonder-blocks-core";
import type {StyleType} from "@khanacademy/wonder-blocks-core";

import {
    ThemedStylesFn,
    useScopedTheme,
    useStyles,
} from "@khanacademy/wonder-blocks-theming";
import ThemeModalDialog, {
    ModalDialogThemeContext,
    ModalDialogThemeContract,
} from "../themes/themed-modal-dialog";

type Props = {
    /**
     * The dialog content
     */
    children: React.ReactNode;
    /**
     * When set, provides a component that can render content above the top of the modal;
     * when not set, no additional content is shown above the modal.
     * This prop is passed down to the ModalDialog.
     */
    above?: React.ReactNode;
    /**
     * When set, provides a component that will render content below the bottom of the modal;
     * when not set, no additional content is shown below the modal.
     * This prop is passed down to the ModalDialog.
     */
    below?: React.ReactNode;
    /**
     * When set, overrides the default role value. Default role is "dialog"
     * Roles other than dialog and alertdialog aren't appropriate for this
     * component
     */
    role?: "dialog" | "alertdialog";
    /**
     * Custom styles
     */
    style?: StyleType;
    /**
     * Test ID used for e2e testing.
     */
    testId?: string;
    /**
     * The ID of the title labelling this dialog. Required.
     * See WCAG 2.1: 4.1.2 Name, Role, Value
     */
    "aria-labelledby": string;
    /**
     * The ID of the content describing this dialog, if applicable.
     */
    "aria-describedby"?: string;
};

/**
 * `ModalDialog` is a component that contains these elements:
 * - The visual dialog element itself (`<div role="dialog"/>`)
 * - The custom contents below and/or above the Dialog itself (e.g. decorative graphics).
 *
 * **Accessibility notes:**
 * - By default (e.g. using `OnePaneDialog`), `aria-labelledby` is populated automatically using the dialog title `id`.
 * - If there is a custom Dialog implementation (e.g. `TwoPaneDialog`), the dialog element doesn’t have to have
 * the `aria-labelledby` attribute however this is recommended. It should match the `id` of the dialog title.
 */
const ModalDialogCore = React.forwardRef(function ModalDialogCore(
    props: Props,
    ref: React.ForwardedRef<HTMLDivElement>,
) {
    const {
        above,
        below,
        role = "dialog",
        style,
        children,
        testId,
        "aria-labelledby": ariaLabelledBy,
        "aria-describedby": ariaDescribedBy,
    } = props;

    const {theme} = useScopedTheme(ModalDialogThemeContext);
    const styles = useStyles(themedStylesFn, theme);

    return (
        <View style={[styles.wrapper, style]}>
            {below && <View style={styles.below}>{below}</View>}
            <View
                role={role}
                aria-modal="true"
                aria-labelledby={ariaLabelledBy}
                aria-describedby={ariaDescribedBy}
                ref={ref}
                style={styles.dialog}
                testId={testId}
            >
                {children}
            </View>
            {above && <View style={styles.above}>{above}</View>}
        </View>
    );
});

const ModalDialog = React.forwardRef(function ModalDialog(
    props: Props,
    ref: React.ForwardedRef<HTMLDivElement>,
) {
    return (
        <ThemeModalDialog>
            <ModalDialogCore {...props} ref={ref} />
        </ThemeModalDialog>
    );
});

const small = "@media (max-width: 767px)";

const themedStylesFn: ThemedStylesFn<ModalDialogThemeContract> = (theme) => ({
    wrapper: {
        display: "flex",
        flexDirection: "row",
        alignItems: "stretch",
        width: "100%",
        height: "100%",
        position: "relative",
        [small]: {
            padding: theme.spacing.dialog.small,
            flexDirection: "column",
        },
    },

    /**
     * Ensures the dialog container uses the container size
     */
    dialog: {
        width: "100%",
        height: "100%",
        borderRadius: theme.border.radius,
        overflow: "hidden",
    },

    above: {
        pointerEvents: "none",
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: 1,
    },

    below: {
        pointerEvents: "none",
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: -1,
    },
});

ModalDialog.displayName = "ModalDialog";

export default ModalDialog;
