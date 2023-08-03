import{M as d,C as p,b as u}from"./index-35e12253.js";import{S as r,O as o}from"./multi-select-4619a451.js";import{V as b}from"./render-state-root-891c0d56.js";import"./index-9f32f44c.js";import{a as h}from"./footnote-761d2bcc.js";import{j as n,a as e,F as g}from"./jsx-runtime-309e447d.js";import{u as s}from"./index-506666d7.js";import"./iframe-97aa1d91.js";import"../sb-preview/runtime.js";import"./chunk-6P7RB4HF-938b085e.js";import"./index-d475d2ea.js";import"./_commonjsHelpers-de833af9.js";import"./index-9c2d1831.js";import"./inheritsLoose-9eefaa95.js";import"./assertThisInitialized-081f9914.js";import"./index-4733a090.js";import"./_baseIsEqual-976d9d82.js";import"./uniq-944679ca.js";import"./index-356e4a49.js";import"./index-f641b98f.js";import"./clickable-8a7f284d.js";import"./index-8d47fad6.js";import"./icon-a4f17d53.js";import"./icon-assets-a0b49981.js";import"./strut-c6011196.js";import"./search-field-66099b8d.js";import"./icon-button-297fafd1.js";import"./labeled-text-field-d77d5301.js";import"./radio-0fc824b1.js";import"./with-action-scheduler-7e779422.js";import"./maybe-get-portal-mounted-modal-host-element-fbe11998.js";import"./one-pane-dialog-da34165b.js";const c=()=>n(b,{children:[e(h,{tag:"label",id:"label-for-single-select",htmlFor:"unique-single-select",children:"Associated label element"}),n(r,{"aria-labelledby":"label-for-single-select",id:"unique-single-select",placeholder:"Accessible SingleSelect",selectedValue:"one",children:[e(o,{label:"First element","aria-label":"First element, selected",value:"one"}),e(o,{label:"Second element","aria-label":"Second element, unselelected",value:"two"})]})]});function a(i){const t=Object.assign({h1:"h1",p:"p",code:"code"},s(),i.components);return n(g,{children:[e(d,{title:"Dropdown / SingleSelect / Accessibility",component:r,parameters:{previewTabs:{canvas:{hidden:!0}},viewMode:"docs",chromatic:{disableSnapshot:!0}}}),`
`,`
`,e(t.h1,{id:"accessibility",children:"Accessibility"}),`
`,n(t.p,{children:["If you need to associate this component with another element (e.g. ",e(t.code,{children:"<label>"}),`),
make sure to pass the `,e(t.code,{children:"aria-labelledby"})," and/or ",e(t.code,{children:"id"})," props to the ",e(t.code,{children:"SingleSelect"}),` component.
This way, the `,e(t.code,{children:"opener"}),` will receive this value and it will associate both
elements.`]}),`
`,n(t.p,{children:[`Also, if you need screen readers to understand any relevant information on every
option item, you can use `,e(t.code,{children:"aria-label"}),` on each item. e.g. You can use it to let
screen readers know the current selected/unselected status of the item when it
receives focus.`]}),`
`,e(p,{children:e(u,{name:"Using aria attributes",children:c.bind({})})})]})}function S(i={}){const{wrapper:t}=Object.assign({},s(),i.components);return t?e(t,{...i,children:e(a,{...i})}):a(i)}const m=c.bind({});m.storyName="Using aria attributes";m.parameters={storySource:{source:`() => <View>
        <LabelLarge tag="label" id="label-for-single-select" htmlFor="unique-single-select">
            Associated label element
        </LabelLarge>
        <SingleSelect aria-labelledby="label-for-single-select" id="unique-single-select" placeholder="Accessible SingleSelect" selectedValue="one">
            <OptionItem label="First element" aria-label="First element, selected" value="one" />
            <OptionItem label="Second element" aria-label="Second element, unselelected" value="two" />
        </SingleSelect>
    </View>`}};const l={title:"Dropdown / SingleSelect / Accessibility",parameters:{previewTabs:{canvas:{hidden:!0}},viewMode:"docs",chromatic:{disableSnapshot:!0}},component:r,tags:["stories-mdx"],includeStories:["usingAriaAttributes"]};l.parameters=l.parameters||{};l.parameters.docs={...l.parameters.docs||{},page:S};const R=["SingleSelectAccessibility","usingAriaAttributes"];export{c as SingleSelectAccessibility,R as __namedExportsOrder,l as default,m as usingAriaAttributes};
//# sourceMappingURL=single-select.accessibility.stories-2146a271.js.map
