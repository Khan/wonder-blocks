import{M as s}from"./index-35e12253.js";import{a as n,j as t,F as c}from"./jsx-runtime-309e447d.js";import{u as a}from"./index-506666d7.js";import"./iframe-97aa1d91.js";import"../sb-preview/runtime.js";import"./chunk-6P7RB4HF-938b085e.js";import"./index-d475d2ea.js";import"./index-9f32f44c.js";import"./_commonjsHelpers-de833af9.js";import"./index-9c2d1831.js";import"./inheritsLoose-9eefaa95.js";import"./assertThisInitialized-081f9914.js";import"./index-4733a090.js";import"./_baseIsEqual-976d9d82.js";import"./uniq-944679ca.js";import"./index-356e4a49.js";function i(r){const e=Object.assign({h1:"h1",pre:"pre",code:"code",p:"p",a:"a",ul:"ul",li:"li",h2:"h2",ol:"ol"},a(),r.components);return t(c,{children:[n(s,{title:"Testing / Test Harness / Exports / harnessAdapters",parameters:{chromatic:{disableSnapshot:!0}}}),`
`,n(e.h1,{id:"harnessadapters",children:"harnessAdapters"}),`
`,n(e.pre,{children:n(e.code,{className:"language-ts",children:`/**
 * The default adapters provided by Wonder Blocks.
 */
const DefaultAdapters = {
    css: css.adapter,
    data: data.adapter,
    portal: portal.adapter,
    router: router.adapter,
};

/**
 * The default configurations to use with the \`DefaultAdapters\`.
 */
const DefaultConfigs: Configs<typeof DefaultAdapters> = {
    css: css.defaultConfig,
    data: data.defaultConfig,
    portal: portal.defaultConfig,
    router: router.defaultConfig,
};
`})}),`
`,t(e.p,{children:["These are the adapters available for use with the test harness framework and their default configurations. The ",n(e.a,{href:"/docs/testing-test-harness-exports-testharness--page",children:n(e.code,{children:"testHarness()"})})," and ",n(e.a,{href:"/docs/testing-test-harness-exports-hookharness--page",children:n(e.code,{children:"hookHarness()"})})," methods are constructed using these."]}),`
`,t(e.p,{children:["If you want to make your own test harness or hook harness using some of these defaults and some of your own, you can combine them into your call to ",n(e.a,{href:"/docs/testing-test-harness-exports-maketestharness--page",children:n(e.code,{children:"makeTestHarness()"})})," or ",n(e.a,{href:"/docs/testing-test-harness-exports-makehookharness--page",children:n(e.code,{children:"makeHookHarness()"})}),"."]}),`
`,n(e.p,{children:"There are four build-in adapters:"}),`
`,t(e.ul,{children:[`
`,n(e.li,{children:n(e.a,{href:"#css",children:n(e.code,{children:"css"})})}),`
`,n(e.li,{children:n(e.a,{href:"#data",children:n(e.code,{children:"data"})})}),`
`,n(e.li,{children:n(e.a,{href:"#portal",children:n(e.code,{children:"portal"})})}),`
`,n(e.li,{children:n(e.a,{href:"#router",children:n(e.code,{children:"router"})})}),`
`]}),`
`,n(e.h2,{id:"css",children:"css"}),`
`,t(e.p,{children:["The ",n(e.code,{children:"css"})," adapter can be used to apply CSS classes and adhoc styles around the harnessed component."]}),`
`,n(e.pre,{children:n(e.code,{className:"language-ts",children:`type Config =
    | string
    | Array<string>
    | CSSProperties
    | {|
          classes: Array<string>,
          style: CSSProperties,
      |};
`})}),`
`,t(e.p,{children:["The configuration for this adapter can be a class name, an array of class names, an Aphrodite-compatible CSS style object, or an object definining both an array of ",n(e.code,{children:"classes"})," and a ",n(e.code,{children:"style"})," object."]}),`
`,n(e.p,{children:"The default configuration for this adapter is for it to not be used."}),`
`,n(e.h2,{id:"data",children:"data"}),`
`,t(e.p,{children:["The ",n(e.code,{children:"data"})," adapter provides a convenient way to intercept Wonder Blocks Data requests. It renders one ",n(e.a,{href:"/docs/data-exports-interceptrequests--page",children:n(e.code,{children:"InterceptRequests"})})," component per configured interceptor."]}),`
`,n(e.pre,{children:n(e.code,{className:"language-ts",children:`type Interceptor = React.ElementConfig<typeof InterceptRequests>["interceptor"];

type Config = Interceptor | Array<Interceptor>;
`})}),`
`,t(e.p,{children:["The configuration is one or more interceptors, as defined by the ",n(e.code,{children:"interceptor"})," prop of the ",n(e.a,{href:"/docs/data-exports-interceptrequests--page",children:n(e.code,{children:"InterceptRequests"})})," component, which is effectively."]}),`
`,n(e.p,{children:"The default configuration for this adapter is for there to be no interceptors."}),`
`,n(e.h2,{id:"portal",children:"portal"}),`
`,t(e.p,{children:["The ",n(e.code,{children:"portal"})," adapter ensures there is a mounting point in the DOM for components that rely on rendering with a React portal."]}),`
`,n(e.pre,{children:n(e.code,{className:"language-ts",children:`type Config = string;
`})}),`
`,t(e.p,{children:["The configuration is just a string providing the identifier to give the added element. The adapter will then render alongside the harnessed component, an empty ",n(e.code,{children:"div"})," element with both the ",n(e.code,{children:"id"})," and ",n(e.code,{children:"data-test-id"})," attributes set to the configuration value."]}),`
`,n(e.p,{children:"The default configuration for this adapter is for it to not be used."}),`
`,n(e.h2,{id:"router",children:"router"}),`
`,t(e.p,{children:["The ",n(e.code,{children:"router"})," adapter is useful for testing components that use React Router. It will render either a ",n(e.code,{children:"MemoryRouter"})," or ",n(e.code,{children:"StaticRouter"}),", depending on configuration. It may also optionally render a ",n(e.code,{children:"Route"})," with suitable ",n(e.code,{children:"path"})," match, depending on the configuration."]}),`
`,n(e.pre,{children:n(e.code,{className:"language-ts",children:`type Config =
    | $ReadOnly<
          | {|
                /**
                 * See MemoryRouter prop for initialEntries.
                 */
                initialEntries: MemoryRouterProps["initialEntries"],

                /**
                 * See MemoryRouter prop for initialIndex.
                 */
                initialIndex?: MemoryRouterProps["initialIndex"],

                /**
                 * See MemoryRouter prop for getUserConfirmation.
                 */
                getUserConfirmation?: MemoryRouterProps["getUserConfirmation"],

                /**
                 * A path match to use.
                 *
                 * When this is specified, the harnessed component will be
                 * rendered inside a \`Route\` handler with this path.
                 *
                 * If the path matches the location, then the route will
                 * render the component.
                 *
                 * If the path does not match the location, then the route
                 * will not render the component.
                 */
                path?: string,
            |}
          | {|
                /**
                 * The location to use.
                 */
                location: string | Location,

                /**
                 * Force the use of a StaticRouter, instead of MemoryRouter.
                 */
                forceStatic: true,

                /**
                 * A path match to use.
                 *
                 * When this is specified, the harnessed component will be
                 * rendered inside a \`Route\` handler with this path.
                 *
                 * If the path matches the location, then the route will
                 * render the component.
                 *
                 * If the path does not match the location, then the route
                 * will not render the component.
                 */
                path?: string,
            |}
          | {|
                /**
                 * The initial location to use.
                 */
                location: string | LocationShape,

                /**
                 * A path match to use.
                 *
                 * When this is specified, the harnessed component will be
                 * rendered inside a \`Route\` handler with this path.
                 *
                 * If the path matches the location, then the route will
                 * render the component.
                 *
                 * If the path does not match the location, then the route
                 * will not render the component.
                 */
                path?: string,
            |},
      >
    // The initial location to use.
    | string;
`})}),`
`,n(e.p,{children:"There are four distinct shapes to the configuration:"}),`
`,t(e.ol,{children:[`
`,t(e.li,{children:["An object with ",n(e.code,{children:"initialEntries"})," array (see ",n(e.code,{children:"MemoryRouter"})," props), optional ",n(e.code,{children:"initialIndex"})," and ",n(e.code,{children:"getUserConfirmation"})," (see ",n(e.code,{children:"MemoryRouter"})," props), and an optional ",n(e.code,{children:"path"})," parameter if route matching is required."]}),`
`,t(e.li,{children:["An object with ",n(e.code,{children:"forceStatic"})," set to true, the location as a ",n(e.code,{children:"string"})," or ",n(e.code,{children:"Location"})," object, with an optional ",n(e.code,{children:"path"})," parameter if route matching is required."]}),`
`,t(e.li,{children:["An object specifying the location as a ",n(e.code,{children:"string"})," or a ",n(e.code,{children:"LocationShape"})," object, with an optional ",n(e.code,{children:"path"})," parameter if route matching is required."]}),`
`,t(e.li,{children:["A ",n(e.code,{children:"string"})," specifying the location to use"]}),`
`]}),`
`,t(e.p,{children:["The first of these provides the most flexibility, basically supporting full configuration of a ",n(e.code,{children:"MemoryRouter"}),", which supports history and navigation. The second configuration type is for scenarios where we absolutely do not want navigation, such as server-side rendering scenarios; it forces the use of a ",n(e.code,{children:"StaticRouter"})," instance. The third type is for when you just need to render a single location with a matched route path. The fourth and final type allows you to just provide the location as a string."]}),`
`,t(e.p,{children:["By default, the router adapter is configured with ",n(e.code,{children:'{location: "/"}'}),"."]})]})}function h(r={}){const{wrapper:e}=Object.assign({},a(),r.components);return e?n(e,{...r,children:n(i,{...r})}):i(r)}const d=()=>{throw new Error("Docs-only story")};d.parameters={docsOnly:!0};const o={title:"Testing / Test Harness / Exports / harnessAdapters",parameters:{chromatic:{disableSnapshot:!0}},tags:["stories-mdx"],includeStories:["__page"]};o.parameters=o.parameters||{};o.parameters.docs={...o.parameters.docs||{},page:h};const A=["__page"];export{A as __namedExportsOrder,d as __page,o as default};
//# sourceMappingURL=exports.harness-adapters.stories-c7b789c3.js.map
