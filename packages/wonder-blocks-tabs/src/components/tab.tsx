import * as React from "react";

type Props = {
    children: React.ReactNode;
};

export const Tab = (props: Props) => {
    const {children} = props;
    return <div role="tab">{children}</div>;
};
