import{M as l}from"./index-35e12253.js";import{a as n,j as o,F as a}from"./jsx-runtime-309e447d.js";import{u as s}from"./index-506666d7.js";import"./iframe-97aa1d91.js";import"../sb-preview/runtime.js";import"./chunk-6P7RB4HF-938b085e.js";import"./index-d475d2ea.js";import"./index-9f32f44c.js";import"./_commonjsHelpers-de833af9.js";import"./index-9c2d1831.js";import"./inheritsLoose-9eefaa95.js";import"./assertThisInitialized-081f9914.js";import"./index-4733a090.js";import"./_baseIsEqual-976d9d82.js";import"./uniq-944679ca.js";import"./index-356e4a49.js";function i(t){const e=Object.assign({h1:"h1",p:"p",strong:"strong",ul:"ul",li:"li",code:"code",a:"a",h2:"h2",h3:"h3",ol:"ol"},s(),t.components);return o(a,{children:[n(l,{title:"Popover / Popover / Accessibility",parameters:{previewTabs:{canvas:{hidden:!0}},viewMode:"docs",chromatic:{disableSnapshot:!0}}}),`
`,n(e.h1,{id:"accessibility",children:"Accessibility"}),`
`,n(e.p,{children:"The Popover component should follow these guidelines:"}),`
`,n(e.p,{children:n(e.strong,{children:"Trigger Element:"})}),`
`,o(e.ul,{children:[`
`,o(e.li,{children:["It should have a role of button (e.g. ",n(e.code,{children:"<button>"}),")."]}),`
`,o(e.li,{children:[`When the content is visible, it's recommended to set
`,n(e.a,{href:"https://www.w3.org/TR/wai-aria-1.1/#aria-expanded",target:"_blank",rel:"nofollow noopener noreferrer",children:"aria-expanded"}),` to true.
When content is hidden,
`,n(e.a,{href:"https://www.w3.org/TR/wai-aria-1.1/#aria-expanded",target:"_blank",rel:"nofollow noopener noreferrer",children:"aria-expanded"}),` is set to
false.`]}),`
`,o(e.li,{children:[`It should reference the content using the
`,n(e.a,{href:"https://www.w3.org/TR/wai-aria-1.1/#aria-controls",target:"_blank",rel:"nofollow noopener noreferrer",children:"aria-controls"})," attribute."]}),`
`]}),`
`,n(e.p,{children:n(e.strong,{children:"Popover Dialog:"})}),`
`,o(e.p,{children:[`The popover component will populate the
`,n(e.a,{href:"https://www.w3.org/TR/wai-aria-1.1/#aria-describedby",target:"_blank",rel:"nofollow noopener noreferrer",children:"aria-describedby"}),`
attribute automatically, unless the user sets an `,n(e.code,{children:"id"}),` prop inside the Popover
instance. Internally, it will be set on the trigger element.`]}),`
`,n(e.h2,{id:"keyboard-interaction",children:"Keyboard Interaction"}),`
`,n(e.h3,{id:"initial-focus",children:"Initial focus"}),`
`,o(e.p,{children:[n(e.strong,{children:"NOTE:"}),` This only applies when the popover is opened by clicking on a trigger
element.`]}),`
`,n(e.p,{children:`When a popover is opened via a button, focus moves to an element inside the
Popover. The initial focus placement depends on the following scenarios:`}),`
`,o(e.ol,{children:[`
`,o(e.li,{children:[`
`,n(e.p,{children:`initialFocusId (default): Popover exposes this prop as a string. The popover
itself will try to find this element into the DOM. If it's found, focus is
initially set on this element.`}),`
`]}),`
`,o(e.li,{children:[`
`,n(e.p,{children:`focusable elements: This is the second scenario, where the popover tries to
find the first occurrence of possible focusable elements.`}),`
`]}),`
`,o(e.li,{children:[`
`,n(e.p,{children:`Popover: If the first two conditions are not met, then focus is initially set
to the popover container.`}),`
`]}),`
`]}),`
`,n(e.h3,{id:"focus-management",children:"Focus management"}),`
`,n(e.p,{children:`Once focus is in the popover, users can access controls within the popover
using:`}),`
`,o(e.ol,{children:[`
`,o(e.li,{children:[`
`,o(e.p,{children:[n(e.strong,{children:n(e.code,{children:"tab"})}),": Moves focus to the next focusable element."]}),`
`,o(e.p,{children:[n(e.strong,{children:"NOTE:"}),` If the focus has reached the last focusable element inside the
popover, the next tab will set focus on the next focusable element that
exists after the PopoverAnchor.`]}),`
`]}),`
`,o(e.li,{children:[`
`,o(e.p,{children:[n(e.strong,{children:n(e.code,{children:"shift + tab"})}),": Moves focus to the previous focusable element."]}),`
`,o(e.p,{children:[n(e.strong,{children:"NOTE:"}),` If the focus is set to the first focusable element inside the
popover, the next shift + tab will set focus on the PopoverAnchor element.`]}),`
`]}),`
`]}),`
`,n(e.h3,{id:"dismissing-the-popover",children:"Dismissing the popover"}),`
`,n(e.p,{children:`When a popover dialog closes, focus should return to the anchor element defined
in the Popover children prop.`})]})}function c(t={}){const{wrapper:e}=Object.assign({},s(),t.components);return e?n(e,{...t,children:n(i,{...t})}):i(t)}const h=()=>{throw new Error("Docs-only story")};h.parameters={docsOnly:!0};const r={title:"Popover / Popover / Accessibility",parameters:{previewTabs:{canvas:{hidden:!0}},viewMode:"docs",chromatic:{disableSnapshot:!0}},tags:["stories-mdx"],includeStories:["__page"]};r.parameters=r.parameters||{};r.parameters.docs={...r.parameters.docs||{},page:c};const O=["__page"];export{O as __namedExportsOrder,h as __page,r as default};
//# sourceMappingURL=popover.accessibility.stories-75625c53.js.map
