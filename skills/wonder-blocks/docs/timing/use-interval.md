# `useInterval`

`useInterval` is a hook that provides a convenient API for setting and clearing
an interval. It is defined as follows:

```ts
function useInterval(
    action: () => mixed,
    timeoutMs: number,
    options?: {|
        schedulePolicy?: SchedulePolicy,
        clearPolicy?: ClearPolicy,
        actionPolicy?: ActionPolicy,
    |},
): IInterval;

interface IInterval {
    get isSet(): boolean;
    set(): void;
    clear(policy?: ClearPolicy): void;
}
```

By default the interval will be set immediately upon creation. The `options` parameter can
be used to control when the interval is scheduled and whether or not `action` should be
called when the interval is cleared.

Notes:

* Because `clear` takes a param, it's important that you don't pass it directly to an event handler,
  e.g. `<Button onClick={clear} />` will not work as expected.
* Calling `set` after the interval has been cleared will restart the interval.
* Updating the second paramter, `timeoutMs`, will also restart the interval.
* When the component using this hook is unmounted, the interval will automatically be cleared.
* Calling `set` after the interval is already set will restart the interval.

```tsx
<View>
    <Body>
        Interval should fire every second until cleared. Setting the
        interval again resets the interval.
    </Body>
    <View>isSet = {String(intervalSet)}</View>
    <View>callCount = {callCount}</View>
    <View style={{flexDirection: "row"}}>
        <Button onClick={() => interval.set()}>Set interval</Button>
        <Button onClick={() => interval.clear()}>Clear interval</Button>
    </View>
</View>
```

```tsx
<View>
    <Body>
        Interval will not start until set is explicitly invoked.
        Interval should fire every second until cleared. Clearing the
        interval will invoke the interval action one more time. Setting
        the interval again resets the interval.
    </Body>
    <View>isSet = {String(intervalSet)}</View>
    <View>callCount = {callCount}</View>
    <View style={{flexDirection: "row"}}>
        <Button onClick={() => interval.set()}>Set interval</Button>
        <Button onClick={() => interval.clear()}>Clear interval</Button>
    </View>
</View>
```


---

## Related docs

- [Overview](overview.md)
- [Types Ischedule Actions](types-ischedule-actions.md)
- [Use Timeout](use-timeout.md)
- [With Action Scheduler](with-action-scheduler.md)
- [With Action Scheduler Migration From Standard Api](with-action-scheduler-migration-from-standard-api.md)
