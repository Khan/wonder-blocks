import * as React from "react";

type Props = {
    children: React.ReactNode;
};

export const TabPanel = React.forwardRef(function TabPanel(
    props: Props,
    ref: React.ForwardedRef<HTMLDivElement>,
) {
    const {children} = props;
    return (
        <div ref={ref} role="tabpanel">
            {children}
        </div>
    );
});
