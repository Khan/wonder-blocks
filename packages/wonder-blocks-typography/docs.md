```js
import {View} from "@khanacademy/wonder-blocks-core";
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
    Footnote
} from "@khanacademy/wonder-blocks-typography";

// NOTE(mdr): I added an `id` attribute to each of these tags, to ensure that
//     they all pass the `id` attribute correctly. This fact will be saved in
//     snapshot tests.
<View>
    <Title id="example-Title">Title</Title>
    <HeadingLarge id="example-HeadingLarge">HeadingLarge</HeadingLarge>
    <HeadingMedium id="example-HeadingMedium">HeadingMedium</HeadingMedium>
    <HeadingSmall id="example-HeadingSmall">HeadingSmall</HeadingSmall>
    <HeadingXSmall id="example-HeadingXSmall">HeadingXSmall</HeadingXSmall>
    <BodySerifBlock id="example-BodySerifBlock">BodySerifBlock</BodySerifBlock>
    <BodySerif id="example-BodySerif">BodySerif</BodySerif>
    <BodyMonospace id="example-BodyMonospace">BodyMonospace</BodyMonospace>
    <Body id="example-Body">Body</Body>
    <LabelLarge id="example-LabelLarge">LabelLarge</LabelLarge>
    <LabelMedium id="example-LabelMedium">LabelMedium</LabelMedium>
    <LabelSmall id="example-LabelSmall">LabelSmall</LabelSmall>
    <LabelXSmall id="example-LabelXSmall">LabelXSmall</LabelXSmall>
    <Tagline id="example-Tagline">Tagline</Tagline>
    <Caption id="example-Caption">Caption</Caption>
    <Footnote id="example-Footnote">Footnote</Footnote>
</View>
```

You can change the color of text with the `style` prop:

```js
import {StyleSheet} from "aphrodite";

import Color from "@khanacademy/wonder-blocks-color";
import {Title} from "@khanacademy/wonder-blocks-typography";

const styles = StyleSheet.create({
    blueText: {
        color: Color.blue,
    },
});

<Title style={styles.blueText}>Blue Title</Title>
```

## Accessibility

The `role` and any `aria-` attribute can be set as props any of the typography
components

```js
import {Title} from "@khanacademy/wonder-blocks-typography";

<Title aria-label="Accessible Title">Title</Title>
```

## Lato is used for Latin and Cyrillic languages

This is a example where we use Lato for Russian:

```js
import {View} from "@khanacademy/wonder-blocks-core";
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
    Footnote
} from "@khanacademy/wonder-blocks-typography";

<View>
    <Title>Для каждого ученика, независимо от возраста. Реальные результаты!</Title>
    <HeadingLarge>Для каждого ученика, независимо от возраста. Реальные результаты!</HeadingLarge>
    <HeadingMedium>Для каждого ученика, независимо от возраста. Реальные результаты!</HeadingMedium>
    <HeadingSmall>Для каждого ученика, независимо от возраста. Реальные результаты!</HeadingSmall>
    <HeadingXSmall>Для каждого ученика, независимо от возраста. Реальные результаты!</HeadingXSmall>
    <BodySerifBlock>Для каждого ученика, независимо от возраста. Реальные результаты!</BodySerifBlock>
    <BodySerif>Для каждого ученика, независимо от возраста. Реальные результаты!</BodySerif>
    <BodyMonospace>Для каждого ученика, независимо от возраста. Реальные результаты!</BodyMonospace>
    <Body>Для каждого ученика, независимо от возраста. Реальные результаты!</Body>
    <LabelLarge>Для каждого ученика, независимо от возраста. Реальные результаты!</LabelLarge>
    <LabelMedium>Для каждого ученика, независимо от возраста. Реальные результаты!</LabelMedium>
    <LabelSmall>Для каждого ученика, независимо от возраста. Реальные результаты!</LabelSmall>
    <LabelXSmall>Для каждого ученика, независимо от возраста. Реальные результаты!</LabelXSmall>
    <Tagline>Для каждого ученика, независимо от возраста. Реальные результаты!</Tagline>
    <Caption>Для каждого ученика, независимо от возраста. Реальные результаты!</Caption>
    <Footnote>Для каждого ученика, независимо от возраста. Реальные результаты!</Footnote>
</View>
```

## Lato (Latin and Latin extended) for Vietnamese

This is another example where we use Lato latin for Vietnamese. In this specific
case, we also use the extended glyphs so we can add full support to Vietnamese
using this font.

```js
import {View} from "@khanacademy/wonder-blocks-core";
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
    Footnote
} from "@khanacademy/wonder-blocks-typography";

<View>
    <Title>Dành cho mọi học sinh, mọi lớp học. Kết quả thực tế.</Title>
    <HeadingLarge>Dành cho mọi học sinh, mọi lớp học. Kết quả thực tế.</HeadingLarge>
    <HeadingMedium>Dành cho mọi học sinh, mọi lớp học. Kết quả thực tế.</HeadingMedium>
    <HeadingSmall>Dành cho mọi học sinh, mọi lớp học. Kết quả thực tế.</HeadingSmall>
    <HeadingXSmall>Dành cho mọi học sinh, mọi lớp học. Kết quả thực tế.</HeadingXSmall>
    <BodySerifBlock>Dành cho mọi học sinh, mọi lớp học. Kết quả thực tế.</BodySerifBlock>
    <BodySerif>Dành cho mọi học sinh, mọi lớp học. Kết quả thực tế.</BodySerif>
    <BodyMonospace>Dành cho mọi học sinh, mọi lớp học. Kết quả thực tế.</BodyMonospace>
    <Body>Dành cho mọi học sinh, mọi lớp học. Kết quả thực tế.</Body>
    <LabelLarge>Dành cho mọi học sinh, mọi lớp học. Kết quả thực tế.</LabelLarge>
    <LabelMedium>Dành cho mọi học sinh, mọi lớp học. Kết quả thực tế.</LabelMedium>
    <LabelSmall>Dành cho mọi học sinh, mọi lớp học. Kết quả thực tế.</LabelSmall>
    <LabelXSmall>Dành cho mọi học sinh, mọi lớp học. Kết quả thực tế.</LabelXSmall>
    <Tagline>Dành cho mọi học sinh, mọi lớp học. Kết quả thực tế.</Tagline>
    <Caption>Dành cho mọi học sinh, mọi lớp học. Kết quả thực tế.</Caption>
    <Footnote>Dành cho mọi học sinh, mọi lớp học. Kết quả thực tế.</Footnote>
</View>
```


## Noto for non-Latin languages

```js
import {View} from "@khanacademy/wonder-blocks-core";
import {OptionItem, SingleSelect} from "@khanacademy/wonder-blocks-dropdown";
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
    Footnote
} from "@khanacademy/wonder-blocks-typography";

const languages = {
    arabic: { text: "مرحبا", dir: "rtl" },
    armenian: { text: "Բարեւ" },
    greek: { text: "γεια σας" },
    hebrew: { text: "שלום", dir: "rtl" }
};

class LanguageSelector extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedValue: "arabic"
        };
    }

    renderTypography() {
        const {text, dir} = this.props.languages[this.state.selectedValue];

        return (
            <React.Fragment>
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
            </React.Fragment>
        );
    }

    render() {
        return (
            <React.Fragment>
                <SingleSelect
                    aria-labelledby="language-selector"
                    id="unique-language-selector"
                    placeholder="Select language"
                    onChange={(selectedValue) => this.setState({selectedValue})}
                    selectedValue={this.state.selectedValue}
                >
                    {Object.keys(this.props.languages).map((item, key) => (
                        <OptionItem label={item} value={item} key={key} />
                    ))}
                </SingleSelect>

                {this.renderTypography()}
            </React.Fragment>
        );
    }
}

<View>
    <LanguageSelector languages={languages} />
</View>
```
