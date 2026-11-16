## Kanban Board

Kanban Board is a full-stack project being developed as part of the Web Application Development course. The goal of the project is to provide a lightweight project management platform where users can collaborate on projects, organize work using a Kanban workflow, and track task progress.

The repository currently contains the first backend module of the application focused on user management.

### Current Progress

Implemented:

- SQLite database integration
- Express.js backend
- User domain model
- User database schema
- User validation
- User role management
- User API routes
- Faker-based user data generation
- bcrypt password hashing for generated users

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
└── genfake-users.ts

data/
└── app.sqlite3
```

### User Model

Current user attributes:

- id
- name
- email
- username
- passwordHash
- role

### Roles

Supported roles:

- Administrator
- Manager
- Member

### Validation Rules

Users must satisfy the following requirements:

#### Name

- Required
- Must be a non-empty string

#### Email

- Required
- Must be a non-empty string
- Must match standard email format

#### Username

- Required
- Length between 3 and 20 characters
- Allowed characters:
  - letters
  - digits
  - `.`
  - `_`
  - `-`

#### Password Hash

- Required
- Must be a non-empty string

#### Role

Must be one of:

- Administrator
- Manager
- Member

### Database

SQLite is used for persistence.

Current tables:

#### users

| Column | Constraints |
|----------|----------|
| id | Primary Key, Auto Increment |
| name | NOT NULL |
| email | NOT NULL, UNIQUE |
| username | NOT NULL, UNIQUE |
| passwordHash | NOT NULL |
| role | NOT NULL |

### Implemented API Endpoints

#### Get all users

```http
GET /api/users
```

Returns all users.

#### Get user by ID

```http
GET /api/users/:id
```

Returns a specific user.

#### Create user

```http
POST /api/users
```

Creates a new user after validation.

### Fake User Generation

Generate sample users:

```bash
npm run gfu
```

Generate a custom number of users:

```bash
npm run gfu -- 100
```

Generated users are distributed as:

```text
10% Administrators
30% Managers
60% Members
```

User passwords are hashed using bcrypt before being stored in the database.

### Technologies

- TypeScript
- Node.js
- Express.js
- SQLite
- Faker
- bcrypt
- Morgan

### Planned Next Steps

- Complete User CRUD
- Project entity
- Project membership management
- Boards and columns
- Tasks
- Comments
- Authentication
- Authorization
- Automated testing
- Angular frontend

### Status

🚧 Work in Progress

The current implementation represents the first backend module of the application. Additional entities and business functionality will be introduced incrementally following a domain-first development approach.