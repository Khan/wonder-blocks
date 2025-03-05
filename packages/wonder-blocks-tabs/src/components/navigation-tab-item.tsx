import * as React from "react";

type Props = {
    children: React.ReactElement;
};

export const NavigationTabItem = (props: Props) => {
    const {children} = props;
    return <li>{children}</li>;
};
