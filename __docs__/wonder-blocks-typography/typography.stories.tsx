import * as React from "react";
import {css, StyleSheet} from "aphrodite";
import type {Meta, StoryObj} from "@storybook/react-vite";

import {addStyle, View} from "@khanacademy/wonder-blocks-core";
import {OptionItem, SingleSelect} from "@khanacademy/wonder-blocks-dropdown";
import {
    semanticColor,
    sizing,
    spacing,
} from "@khanacademy/wonder-blocks-tokens";
import {
    Heading,
    BodyText,
    styles as typographyStyles,
} from "@khanacademy/wonder-blocks-typography";
import packageConfig from "../../packages/wonder-blocks-typography/package.json";

import ComponentInfo from "../components/component-info";
import TypographyArgTypes from "./typography.argtypes";
import {themeModes} from "../../.storybook/modes";

// NOTE: Only for testing purposes.
// eslint-disable-next-line import/no-unassigned-import
import "./styles.css";

/**
Typography. `wonder-blocks-typography`
provides a set of standardized components for displaying text in a consistent
way. This includes components for headings, paragraphs, and text
labels.

### Usage

```jsx
import {BodyText, Heading} from "@khanacademy/wonder-blocks-typography";

<Heading size="xxlarge">Title: Hello, world!</Heading>
<BodyText>This is just a regular paragraph</BodyText>
```
*/

export default {
    title: "Packages / Typography",
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
        docs: {
            source: {
                // See https://github.com/storybookjs/storybook/issues/12596
                excludeDecorators: true,
            },
        },
    },
    argTypes: TypographyArgTypes,
} as Meta<typeof ComponentInfo>;

const StyledDiv = addStyle("div");

export const ControlProps: StoryObj<typeof Heading> = {
    render: (args) => <Heading {...args} />,
    args: {
        children: "This is a Heading typography element",
        size: "xxlarge",
        id: "example-title",
    },
};

/**
 These are all the available Thunderblocks typography elements with their names
 written out in their respective styles. Wrapping them in `ThemeSwitcher` with
 `theme ="thunderblocks"` will include the Plus Jakarta Sans typeface, otherwise
 they will default to Lato.
 */
export const NewTypographyElements: StoryObj<any> = {
    render: () => (
        <View>
            <Heading size="xxlarge">Heading</Heading>
            <BodyText>BodyText</BodyText>
        </View>
    ),
    globals: {theme: "thunderblocks"},
    parameters: {
        chromatic: {
            // Disabling because the new typography components are covered
            // in the Heading / BodyText stories
            disableSnapshot: true,
        },
    },
};

/**
 * You can change the color of text using the following patterns:
 *
 * 1. Via the `style` prop. This is our recommended approach.
 * 2. Via the `className` prop. This is not recommended, but it is supported.
 *  - You can use the `css` function from `aphrodite` to create a class name
 *    that you can pass to the `className` prop.
 *  - You can pass a string to the `className` prop. This is not recommended
 *    and should only be used as a last resort if the other options don't cover
 *   your use case.
 */
export const WithStyle: StoryObj<typeof Heading> = {
    render: () => {
        const styles = StyleSheet.create({
            blueText: {
                color: semanticColor.core.foreground.instructive.default,
            },
            highlighted: {
                background: semanticColor.core.background.neutral.subtle,
            },
        });

        return (
            <Heading
                className={`${css(styles.highlighted)} custom-style`}
                size="xxlarge"
                style={styles.blueText}
            >
                Blue Title
            </Heading>
        );
    },
};

export const NotoForNonLatin: StoryObj<any> = () => {
    const languages = {
        Arabic: {text: "مرحبا", dir: "rtl"},
        Armenian: {text: "Բարեւ"},
        Greek: {text: "γεια σας"},
        Hebrew: {text: "שלום", dir: "rtl"},
    } as const;

    const [selectedValue, updateValue] = React.useState("Arabic");
    // @ts-expect-error [FEI-5019] - TS7053 - Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ readonly Arabic: { readonly text: "مرحبا"; readonly dir: "rtl"; }; readonly Armenian: { readonly text: "Բարեւ"; }; readonly Greek: { readonly text: "γεια σας"; }; readonly Hebrew: { readonly text: "שלום"; readonly dir: "rtl"; }; }'.
    const {text, dir} = languages[selectedValue];

    return (
        <View>
            <SingleSelect
                aria-label="Language selector"
                id="unique-language-selector"
                placeholder="Select language"
                onChange={(selectedValue) => updateValue(selectedValue)}
                selectedValue={selectedValue}
            >
                {Object.keys(languages).map((item, key) => (
                    <OptionItem label={item} value={item} key={key} />
                ))}
            </SingleSelect>
            <View>
                <Heading size="xxlarge" dir={dir}>
                    {text}
                </Heading>

                <Heading size="xlarge" dir={dir}>
                    {text}
                </Heading>

                <Heading size="large" dir={dir}>
                    {text}
                </Heading>

                <Heading size="medium" dir={dir}>
                    {text}
                </Heading>

                <Heading size="small" dir={dir}>
                    {text}
                </Heading>

                <BodyText dir={dir}>{text}</BodyText>

                <Heading size="large" weight="medium" dir={dir}>
                    {text}
                </Heading>
            </View>
        </View>
    );
};

NotoForNonLatin.parameters = {
    docs: {
        description: {story: "The Noto font is used for non-Latin languages."},
    },
};

/**
 * The `BodyText` typography component is usually used for paragraphs and other
 * body text.
 */
export const Paragraph: StoryObj<typeof BodyText> = {
    render: () => {
        const longParagraph = `This is an example of a long paragraph.
        Khan Academy offers practice exercises, instructional videos,
        and a personalized learning dashboard that empower learners
        to study at their own pace in and outside of the classroom.
        We tackle math, science, computing, history, art history, economics,
        and more, including K-14 and test preparation (SAT, Praxis, LSAT)
        content. We focus on skill mastery to help learners establish
        strong foundations, so there's no limit to what they can learn next!`;

        return <BodyText>{longParagraph}</BodyText>;
    },
};

/**
 * This is a visualization of the line height for each typography element.
 */
export const LineHeight: StoryObj<any> = {
    render: () => {
        const style = {
            outline: `1px solid ${semanticColor.core.border.neutral.strong}`,
            marginBottom: spacing.small_12,
        } as const;

        return (
            <View>
                <Heading size="xxlarge" style={style}>
                    Heading.xxlarge
                </Heading>
                <Heading size="xlarge" style={style}>
                    Heading.xlarge
                </Heading>
                <Heading size="large" style={style}>
                    Heading.large
                </Heading>
                <Heading size="medium" style={style}>
                    Heading.medium
                </Heading>
                <Heading size="small" style={style}>
                    Heading.small
                </Heading>
                <BodyText size="medium" weight="bold" style={style}>
                    BodyText.medium.bold
                </BodyText>
                <BodyText style={style}>BodyText.medium (default)</BodyText>
                <BodyText size="small" style={style}>
                    BodyText.small
                </BodyText>
                <BodyText size="xsmall" style={style}>
                    BodyText.xsmall
                </BodyText>
                <Heading size="large" weight="medium" style={style}>
                    Tagline
                </Heading>
            </View>
        );
    },
};

/**
 * The following shows the typography styles available.
 *
 * ```
 *     import { styles as typographyStyles } from "@khanacademy/wonder-blocks-typography";
 * ```
 */
export const TypographyStyles: StoryObj = {
    render: () => {
        return (
            <View style={{gap: sizing.size_200}}>
                {Object.entries(typographyStyles).map(([key, styles]) => (
                    <StyledDiv key={key} style={{...styles}}>
                        {key}
                    </StyledDiv>
                ))}
            </View>
        );
    },
    parameters: {
        chromatic: {
            modes: themeModes,
        },
    },
};
