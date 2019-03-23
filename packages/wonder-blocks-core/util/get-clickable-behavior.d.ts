/// <reference types="react" />
import ClickableBehavior from "../components/clickable-behavior";
export default function getClickableBehavior(
/**
 * The URL to navigate to.
 */
href?: string, 
/**
 * Should we skip using the react router and go to the page directly.
 */
skipClientNav?: boolean, 
/**
 * router object added to the React context object by react-router-dom.
 */
router?: any): typeof ClickableBehavior | import("react").ComponentClass<Pick<any, string | number | symbol>, any>;
