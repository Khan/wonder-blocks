---
"@khanacademy/wonder-blocks-data": patch
---

Fix `useCachedEffect` refetching forever when an unmemoized `onResultChanged` callback is passed with the `CacheAndNetwork` or `NetworkOnly` fetch policies. The callback is now tracked via a latest-value ref so its identity no longer invalidates the memoized fetch function (which cancelled the inflight request and restarted the fetch); the most recently supplied callback is still the one invoked when a result arrives.
