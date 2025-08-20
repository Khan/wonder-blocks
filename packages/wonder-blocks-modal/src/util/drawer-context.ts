import * as React from "react";
import type {DrawerAlignment} from "./types";

export interface DrawerContextProps {
    alignment?: DrawerAlignment;
    animated?: boolean;
    isExiting?: boolean;
    timingDuration?: number;
}

export const DrawerContext = React.createContext<DrawerContextProps | null>(
    null,
);

export const useDrawerContext = (): DrawerContextProps => {
    const context = React.useContext(DrawerContext);
    return context || {};
};
