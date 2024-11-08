/**
 * Checks if a value is a valid email and returns an error message if it is invalid.
 * @param value the email to validate
 * @returns An error message if there is a validation error
 */
export const validateEmail = (value: string) => {
    const emailRegex = /^[^@\s]+@[^@\s.]+\.[^@.\s]+$/;
    if (!emailRegex.test(value)) {
        return "Please enter a valid email";
    }
};

/**
 * Checks if a value is a valid phone number and returns an error message if it is invalid.
 * @param value the phone number to validate
 * @returns An error message if there is a validation error
 */

export const validatePhoneNumber = (value: string) => {
    const telRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (!telRegex.test(value)) {
        return "Invalid US telephone number";
    }
};
