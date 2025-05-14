import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-result', // Component selector used in templates
  imports: [MatCardModule, MatIconModule, CommonModule], // modules used in the component
  templateUrl: './result.component.html', // Path to the HTML template
  styleUrl: './result.component.scss', // Path to the SCSS file for styling
})
export class ResultComponent {
  bookmarkDetails: any; // Object to store bookmark details (URL, category, and created date)

  constructor(private router: Router, private route: ActivatedRoute) {
    // Injects Router for navigation and ActivatedRoute to access route parameters
  }

  /**
   * Lifecycle hook that runs after the component is initialized.
   * Retrieves bookmark details from the route parameters.
   */
  ngOnInit(): void {
    this.bookmarkDetails = {
      url: this.route.snapshot.paramMap.get('url'), // Get the 'url' parameter from the route
      createdOn: this.route.snapshot.paramMap.get('createdOn'), // Get the 'createdOn' parameter from the route
      category: this.route.snapshot.paramMap.get('category'), // Get the 'category' parameter from the route
    };
  }

  /**
   * Navigates back to the Overview Page.
   * Triggered when the "Go Back" button is clicked.
   */
  navigateBack(): void {
    this.router.navigate(['/']); // Navigate to the root route (Overview Page)
  }
}
