import * as React from "react";

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
};

/**
 * A component that has `role="tabpanel"` and is used to represent a tab panel
 * in a tabbed interface.
 */
export const TabPanel = React.forwardRef(function TabPanel(
    props: Props,
    ref: React.ForwardedRef<HTMLDivElement>,
) {
    const {children, id, "aria-labelledby": ariaLabelledby} = props;
    return (
        <div ref={ref} role="tabpanel" id={id} aria-labelledby={ariaLabelledby}>
            {children}
        </div>
    );
});
