# Post Application

A social-feed style Angular app with posts, likes, comments and drafts, all persisted in the browser.

![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Angular Material](https://img.shields.io/badge/Angular_Material-3F51B5?style=for-the-badge&logo=angular&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)

This project is a social media-like application built with Angular, designed to showcase a feed of posts, allow users to create new posts, and manage basic user interactions like liking and commenting. It demonstrates modern Angular development practices, state management with local storage, and integration with UI component libraries.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Setup](#setup)
- [Running the Application](#running-the-application)
- [Build](#build)
- [Running Tests](#running-tests)
- [Further Help](#further-help)
- [Author](#author)

## Features

- **Dynamic Feed:** Displays a list of posts with text search over titles and bodies, filtering by team, and sorting by newest or oldest (a "Most Popular" option is present in the UI but currently sorts the same as oldest).
- **Post Composer:** Lets the current user (seeded from `data.json`; there is no login) create new posts with a title, body, tags, and mood. Supports draft saving and loading.
- **User Profile:** Shows basic user information and provides access to the post composer.
- **Post Interactions:** Users can like/unlike posts and add comments. Audio feedback is provided for these interactions.
- **Local Data Management:** Utilizes browser's `localStorage` for persistent storage of posts, likes, comments, and user drafts.
- **Responsive UI:** Built with Angular Material and Tailwind CSS for a modern and adaptive user interface.
- **Theming:** Integrated Angular Material theming.
- **Seed Data:** On first load, posts and the current user are seeded into `localStorage` from `src/app/core/data.json`.
- **Server-Side Rendering:** Angular SSR with an Express server (`src/server.ts`).

## Technologies Used

- **Framework:** Angular 21
- **UI Libraries:**
  - Angular Material
  - MUI (Material-UI) and Emotion are listed as dependencies but not used in the current source
- **Styling:** Tailwind CSS, PostCSS
- **State Management:** Local Storage (`localStorage`)
- **Server:** Express.js (for Angular SSR)
- **Testing:** Vitest
- **Language:** TypeScript
- **Package Manager:** npm

## Project Structure

```
src/
├── app/
│   ├── core/             # LocalDbService (localStorage CRUD) and data.json seed data
│   ├── features/         # post-composer
│   ├── pages/            # feed (search, filter, sort)
│   ├── shared/           # header, ui-card, ui-modal
│   └── user/             # profile-card
├── helpers/              # SSR-safe localStorage wrapper
├── main.ts, main.server.ts, server.ts
public/assets/sounds/     # like.mp3, comment.mp3
```

See [Architecture.md](Architecture.md) for a deeper walkthrough.

## Setup

To get a local copy up and running, follow these simple steps.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/aryanbha123/angular-postapp.git
    cd angular-postapp
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

## Author

**Aryan Bhandari**: [GitHub](https://github.com/aryanbha123)
