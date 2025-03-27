import * as React from "react";

type Props = {
    children: React.ReactNode;
    onClick?: (event: React.MouseEvent) => unknown;
};

export const Tab = React.forwardRef(function Tab(
    props: Props,
    ref: React.ForwardedRef<HTMLButtonElement>,
) {
    const {children, onClick} = props;
    return (
        <button role="tab" onClick={onClick} ref={ref}>
            {children}
        </button>
    );
});
