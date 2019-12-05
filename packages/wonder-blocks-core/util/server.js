// @flow
let serverSide = false;

export default {
    /**
     * Check if we are running in server-side mode.
     *
     * @returns {boolean} `true` if we are in server-side mode; otherwise,
     * `false`
     */
    isServerSide: () => serverSide,

    /**
     * Set server-side mode to true.
     */
    setServerSide: () => {
        serverSide = true;
    },
};
