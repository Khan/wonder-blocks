---
"@khanacademy/wonder-blocks-core": major
---

`useIsMounted` now uses `useLayoutEffect` when clientside to ensure mounted state is determined at a similar stage to the `componentDidMount` lifecycle method.
