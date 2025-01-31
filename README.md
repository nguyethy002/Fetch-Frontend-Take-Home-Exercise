
# Fetch Frontend Take-Home Exercise

Welcome to the Fetch Frontend Take-Home Exercise! This project helps dog lovers search through a database of shelter dogs to find the perfect match for adoption.

## Overview

In this project, you will:

- Build a website that allows users to log in with their name and email.
- Fetch and display shelter dogs using an API.
- Enable users to filter dogs by breed and sort them alphabetically.
- Allow users to add dogs to a favorites list and generate a match based on their favorites.

### Key Features

- **Login Screen**: Collects the user's name and email.
- **Search Page**:
  - Filter dogs by breed.
  - Paginate results.
  - Sort dogs alphabetically by breed (ascending or descending).
  - Display all fields of the dog object (except for the ID).
  - Add dogs to a favorites list.
- **Match Generation**: Once dogs are added to favorites, a match will be generated based on the favorited dog IDs.

## Setup Instructions

Follow these steps to set up the project locally:

### 1. Clone the Repository

Start by cloning the repository:

```bash
git clone <repo_url>
cd <repo_directory>
```

### 2. Install Dependencies

Install the project dependencies using npm:

```bash
npm install
```

### 3. Run the App Locally

To run the development server locally:

```bash
npm run dev
```

Then, open your browser and visit `http://localhost:3000` to view the application.

### 4. Environment Variables

Make sure you set up the following environment variables for local development:

- `VITE_API_URL`: The base URL for Fetch API (e.g., `https://frontend-take-home-service.fetch.com`).
- `VITE_FIREBASE_API_KEY`: Your Firebase API key for authentication (if applicable).

### 5. Deployment

Once you’ve tested your app locally, you can deploy it to a platform like [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/). Ensure that the app is accessible on the internet.

---

## API Endpoints

The app communicates with Fetch's API to retrieve shelter dog data. Below are the important endpoints:

### Authentication

- **POST /auth/login**: Authenticates the user by name and email.
- **POST /auth/logout**: Logs out the user.

### Dogs

- **GET /dogs/breeds**: Fetch all available dog breeds.
- **GET /dogs/search**: Search for dogs with filtering, sorting, and pagination options.
- **POST /dogs**: Fetch details for multiple dogs by IDs.
- **POST /dogs/match**: Generate a match based on selected dog IDs.

### Locations

- **POST /locations**: Fetch location data based on zip codes.
- **POST /locations/search**: Search for locations by city, state, or geographic coordinates.

---

## Technologies Used

- **React**: Used for building the user interface.
- **TypeScript**: For type safety and better development experience.
- **Vite**: For fast bundling and hot module replacement (HMR).
- **Firebase**: For authentication and storing data (if applicable).
- **Axios**: For API calls.
- **CSS/Styled-components**: For styling the application.
