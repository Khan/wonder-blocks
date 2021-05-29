// @flow
// This hand-crafted file is based on the TypeScript types.

declare module "popper.js" {
    declare type Position = "top" | "right" | "bottom" | "left";

    declare type Placement =
        | "auto-start"
        | "auto"
        | "auto-end"
        | "top-start"
        | "top"
        | "top-end"
        | "right-start"
        | "right"
        | "right-end"
        | "bottom-end"
        | "bottom"
        | "bottom-start"
        | "left-end"
        | "left"
        | "left-start";

    declare type Boundary = "scrollParent" | "viewport" | "window";

    declare type Behavior = "flip" | "clockwise" | "counterclockwise";

    declare type ModifierFn = (data: Data, options: Object) => Data;

    declare type Attributes = {|
        "x-out-of-boundaries": "" | false,
        "x-placement": Placement,
    |};

    declare type Padding = {|
        top?: number,
        bottom?: number,
        left?: number,
        right?: number,
    |};

    declare type BaseModifier = {|
        order?: number,
        enabled?: boolean,
        fn?: ModifierFn,
    |};

    declare type Modifiers = {
        shift?: BaseModifier,
        offset?: {|
            ...BaseModifier,
            offset?: number | string,
        |},
        preventOverflow?: {|
            ...BaseModifier,
            priority?: Position[],
            padding?: number | Padding,
            boundariesElement?: Boundary | Element,
            escapeWithReference?: boolean,
        |},
        keepTogether?: BaseModifier,
        arrow?: {|
            ...BaseModifier,
            element?: string | Element,
        |},
        flip?: {|
            ...BaseModifier,
            behavior?: Behavior | Position[],
            padding?: number | Padding,
            boundariesElement?: Boundary | Element,
            flipVariations?: boolean,
            flipVariationsByContent?: boolean,
        |},
        inner?: BaseModifier,
        hide?: BaseModifier,
        applyStyle?: {|
            ...BaseModifier,
            onLoad?: Function,
            gpuAcceleration?: boolean,
        |},
        computeStyle?: {|
            ...BaseModifier,
            gpuAcceleration?: boolean,
            x?: "bottom" | "top",
            y?: "left" | "right",
        |},

        [name: string]: ?{
            ...BaseModifier,
            [key: string]: any,
            ...
        },
        ...
    };

    declare type Offset = {|
        top: number,
        left: number,
        width: number,
        height: number,
    |};

    declare type Data = {|
        instance: Popper,
        placement: Placement,
        originalPlacement: Placement,
        flipped: boolean,
        hide: boolean,
        arrowElement: Element,
        styles: CSSStyleDeclaration,
        arrowStyles: CSSStyleDeclaration,
        attributes: Attributes,
        boundaries: Object,
        offsets: {|
            popper: Offset,
            reference: Offset,
            arrow: {|
                top: number,
                left: number,
            |},
        |},
    |};

    declare type PopperOptions = {|
        placement?: Placement,
        positionFixed?: boolean,
        eventsEnabled?: boolean,
        modifiers?: Modifiers,
        removeOnDestroy?: boolean,

        onCreate?: (data: Data) => void,

        onUpdate?: (data: Data) => void,
    |};

    declare interface ReferenceObject {
        clientHeight: number;
        clientWidth: number;

        getBoundingClientRect(): ClientRect;
    }

    declare class Popper {
        static modifiers: {...BaseModifier, name: string, ...}[];
        static placements: Placement[];
        static Defaults: PopperOptions;

        options: PopperOptions;
        popper: Element;
        reference: Element | ReferenceObject;

        constructor(
            reference: Element | ReferenceObject,
            popper: Element,
            options?: PopperOptions,
        ): Popper;

        destroy(): void;

        update(): void;

        scheduleUpdate(): void;

        enableEventListeners(): void;

        disableEventListeners(): void;
    }

    declare module.exports: typeof Popper;
}
