import * as React from "react";
declare type ClickableRole = "button" | "link" | "checkbox" | "radio" | "listbox" | "option" | "menuitem" | "menu";
declare type Props = {
    /**
     * A function that returns the a React `Element`.
     *
     * The React `Element` returned should take in this component's state
     * (`{hovered, focused, pressed}`) as props.
     */
    children: (state: State, handlers: ClickableHandlers) => React.ReactElement;
    /**
     * Whether the component is disabled.
     *
     * If the component is disabled, this component will return handlers
     * that do nothing.
     */
    disabled: boolean;
    /**
     * A URL.
     *
     * If specified, clicking on the component will navigate to the location
     * provided.
     * For keyboard navigation, the default is that both an enter and space
     * press would also navigate to this location. See the triggerOnEnter and
     * triggerOnSpace props for more details.
     */
    href?: string;
    /**
     * A function to be executed `onclick`.
     */
    onClick?: (e: React.MouseEvent) => unknown;
    /**
     * Passed in by withRouter HOC.
     * @ignore
     */
    history?: any;
    /**
     * A role that encapsulates how the clickable component should behave, which
     * affects which keyboard actions trigger the component. For example, a
     * component with role="button" should be able to be clicked with both the
     * enter and space keys.
     */
    role?: ClickableRole;
};
declare type State = {
    /**
     * Whether the component is hovered.
     *
     * See component documentation for more details.
     */
    hovered: boolean;
    /**
     * Whether the component is hovered.
     *
     * See component documentation for more details.
     */
    focused: boolean;
    /**
     * Whether the component is hovered.
     *
     * See component documentation for more details.
     */
    pressed: boolean;
};
export declare type ClickableHandlers = {
    onClick: (e: React.MouseEvent) => unknown;
    onMouseEnter: (e: React.MouseEvent) => unknown;
    onMouseLeave: (e: React.MouseEvent) => unknown;
    onMouseDown: (e: React.MouseEvent) => unknown;
    onMouseUp: (e: React.MouseEvent) => unknown;
    onDragStart: (e: React.MouseEvent) => unknown;
    onTouchStart: (e: React.TouchEvent) => unknown;
    onTouchEnd: (e: React.TouchEvent) => unknown;
    onTouchCancel: (e: React.TouchEvent) => unknown;
    onKeyDown: (e: React.KeyboardEvent) => unknown;
    onKeyUp: (e: React.KeyboardEvent) => unknown;
    onFocus: (e: React.FocusEvent) => unknown;
    onBlur: (e: React.FocusEvent) => unknown;
    tabIndex: number;
};
/**
 * Add hover, focus, and active status updates to a clickable component.
 *
 * Via mouse:
 *
 * 1. Hover over button -> hover state
 * 2. Mouse down -> active state
 * 3. Mouse up -> default state
 * 4. Press tab -> focus state
 *
 * Via touch:
 *
 * 1. Touch down -> press state
 * 2. Touch up -> default state
 *
 * Via keyboard:
 *
 * 1. Tab to focus -> focus state
 * 2. Keydown (spacebar/enter) -> active state
 * 3. Keyup (spacebar/enter) -> focus state
 *
 * Warning: The event handlers returned (onClick, onMouseEnter, onMouseLeave,
 * onMouseDown, onMouseUp, onDragStart, onTouchStart, onTouchEnd, onTouchCancel, onKeyDown,
 * onKeyUp, onFocus, onBlur, tabIndex) should be passed on to the component
 * that has the ClickableBehavior. You cannot override these handlers without
 * potentially breaking the functionality of ClickableBehavior.
 *
 * There are internal props triggerOnEnter and triggerOnSpace that can be set
 * to false if one of those keys shouldn't count as a click on this component.
 * Be careful about setting those to false -- make certain that the component
 * shouldn't process that key.
 *
 * See [this document](https://docs.google.com/document/d/1DG5Rg2f0cawIL5R8UqnPQpd7pbdObk8OyjO5ryYQmBM/edit#)
 * for a more thorough explanation of expected behaviors and potential cavaets.
 *
 * `ClickableBehavior` accepts a function as `children` which is passed state
 * and an object containing event handlers. The `children` function should
 * return a clickable React Element of some sort.
 *
 * Example:
 *
 * ```js
 * class MyClickableComponent extends React.Component<Props> {
 *     render() {
 *         const ClickableBehavior = getClickableBehavior();
 *         return <ClickableBehavior
 *             disabled={this.props.disabled}
 *             onClick={this.props.onClick}
 *         >
 *             {({hovered}, handlers) =>
 *                 <RoundRect
 *                      textcolor='white'
 *                      backgroundColor={hovered ? 'red' : 'blue'}}
 *                      {...handlers}
 *                 >
 *                      {this.props.children}
 *                 </RoundRect>
 *             }
 *         </ClickableBehavior>
 *     }
 * }
 * ```
 *
 * This follows a pattern called [Function as Child Components]
 * (https://medium.com/merrickchristensen/function-as-child-components-5f3920a9ace9).
 *
 * WARNING: Do not use this component directly, use getClickableBehavior
 * instead. getClickableBehavior takes three arguments (href, directtNav, and
 * router) and returns either the default ClickableBehavior or a react-router
 * aware version.
 *
 * The react-router aware version is returned if `router` is a react-router-dom
 * router, `skipClientNav` is not `true`, and `href` is an internal URL.
 *
 * The `router` can be accessed via this.context.router from a component
 * rendered as a descendant of a BrowserRouter.
 * See https://reacttraining.com/react-router/web/guides/basic-components.
 */
export default class ClickableBehavior extends React.Component<Props, State> {
    waitingForClick: boolean;
    enterClick: boolean;
    dragging: boolean;
    static defaultProps: {
        disabled: boolean;
    };
    static getDerivedStateFromProps(props: Props, state: State): {
        hovered: boolean;
        focused: boolean;
        pressed: boolean;
    };
    constructor(props: Props);
    handleClick: (e: React.MouseEvent<Element, MouseEvent>) => void;
    handleMouseEnter: (e: React.MouseEvent<Element, MouseEvent>) => void;
    handleMouseLeave: (e: React.MouseEvent<Element, MouseEvent>) => void;
    handleMouseDown: (e: React.MouseEvent<Element, MouseEvent>) => void;
    handleMouseUp: (e: React.MouseEvent<Element, MouseEvent>) => void;
    handleDragStart: (e: React.MouseEvent<Element, MouseEvent>) => void;
    handleTouchStart: (e: React.TouchEvent<Element>) => void;
    handleTouchEnd: (e: React.TouchEvent<Element>) => void;
    handleTouchCancel: (e: React.TouchEvent<Element>) => void;
    handleKeyDown: (e: React.KeyboardEvent<Element>) => void;
    handleKeyUp: (e: React.KeyboardEvent<Element>) => void;
    handleFocus: (e: React.FocusEvent<Element>) => void;
    handleBlur: (e: React.FocusEvent<Element>) => void;
    maybeNavigate: () => void;
    render(): React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)>) | (new (props: any) => React.Component<any, any, any>)>;
}
export {};
