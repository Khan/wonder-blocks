import{r as a}from"./index-9f32f44c.js";import{M as x}from"./index-35e12253.js";import{V as h}from"./render-state-root-891c0d56.js";import{B as p}from"./button-b2794e32.js";import{L as b}from"./labeled-text-field-d77d5301.js";import{S as u}from"./strut-c6011196.js";import{S as r,C as w}from"./index-f641b98f.js";import{j as o,a as t,F as y}from"./jsx-runtime-309e447d.js";import{u as c}from"./index-506666d7.js";import"./_commonjsHelpers-de833af9.js";import"./iframe-97aa1d91.js";import"../sb-preview/runtime.js";import"./chunk-6P7RB4HF-938b085e.js";import"./index-d475d2ea.js";import"./index-9c2d1831.js";import"./inheritsLoose-9eefaa95.js";import"./assertThisInitialized-081f9914.js";import"./index-4733a090.js";import"./_baseIsEqual-976d9d82.js";import"./uniq-944679ca.js";import"./index-356e4a49.js";import"./clickable-8a7f284d.js";import"./index-8d47fad6.js";import"./footnote-761d2bcc.js";import"./icon-a4f17d53.js";import"./radio-0fc824b1.js";function C(n){const e=a.useRef(n);return e.current=n,e}function R({message:n}){const e=Object.assign({p:"p"},c()),s=C(n);return a.useEffect(()=>()=>alert(s.current),[s]),o(e.p,{children:["Message: ",n]})}function _(){const[n,e]=a.useState("Hello, world!"),[s,m]=a.useState(!0),f=()=>m(!0),g=()=>m(!1);return o(l,{children:[t(b,{label:"Message",description:"An alert will pop up with this message when you click 'Unmount'. You can change the message while the component is mounted.",value:n,onChange:e}),t(u,{size:r.medium_16}),o(h,{style:{flexDirection:"row",gap:r.xSmall_8},children:[s&&t(p,{onClick:g,children:"Unmount"}),!s&&t(p,{onClick:f,children:"Mount"})]}),t(u,{size:r.medium_16}),t(l,{children:s&&t(R,{message:n})})]})}function l({children:n}){return t(h,{style:{borderRadius:5,border:"1px solid #ccc",boxShadow:"inset 1px 1px 6px #0001",padding:r.medium_16,background:w.offWhite},children:n})}function d(n){const e=Object.assign({h1:"h1",pre:"pre",code:"code",p:"p",h2:"h2"},c(),n.components);return o(y,{children:[t(x,{title:"Core / Exports / useLatestRef()",parameters:{chromatic:{disableSnapshot:!0}}}),`
`,t(e.h1,{id:"uselatestref",children:"useLatestRef()"}),`
`,t(e.pre,{children:t(e.code,{className:"language-ts",children:`function useLatestRef<T>(value: T): React.RefObject<T>;
`})}),`
`,o(e.p,{children:["The ",t(e.code,{children:"useLatestRef"})," hook returns a ref that always contains the ",t(e.code,{children:"value"}),` passed
to the hook during the most recent render.`]}),`
`,o(e.p,{children:[`It can be used to wrap a possibly-changing prop in a stable value that can
be passed to `,t(e.code,{children:"useEffect"}),`'s dependency array. This can be useful when you don't
want the `,t(e.code,{children:"useEffect"}),` callback to be re-run when the prop changes, but do need
to use the prop's value inside the `,t(e.code,{children:"useEffect"})," callback."]}),`
`,t(e.h2,{id:"example",children:"Example"}),`
`,t(e.pre,{children:t(e.code,{className:"language-ts",children:`export function ComponentThatAlertsOnUnmount({message}) {
    const messageRef = useLatestRef(message);
    useEffect(() => {
        return () => alert(messageRef.current);
    }, [messageRef]);
    return <p>Message: {message}</p>;
}
`})}),`
`,`
`,o(e.p,{children:["The component above will ",t(e.code,{children:"alert()"}),` a message when it unmounts. (If you want to
imagine a more realistic example, pretend it's sending an analytics event!)
The component always alerts the message it was rendering just before unmount,
even if the message changes during the component's lifespan.`]}),`
`,o(e.p,{children:["Here it is in action, wrapped in controls that let you change the ",t(e.code,{children:"message"}),`
prop and unmount/remount the component.`]}),`
`,t(_,{})]})}function M(n={}){const{wrapper:e}=Object.assign({},c(),n.components);return e?t(e,{...n,children:t(d,{...n})}):d(n)}const E=()=>{throw new Error("Docs-only story")};E.parameters={docsOnly:!0};const i={title:"Core / Exports / useLatestRef()",parameters:{chromatic:{disableSnapshot:!0}},tags:["stories-mdx"],includeStories:["__page"]};i.parameters=i.parameters||{};i.parameters.docs={...i.parameters.docs||{},page:M};const Z=["ComponentThatAlertsOnUnmount","Example1","Context","__page"];export{R as ComponentThatAlertsOnUnmount,l as Context,_ as Example1,Z as __namedExportsOrder,E as __page,i as default};
//# sourceMappingURL=exports.use-latest-ref.stories-90533a07.js.map
