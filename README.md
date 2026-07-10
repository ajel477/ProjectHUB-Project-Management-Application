# ProjectHUB - Project Management Dashboard

A full-stack Project Management Dashboard built using the MERN Stack. This application allows users to manage projects and tasks through a clean and responsive interface. It provides complete CRUD operations for projects and tasks, along with a dashboard summarizing project and task statistics.

---

## Features

### Dashboard
- View total number of projects
- View active projects
- View completed tasks
- View pending tasks

### Project Management
- View all projects
- Filter projects by status
- View project details
- Create a new project
- Update project information
- Delete a project

### Task Management
- View tasks belonging to a project
- Add new tasks
- Update task information
- Delete tasks
- Mark tasks as completed or pending

---

## Tech Stack

### Frontend
- React.js (Vite)
- Tailwind CSS
- Axios
- React Router DOM

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose

---

## Folder Structure (Backend)

```
ProjectHUB
│
├── client/
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── data/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── seed/
│   ├── utils/
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## Installation

### Clone Repository

```bash
git clone <repository-url>

cd ProjectHUB
```

### Backend Setup

```bash
cd server

npm install
```

Create a `.env` file inside the server folder.

```
PORT=5000

MONGO_URI=your_mongodb_connection_string
```

### Run Backend

```bash
npm run dev
```

---

## Seed Database

```bash
npm run seed
```

This imports the provided mock JSON data into MongoDB.

---

## API Endpoints

### Projects

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/projects` | Get all projects |
| GET | `/api/projects/:id` | Get single project |
| POST | `/api/projects` | Create project |
| PUT | `/api/projects/:id` | Update project |
| DELETE | `/api/projects/:id` | Delete project |

---

### Tasks

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/projects/:projectId/tasks` | Get project tasks |
| POST | `/api/projects/:projectId/tasks` | Create task |
| PUT | `/api/tasks/:taskId` | Update task |
| DELETE | `/api/tasks/:taskId` | Delete task |

---

### Dashboard

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/dashboard` | Dashboard statistics |

---

## Database Design

### Project

- title
- description
- status
- deadline
- createdAt
- updatedAt

### Task

- projectId
- title
- description
- status
- createdAt
- updatedAt

Relationship:

One Project → Many Tasks

---

## Backend Architecture

```
Client

↓

Routes

↓

Controllers

↓

Models

↓

MongoDB
```

---

## AI Usage

ChatGPT was used as a development assistant for:

- API design
- Database schema design
- Code review
- Error handling improvements
- Project planning

All generated code was manually reviewed, tested using Postman, and modified where necessary before integration.

---

## Challenges Faced

- Designing a proper MongoDB relationship between Projects and Tasks.
- Mapping seeded JSON data to MongoDB ObjectIds.
- Implementing clean RESTful APIs.
- Maintaining data consistency while deleting projects and associated tasks.

---

## Future Improvements

- User Authentication
- JWT Authorization
- Pagination
- Search Projects
- Sorting
- File Uploads
- Docker Deployment
- Unit Testing

---

## Author

Ajel Varghese Mathew
B.Tech Computer Science Engineering
SRM Institute of Science and Technology