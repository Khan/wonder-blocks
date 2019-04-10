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

    <Title>ᑕᓂᓯ</Title>
    <HeadingLarge>ᑕᓂᓯ</HeadingLarge>
    <HeadingMedium>ᑕᓂᓯ</HeadingMedium>
    <HeadingSmall>ᑕᓂᓯ</HeadingSmall>
    <HeadingXSmall>ᑕᓂᓯ</HeadingXSmall>
    <BodySerifBlock>ᑕᓂᓯ</BodySerifBlock>
    <BodySerif>ᑕᓂᓯ</BodySerif>
    <BodyMonospace>ᑕᓂᓯ</BodyMonospace>
    <Body>ᑕᓂᓯ</Body>
    <LabelLarge>ᑕᓂᓯ</LabelLarge>
    <LabelMedium>ᑕᓂᓯ</LabelMedium>
    <LabelSmall>ᑕᓂᓯ</LabelSmall>
    <LabelXSmall>ᑕᓂᓯ</LabelXSmall>
    <Tagline>ᑕᓂᓯ</Tagline>
    <Caption>ᑕᓂᓯ</Caption>
    <Footnote>ᑕᓂᓯ</Footnote>

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

```js
const {View} = require("@khanacademy/wonder-blocks-core");

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
const Color = require("@khanacademy/wonder-blocks-color").default;
const {StyleSheet} = require("aphrodite");

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
<Title aria-label="Accessible Title">Title</Title>
```
