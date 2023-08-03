import{M as s}from"./index-35e12253.js";import{a as t,j as n,F as i}from"./jsx-runtime-309e447d.js";import{u as o}from"./index-506666d7.js";import"./iframe-97aa1d91.js";import"../sb-preview/runtime.js";import"./chunk-6P7RB4HF-938b085e.js";import"./index-d475d2ea.js";import"./index-9f32f44c.js";import"./_commonjsHelpers-de833af9.js";import"./index-9c2d1831.js";import"./inheritsLoose-9eefaa95.js";import"./assertThisInitialized-081f9914.js";import"./index-4733a090.js";import"./_baseIsEqual-976d9d82.js";import"./uniq-944679ca.js";import"./index-356e4a49.js";function d(r){const e=Object.assign({h1:"h1",p:"p",a:"a",code:"code",h2:"h2",pre:"pre",h3:"h3",blockquote:"blockquote"},o(),r.components);return n(i,{children:[t(s,{title:"Data / Server-side Rendering and Hydration",parameters:{chromatic:{disableSnapshot:!0}}}),`
`,t(e.h1,{id:"server-side-rendering-ssr",children:"Server-side Rendering (SSR)"}),`
`,t(e.p,{children:"Wonder Blocks Data provides components, hooks, and additional APIs to make server-side rendering and hydration of asynchronous requests easier."}),`
`,n(e.p,{children:["The ",t(e.a,{href:"/docs/data-exports-data--page",children:t(e.code,{children:"Data"})})," component and the ",t(e.a,{href:"/docs/data-exports-usehydratableeffect--page",children:t(e.code,{children:"useHydratableEffect"})})," hook (which ",t(e.a,{href:"/docs/data-exports-data--page",children:t(e.code,{children:"Data"})}),` uses internally) both
support server-side rendering and hydration.`]}),`
`,n(e.p,{children:["These APIs have been designed to make it easy for everyday development. The developer does not need to consider the server-side process nor hydration when requiring asynchronous data. Instead, they use ",t(e.a,{href:"/docs/data-exports-data--page",children:t(e.code,{children:"Data"})})," or ",t(e.a,{href:"/docs/data-exports-usehydratableeffect--page",children:t(e.code,{children:"useHydratableEffect"})})," to get the data they need."]}),`
`,t(e.h2,{id:"integrating-into-server-side-rendering",children:"Integrating into server-side rendering"}),`
`,t(e.p,{children:"Generally, server-side rendering has a loop that renders the page, determines what asynchronous activity needs to be resolved, resolves and caches that activity, then renders again, ensuring that as much of the page as possible has been rendered."}),`
`,n(e.p,{children:["In order for the requests made through ",t(e.a,{href:"/docs/data-exports-data--page",children:t(e.code,{children:"Data"})})," and ",t(e.a,{href:"/docs/data-exports-usehydratableeffect--page",children:t(e.code,{children:"useHydratableEffect"})})," use to be fulfilled on the server and subsequently hydrated on the client, the server responsible for rendering the page must be modified to track and capture the requests and their responses."]}),`
`,t(e.p,{children:"First, Wonder Blocks Data has to be told to work in server-side mode:"}),`
`,t(e.pre,{children:t(e.code,{className:"language-ts",children:`import {Server} from "@khanacademy/wonder-blocks-core";

Server.setServerSide();
`})}),`
`,t(e.p,{children:"By setting Wonder Blocks into server mode, requests will not be fulfilled during rendering (there would be no point since server-side rendering does not mount components and as such, cannot update the rendered component tree with the result of asynchronous requests). Instead, we are now ready to track these requests."}),`
`,t(e.h3,{id:"tracking-and-fulfilling-requests",children:"Tracking and fulfilling requests"}),`
`,n(e.p,{children:["To track the requests, the React node being rendered must be wrapped in the ",t(e.a,{href:"/docs/data-exports-trackdata--page",children:t(e.code,{children:"TrackData"})})," component."]}),`
`,t(e.pre,{children:t(e.code,{className:"language-tsx",children:`const trackedElement = <TrackData>{theNodeTheClientNormallyRenders}</TrackData>;
`})}),`
`,n(e.p,{children:["The ",t(e.a,{href:"/docs/data-exports-trackdata--page",children:t(e.code,{children:"TrackData"})})," component is responsible for capturing the requests that were made during a render of the given React node. Of course to do that, we have to render the node. Rendering is usually performed by ",t(e.code,{children:"renderToString"})," from the ",t(e.code,{children:"react-dom/server"})," import."]}),`
`,t(e.pre,{children:t(e.code,{className:"language-ts",children:`import {renderToString} from "react-dom/server";

renderToString(trackedElement);
`})}),`
`,t(e.p,{children:"After each render, we want to see if there are any tracked requests needing to be fulfilled. If there are, we will want to fulfill them and render again; if there are not, we are ready to finish the page rendering and move on."}),`
`,n(e.p,{children:["To determine which path to take, we can use ",t(e.a,{href:"/docs/data-exports-hastrackedrequeststobefetched--page",children:t(e.code,{children:"hasTrackedRequestsToBeFetched"})}),", and then based off that result, either fulfill the requests, or finish rendering our page."]}),`
`,t(e.pre,{children:t(e.code,{className:"language-ts",children:`if (hasTrackedRequestsToBeFetched()) {
    await fetchTrackedRequests();

    // Render again.
    // ...
} else {
    // Finish rendering the page.
    // ...
}
`})}),`
`,t(e.p,{children:"Internally, Wonder Blocks Data caches the responses of fulfilled requests and does not track them again. Each cycle of the rendering should occur with the same knowledge you expect the client-side to have when it performs the render, so although we want to retain our hydration cache response, we need to make sure any transient caches are cleared."}),`
`,n(e.p,{children:["Once the rendered component no longer requires any further data, the cached responses can be obtained to include in the rendered page for the client to hydrate. The hydration cache is promised by ",t(e.code,{children:"fetchTrackedRequests()"}),", regardless of whether it actually had any pending requests or not."]}),`
`,t(e.h3,{id:"putting-it-all-together",children:"Putting it all together"}),`
`,n(e.blockquote,{children:[`
`,t(e.p,{children:"😱 Make sure you safely embed strings in your rendered pages to avoid injection bugs. This example is brief for the purposes of illustration."}),`
`]}),`
`,t(e.p,{children:"A function for server-side rendering with Wonder Blocks Data could look something like this."}),`
`,t(e.pre,{children:t(e.code,{className:"language-tsx",children:`import {Server} from "@khanacademy/wonder-blocks-core";
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
         * shared cache used by the \`useSharedCache\` hook as this is transient
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
    return \`
<html>
   <head>
         <title>My Page</title>
         <script>
            window.__WONDER_BLOCKS_DATA__ = \${safeStringify(hydrationCache)}
         <\/script>
         <script src="hydrate.js"><\/script>
   </head>
   <body>
      <div id="my-react-app-root">
         \${renderedComponent}
      </div>
   </body>
</html>
\`;
}
`})}),`
`,n(e.p,{children:["The above page is simplified for clarity - you would need to make sure all your scripts, fonts, etc. get loaded into the page. However, assuming all those things get loaded, the last piece need is signified above as the script tag importing ",t(e.code,{children:"hydrate.js"})," - this is the script that will hydrate the client-side rendered component."]}),`
`,t(e.h2,{id:"hydrating-on-the-client-side",children:"Hydrating on the client-side"}),`
`,n(e.p,{children:["Now that you have a rendered page, the client needs to be written to properly hydrate to the exact same state as the server rendered. To do this, the hydration cache that was serialized into the page as ",t(e.code,{children:"window.__WONDER_BLOCKS_DATA__"})," must be injected into the Wonder Blocks Data cache before the React ",t(e.code,{children:"hydrate"})," call is made."]}),`
`,n(e.p,{children:["In the previous section, this was displayed as the ",t(e.code,{children:"hydrate.js"})," script. Here is what that script might look like."]}),`
`,t(e.pre,{children:t(e.code,{className:"language-tsx",children:`import {hydrate} from "react-dom";
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
`})}),`
`,n(e.p,{children:["That's it! The client-side hydration is complete. Underneath the hood, the hydration cache is used to hydrate the responses that the server used to render the page. And if you render a page that was not server-side rendered, the ",t(e.a,{href:"/docs/data-exports-data--page",children:t(e.code,{children:"Data"})})," and ",t(e.a,{href:"/docs/data-exports-usehydratableeffect--page",children:t(e.code,{children:"useHydratableEffect"})})," know exactly what to do and will make the requests client-side instead."]})]})}function h(r={}){const{wrapper:e}=Object.assign({},o(),r.components);return e?t(e,{...r,children:t(d,{...r})}):d(r)}const c=()=>{throw new Error("Docs-only story")};c.parameters={docsOnly:!0};const a={title:"Data / Server-side Rendering and Hydration",parameters:{chromatic:{disableSnapshot:!0}},tags:["stories-mdx"],includeStories:["__page"]};a.parameters=a.parameters||{};a.parameters.docs={...a.parameters.docs||{},page:h};const _=["__page"];export{_ as __namedExportsOrder,c as __page,a as default};
//# sourceMappingURL=_overview_ssr_.stories-46010e86.js.map
