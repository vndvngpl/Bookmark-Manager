import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OverviewComponent } from './overview.component';
import { BookmarkService } from '../../core/services/bookmark.service';
import { of } from 'rxjs';

describe('OverviewComponent', () => {
  let component: OverviewComponent;
  let fixture: ComponentFixture<OverviewComponent>;
  let bookmarkServiceSpy: jasmine.SpyObj<BookmarkService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('BookmarkService', [
      'getAllBookmarks',
      'addNewBookmark',
      'deleteBookmark',
    ]);

    await TestBed.configureTestingModule({
      declarations: [OverviewComponent],
      imports: [
        ReactiveFormsModule,
        MatTableModule,
        MatPaginatorModule,
        MatButtonModule,
        MatIconModule,
        MatSnackBarModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        BrowserAnimationsModule,
      ],
      providers: [{ provide: BookmarkService, useValue: spy }],
    }).compileComponents();

    fixture = TestBed.createComponent(OverviewComponent);
    component = fixture.componentInstance;
    bookmarkServiceSpy = TestBed.inject(
      BookmarkService
    ) as jasmine.SpyObj<BookmarkService>;

    // Mock the getAllBookmarks response
    bookmarkServiceSpy.getAllBookmarks.and.returnValue(of([]));
    fixture.detectChanges();
  });

  // Test to check if the component is created
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test to check if the form is invalid when empty
  it('should have an invalid form when empty', () => {
    expect(component.bookmarkForm.valid).toBeFalse();
  });

  // Test to check if the form is valid when filled correctly
  it('should have a valid form when filled correctly', () => {
    component.bookmarkForm.controls['urlFormControl'].setValue(
      'https://example.com'
    );
    component.bookmarkForm.controls['categoryFormControl'].setValue('Tech');
    expect(component.bookmarkForm.valid).toBeTrue();
  });

  // Test to check if addBookmarks() calls the service and reloads bookmarks
  it('should call addNewBookmark() and reload bookmarks when addBookmarks() is called', () => {
    const newBookmark = {
      url: 'https://example.com',
      category: 'Tech',
      createdOn: new Date().toISOString(),
    };

    bookmarkServiceSpy.addNewBookmark.and.returnValue(
      of({ status: 200, response: 'New Bookmark Added!' })
    );

    component.bookmarkForm.controls['urlFormControl'].setValue(newBookmark.url);
    component.bookmarkForm.controls['categoryFormControl'].setValue(
      newBookmark.category
    );

    component.addBookmarks();

    expect(bookmarkServiceSpy.addNewBookmark).toHaveBeenCalledWith(newBookmark);
    expect(bookmarkServiceSpy.getAllBookmarks).toHaveBeenCalled();
  });

  // Test to check if deleteBookmark() calls the service and reloads bookmarks
  it('should call deleteBookmark() and reload bookmarks when deleteBookmark() is called', () => {
    const bookmarkToDelete = {
      id: 1,
      url: 'https://example.com',
      category: 'Tech',
    };

    bookmarkServiceSpy.deleteBookmark.and.returnValue(
      of({ status: 200, response: 'Bookmark Deleted!' })
    );

    component.deleteBookmark(bookmarkToDelete);

    expect(bookmarkServiceSpy.deleteBookmark).toHaveBeenCalledWith(
      bookmarkToDelete.id
    );
    expect(bookmarkServiceSpy.getAllBookmarks).toHaveBeenCalled();
  });

  // Test to check if the table displays data correctly
  it('should display data in the table', () => {
    const mockBookmarks = [
      { url: 'https://example.com', category: 'Tech', createdOn: '2023-01-01' },
    ];

    bookmarkServiceSpy.getAllBookmarks.and.returnValue(of(mockBookmarks));
    component.loadBookmarks();
    fixture.detectChanges();

    const tableRows = fixture.debugElement.nativeElement.querySelectorAll('tr');
    expect(tableRows.length).toBe(2); // One header row + one data row
    const firstRowCells = tableRows[1].querySelectorAll('td');
    expect(firstRowCells[0].textContent).toContain('https://example.com');
    expect(firstRowCells[1].textContent).toContain('Tech');
    expect(firstRowCells[2].textContent).toContain('2023-01-01');
  });

  // Test to check if the "Go Back" button is displayed
  it('should display the "Go Back" button', () => {
    const saveButton =
      fixture.debugElement.nativeElement.querySelector('button');
    expect(saveButton).toBeTruthy();
  });
});
