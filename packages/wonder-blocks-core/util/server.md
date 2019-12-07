Provides helpers for switching to server-side mode and determining if server-side mode is in use.
This API is valuable when performing server-side rendering actions.

### setServerSide

When called, server-side mode is turned on. Once turned on, it cannot be turned off.
This causes additinal features to be available in some Wonder Blocks packages that are otherwise ignored.

#### Usage

```js static
Server.setServerSide(): void;
```

### isServerSide

This returns `false` unless `setServerSide` has been called. It is used to determine
if server-side-only features and behaviors should be enabled.

#### Usage

```js static
Server.isServerSide(): boolean;
```
