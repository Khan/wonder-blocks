import * as React from "react";
import {StyleSheet} from "aphrodite";
import {Link} from "react-router-dom";
import {__RouterContext} from "react-router";

import {addStyle} from "@khanacademy/wonder-blocks-core";
import Color, {mix, fade} from "@khanacademy/wonder-blocks-color";
import {isClientSideUrl} from "@khanacademy/wonder-blocks-clickable";
import Icon from "@khanacademy/wonder-blocks-icon";

import type {
    ChildrenProps,
    ClickableState,
} from "@khanacademy/wonder-blocks-clickable";
import type {StyleDeclaration} from "aphrodite";
import type {IconAsset} from "@khanacademy/wonder-blocks-icon";
import type {SharedProps} from "./link";

type Props = SharedProps &
    ChildrenProps &
    ClickableState & {
        href: string;
    };

const StyledAnchor = addStyle<"a">("a");
const StyledLink = addStyle<typeof Link>(Link);

export default class LinkCore extends React.Component<Props> {
    renderInner(router: any): React.ReactNode {
        const {
            children,
            skipClientNav,
            focused,
            hovered,
            href,
            inline,
            kind,
            light,
            visitable,
            pressed,
            style,
            testId,
            waiting: _,
            target,
            ...restProps
        } = this.props;

        const linkStyles = _generateStyles(inline, kind, light, visitable);
        const restingStyles = inline
            ? linkStyles.restingInline
            : linkStyles.resting;

        const defaultStyles = [
            sharedStyles.shared,
            !(hovered || focused || pressed) && restingStyles,
            pressed && linkStyles.active,
            // A11y: The focus ring should always be present when the
            // the link has focus, even the link is being hovered over.
            // TODO(WB-1498): Udpate ClickableBehavior so that focus doesn't
            // stop on mouseleave. We want the focus ring to remain on a
            // focused link even after hovering and un-hovering on it.
            !pressed && hovered && linkStyles.hover,
            !pressed && focused && linkStyles.focus,
        ];

        const commonProps = {
            "data-test-id": testId,
            style: [defaultStyles, style],
            ...restProps,
        } as const;

        const externalIconPath: IconAsset = {
            medium: "M14 6.5C14 6.63261 13.9473 6.75979 13.8536 6.85355C13.7598 6.94732 13.6326 7 13.5 7C13.3674 7 13.2402 6.94732 13.1464 6.85355C13.0527 6.75979 13 6.63261 13 6.5V3.7075L8.85437 7.85375C8.76055 7.94757 8.63331 8.00028 8.50062 8.00028C8.36794 8.00028 8.2407 7.94757 8.14688 7.85375C8.05305 7.75993 8.00035 7.63268 8.00035 7.5C8.00035 7.36732 8.05305 7.24007 8.14688 7.14625L12.2925 3H9.5C9.36739 3 9.24021 2.94732 9.14645 2.85355C9.05268 2.75979 9 2.63261 9 2.5C9 2.36739 9.05268 2.24021 9.14645 2.14645C9.24021 2.05268 9.36739 2 9.5 2H13.5C13.6326 2 13.7598 2.05268 13.8536 2.14645C13.9473 2.24021 14 2.36739 14 2.5V6.5ZM11.5 8C11.3674 8 11.2402 8.05268 11.1464 8.14645C11.0527 8.24021 11 8.36739 11 8.5V13H3V5H7.5C7.63261 5 7.75979 4.94732 7.85355 4.85355C7.94732 4.75979 8 4.63261 8 4.5C8 4.36739 7.94732 4.24021 7.85355 4.14645C7.75979 4.05268 7.63261 4 7.5 4H3C2.73478 4 2.48043 4.10536 2.29289 4.29289C2.10536 4.48043 2 4.73478 2 5V13C2 13.2652 2.10536 13.5196 2.29289 13.7071C2.48043 13.8946 2.73478 14 3 14H11C11.2652 14 11.5196 13.8946 11.7071 13.7071C11.8946 13.5196 12 13.2652 12 13V8.5C12 8.36739 11.9473 8.24021 11.8536 8.14645C11.7598 8.05268 11.6326 8 11.5 8Z",
        };

        const externalIcon = (
            <Icon
                icon={externalIconPath}
                size={"medium"}
                style={{paddingLeft: 4}}
            />
        );

        return router && !skipClientNav && isClientSideUrl(href) ? (
            <StyledLink {...commonProps} to={href}>
                {children}
                {target === "_blank" && externalIcon}
            </StyledLink>
        ) : (
            <StyledAnchor {...commonProps} href={href}>
                {children}
                {target === "_blank" && externalIcon}
            </StyledAnchor>
        );
    }

    render(): React.ReactNode {
        return (
            <__RouterContext.Consumer>
                {(router) => this.renderInner(router)}
            </__RouterContext.Consumer>
        );
    }
}

const styles: Record<string, any> = {};

const sharedStyles = StyleSheet.create({
    shared: {
        cursor: "pointer",
        textDecoration: "none",
        outline: "none",
        display: "inline-flex",
    },
});

const _generateStyles = (
    inline: boolean,
    kind: "primary" | "secondary",
    light: boolean,
    visitable: boolean,
) => {
    const buttonType = `${kind}-${inline.toString()}-${light.toString()}-${visitable.toString()}`;
    if (styles[buttonType]) {
        return styles[buttonType];
    }

    if (kind === "secondary" && light) {
        throw new Error("Secondary Light links are not supported");
    }

    if (visitable && kind !== "primary") {
        throw new Error("Only primary link is visitable");
    }

    const {blue, pink, purple, white, offBlack, offBlack32, offBlack64} = Color;

    // Standard purple
    const linkPurple = mix(fade(offBlack, 0.08), purple);
    // Light blue
    const fadedBlue = mix(fade(blue, 0.32), white);
    // Light pink
    const activeLightVisited = mix(fade(white, 0.32), pink);
    // Dark blue
    const activeDefaultPrimary = mix(offBlack32, blue);

    const primaryDefaultTextColor = light ? white : blue;
    const secondaryDefaultTextColor = inline ? offBlack : offBlack64;
    const defaultTextColor =
        kind === "primary"
            ? primaryDefaultTextColor
            : secondaryDefaultTextColor;

    const primaryActiveColor = light ? fadedBlue : activeDefaultPrimary;
    const secondaryActiveColor = inline ? activeDefaultPrimary : offBlack;
    const activeColor =
        kind === "primary" ? primaryActiveColor : secondaryActiveColor;

    const defaultVisited = visitable
        ? {
              ":visited": {
                  color: light ? pink : linkPurple,
              },
          }
        : Object.freeze({});
    const activeVisited = visitable
        ? {
              ":visited": {
                  color: light
                      ? activeLightVisited
                      : mix(offBlack32, linkPurple),
              },
          }
        : Object.freeze({});

    const newStyles: StyleDeclaration = {
        resting: {
            color: defaultTextColor,
            ...defaultVisited,
        },
        restingInline: {
            color: defaultTextColor,
            // TODO(WB-1521): Update text decoration to the 1px dashed
            // underline after the Link audit.
            // textDecoration: "underline currentcolor solid 1px",
            textDecoration: "underline currentcolor solid",
            // TODO(WB-1521): Update the underline offset to be 4px after
            // the Link audit.
            // textUnderlineOffset: 4,
            ...defaultVisited,
        },
        hover: {
            // TODO(WB-1521): Update text decoration to the 1px dashed
            // underline after the Link audit.
            // textDecoration: "underline currentcolor dashed 2px",
            textDecoration: "underline currentcolor solid",
            color: defaultTextColor,
            // TODO(WB-1521): Update the underline offset to be 4px after
            // the Link audit.
            // textUnderlineOffset: 4,
            ...defaultVisited,
        },
        focus: {
            color: defaultTextColor,
            outline: `1px solid ${light ? white : blue}`,
            borderRadius: 3,
            ...defaultVisited,
        },
        active: {
            color: activeColor,
            textDecoration: "underline currentcolor solid",
            // TODO(WB-1521): Update the underline offset to be 4px after
            // the Link audit.
            // textUnderlineOffset: 4,
            ...activeVisited,
        },
    };

    styles[buttonType] = StyleSheet.create(newStyles);
    return styles[buttonType];
};
