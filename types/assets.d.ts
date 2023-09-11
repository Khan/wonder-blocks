/**
 * Modern JavaScript bundlers support importing non-JavaScript files.  This
 * file adds placeholder types for each of these types so that TypeScript
 * doesn't complain about these imports.
 */
declare module "*.jpg";
declare module "*.png";
declare module "*.svg";
