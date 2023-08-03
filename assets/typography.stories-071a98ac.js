import{a as e,j as o}from"./jsx-runtime-309e447d.js";import{r as de}from"./index-9f32f44c.js";import{V as r,l as he}from"./render-state-root-891c0d56.js";import{C as le,S as me}from"./index-f641b98f.js";import{S as pe,O as ye}from"./multi-select-4619a451.js";import{T as i,b as S,e as b,H as L,f as B,g as x,h as T,i as l,B as s,a as f,c as H,L as M,d as w,j as F,C as k,F as q}from"./footnote-761d2bcc.js";import{C as ge}from"./component-info-cedbe096.js";import"./_commonjsHelpers-de833af9.js";import"./index-9c2d1831.js";import"./clickable-8a7f284d.js";import"./inheritsLoose-9eefaa95.js";import"./index-8d47fad6.js";import"./icon-a4f17d53.js";import"./icon-assets-a0b49981.js";import"./strut-c6011196.js";import"./search-field-66099b8d.js";import"./icon-button-297fafd1.js";import"./labeled-text-field-d77d5301.js";import"./radio-0fc824b1.js";import"./with-action-scheduler-7e779422.js";import"./assertThisInitialized-081f9914.js";import"./maybe-get-portal-mounted-modal-host-element-fbe11998.js";import"./one-pane-dialog-da34165b.js";import"./button-b2794e32.js";const ue="@khanacademy/wonder-blocks-typography",Se="2.1.0",be="v2",Le={access:"public"},Be="Typography components for Wonder Blocks design system.",xe="dist/index.js",Te="dist/es/index.js",fe="dist/index.d.ts",He={test:'echo "Error: no test specified" && exit 1'},Me="",we="MIT",Fe={"@babel/runtime":"^7.18.6","@khanacademy/wonder-blocks-core":"^5.3.0"},ke={aphrodite:"^1.2.5",react:"16.14.0"},qe={"wb-dev-build-settings":"^0.9.7"},v={name:ue,version:Se,design:be,publishConfig:Le,description:Be,main:xe,module:Te,types:fe,scripts:He,author:Me,license:we,dependencies:Fe,peerDependencies:ke,devDependencies:qe},De={children:{control:{type:"text"},description:"Text to appear with the specified typography styles.",table:{type:{summary:"React.Node"}},type:{required:!1}},style:{control:{type:"object"},description:"Optional custom styles.",table:{type:{summary:"StyleType"}},type:{required:!1}},testId:{control:{type:"text"},description:"Test ID used for e2e testing.",table:{type:{summary:"string"}},type:{required:!1}},id:{control:{type:"text"},description:"Unique identifier.",table:{type:{summary:"string"}},type:{required:!1}}},Ce=`Typography. \`wonder-blocks-typography\`
provides a set of standardized components for displaying text in a consistent
way. This includes components for headings, paragraphs, and text
labels.


 ### Usage

\`\`\`jsx
import {Body, Title} from "@khanacademy/wonder-blocks-typography";

<Title>Title: Hello, world!</Title>
<Body>This is just a regular paragraph</Body>
\`\`\`
`,nt={title:"Typography",parameters:{componentSubtitle:e(ge,{name:v.name,version:v.version}),docs:{description:{component:Ce},source:{excludeDecorators:!0}}},argTypes:De},K={render:t=>e(i,{...t}),args:{children:"This is a Title typography element",id:"example-title"}},c=()=>o(r,{children:[e(i,{children:"Title"}),e(S,{children:"HeadingLarge"}),e(b,{children:"HeadingMedium"}),e(L,{children:"HeadingSmall"}),e(B,{children:"HeadingXSmall"}),e(x,{children:"BodySerifBlock"}),e(T,{children:"BodySerif"}),e(l,{children:"BodyMonospace"}),e(s,{children:"Body"}),e(f,{children:"LabelLarge"}),e(H,{children:"LabelMedium"}),e(M,{children:"LabelSmall"}),e(w,{children:"LabelXSmall"}),e(F,{children:"Tagline"}),e(k,{children:"Caption"}),e(q,{children:"Footnote"})]});c.parameters={docs:{description:{story:`These are all the available typography elements
            with their names written out in their respective styles.`}}};const d=()=>{const t=he.StyleSheet.create({blueText:{color:le.blue}});return e(i,{style:t.blueText,children:"Blue Title"})};d.parameters={docs:{description:{story:"You can change the color of text with the `style` prop."}}};const h=()=>o(r,{children:[e(i,{children:"Для каждого ученика, независимо от возраста. Реальные результаты!"}),e(S,{children:"Для каждого ученика, независимо от возраста. Реальные результаты!"}),e(b,{children:"Для каждого ученика, независимо от возраста. Реальные результаты!"}),e(L,{children:"Для каждого ученика, независимо от возраста. Реальные результаты!"}),e(B,{children:"Для каждого ученика, независимо от возраста. Реальные результаты!"}),e(x,{children:"Для каждого ученика, независимо от возраста. Реальные результаты!"}),e(T,{children:"Для каждого ученика, независимо от возраста. Реальные результаты!"}),e(l,{children:"Для каждого ученика, независимо от возраста. Реальные результаты!"}),e(s,{children:"Для каждого ученика, независимо от возраста. Реальные результаты!"}),e(f,{children:"Для каждого ученика, независимо от возраста. Реальные результаты!"}),e(H,{children:"Для каждого ученика, независимо от возраста. Реальные результаты!"}),e(M,{children:"Для каждого ученика, независимо от возраста. Реальные результаты!"}),e(w,{children:"Для каждого ученика, независимо от возраста. Реальные результаты!"}),e(F,{children:"Для каждого ученика, независимо от возраста. Реальные результаты!"}),e(k,{children:"Для каждого ученика, независимо от возраста. Реальные результаты!"}),e(q,{children:"Для каждого ученика, независимо от возраста. Реальные результаты!"})]});h.parameters={docs:{description:{story:`Lato is used for Latin and Cyrillic languages.
            This is a example where we use Lato for Russian.`}}};const m=()=>o(r,{children:[e(i,{children:"Dành cho mọi học sinh, mọi lớp học. Kết quả thực tế."}),e(S,{children:"Dành cho mọi học sinh, mọi lớp học. Kết quả thực tế."}),e(b,{children:"Dành cho mọi học sinh, mọi lớp học. Kết quả thực tế."}),e(L,{children:"Dành cho mọi học sinh, mọi lớp học. Kết quả thực tế."}),e(B,{children:"Dành cho mọi học sinh, mọi lớp học. Kết quả thực tế."}),e(x,{children:"Dành cho mọi học sinh, mọi lớp học. Kết quả thực tế."}),e(T,{children:"Dành cho mọi học sinh, mọi lớp học. Kết quả thực tế."}),e(l,{children:"Dành cho mọi học sinh, mọi lớp học. Kết quả thực tế."}),e(s,{children:"Dành cho mọi học sinh, mọi lớp học. Kết quả thực tế."}),e(f,{children:"Dành cho mọi học sinh, mọi lớp học. Kết quả thực tế."}),e(H,{children:"Dành cho mọi học sinh, mọi lớp học. Kết quả thực tế."}),e(M,{children:"Dành cho mọi học sinh, mọi lớp học. Kết quả thực tế."}),e(w,{children:"Dành cho mọi học sinh, mọi lớp học. Kết quả thực tế."}),e(F,{children:"Dành cho mọi học sinh, mọi lớp học. Kết quả thực tế."}),e(k,{children:"Dành cho mọi học sinh, mọi lớp học. Kết quả thực tế."}),e(q,{children:"Dành cho mọi học sinh, mọi lớp học. Kết quả thực tế."})]});m.parameters={docs:{description:{story:`This is another example where we use Lato
            latin for Vietnamese. In this specific case, we also use
            the extended glyphs so we can add full support to Vietnamese
            using this font.`}}};const p=()=>{const t={Arabic:{text:"مرحبا",dir:"rtl"},Armenian:{text:"Բարեւ"},Greek:{text:"γεια σας"},Hebrew:{text:"שלום",dir:"rtl"}},[D,se]=de.useState("Arabic"),{text:n,dir:a}=t[D];return o(r,{children:[e(pe,{"aria-labelledby":"language-selector",id:"unique-language-selector",placeholder:"Select language",onChange:C=>se(C),selectedValue:D,children:Object.keys(t).map((C,ce)=>e(ye,{label:C,value:C},ce))}),o(r,{children:[e(i,{dir:a,children:n}),e(S,{dir:a,children:n}),e(b,{dir:a,children:n}),e(L,{dir:a,children:n}),e(B,{dir:a,children:n}),e(x,{dir:a,children:n}),e(T,{dir:a,children:n}),e(l,{dir:a,children:n}),e(s,{dir:a,children:n}),e(f,{dir:a,children:n}),e(H,{dir:a,children:n}),e(M,{dir:a,children:n}),e(w,{dir:a,children:n}),e(F,{dir:a,children:n}),e(k,{dir:a,children:n}),e(q,{dir:a,children:n})]})]})};p.parameters={docs:{description:{story:"The Noto font is used for non-Latin languages."}}};const y=()=>e(({children:D})=>e(l,{children:D}),{children:'const str = "Hello, world!"'});y.parameters={docs:{description:{story:"One example of using the `BodyMonospace`\n            typography component is to create a `Code` component for\n            rendering pre-formatted code blocks."}}};const g=()=>e(s,{children:`This is an example of a long paragraph.
        Khan Academy offers practice exercises, instructional videos,
        and a personalized learning dashboard that empower learners
        to study at their own pace in and outside of the classroom.
        We tackle math, science, computing, history, art history, economics,
        and more, including K-14 and test preparation (SAT, Praxis, LSAT)
        content. We focus on skill mastery to help learners establish
        strong foundations, so there's no limit to what they can learn next!`});g.parameters={docs:{description:{story:"The `Body` typography component is usually used\n            for paragraphs and other body text."}}};const u=()=>{const t={outline:`1px solid ${le.offBlack}`,marginBottom:me.small_12};return o(r,{children:[e(i,{style:t,children:"Title"}),e(S,{style:t,children:"HeadingLarge"}),e(b,{style:t,children:"HeadingMedium"}),e(L,{style:t,children:"HeadingSmall"}),e(B,{style:t,children:"HeadingXSmall"}),e(x,{style:t,children:"BodySerifBlock"}),e(T,{style:t,children:"BodySerif"}),e(l,{style:t,children:"BodyMonospace"}),e(s,{style:t,children:"Body"}),e(f,{style:t,children:"LabelLarge"}),e(H,{style:t,children:"LabelMedium"}),e(M,{style:t,children:"LabelSmall"}),e(w,{style:t,children:"LabelXSmall"}),e(F,{style:t,children:"Tagline"}),e(k,{style:t,children:"Caption"}),e(q,{style:t,children:"Footnote"})]})};u.parameters={docs:{description:{story:`This is a visualization of the line height
            for each typography element.`}}};var X,E,V;K.parameters={...K.parameters,docs:{...(X=K.parameters)==null?void 0:X.docs,source:{originalSource:`{
  render: args => <Title {...args} />,
  args: {
    children: "This is a Title typography element",
    id: "example-title"
  }
}`,...(V=(E=K.parameters)==null?void 0:E.docs)==null?void 0:V.source}}};var I,N,A;c.parameters={...c.parameters,docs:{...(I=c.parameters)==null?void 0:I.docs,source:{originalSource:`() => <View>
        <Title>Title</Title>
        <HeadingLarge>HeadingLarge</HeadingLarge>
        <HeadingMedium>HeadingMedium</HeadingMedium>
        <HeadingSmall>HeadingSmall</HeadingSmall>
        <HeadingXSmall>HeadingXSmall</HeadingXSmall>
        <BodySerifBlock>BodySerifBlock</BodySerifBlock>
        <BodySerif>BodySerif</BodySerif>
        <BodyMonospace>BodyMonospace</BodyMonospace>
        <Body>Body</Body>
        <LabelLarge>LabelLarge</LabelLarge>
        <LabelMedium>LabelMedium</LabelMedium>
        <LabelSmall>LabelSmall</LabelSmall>
        <LabelXSmall>LabelXSmall</LabelXSmall>
        <Tagline>Tagline</Tagline>
        <Caption>Caption</Caption>
        <Footnote>Footnote</Footnote>
    </View>`,...(A=(N=c.parameters)==null?void 0:N.docs)==null?void 0:A.source}}};var j,P,O;d.parameters={...d.parameters,docs:{...(j=d.parameters)==null?void 0:j.docs,source:{originalSource:`() => {
  const styles = StyleSheet.create({
    blueText: {
      color: Color.blue
    }
  });
  return <Title style={styles.blueText}>Blue Title</Title>;
}`,...(O=(P=d.parameters)==null?void 0:P.docs)==null?void 0:O.source}}};var W,R,_;h.parameters={...h.parameters,docs:{...(W=h.parameters)==null?void 0:W.docs,source:{originalSource:`() => <View>
        <Title>
            Для каждого ученика, независимо от возраста. Реальные результаты!
        </Title>
        <HeadingLarge>
            Для каждого ученика, независимо от возраста. Реальные результаты!
        </HeadingLarge>
        <HeadingMedium>
            Для каждого ученика, независимо от возраста. Реальные результаты!
        </HeadingMedium>
        <HeadingSmall>
            Для каждого ученика, независимо от возраста. Реальные результаты!
        </HeadingSmall>
        <HeadingXSmall>
            Для каждого ученика, независимо от возраста. Реальные результаты!
        </HeadingXSmall>
        <BodySerifBlock>
            Для каждого ученика, независимо от возраста. Реальные результаты!
        </BodySerifBlock>
        <BodySerif>
            Для каждого ученика, независимо от возраста. Реальные результаты!
        </BodySerif>
        <BodyMonospace>
            Для каждого ученика, независимо от возраста. Реальные результаты!
        </BodyMonospace>
        <Body>
            Для каждого ученика, независимо от возраста. Реальные результаты!
        </Body>
        <LabelLarge>
            Для каждого ученика, независимо от возраста. Реальные результаты!
        </LabelLarge>
        <LabelMedium>
            Для каждого ученика, независимо от возраста. Реальные результаты!
        </LabelMedium>
        <LabelSmall>
            Для каждого ученика, независимо от возраста. Реальные результаты!
        </LabelSmall>
        <LabelXSmall>
            Для каждого ученика, независимо от возраста. Реальные результаты!
        </LabelXSmall>
        <Tagline>
            Для каждого ученика, независимо от возраста. Реальные результаты!
        </Tagline>
        <Caption>
            Для каждого ученика, независимо от возраста. Реальные результаты!
        </Caption>
        <Footnote>
            Для каждого ученика, независимо от возраста. Реальные результаты!
        </Footnote>
    </View>`,...(_=(R=h.parameters)==null?void 0:R.docs)==null?void 0:_.source}}};var z,G,U;m.parameters={...m.parameters,docs:{...(z=m.parameters)==null?void 0:z.docs,source:{originalSource:`() => <View>
        <Title>Dành cho mọi học sinh, mọi lớp học. Kết quả thực tế.</Title>
        <HeadingLarge>
            Dành cho mọi học sinh, mọi lớp học. Kết quả thực tế.
        </HeadingLarge>
        <HeadingMedium>
            Dành cho mọi học sinh, mọi lớp học. Kết quả thực tế.
        </HeadingMedium>
        <HeadingSmall>
            Dành cho mọi học sinh, mọi lớp học. Kết quả thực tế.
        </HeadingSmall>
        <HeadingXSmall>
            Dành cho mọi học sinh, mọi lớp học. Kết quả thực tế.
        </HeadingXSmall>
        <BodySerifBlock>
            Dành cho mọi học sinh, mọi lớp học. Kết quả thực tế.
        </BodySerifBlock>
        <BodySerif>
            Dành cho mọi học sinh, mọi lớp học. Kết quả thực tế.
        </BodySerif>
        <BodyMonospace>
            Dành cho mọi học sinh, mọi lớp học. Kết quả thực tế.
        </BodyMonospace>
        <Body>Dành cho mọi học sinh, mọi lớp học. Kết quả thực tế.</Body>
        <LabelLarge>
            Dành cho mọi học sinh, mọi lớp học. Kết quả thực tế.
        </LabelLarge>
        <LabelMedium>
            Dành cho mọi học sinh, mọi lớp học. Kết quả thực tế.
        </LabelMedium>
        <LabelSmall>
            Dành cho mọi học sinh, mọi lớp học. Kết quả thực tế.
        </LabelSmall>
        <LabelXSmall>
            Dành cho mọi học sinh, mọi lớp học. Kết quả thực tế.
        </LabelXSmall>
        <Tagline>Dành cho mọi học sinh, mọi lớp học. Kết quả thực tế.</Tagline>
        <Caption>Dành cho mọi học sinh, mọi lớp học. Kết quả thực tế.</Caption>
        <Footnote>
            Dành cho mọi học sinh, mọi lớp học. Kết quả thực tế.
        </Footnote>
    </View>`,...(U=(G=m.parameters)==null?void 0:G.docs)==null?void 0:U.source}}};var $,Y,J;p.parameters={...p.parameters,docs:{...($=p.parameters)==null?void 0:$.docs,source:{originalSource:`() => {
  const languages = ({
    Arabic: {
      text: "مرحبا",
      dir: "rtl"
    },
    Armenian: {
      text: "Բարեւ"
    },
    Greek: {
      text: "γεια σας"
    },
    Hebrew: {
      text: "שלום",
      dir: "rtl"
    }
  } as const);
  const [selectedValue, updateValue] = React.useState("Arabic");
  // @ts-expect-error [FEI-5019] - TS7053 - Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ readonly Arabic: { readonly text: "مرحبا"; readonly dir: "rtl"; }; readonly Armenian: { readonly text: "Բարեւ"; }; readonly Greek: { readonly text: "γεια σας"; }; readonly Hebrew: { readonly text: "שלום"; readonly dir: "rtl"; }; }'.
  const {
    text,
    dir
  } = languages[selectedValue];
  return <View>
            <SingleSelect aria-labelledby="language-selector" id="unique-language-selector" placeholder="Select language" onChange={selectedValue => updateValue(selectedValue)} selectedValue={selectedValue}>
                {Object.keys(languages).map((item, key) => <OptionItem label={item} value={item} key={key} />)}
            </SingleSelect>
            <View>
                {/* @ts-expect-error [FEI-5019] - TS2769 - No overload matches this call. */}
                <Title dir={dir}>{text}</Title>
                {/* @ts-expect-error [FEI-5019] - TS2769 - No overload matches this call. */}
                <HeadingLarge dir={dir}>{text}</HeadingLarge>
                {/* @ts-expect-error [FEI-5019] - TS2769 - No overload matches this call. */}
                <HeadingMedium dir={dir}>{text}</HeadingMedium>
                {/* @ts-expect-error [FEI-5019] - TS2769 - No overload matches this call. */}
                <HeadingSmall dir={dir}>{text}</HeadingSmall>
                {/* @ts-expect-error [FEI-5019] - TS2769 - No overload matches this call. */}
                <HeadingXSmall dir={dir}>{text}</HeadingXSmall>
                {/* @ts-expect-error [FEI-5019] - TS2769 - No overload matches this call. */}
                <BodySerifBlock dir={dir}>{text}</BodySerifBlock>
                {/* @ts-expect-error [FEI-5019] - TS2769 - No overload matches this call. */}
                <BodySerif dir={dir}>{text}</BodySerif>
                {/* @ts-expect-error [FEI-5019] - TS2769 - No overload matches this call. */}
                <BodyMonospace dir={dir}>{text}</BodyMonospace>
                {/* @ts-expect-error [FEI-5019] - TS2769 - No overload matches this call. */}
                <Body dir={dir}>{text}</Body>
                {/* @ts-expect-error [FEI-5019] - TS2769 - No overload matches this call. */}
                <LabelLarge dir={dir}>{text}</LabelLarge>
                {/* @ts-expect-error [FEI-5019] - TS2769 - No overload matches this call. */}
                <LabelMedium dir={dir}>{text}</LabelMedium>
                {/* @ts-expect-error [FEI-5019] - TS2769 - No overload matches this call. */}
                <LabelSmall dir={dir}>{text}</LabelSmall>
                {/* @ts-expect-error [FEI-5019] - TS2769 - No overload matches this call. */}
                <LabelXSmall dir={dir}>{text}</LabelXSmall>
                {/* @ts-expect-error [FEI-5019] - TS2769 - No overload matches this call. */}
                <Tagline dir={dir}>{text}</Tagline>
                {/* @ts-expect-error [FEI-5019] - TS2769 - No overload matches this call. */}
                <Caption dir={dir}>{text}</Caption>
                {/* @ts-expect-error [FEI-5019] - TS2769 - No overload matches this call. */}
                <Footnote dir={dir}>{text}</Footnote>
            </View>
        </View>;
}`,...(J=(Y=p.parameters)==null?void 0:Y.docs)==null?void 0:J.source}}};var Q,Z,ee;y.parameters={...y.parameters,docs:{...(Q=y.parameters)==null?void 0:Q.docs,source:{originalSource:`() => {
  const Code = ({
    children
  }: {
    children: React.ReactNode;
  }) => <BodyMonospace>{children}</BodyMonospace>;
  return <Code>{\`const str = "Hello, world!"\`}</Code>;
}`,...(ee=(Z=y.parameters)==null?void 0:Z.docs)==null?void 0:ee.source}}};var te,ne,ae;g.parameters={...g.parameters,docs:{...(te=g.parameters)==null?void 0:te.docs,source:{originalSource:`() => {
  const longParagraph = \`This is an example of a long paragraph.
        Khan Academy offers practice exercises, instructional videos,
        and a personalized learning dashboard that empower learners
        to study at their own pace in and outside of the classroom.
        We tackle math, science, computing, history, art history, economics,
        and more, including K-14 and test preparation (SAT, Praxis, LSAT)
        content. We focus on skill mastery to help learners establish
        strong foundations, so there's no limit to what they can learn next!\`;
  return <Body>{longParagraph}</Body>;
}`,...(ae=(ne=g.parameters)==null?void 0:ne.docs)==null?void 0:ae.source}}};var ie,oe,re;u.parameters={...u.parameters,docs:{...(ie=u.parameters)==null?void 0:ie.docs,source:{originalSource:`() => {
  const style = ({
    outline: \`1px solid \${Color.offBlack}\`,
    marginBottom: Spacing.small_12
  } as const);
  return <View>
            <Title style={style}>Title</Title>
            <HeadingLarge style={style}>HeadingLarge</HeadingLarge>
            <HeadingMedium style={style}>HeadingMedium</HeadingMedium>
            <HeadingSmall style={style}>HeadingSmall</HeadingSmall>
            <HeadingXSmall style={style}>HeadingXSmall</HeadingXSmall>
            <BodySerifBlock style={style}>BodySerifBlock</BodySerifBlock>
            <BodySerif style={style}>BodySerif</BodySerif>
            <BodyMonospace style={style}>BodyMonospace</BodyMonospace>
            <Body style={style}>Body</Body>
            <LabelLarge style={style}>LabelLarge</LabelLarge>
            <LabelMedium style={style}>LabelMedium</LabelMedium>
            <LabelSmall style={style}>LabelSmall</LabelSmall>
            <LabelXSmall style={style}>LabelXSmall</LabelXSmall>
            <Tagline style={style}>Tagline</Tagline>
            <Caption style={style}>Caption</Caption>
            <Footnote style={style}>Footnote</Footnote>
        </View>;
}`,...(re=(oe=u.parameters)==null?void 0:oe.docs)==null?void 0:re.source}}};const at=["ControlProps","TypographyElements","WithStyle","LatoForLatin","LatoForLatinExtended","NotoForNonLatin","CodeFont","Paragraph","LineHeight"];export{y as CodeFont,K as ControlProps,h as LatoForLatin,m as LatoForLatinExtended,u as LineHeight,p as NotoForNonLatin,g as Paragraph,c as TypographyElements,d as WithStyle,at as __namedExportsOrder,nt as default};
//# sourceMappingURL=typography.stories-071a98ac.js.map
