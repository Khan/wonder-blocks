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

## Lato is use for Latin and Cyrillic languages

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
    <Title>Привет</Title>
    <HeadingLarge>Привет</HeadingLarge>
    <HeadingMedium>Привет</HeadingMedium>
    <HeadingSmall>Привет</HeadingSmall>
    <HeadingXSmall>Привет</HeadingXSmall>
    <BodySerifBlock>Привет</BodySerifBlock>
    <BodySerif>Привет</BodySerif>
    <BodyMonospace>Привет</BodyMonospace>
    <Body>Привет</Body>
    <LabelLarge>Привет</LabelLarge>
    <LabelMedium>Привет</LabelMedium>
    <LabelSmall>Привет</LabelSmall>
    <LabelXSmall>Привет</LabelXSmall>
    <Tagline>Привет</Tagline>
    <Caption>Привет</Caption>
    <Footnote>Привет</Footnote>
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
