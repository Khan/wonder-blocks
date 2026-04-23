# Server

Provides helpers for switching to server-side mode and determining if server-side mode is in use.
This API is valuable when performing server-side rendering actions.

## setServerSide

When called, server-side mode is turned on. Once turned on, it cannot be turned off.
This causes additinal features to be available in some Wonder Blocks packages that are otherwise ignored.

### Usage

```js
import {Server} from "@khanacademy/wonder-blocks-core";

Server.setServerSide(): void;
```

## isServerSide

This returns `false` unless `setServerSide` has been called. It is used to determine
if server-side-only features and behaviors should be enabled.

### Usage

```js
import {Server} from "@khanacademy/wonder-blocks-core";

Server.isServerSide(): boolean;
```


---

## Related docs

- [Overview](overview.md)
- [Add Style](add-style.md)
- [Exports Use Force Update](exports-use-force-update.md)
- [Exports Use Is Mounted](exports-use-is-mounted.md)
- [Exports Use Latest Ref](exports-use-latest-ref.md)
- [Exports Use On Mount Effect](exports-use-on-mount-effect.md)
- [Exports Use Online](exports-use-online.md)
- [Exports Use Pre Hydration Effect](exports-use-pre-hydration-effect.md)
- [Exports Use Render State](exports-use-render-state.md)
- [Id](id.md)
- [Initial Fallback](initial-fallback.md)
- [View](view.md)
