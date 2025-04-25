DSR (Daily Status Report) API Project
Overview
The DSR (Daily Status Report) API allows users to create, update, retrieve, and manage their daily work reports. This API is part of a larger system to track users' progress and activity throughout the workweek.

Features:
Create DSR: Allows a user to submit a report with details such as content, hours worked, and the date.

Update DSR: Allows users to modify existing reports with updated content or hours worked.

Fetch DSRs: Allows fetching multiple DSRs with filters based on dates and pagination.

Get DSR by ID: Allows fetching a single DSR by its unique ID.

Technologies Used:
NestJS: Framework for building the backend.

Sequelize: ORM for database interaction.

PostgreSQL: Database system used for storing user and DSR data.

JWT: JSON Web Token for authentication and authorization.

Swagger: For API documentation.

.env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=yourpassword
DB_NAME=dsr_api
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
AWS_REGION=ap-south-1
AWS_S3_BUCKET_NAME=your_bucket

📫 API Endpoints
Auth
POST /users/api/v1/auth/register

POST /users/api/v1/auth/login

POST /users/api/v1/auth/forgot-password

POST /users/api/v1/auth/send-otp

POST /users/api/v1/auth/verify-otp

DSR
POST /users/api/v1/dsr

PUT /users/api/v1/dsr

GET /users/api/v1/dsr

GET /users/api/v1/dsr/:dsrId

Profile
GET /users/api/v1/profile

PUT /users/api/v1/profile

POST /users/api/v1/profile/upload


