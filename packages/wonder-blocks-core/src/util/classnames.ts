type ClassValue = string | undefined | null | false;

/**
 * Utility function to join class names together, filtering out falsy values.
 *
 * @example
 * cx("class1", isActive && "active", "class3")
 * // Returns: "class1 active class3" if isActive is true
 * // Returns: "class1 class3" if isActive is false
 */
export function cx(...classes: ClassValue[]): string {
    return classes.filter(Boolean).join(" ");
}
