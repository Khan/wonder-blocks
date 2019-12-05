This class implements the `IRequestHandler` interface. It is to be used as a
base class to implement your own request handler.

The constructor requires a `type` to identify your handler. This should be unique
among the handlers that are used across your application, otherwise, requests
may be fulfilled by the wrong handler.

The `fulfillRequest` method of this class is not implemented and will throw if
called.

A default implemnetation of `getKey` is provided that serializes the options of
a request to a string and uses that as the cache key. You may want to override
this behavior to simplify the key or to omit some values from the key.
