# React-To-Do-App

This is a drag-and-drop application built using a monorepository structure, separating the frontend and backend. The project uses the following technologies:

- **Frontend**: React, Material UI, React Beautiful DnD
- **Backend**: NestJS, PostgreSQL

## Project Structure

The project is organized into two main applications located in separate directories:

### Frontend (React + Material UI + React Beautiful DnD)

- The frontend is built with **React**, providing an interactive user interface.
- **Material UI** is used for styling and UI components, ensuring a consistent and modern design.
- **React Beautiful DnD** is used to implement drag-and-drop functionality for arranging items in the UI.

### Backend (NestJS + PostgreSQL)

- The backend is developed using **NestJS**, a framework that provides a scalable and modular structure for server-side applications.
- **PostgreSQL** is used as the database to store data related to the application.

## Demo

You can try the demo version of the app by visiting the following link:

[Demo Version](https://hohlovkiril.github.io/React-To-Do-App/)

## Getting Started

### Prerequisites

To run this project locally, you need to have the following installed:

- Node.js (for both frontend and backend)
- PostgreSQL (for the backend database)

### Running the Application

#### Frontend

1. Navigate to the `frontend` directory: `cd apps/frontend`
2. Install dependencies: `npm install`
3. Start the development server: `npm start`

#### Backend

1. Navigate to the `backend` directory: `cd apps/backend`
2. Install dependencies: `npm install`
3. Set up your PostgreSQL database (make sure it's running).
4. Configure your environment variables (e.g., database connection settings).
5. Start the backend server: `npm run start:dev`

## Contributing

Feel free to fork the repository and submit pull requests. For any bugs or feature requests, please open an issue.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.