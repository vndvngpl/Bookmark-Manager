# Bookmark Manager

## Bookmark Manager is a web application designed to help users save, organize, and manage their bookmarks efficiently. Built with Angular, it provides a clean and responsive interface for managing bookmarks with categories, search functionality, and more.

**Technologies Used**

- Frontend: Angular, Angular Material
- Styling: SCSS, Google Fonts
- Routing: Angular Router
- Validation: Angular Reactive Forms, Custom Validations
- Icons: Material Icons

---

**Limitations**

It is hard to validate the URL that if it exist or not. The technical way to do it is by sending an HTTP HEAD request to the URL and check the progress of the request and validate the response code. But now a days most of the servers disable the cross platform API calls and browsers restricts them by CORS Error. 
So validating the URLs existance is a limitation for this application. There is a way to do it through third party packages which requires purchasing license and using their the API_KEY.
or the easier way is to do it through Backend Application.

---

# Usage

**Adding a Bookmark**

1. Navigate to the Overview page.
2. Enter a valid URL and select a category.
3. Click the Save button to add the bookmark.
4. Navigate to the Result page to view information about a saved bookmark.

**Viewing Bookmarks**

1. Saved bookmarks are displayed in a table with columns for URL, category, and creation date.
2. Use the pagination and sorting features to manage large lists of bookmarks.

**Deleting a Bookmark**

1. Click the Delete button in the table to remove a bookmark.
2. Viewing Bookmark Details

---

## Features

- **Add Bookmarks**: Save URLs with categories and timestamps.
- **View Bookmarks**: Display saved bookmarks in a table with sorting and pagination.
- **Delete Bookmarks**: Remove bookmarks you no longer need.
- **Responsive Design**: Works seamlessly on desktop and mobile devices.
- **Category Management**: Organize bookmarks into predefined categories.
- **Validation**: Ensures valid URLs and required fields before saving.
- **Routing**: Navigate between pages like Overview and Result.

---

## Project Structure

BookmarkManager/
├── src/
│ ├── app/
│ │ ├── components/
│ │ │ ├── main/ # Main layout component
│ │ │ ├── overview/ # Overview page component
│ │ │ ├── result/ # Result page component
│ │ ├── core/
│ │ │ ├── services/ # Bookmark service
│ │ │ ├── validators/ # Custom validators
│ │ ├── shared/ layout
│ │ │ ├── header/ # Header component
│ │ │ ├── footer/ # Footer component
│ │ ├── app.routes.ts # Application routes
│ ├── index.html # Entry point for the application
│ ├── main.ts # Main entry point for Angular
│ ├── main.server.ts # Server-side entry point

---

## Installation

Follow these steps to set up the project locally:

1. **Clone the Repository**:
   git clone https://github.com/vndvngpl/bookmark-manager.git
   cd bookmark-manager

2. **Install Dependencies**:
   npm install

3. **Run the Application**:
   ng serve

---

**Deployment**
To build the project for production, run:
ng build --prod
