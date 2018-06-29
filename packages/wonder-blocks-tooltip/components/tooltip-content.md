The `TooltipContent` component is provided for situations where the `Tooltip` needs to be customized beyond the default stylings. `TooltipContent` supports all `wonder-blocks-typography` components.

### Just text content

This shows the default which is text rendered using `LabelMedium`.

```jsx
<TooltipContent>
    Just the content
</TooltipContent>
```

### Titled content

This shows the default with a title; the title is rendered using `HeadingSmall`.

```jsx
<TooltipContent title="Title text!">
    Some content in my content
</TooltipContent>
```

### Custom title and custom content

This shows how we can customize both the title and the content.

```jsx
const {Body, LabelSmall} = require("@khanacademy/wonder-blocks-typography");

<TooltipContent title={<Body>Body text title!</Body>}>
    <Body>Body text content!</Body>
    <LabelSmall>And LabelSmall!</LabelSmall>
</TooltipContent>
```