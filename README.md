## Kanban Board

Kanban Board is a full-stack project being developed as part of the Web Application Development course. The goal of the project is to build a lightweight project management system that allows users to collaborate on projects, manage tasks, and track work using a Kanban-style workflow.

This repository currently contains the initial backend foundation of the application.

### Current Progress

The following components have been implemented:

- Project initialization using TypeScript and Node.js
- SQLite database integration
- Initial database schema creation
- User domain model
- User API routes
- Express.js server setup
- Role-based user model

### Current Backend Structure

```text
src/
├── models/
│   └── user_model.ts
├── routes/
│   └── user-routes.ts
├── db.ts
└── server.ts

ads/
└── (reserved for data generation scripts)

data/
└── app.sqlite3
```

### User Model

The first domain entity implemented in the project is the `User`.

Current attributes:

- id
- name
- email
- username
- passwordHash
- role

Supported roles:

- ADMIN
- PROJECT_MANAGER
- MEMBER

### Database

SQLite is used as the persistence layer.

Current tables:

#### users

| Column | Description |
|----------|----------|
| id | Primary key |
| name | User display name |
| email | Unique email address |
| username | Unique username |
| passwordHash | Stored password hash |
| role | User role |

### Implemented API Endpoints

#### Users

```http
GET /api/users
```

Returns all users.

```http
GET /api/users/:id
```

Returns a single user by identifier.

```http
POST /api/users
```

Creates a new user.

### Technologies

- TypeScript
- Node.js
- Express.js
- SQLite
- Morgan

### Planned Next Steps

- User input validation
- Faker-based sample data generation
- Automated API testing
- Additional domain entities:
  - Project
  - Task
  - Comment
  - Label
- Authentication and authorization
- Angular frontend

### Status

🚧 Work in Progress

The current implementation represents the initial backend architecture and database design phase of the project. Additional entities, validation, testing, and frontend functionality will be introduced incrementally following a domain-first development approach.