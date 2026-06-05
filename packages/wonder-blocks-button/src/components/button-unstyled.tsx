import * as React from "react";
import {Link, useInRouterContext} from "react-router-dom-v5-compat";

import {addStyle} from "@khanacademy/wonder-blocks-core";
import {isClientSideUrl} from "@khanacademy/wonder-blocks-clickable";
import {ButtonProps} from "../util/button.types";

import styles from "./button-unstyled.module.css";

const StyledA = addStyle("a");
const StyledButton = addStyle("button");
const StyledLink = addStyle(Link);

type Props = Omit<ButtonProps, "children"> & {
    /**
     * The button content.
     */
    children: React.ReactNode;
};

const ButtonUnstyled: React.ForwardRefExoticComponent<
    Props &
        React.RefAttributes<typeof Link | HTMLButtonElement | HTMLAnchorElement>
> = React.forwardRef<
    typeof Link | HTMLButtonElement | HTMLAnchorElement,
    Props
>(function ButtonUnstyled(props: Props, ref) {
    const {
        children,
        disabled,
        href,
        id,
        kind,
        skipClientNav,
        style,
        testId,
        type,
        ...restProps
    } = props;

    const commonProps = {
        "data-testid": testId,
        "data-kind": kind,
        id: id,
        role: "button",
        style: [styles.reset, style],
        ...restProps,
    } as const;

    const inRouterContext = useInRouterContext();

    if (href && !disabled) {
        return inRouterContext && !skipClientNav && isClientSideUrl(href) ? (
            <StyledLink
                {...commonProps}
                to={href}
                ref={ref as React.Ref<typeof Link>}
            >
                {children}
            </StyledLink>
        ) : (
            <StyledA
                {...commonProps}
                href={href}
                ref={ref as React.Ref<HTMLAnchorElement>}
            >
                {children}
            </StyledA>
        );
    } else {
        return (
            <StyledButton
                type={type || "button"}
                {...commonProps}
                aria-disabled={disabled}
                ref={ref as React.Ref<HTMLButtonElement>}
            >
                {children}
            </StyledButton>
        );
    }
});

export {ButtonUnstyled};
