import { FormControl } from '@angular/forms';
import { URLValidator } from './url-validator';

describe('URLValidator', () => {
  const validator = URLValidator();

  // Test case: Valid URL
  it('should return null for a valid URL', () => {
    const control = new FormControl('https://example.com');
    const result = validator(control);
    expect(result).toBeNull(); // Valid URL should return null
  });

  // Test case: Invalid URL
  it('should return an error object for an invalid URL', () => {
    const control = new FormControl('invalid-url');
    const result = validator(control);
    expect(result).toEqual({ invalidUrl: { value: 'invalid-url' } }); // Invalid URL should return an error object
  });

  // Test case: Empty value
  it('should return null for an empty value', () => {
    const control = new FormControl('');
    const result = validator(control);
    expect(result).toBeNull(); // Empty value should return null
  });

  // Test case: URL with localhost
  it('should return null for a localhost URL', () => {
    const control = new FormControl('http://localhost:4200');
    const result = validator(control);
    expect(result).toBeNull(); // Localhost URL should return null
  });

  // Test case: URL with IPv4 address
  it('should return null for a URL with an IPv4 address', () => {
    const control = new FormControl('http://192.168.1.1:8080');
    const result = validator(control);
    expect(result).toBeNull(); // IPv4 URL should return null
  });

  // Test case: URL with query parameters
  it('should return null for a URL with query parameters', () => {
    const control = new FormControl('https://example.com?query=123');
    const result = validator(control);
    expect(result).toBeNull(); // URL with query parameters should return null
  });

  // Test case: URL with path and fragment
  it('should return null for a URL with a path and fragment', () => {
    const control = new FormControl('https://example.com/path#fragment');
    const result = validator(control);
    expect(result).toBeNull(); // URL with path and fragment should return null
  });

  // Test case: Invalid protocol
  it('should return an error object for a URL with an invalid protocol', () => {
    const control = new FormControl('ftp://example.com');
    const result = validator(control);
    expect(result).toEqual({ invalidUrl: { value: 'ftp://example.com' } }); // Invalid protocol should return an error object
  });
});
