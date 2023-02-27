/**
 * Packages flow types with build files.
 *
 * Generates dist/index.js.flow in each package which exports everything within
 * index.js.  Published npm packages need to include all source files for the
 * flow types to work in projects that consume the packages.
 */
declare const path: any;
declare const fs: any;
