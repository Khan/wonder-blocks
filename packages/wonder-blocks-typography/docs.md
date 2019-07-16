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
