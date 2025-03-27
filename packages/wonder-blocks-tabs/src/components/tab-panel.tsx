import * as React from "react";

type Props = {
    children: React.ReactElement;
};

export const TabPanel = (props: Props) => {
    const {children} = props;
    return <div role="tabpanel">{children}</div>;
};
