// @flow
import React from "react";

type Props = {|
    /**
     * A function that returns the a React `Element`.
     *
     * The React `Element` returned should take in this component's state
     * (`{hovered, focused, pressed}`) as props.
     */
    children: (state: State, handlers: ClickableHandlers) => React$Element<*>,

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
     * If specified, we will assume the rendered component should react like an
     * `<a>` tag and respond to enter/return key press. Otherwise, we will
     * assume the rendered component should react like a `<button>` tag and
     * respond to spacebar key press.
     */
    href?: string,

    /**
     * A function to be executed `onclick`.
     */
    onClick?: (e: SyntheticEvent<>) => void,

    /**
     * Passed in by withRouter HOC.
     */
    history?: any,
|};

type State = {|
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
    onClick: (e: SyntheticMouseEvent<>) => void,
    onMouseEnter: () => void,
    onMouseLeave: () => void,
    onMouseDown: () => void,
    onMouseUp: (e: SyntheticMouseEvent<>) => void,
    onTouchStart: () => void,
    onTouchEnd: () => void,
    onTouchCancel: () => void,
    onKeyDown: (e: SyntheticKeyboardEvent<*>) => void,
    onKeyUp: (e: SyntheticKeyboardEvent<*>) => void,
    onFocus: (e: SyntheticFocusEvent<*>) => void,
    onBlur: (e: SyntheticFocusEvent<*>) => void,
|};

const disabledHandlers = {
    onClick: (e) => e.preventDefault(),
    onMouseEnter: () => void 0,
    onMouseLeave: () => void 0,
    onMouseDown: () => void 0,
    onMouseUp: () => void 0,
    onTouchStart: () => void 0,
    onTouchEnd: () => void 0,
    onTouchCancel: () => void 0,
    onKeyDown: () => void 0,
    onKeyUp: () => void 0,
    onFocus: () => void 0,
    onBlur: () => void 0,
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
 * instead. getClickableBehavior takes three arguments (href, clientNav, and
 * router) and returns either the default ClickableBehavior or a react-router
 * aware version.
 *
 * The react-router aware version is return if the following conditions are met:
 *
 * - `href` is an external URL
 * - `clientNav` is `true`
 * - `router` is a react-router-dom router.
 *
 * The `router` can be accessed via this.context.router from a component
 * rendered as a descendant of a BrowserRouter.
 * See https://reacttraining.com/react-router/web/guides/basic-components.
 */
export default class ClickableBehavior extends React.Component<Props, State> {
    waitingForClick: boolean;
    keyboardClick: boolean;

    static defaultProps = {
        disabled: false,
    };

    constructor(props: Props) {
        super(props);

        this.state = startState;
    }

    // TODO(sophie): This method is deprecated in React 16. Once we update to
    // React 16, we should use static getDerivedStateFromProps instead.
    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.disabled) {
            this.setState(startState);
        }
    }

    handleClick = (e: SyntheticMouseEvent<>) => {
        if (this.keyboardClick) {
            this.keyboardClick = false;
            e.preventDefault();
        } else if (this.props.onClick) {
            this.waitingForClick = false;
            this.props.onClick(e);
        }
    };

    handleMouseEnter = () => {
        if (!this.waitingForClick) {
            this.setState({hovered: true});
        }
    };

    handleMouseLeave = () => {
        if (!this.waitingForClick) {
            this.setState({hovered: false, pressed: false});
        }
    };

    handleMouseDown = () => {
        this.setState({pressed: true});
    };

    handleMouseUp = (e: SyntheticMouseEvent<>) => {
        this.setState({pressed: false, focused: false});
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
        if (
            this.props.href
                ? keyCode === keyCodes.enter
                : keyCode === keyCodes.space
        ) {
            this.keyboardClick = true;
            this.setState({pressed: true});
        }
    };

    handleKeyUp = (e: SyntheticKeyboardEvent<*>) => {
        const keyCode = e.which || e.keyCode;
        if (
            this.props.href
                ? keyCode === keyCodes.enter
                : keyCode === keyCodes.space
        ) {
            this.setState({pressed: false, focused: true});
            if (this.props.onClick) {
                this.props.onClick(e);
            }
            this.maybeNavigate();
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
                  onTouchStart: this.handleTouchStart,
                  onTouchEnd: this.handleTouchEnd,
                  onTouchCancel: this.handleTouchCancel,
                  onKeyDown: this.handleKeyDown,
                  onKeyUp: this.handleKeyUp,
                  onFocus: this.handleFocus,
                  onBlur: this.handleBlur,
              };
        const {children} = this.props;
        return children && children(this.state, handlers);
    }
}
