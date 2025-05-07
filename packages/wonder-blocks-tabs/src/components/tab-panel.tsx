import * as React from "react";
import {addStyle, StyleType} from "@khanacademy/wonder-blocks-core";
import {StyleSheet} from "aphrodite";
import {findFocusableNodes} from "../../../wonder-blocks-core/src/util/focus";

type Props = {
    /**
     * The contents of the tab panel.
     */
    children: React.ReactNode;
    /**
     * A unique id for the tab panel.
     */
    id: string;
    /**
     * Optional test ID for e2e testing.
     */
    testId?: string;
    /**
     * The id of the associated element with role="tab".
     */
    "aria-labelledby": string;

    /**
     * Whether the tab panel is active.
     */
    active?: boolean;

    /**
     * Custom styles for the `TabPanel` component.
     */
    style?: StyleType;
};

const StyledDiv = addStyle("div");
/**
 * A component that has `role="tabpanel"` and is used to represent a tab panel
 * in a tabbed interface.
 */
export const TabPanel = (props: Props) => {
    const {
        children,
        id,
        "aria-labelledby": ariaLabelledby,
        active = false,
        testId,
        style,
    } = props;

    const ref = React.useRef<HTMLDivElement>(null);
    const [hasFocusableElement, setHasFocusableElement] = React.useState(false);

    React.useEffect(() => {
        // Whenever tab panel contents change, determine if the panel has a
        // focusable element
        if (ref.current) {
            setHasFocusableElement(findFocusableNodes(ref.current).length > 0);
        }
    }, [active, ref, children]);

    return (
        <StyledDiv
            ref={ref}
            role="tabpanel"
            id={id}
            aria-labelledby={ariaLabelledby}
            // If the tab panel doesn't have focusable elements, it should be
            // focusable so that it is included in the tab sequence of the page
            tabIndex={hasFocusableElement ? undefined : 0}
            // Only show the tab panel if it is active
            hidden={!active}
            data-testid={testId}
            // Only apply styles if it is active so it doesn't override the display: none for inactive tabs
            style={[active && styles.tabPanel, style]}
        >
            {children}
        </StyledDiv>
    );
};

const styles = StyleSheet.create({
    tabPanel: {
        // Apply flex so that panel supports rtl
        display: "flex",
    },
});
