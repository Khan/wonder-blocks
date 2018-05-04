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
 * class MyClickableComponent extends React.Component<Props> {
 *     render() {
 *         return <ClickableBehavior
 *             disabled={this.props.disabled}
 *             onClick={this.onClick}
 *         >
 *             {({hovered}, handlers) =>
 *                 <RoundRect
 *                      textcolor='white'
 *                      backgroundColor={hovered ? 'red' : 'blue'}/>}
 *                      {...handlers}
 *                 >
 *                      {this.props.children}
 *                 </RoundRect>
 *             }
 *         </ClickableBehavior>
 *     }
 * }
 *
 * This follows a pattern call 'Function as Child Components':
 * https://medium.com/merrickchristensen/function-as-child-components-5f3920a9ace9
 */
import React from "react";

type Props = {
    children: (state: State, handlers: Handlers) => React$Element<*>,
    disabled: boolean,
    href?: string,
    onClick?: (e: SyntheticMouseEvent<>) => void,
};

type State = {
    hovered: boolean,
    focused: boolean,
    pressed: boolean,
};

type Handlers = {
    onClick: (e: SyntheticMouseEvent<>) => void,
    onMouseEnter: () => void,
    onMouseLeave: () => void,
    onMouseDown: () => void,
    onMouseUp: () => void,
    onTouchStart: () => void,
    onTouchEnd: () => void,
    onKeyDown: (e: KeyboardEvent) => void,
    onKeyUp: (e: KeyboardEvent) => void,
    onBlur: () => void,
};

const keyCodes = {
    tab: 9,
    enter: 13,
    space: 32,
};

export default class ClickableBehavior extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            hovered: false,
            focused: false,
            pressed: false,
        };
    }

    waitingForClick: boolean;

    handleClick = (e: SyntheticMouseEvent<>) => {
        if (!this.props.disabled && this.props.onClick) {
            this.waitingForClick = false;
            this.props.onClick(e);
        }
    };

    handleMouseEnter = () => {
        if (!this.props.disabled && !this.waitingForClick) {
            this.setState({hovered: true});
        }
    };

    handleMouseLeave = () => {
        if (!this.props.disabled && !this.waitingForClick) {
            // TODO(yejia): Is this what we want for pressed?
            this.setState({hovered: false, pressed: false});
        }
    };

    handleMouseDown = () => {
        if (!this.props.disabled) {
            this.setState({pressed: true});
        }
    };

    handleMouseUp = () => {
        if (!this.props.disabled) {
            this.setState({pressed: false});
        }
    };

    handleTouchStart = () => {
        if (!this.props.disabled) {
            this.setState({pressed: true});
        }
    };

    handleTouchEnd = () => {
        if (!this.props.disabled) {
            this.setState({pressed: false});
            this.waitingForClick = true;
        }
    };

    handleKeyDown = (event: KeyboardEvent) => {
        const keyCode = event.which || event.keyCode;
        const {disabled, href} = this.props;
        if (!disabled) {
            if (keyCode === keyCodes.tab) {
                this.setState({focused: false});
            } else if (
                href ? keyCode === keyCodes.enter : keyCode === keyCodes.space
            ) {
                this.setState({pressed: true});
            }
        }
    };

    handleKeyUp = (event: KeyboardEvent) => {
        const keyCode = event.which || event.keyCode;
        const {disabled, href} = this.props;
        if (!disabled) {
            if (keyCode === keyCodes.tab) {
                this.setState({focused: true});
            } else if (
                href ? keyCode === keyCodes.enter : keyCode === keyCodes.space
            ) {
                this.setState({pressed: false});
            }
        }
    };

    handleBlur = () => {
        if (!this.props.disabled) {
            this.setState({focused: false, pressed: false});
        }
    };

    render() {
        const handlers = {
            onClick: this.handleClick,
            onMouseEnter: this.handleMouseEnter,
            onMouseLeave: this.handleMouseLeave,
            onMouseDown: this.handleMouseDown,
            onMouseUp: this.handleMouseUp,
            onTouchStart: this.handleTouchStart,
            onTouchEnd: this.handleTouchEnd,
            onKeyDown: this.handleKeyDown,
            onKeyUp: this.handleKeyUp,
            onBlur: this.handleBlur,
        };
        const {children} = this.props;
        return children && children(this.state, handlers);
    }
}
