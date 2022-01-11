This class implements the `IRequestHandler` interface. It is to be used as a
base class to implement your own request handler.

```js static
interface IRequestHandler<TOptions, TData> {
    /**
     * Fulfill a given request.
     */
    fulfillRequest(options: TOptions): Promise<TData>;

    /**
     * The handler type; this is used to uniquely identify this handler from
     * any other handler.
     */
    get type(): string;

    /**
     * When true, server-side results are cached and hydrated in the client.
     * When false, the server-side cache is not used and results are not
     * hydrated.
     * This should only be set to false if something is ensuring that the
     * hydrated client result will match the server result.
     */
    get hydrate(): boolean;

    /**
     * Get the key to use for a given request. This should be idempotent for a
     * given options set if you want caching to work across requests.
     */
    getKey(options: TOptions): string;
}
```

The constructor requires a `type` to identify your handler. This should be unique
among the handlers that are used across your application, otherwise, requests
may be fulfilled by the wrong handler.

The `fulfillRequest` method of this class is not implemented and will throw if
called. Subclasses will need to implement this method.

A default implementation of `getKey` is provided that serializes the options of
a request to a string and uses that as the cache key. You may want to override
this behavior to simplify the key or to omit some values from the key.

The `hydrate` property indicates if the data that is fulfilled for the handler
during SSR should be provided for hydration. This should be `true` in most
cases. When `false`, React hydration will fail unless some other aspect of your
SSR process is tracking the data for hydration. An example of setting this to
false might be when you are using Apollo Client. In that scenario, you may use
Apollo Cache to store and hydrate the data, while using Wonder Blocks Data to
track and fulfill any query requests made via Apollo Client.
