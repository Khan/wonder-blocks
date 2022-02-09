---
"@khanacademy/wonder-blocks-data": major
---

Rename types and update signatures
- `ValidData` is now `ValidCacheData`
- `Cache` type is now `ResponseCache` (old `ResponseCache` can be created with `$ReadOnly<ResponseCache>`)
- `CacheEntry` type is now `CachedResponse`
- Signatures that were typed as `$ReadOnly<Cache>` previously are now typed as `ResponseCache` which is more appropriate to how they work
