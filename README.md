# NoteKeeper

NoteKeeper is a note-taking application designed for seamless organization and management of personal notes. It is developed as part of the ["The Complete Web Development Bootcamp"](https://www.udemy.com/course/the-complete-web-development-bootcamp/) by Dr. Angela Yu on Udemy. This project focuses on back-end development using Node.js, Express.js, PostgreSQL, and front-end styling with Tailwind CSS, with authentication via Google OAuth and local storage.

# Getting Started
## Prerequisites
- Node.js: Ensure Node.js (v14 or later) is installed on your machine.
- PostgreSQL: Install PostgreSQL and set up a database.
- Google Cloud Console: Set up a Google OAuth credential for Google Sign-In.

## Installation
1. Clone the Repository
```bash
git clone https://github.com/HMDuran/notekeeper-app.git
cd notekeeper-app
```
2. Install Dependencies
```bash
npm install
```

## Configuration
Create a ```.env``` file and add:
```
VITE_API_URL=http://localhost:3000
VITE_GOOGLE_CLIENT_ID=your-google-client-id

```
Create a ```.env``` file inside the server directory and add:
```
DB_HOST=your-database-host
DB_USER=your-database-user
DB_PASS=your-database-password
DB_NAME=your-database-name
DB_PORT=5432
```
## Database Setup
1. Open a PostgreSQL client and create a database:
```
CREATE DATABASE notekeeper;
```

2. Import the SQL file located in the sql directory:
```
psql -U your-db-user -d notekeeper -f sql/note-keeper.sql
```
Replace:
- ```your-db-user``` with your PostgreSQL username.
- ```notekeeper``` with your database name.
- ```sql/note-keeper.sql``` with the path to your SQL file.

## Running the Application
### Start the Backend
```
cd server
nodemon index.js
```
The backend will run on ```http://localhost:300```.
### Start the Frontend
```
npm run dev
```
The frontend will run on ```http://localhost:5175```.

## Preview

![Screenshot 2025-04-04 171701](https://github.com/user-attachments/assets/a63243a0-5581-4857-9f87-5c37e0bae2d9)
