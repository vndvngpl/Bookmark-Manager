import { Routes } from '@angular/router'; // Import Angular Router's Routes type
import { MainComponent } from './components/main/main.component'; // Main layout component
import { OverviewComponent } from './components/overview/overview.component'; // Overview page component
import { ResultComponent } from './components/result/result.component'; // Result page component

// Define the application's routes
export const routes: Routes = [
  {
    path: '', // Root path
    component: MainComponent, // Main layout component for the root path
    title: 'Main', // Title for the root path
    children: [
      {
        path: 'overview', // Path for the Overview page
        component: OverviewComponent, // Component to render for the Overview page
        title: 'Overview', // Title for the Overview page
      },
      {
        path: 'result/:createdOn/:url/:category', // Path for the Result page with route parameters
        component: ResultComponent, // Component to render for the Result page
        title: 'Result', // Title for the Result page
      },
      {
        path: '', // Default child route
        redirectTo: 'overview', // Redirect to the Overview page
        pathMatch: 'full', // Match the full path
      },
    ],
  },
  {
    path: '**', // Wildcard route for undefined paths
    redirectTo: '', // Redirect to the root path
  },
];
