
# Fetch Frontend Take-Home Exercise

Welcome to the Fetch Frontend Take-Home Exercise! This project helps dog lovers search through a database of shelter dogs to find the perfect match for adoption.

## Overview

In this project, I will:

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
git clone https://github.com/nguyethy002/Fetch-Frontend-Take-Home-Exercise.git
cd fetch-dog-app
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

Then, open your browser and visit `http://localhost:5173/` to view the application.


## Access the App

You can access the app directly using this link: [https://fetch--take-home-exercise.web.app/](https://fetch--take-home-exercise.web.app/).

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

---

## Technologies Used

- **React**: Used for building the user interface.
- **TypeScript**: For type safety and better development experience.
- **Vite**: For fast bundling and hot module replacement (HMR).
- **Firebase**: For authentication and storing data (if applicable).
- **Axios**: For API calls.
- **CSS/Styled-components**: For styling the application.

## Accessibility
- The application is reponsive for all of the media ( for example desktop, tablet and mobile)


