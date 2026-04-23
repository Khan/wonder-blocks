# useOnMountEffect()

```ts
function useOnMountEffect(callback: (void | () => void)) void;
```

The `useOnMountEffect` can be used to run an effect once on mount. This avoids
having to pass `useEffect` an empty deps array and disable the
`react-hooks/exhaustive-deps` lint.

If `callback` returns a cleanup function, it will be called when the component
is unmounted.

NOTE: This hook is equivalent to:

```js
useEffect(() => {
    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);
```

## Usage

```js
import * as React.from "react";
import {useOnMountEffect} from "@khanacademy/wonder-blocks-core";

import {useMarkConversion} from "~/path/to/use-mark-conversion.js";

const MyComponent = (props: {}): React.Node => {
    const markConversion = useMarkConversion();
    useOnMountEffect(() => {
        markConversion("my-conversion"); // Will only be called once, on mount
    });

    return <h1>Hello, world</h1>;
};
```


---

## Related docs

- [Overview](overview.md)
- [Add Style](add-style.md)
- [Exports Use Force Update](exports-use-force-update.md)
- [Exports Use Is Mounted](exports-use-is-mounted.md)
- [Exports Use Latest Ref](exports-use-latest-ref.md)
- [Exports Use Online](exports-use-online.md)
- [Exports Use Pre Hydration Effect](exports-use-pre-hydration-effect.md)
- [Exports Use Render State](exports-use-render-state.md)
- [Id](id.md)
- [Initial Fallback](initial-fallback.md)
- [Server](server.md)
- [View](view.md)
