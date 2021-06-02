// @flow
import * as React from "react";

import {css} from "aphrodite";
import type {StyleType} from "@khanacademy/wonder-blocks-core";

const TypeMetrics = {
    Sans: {
        Family: '"Lato", "Noto Sans", sans-serif',
        Weights: {
            Regular: 400,
            Strong: 700,
        },
    },
    Serif: {
        Family: '"Source Serif Pro", "Noto Serif", serif',
        Weights: {
            Regular: 400,
            Strong: 600,
        },
    },
    Monospace: {
        Family: '"Inconsolata", monospace',
        Weights: {
            Regular: 400,
            Strong: 700,
        },
    },
};

const styleFragments = {
    Common: {
        MozOsxFontSmoothing: "grayscale",
        WebkitFontSmoothing: "antialiased",
        display: "block",
        margin: 0,
    },
    SerifRegular: {
        fontFamily: TypeMetrics.Serif.Family,
        fontWeight: TypeMetrics.Serif.Weights.Regular,
    },
    SerifStrong: {
        fontFamily: TypeMetrics.Serif.Family,
        fontWeight: TypeMetrics.Serif.Weights.Strong,
    },
    SansRegular: {
        fontFamily: TypeMetrics.Sans.Family,
        fontWeight: TypeMetrics.Sans.Weights.Regular,
    },
    SansStrong: {
        fontFamily: TypeMetrics.Sans.Family,
        fontWeight: TypeMetrics.Sans.Weights.Strong,
    },
    MonospaceRegular: {
        fontFamily: TypeMetrics.Monospace.Family,
        fontWeight: TypeMetrics.Monospace.Weights.Regular,
    },
    MonospaceStrong: {
        fontFamily: TypeMetrics.Monospace.Family,
        fontWeight: TypeMetrics.Monospace.Weights.Strong,
    },
    // Heading
    Heading: {
        display: "block",
    },
    HeadingXXXLarge: {
        fontSize: "60px",
        lineHeight: "68px",
    },
    HeadingXXLarge: {
        fontSize: "48px",
        lineHeight: "54px",
    },
    HeadingXLarge: {
        fontSize: "38px",
        lineHeight: "42px",
    },
    HeadingLarge: {
        fontSize: "30px",
        lineHeight: "34px",
    },
    HeadingMedium: {
        fontSize: "24px",
        lineHeight: "28px",
    },
    HeadingSmall: {
        fontSize: "20px",
        lineHeight: "22px",
    },
    HeadingXSmall: {
        fontSize: "12px",
        lineHeight: "16px",
    },
    // Compact Heading
    CompactHeading: {
        display: "block",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
    },
    CompactHeadingXLarge: {
        fontSize: "18px",
        lineHeight: "24px",
    },
    CompactHeadingLarge: {
        fontSize: "16px",
        lineHeight: "20px",
    },
    CompactHeadingMedium: {
        fontSize: "14px",
        lineHeight: "18px",
    },
    CompactHeadingSmall: {
        fontSize: "12px",
        lineHeight: "16px",
    },
    // Label
    Label: {
        display: "block",
    },
    LabelXLarge: {
        fontSize: "20px",
        lineHeight: "26px",
    },
    LabelLarge: {
        fontSize: "18px",
        lineHeight: "24px",
    },
    LabelMedium: {
        fontSize: "16px",
        lineHeight: "20px",
    },
    LabelSmall: {
        fontSize: "14px",
        lineHeight: "18px",
    },
    LabelXSmall: {
        fontSize: "12px",
        lineHeight: "16px",
    },
    // Statement
    Statement: {
        display: "block",
    },
    StatementXLarge: {
        fontSize: "30px",
        lineHeight: "40px",
    },
    StatementLarge: {
        fontSize: "24px",
        lineHeight: "32px",
    },
    StatementMedium: {
        fontSize: "20px",
        lineHeight: "28px",
    },
    // Paragraph
    Paragraph: {
        display: "block",
    },
    ParagraphXLarge: {
        fontSize: "20px",
        lineHeight: "30px",
    },
    ParagraphLarge: {
        fontSize: "18px",
        lineHeight: "28px",
    },
    ParagraphMedium: {
        fontSize: "16px",
        lineHeight: "24px",
    },
    ParagraphSmall: {
        fontSize: "14px",
        lineHeight: "22px",
    },
    ParagraphXSmall: {
        fontSize: "12px",
        lineHeight: "18px",
    },
};

export const TypeCategory = {
    Heading: "heading",
    CompactHeading: "compactHeading",
    Label: "label",
    Statement: "statement",
    Paragraph: "paragraph",
};

export const TypeSize = {
    XXXLarge: "xxxLarge",
    XXLarge: "xxLarge",
    XLarge: "xLarge",
    Large: "large",
    Medium: "medium",
    Small: "small",
    XSmall: "xSmall",
};

export const Typeface = {
    Serif: "serif",
    Sans: "sans",
    Monospace: "monospace",
};

export const textStyle = (category: string, size: string, typeface: string) => {
    let categoryStyles;
    let sizeStyles;
    let typefaceStyles;
    if (category === TypeCategory.Heading) {
        categoryStyles = styleFragments.Heading;

        if (size === TypeSize.XXXLarge) {
            sizeStyles = styleFragments.HeadingXXXLarge;
        } else if (size === TypeSize.XXLarge) {
            sizeStyles = styleFragments.HeadingXXLarge;
        } else if (size === TypeSize.XLarge) {
            sizeStyles = styleFragments.HeadingXLarge;
        } else if (size === TypeSize.Large) {
            sizeStyles = styleFragments.HeadingLarge;
        } else if (size === TypeSize.Medium) {
            sizeStyles = styleFragments.HeadingMedium;
        } else if (size === TypeSize.Small) {
            sizeStyles = styleFragments.HeadingSmall;
        } else if (size === TypeSize.XSmall) {
            sizeStyles = styleFragments.HeadingXSmall;
        }

        if (!typeface) {
            typefaceStyles = styleFragments.SerifStrong;
        }
    } else if (category === TypeCategory.CompactHeading) {
        categoryStyles = styleFragments.CompactHeading;
        if (size === TypeSize.XLarge) {
            sizeStyles = styleFragments.CompactHeadingXLarge;
        } else if (size === TypeSize.Large) {
            sizeStyles = styleFragments.CompactHeadingLarge;
        } else if (size === TypeSize.Medium) {
            sizeStyles = styleFragments.CompactHeadingMedium;
        } else if (size === TypeSize.Small) {
            sizeStyles = styleFragments.CompactHeadingSmall;
        }

        if (!typeface) {
            typefaceStyles = styleFragments.SansRegular;
        }
    } else if (category === TypeCategory.Label) {
        categoryStyles = styleFragments.Label;
        if (size === TypeSize.XLarge) {
            sizeStyles = styleFragments.LabelXLarge;
        } else if (size === TypeSize.Large) {
            sizeStyles = styleFragments.LabelLarge;
        } else if (size === TypeSize.Medium) {
            sizeStyles = styleFragments.LabelMedium;
        } else if (size === TypeSize.Small) {
            sizeStyles = styleFragments.LabelSmall;
        } else if (size === TypeSize.XSmall) {
            sizeStyles = styleFragments.LabelXSmall;
        }

        if (!typeface) {
            typefaceStyles = styleFragments.SansRegular;
        }
    } else if (category === TypeCategory.Statement) {
        categoryStyles = styleFragments.Statement;
        if (size === TypeSize.XLarge) {
            sizeStyles = styleFragments.StatementXLarge;
        } else if (size === TypeSize.Large) {
            sizeStyles = styleFragments.StatementLarge;
        } else if (size === TypeSize.Medium) {
            sizeStyles = styleFragments.StatementMedium;
        }

        if (!typeface) {
            typefaceStyles = styleFragments.SerifRegular;
        }
    } else if (category === TypeCategory.Paragraph) {
        categoryStyles = styleFragments.Paragraph;
        if (size === TypeSize.XLarge) {
            sizeStyles = styleFragments.ParagraphXLarge;
        } else if (size === TypeSize.Large) {
            sizeStyles = styleFragments.ParagraphLarge;
        } else if (size === TypeSize.Medium) {
            sizeStyles = styleFragments.ParagraphMedium;
        } else if (size === TypeSize.Small) {
            sizeStyles = styleFragments.ParagraphSmall;
        } else if (size === TypeSize.XSmall) {
            sizeStyles = styleFragments.ParagraphXSmall;
        }

        if (!typeface) {
            typefaceStyles = styleFragments.SansRegular;
        }
    }

    if (typeface) {
        if (typeface === Typeface.Serif) {
            typefaceStyles = styleFragments.SerifRegular;
        } else if (typeface === Typeface.Sans) {
            typefaceStyles = styleFragments.SansRegular;
        } else if (typeface === Typeface.Monospace) {
            typefaceStyles = styleFragments.MonospaceRegular;
        } else {
            typefaceStyles = null;
        }
    }

    if (!categoryStyles) {
        throw new Error("Invalid type category");
    }
    if (!sizeStyles) {
        throw new Error("Invalid type size");
    }
    if (!typefaceStyles) {
        throw new Error("Invalid typeface");
    }

    const styles = {
        ...styleFragments.Common,
        ...categoryStyles,
        ...sizeStyles,
        ...typefaceStyles,
    };
    // const style = StyleSheet.create({text: styles});

    return styles;
};

type TextProps = {|
    children?: React.Node,
    style?: StyleType,
    tag: string,
|};

export function Text(props: TextProps): React.Node {
    const {children, style, ...otherProps} = props;
    const Tag = props.tag;

    return (
        <Tag {...otherProps} className={css(style)}>
            {children}
        </Tag>
    );
}
