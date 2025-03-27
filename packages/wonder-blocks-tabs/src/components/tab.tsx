import * as React from "react";

type Props = {
    children: React.ReactNode;
    onClick?: (event: React.MouseEvent) => unknown;
    id: string;
    "aria-controls": string;
    selected?: boolean;
};

export const Tab = React.forwardRef(function Tab(
    props: Props,
    ref: React.ForwardedRef<HTMLButtonElement>,
) {
    const {
        children,
        onClick,
        id,
        "aria-controls": ariaControls,
        selected,
    } = props;
    return (
        <button
            role="tab"
            onClick={onClick}
            ref={ref}
            id={id}
            aria-controls={ariaControls}
            aria-selected={selected}
        >
            {children}
        </button>
    );
});
