import * as React from "react";

type Props = {
    children: React.ReactElement | Array<React.ReactElement>;
};

export const NavigationTabs = (props: Props) => {
    const {children} = props;
    return (
        <nav>
            <ul>{children}</ul>
        </nav>
    );
};
