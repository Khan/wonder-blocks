# Accordion

> Package: `@khanacademy/wonder-blocks-accordion`

An accordion displays a vertically stacked list of sections, each of which
contains content that can be shown or hidden by clicking its header.
The Wonder Blocks Accordion component is a styled wrapper for a list of
AccordionSection components. It also wraps the AccordionSection
components in list items.
### Usage
```jsx
import {
     Accordion,
     AccordionSection
} from "@khanacademy/wonder-blocks-accordion";
<Accordion>
  <AccordionSection header="First section">
      This is the information present in the first section
  </AccordionSection>
  <AccordionSection header="Second section">
      This is the information present in the second section
  </AccordionSection>
  <AccordionSection header="Third section">
      This is the information present in the third section
  </AccordionSection>
</Accordion>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` |  | The unique identifier for the accordion. |
| `children` | `Array<React.ReactElement>` | *required* | The AccordionSection components to display within this Accordion. |
| `initialExpandedIndex` | `number` |  | The index of the AccordionSection that should be expanded when the |
| `allowMultipleExpanded` | `boolean` |  | Whether multiple AccordionSections can be expanded at the same time. |
| `caretPosition` | `"start" \| "end"` |  | Whether to put the caret at the start or end of the header block |
| `cornerKind` | `"square" \| "rounded" \| "rounded-per-section"` |  | The preset styles for the corners of this accordion. |
| `animated` | `boolean` |  | Whether to include animation on the header. This should be false |
| `style` | `StyleType` |  | Custom styles for the overall accordion container. |

---

## Default

By default, an accordion has a caret at the end of the header block and
rounded corners.

```tsx
<Accordion caretPosition="end" cornerKind="rounded" allowMultipleExpanded>
  {exampleSections}
</Accordion>
```

---

## Allow Multiple Expanded

An accordion allows multiple sections to be expanded at the same time
by default. However, if `allowMultipleExpanded` is set to `false`, only
one section can be expanded at a time.

```tsx
<View>
    <View style={{maxWidth: 500, marginBottom: spacing.large_24}}>
        <LabelLarge>Allow multiple expanded (default)</LabelLarge>
        <Accordion allowMultipleExpanded>{exampleSections}</Accordion>
    </View>
    <View style={styles.sideBySide}>
        <View style={[styles.fullWidth, styles.space]}>
            <LabelLarge>Allow only one expanded</LabelLarge>
            <Accordion
                allowMultipleExpanded={false}
                cornerKind="square"
            >
                {exampleSections}
            </Accordion>
        </View>
        <View style={[styles.fullWidth, styles.space]}>
            <LabelLarge>Allow only one expanded</LabelLarge>
            <Accordion
                allowMultipleExpanded={false}
                cornerKind="rounded"
            >
                {exampleSections}
            </Accordion>
        </View>
        <View style={[styles.fullWidth, styles.space]}>
            <LabelLarge>Allow only one expanded</LabelLarge>
            <Accordion
                allowMultipleExpanded={false}
                cornerKind="rounded-per-section"
            >
                {exampleSections}
            </Accordion>
        </View>
    </View>
</View>
```

---

## Caret Positions

An accordion can have the caret at the start or the end of the header block.
"start" means it’s on the left of a left-to-right language (and on the
right of a right-to-left language), and "end" means it’s on the right of
a left-to-right language (and on the left of a right-to-left language).
If the `caretPosition` prop is specified both here in the Accordion and
within a child AccordionSection component, the AccordionSection's
`caretPosition` value is prioritized.

```tsx
<View>
    {/* Left-to-right */}
    <View style={styles.sideBySide}>
        <View style={styles.fullWidth}>
            <LabelLarge>
                Caret position: end, language direction: left to
                right
            </LabelLarge>
            <Accordion caretPosition="end">
                {exampleSections}
            </Accordion>
        </View>
        <Strut size={spacing.xLarge_32} />
        <View style={styles.fullWidth}>
            <LabelLarge>
                Caret position: start, language direction: left to
                right
            </LabelLarge>
            <Accordion caretPosition="start">
                {exampleSections}
            </Accordion>
        </View>
    </View>

    {/* Right-to-left */}
    <View style={[styles.sideBySide, styles.rtl]}>
        <View style={styles.fullWidth}>
            <LabelLarge>
                Caret position: end, language direction: right to
                left
            </LabelLarge>
            <Accordion caretPosition="end">
                <AccordionSection header="پہلا سیکشن">
                    یہ کچھ معلومات ہے۔
                </AccordionSection>

                <AccordionSection header="دوسرا سیکشن">
                    یہ کچھ معلومات ہے۔
                </AccordionSection>

                <AccordionSection header="تیسرا حصہ">
                    یہ کچھ معلومات ہے۔
                </AccordionSection>
            </Accordion>
        </View>
        <Strut size={spacing.xLarge_32} />
        <View style={styles.fullWidth}>
            <LabelLarge>
                Caret position: start, language direction: right to
                left
            </LabelLarge>
            <Accordion caretPosition="start">
                <AccordionSection header="پہلا سیکشن">
                    یہ کچھ معلومات ہے۔
                </AccordionSection>

                <AccordionSection header="دوسرا سیکشن">
                    یہ کچھ معلومات ہے۔
                </AccordionSection>

                <AccordionSection header="تیسرا حصہ">
                    یہ کچھ معلومات ہے۔
                </AccordionSection>
            </Accordion>
        </View>
    </View>
</View>
```

---

## Corner Kinds

An accordion can have different corner kinds. If `cornerKind` is `square`,
the corners have no border radius. If `cornerKind` is `rounded`,
the overall container's corners are rounded. If `cornerKind` is
`rounded-per-section`, each section's corners are rounded, and there is
vertical white space between each section.
If `cornerKind` is specified both here in the Accordion and within
a child AccordionSection component, the AccordionSection’s `cornerKind`
value is prioritized.

```tsx
<View style={styles.sideBySide}>
    <View style={[styles.fullWidth, styles.space]}>
        <LabelLarge>Corner kind: square</LabelLarge>
        <Accordion cornerKind="square">{exampleSections}</Accordion>
    </View>
    <View style={[styles.fullWidth, styles.space]}>
        <LabelLarge>Corner kind: rounded</LabelLarge>
        <Accordion cornerKind="rounded">
            {exampleSections}
        </Accordion>
    </View>
    <View style={[styles.fullWidth, styles.space]}>
        <LabelLarge>Corner kind: rounded-per-section</LabelLarge>
        <Accordion cornerKind="rounded-per-section">
            {exampleSections}
        </Accordion>
    </View>
</View>
```

---

## With Initial Expanded Index

An Accordion can have an initial expanded index. If this prop is specified,
the AccordionSection at that index will be expanded when the Accordion
is first rendered. If this prop is not specified, no AccordionSections
will be expanded when the Accordion is first rendered. In this example,
the AccordionSection at index 1 (the second section) is expanded by default.

```tsx
<Accordion initialExpandedIndex={1}>{exampleSections}</Accordion>
```

---

## With Animation

An Accordion can be animated using the `animated` prop. This
animation includes the caret, the expansion/collapse, and the last
section's border radius. In this example, animated accordions with
different corner kinds are shown to demonstrate the border radius transition,
as well as accordions with `allowMultipleExpanded` set to `false`, and
an accordion with sections of different heights.
If the user has `prefers-reduced-motion` opted in, this animation should
be disabled. This can be done by passing `animated={false}` to
the Accordion.
If `animated` is specified both here in the Accordion
and within a child AccordionSection component, the AccordionSection's
`animated` value is prioritized.
**NOTE: HEIGHT ANIMATIONS ARE INHERENTLY NOT PERFORMANT.** USING ANIMATIONS
*WILL* DECREASE PERFORMANCE. It is recommended that animations be used
sparingly for this reason, and only on lighter accordions.

```tsx
<View>
    <View style={styles.sideBySide}>
        <View style={[styles.fullWidth, styles.space]}>
            <LabelLarge>cornerKind: square</LabelLarge>
            <Accordion cornerKind="square" animated={true}>
                {exampleSections}
            </Accordion>
        </View>
        <View style={[styles.fullWidth, styles.space]}>
            <LabelLarge>cornerKind: rounded</LabelLarge>
            <Accordion cornerKind="rounded" animated={true}>
                {exampleSections}
            </Accordion>
        </View>
        <View style={[styles.fullWidth, styles.space]}>
            <LabelLarge>cornerKind: rounded-per-section</LabelLarge>
            <Accordion
                cornerKind="rounded-per-section"
                animated={true}
            >
                {exampleSections}
            </Accordion>
        </View>
    </View>
    <View style={styles.sideBySide}>
        <View style={[styles.fullWidth, styles.space]}>
            <LabelLarge>
                cornerKind: square, allowMultipleExpanded: false
            </LabelLarge>
            <Accordion
                cornerKind="square"
                animated={true}
                allowMultipleExpanded={false}
            >
                {exampleSections}
            </Accordion>
        </View>
        <View style={[styles.fullWidth, styles.space]}>
            <LabelLarge>
                cornerKind: rounded, allowMultipleExpanded: false
            </LabelLarge>
            <Accordion
                cornerKind="rounded"
                animated={true}
                allowMultipleExpanded={false}
            >
                {exampleSections}
            </Accordion>
        </View>
        <View style={[styles.fullWidth, styles.space]}>
            <LabelLarge>
                cornerKind: rounded-per-section,
                allowMultipleExpanded: false
            </LabelLarge>
            <Accordion
                cornerKind="rounded-per-section"
                animated={true}
                allowMultipleExpanded={false}
            >
                {exampleSections}
            </Accordion>
        </View>
    </View>
    <View style={{maxWidth: 500}}>
        <LabelLarge>
            With unevenly sided sections, allowMultipleExpanded:
            false
        </LabelLarge>
        <Accordion animated={true} allowMultipleExpanded={false}>
            <AccordionSection header="First section">
                <View
                    style={{
                        height: 500,
                        padding: spacing.large_24,
                    }}
                >
                    This is the information present in the first
                    section
                </View>
            </AccordionSection>
            <AccordionSection header="Second section">
                <View
                    style={{
                        height: 100,
                        padding: spacing.large_24,
                    }}
                >
                    This is the information present in the second
                    section
                </View>
            </AccordionSection>
            <AccordionSection header="Second section">
                <View
                    style={{
                        height: 300,
                        padding: spacing.large_24,
                    }}
                >
                    This is the information present in the third
                    section
                </View>
            </AccordionSection>
        </Accordion>
    </View>
</View>
```

---

## With Style

An Accordion with custom styles. The custom styles in this example
include a purple border and extra padding.
Note that the Accordion's border is different than the AccordionSection
border styles. Passing custom styles here will not affect the sections'
styles. If you want to change the corner kind of a single section,
that can be done using the `cornerKind` prop (as demonstrated here).
Passing in a custom border radius to the section is NOT recommended,
as it would cause the header's focus outline to no longer match the section.

```tsx
<Accordion style={customStyles}>
    <AccordionSection
        header="This section has a custom border radius at the top?"
        cornerKind="square"
    >
        Something
    </AccordionSection>
    <AccordionSection header="Just a section">
        Something
    </AccordionSection>
</Accordion>
```

---

## Single Section

To use an Accordion with only one section, you must pass in an array
of one element. Another approach to displaying a single AccordionSection
can be to use the AccordionSection component directly (not as a child
of an Accordion).

```tsx
<Accordion>
    {[
        <AccordionSection header="First section" key={0}>
            This is the information present in the first section
        </AccordionSection>,
    ]}
</Accordion>
```

---

## Long sections (performance check)

This is an example of an Accordion with many sections, as well as
a lot of content within each section.

```tsx
<View>
    <Button onClick={() => setShown(!shown)} style={styles.button}>
        {shown ? "Hide giant Accordion" : "Show giant Accordion"}
    </Button>
    {shown && (
        <Accordion animated={true}>
            {Array(20).fill(
                <AccordionSection
                    header={`This is a section with a really, really, really,
        really, really, really, really, really, really, really,
        really, really, really, really, really, really, really,
        really, really, really, really, really long header`}
                >
                    <View>
                        <img
                            src="logo.svg"
                            width="100%"
                            alt="Wonder Blocks logo"
                        />
                        <Strut size={spacing.xLarge_32} />
                        <img
                            src="logo.svg"
                            width="100%"
                            alt="Wonder Blocks logo"
                        />
                    </View>
                </AccordionSection>,
            )}
        </Accordion>
    )}
</View>
```

---

## With Dropdown

This is an example of an Accordion with a dropdown within each section.
This demonstrates how the accordion keyboard interactions do not interfere
with the dropdown's keyboard interactions.

```tsx
<Accordion animated={true}>
    <AccordionSection header={`Single Select`}>
        {/* Adding height because overflow hidden in sections. */}
        <View style={singleOpened && {height: 200}}>
            <SingleSelect
                placeholder="Select an option"
                selectedValue={value}
                onChange={setValue}
                opened={singleOpened}
                onToggle={setSingleOpened}
            >
                {items}
            </SingleSelect>
        </View>
    </AccordionSection>
    <AccordionSection header={`Multi Select`}>
        <View style={multiOpened && {height: 200}}>
            <MultiSelect
                selectedValues={values}
                onChange={setValues}
                opened={multiOpened}
                onToggle={setMultiOpened}
            >
                {items}
            </MultiSelect>
        </View>
    </AccordionSection>
</Accordion>
```

---

## Background Color Example

Accordion has a white background color by default. If you want
to change the background color, you can pass in a custom style with
the desired background color into each individual AccordionSection.
NOTE: Passing in a background color to the Accordion itself is NOT
recommended, because it will cause the color to overflow into the
corners of a rounded Accordion and between the individual sections
of a rounded-per-section Accordion.

```tsx
<>
    <Accordion cornerKind="rounded">{sections}</Accordion>
    <Strut size={spacing.large_24} />
    <Accordion cornerKind="square">{sections}</Accordion>
    <Strut size={spacing.large_24} />
    <Accordion cornerKind="rounded-per-section">
        {sections}
    </Accordion>
</>
```



---

## Related docs

- [Accessibility](accessibility.md)
- [Accordion Section](accordion-section.md)
