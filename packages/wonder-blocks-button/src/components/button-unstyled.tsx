import * as React from "react";
import {Link, useInRouterContext} from "react-router-dom-v5-compat";

import {addStyle} from "@khanacademy/wonder-blocks-core";
import type {StyleType} from "@khanacademy/wonder-blocks-core";
import {isClientSideUrl} from "@khanacademy/wonder-blocks-clickable";
import {ButtonProps} from "../util/button.types";

import resetStyles from "./button-unstyled.module.css";

const StyledA = addStyle("a");
const StyledButton = addStyle("button");
const StyledLink = addStyle(Link);

// Widen style type to accept CSS module class name strings alongside
// Aphrodite styles and inline style objects.
type StyleTypeWithCSSModules =
    | StyleType
    | string
    | ReadonlyArray<StyleType | string | false | null | undefined>;

type Props = Omit<ButtonProps, "children" | "style"> & {
    /**
     * The button content.
     */
    children: React.ReactNode;
    /**
     * Custom styles. Accepts Aphrodite styles, inline style objects,
     * and CSS module class name strings.
     */
    style?: StyleTypeWithCSSModules;
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
        skipClientNav,
        style,
        testId,
        type,
        ...restProps
    } = props;

    const commonProps = {
        "data-testid": testId,
        id: id,
        role: "button",
        style: [resetStyles.reset, style],
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
