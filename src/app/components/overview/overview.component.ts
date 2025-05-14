import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { URLValidator } from '../../core/validators/url-validator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BookmarkService } from '../../core/services/bookmark.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSort, MatSortable, MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  imports: [
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatPaginator,
    MatSnackBarModule,
    CommonModule,
    MatSortModule,
  ],
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements AfterViewInit {
  // Snackbar for notifications
  private _snackBar = inject(MatSnackBar);

  // Array to store bookmarks
  bookmarks: any[] = [];

  // Flag to disable the save button
  isDisabled: boolean = false;

  // Categories for the dropdown
  categories = [
    'Technology',
    'Education',
    'Health & Fitness',
    'Travel',
    'Finance',
    'Entertainment',
    'Cooking & Recipes',
    'Fashion & Lifestyle',
    'News & Media',
    'Productivity Tools',
  ];

  // Reactive form for bookmark input
  bookmarkForm = new FormGroup({
    urlFormControl: new FormControl('', [Validators.required, URLValidator()]), // URL field with validation
    categoryFormControl: new FormControl('', [Validators.required]), // Category field with validation
  });

  // Material Table Data Source
  dataSource = new MatTableDataSource<any>();

  // Columns to display in the table
  displayedColumns: string[] = ['url', 'category', 'createdOn', 'actions'];

  // ViewChild for paginator and sort
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _service: BookmarkService, private router: Router) {
    // Load bookmarks on component initialization
    this.loadBookmarks();
  }

  /**
   * Lifecycle hook that runs after the view is initialized.
   * Sets up the paginator and sorting for the table.
   */
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator; // Attach paginator to the table
    this.dataSource.sort = this.sort; // Attach sorting to the table
    this.sort.sort(<MatSortable>{ id: 'createdOn', start: 'desc' }); // Default sort by 'createdOn' in descending order
  }

  /**
   * Loads bookmarks from the service and updates the table data source.
   */
  loadBookmarks(): void {
    this._service.getAllBookmarks().subscribe((bookmarks) => {
      this.bookmarks = bookmarks ? JSON.parse(bookmarks) : [];
      this.dataSource.data = this.bookmarks; // Update the table data source
    });
  }

  /**
   * Adds a new bookmark using the form data.
   * Displays a success or error message using the snackbar.
   */
  addBookmarks(): void {
    this.loadBookmarks(); // Reload bookmarks to ensure the latest data is displayed
    if (this.bookmarkForm.valid) {
      const newBookmark = {
        id: this.bookmarks[this.bookmarks?.length - 1].id + 1, //set ID as latest value's ID + 1
        url: this.bookmarkForm.controls['urlFormControl'].value,
        category: this.bookmarkForm.controls['categoryFormControl'].value,
        createdOn: new Date().toISOString(),
      };

      this._service.addNewBookmark(newBookmark).subscribe((response) => {
        if (response.status === 200) {
          this._snackBar.open(response?.response, 'Close', { duration: 3000 });
          this.router.navigate([
            '/result',
            newBookmark?.createdOn,
            newBookmark?.url,
            newBookmark?.category,
          ]);
          this.bookmarkForm.reset(); // Reset the form
        }
      });
    } else {
      this._snackBar.open('Please fill out the form correctly.', 'Close', {
        duration: 3000,
      });
    }
  }

  /**
   * Deletes a bookmark and reloads the table data.
   * @param bookmark - The bookmark to delete.
   */
  deleteBookmark(bookmark: any): void {
    this._service.deleteBookmark(bookmark.id).subscribe((response) => {
      if (response.status === 200) {
        this._snackBar.open(response.response, 'Close', { duration: 3000 });
        this.loadBookmarks(); // Reload bookmarks after deletion
      }
    });
  }

  /**
   * Opens a bookmark URL in a new tab.
   * @param bookmark - The bookmark to open.
   */
  openLink(bookmark: any): void {
    window.open(bookmark.url, '_blank');
  }
}
