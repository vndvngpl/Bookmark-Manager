import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Custom URL Validator for Angular Reactive Forms.
 * Validates if the input value is a properly formatted URL.
 *
 * @returns ValidatorFn - A function that takes a form control and returns validation errors or null.
 */
export function URLValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    // Regular expression to validate the URL format
    const urlPattern = new RegExp(
      '^(https?:\\/\\/)' + // Match the protocol (http or https)
        '((([a-zA-Z0-9\\-]+\\.)+[a-zA-Z]{2,})|' + // Match domain names (e.g., example.com)
        'localhost|' + // Match localhost
        '\\d{1,3}(\\.\\d{1,3}){3})' + // Match IPv4 addresses (e.g., 192.168.1.1)
        '(\\:\\d+)?' + // Match optional port numbers (e.g., :8080)
        '(\\/[-a-zA-Z0-9@:%_+.~#?&//=]*)?$' // Match paths, query strings, and fragments
    );

    const value = control.value; // Get the value of the form control

    // Allow empty input; an empty value is not considered invalid
    if (!value) return null;

    // Test the value against the URL pattern
    const isValid = urlPattern.test(value);

    // Return null if the URL is valid, otherwise return a validation error object
    return isValid ? null : { invalidUrl: { value: control.value } };
  };
}
