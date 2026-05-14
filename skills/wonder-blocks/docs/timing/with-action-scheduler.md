# withActionSceduler

<ComponentInfo name={packageConfig.name} version={packageConfig.version} />

This is a higher order component (HOC) that attaches the given component to an
[`IScheduleActions`](#ischeduleactions) instance. Any actions scheduled will automatically be
cleared on unmount. This allows for "set it and forget it" behavior that won't
leave timers dangling when the component's lifecycle ends.

For more details on using this component and the [`IScheduleActions`](#ischeduleactions) interface,
see the [API overview](#timing-api-overview).

## TypeScript Types

If you are using TypeScript typing, you can use the `WithActionSchedulerProps` type
to build the props for the component that you will pass to the `withActionScheduler`
function by spreading the type into your component's `Props` type.

The added `schedule` prop is of type [`IScheduleActions`](#ischeduleactions). This is what the
`withActionScheduler` function injects to your component.

The returned value from `withActionScheduler` is a React component with props of
type `TProps`.

Access to the [timing API](./?path=/docs/packages-timing-types-ischeduleactions--docs) is provided via the `withActionScheduler` higher order
component.

## Usage

### Incorrect Usage

The following component, `MyNaughtyComponent`, will keep spamming our pretend
log even after it was unmounted.

```tsx
<View>
    <Unmounter>
        <MyNaughtyComponent targetId={id} />
    </Unmounter>
    <View id={id} />
</View>
```

### Correct Usage

But if we use `withActionScheduler` and the `interval` method, everything is
fine. Unmount the component, and the logging stops.

```tsx
<View>
    <Unmounter>
        <MyGoodComponentWithScheduler targetId={id} />
    </Unmounter>
    <View id={id} />
</View>
```


---

## Related docs

- [Overview](overview.md)
- [Types Ischedule Actions](types-ischedule-actions.md)
- [Use Interval](use-interval.md)
- [Use Timeout](use-timeout.md)
- [With Action Scheduler Migration From Standard Api](with-action-scheduler-migration-from-standard-api.md)
