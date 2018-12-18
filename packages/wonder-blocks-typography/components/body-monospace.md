One example of using the `BodyMonospace` typography component is to create a `Code` component for rendering pre-formatted code blocks.

```jsx
const Code = ({children}) => (
    <BodyMonospace style={{whiteSpace: "pre"}}>{children}</BodyMonospace>
);

const code = (
`const things = {
    areTested\: "This is my new Code element with my code.",
};`
);

<Code>{code}</Code>
```
