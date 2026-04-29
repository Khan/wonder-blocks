import type {ArgTypes} from "@storybook/react-vite";

/**
 * Shared Storybook argTypes that hides all props in the `EventHandlers` type
 * from `@khanacademy/wonder-blocks-core` from the Storybook docs.
 *
 * This is something we need to include to avoid overloading the Storybook docs
 * with all of the event handlers. Component specific event handler argtypes
 * can be configured where relevant to override this behaviour so that certain
 * handlers are intentionally included in the docs.
 *
 * @example
 * import EventHandlersArgTypes from "../wonder-blocks-core/event-handlers.argtypes";
 *
 * export default {
 *     argTypes: {
 *         ...EventHandlersArgTypes,
 *         ...componentArgTypes,
 *         onClick: { // intentionally configure onClick arg type for the component },
 *     },
 * } as Meta<typeof Component>;
 */
const EventHandlersArgTypes = {
    // MouseEvents
    onMouseDown: {table: {disable: true}},
    onMouseUp: {table: {disable: true}},
    onMouseMove: {table: {disable: true}},
    onClick: {table: {disable: true}},
    onDoubleClick: {table: {disable: true}},
    onMouseEnter: {table: {disable: true}},
    onMouseLeave: {table: {disable: true}},
    onMouseOut: {table: {disable: true}},
    onMouseOver: {table: {disable: true}},
    onDrag: {table: {disable: true}},
    onDragEnd: {table: {disable: true}},
    onDragEnter: {table: {disable: true}},
    onDragExit: {table: {disable: true}},
    onDragLeave: {table: {disable: true}},
    onDragOver: {table: {disable: true}},
    onDragStart: {table: {disable: true}},
    onDrop: {table: {disable: true}},
    // KeyboardEvents
    onKeyDown: {table: {disable: true}},
    onKeyPress: {table: {disable: true}},
    onKeyUp: {table: {disable: true}},
    // InputEvents
    onChange: {table: {disable: true}},
    onInput: {table: {disable: true}},
    onInvalid: {table: {disable: true}},
    onSubmit: {table: {disable: true}},
    // TouchEvents
    onTouchCancel: {table: {disable: true}},
    onTouchEnd: {table: {disable: true}},
    onTouchMove: {table: {disable: true}},
    onTouchStart: {table: {disable: true}},
    // FocusEvents
    onFocus: {table: {disable: true}},
    onBlur: {table: {disable: true}},
} satisfies ArgTypes;

export default EventHandlersArgTypes;
