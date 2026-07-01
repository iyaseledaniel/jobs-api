# Jobs API

A RESTful Job Management API built with **Node.js**, **Express.js**, **MongoDB**, and **JWT Authentication**. This API enables users to securely register, log in, and manage their job applications by creating, updating, retrieving, and deleting job records.

The project follows a layered architecture by separating **controllers**, **services**, **middleware**, and **routes**, making the codebase modular, maintainable, and easy to scale.

---

## Features

- User Registration
- User Login
- JWT Authentication
- Password Hashing with bcrypt
- CRUD Operations for Jobs
- Custom Error Handling
- Global Async Error Handling
- MongoDB Integration using Mongoose
- Swagger API Documentation
- CORS Enabled
- Environment Variable Configuration
- Service Layer Architecture
- Input Validation
- HTTP Status Code Standardization

---

## Tech Stack

### Backend

- Node.js
- Express.js

### Database

- MongoDB
- Mongoose

### Authentication

- JSON Web Token (JWT)
- bcrypt

### Documentation

- Swagger UI
- YAML

### Other Packages

- dotenv
- cors
- http-status-codes

---

## Project Structure

```
Job-Api/
│
├── controllers/
│   ├── auth.js
│   └── jobs.js
│
├── services/
│   ├── createJob.js
│   ├── deleteJob.js
│   ├── getAllJob.js
│   ├── getJob.js
│   ├── updateJob.js
│   ├── formatter.js
│   └── index.js
│
├── middleware/
│   ├── authentication.js
│   ├── async.js
│   ├── error-handler.js
│   └── not-found.js
│
├── routes/
│   ├── auth.js
│   └── jobs.js
│
├── models/
│   ├── User.js
│   └── Job.js
│
├── db/
│   └── connect.js
│
├── swagger.yaml
├── app.js
├── package.json
└── README.md
```

---

## Architecture

```
Client
   │
   ▼
Routes
   │
   ▼
Authentication Middleware
   │
   ▼
Controllers
   │
   ▼
Services
   │
   ▼
MongoDB (Mongoose)
```

The application separates responsibilities into different layers:

- **Routes** define API endpoints.
- **Middleware** handles authentication and errors.
- **Controllers** receive requests and send responses.
- **Services** contain business logic.
- **Models** communicate with MongoDB.

---

# Installation

Clone the repository

```bash
git clone https://github.com/iyaseledaniel/jobs-api.git
```

Navigate into the project

```bash
cd  cloned job-api dir-name
```

Install dependencies

```bash
npm install
```

---

# Environment Variables

Create a `.env` file in the project root.

```env
PORT=3000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

JWT_SPAN=1d || your hard coded one
```

Example:

```env
PORT=3000

MONGO_URI=mongodb+srv://...

JWT_SECRET=myverysecretkey

JWT_SPAN=7d
```

---

# Running the Project

Development

```bash
npm run dev
```

Production

```bash
npm start
```

The server starts on

```
http://localhost:3000
```

---

# API Documentation

Swagger documentation is available at

```
/api-docs
```

Example

```
http://localhost:3000/api-docs
```

Swagger provides an interactive interface for testing every endpoint.

---

# Authentication

The API uses **JWT Authentication**.

After a successful login or registration, a JWT token is returned.

Example response

```json
{
    "token":"eyJhbGc..."
}
```

Include the token in future requests.

```
Authorization: Bearer <token>
```

---

# API Endpoints

## Authentication

### Register

```
POST /api/v1/auth/register
```

Request

```json
{
    "name":"John",
    "email":"john@gmail.com",
    "password":"password123"
}
```

Response

```json
{
    "msg":"Registration successful",
    "token":"JWT_TOKEN"
}
```

---

### Login

```
POST /api/v1/auth/login
```

Request

```json
{
    "email":"john@gmail.com",
    "password":"password123"
}
```

Response

```json
{
    "message":"Login Successful",
    "token":"JWT_TOKEN"
}
```

---

# Job Endpoints

All job endpoints require authentication.

---

## Create Job

```
POST /api/v1/jobs
```

Request

```json
{
    "company":"Google",
    "position":"Backend Developer"
}
```

Response

```json
{
    "msg":"Job created",
    "job":{}
}
```

---

## Get All Jobs

```
GET /api/v1/jobs
```

Returns every job belonging to the authenticated user.

---

## Get Single Job

```
GET /api/v1/jobs/:company
```

Example

```
GET /api/v1/jobs/google
```

---

## Update Job

```
PATCH /api/v1/jobs/:company
```

Request

```json
{
    "position":"Senior Backend Developer",
    "status":"Interview"
}
```

---

## Delete Job

```
DELETE /api/v1/jobs/:company
```

Deletes a job belonging to the authenticated user.

---

# Business Logic

## Registration

- Validates required fields.
- Checks if email already exists.
- Hashes password with bcrypt.
- Creates user.
- Generates JWT.

---

## Login

- Validates credentials.
- Verifies password.
- Generates JWT.
- Returns authenticated user.

---

## Job Creation

- Validates company and position.
- Prevents duplicate jobs per user.
- Saves job.
- Formats returned data.

---

## Retrieve Jobs

- Fetches only jobs belonging to the authenticated user.
- Returns formatted output.

---

## Update Job

- Validates required fields.
- Updates only the authenticated user's job.
- Runs Mongoose validators.

---

## Delete Job

- Deletes only jobs created by the authenticated user.
- Returns success message.

---

# Error Handling

The API uses custom error classes.

Examples include

- BadRequestError (400)
- UnauthenticatedError (401)
- NotFoundError (404)
- ConflictError (409)

A centralized error handler ensures consistent error responses.

Example

```json
{
    "success": false,
    "message": "Job already exists"
}
```

---

# Security Features

- JWT Authentication
- Password Hashing
- Protected Routes
- Environment Variables
- Request Validation
- Duplicate Record Prevention
- Centralized Error Handling

---

# Service Layer

Business logic is extracted into services.

```
createJobService()
getAllJobsService()
getJobService()
updateJobService()
deleteJobService()
```

This keeps controllers lightweight and focused only on handling HTTP requests and responses.

---

# Formatter Utility

The project includes a formatter utility that automatically capitalizes company and position first characters before returning responses.

Example

Stored value

```
google
```

Returned value

```
Google
```

---

# Future Improvements

- Pagination
- Search Jobs
- Filter by Status
- Sort Jobs
- Email Verification
- Forgot Password
- Refresh Tokens
- Role-Based Authorization
- Unit Testing
- Integration Testing
- Docker Support
- CI/CD Pipeline
- Logging with Winston or Morgan
- Rate Limiting
- Helmet Security
- Request Validation with Joi or Zod

---

# HTTP Status Codes Used

| Status Code | Description |
|-------------|------------|
| 200 | OK |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 404 | Not Found |
| 409 | Conflict |
| 500 | Internal Server Error |

---

# Author

**Daniel Iyasele: code knowledge extracted from code addict**

Backend Developer

---

## Contributing

Contributions are welcome.

1. Fork the repository

2. Create a feature branch

```bash
git checkout -b feature/new-feature
```

3. Commit your changes

```bash
git commit -m "Added new feature"
```

4. Push

```bash
git push origin feature/new-feature
```

5. Open a Pull Request

---

## Acknowledgements

- Express.js
- MongoDB
- Mongoose
- Swagger
- JWT
- bcrypt
- Node.js