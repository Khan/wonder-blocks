/*! For license information please see wonder-blocks-breadcrumbs-accessibility-stories-mdx.c0b36ff6.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunkwonder_blocks=self.webpackChunkwonder_blocks||[]).push([[5821],{"./node_modules/@mdx-js/react/lib/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{NF:()=>withMDXComponents,Zo:()=>MDXProvider,ah:()=>useMDXComponents,pC:()=>MDXContext});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const MDXContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext({});function withMDXComponents(Component){return function boundMDXComponent(props){const allComponents=useMDXComponents(props.components);return react__WEBPACK_IMPORTED_MODULE_0__.createElement(Component,{...props,allComponents})}}function useMDXComponents(components){const contextComponents=react__WEBPACK_IMPORTED_MODULE_0__.useContext(MDXContext);return react__WEBPACK_IMPORTED_MODULE_0__.useMemo((()=>"function"==typeof components?components(contextComponents):{...contextComponents,...components}),[contextComponents,components])}const emptyObject={};function MDXProvider({components,children,disableParentContext}){let allComponents;return allComponents=disableParentContext?"function"==typeof components?components({}):components||emptyObject:useMDXComponents(components),react__WEBPACK_IMPORTED_MODULE_0__.createElement(MDXContext.Provider,{value:allComponents},children)}},"./packages/wonder-blocks-breadcrumbs/dist/es/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{B:()=>BreadcrumbsItem,O:()=>Breadcrumbs});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),aphrodite__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/aphrodite/lib/index.js"),_khanacademy_wonder_blocks_core__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./packages/wonder-blocks-core/dist/es/index.js"),_khanacademy_wonder_blocks_spacing__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./packages/wonder-blocks-spacing/dist/es/index.js");function _extends(){return _extends=Object.assign?Object.assign.bind():function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target},_extends.apply(this,arguments)}function _objectWithoutPropertiesLoose(source,excluded){if(null==source)return{};var key,i,target={},sourceKeys=Object.keys(source);for(i=0;i<sourceKeys.length;i++)key=sourceKeys[i],excluded.indexOf(key)>=0||(target[key]=source[key]);return target}const _excluded$1=["aria-label","children","testId"],StyledList=(0,_khanacademy_wonder_blocks_core__WEBPACK_IMPORTED_MODULE_2__.cu)("ol"),Breadcrumbs=react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(((props,ref)=>{const{"aria-label":ariaLabel="Breadcrumbs",children,testId}=props,otherProps=_objectWithoutPropertiesLoose(props,_excluded$1),lastChildIndex=react__WEBPACK_IMPORTED_MODULE_0__.Children.count(children)-1;return react__WEBPACK_IMPORTED_MODULE_0__.createElement("nav",_extends({},otherProps,{"aria-label":ariaLabel,"data-test-id":testId,ref}),react__WEBPACK_IMPORTED_MODULE_0__.createElement(StyledList,{style:styles$1.container},react__WEBPACK_IMPORTED_MODULE_0__.Children.map(children,((item,index)=>{const isLastChild=index===lastChildIndex;return react__WEBPACK_IMPORTED_MODULE_0__.cloneElement(item,_extends({},item.props,{showSeparator:!isLastChild,"aria-current":isLastChild?"page":void 0}))}))))})),styles$1=aphrodite__WEBPACK_IMPORTED_MODULE_1__.StyleSheet.create({container:{display:"flex",listStyle:"none",margin:0,padding:0,overflow:"hidden"}}),_excluded=["children","showSeparator","testId"],StyledListItem=(0,_khanacademy_wonder_blocks_core__WEBPACK_IMPORTED_MODULE_2__.cu)("li"),StyledSvg=(0,_khanacademy_wonder_blocks_core__WEBPACK_IMPORTED_MODULE_2__.cu)("svg"),BreadcrumbsItem=react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(((props,ref)=>{const{children,showSeparator,testId}=props,otherProps=_objectWithoutPropertiesLoose(props,_excluded);return react__WEBPACK_IMPORTED_MODULE_0__.createElement(StyledListItem,_extends({},otherProps,{style:styles.item,"data-test-id":testId,ref}),children,showSeparator&&react__WEBPACK_IMPORTED_MODULE_0__.createElement(StyledSvg,{style:styles.separator,width:16,height:16,viewBox:"0 0 16 16","aria-hidden":!0},react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle",{cx:"8",cy:"9",r:"1.5"})))})),styles=aphrodite__WEBPACK_IMPORTED_MODULE_1__.StyleSheet.create({item:{display:"flex",alignItems:"center",justifyContent:"center",marginRight:_khanacademy_wonder_blocks_spacing__WEBPACK_IMPORTED_MODULE_3__.Z.xxxSmall_4},separator:{marginLeft:_khanacademy_wonder_blocks_spacing__WEBPACK_IMPORTED_MODULE_3__.Z.xxxSmall_4}});Breadcrumbs.__docgenInfo={description:"",methods:[],displayName:"Breadcrumbs"},BreadcrumbsItem.__docgenInfo={description:"",methods:[],displayName:"BreadcrumbsItem"}},"./__docs__/wonder-blocks-breadcrumbs/accessibility.stories.mdx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>__WEBPACK_DEFAULT_EXPORT__,labeling:()=>labeling});__webpack_require__("./node_modules/react/index.js");var _storybook_addon_essentials_docs_mdx_react_shim__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/@mdx-js/react/lib/index.js"),_storybook_blocks__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./node_modules/@storybook/blocks/dist/index.mjs"),_khanacademy_wonder_blocks_breadcrumbs__WEBPACK_IMPORTED_MODULE_2__=(__webpack_require__("./node_modules/aphrodite/lib/index.js"),__webpack_require__("./packages/wonder-blocks-breadcrumbs/dist/es/index.js")),_khanacademy_wonder_blocks_core__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./packages/wonder-blocks-core/dist/es/index.js"),_khanacademy_wonder_blocks_link__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./packages/wonder-blocks-link/dist/es/index.js"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/react/jsx-runtime.js");function _createMdxContent(props){const _components=Object.assign({h2:"h2",h3:"h3",p:"p",code:"code",a:"a"},(0,_storybook_addon_essentials_docs_mdx_react_shim__WEBPACK_IMPORTED_MODULE_6__.ah)(),props.components);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_7__.h_,{title:"Breadcrumbs / Accessibility",component:_khanacademy_wonder_blocks_breadcrumbs__WEBPACK_IMPORTED_MODULE_2__.O,parameters:{previewTabs:{canvas:{hidden:!0}},viewMode:"docs",chromatic:{disableSnapshot:!0}}}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components.h2,{id:"accessibility",children:"Accessibility"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components.h3,{id:"labeling",children:"Labeling"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_components.p,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components.code,{children:"Breadcrumbs"})," has an ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components.code,{children:"ariaLabel"}),' prop that sets the accessible name on the\nthe component. By default, this is "Breadcrumbs" as per recommended guidelines.']}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components.p,{children:"This is an example of a component with an accessible label:"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_7__.Xz,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_7__.oG,{name:"Labeling",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_khanacademy_wonder_blocks_core__WEBPACK_IMPORTED_MODULE_3__.G7,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_khanacademy_wonder_blocks_breadcrumbs__WEBPACK_IMPORTED_MODULE_2__.O,{ariaLabel:"Navigation Menu",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_khanacademy_wonder_blocks_breadcrumbs__WEBPACK_IMPORTED_MODULE_2__.B,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_khanacademy_wonder_blocks_link__WEBPACK_IMPORTED_MODULE_4__.Z,{href:"",children:"Course"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_khanacademy_wonder_blocks_breadcrumbs__WEBPACK_IMPORTED_MODULE_2__.B,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_khanacademy_wonder_blocks_link__WEBPACK_IMPORTED_MODULE_4__.Z,{href:"",children:"Unit"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_khanacademy_wonder_blocks_breadcrumbs__WEBPACK_IMPORTED_MODULE_2__.B,{children:"Lesson"})]})})})}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components.h3,{id:"nav-role",children:"Nav Role"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_components.p,{children:["Breadcrumbs are ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components.code,{children:"nav"})," elements. They show up as navigation landmarks to\nscreen readers."]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components.h3,{id:"current-page",children:"Current Page"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_components.p,{children:["Guidelines state that the last link in a list of breadcrumbs (the last\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components.code,{children:"BreadcrumbsItem"}),") should have the attribute ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components.code,{children:'aria-current="page"'})," to\nindicate that it represents the current page. The implementation already\nsets ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components.code,{children:'aria-current="page'})," to the last element, so developers do not need\nto add it themeselves."]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components.h3,{id:"references",children:"References"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components.p,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components.a,{href:"https://www.w3.org/TR/wai-aria-practices-1.1/examples/breadcrumb/index.html",target:"_blank",rel:"nofollow noopener noreferrer",children:"W3C Breadcrumbs Guidelines"})})]})}const labeling=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_khanacademy_wonder_blocks_core__WEBPACK_IMPORTED_MODULE_3__.G7,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_khanacademy_wonder_blocks_breadcrumbs__WEBPACK_IMPORTED_MODULE_2__.O,{ariaLabel:"Navigation Menu",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_khanacademy_wonder_blocks_breadcrumbs__WEBPACK_IMPORTED_MODULE_2__.B,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_khanacademy_wonder_blocks_link__WEBPACK_IMPORTED_MODULE_4__.Z,{href:"",children:"Course"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_khanacademy_wonder_blocks_breadcrumbs__WEBPACK_IMPORTED_MODULE_2__.B,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_khanacademy_wonder_blocks_link__WEBPACK_IMPORTED_MODULE_4__.Z,{href:"",children:"Unit"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_khanacademy_wonder_blocks_breadcrumbs__WEBPACK_IMPORTED_MODULE_2__.B,{children:"Lesson"})]})});labeling.storyName="Labeling",labeling.parameters={storySource:{source:'<View><Breadcrumbs ariaLabel="Navigation Menu"><BreadcrumbsItem><Link href="">{"Course"}</Link></BreadcrumbsItem><BreadcrumbsItem><Link href="">{"Unit"}</Link></BreadcrumbsItem><BreadcrumbsItem>{"Lesson"}</BreadcrumbsItem></Breadcrumbs></View>'}};const componentMeta={title:"Breadcrumbs / Accessibility",parameters:{previewTabs:{canvas:{hidden:!0}},viewMode:"docs",chromatic:{disableSnapshot:!0}},component:_khanacademy_wonder_blocks_breadcrumbs__WEBPACK_IMPORTED_MODULE_2__.O,tags:["stories-mdx"],includeStories:["labeling"]};componentMeta.parameters=componentMeta.parameters||{},componentMeta.parameters.docs={...componentMeta.parameters.docs||{},page:function MDXContent(props={}){const{wrapper:MDXLayout}=Object.assign({},(0,_storybook_addon_essentials_docs_mdx_react_shim__WEBPACK_IMPORTED_MODULE_6__.ah)(),props.components);return MDXLayout?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(MDXLayout,{...props,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_createMdxContent,{...props})}):_createMdxContent(props)}};const __WEBPACK_DEFAULT_EXPORT__=componentMeta},"./node_modules/react/cjs/react-jsx-runtime.production.min.js":(__unused_webpack_module,exports,__webpack_require__)=>{var f=__webpack_require__("./node_modules/react/index.js"),g=60103;if(exports.Fragment=60107,"function"==typeof Symbol&&Symbol.for){var h=Symbol.for;g=h("react.element"),exports.Fragment=h("react.fragment")}var m=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,n=Object.prototype.hasOwnProperty,p={key:!0,ref:!0,__self:!0,__source:!0};function q(c,a,k){var b,d={},e=null,l=null;for(b in void 0!==k&&(e=""+k),void 0!==a.key&&(e=""+a.key),void 0!==a.ref&&(l=a.ref),a)n.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps)void 0===d[b]&&(d[b]=a[b]);return{$$typeof:g,type:c,key:e,ref:l,props:d,_owner:m.current}}exports.jsx=q,exports.jsxs=q},"./node_modules/react/jsx-runtime.js":(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=__webpack_require__("./node_modules/react/cjs/react-jsx-runtime.production.min.js")}}]);