// @flow
/**
 * Add hover, focus, and active status updates to a clickable component.
 *
 * Via mouse:
 * 1. Hover over button -> hover state
 * 2. Mouse down -> active state
 * 3. Mouse up -> default state
 * 4. Press tab -> focus state
 *
 * Via touch:
 * 1. Touch down -> press state
 * 2. Touch up -> default state
 *
 * Via keyboard:
 * 1. Tab to focus -> focus state
 * 2. Keydown (spacebar/enter) -> active state
 * 3. Keyup (spacebar/enter) -> focus state
 *
 * ClickableBehavior accepts a function as 'children' which is passed state and
 * an object containing event handlers. The 'children' function should return
 * a clickable React Element of some sort.
 *
 * Example:
 *
 * ```
 * class MyClickableComponent extends React.Component<Props> {
 *     render() {
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
 * This follows a pattern call 'Function as Child Components':
 * https://medium.com/merrickchristensen/function-as-child-components-5f3920a9ace9
 */
import React from "react";

type Props = {
    children: (state: State, handlers: Handlers) => React$Element<*>,
    disabled: boolean,
    href?: string,
    onClick?: (e: SyntheticEvent<>) => void,
};

type State = {
    hovered: boolean,
    focused: boolean,
    pressed: boolean,
};

export type Handlers = {
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
    onBlur: (e: SyntheticFocusEvent<*>) => void,
};

const disabledHandlers = {
    onClick: () => void 0,
    onMouseEnter: () => void 0,
    onMouseLeave: () => void 0,
    onMouseDown: () => void 0,
    onMouseUp: () => void 0,
    onTouchStart: () => void 0,
    onTouchEnd: () => void 0,
    onTouchCancel: () => void 0,
    onKeyDown: () => void 0,
    onKeyUp: () => void 0,
    onBlur: () => void 0,
};

const keyCodes = {
    tab: 9,
    enter: 13,
    space: 32,
};

export default class ClickableBehavior extends React.Component<Props, State> {
    waitingForClick: boolean;
    keyboardClick: boolean;

    static defaultProps = {
        disabled: false,
    };

    constructor(props: Props) {
        super(props);

        this.state = {
            hovered: false,
            focused: false,
            pressed: false,
        };
    }

    handleClick = (e: SyntheticMouseEvent<>) => {
        if (this.props.onClick) {
            this.waitingForClick = false;
            if (this.keyboardClick) {
                e.preventDefault();
                this.keyboardClick = false;
            } else {
                this.props.onClick(e);
            }
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
        this.setState({pressed: false});
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
        if (keyCode === keyCodes.tab) {
            this.setState({focused: false});
        } else if (
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
        if (keyCode === keyCodes.tab) {
            this.setState({focused: true});
        } else if (
            this.props.href
                ? keyCode === keyCodes.enter
                : keyCode === keyCodes.space
        ) {
            this.setState({pressed: false});
            if (this.props.onClick) {
                this.props.onClick(e);
            }
            this.maybeNavigate();
        }
    };

    handleBlur = (e: SyntheticFocusEvent<*>) => {
        this.setState({focused: false, pressed: false});
    };

    maybeNavigate = () => {
        const {href} = this.props;
        if (href) {
            window.location.assign(href);
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
                  onBlur: this.handleBlur,
              };
        const {children} = this.props;
        return children && children(this.state, handlers);
    }
}
