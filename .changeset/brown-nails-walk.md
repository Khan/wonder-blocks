---
"@khanacademy/wonder-blocks-tabs": patch
---

Improve robustness of responsive logic in ResponsiveTabs and ResponsiveNavigationTabs by using a MutationObserver to trigger when we should check for overflow to decide if a dropdown or horizontal tabs layout should be used. Also fixes edge cases where additional container padding/margin could cause continuous layout changes.
