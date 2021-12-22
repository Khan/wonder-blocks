// @flow
import * as React from "react";

import type {Typography} from "@khanacademy/wonder-blocks-typography";

/**
 * A subset of CSS Properties to allow overriding some of the default styles set
 * on the accessory wrapper (loosely based on StyleType).
 */
export type AccessoryStyle = {|
    /**
     * A subset of valid Spacing values.
     */
    minWidth?: 16 | 24 | 32 | 48,

    /**
     * To vertically align the accessory.
     */
    alignSelf?: "flex-start" | "flex-end" | "center",

    /**
     * To horizontally align the accessory.
     */
    justifyContent?: "flex-start" | "flex-end" | "center",
|};

/**
 * A union that allows using  plain text or WB Typography elements.
 */
type TypographyText = string | React.Element<Typography>;

/**
 * Common properties for all cells.
 */
type SharedProps = {|
    /**
     * The title / main content of the cell. You can either provide a string or
     * a Typography component.
     */
    title: TypographyText,
|};

/**
 * We define these props as a union to enforce that `leftAccessoryStyle` and/or
 * `rightAccessoryStyle` are passed in only if `leftAccessory` and/or
 * `rightAccessory` are set.
 */
export type CellProps =
    /**
     * leftAccessory
     */
    | {|
          ...SharedProps,
          leftAccessory?: React.Node,
      |}

    /**
     * leftAccessory(+style)
     */
    | {|
          ...SharedProps,
          leftAccessory: React.Node,
          leftAccessoryStyle: AccessoryStyle | typeof undefined,
      |}

    /**
     * rightAccessory
     */
    | {|
          ...SharedProps,
          rightAccessory?: React.Node,
      |}

    /**
     * rightAccessory(+style)
     */
    | {|
          ...SharedProps,
          rightAccessory: React.Node,
          rightAccessoryStyle: AccessoryStyle | typeof undefined,
      |}

    /**
     * leftAccessory(+style) + rightAccessory
     */
    | {|
          ...SharedProps,
          leftAccessory: React.Node,
          leftAccessoryStyle: AccessoryStyle | typeof undefined,
          rightAccessory: React.Node,
      |}

    /**
     * leftAccessory + rightAccessory(+style)
     */
    | {|
          ...SharedProps,
          leftAccessory: React.Node,
          rightAccessory: React.Node,
          rightAccessoryStyle: AccessoryStyle | typeof undefined,
      |}

    /**
     * leftAccessory(+style) + rightAccessory(+style)
     */
    | {|
          ...SharedProps,
          /**
           * If provided, this adds a left accessory to the cell. Left
           * Accessories can be defined using WB components such as Icon,
           * IconButton, or it can even be used for a custom node/component if
           * needed. What ever is passed in will occupy the "LeftAccessory” area
           * of the Cell.
           */
          leftAccessory: React.Node,

          /**
           * Optional custom styles applied to the leftAccessory wrapper. For
           * example, it can be used to set a custom minWidth or a custom
           * alignment.
           *
           * NOTE: leftAccessoryStyle can only be used if leftAccessory is set.
           */
          leftAccessoryStyle: AccessoryStyle | typeof undefined,

          /**
           * If provided, this adds a right accessory to the cell. Right
           * Accessories can be defined using WB components such as Icon,
           * IconButton, or it can even be used for a custom node/component if
           * needed. What ever is passed in will occupy the “RightAccessory”
           * area of the Cell.
           */
          rightAccessory: React.Node,

          /**
           * Optional custom styles applied to the rightAccessory wrapper. For
           * example, it can be used to set a custom minWidth or a custom
           * alignment.
           *
           * NOTE: rightAccessoryStyle can only be used if rightAccessory is
           * set.
           */
          rightAccessoryStyle: AccessoryStyle | typeof undefined,
      |};
