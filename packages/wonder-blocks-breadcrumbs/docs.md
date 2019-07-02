```js
const Link = require("@khanacademy/wonder-blocks-link").default;
const {BreadcrumbsItem} = require("@khanacademy/wonder-blocks-breadcrumbs");

<Breadcrumbs>
    <BreadcrumbsItem>
        <Link href="https://khanacademy.org/">Home</Link>
    </BreadcrumbsItem>
    <BreadcrumbsItem>
        <Link href="https://khanacademy.org/about">About</Link>
    </BreadcrumbsItem>
    <BreadcrumbsItem>Current page</BreadcrumbsItem>
</Breadcrumbs>
```

**NOTE**: `<BreadcrumbsItem />` only accepts two element types:

1. string
2. `<Link />`

## Accessibility

- It should follow guidelines from [W3C](https://www.w3.org/TR/wai-aria-practices/examples/breadcrumb/index.html).
- Use aria-label=Breadcrumb for the container (nav).
- Use aria-current=page for the link containing the current page.
