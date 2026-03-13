import * as React from "react";
import {View} from "@khanacademy/wonder-blocks-core";
import type {StyleType} from "@khanacademy/wonder-blocks-core";
import {StyleSheet} from "aphrodite";
import {semanticColor} from "@khanacademy/wonder-blocks-tokens";
// TODO [WB-2137]: standardize media query breakpoint tokens
import {
    attachAnnouncerToModal,
    detachAnnouncerFromModal,
} from "@khanacademy/wonder-blocks-announcer";
import {modalMediaQuery} from "../util/constants";
import theme from "../theme";

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
     * The accessible name of dialog.
     * See WCAG 2.1: 4.1.2 Name, Role, Value
     */
    "aria-label"?: string;
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
const ModalDialog = React.forwardRef(function ModalDialog(
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
        "aria-label": ariaLabel,
        "aria-labelledby": ariaLabelledBy,
        "aria-describedby": ariaDescribedBy,
    } = props;

    // Internal ref for the aria-modal element, used to attach/detach
    // the announcer live regions. A separate ref is used so we don't
    // interfere with the forwarded ref used by callers.
    const dialogRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const el = dialogRef.current;
        if (!el) {
            return;
        }
        attachAnnouncerToModal(el);
        return () => {
            detachAnnouncerFromModal(el);
        };
    }, []);

    return (
        <View style={componentStyles.paddingLayer} data-modal-padding-layer>
            {/* WB-2197: We add a data attribute for identifying this layer on backdrop clicks */}
            <View style={[componentStyles.wrapper, style]}>
                {below && <View style={componentStyles.below}>{below}</View>}
                <View
                    role={role}
                    aria-modal="true"
                    aria-label={ariaLabel}
                    aria-labelledby={ariaLabelledBy}
                    aria-describedby={ariaDescribedBy}
                    ref={(node) => {
                        // Populate both the internal ref and the forwarded ref.
                        // View renders a div, so the cast to HTMLDivElement is safe.
                        const divNode = node as HTMLDivElement | null;
                        (
                            dialogRef as React.MutableRefObject<HTMLDivElement | null>
                        ).current = divNode;
                        if (typeof ref === "function") {
                            ref(divNode);
                        } else if (ref) {
                            ref.current = divNode;
                        }
                    }}
                    style={componentStyles.dialog}
                    testId={testId}
                >
                    {children}
                </View>
                {above && <View style={componentStyles.above}>{above}</View>}
            </View>
        </View>
    );
});

const componentStyles = StyleSheet.create({
    // pad outside of the shadow layer so the background color stays aligned
    paddingLayer: {
        alignItems: "center",
        height: "100%",
        justifyContent: "center",
        width: "100%",
        [modalMediaQuery.midOrSmaller as any]: {
            padding: theme.dialog.layout.padding,
        },
    },
    wrapper: {
        alignItems: "stretch",
        borderRadius: theme.root.border.radius,
        boxShadow: theme.dialog.shadow.default,
        // Allows propagating the text color to all the children.
        color: semanticColor.core.foreground.neutral.strong,
        flexDirection: "row",
        height: "100%",
        position: "relative",
        width: "100%",
        [modalMediaQuery.midOrSmaller as any]: {
            flexDirection: "column",
        },
        [modalMediaQuery.smMinOrSmallerHeight as any]: {
            overflow: "auto",
        },
    },

    /**
     * Ensures the dialog container uses the container size
     */
    dialog: {
        width: "100%",
        height: "100%",
        borderRadius: theme.root.border.radius,
        overflow: "hidden",
        [modalMediaQuery.smMinOrSmallerHeight as any]: {
            overflow: "auto",
        },
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
