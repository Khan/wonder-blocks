This is a base class from which to derive your own implementations of `IRequestHandler`.

Though there is a default implementation of `getKey`, it is recommended that you
implement a more specific version for your use case.

The `fulfilRequest` method of this base class is not implemented and will throw
an error.

By default, the `cacheHitBehavior` method will return `static`. You can override
this default by passing a value as the second argument to the constructor. If you
wish to make this dynamic, then provide your own implementation of the `cacheHitBehavior`
method.

The constructor requires a `type` to identify your handler. This should be unique
among the handlers that are used across your application, otherwise, requests
may be fulfilled by the wrong handler.
