---
"@khanacademy/wonder-blocks-timing": major
---

- **[BREAKING CHANGE]** Policy types are now using enums across all APIs
- **[BREAKING CHANGE]** `useScheduledTimeout` has been renamed to `useTimeout` and the original `useTimeout` has been removed. To update existing uses of `useTimeout` to the new API: if `active` was `true` just delete that argument or replace it with `{schedulingPolicy: SchedulingPolicy.Immediately}`; if `active` was `false` replace it with `{schedulingPolicy: SchedulingPolicy.OnDemand}`.
- **[BREAKING CHANGE]** `useScheduledInterval` has been renamed to `useInterval` and the original `useInterval` has been removed. To update existing uses of `useInterval` to the new API: if `active` was `true` just delete that argument or replace it with `{schedulingPolicy: SchedulingPolicy.Immediately}`; if `active` was `false` replace it with `{schedulingPolicy: SchedulingPolicy.OnDemand}`.
- **[NEW]** `useTimeout` now supports an optional `ActionPolicy` in the options. The default is to not reset the timeout when the `action` callback changes. This can be changed to `ActionPolicy.Reset` to reset the timeout when the `action` callback changes (it is recommended that you use `useCallback` on your `action` callback to avoid resetting the timeout everytime a component renders when using the `Reset` policy).
- **[NEW]** `useInterval` now supports an optional `ActionPolicy` in the options. The default is to not reset the interval when the `action` callback changes. This can be changed to `ActionPolicy.Reset` to reset the interval when the `action` callback changes (it is recommended that you use `useCallback` on your `action` callback to avoid resetting the interval everytime a component renders when using the `Reset` policy).
- **[BUGFIX]** `useTimeout` will now correctly reset the timeout when the `set` method is called, as intended.
- **[BUGFIX]** `useInterval` will now correctly reset the interval when the `set` method is called, as intended.
