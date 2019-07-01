// @flow
import React from "react";

// NOTE: Potentially add to this as more cases come up.
export type ClickableRole =
    | "button"
    | "link"
    | "checkbox"
    | "radio"
    | "listbox"
    | "option"
    | "menuitem"
    | "menu";

const getAppropriateTriggersForRole = (role: ?ClickableRole) => {
    switch (role) {
        // Triggers on ENTER, but not SPACE
        case "link":
            return {
                triggerOnEnter: true,
                triggerOnSpace: false,
            };
        // Triggers on SPACE, but not ENTER
        case "checkbox":
        case "radio":
        case "listbox":
        case "option":
            return {
                triggerOnEnter: false,
                triggerOnSpace: true,
            };
        // Triggers on both ENTER and SPACE
        case "button":
        case "menuitem":
        case "menu":
        default:
            return {
                triggerOnEnter: true,
                triggerOnSpace: true,
            };
    }
};

type Props = {|
    /**
     * A function that returns the a React `Element`.
     *
     * The React `Element` returned should take in this component's state
     * (`{hovered, focused, pressed}`) as props.
     */
    children: (
        state: ClickableState,
        handlers: ClickableHandlers,
    ) => React$Element<*>,

    /**
     * Whether the component is disabled.
     *
     * If the component is disabled, this component will return handlers
     * that do nothing.
     */
    disabled: boolean,

    /**
     * A URL.
     *
     * If specified, clicking on the component will navigate to the location
     * provided.
     * For keyboard navigation, the default is that both an enter and space
     * press would also navigate to this location. See the triggerOnEnter and
     * triggerOnSpace props for more details.
     */
    href?: string,

    /**
     * A function to be executed `onclick`.
     */
    onClick?: (e: SyntheticEvent<>) => mixed,

    /**
     * Passed in by withRouter HOC.
     * @ignore
     */
    history?: any,

    /**
     * A role that encapsulates how the clickable component should behave, which
     * affects which keyboard actions trigger the component. For example, a
     * component with role="button" should be able to be clicked with both the
     * enter and space keys.
     */
    role?: ClickableRole,
|};

export type ClickableState = {|
    /**
     * Whether the component is hovered.
     *
     * See component documentation for more details.
     */
    hovered: boolean,

    /**
     * Whether the component is hovered.
     *
     * See component documentation for more details.
     */
    focused: boolean,

    /**
     * Whether the component is hovered.
     *
     * See component documentation for more details.
     */
    pressed: boolean,
|};

export type ClickableHandlers = {|
    onClick: (e: SyntheticMouseEvent<>) => mixed,
    onMouseEnter: (e: SyntheticMouseEvent<>) => mixed,
    onMouseLeave: () => mixed,
    onMouseDown: () => mixed,
    onMouseUp: (e: SyntheticMouseEvent<>) => mixed,
    onDragStart: (e: SyntheticMouseEvent<>) => mixed,
    onTouchStart: () => mixed,
    onTouchEnd: () => mixed,
    onTouchCancel: () => mixed,
    onKeyDown: (e: SyntheticKeyboardEvent<*>) => mixed,
    onKeyUp: (e: SyntheticKeyboardEvent<*>) => mixed,
    onFocus: (e: SyntheticFocusEvent<*>) => mixed,
    onBlur: (e: SyntheticFocusEvent<*>) => mixed,
    tabIndex: number,
|};

const disabledHandlers = {
    onClick: () => void 0,
    onMouseEnter: () => void 0,
    onMouseLeave: () => void 0,
    onMouseDown: () => void 0,
    onMouseUp: () => void 0,
    onDragStart: () => void 0,
    onTouchStart: () => void 0,
    onTouchEnd: () => void 0,
    onTouchCancel: () => void 0,
    onKeyDown: () => void 0,
    onKeyUp: () => void 0,
    onFocus: () => void 0,
    onBlur: () => void 0,
    tabIndex: -1,
};

const keyCodes = {
    enter: 13,
    space: 32,
};

const startState = {
    hovered: false,
    focused: false,
    pressed: false,
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
export default class ClickableBehavior extends React.Component<
    Props,
    ClickableState,
> {
    waitingForClick: boolean;
    enterClick: boolean;
    dragging: boolean;

    static defaultProps = {
        disabled: false,
    };

    static getDerivedStateFromProps(props: Props, state: ClickableState) {
        // If new props are disabled, reset the hovered/focused/pressed states
        if (props.disabled) {
            return startState;
        } else {
            // Cannot return undefined
            return null;
        }
    }

    constructor(props: Props) {
        super(props);

        this.state = startState;
        this.waitingForClick = false;
        this.enterClick = false;
        this.dragging = false;
    }

    handleClick = (e: SyntheticMouseEvent<>) => {
        if (this.enterClick) {
            return;
        } else if (this.props.onClick) {
            this.waitingForClick = false;
            this.props.onClick(e);
        }
    };

    handleMouseEnter = (e: SyntheticMouseEvent<>) => {
        // When the left button is pressed already, we want it to be pressed
        if (e.buttons === 1) {
            this.dragging = true;
            this.setState({pressed: true});
        } else if (!this.waitingForClick) {
            this.setState({hovered: true});
        }
    };

    handleMouseLeave = () => {
        if (!this.waitingForClick) {
            this.dragging = false;
            this.setState({hovered: false, pressed: false, focused: false});
        }
    };

    handleMouseDown = () => {
        this.setState({pressed: true});
    };

    handleMouseUp = (e: SyntheticMouseEvent<>) => {
        if (this.dragging) {
            this.dragging = false;
            this.handleClick(e);
        }
        this.setState({pressed: false, focused: false});
    };

    handleDragStart = (e: SyntheticMouseEvent<>) => {
        this.dragging = true;
        e.preventDefault();
    };

    handleTouchStart = () => {
        this.setState({pressed: true});
    };

    handleTouchEnd = () => {
        this.setState({pressed: false});
        this.waitingForClick = true;
    };

    handleTouchCancel = () => {
        this.setState({pressed: false});
        this.waitingForClick = true;
    };

    handleKeyDown = (e: SyntheticKeyboardEvent<*>) => {
        const keyCode = e.which || e.keyCode;
        const {triggerOnEnter, triggerOnSpace} = getAppropriateTriggersForRole(
            this.props.role,
        );
        if (
            (triggerOnEnter && keyCode === keyCodes.enter) ||
            (triggerOnSpace && keyCode === keyCodes.space)
        ) {
            // This prevents space from scrolling down. It also prevents the
            // space and enter keys from triggering click events. We manually
            // call the supplied onClick and handle potential navigation in
            // handleKeyUp instead.
            e.preventDefault();
            this.setState({pressed: true});
        } else if (!triggerOnEnter && keyCode === keyCodes.enter) {
            // If the component isn't supposed to trigger on enter, we have to
            // keep track of the enter keydown to negate the onClick callback
            this.enterClick = true;
        }
    };

    handleKeyUp = (e: SyntheticKeyboardEvent<*>) => {
        const keyCode = e.which || e.keyCode;
        const {triggerOnEnter, triggerOnSpace} = getAppropriateTriggersForRole(
            this.props.role,
        );
        if (
            (triggerOnEnter && keyCode === keyCodes.enter) ||
            (triggerOnSpace && keyCode === keyCodes.space)
        ) {
            // NOTE: In Firefox, the keyup event needs to be preventDefault-ed
            // for space.
            // https://stackoverflow.com/questions/24383722/unable-to-prevent-spacebar-default-action-in-firefox
            if (keyCode === keyCodes.space) {
                e.preventDefault();
            }

            this.setState({pressed: false, focused: true});
            if (this.props.onClick) {
                this.props.onClick(e);
            }
            this.maybeNavigate();
        } else if (!triggerOnEnter && keyCode === keyCodes.enter) {
            this.enterClick = false;
        }
    };

    handleFocus = (e: SyntheticFocusEvent<*>) => {
        this.setState({focused: true});
    };

    handleBlur = (e: SyntheticFocusEvent<*>) => {
        this.setState({focused: false, pressed: false});
    };

    maybeNavigate = () => {
        const {history, href} = this.props;
        if (href) {
            if (history) {
                history.push(href);
            } else {
                window.location.assign(href);
            }
        }
    };

    render() {
        const handlers = this.props.disabled
            ? disabledHandlers
            : {
                  onClick: this.handleClick,
                  onMouseEnter: this.handleMouseEnter,
                  onMouseLeave: this.handleMouseLeave,
                  onMouseDown: this.handleMouseDown,
                  onMouseUp: this.handleMouseUp,
                  onDragStart: this.handleDragStart,
                  onTouchStart: this.handleTouchStart,
                  onTouchEnd: this.handleTouchEnd,
                  onTouchCancel: this.handleTouchCancel,
                  onKeyDown: this.handleKeyDown,
                  onKeyUp: this.handleKeyUp,
                  onFocus: this.handleFocus,
                  onBlur: this.handleBlur,
                  // We set tabIndex to 0 so that users can tab to clickable
                  // things that aren't buttons or anchors.
                  tabIndex: 0,
              };
        const {children} = this.props;
        return children && children(this.state, handlers);
    }
}
