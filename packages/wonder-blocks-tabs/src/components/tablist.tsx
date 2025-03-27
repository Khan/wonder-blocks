import * as React from "react";

type Props = {
    children: React.ReactElement | Array<React.ReactElement>;
};

export const Tablist = (props: Props) => {
    const {children} = props;
    return <div role="tablist">{children}</div>;
};
