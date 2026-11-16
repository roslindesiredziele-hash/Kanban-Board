# Kanban Board

Kanban Board is a full-stack project being developed as part of the Web Application Development course. The goal of the project is to provide a lightweight project management platform where users can collaborate on projects, manage memberships, organize work, and track progress using a Kanban-style workflow.

The repository currently contains the foundational backend implementation, including database design, domain modeling, validation, CRUD operations, and sample data generation.

---

## Current Progress

Implemented:

- SQLite database integration
- Express.js backend
- User domain model
- Project domain model
- Project membership model
- User role management
- Project status management
- Database-level integrity constraints
- User validation
- Project validation
- Faker-based user generation
- bcrypt password hashing for generated accounts
- Complete User CRUD API
- Complete Project CRUD API
- Foreign key relationships
- Project ownership support
- Project membership schema

---

## Current Backend Structure

```text
src/
├── models/
│   ├── user_model.ts
│   ├── project_model.ts
│   └── project_member_model.ts
├── routes/
│   ├── user-routes.ts
│   └── project-routes.ts
├── db.ts
└── server.ts

ads/
└── genfake-users.ts

data/
└── app.sqlite3
```

---

## Domain Model

### User

Attributes:

- id
- name
- email
- username
- passwordHash
- role

Supported roles:

- Administrator
- Manager
- Member

---

### Project

Attributes:

- id
- name
- description
- status
- startDate
- endDate
- ownerId

Supported statuses:

- Active
- Pending
- Completed
- Archived

---

### ProjectMember

Represents membership between users and projects.

Attributes:

- projectId
- userId
- role

Supported membership roles:

- Owner
- Manager
- Member

---

## Database Design

### users

Stores registered users.

Constraints:

- Unique email addresses
- Unique usernames
- Role validation through CHECK constraints

---

### projects

Stores project information.

Constraints:

- Foreign key ownership relationship
- Valid project status values
- Project date consistency (`end_date >= start_date`)
- Owner must reference an existing user

---

### project_members

Represents the many-to-many relationship between users and projects.

Constraints:

- Composite primary key (`project_id`, `user_id`)
- Membership role validation
- Automatic cleanup through cascading deletes

---

## Entity Relationship Overview

```text
User
 │
 │ 1:N (owner)
 ▼
Project
 ▲
 │
 │ N:M
 ▼
ProjectMember
```

A user can own multiple projects.

A project can contain multiple users.

A user can belong to multiple projects.

---

## Validation

### User Validation

- Name must be provided
- Email format validation
- Username format validation
- Username length validation
- Password hash validation
- Role validation

### Project Validation

- Project name validation
- Description validation
- Status validation
- Date validation
- Owner validation

---

## Implemented API Endpoints

### Users

```http
GET    /api/users
GET    /api/users/:id

POST   /api/users

PUT    /api/users/:id

DELETE /api/users/:id
DELETE /api/users
```

---

### Projects

```http
GET    /api/projects
GET    /api/projects/:id

POST   /api/projects

PUT    /api/projects/:id

DELETE /api/projects/:id
DELETE /api/projects
```

---

## Sample Data Generation

Generate fake users:

```bash
npm run gfu
```

Generate a custom number of users:

```bash
npm run gfu -- 100
```

Generated users follow a deterministic role distribution:

```text
10% Administrators
30% Managers
60% Members
```

Passwords are hashed using bcrypt before storage.

---

## Technologies

- TypeScript
- Node.js
- Express.js
- SQLite
- Faker
- bcrypt
- Morgan

---

## Planned Next Steps

- Project membership endpoints
- Task entity
- Labels
- Comments
- Authentication
- Authorization
- API testing
- Angular frontend
- Kanban board interface
- Drag-and-drop task management

---

## Status

🚧 Work in Progress

The current implementation provides the foundational backend architecture of the Kanban Board system. User management, project management, validation, database design, project ownership, project membership modeling, and sample data generation have been implemented.

Task management, authentication, authorization, automated testing, and frontend functionality remain under active development.

---

## Learning Goals

This project is being developed incrementally with a domain-first approach. Each entity is fully modeled, validated, persisted, and exposed through REST APIs before introducing new business functionality.

Current workflow:

```text
Entity
    ↓
Model
    ↓
Database Schema
    ↓
Validation
    ↓
CRUD API
    ↓
Sample Data
```

This approach promotes a clear separation of concerns, maintainable architecture, and a better understanding of database-driven application development.