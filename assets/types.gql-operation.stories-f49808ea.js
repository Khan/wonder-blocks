import{M as d}from"./index-35e12253.js";import{a as n,j as t,F as c}from"./jsx-runtime-309e447d.js";import{u as a}from"./index-506666d7.js";import"./iframe-97aa1d91.js";import"../sb-preview/runtime.js";import"./chunk-6P7RB4HF-938b085e.js";import"./index-d475d2ea.js";import"./index-9f32f44c.js";import"./_commonjsHelpers-de833af9.js";import"./index-9c2d1831.js";import"./inheritsLoose-9eefaa95.js";import"./assertThisInitialized-081f9914.js";import"./index-4733a090.js";import"./_baseIsEqual-976d9d82.js";import"./uniq-944679ca.js";import"./index-356e4a49.js";function o(r){const e=Object.assign({h1:"h1",pre:"pre",code:"code",p:"p",ul:"ul",li:"li",a:"a"},a(),r.components);return t(c,{children:[n(d,{title:"Data / Types / GqlOperation<>",parameters:{chromatic:{disableSnapshot:!0}}}),`
`,n(e.h1,{id:"gqloperation",children:"GqlOperation<>"}),`
`,n(e.pre,{children:n(e.code,{className:"language-ts",children:`type GqlOperation<
    TData,
    TVariables: {...} = Empty,
> = {
    type: GqlOperationType,
    id: string,
    [key: string]: mixed,
    ...
};
`})}),`
`,t(e.p,{children:["The ",n(e.code,{children:"GqlOperation<>"})," type provides the Wonder Blocks Data definition of a GraphQL query or mutation. It has two required fields:"]}),`
`,t(e.ul,{children:[`
`,t(e.li,{children:[n(e.code,{children:"type"}),": The type of operation. It can be either ",n(e.code,{children:'"query"'})," or ",n(e.code,{children:'"mutation"'}),"."]}),`
`,t(e.li,{children:[n(e.code,{children:"id"}),": The unique identifier of the operation."]}),`
`]}),`
`,n(e.p,{children:"Unlike some GraphQL clients, the definition of the operation (the document node, for example) is not required by the Wonder Blocks Data implementation. If a specific use requires that information, the calling code is able to provide it."}),`
`,t(e.p,{children:["Consider the following GraphQL query (using ",n(e.code,{children:"graphql-tag"}),"):"]}),`
`,n(e.pre,{children:n(e.code,{className:"language-ts",children:`const MyQuery = gql\`
    query myQuery {
        user {
            id
            name
        }
    }
\`;
`})}),`
`,t(e.p,{children:["Rather than using the full ",n(e.code,{children:"DocumentNode"})," at runtime, one could envisage a build step that converts it to a ",n(e.code,{children:"GqlOperation<>"})," at compile time by parsing the ",n(e.code,{children:"DocumentNode"})," to determine the operation type and extract the name of the operation. If the actual definition is needed for sending to the server in the request, this can be obtained from ",n(e.code,{children:"graphql/language/printer"}),". This would then reduce the dependencies needed to perform GraphQL operations at runtime."]}),`
`,t(e.p,{children:["The resulting ",n(e.code,{children:"GqlOperation<>"})," would look like this:"]}),`
`,n(e.pre,{children:n(e.code,{className:"language-ts",children:`{
    type: "query",
    id: "myQuery",
}
`})}),`
`,t(e.p,{children:["Or, if say, the query definition were needed (for example, Apollo will send requests with the ",n(e.code,{children:"query"})," field):"]}),`
`,n(e.pre,{children:n(e.code,{className:"language-ts",children:`{
    type: "query",
    id: "myQuery",
    query: "query myQuery { user { id name } }",
}
`})}),`
`,t(e.p,{children:["See the section on ",n(e.a,{href:"/docs/data-graphql--page",children:"GraphQL"})," for more information."]})]})}function l(r={}){const{wrapper:e}=Object.assign({},a(),r.components);return e?n(e,{...r,children:n(o,{...r})}):o(r)}const p=()=>{throw new Error("Docs-only story")};p.parameters={docsOnly:!0};const i={title:"Data / Types / GqlOperation<>",parameters:{chromatic:{disableSnapshot:!0}},tags:["stories-mdx"],includeStories:["__page"]};i.parameters=i.parameters||{};i.parameters.docs={...i.parameters.docs||{},page:l};const _=["__page"];export{_ as __namedExportsOrder,p as __page,i as default};
//# sourceMappingURL=types.gql-operation.stories-f49808ea.js.map
