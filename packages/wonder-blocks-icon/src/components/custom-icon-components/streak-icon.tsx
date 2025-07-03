import * as React from "react";
import {addStyle} from "@khanacademy/wonder-blocks-core";
import {semanticColor} from "@khanacademy/wonder-blocks-tokens";
import {CustomIconProps} from "../../types";
import {useImageRoleAttributes} from "../../hooks/use-image-role-attributes";

const StyledSvg = addStyle("svg");
/**
 * A custom icon component that renders a streak icon using an inline svg. Use
 * with the `Icon` component to display the icon.
 *
 * The icon uses semantic color tokens for the different parts of the icon so
 * it will respond to the current theme.
 */
const StreakIcon = React.forwardRef<SVGSVGElement, CustomIconProps>(
    (props, ref) => {
        const {
            "aria-label": ariaLabel,
            "aria-labelledby": ariaLabelledBy,
            id,
            testId,
            style,
            ...otherProps
        } = props;

        const attributes = useImageRoleAttributes({
            "aria-label": ariaLabel,
            "aria-labelledby": ariaLabelledBy,
        });

        return (
            <StyledSvg
                id={id}
                data-testid={testId}
                style={style}
                ref={ref}
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                {...attributes}
                {...otherProps}
            >
                <path
                    d="M9.14653 0.628361C9.07012 0.571421 8.97956 0.531782 8.88248 0.512785C8.78539 0.493787 8.68464 0.49599 8.5887 0.519205C8.49277 0.542421 8.40447 0.585969 8.33125 0.64618C8.25802 0.70639 8.20202 0.781496 8.16797 0.865168L5.47556 5.06034L4.59152 3.43463C4.52866 3.37998 4.45359 3.33789 4.37125 3.31114C4.28892 3.28438 4.2012 3.27357 4.11387 3.27941C4.02653 3.28525 3.94157 3.30761 3.86458 3.34502C3.78759 3.38243 3.72032 3.43403 3.66719 3.49644C1.98899 5.46729 1.13672 7.44994 1.13672 9.38884C1.13672 11.0096 1.85506 12.564 3.13372 13.7101C4.41238 14.8561 6.14661 15.5 7.9549 15.5C9.7632 15.5 11.4974 14.8561 12.7761 13.7101C14.0547 12.564 14.7731 11.0096 14.7731 9.38884C14.7731 5.26034 10.8379 1.88879 9.14653 0.628361Z"
                    fill={semanticColor.learning.foreground.streaks.default}
                />
                <path
                    d="M10.8067 10.5315C10.8067 12.0965 9.53809 13.3651 7.97318 13.3651C6.40826 13.3651 5.13965 12.0965 5.13965 10.5315C5.13965 8.96663 7.2648 6.28125 7.97318 6.28125C8.68156 6.28125 10.8067 8.96663 10.8067 10.5315Z"
                    fill={semanticColor.learning.foreground.streaks.subtle}
                />
            </StyledSvg>
        );
    },
);

export {StreakIcon};
