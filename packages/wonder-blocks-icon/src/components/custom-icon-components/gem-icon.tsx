import * as React from "react";
import {addStyle} from "@khanacademy/wonder-blocks-core";
import {CustomIconProps} from "../../types";
import {useImageRoleAttributes} from "../../hooks/use-image-role-attributes";

const StyledSvg = addStyle("svg");
/**
 * A custom icon component that renders a gem icon using an inline svg. Use
 * with the `Icon` component to display the icon.
 */
const GemIcon = React.forwardRef<SVGSVGElement, CustomIconProps>(
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
                {/* TODO(WB-1947): Use semantic color tokens for fill and update component docs */}
                <path
                    d="M1.246 5.38105L2.36444 3.66654C2.63609 3.25012 3.0934 3 3.58311 3H12.4169C12.9066 3 13.3639 3.25012 13.6356 3.66654L14.754 5.38105C15.1278 5.95411 15.0708 6.71389 14.6158 7.22195L9.08044 13.4027C8.49982 14.051 7.50018 14.051 6.91956 13.4027L1.38423 7.22195C0.929229 6.71389 0.872177 5.95411 1.246 5.38105Z"
                    fill="#E83FA4"
                />
                <path
                    d="M9.45654 7.01492L8.34027 10.0102C8.07911 10.711 8.97464 11.2595 9.48018 10.7084L12.6345 7.26989C13.0351 6.83317 12.7253 6.12858 12.1327 6.12858H10.7327C10.164 6.12858 9.65515 6.48199 9.45654 7.01492Z"
                    fill="#F9BBE1"
                />
            </StyledSvg>
        );
    },
);

export {GemIcon};
