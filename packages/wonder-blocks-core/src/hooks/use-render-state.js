// @flow
import {useContext} from "react";

import {RenderStateContext} from "../components/render-state-context.js";

import type {RenderState} from "../components/render-state-context";

export const useRenderState = (): RenderState => useContext(RenderStateContext);
