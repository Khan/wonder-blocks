import * as React from "react";
import {Link, useInRouterContext} from "react-router-dom-v5-compat";

import {addStyle} from "@khanacademy/wonder-blocks-core";
import {isClientSideUrl} from "@khanacademy/wonder-blocks-clickable";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import externalLinkIcon from "@phosphor-icons/core/bold/arrow-square-out-bold.svg";

import type {
    ChildrenProps,
    ClickableState,
} from "@khanacademy/wonder-blocks-clickable";
import type {SharedProps} from "./link";
import styles from "./link-core.module.css";

type Props = SharedProps &
    ChildrenProps &
    ClickableState & {
        href: string;
    };

const StyledA = addStyle("a");
const StyledLink = addStyle(Link);

const LinkCore = React.forwardRef(function LinkCore(
    props: Props,
    ref: React.ForwardedRef<typeof Link | HTMLAnchorElement>,
) {
    const inRouterContext = useInRouterContext();

    const {
        children,
        skipClientNav,
        focused,
        hovered, // eslint-disable-line @typescript-eslint/no-unused-vars
        href,
        inline = false,
        pressed,
        style,
        testId,
        waiting: _,
        target,
        startIcon,
        endIcon,
        viewTransition,
        ...restProps
    } = props;

    const classNames = [
        styles.shared,
        styles.rest,
        inline && styles.restInline,
        // focused is preserved to allow for programmatic focus.
        !pressed && focused && styles.focus,
    ]
        .filter(Boolean)
        .join(" ");

    const commonProps = {
        "data-testid": testId,
        style: [classNames, style].join(" "),
        target,
        ...restProps,
    } as const;

    const linkUrl = new URL(href, window.location.origin);

    const isExternalLink = linkUrl.origin !== window.location.origin;

    const externalIcon = (
        <PhosphorIcon
            icon={externalLinkIcon}
            size="small"
            style={[styles.endIcon, styles.centered]}
            testId="external-icon"
        />
    );

    let startIconElement;
    let endIconElement;

    if (startIcon) {
        startIconElement = React.cloneElement(startIcon, {
            style: [styles.startIcon, styles.centered],
            testId: "start-icon",
            "aria-hidden": "true",
            ...startIcon.props,
        } as Partial<
            React.ReactElement<React.ComponentProps<typeof PhosphorIcon>>
        >);
    }

    if (endIcon) {
        endIconElement = React.cloneElement(endIcon, {
            style: [styles.endIcon, styles.centered],
            testId: "end-icon",
            "aria-hidden": "true",
            ...endIcon.props,
        } as Partial<
            React.ReactElement<React.ComponentProps<typeof PhosphorIcon>>
        >);
    }

    const linkContent = (
        <>
            {startIcon && startIconElement}
            {children}
            {endIcon
                ? endIconElement
                : isExternalLink && target === "_blank" && externalIcon}
        </>
    );

    return inRouterContext && !skipClientNav && isClientSideUrl(href) ? (
        <StyledLink
            {...commonProps}
            to={href}
            ref={ref as React.ForwardedRef<typeof Link>}
            viewTransition={viewTransition}
        >
            {linkContent}
        </StyledLink>
    ) : (
        <StyledA
            {...commonProps}
            href={href}
            ref={ref as React.ForwardedRef<HTMLAnchorElement>}
        >
            {linkContent}
        </StyledA>
    );
});

export default LinkCore;
