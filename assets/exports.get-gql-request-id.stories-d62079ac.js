import{M as i}from"./index-35e12253.js";import{a as t,j as o,F as c}from"./jsx-runtime-309e447d.js";import{u as s}from"./index-506666d7.js";import"./iframe-97aa1d91.js";import"../sb-preview/runtime.js";import"./chunk-6P7RB4HF-938b085e.js";import"./index-d475d2ea.js";import"./index-9f32f44c.js";import"./_commonjsHelpers-de833af9.js";import"./index-9c2d1831.js";import"./inheritsLoose-9eefaa95.js";import"./assertThisInitialized-081f9914.js";import"./index-4733a090.js";import"./_baseIsEqual-976d9d82.js";import"./uniq-944679ca.js";import"./index-356e4a49.js";function n(r){const e=Object.assign({h1:"h1",pre:"pre",code:"code",p:"p",a:"a"},s(),r.components);return o(c,{children:[t(i,{title:"Data / Exports / getGqlRequestId()",parameters:{chromatic:{disableSnapshot:!0}}}),`
`,t(e.h1,{id:"getgqlrequestid",children:"getGqlRequestId()"}),`
`,t(e.pre,{children:t(e.code,{className:"language-ts",children:`function getGqlRequestId<TData, TVariables: {...}>(
    operation: GqlOperation<TData, TVariables>,
    variables: ?TVariables,
    context: GqlContext,
): string;
`})}),`
`,o(e.p,{children:["The ",t(e.code,{children:"getGqlRequestId"})," function generates an identifier based on the operation, variables, and context of a specific GraphQL request. This identifier is guaranteed to be the same for all requests that share the same operation, variables, and context, even if variables and context values are in different orders."]}),`
`,o(e.p,{children:["The identifier returned by this function can then be used with our ",t(e.a,{href:"/docs/data-exports-usecachedeffect--page",children:t(e.code,{children:"useCachedEffect"})}),", ",t(e.a,{href:"/docs/data-exports-useservereffect--page",children:t(e.code,{children:"useServerEffect"})}),", and ",t(e.a,{href:"/docs/data-exports-usehydratableeffect--page",children:t(e.code,{children:"useHydratableEffect"})})," hooks as the ",t(e.code,{children:"requestId"})," parameter, allowing them to be combined with the fetch operation from the ",t(e.a,{href:"/docs/data-exports-usegql--page",children:t(e.code,{children:"useGql"})})," hook."]})]})}function d(r={}){const{wrapper:e}=Object.assign({},s(),r.components);return e?t(e,{...r,children:t(n,{...r})}):n(r)}const p=()=>{throw new Error("Docs-only story")};p.parameters={docsOnly:!0};const a={title:"Data / Exports / getGqlRequestId()",parameters:{chromatic:{disableSnapshot:!0}},tags:["stories-mdx"],includeStories:["__page"]};a.parameters=a.parameters||{};a.parameters.docs={...a.parameters.docs||{},page:d};const M=["__page"];export{M as __namedExportsOrder,p as __page,a as default};
//# sourceMappingURL=exports.get-gql-request-id.stories-d62079ac.js.map
