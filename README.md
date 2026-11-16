## Kanban Board

Kanban Board is a full-stack project being developed as part of the Web Application Development course. The goal of the project is to provide a lightweight project management platform where users can collaborate on projects, manage memberships, organize work, and ultimately track tasks using a Kanban workflow.

The repository currently contains the backend foundation of the application, including user management, project management, relational database design, validation, and sample data generation.

### Current Progress

Implemented:

- SQLite database integration
- Express.js backend
- User domain model
- Project domain model
- Project membership model
- Role-based access foundation
- User validation
- Project validation
- Faker-based user generation
- bcrypt password hashing for generated accounts
- User CRUD API
- Project CRUD API
- Foreign key relationships
- Database-level CHECK constraints

### Current Backend Structure

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

### Domain Model

#### User

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

#### Project

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

#### ProjectMember

Represents membership between users and projects.

Attributes:

- projectId
- userId
- role

Supported membership roles:

- Owner
- Manager
- Member

### Database Design

Current tables:

#### users

- Unique email addresses
- Unique usernames
- Role constraint

#### projects

- Project ownership
- Status constraint
- Date consistency validation
- Foreign key to users

#### project_members

- Many-to-many relationship between users and projects
- Composite primary key
- Membership role constraint
- Cascading cleanup

### Implemented API Endpoints

#### Users

```http
GET    /api/users
GET    /api/users/:id

POST   /api/users

PUT    /api/users/:id

DELETE /api/users/:id
DELETE /api/users
```

#### Projects

```http
GET    /api/projects
GET    /api/projects/:id

POST   /api/projects

PUT    /api/projects/:id

DELETE /api/projects/:id
DELETE /api/projects
```

### Validation

#### User Validation

- Name must be provided
- Email format validation
- Username format and length validation
- Password hash validation
- Role validation

#### Project Validation

- Project name validation
- Description validation
- Status validation
- Date validation
- Owner validation

### Sample Data Generation

Generate fake users:

```bash
npm run gfu
```

Generate a custom number of users:

```bash
npm run gfu -- 100
```

Generated accounts use:

```text
10% Administrators
30% Managers
60% Members
```

Passwords are hashed using bcrypt before storage.

### Technologies

- TypeScript
- Node.js
- Express.js
- SQLite
- Faker
- bcrypt
- Morgan

### Planned Next Steps

- Project membership endpoints
- Task entity
- Labels
- Comments
- Authentication
- Authorization
- Automated API testing
- Angular frontend
- Kanban board interface

### Status

🚧 Work in Progress

The current implementation provides the foundational backend architecture for the Kanban Board system. The core user and project modules are implemented, while membership management, task management, authentication, automated testing, and frontend functionality remain under active development.