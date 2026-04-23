# Server-side Rendering (SSR)

Wonder Blocks Data provides components, hooks, and additional APIs to make server-side rendering and hydration of asynchronous requests easier.

The [`Data`](./?path=/docs/packages-data-exports-data--docs) component and the [`useHydratableEffect`](./?path=/docs/packages-data-exports-usehydratableeffect--docs) hook (which [`Data`](./?path=/docs/packages-data-exports-data--docs) uses internally) both
support server-side rendering and hydration.

These APIs have been designed to make it easy for everyday development. The developer does not need to consider the server-side process nor hydration when requiring asynchronous data. Instead, they use [`Data`](./?path=/docs/packages-data-exports-data--docs) or [`useHydratableEffect`](./?path=/docs/packages-data-exports-usehydratableeffect--docs) to get the data they need.

## Integrating into server-side rendering

Generally, server-side rendering has a loop that renders the page, determines what asynchronous activity needs to be resolved, resolves and caches that activity, then renders again, ensuring that as much of the page as possible has been rendered.

In order for the requests made through [`Data`](./?path=/docs/packages-data-exports-data--docs) and [`useHydratableEffect`](./?path=/docs/packages-data-exports-usehydratableeffect--docs) use to be fulfilled on the server and subsequently hydrated on the client, the server responsible for rendering the page must be modified to track and capture the requests and their responses.

First, Wonder Blocks Data has to be told to work in server-side mode:

```ts
import {Server} from "@khanacademy/wonder-blocks-core";

Server.setServerSide();
```

By setting Wonder Blocks into server mode, requests will not be fulfilled during rendering (there would be no point since server-side rendering does not mount components and as such, cannot update the rendered component tree with the result of asynchronous requests). Instead, we are now ready to track these requests.

### Tracking and fulfilling requests

To track the requests, the React node being rendered must be wrapped in the [`TrackData`](./?path=/docs/packages-data-exports-trackdata--docs) component.

```tsx
const trackedElement = <TrackData>{theNodeTheClientNormallyRenders}</TrackData>;
```

The [`TrackData`](./?path=/docs/packages-data-exports-trackdata--docs) component is responsible for capturing the requests that were made during a render of the given React node. Of course to do that, we have to render the node. Rendering is usually performed by `renderToString` from the `react-dom/server` import.

```ts
import {renderToString} from "react-dom/server";

renderToString(trackedElement);
```

After each render, we want to see if there are any tracked requests needing to be fulfilled. If there are, we will want to fulfill them and render again; if there are not, we are ready to finish the page rendering and move on.

To determine which path to take, we can use [`hasTrackedRequestsToBeFetched`](./?path=/docs/packages-data-exports-hastrackedrequeststobefetched--docs), and then based off that result, either fulfill the requests, or finish rendering our page.

```ts
if (hasTrackedRequestsToBeFetched()) {
    await fetchTrackedRequests();

    // Render again.
    // ...
} else {
    // Finish rendering the page.
    // ...
}
```

Internally, Wonder Blocks Data caches the responses of fulfilled requests and does not track them again. Each cycle of the rendering should occur with the same knowledge you expect the client-side to have when it performs the render, so although we want to retain our hydration cache response, we need to make sure any transient caches are cleared.

Once the rendered component no longer requires any further data, the cached responses can be obtained to include in the rendered page for the client to hydrate. The hydration cache is promised by `fetchTrackedRequests()`, regardless of whether it actually had any pending requests or not.

### Putting it all together

> 😱 Make sure you safely embed strings in your rendered pages to avoid injection bugs. This example is brief for the purposes of illustration.

A function for server-side rendering with Wonder Blocks Data could look something like this.

```tsx
import {Server} from "@khanacademy/wonder-blocks-core";
import {
    TrackData,
    hasTrackedRequestsToBeFetched,
    fetchTrackedRequests,
    SharedCache,
} from "@khanacademy/wonder-blocks-data";

// Don't forget to import your app!
import App from "./App.js";

async function renderApp(): Promise<string> {
    // Tell Wonder Blocks we are server-side.
    Server.setServerSide();

    // Wrap the app with our tracking code.
    const trackedElement = (
        <TrackData>
            <App />
        </TrackData>
    );

    // Now, loop around rendering and fulfilling until we have nothing left
    // to fulfill.
    let hydrationCache = null;
    let renderedComponent = null;
    do {
        /*
         * Each render has to be isolated, so we have to make sure we clear the
         * shared cache used by the `useSharedCache` hook as this is transient
         * cache that does not itself get directly hydrated.
         */
        SharedCache.purgeAll();

        // Render the tracked component.
        renderedComponent = renderToString(trackedElement);

        if (hasTrackedRequestsToBeFetched()) {
            // Fulfill any pending requests.
            await fetchTrackedRequests();

            // We can't leave the loop yet as we want to render the element
            // again with the newly fulfilled data.
            continue;
        }

        // We rendered with all the data fulfilled, so we can grab the
        // hydration cache contents and exit the loop now.
        hydrationCache = await fetchTrackedRequests();
    } while (hydrationCache == null);

    // Finally, render the page with our hydration cache and rendered
    // component.
    return `
<html>
   <head>
         <title>My Page</title>
         <script>
            window.__WONDER_BLOCKS_DATA__ = ${safeStringify(hydrationCache)}
         </script>
         <script src="hydrate.js"></script>
   </head>
   <body>
      <div id="my-react-app-root">
         ${renderedComponent}
      </div>
   </body>
</html>
`;
}
```

The above page is simplified for clarity - you would need to make sure all your scripts, fonts, etc. get loaded into the page. However, assuming all those things get loaded, the last piece need is signified above as the script tag importing `hydrate.js` - this is the script that will hydrate the client-side rendered component.

## Hydrating on the client-side

Now that you have a rendered page, the client needs to be written to properly hydrate to the exact same state as the server rendered. To do this, the hydration cache that was serialized into the page as `window.__WONDER_BLOCKS_DATA__` must be injected into the Wonder Blocks Data cache before the React `hydrate` call is made.

In the previous section, this was displayed as the `hydrate.js` script. Here is what that script might look like.

```tsx
import {hydrate} from "react-dom";
import {initializeHydrationCache} from "@khanacademy/wonder-blocks-data";

// Don't forget to import your app!
import App from "./App.js";

initializeHydrationCache(window._WONDER_BLOCKS_DATA_);

React.hydrate(
    // This should match whatever was passed to the server-side rendering
    // function, renderApp, in the previous section.
    <App />,

    // The ID of the element to host the hydrated component has to match what
    // the server-rendered page uses.
    document.getElementById("my-react-app-root"),
);
```

That's it! The client-side hydration is complete. Underneath the hood, the hydration cache is used to hydrate the responses that the server used to render the page. And if you render a page that was not server-side rendered, the [`Data`](./?path=/docs/packages-data-exports-data--docs) and [`useHydratableEffect`](./?path=/docs/packages-data-exports-usehydratableeffect--docs) know exactly what to do and will make the requests client-side instead.


---

## Related docs

- [Overview](overview.md)
- [Exports Abort Inflight Requests](exports-abort-inflight-requests.md)
- [Exports Data](exports-data.md)
- [Exports Data Error](exports-data-error.md)
- [Exports Data Errors](exports-data-errors.md)
- [Exports Fetch Tracked Requests](exports-fetch-tracked-requests.md)
- [Exports Get Gql Request Id](exports-get-gql-request-id.md)
- [Exports Gql Error](exports-gql-error.md)
- [Exports Gql Errors](exports-gql-errors.md)
- [Exports Gql Router](exports-gql-router.md)
- [Exports Has Tracked Requests To Be Fetched](exports-has-tracked-requests-to-be-fetched.md)
- [Exports Initialize Hydration Cache](exports-initialize-hydration-cache.md)
- [Exports Intercept Requests](exports-intercept-requests.md)
- [Exports Purge Caches](exports-purge-caches.md)
- [Exports Purge Hydration Cache](exports-purge-hydration-cache.md)
- [Exports Scoped In Memory Cache](exports-scoped-in-memory-cache.md)
- [Exports Serializable In Memory Cache](exports-serializable-in-memory-cache.md)
- [Exports Shared Cache](exports-shared-cache.md)
- [Exports Status](exports-status.md)
- [Exports Track Data](exports-track-data.md)
- [Exports Use Cached Effect](exports-use-cached-effect.md)
- [Exports Use Gql](exports-use-gql.md)
- [Exports Use Hydratable Effect](exports-use-hydratable-effect.md)
- [Exports Use Server Effect](exports-use-server-effect.md)
- [Exports Use Shared Cache](exports-use-shared-cache.md)
- [Exports When Client Side](exports-when-client-side.md)
- [Graph Ql](graph-ql.md)
- [Testing](testing.md)
- [Types Cached Response](types-cached-response.md)
- [Types Error Options](types-error-options.md)
- [Types Fetch Policy](types-fetch-policy.md)
- [Types Gql Context](types-gql-context.md)
- [Types Gql Fetch Fn](types-gql-fetch-fn.md)
- [Types Gql Fetch Options](types-gql-fetch-options.md)
- [Types Gql Operation](types-gql-operation.md)
- [Types Gql Operation Type](types-gql-operation-type.md)
- [Types Raw Scoped Cache](types-raw-scoped-cache.md)
- [Types Response Cache](types-response-cache.md)
- [Types Result](types-result.md)
- [Types Scoped Cache](types-scoped-cache.md)
- [Types Valid Cache Data](types-valid-cache-data.md)
