# Timing

`wonder-blocks-timing` provides abstractions for common timing APIs like
`setTimeout`, `setInterval` and `requestAnimationFrame` that are aware of React
component lifecycles, ensuring that scheduled timer actions are not unexpectedly
dangling after a component unmounts.


---

## Components & Guides

- [Types Ischedule Actions](types-ischedule-actions.md)
- [Use Interval](use-interval.md)
- [Use Timeout](use-timeout.md)
- [With Action Scheduler](with-action-scheduler.md)
- [With Action Scheduler Migration From Standard Api](with-action-scheduler-migration-from-standard-api.md)
