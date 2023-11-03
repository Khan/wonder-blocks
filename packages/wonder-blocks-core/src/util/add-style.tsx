import * as React from "react";
import {StyleSheet} from "aphrodite";

import {processStyleList} from "./util";

import type {StyleType} from "./types";

export default function addStyle<
    // We extend `React.ComponentType<any>` to support `addStyle(Link)` with
    // react-router's `Link` component.
    T extends React.ComponentType<any> | keyof JSX.IntrinsicElements,
    Props extends {
        className?: string;
        style?: StyleType;
        children?: React.ReactNode;
    } & Omit<React.ComponentProps<T>, "style">, // Removes the 'style' prop from the original component
>(
    Component: T,
    // TODO: only allow one of these to be set
    defaultStyle?: StyleType,
    defaultClassName?: string,
): React.ForwardRefExoticComponent<
    React.PropsWithoutRef<Props> &
        React.RefAttributes<
            // We need to lookup the HTML/SVG element type based on the tag name, but only
            // for JSX intrinsics (aka HTML/SVG tags).
            T extends keyof JSX.IntrinsicElements ? IntrinsicElementsMap[T] : T
        >
> {
    return React.forwardRef<
        // We need to lookup the HTML/SVG element type based on the tag name, but only
        // for JSX intrinsics (aka HTML/SVG tags).
        T extends keyof JSX.IntrinsicElements ? IntrinsicElementsMap[T] : T,
        Props
    >((props, ref) => {
        // eslint-disable-next-line react/prop-types
        const {className, style, ...otherProps} = props;

        // TODO(kevinb): add this back in later
        // const reset =
        //     typeof Component === "string" ? overrides[Component] : null;

        const {className: aphroditeClassName, style: inlineStyles} =
            processStyleList([defaultStyle, style]);

        return (
            // @ts-expect-error: TS says this is not assignable to the return forwardRef()'s return type.
            // Type 'Omit<PropsWithChildren<Props>, "style" | "className"> & { ref: ForwardedRef<ElementMap[T]>; className: string; style: CSSProperties; }' is not assignable to type 'IntrinsicAttributes & LibraryManagedAttributes<T, SVGProps<SVGSymbolElement> & ClassAttributes<HTMLObjectElement> & ... 179 more ... & SVGProps<...>>'.
            //   Type 'Omit<PropsWithChildren<Props>, "style" | "className"> & { ref: ForwardedRef<ElementMap[T]>; className: string; style: CSSProperties; }' is not assignable to type 'LibraryManagedAttributes<T, SVGProps<SVGSymbolElement> & ClassAttributes<HTMLObjectElement> & ObjectHTMLAttributes<HTMLObjectElement> & ... 178 more ... & SVGProps<...>>'
            <Component
                {...otherProps}
                ref={ref}
                className={[defaultClassName, aphroditeClassName, className]
                    .filter(Boolean)
                    .join(" ")}
                style={inlineStyles}
            />
        );
    });
}

/**
 * These are necessary to override various custom styles that browsers add so that
 * elements have consistent styles across all browsers.  Only add styles here if
 * they appear in https://github.com/necolas/normalize.css/blob/master/normalize.css.
 */
const overrides = StyleSheet.create({
    button: {
        margin: 0, // Safari adds 2px left/right margins
        "::-moz-focus-inner": {
            border: 0, // Firefox adds an inner focus ring around text
        },
    },
});

// This mapping is based on `ReactHTML` and `ReactSVG` interfaces in the type definitions
// for React.  This is used to determine the HTML/SVG element type from the tag string.
type IntrinsicElementsMap = {
    // HTML
    a: HTMLAnchorElement;
    abbr: HTMLElement;
    address: HTMLElement;
    area: HTMLAreaElement;
    article: HTMLElement;
    aside: HTMLElement;
    audio: HTMLAudioElement;
    b: HTMLElement;
    base: HTMLBaseElement;
    bdi: HTMLElement;
    bdo: HTMLElement;
    big: HTMLElement;
    blockquote: HTMLElement;
    body: HTMLBodyElement;
    br: HTMLBRElement;
    button: HTMLButtonElement;
    canvas: HTMLCanvasElement;
    caption: HTMLElement;
    cite: HTMLElement;
    code: HTMLElement;
    col: HTMLTableColElement;
    colgroup: HTMLTableColElement;
    data: HTMLDataElement;
    datalist: HTMLDataListElement;
    dd: HTMLElement;
    del: HTMLElement;
    details: HTMLElement;
    dfn: HTMLElement;
    dialog: HTMLDialogElement;
    div: HTMLDivElement;
    dl: HTMLDListElement;
    dt: HTMLElement;
    em: HTMLElement;
    embed: HTMLEmbedElement;
    fieldset: HTMLFieldSetElement;
    figcaption: HTMLElement;
    figure: HTMLElement;
    footer: HTMLElement;
    form: HTMLFormElement;
    h1: HTMLHeadingElement;
    h2: HTMLHeadingElement;
    h3: HTMLHeadingElement;
    h4: HTMLHeadingElement;
    h5: HTMLHeadingElement;
    h6: HTMLHeadingElement;
    head: HTMLHeadElement;
    header: HTMLElement;
    hgroup: HTMLElement;
    hr: HTMLHRElement;
    html: HTMLHtmlElement;
    i: HTMLElement;
    iframe: HTMLIFrameElement;
    img: HTMLImageElement;
    input: HTMLInputElement;
    ins: HTMLModElement;
    kbd: HTMLElement;
    keygen: HTMLElement;
    label: HTMLLabelElement;
    legend: HTMLLegendElement;
    li: HTMLLIElement;
    link: HTMLLinkElement;
    main: HTMLElement;
    map: HTMLMapElement;
    mark: HTMLElement;
    menu: HTMLElement;
    menuitem: HTMLElement;
    meta: HTMLMetaElement;
    meter: HTMLElement;
    nav: HTMLElement;
    noindex: HTMLElement;
    noscript: HTMLElement;
    object: HTMLObjectElement;
    ol: HTMLOListElement;
    optgroup: HTMLOptGroupElement;
    option: HTMLOptionElement;
    output: HTMLElement;
    p: HTMLParagraphElement;
    param: HTMLParamElement;
    picture: HTMLElement;
    pre: HTMLPreElement;
    progress: HTMLProgressElement;
    q: HTMLQuoteElement;
    rp: HTMLElement;
    rt: HTMLElement;
    ruby: HTMLElement;
    s: HTMLElement;
    samp: HTMLElement;
    slot: HTMLSlotElement;
    script: HTMLScriptElement;
    section: HTMLElement;
    select: HTMLSelectElement;
    small: HTMLElement;
    source: HTMLSourceElement;
    span: HTMLSpanElement;
    strong: HTMLElement;
    style: HTMLStyleElement;
    sub: HTMLElement;
    summary: HTMLElement;
    sup: HTMLElement;
    table: HTMLTableElement;
    template: HTMLTemplateElement;
    tbody: HTMLTableSectionElement;
    td: HTMLElement; // HTMLTableDataCellElement;
    textarea: HTMLTextAreaElement;
    tfoot: HTMLTableSectionElement;
    th: HTMLElement; // HTMLTableHeaderCellElement;
    thead: HTMLTableSectionElement;
    time: HTMLElement;
    title: HTMLTitleElement;
    tr: HTMLTableRowElement;
    track: HTMLTrackElement;
    u: HTMLElement;
    ul: HTMLUListElement;
    var: HTMLElement;
    video: HTMLVideoElement;
    wbr: HTMLElement;
    webview: HTMLElement; // HTMLWebViewElement;

    // SVG
    svg: SVGSVGElement;

    animate: SVGElement; // TODO: It is SVGAnimateElement but is not in TypeScript's lib.dom.d.ts for now.
    animateMotion: SVGElement;
    animateTransform: SVGElement; // TODO: It is SVGAnimateTransformElement but is not in TypeScript's lib.dom.d.ts for now.
    circle: SVGCircleElement;
    clipPath: SVGClipPathElement;
    defs: SVGDefsElement;
    desc: SVGDescElement;
    ellipse: SVGEllipseElement;
    feBlend: SVGFEBlendElement;
    feColorMatrix: SVGFEColorMatrixElement;
    feComponentTransfer: SVGFEComponentTransferElement;
    feComposite: SVGFECompositeElement;
    feConvolveMatrix: SVGFEConvolveMatrixElement;
    feDiffuseLighting: SVGFEDiffuseLightingElement;
    feDisplacementMap: SVGFEDisplacementMapElement;
    feDistantLight: SVGFEDistantLightElement;
    feDropShadow: SVGFEDropShadowElement;
    feFlood: SVGFEFloodElement;
    feFuncA: SVGFEFuncAElement;
    feFuncB: SVGFEFuncBElement;
    feFuncG: SVGFEFuncGElement;
    feFuncR: SVGFEFuncRElement;
    feGaussianBlur: SVGFEGaussianBlurElement;
    feImage: SVGFEImageElement;
    feMerge: SVGFEMergeElement;
    feMergeNode: SVGFEMergeNodeElement;
    feMorphology: SVGFEMorphologyElement;
    feOffset: SVGFEOffsetElement;
    fePointLight: SVGFEPointLightElement;
    feSpecularLighting: SVGFESpecularLightingElement;
    feSpotLight: SVGFESpotLightElement;
    feTile: SVGFETileElement;
    feTurbulence: SVGFETurbulenceElement;
    filter: SVGFilterElement;
    foreignObject: SVGForeignObjectElement;
    g: SVGGElement;
    image: SVGImageElement;
    line: SVGLineElement;
    linearGradient: SVGLinearGradientElement;
    marker: SVGMarkerElement;
    mask: SVGMaskElement;
    metadata: SVGMetadataElement;
    mpath: SVGElement;
    path: SVGPathElement;
    pattern: SVGPatternElement;
    polygon: SVGPolygonElement;
    polyline: SVGPolylineElement;
    radialGradient: SVGRadialGradientElement;
    rect: SVGRectElement;
    stop: SVGStopElement;
    switch: SVGSwitchElement;
    symbol: SVGSymbolElement;
    text: SVGTextElement;
    textPath: SVGTextPathElement;
    tspan: SVGTSpanElement;
    use: SVGUseElement;
    view: SVGViewElement;
};
