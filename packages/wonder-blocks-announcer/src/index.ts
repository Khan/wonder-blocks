import {initAnnouncer} from "./init-announcer";
import {announceMessage} from "./announce-message";
import {clearMessages} from "./clear-messages";
import type {AnnounceMessageProps} from "./announce-message";

// Layer Root utilities
import {
    LayerRoot,
    useLayerRoot,
    useLayerRootModalState,
} from "./components/layer-root";
import {
    findOrCreateLayerRoot,
    getLayerRootElement,
    setLayerRootModalState,
    getLayerRootModalState,
    useLayerRootTarget,
    removeLayerRoot,
    LAYER_ROOT_ID,
    LAYER_ROOT_TESTID,
} from "./util/manage-layer-root";

export {
    initAnnouncer,
    announceMessage,
    clearMessages,
    // Layer Root
    LayerRoot,
    useLayerRoot,
    useLayerRootModalState,
    findOrCreateLayerRoot,
    getLayerRootElement,
    setLayerRootModalState,
    getLayerRootModalState,
    useLayerRootTarget,
    removeLayerRoot,
    LAYER_ROOT_ID,
    LAYER_ROOT_TESTID,
};

export {type AnnounceMessageProps};
