import{M as c}from"./index-35e12253.js";import{a as t,j as o,F as s}from"./jsx-runtime-309e447d.js";import{u as i}from"./index-506666d7.js";import"./iframe-97aa1d91.js";import"../sb-preview/runtime.js";import"./chunk-6P7RB4HF-938b085e.js";import"./index-d475d2ea.js";import"./index-9f32f44c.js";import"./_commonjsHelpers-de833af9.js";import"./index-9c2d1831.js";import"./inheritsLoose-9eefaa95.js";import"./assertThisInitialized-081f9914.js";import"./index-4733a090.js";import"./_baseIsEqual-976d9d82.js";import"./uniq-944679ca.js";import"./index-356e4a49.js";function n(r){const e=Object.assign({h1:"h1",pre:"pre",code:"code",p:"p",a:"a",h2:"h2",ol:"ol",li:"li"},i(),r.components);return o(s,{children:[t(c,{title:"Data / Exports / useGql()",parameters:{chromatic:{disableSnapshot:!0}}}),`
`,t(e.h1,{id:"usegql",children:"useGql()"}),`
`,t(e.pre,{children:t(e.code,{className:"language-ts",children:`type FetchFn = <TData, TVariables: {...}>(
    operation: GqlOperation<TData, TVariables>,
    options?: GqlFetchOptions<TVariables, TContext>,
) => Promise<TData>;

function useGql<TContext: GqlContext>(
    context: Partial<TContext> = ({}: $Shape<TContext>),
): FetchFn;
`})}),`
`,o(e.p,{children:["The ",t(e.code,{children:"useGql"})," hook requires that the calling component has been rendered with a ",t(e.a,{href:"/docs/data-exports-gqlrouter--page",children:t(e.code,{children:"GqlRouter"})})," as an ancestor component since it relies on the default context and fetch operation that is specified therein."]}),`
`,o(e.p,{children:["The ",t(e.code,{children:"useGql"})," hook can take a partial context value which will be combined with the default context to create the context used for a specific request."]}),`
`,o(e.p,{children:["The return value of ",t(e.code,{children:"useGql"})," is a fetch function that can be used to invoke a GraphQL request. It takes as arguments the ",t(e.a,{href:"/docs/data-types-gqloperation--page",children:t(e.code,{children:"GqlOperation"})})," operation to be performed and some options (which, by their nature, are optional). These options can be used to provide variables for the operation as well as additional customization of the context."]}),`
`,o(e.p,{children:["The result of calling the function returned by ",t(e.code,{children:"useGql"})," is a promise of the data that the request will return. This is compatible with the ",t(e.a,{href:"/docs/data-exports-useservereffect--page",children:t(e.code,{children:"useServerEffect"})}),", ",t(e.a,{href:"/docs/data-exports-usecachedeffect--page",children:t(e.code,{children:"useCachedEffect"})}),", and ",t(e.a,{href:"/docs/data-exports-usehydratableeffect--page",children:t(e.code,{children:"useHydratableEffect"})})," hooks, allowing a variety of scenarios to be easily constructed."]}),`
`,o(e.p,{children:["Use ",t(e.a,{href:"/docs/data-exports-getgqlrequestid--page",children:t(e.code,{children:"getGqlRequestId"})})," to get a request ID that can be used with these hooks."]}),`
`,t(e.h2,{id:"context-merging",children:"Context Merging"}),`
`,o(e.p,{children:["Context overrides are combined such that any values that are explicitly or implicitly ",t(e.code,{children:"undefined"})," on the partial context will be ignored. Any values that are explicitly ",t(e.code,{children:"null"})," on the partial context will be removed from the merged context. The order of precedence is as follows:"]}),`
`,o(e.ol,{children:[`
`,t(e.li,{children:"Values from the fetch partial context, then,"}),`
`,o(e.li,{children:["Values from the ",t(e.code,{children:"useGql"})," partial context, then,"]}),`
`,t(e.li,{children:"Values from the default context."}),`
`]})]})}function l(r={}){const{wrapper:e}=Object.assign({},i(),r.components);return e?t(e,{...r,children:t(n,{...r})}):n(r)}const h=()=>{throw new Error("Docs-only story")};h.parameters={docsOnly:!0};const a={title:"Data / Exports / useGql()",parameters:{chromatic:{disableSnapshot:!0}},tags:["stories-mdx"],includeStories:["__page"]};a.parameters=a.parameters||{};a.parameters.docs={...a.parameters.docs||{},page:l};const _=["__page"];export{_ as __namedExportsOrder,h as __page,a as default};
//# sourceMappingURL=exports.use-gql.stories-7de5c066.js.map
