# Application Architecture

This document provides an overview of the architecture for the `post-application`, a single-page application (SPA) built with Angular.

## Table of Contents

- [High-Level Overview](#high-level-overview)
- [Folder Structure](#folder-structure)
- [Component Architecture](#component-architecture)
- [Service Layer](#service-layer)
- [Data Management](#data-management)
- [Styling](#styling)

## High-Level Overview

The application follows a modular, component-based architecture, which is standard for Angular applications. The core principles are:

-   **Modularity:** The application is divided into distinct modules, features, and components, each with a specific responsibility. This promotes separation of concerns and reusability.
-   **Component-Based:** The UI is built as a tree of components, from the root `AppComponent` down to individual UI elements like buttons and cards.
-   **Service-Oriented:** Services are used to encapsulate business logic and data access, making components leaner and more focused on the view.
-   **Single Responsibility:** Each component, service, and helper has a single, well-defined purpose.

## Folder Structure

The `src/app` directory is organized as follows to maintain a clean and scalable codebase:

-   **/core**: Contains core services and single-use modules that are fundamental to the application.
    -   `local-db.ts`: A service for managing data in `localStorage`.
    -   `data.json`: Seed data for initial application setup.

-   **/features**: Contains feature modules, which are self-contained pieces of functionality.
    -   `post-composer/`: The component for creating new posts.

-   **/pages**: Contains "smart" components that represent the main pages of the application. These components are responsible for fetching data and orchestrating interactions between "dumb" UI components.
    -   `feed/`: The main feed page, which displays a list of posts.

-   **/shared**: Contains "dumb" UI components, pipes, and directives that are shared across multiple feature modules.
    -   `header/`: The main application header.
    -   `ui/`: Reusable UI components like `ui-card` and `ui-modal`.

-   **/user**: Contains components related to user-specific features.
    -   `profile-card/`: The component for displaying the user's profile.

-   **/helpers**: Contains helper functions and utilities that can be used throughout the application.
    -   `local-storage.helper.ts`: A safe wrapper for accessing `localStorage`.

## Component Architecture

The component hierarchy is designed to be logical and maintainable:

-   **`AppComponent` (app.ts):** The root component of the application. It acts as the main container for all other components and orchestrates the opening and closing of the profile modal.

-   **`FeedComponent` (pages/feed/):** A "smart" component that fetches and displays the list of posts. It manages the state for search, filter, and sort functionalities and passes data down to the `UiCardComponent`.

-   **`PostComposerComponent` (features/post-composer/):** A feature component responsible for the logic of creating a new post. It includes a form and communicates with the `LocalDbService` to save drafts and new posts.

-   **`ProfileCardComponent` (user/profile-card/):** A component that displays information about the current user and provides an entry point to create a new post.

-   **`UiCardComponent` (shared/ui/ui-card/):** A "dumb" presentational component that displays a single post. It receives data via `@Input()` properties and emits events for user interactions (like and comment) via `@Output()` properties.

-   **`UiModalComponent` (shared/ui/ui-modal/):** A reusable modal component used for displaying content in a dialog, such as the user profile or post composer.

## Service Layer

The service layer is kept lean and focused:

-   **`LocalDbService`:** This service is the single source of truth for all data-related operations. It abstracts the interaction with `localStorage` and provides a clean API for components to get, create, and update data (posts, likes, comments, etc.). This design makes it easier to swap out the data source in the future (e.g., to a real backend API) without having to refactor the components.

## Data Management

Data management is handled client-side for this version of the application:

-   **Initial Data:** On the first load, the application is seeded with initial data from `src/app/core/data.json`.
-   **Runtime Data:** All subsequent data changes (new posts, likes, comments, drafts) are persisted in the browser's `localStorage`.
-   **State:** The state is managed implicitly within the components and the `LocalDbService`. For a more complex application, a dedicated state management library like NgRx or Akita would be recommended to handle state more explicitly and predictably.

## Styling

The application's styling is managed through a combination of:

-   **Angular Material:** Used for theming and some UI components.
-   **Tailwind CSS:** A utility-first CSS framework used for most of the custom styling, allowing for rapid development of responsive layouts.
-   **SCSS:** Used for global styles and component-specific styles where more complex CSS is needed.
-   **Font Awesome:** Integrated for icons.
