// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";
import type {StoryComponentType} from "@storybook/react";

import Color from "@khanacademy/wonder-blocks-color";
import {View} from "@khanacademy/wonder-blocks-core";
import {OptionItem, SingleSelect} from "@khanacademy/wonder-blocks-dropdown";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {
    Title,
    HeadingLarge,
    HeadingMedium,
    HeadingSmall,
    HeadingXSmall,
    BodySerifBlock,
    BodySerif,
    BodyMonospace,
    Body,
    LabelLarge,
    LabelMedium,
    LabelSmall,
    LabelXSmall,
    Tagline,
    Caption,
    Footnote,
} from "@khanacademy/wonder-blocks-typography";

import ComponentInfo from "../../../../.storybook/components/component-info.js";
import {name, version} from "../../package.json";
import TypographyArgTypes from "./typography.argtypes.js";

const typographyDescription = `Typography. \`wonder-blocks-typography\`
provides a set of standardized components for displaying text in a consistent
way. This includes components for headings, paragraphs, and text
labels.\n\n\n ### Usage

\`\`\`jsx
import {Body, Title} from "@khanacademy/wonder-blocks-typography";

<Title>Title: Hello, world!</Title>
<Body>This is just a regular paragraph</Body>
\`\`\`
`;

export default {
    title: "Typography",
    parameters: {
        componentSubtitle: ((
            <ComponentInfo name={name} version={version} />
        ): any),
        docs: {
            description: {component: typographyDescription},
            source: {
                // See https://github.com/storybookjs/storybook/issues/12596
                excludeDecorators: true,
            },
        },
    },
    argTypes: TypographyArgTypes,
};

export const ControlProps: StoryComponentType = (args) => <Title {...args} />;

ControlProps.args = {
    children: "This is a Title typography element",
    id: "example-title",
};

export const TypographyElements: StoryComponentType = () => (
    <View>
        <Title>Title</Title>
        <HeadingLarge>HeadingLarge</HeadingLarge>
        <HeadingMedium>HeadingMedium</HeadingMedium>
        <HeadingSmall>HeadingSmall</HeadingSmall>
        <HeadingXSmall>HeadingXSmall</HeadingXSmall>
        <BodySerifBlock>BodySerifBlock</BodySerifBlock>
        <BodySerif>BodySerif</BodySerif>
        <BodyMonospace>BodyMonospace</BodyMonospace>
        <Body>Body</Body>
        <LabelLarge>LabelLarge</LabelLarge>
        <LabelMedium>LabelMedium</LabelMedium>
        <LabelSmall>LabelSmall</LabelSmall>
        <LabelXSmall>LabelXSmall</LabelXSmall>
        <Tagline>Tagline</Tagline>
        <Caption>Caption</Caption>
        <Footnote>Footnote</Footnote>
    </View>
);

TypographyElements.parameters = {
    docs: {
        storyDescription: `These are all the available typography elements
            with their names written out in their respective styles.`,
    },
};

export const WithStyle: StoryComponentType = () => {
    const styles = StyleSheet.create({
        blueText: {
            color: Color.blue,
        },
    });

    return <Title style={styles.blueText}>Blue Title</Title>;
};

WithStyle.parameters = {
    docs: {
        storyDescription:
            "You can change the color of text with the `style` prop.",
    },
};

export const LatoForLatin: StoryComponentType = () => (
    <View>
        <Title>
            Для каждого ученика, независимо от возраста. Реальные результаты!
        </Title>
        <HeadingLarge>
            Для каждого ученика, независимо от возраста. Реальные результаты!
        </HeadingLarge>
        <HeadingMedium>
            Для каждого ученика, независимо от возраста. Реальные результаты!
        </HeadingMedium>
        <HeadingSmall>
            Для каждого ученика, независимо от возраста. Реальные результаты!
        </HeadingSmall>
        <HeadingXSmall>
            Для каждого ученика, независимо от возраста. Реальные результаты!
        </HeadingXSmall>
        <BodySerifBlock>
            Для каждого ученика, независимо от возраста. Реальные результаты!
        </BodySerifBlock>
        <BodySerif>
            Для каждого ученика, независимо от возраста. Реальные результаты!
        </BodySerif>
        <BodyMonospace>
            Для каждого ученика, независимо от возраста. Реальные результаты!
        </BodyMonospace>
        <Body>
            Для каждого ученика, независимо от возраста. Реальные результаты!
        </Body>
        <LabelLarge>
            Для каждого ученика, независимо от возраста. Реальные результаты!
        </LabelLarge>
        <LabelMedium>
            Для каждого ученика, независимо от возраста. Реальные результаты!
        </LabelMedium>
        <LabelSmall>
            Для каждого ученика, независимо от возраста. Реальные результаты!
        </LabelSmall>
        <LabelXSmall>
            Для каждого ученика, независимо от возраста. Реальные результаты!
        </LabelXSmall>
        <Tagline>
            Для каждого ученика, независимо от возраста. Реальные результаты!
        </Tagline>
        <Caption>
            Для каждого ученика, независимо от возраста. Реальные результаты!
        </Caption>
        <Footnote>
            Для каждого ученика, независимо от возраста. Реальные результаты!
        </Footnote>
    </View>
);

LatoForLatin.parameters = {
    docs: {
        storyDescription: `Lato is used for Latin and Cyrillic languages.
            This is a example where we use Lato for Russian.`,
    },
};

export const LatoForLatinExtended: StoryComponentType = () => (
    <View>
        <Title>Dành cho mọi học sinh, mọi lớp học. Kết quả thực tế.</Title>
        <HeadingLarge>
            Dành cho mọi học sinh, mọi lớp học. Kết quả thực tế.
        </HeadingLarge>
        <HeadingMedium>
            Dành cho mọi học sinh, mọi lớp học. Kết quả thực tế.
        </HeadingMedium>
        <HeadingSmall>
            Dành cho mọi học sinh, mọi lớp học. Kết quả thực tế.
        </HeadingSmall>
        <HeadingXSmall>
            Dành cho mọi học sinh, mọi lớp học. Kết quả thực tế.
        </HeadingXSmall>
        <BodySerifBlock>
            Dành cho mọi học sinh, mọi lớp học. Kết quả thực tế.
        </BodySerifBlock>
        <BodySerif>
            Dành cho mọi học sinh, mọi lớp học. Kết quả thực tế.
        </BodySerif>
        <BodyMonospace>
            Dành cho mọi học sinh, mọi lớp học. Kết quả thực tế.
        </BodyMonospace>
        <Body>Dành cho mọi học sinh, mọi lớp học. Kết quả thực tế.</Body>
        <LabelLarge>
            Dành cho mọi học sinh, mọi lớp học. Kết quả thực tế.
        </LabelLarge>
        <LabelMedium>
            Dành cho mọi học sinh, mọi lớp học. Kết quả thực tế.
        </LabelMedium>
        <LabelSmall>
            Dành cho mọi học sinh, mọi lớp học. Kết quả thực tế.
        </LabelSmall>
        <LabelXSmall>
            Dành cho mọi học sinh, mọi lớp học. Kết quả thực tế.
        </LabelXSmall>
        <Tagline>Dành cho mọi học sinh, mọi lớp học. Kết quả thực tế.</Tagline>
        <Caption>Dành cho mọi học sinh, mọi lớp học. Kết quả thực tế.</Caption>
        <Footnote>
            Dành cho mọi học sinh, mọi lớp học. Kết quả thực tế.
        </Footnote>
    </View>
);

LatoForLatinExtended.parameters = {
    docs: {
        storyDescription: `This is another example where we use Lato
            latin for Vietnamese. In this specific case, we also use
            the extended glyphs so we can add full support to Vietnamese
            using this font.`,
    },
};

export const NotoForNonLatin: StoryComponentType = () => {
    const languages = {
        Arabic: {text: "مرحبا", dir: "rtl"},
        Armenian: {text: "Բարեւ"},
        Greek: {text: "γεια σας"},
        Hebrew: {text: "שלום", dir: "rtl"},
    };

    const [selectedValue, updateValue] = React.useState("Arabic");
    const {text, dir} = languages[selectedValue];

    return (
        <View>
            <SingleSelect
                aria-labelledby="language-selector"
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
                <Title dir={dir}>{text}</Title>
                <HeadingLarge dir={dir}>{text}</HeadingLarge>
                <HeadingMedium dir={dir}>{text}</HeadingMedium>
                <HeadingSmall dir={dir}>{text}</HeadingSmall>
                <HeadingXSmall dir={dir}>{text}</HeadingXSmall>
                <BodySerifBlock dir={dir}>{text}</BodySerifBlock>
                <BodySerif dir={dir}>{text}</BodySerif>
                <BodyMonospace dir={dir}>{text}</BodyMonospace>
                <Body dir={dir}>{text}</Body>
                <LabelLarge dir={dir}>{text}</LabelLarge>
                <LabelMedium dir={dir}>{text}</LabelMedium>
                <LabelSmall dir={dir}>{text}</LabelSmall>
                <LabelXSmall dir={dir}>{text}</LabelXSmall>
                <Tagline dir={dir}>{text}</Tagline>
                <Caption dir={dir}>{text}</Caption>
                <Footnote dir={dir}>{text}</Footnote>
            </View>
        </View>
    );
};

NotoForNonLatin.parameters = {
    docs: {
        storyDescription: "The Noto font is used for non-Latin languages.",
    },
};

export const CodeFont: StoryComponentType = () => {
    const Code = ({children}: {|children: React.Node|}) => (
        <BodyMonospace>{children}</BodyMonospace>
    );

    return <Code>{`const str = "Hello, world!"`}</Code>;
};

CodeFont.parameters = {
    docs: {
        storyDescription: `One example of using the \`BodyMonospace\`
            typography component is to create a \`Code\` component for
            rendering pre-formatted code blocks.`,
    },
};

export const Paragraph: StoryComponentType = () => {
    const longParagraph = `This is an example of a long paragraph.
        Khan Academy offers practice exercises, instructional videos,
        and a personalized learning dashboard that empower learners
        to study at their own pace in and outside of the classroom.
        We tackle math, science, computing, history, art history, economics,
        and more, including K-14 and test preparation (SAT, Praxis, LSAT)
        content. We focus on skill mastery to help learners establish
        strong foundations, so there's no limit to what they can learn next!`;

    return <Body>{longParagraph}</Body>;
};

Paragraph.parameters = {
    docs: {
        storyDescription: `The \`Body\` typography component is usually used
            for paragraphs and other body text.`,
    },
};

export const LineHeight: StoryComponentType = () => {
    const style = {
        outline: `1px solid ${Color.offBlack}`,
        marginBottom: Spacing.small_12,
    };

    return (
        <View>
            <Title style={style}>Title</Title>
            <HeadingLarge style={style}>HeadingLarge</HeadingLarge>
            <HeadingMedium style={style}>HeadingMedium</HeadingMedium>
            <HeadingSmall style={style}>HeadingSmall</HeadingSmall>
            <HeadingXSmall style={style}>HeadingXSmall</HeadingXSmall>
            <BodySerifBlock style={style}>BodySerifBlock</BodySerifBlock>
            <BodySerif style={style}>BodySerif</BodySerif>
            <BodyMonospace style={style}>BodyMonospace</BodyMonospace>
            <Body style={style}>Body</Body>
            <LabelLarge style={style}>LabelLarge</LabelLarge>
            <LabelMedium style={style}>LabelMedium</LabelMedium>
            <LabelSmall style={style}>LabelSmall</LabelSmall>
            <LabelXSmall style={style}>LabelXSmall</LabelXSmall>
            <Tagline style={style}>Tagline</Tagline>
            <Caption style={style}>Caption</Caption>
            <Footnote style={style}>Footnote</Footnote>
        </View>
    );
};

LineHeight.parameters = {
    docs: {
        storyDescription: `This is a visualization of the line height
            for each typography element.`,
    },
};
