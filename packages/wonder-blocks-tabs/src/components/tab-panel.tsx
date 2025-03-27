import * as React from "react";

type Props = {
    children: React.ReactNode;
    id: string;
    "aria-labelledby": string;
};

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
