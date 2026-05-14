# `useTimeout`

`useTimeout` is a hook that provides a convenient API for setting and clearing
a timeout. It is defined as follows:

```ts
function useTimeout(
    action: () => mixed,
    timeoutMs: number,
    options?: {|
        schedulePolicy?: SchedulePolicy,
        clearPolicy?: ClearPolicy,
        actionPolicy?: ActionPolicy,
    |},
): ITimeout;

interface ITimeout {
    get isSet(): boolean;
    set(): void;
    clear(policy?: ClearPolicy): void;
}
```

By default the timeout will be set immediately up creation. The `options` parameter can
be used to control when when the timeout is schedule and whether or not `action` should be
called when the timeout is cleared.

Notes:

-   Because `clear` takes a param, it's important that you don't pass it directly to an event handler,
    e.g. `<Button onClick={clear} />` will not work as expected.
-   Calling `set` after the timeout has expired will restart the timeout.
-   Updating the second paramter, `timeoutMs`, will also restart the timeout.
-   When the component using this hooks is unmounted, the timeout will automatically be cleared.
-   Calling `set` after the timeout is set but before it expires means that the timeout will be
    reset and will call `action`, `timeoutMs` after the most recent call to `set` was made.

```tsx
<View>
    <Body>
        Timeout should fire in 5 seconds unless set again or cleared
    </Body>
    <View>isSet = {String(timeoutSet)}</View>
    <View>callCount = {callCount}</View>
    <View style={{flexDirection: "row"}}>
        <Button onClick={() => timeout.set()}>Set timeout</Button>
        <Button
            onClick={() => {
                timeout.clear();
            }}
        >
            Clear timeout
        </Button>
    </View>
</View>
```

```tsx
<View>
    <Body>
        Timeout should fire in 5 seconds or when cleared unless set
        again
    </Body>
    <View>isSet = {String(timeoutSet)}</View>
    <View>callCount = {callCount}</View>
    <View style={{flexDirection: "row"}}>
        <Button onClick={() => timeout.set()}>Set timeout</Button>
        <Button onClick={() => timeout.clear()}>Clear timeout</Button>
    </View>
</View>
```


---

## Related docs

- [Overview](overview.md)
- [Types Ischedule Actions](types-ischedule-actions.md)
- [Use Interval](use-interval.md)
- [With Action Scheduler](with-action-scheduler.md)
- [With Action Scheduler Migration From Standard Api](with-action-scheduler-migration-from-standard-api.md)
