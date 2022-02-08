---
"@khanacademy/wonder-blocks-data": major
---

Simplified, more versatile API
- NEW: `useServerEffect` hook - a way to perform asynchronous tasks on the server and have the value available for hydration
- UPDATED: `Data` component - New API that does away with the `IRequestHandler` interface. Includes new props to control behavior on hydration and when new requests occur.
- UPDATED: `InterceptData` component - New API to reflect changes in `Data` component.

- REMOVED: `IRequestHandler` API. All associated call signatures have been updated to reflect this.
- REMOVED: `useData` hook - The `Data` component should be used
