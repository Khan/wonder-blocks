import * as React from "react";
import {StyleSheet} from "aphrodite";
import {addStyle} from "@khanacademy/wonder-blocks-core";
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
     * The id of the associated element with role="tab".
     */
    "aria-labelledby": string;

    /**
     * Whether the tab panel is active.
     */
    active?: boolean;
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
            style={!active && styles.hidden}
            // If the tab panel doesn't have focusable elements, it should be
            // focusable so that it is included in the tab sequence of the page
            tabIndex={hasFocusableElement ? undefined : 0}
        >
            {children}
        </StyledDiv>
    );
};

const styles = StyleSheet.create({
    hidden: {
        display: "none",
    },
});
