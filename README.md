# Post Application

This project is a social media-like application built with Angular, designed to showcase a feed of posts, allow users to create new posts, and manage basic user interactions like liking and commenting. It demonstrates modern Angular development practices, state management with local storage, and integration with UI component libraries.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup](#setup)
- [Running the Application](#running-the-application)
- [Build](#build)
- [Running Tests](#running-tests)
- [Further Help](#further-help)

## Features

- **Dynamic Feed:** Displays a list of posts with options for searching, filtering by team, and sorting (newest, oldest, most popular).
- **Post Composer:** Allows authenticated users to create new posts with a title, body, tags, and mood. Supports draft saving and loading.
- **User Profile:** Shows basic user information and provides access to the post composer.
- **Post Interactions:** Users can like/unlike posts and add comments. Audio feedback is provided for these interactions.
- **Local Data Management:** Utilizes browser's `localStorage` for persistent storage of posts, likes, comments, and user drafts.
- **Responsive UI:** Built with Angular Material and Tailwind CSS for a modern and adaptive user interface.
- **Theming:** Integrated Angular Material theming.

## Technologies Used

- **Framework:** Angular 21
- **UI Libraries:**
  - Angular Material
  - MUI (Material-UI)
  - Emotion (for styling with MUI)
- **Styling:** Tailwind CSS, PostCSS
- **State Management:** Local Storage (`localStorage`)
- **Backend (Development):** Express.js (for server-side rendering setup)
- **Testing:** Vitest
- **Language:** TypeScript
- **Package Manager:** npm

## Setup

To get a local copy up and running, follow these simple steps.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/post-application.git
    cd post-application
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```

## Running the Application

To run the application in development mode with live-reloading:

```bash
npm start
```

Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

To build the project for production:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

To run the server-side rendered (SSR) version of the application:

```bash
npm run serve:ssr:post-application
```

## Running Tests

To execute the unit tests via Vitest:

```bash
npm test
```

## Further Help

For more detailed information on Angular, you can refer to:

-   [Angular Documentation](https://angular.dev/)
-   [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli)
-   [Angular Material Documentation](https://material.angular.io/)
-   [Tailwind CSS Documentation](https://tailwindcss.com/)
-   [MUI Documentation](https://mui.com/)