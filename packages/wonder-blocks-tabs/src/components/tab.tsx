import * as React from "react";

type Props = {
    children: React.ReactNode;
    onClick?: (event: React.MouseEvent) => unknown;
};

export const Tab = (props: Props) => {
    const {children, onClick} = props;
    return (
        <button role="tab" onClick={onClick}>
            {children}
        </button>
    );
};
