import{a as e,j as t}from"./jsx-runtime-309e447d.js";import{V as j,l as I}from"./render-state-root-891c0d56.js";import{C as m,S as p}from"./index-f641b98f.js";import"./index-9f32f44c.js";import{a as o,B as _}from"./footnote-761d2bcc.js";import{C as s}from"./button-b2794e32.js";import{C as T}from"./component-info-cedbe096.js";import"./_commonjsHelpers-de833af9.js";import"./clickable-8a7f284d.js";import"./inheritsLoose-9eefaa95.js";import"./index-8d47fad6.js";import"./icon-a4f17d53.js";const W="@khanacademy/wonder-blocks-progress-spinner",E="2.0.14",R="v1",$={access:"public"},N="",V="dist/index.js",H="dist/es/index.js",M="dist/index.d.ts",O={test:'echo "Error: no test specified" && exit 1'},P="",q="MIT",A={"@babel/runtime":"^7.18.6","@khanacademy/wonder-blocks-color":"^2.0.1","@khanacademy/wonder-blocks-core":"^5.3.0"},F={aphrodite:"^1.2.5",react:"16.14.0"},G={"wb-dev-build-settings":"^0.9.7"},u={name:W,version:E,design:R,publishConfig:$,description:N,main:V,module:H,types:M,scripts:O,author:P,license:q,dependencies:A,peerDependencies:F,devDependencies:G},ie={title:"ProgressSpinner/CircularSpinner",component:s,parameters:{componentSubtitle:e(T,{name:u.name,version:u.version}),docs:{description:{component:null},source:{excludeDecorators:!0}}},decorators:[c=>e(j,{style:r.example,children:e(c,{})})]},d={},n=()=>e("table",{children:t("tbody",{children:[t("tr",{children:[e("th",{children:e(o,{children:"xsmall"})}),e("th",{children:e(o,{children:"small"})}),e("th",{children:e(o,{children:"medium"})}),e("th",{children:e(o,{children:"large"})})]}),t("tr",{children:[e("td",{children:e(s,{size:"xsmall",style:r.distanced})}),e("td",{children:e(s,{size:"small",style:r.distanced})}),e("td",{children:e(s,{size:"medium",style:r.distanced})}),e("td",{children:e(s,{size:"large",style:r.distanced})})]}),t("tr",{className:I.css(r.darkBackground),children:[e("td",{children:e(s,{light:!0,size:"xsmall",style:r.distanced})}),e("td",{children:e(s,{light:!0,size:"small",style:r.distanced})}),e("td",{children:e(s,{light:!0,size:"medium",style:r.distanced})}),e("td",{children:e(s,{light:!0,size:"large",style:r.distanced})})]})]})});n.parameters={docs:{description:{story:'The available sizes for progress spinner are\n            `"xsmall"`, `"small"`, `"medium"`, and `"large"`.\n            This is set with the `size` prop.'}}};const i=()=>e(s,{light:!0});i.parameters={backgrounds:{default:"darkBlue"},docs:{description:{story:"This is a progress spinner with its `light`\n            prop set to true. This is for use on dark backgrounds."}}};const a=()=>t(_,{children:["Inline inside"," ",e(s,{size:"xsmall",style:{display:"inline"}})," some text."]});a.parameters={docs:{description:{story:"Circular spinners also work inline."}}};const l=()=>{const c={border:`solid 5px ${m.teal}`,borderRadius:"50%",backgroundColor:m.offWhite};return e(s,{style:c})};l.parameters={docs:{description:{story:"`<CircularSpinner>` has `style` prop\n            that can be used to apply styles to the spinner's container.\n            Here, it has been given a style that includes `border` that\n            is `solid 5px ${Color.teal}` as well as a `borderRadius`\n            of `50%`."}}};const r=I.StyleSheet.create({darkBackground:{background:m.darkBlue,padding:p.xLarge_32,width:"100%",alignItems:"center",justifyContent:"center"},distanced:{margin:p.large_24},example:{alignItems:"center",justifyContent:"center"},row:{flexDirection:"row",marginBottom:p.xLarge_32}});var h,g,y;d.parameters={...d.parameters,docs:{...(h=d.parameters)==null?void 0:h.docs,source:{originalSource:"{}",...(y=(g=d.parameters)==null?void 0:g.docs)==null?void 0:y.source}}};var b,S,C;n.parameters={...n.parameters,docs:{...(b=n.parameters)==null?void 0:b.docs,source:{originalSource:`() => <table>
        <tbody>
            <tr>
                <th>
                    <LabelLarge>xsmall</LabelLarge>
                </th>
                <th>
                    <LabelLarge>small</LabelLarge>
                </th>
                <th>
                    <LabelLarge>medium</LabelLarge>
                </th>
                <th>
                    <LabelLarge>large</LabelLarge>
                </th>
            </tr>
            <tr>
                <td>
                    <CircularSpinner size={"xsmall"} style={styles.distanced} />
                </td>
                <td>
                    <CircularSpinner size={"small"} style={styles.distanced} />
                </td>
                <td>
                    <CircularSpinner size={"medium"} style={styles.distanced} />
                </td>
                <td>
                    <CircularSpinner size={"large"} style={styles.distanced} />
                </td>
            </tr>
            <tr className={css(styles.darkBackground)}>
                <td>
                    <CircularSpinner light={true} size={"xsmall"} style={styles.distanced} />
                </td>
                <td>
                    <CircularSpinner light={true} size={"small"} style={styles.distanced} />
                </td>
                <td>
                    <CircularSpinner light={true} size={"medium"} style={styles.distanced} />
                </td>
                <td>
                    <CircularSpinner light={true} size={"large"} style={styles.distanced} />
                </td>
            </tr>
        </tbody>
    </table>`,...(C=(S=n.parameters)==null?void 0:S.docs)==null?void 0:C.source}}};var x,f,k;i.parameters={...i.parameters,docs:{...(x=i.parameters)==null?void 0:x.docs,source:{originalSource:"() => <CircularSpinner light={true} />",...(k=(f=i.parameters)==null?void 0:f.docs)==null?void 0:k.source}}};var z,L,w;a.parameters={...a.parameters,docs:{...(z=a.parameters)==null?void 0:z.docs,source:{originalSource:`() => <Body>
        Inline inside{" "}
        <CircularSpinner size="xsmall" style={{
    display: "inline"
  }} /> some text.
    </Body>`,...(w=(L=a.parameters)==null?void 0:L.docs)==null?void 0:w.source}}};var v,B,D;l.parameters={...l.parameters,docs:{...(v=l.parameters)==null?void 0:v.docs,source:{originalSource:`() => {
  const spinnerStyle = ({
    border: \`solid 5px \${Color.teal}\`,
    borderRadius: "50%",
    backgroundColor: Color.offWhite
  } as const);
  return <CircularSpinner style={spinnerStyle} />;
}`,...(D=(B=l.parameters)==null?void 0:B.docs)==null?void 0:D.source}}};const ae=["Default","Sizes","Light","Inline","WithStyle"];export{d as Default,a as Inline,i as Light,n as Sizes,l as WithStyle,ae as __namedExportsOrder,ie as default};
//# sourceMappingURL=circular-spinner.stories-9ba8942c.js.map
