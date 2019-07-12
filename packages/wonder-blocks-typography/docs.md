```js
const {View} = require("@khanacademy/wonder-blocks-core");
const {
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
} = require("@khanacademy/wonder-blocks-typography");

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
const {StyleSheet} = require("aphrodite");

const Color = require("@khanacademy/wonder-blocks-color").default;
const {Title} = require("@khanacademy/wonder-blocks-typography");

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
const {Title} = require("@khanacademy/wonder-blocks-typography");

<Title aria-label="Accessible Title">Title</Title>
```

## Lato is use for Latin and Cyrillic languages

```js
const {View} = require("@khanacademy/wonder-blocks-core");

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
const {View} = require("@khanacademy/wonder-blocks-core");

<View>
    <Title dir="rtl">مرحبا</Title>
    <HeadingLarge dir="rtl">مرحبا</HeadingLarge>
    <HeadingMedium dir="rtl">مرحبا</HeadingMedium>
    <HeadingSmall dir="rtl">مرحبا</HeadingSmall>
    <HeadingXSmall dir="rtl">مرحبا</HeadingXSmall>
    <BodySerifBlock dir="rtl">مرحبا</BodySerifBlock>
    <BodySerif dir="rtl">مرحبا</BodySerif>
    <BodyMonospace dir="rtl">مرحبا</BodyMonospace>
    <Body dir="rtl">مرحبا</Body>
    <LabelLarge dir="rtl">مرحبا</LabelLarge>
    <LabelMedium dir="rtl">مرحبا</LabelMedium>
    <LabelSmall dir="rtl">مرحبا</LabelSmall>
    <LabelXSmall dir="rtl">مرحبا</LabelXSmall>
    <Tagline dir="rtl">مرحبا</Tagline>
    <Caption dir="rtl">مرحبا</Caption>
    <Footnote dir="rtl">مرحبا</Footnote>

    <Title>γεια σας</Title>
    <HeadingLarge>γεια σας</HeadingLarge>
    <HeadingMedium>γεια σας</HeadingMedium>
    <HeadingSmall>γεια σας</HeadingSmall>
    <HeadingXSmall>γεια σας</HeadingXSmall>
    <BodySerifBlock>γεια σας</BodySerifBlock>
    <BodySerif>γεια σας</BodySerif>
    <BodyMonospace>γεια σας</BodyMonospace>
    <Body>γεια σας</Body>
    <LabelLarge>γεια σας</LabelLarge>
    <LabelMedium>γεια σας</LabelMedium>
    <LabelSmall>γεια σας</LabelSmall>
    <LabelXSmall>γεια σας</LabelXSmall>
    <Tagline>γεια σας</Tagline>
    <Caption>γεια σας</Caption>
    <Footnote>γεια σας</Footnote>

    <Title dir="rtl">שלום</Title>
    <HeadingLarge dir="rtl">שלום</HeadingLarge>
    <HeadingMedium dir="rtl">שלום</HeadingMedium>
    <HeadingSmall dir="rtl">שלום</HeadingSmall>
    <HeadingXSmall dir="rtl">שלום</HeadingXSmall>
    <BodySerifBlock dir="rtl">שלום</BodySerifBlock>
    <BodySerif dir="rtl">שלום</BodySerif>
    <BodyMonospace dir="rtl">שלום</BodyMonospace>
    <Body dir="rtl">שלום</Body>
    <LabelLarge dir="rtl">שלום</LabelLarge>
    <LabelMedium dir="rtl">שלום</LabelMedium>
    <LabelSmall dir="rtl">שלום</LabelSmall>
    <LabelXSmall dir="rtl">שלום</LabelXSmall>
    <Tagline dir="rtl">שלום</Tagline>
    <Caption dir="rtl">שלום</Caption>
    <Footnote dir="rtl">שלום</Footnote>
</View>
```
