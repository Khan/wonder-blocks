### breadcrumb example (with links):
```js
const Link = require("@khanacademy/wonder-blocks-link").default;
const {BreadcrumbItem} = require("@khanacademy/wonder-blocks-breadcrumb");

<Breadcrumb>
    <BreadcrumbItem><Link href="https://khanacademy.org/">Home</Link></BreadcrumbItem>
    <BreadcrumbItem aria-current="page">Current page</BreadcrumbItem>
</Breadcrumb>;
```