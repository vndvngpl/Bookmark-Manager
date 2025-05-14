import { TestBed } from '@angular/core/testing';
import { BookmarkService } from './bookmark.service';

describe('BookmarkService', () => {
  let service: BookmarkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookmarkService);
    localStorage.clear(); // Clear localStorage before each test to ensure a clean state
  });

  // Test to check if the service is created
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Test for getAllBookmarks
  it('should retrieve all bookmarks from localStorage', () => {
    const mockBookmarks = JSON.stringify([
      { id: 1, url: 'https://example.com', category: 'Tech' },
    ]);
    localStorage.setItem('BOOKMARKS', mockBookmarks);

    service.getAllBookmarks().subscribe((bookmarks) => {
      expect(bookmarks).toEqual(mockBookmarks);
    });
  });

  // Test for addNewBookmark
  it('should add a new bookmark to localStorage', () => {
    const newBookmark = { id: 1, url: 'https://example.com', category: 'Tech' };

    service.addNewBookmark(newBookmark).subscribe((response) => {
      expect(response.status).toBe(200);
      expect(response.response).toBe('New Bookmark Added!');

      const storedBookmarks = JSON.parse(
        localStorage.getItem('BOOKMARKS') || '[]'
      );
      expect(storedBookmarks.length).toBe(1);
      expect(storedBookmarks[0]).toEqual(newBookmark);
    });
  });

  // Test for deleteBookmark
  it('should delete a bookmark from localStorage by ID', () => {
    const mockBookmarks = [
      { id: 1, url: 'https://example.com', category: 'Tech' },
      { id: 2, url: 'https://example.org', category: 'Education' },
    ];
    localStorage.setItem('BOOKMARKS', JSON.stringify(mockBookmarks));

    service.deleteBookmark(1).subscribe((response) => {
      expect(response.status).toBe(200);
      expect(response.response).toBe('Bookmark Deleted!');

      const storedBookmarks = JSON.parse(
        localStorage.getItem('BOOKMARKS') || '[]'
      );
      expect(storedBookmarks.length).toBe(1);
      expect(storedBookmarks[0].id).toBe(2);
    });
  });

  // Test for isValidUrl
  it('should validate a correctly formatted URL', () => {
    service.isValidUrl('https://example.com').subscribe((isValid) => {
      expect(isValid).toBeTrue();
    });
  });

  it('should invalidate an incorrectly formatted URL', () => {
    service.isValidUrl('invalid-url').subscribe((isValid) => {
      expect(isValid).toBeFalse();
    });
  });
});
