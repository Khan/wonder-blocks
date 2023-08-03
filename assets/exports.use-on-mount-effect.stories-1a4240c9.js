import{M as c}from"./index-35e12253.js";import{a as n,j as r,F as i}from"./jsx-runtime-309e447d.js";import{u as a}from"./index-506666d7.js";import"./iframe-97aa1d91.js";import"../sb-preview/runtime.js";import"./chunk-6P7RB4HF-938b085e.js";import"./index-d475d2ea.js";import"./index-9f32f44c.js";import"./_commonjsHelpers-de833af9.js";import"./index-9c2d1831.js";import"./inheritsLoose-9eefaa95.js";import"./assertThisInitialized-081f9914.js";import"./index-4733a090.js";import"./_baseIsEqual-976d9d82.js";import"./uniq-944679ca.js";import"./index-356e4a49.js";function s(o){const e=Object.assign({h1:"h1",pre:"pre",code:"code",p:"p",h2:"h2"},a(),o.components);return r(i,{children:[n(c,{title:"Core / Exports / useOnMountEffect()",parameters:{chromatic:{disableSnapshot:!0}}}),`
`,n(e.h1,{id:"useonmounteffect",children:"useOnMountEffect()"}),`
`,n(e.pre,{children:n(e.code,{className:"language-ts",children:`function useOnMountEffect(callback: (void | () => void)) void;
`})}),`
`,r(e.p,{children:["The ",n(e.code,{children:"useOnMountEffect"}),` can be used to run an effect once on mount. This avoids
having to pass `,n(e.code,{children:"useEffect"}),` an empty deps array and disable the
`,n(e.code,{children:"react-hooks/exhaustive-deps"})," lint."]}),`
`,r(e.p,{children:["If ",n(e.code,{children:"callback"}),` returns a cleanup function, it will be called when the component
is unmounted.`]}),`
`,n(e.p,{children:"NOTE: This hook is equivalent to:"}),`
`,n(e.pre,{children:n(e.code,{className:"language-js",children:`useEffect(() => {
    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);
`})}),`
`,n(e.h2,{id:"usage",children:"Usage"}),`
`,n(e.pre,{children:n(e.code,{className:"language-js",children:`import * as React.from "react";
import {useOnMountEffect} from "@khanacademy/wonder-blocks-core";

import {useMarkConversion} from "~/path/to/use-mark-conversion.js";

const MyComponent = (props: {}): React.Node => {
    const markConversion = useMarkConversion();
    useOnMountEffect(() => {
        markConversion("my-conversion"); // Will only be called once, on mount
    });

    return <h1>Hello, world</h1>;
};
`})})]})}function p(o={}){const{wrapper:e}=Object.assign({},a(),o.components);return e?n(e,{...o,children:n(s,{...o})}):s(o)}const d=()=>{throw new Error("Docs-only story")};d.parameters={docsOnly:!0};const t={title:"Core / Exports / useOnMountEffect()",parameters:{chromatic:{disableSnapshot:!0}},tags:["stories-mdx"],includeStories:["__page"]};t.parameters=t.parameters||{};t.parameters.docs={...t.parameters.docs||{},page:p};const j=["__page"];export{j as __namedExportsOrder,d as __page,t as default};
//# sourceMappingURL=exports.use-on-mount-effect.stories-1a4240c9.js.map
