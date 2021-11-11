### useUniqueIdWithoutMock (hook)

This hook is similar to `<UniqueIDProvider mockOnFirstRender={false}>`.  It
will return `null` on the initial render and then the same identifier factory
for each subsequent render.  The identifier factory is unique to each
component.

```jsx
import {useUniqueIdWithoutMock} from "@khanacademy/wonder-blocks-core";
import Button from "@khanacademy/wonder-blocks-button";

const [count, setCount] = React.useState(0);
const renders = React.useRef([]);
const ids = useUniqueIdWithoutMock();
console.log(ids);

const handleClick = () => {
    setCount(count + 1);
};

if (ids) {
    renders.current.push(ids.get("my-unique-id"));
}

<div>
    <Button onClick={handleClick}>Re-render</Button>
    renders:
    {renders.current.map((value, index) => (
        <div>
            Render {index}: {value}
        </div>
    ))}
</div>
```

```jsx
import Button from "@khanacademy/wonder-blocks-button";

const [count, setCount] = React.useState(42);
<Button onClick={() => setCount(count + 1)}>{count}</Button>
```
