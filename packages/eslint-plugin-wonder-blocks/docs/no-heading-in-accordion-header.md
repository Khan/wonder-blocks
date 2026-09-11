# no-heading-in-accordion-header

Disallow heading elements and heading components inside `AccordionSection`'s
`header` prop.

## Rule Details

`AccordionSection` already wraps its trigger in a heading element, and that
heading contains a `<button>`. Whatever you pass to `header` is rendered
_inside_ that button:

```html
<h2>
    <!-- from AccordionSection's `tag` prop -->
    <button>
        <!-- your `header` content goes here -->
    </button>
</h2>
```

Passing a heading — `<h3>`, `<Heading>`, a `tag="h3"` on a component that
renders whatever its `tag` names (`BodyText`, `Text`, `View`, ...), or anything
with `role="heading"` — therefore produces `h2 > button > h3`, which is invalid
twice over:

1. A `<button>`'s content model is
   [phrasing content](https://html.spec.whatwg.org/#phrasing-content) only, so a
   heading element is never legal inside it.
2. Nested headings are invalid HTML and give screen reader users a duplicated,
   confusing heading structure.

To set the heading level, use `AccordionSection`'s `tag` prop. To get
heading-sized text without heading semantics, use `<BodyText tag="span">` with
the `font.heading.*` tokens.

Note that non-heading block content such as `View` is **not** flagged. It is
technically also invalid inside a `<button>`, but it is a long-standing and
documented Wonder Blocks pattern for custom accordion headers, so this rule
stays focused on the heading problem.

Examples of **incorrect** code:

```tsx
/* Raw heading elements */
<AccordionSection header={<h3>Section title</h3>} />

/* Wonder Blocks heading components */
<AccordionSection header={<Heading size="medium">Section title</Heading>} />

/* A `tag` prop that names a heading element */
<AccordionSection header={<BodyText tag="h3">Section title</BodyText>} />
<AccordionSection header={<View tag="h3">Section title</View>} />

/* Explicit heading role */
<AccordionSection header={<View role="heading" aria-level={3}>Title</View>} />

/* Nested anywhere inside the header content */
<AccordionSection
    header={
        <View>
            <PhosphorIcon icon={icon} />
            <h3>Section title</h3>
        </View>
    }
/>
```

Examples of **correct** code:

```tsx
/* A string header is the common case — AccordionSection styles it for you */
<AccordionSection header="Section title" tag="h3" />

/* Set the level with `tag`, and use inline typography for the content */
<AccordionSection
    tag="h3"
    header={
        <View style={styles.header}>
            <PhosphorIcon icon={icon} />
            <BodyText
                tag="span"
                weight="bold"
                style={{
                    fontSize: font.heading.size.medium,
                    lineHeight: font.heading.lineHeight.medium,
                }}
            >
                Section title
            </BodyText>
        </View>
    }
/>

/* Non-heading components are fine */
<AccordionSection header={<DetailCell title="Article item" horizontalRule="none" />} />
```

## Limitations

This rule is static analysis, so it only sees headings written literally in the
`header` prop. A component that renders a heading internally, or a `tag` that
can't be resolved statically, is invisible to it:

```tsx
/* Not flagged — but still wrong if CourseTitle renders an <h3> */
<AccordionSection header={<CourseTitle />} />

/* Not flagged — the tag can't be resolved at lint time */
<AccordionSection header={<BodyText tag={headingTag}>Title</BodyText>} />
```

AccordionSection also warns at runtime in development when the rendered header
turns out to contain a heading, which covers that case.

## When Not To Use It

If you are not using Wonder Blocks' `AccordionSection`, this rule will never
fire and there is no reason to disable it.

## Further Reading

-   [W3C ARIA Authoring Practices: Accordion Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/)
-   [HTML Standard: phrasing content](https://html.spec.whatwg.org/#phrasing-content)
