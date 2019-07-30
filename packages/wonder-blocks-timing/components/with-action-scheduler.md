This is a higher order component (HOC) that attaches the given component to an
[`IScheduleActions`](#ischeduleactions) instance. Any actions scheduled will automatically be
cleared on unmount. This allows for "set it and forget it" behavior that won't
leave timers dangling when the component's lifecycle ends.

For more details on using this component and the [`IScheduleActions`](#ischeduleactions) interface,
see the [API overview](#timing-api-overview).

### Flow Types
If you are using Flow typing, you can use the `WithActionScheduler<TProps>`
generic type to build the props for the component that you will pass to the
`withActionScheduler` function, where `TProps` represents all the props your
component uses other than the `schedule` prop that will get added.

The added `schedule` prop is of type [`IScheduleActions`](#ischeduleactions). This is what the
`withActionScheduler` function injects to your component.

The returned value from `withActionScheduler` is a React component with props of
type `TProps`.
