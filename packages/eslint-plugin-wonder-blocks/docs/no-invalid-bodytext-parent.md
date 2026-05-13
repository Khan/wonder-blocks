# no-invalid-bodytext-parent

Disallow `BodyText` with a block-level tag inside elements that cannot contain block-level content.

## Rule Details

`BodyText` renders as a `<p>` element by default. HTML does not allow block-level
elements like `<p>` inside inline contexts such as `<button>`, `<label>`, `<p>`,
or heading elements. Placing `BodyText` inside these elements produces invalid
markup that browsers must silently repair, which can cause layout or accessibility
issues.

Add `tag="span"` (or another inline tag) to `BodyText` to make it render as an
inline element that is valid in these contexts.

This rule provides an auto-fix that adds `tag="span"` when the fix is
unambiguous. Dynamic `tag` expressions (e.g. `tag={isLabel ? "span" : "p"}`) are
not auto-fixed to avoid silently corrupting conditional logic.

Examples of **incorrect** code:

```tsx
/* BodyText inside a <button> */
<button>
    <BodyText>Click me</BodyText>
</button>

/* BodyText inside a WB Button component */
<Button onClick={handleClick}>
    <BodyText>Click me</BodyText>
</Button>

/* BodyText inside a <label> */
<label>
    <BodyText>Email address</BodyText>
    <input type="email" />
</label>

/* BodyText inside a WB form component */
<Choice label={<BodyText>Option A</BodyText>} value="a" />
<LabeledField label={<BodyText>Email</BodyText>} field={<input />} />
<RadioGroup description={<BodyText>Choose one</BodyText>} />
<CheckboxGroup description={<BodyText>Select all that apply</BodyText>} />

/* BodyText nested inside another BodyText (both render as <p>) */
<BodyText>
    Outer text <BodyText>inner text</BodyText>
</BodyText>

/* BodyText inside a heading */
<h2>
    Section <BodyText>subtitle</BodyText>
</h2>
<StyledH2>
    Section <BodyText>subtitle</BodyText>
</StyledH2>
<Heading>
    Section <BodyText>subtitle</BodyText>
</Heading>
```

Examples of **correct** code:

```tsx
/* Inline tag makes BodyText valid inside a button */
<button>
    <BodyText tag="span">Click me</BodyText>
</button>

/* Inline tag makes BodyText valid inside a WB Button */
<Button onClick={handleClick}>
    <BodyText tag="span">Click me</BodyText>
</Button>

/* Inline tag makes BodyText valid inside a label */
<label>
    <BodyText tag="span">Email address</BodyText>
    <input type="email" />
</label>

/* Inline tag makes BodyText valid inside a WB form component */
<Choice label={<BodyText tag="span">Option A</BodyText>} value="a" />

/* Outer BodyText uses a block-container tag, allowing block children */
<BodyText tag="div">
    Outer text <BodyText>inner text</BodyText>
</BodyText>

/* Inline tag makes BodyText valid inside a heading */
<h2>
    Section <BodyText tag="sup">note</BodyText>
</h2>

/* BodyText is fine at the top level or inside block containers */
<BodyText>Standalone paragraph</BodyText>
<div>
    <BodyText>Inside a div</BodyText>
</div>
```

## When Not To Use It

Disable this rule only if you are intentionally rendering invalid HTML and have a
specific reason to do so. In most cases the auto-fix resolves the issue without
any manual effort.
