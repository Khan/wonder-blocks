import{M as h,C as p,b as u}from"./index-35e12253.js";import{V as d}from"./render-state-root-891c0d56.js";import{B as t,a as i}from"./breadcrumbs-item-25bba318.js";import"./index-9f32f44c.js";import{L as s}from"./link-64b6fd31.js";import{a as e,j as a,F as b}from"./jsx-runtime-309e447d.js";import{u as m}from"./index-506666d7.js";import"./iframe-97aa1d91.js";import"../sb-preview/runtime.js";import"./chunk-6P7RB4HF-938b085e.js";import"./index-d475d2ea.js";import"./_commonjsHelpers-de833af9.js";import"./index-9c2d1831.js";import"./inheritsLoose-9eefaa95.js";import"./assertThisInitialized-081f9914.js";import"./index-4733a090.js";import"./_baseIsEqual-976d9d82.js";import"./uniq-944679ca.js";import"./index-356e4a49.js";import"./index-f641b98f.js";import"./clickable-8a7f284d.js";import"./index-8d47fad6.js";import"./icon-a4f17d53.js";function o(n){const r=Object.assign({h2:"h2",h3:"h3",p:"p",code:"code",a:"a"},m(),n.components);return a(b,{children:[e(h,{title:"Breadcrumbs / Accessibility",component:t,parameters:{previewTabs:{canvas:{hidden:!0}},viewMode:"docs",chromatic:{disableSnapshot:!0}}}),`
`,e(r.h2,{id:"accessibility",children:"Accessibility"}),`
`,e(r.h3,{id:"labeling",children:"Labeling"}),`
`,a(r.p,{children:[e(r.code,{children:"Breadcrumbs"})," has an ",e(r.code,{children:"ariaLabel"}),` prop that sets the accessible name on the
the component. By default, this is "Breadcrumbs" as per recommended guidelines.`]}),`
`,e(r.p,{children:"This is an example of a component with an accessible label:"}),`
`,e(p,{children:e(u,{name:"Labeling",children:e(d,{children:a(t,{ariaLabel:"Navigation Menu",children:[e(i,{children:e(s,{href:"",children:"Course"})}),e(i,{children:e(s,{href:"",children:"Unit"})}),e(i,{children:"Lesson"})]})})})}),`
`,e(r.h3,{id:"nav-role",children:"Nav Role"}),`
`,a(r.p,{children:["Breadcrumbs are ",e(r.code,{children:"nav"}),` elements. They show up as navigation landmarks to
screen readers.`]}),`
`,e(r.h3,{id:"current-page",children:"Current Page"}),`
`,a(r.p,{children:[`Guidelines state that the last link in a list of breadcrumbs (the last
`,e(r.code,{children:"BreadcrumbsItem"}),") should have the attribute ",e(r.code,{children:'aria-current="page"'}),` to
indicate that it represents the current page. The implementation already
sets `,e(r.code,{children:'aria-current="page'}),` to the last element, so developers do not need
to add it themeselves.`]}),`
`,e(r.h3,{id:"references",children:"References"}),`
`,e(r.p,{children:e(r.a,{href:"https://www.w3.org/TR/wai-aria-practices-1.1/examples/breadcrumb/index.html",target:"_blank",rel:"nofollow noopener noreferrer",children:"W3C Breadcrumbs Guidelines"})})]})}function g(n={}){const{wrapper:r}=Object.assign({},m(),n.components);return r?e(r,{...n,children:e(o,{...n})}):o(n)}const l=()=>e(d,{children:a(t,{ariaLabel:"Navigation Menu",children:[e(i,{children:e(s,{href:"",children:"Course"})}),e(i,{children:e(s,{href:"",children:"Unit"})}),e(i,{children:"Lesson"})]})});l.storyName="Labeling";l.parameters={storySource:{source:'<View><Breadcrumbs ariaLabel="Navigation Menu"><BreadcrumbsItem><Link href="">{"Course"}</Link></BreadcrumbsItem><BreadcrumbsItem><Link href="">{"Unit"}</Link></BreadcrumbsItem><BreadcrumbsItem>{"Lesson"}</BreadcrumbsItem></Breadcrumbs></View>'}};const c={title:"Breadcrumbs / Accessibility",parameters:{previewTabs:{canvas:{hidden:!0}},viewMode:"docs",chromatic:{disableSnapshot:!0}},component:t,tags:["stories-mdx"],includeStories:["labeling"]};c.parameters=c.parameters||{};c.parameters.docs={...c.parameters.docs||{},page:g};const F=["labeling"];export{F as __namedExportsOrder,c as default,l as labeling};
//# sourceMappingURL=accessibility.stories-7150ad6b.js.map
