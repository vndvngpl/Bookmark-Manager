import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookmarkService {
  constructor() {}

  /**
   * Retrieves all bookmarks stored in localStorage.
   * @returns Observable<any> - An observable containing the list of bookmarks as a JSON string.
   */
  getAllBookmarks(): Observable<any> {
    // Fetch bookmarks from localStorage and return as an observable
    return of(localStorage.getItem('BOOKMARKS'));
  }

  /**
   * Adds a new bookmark to the list stored in localStorage.
   * @param newBookmark - The bookmark object to be added.
   * @returns Observable<any> - An observable containing a success response.
   */
  addNewBookmark(newBookmark: Object): Observable<any> {
    // Retrieve the existing bookmarks from localStorage
    let arr = localStorage.getItem('BOOKMARKS');
    // Parse the bookmarks or initialize an empty array if none exist
    let currentArray = arr != null ? JSON.parse(arr) : [];
    // Add the new bookmark to the array
    currentArray.push(newBookmark);
    // Save the updated array back to localStorage
    localStorage.setItem('BOOKMARKS', JSON.stringify(currentArray));
    // Return a success response as an observable
    return of({ status: 200, response: 'New Bookmark Added!' });
  }

  /**
   * Validates if the given URL is in a valid format.
   * @param url - The URL to validate.
   * @returns Observable<boolean> - Returns an observable that emits `true` if the URL is valid, otherwise `false`.
   */
  isValidUrl(url: string): Observable<boolean> {
    // Check if the URL is empty or does not match the valid URL format
    if (!url || !this.isUrlFormatValid(url)) {
      return of(false); // Emit `false` if the URL is invalid
    }

    // Emit `true` if the URL is valid
    return of(true);
  }

  /**
   * Validates the format of a given URL using a regular expression.
   * @param url - The URL to validate.
   * @returns boolean - Returns `true` if the URL format is valid, otherwise `false`.
   */
  private isUrlFormatValid(url: string): boolean {
    // Regular expression to validate the URL format
    const urlPattern = new RegExp(
      '^(https?:\\/\\/)' + // Match the protocol (http or https)
        '((([a-zA-Z0-9\\-]+\\.)+[a-zA-Z]{2,})|' + // Match domain names (e.g., example.com)
        'localhost|' + // Match localhost
        '\\d{1,3}(\\.\\d{1,3}){3})' + // Match IPv4 addresses (e.g., 192.168.1.1)
        '(\\:\\d+)?' + // Match optional port numbers (e.g., :8080)
        '(\\/[-a-zA-Z0-9@:%_+.~#?&//=]*)?$' // Match paths, query strings, and fragments
    );

    // Test the given URL against the regular expression and return the result
    return urlPattern.test(url);
  }

  /**
   * Deletes a bookmark from localStorage by its ID.
   * @param id - The ID of the bookmark to delete.
   * @returns Observable<any> - An observable containing a success response.
   */
  deleteBookmark(id: number): Observable<any> {
    // Retrieve the existing bookmarks from localStorage
    let arr = localStorage.getItem('BOOKMARKS');

    // Parse the bookmarks or initialize an empty array if none exist
    let currentArray = arr != null ? JSON.parse(arr) : [];

    // Filter out the bookmark with the given ID
    currentArray = currentArray.filter((item: any) => item.id !== id);

    // Save the updated array back to localStorage
    localStorage.setItem('BOOKMARKS', JSON.stringify(currentArray));

    // Return a success response as an observable
    return of({ status: 200, response: 'Bookmark Deleted!' });
  }
}
