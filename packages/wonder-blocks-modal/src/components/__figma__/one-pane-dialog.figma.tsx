import * as React from "react";
import {figma} from "@figma/code-connect";
import OnePaneDialog from "../one-pane-dialog";
import ModalFooter from "../modal-footer";

// Placeholder for @khanacademy/wonder-blocks-button
const Button = ({children, ...props}: any) => (
    <button {...props}>{children}</button>
);
// Placeholder for @khanacademy/wonder-blocks-body-text
const BodyText = ({children, ...props}: any) => (
    <div {...props}>{children}</div>
);
// Placeholder for View from @khanacademy/wonder-blocks-core
const View = ({children, ...props}: any) => <div {...props}>{children}</div>;
// Placeholder constants for the example
const styles = {footer: {}};
const STEPS_CURRENT = 1;
const STEPS_TOTAL = 4;

figma.connect(
    OnePaneDialog,
    "https://www.figma.com/design/EuFu0U7gqc1koXm8ZhlOLp/%E2%9A%A1%EF%B8%8F-Components?node-id=9603-3296&t=wiovFM54dUov6kTo-4",
    {
        props: {
            textProps: figma.nestedProps("Header", {
                title: figma.textContent("Title"),
            }),
            slotProps: figma.nestedProps("Slot", {
                content: figma.children("*"),
            }),
        },
        example: (props) => (
            <OnePaneDialog
                title={props.textProps.title}
                // Get content from "Slot" instance. Could be as simple as `<BodyText>{props.slotProps.content}</BodyText>` or as complex as a custom component.
                content={props.slotProps.content}
                // Only include footer attr if shown in design. Simplest is one primary Button. Shown is a complex example that requires a View wrapper.
                footer={
                    <ModalFooter>
                        <View style={styles.footer}>
                            <BodyText weight="bold">
                                Step {STEPS_CURRENT} of {STEPS_TOTAL}{" "}
                                {/* Needs to be l10n using t`` pattern */}
                            </BodyText>
                            <View>
                                <Button kind="tertiary">Previous</Button>
                                <Button kind="primary">Next</Button>
                            </View>
                        </View>
                    </ModalFooter>
                }
            />
        ),
    },
);
