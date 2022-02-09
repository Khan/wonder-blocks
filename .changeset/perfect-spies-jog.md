---
"@khanacademy/wonder-blocks-data": major
---

Rename types and update signatures
- `ValidData` is now ValidCacheData
- `Cache` type is now `CachedResponses`
- `ResponseCache` type removed (can be created with `$ReadOnly<CachedResponses>`)
- `CacheEntry` type is now `CachedResponse`
- Signatures that were typed as `$ReadOnly<Cache>` or `ResponseCache` types previously are now typed as `CachedResponses` which is more appropriate to how they work
