import * as React from 'react';
import * as S from "@ds-stories/__docs__/wonder-blocks-tabs/tabs.stories";

function compose(S: any, key: string) {
  const meta: any = S.default ?? {};
  const st: any = S[key];
  const args: any = { ...(meta.args ?? {}), ...(st && st.args ? st.args : {}) };
  // Storybook resolves argTypes.mapping (control value -> real arg) before
  // rendering; mirror that so mapped args don't render raw.
  const at: any = { ...(meta.argTypes ?? {}), ...(st && st.argTypes ? st.argTypes : {}) };
  for (const k of Object.keys(args)) {
    const m = at[k] && at[k].mapping;
    if (m && typeof m === 'object' && args[k] in m) args[k] = m[args[k]];
  }
  const title: string = typeof meta.title === 'string' ? meta.title : '';
  const ctx: any = {
    args, name: key, title, kind: title, id: '', componentId: '',
    globals: {}, viewMode: 'story',
    parameters: (st && st.parameters) ?? meta.parameters ?? {},
  };
  let render: (() => any) | null = null;
  if (st && typeof st.render === 'function') render = () => st.render(args, ctx);
  else if (typeof st === 'function') render = () => st(args, ctx);
  else if (typeof meta.render === 'function') render = () => meta.render(args, ctx);
  else {
    const C = (st && st.component) || meta.component;
    if (C) render = () => React.createElement(C, args);
  }
  if (!render) return () => null;
  // [].concat: a single function is legal CSF decorator shorthand. A
  // decorator returning undefined (stubbed addon) falls through to the inner
  // render — otherwise one unrecognized addon blanks the cell silently.
  const decorators: any[] = ([] as any[]).concat((st && st.decorators) ?? []).concat(meta.decorators ?? []);
  return decorators.reduce((inner: any, dec: any) => () => {
    const out = dec(inner, ctx);
    return out === undefined ? inner() : out;
  }, render);
}

export const Default = /* Default */ compose(S, "Default");
export const ManualActivation = /* Manual Activation */ compose(S, "ManualActivation");
export const AutomaticActivation = /* Automatic Activation */ compose(S, "AutomaticActivation");
export const WithIcons = /* With Icons */ compose(S, "WithIcons");
export const WithFocusableContent = /* With Focusable Content */ compose(S, "WithFocusableContent");
export const Animated = /* Animated */ compose(S, "Animated");
export const AnimationsDisabled = /* Animations Disabled */ compose(S, "AnimationsDisabled");
export const PanelCaching = /* Panel Caching */ compose(S, "PanelCaching");
export const MountAllPanels = /* Mount All Panels */ compose(S, "MountAllPanels");
export const CustomStyles = /* Custom Styles */ compose(S, "CustomStyles");
export const TabLabelRenderFunction = /* Tab Label Render Function */ compose(S, "TabLabelRenderFunction");
// The RightToLeft story relies on Storybook's `globals: {direction: "rtl"}`, which
// a preview decorator applies as `dir="rtl"` on an ancestor of the Tabs. The
// generated compose() drops globals, so mirror that ancestor here — the story's
// own doc states RTL is produced by an ancestor element with dir="rtl".
const RightToLeftInner = /* Right To Left */ compose(S, "RightToLeft");
export const RightToLeft = () => (
  <div dir="rtl">
    <RightToLeftInner />
  </div>
);
