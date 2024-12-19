# Delivery App Backend

This is the backend for a delivery application built with **NestJS** for managing orders, user accounts, and deliveries. It provides APIs for handling customer, store, driver, and admin functionalities, allowing seamless order management, registration, and authentication. The backend uses **PostgreSQL** as the database and **JWT** for user authentication.

## Features

- **User Authentication and Authorization**: Register and log in as different user roles (Customer, Store, Driver, Admin).
- **Order Management**: Create, update, and track orders.
- **Role-Based Access Control**: Permissions vary depending on user role.
- **Scalable Architecture**: Structured to allow for future scalability and new features.

## Tech Stack

- **NestJS**: Backend framework
- **PostgreSQL**: Database
- **JWT**: Authentication
- **Prisma**: ORM for database interaction
- **Docker** (optional): For containerized development

## Prerequisites

- **Node.js** and **npm**
- **PostgreSQL** installed and running
- **Docker** (optional for containerized setup)

## Installation

1. **Clone the repository**

```bash
git clone https://github.com/your-username/delivery-app-backend.git
cd delivery-app-backend
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables** 

    Create a `.env` file at the root of your project and add the following variables:

```bash
DATABASE_URL="postgresql://<username>:<password>@localhost:5432/delivery_app_db"
JWT_SECRET="your-secret-key"
```

Replace `<username>`, `<password>`, and `delivery_app_db` with your PostgreSQL credentials and database name.

**Create JWT SECRET KEY**
```bash
node
require('crypto').randomBytes(32).toString('hex');
```
copy key to JWT_SECRET

**Set up the PostgreSQL docker ** 

`docker-compose.yml`
```bash
version: '3.9'

services:
  postgres:
    image: postgres:latest
    container_name: delivery_postgres
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password123
      POSTGRES_DB: delivery_app_db
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - delivery_network

volumes:
  postgres_data:
    driver: local

networks:
  delivery_network:
    driver: bridge

```
run command 
```bash 
docker compose up
```

4. **Set up the database** 
Generate the Prisma client and apply migrations to set up the database schema:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

5. **Run the server** 
```bash
npm run start
```
The server should start on `http://localhost:3000` by default.

# API Endpoints
## Authentication
- `POST /user/register`: Register a new user (customer, store, driver, or admin).
- `POST /user/login`: Log in with email and password to receive a JWT token.

## Orders
- `POST /orders`: Create a new order (available to customers and stores).
- `GET /orders/`: Get order details (role-based access).
- `PUT /orders/`: Update order status (drivers and admins).
- `DELETE /orders/`: Delete an order (admin only).

For detailed API documentation, please refer to the API Documentation.

# Project Structure
```
backend/
├── prisma/
│   ├── migrations/           # Contains all migration files for tracking database schema changes.
│   │   └── migration_lock.toml  # Lock file to ensure migration integrity across environments.
│   ├── schema.prisma          # Prisma schema defining database models and relations.
│   └── seed.ts                # Seed script for initializing database data (renamed from seed.ts.txt).
├── src/
│   ├── auth/                  # Authentication module.
│   │   ├── dto/               # Data Transfer Objects for authentication (e.g., login and register).
│   │   │   ├── login.dto.ts       # DTO for user login request.
│   │   │   └── register.dto.ts    # DTO for user registration request.
│   │   ├── guards/            # Guards to protect routes (e.g., JWT authentication and role-based access).
│   │   │   ├── auth.guard.ts      # Guard for general authentication.
│   │   │   ├── jwt-auth.guard.ts  # Guard for JWT-based authentication.
│   │   │   └── roles.guard.ts     # Guard for role-based access control.
│   │   ├── strategies/        # Strategies for authentication (e.g., JWT strategy).
│   │   │   └── jwt.strategy.ts    # Strategy for validating JWT tokens.
│   │   ├── decorators/        # Custom decorators for authentication and roles.
│   │   │   └── roles.decorator.ts # Decorator for assigning roles to routes.
│   │   ├── auth.controller.ts # Controller for handling authentication-related routes.
│   │   ├── auth.middleware.ts # Middleware for processing authentication-related tasks.
│   │   ├── auth.module.ts     # Module definition for the authentication feature.
│   │   ├── auth.service.ts    # Service for handling authentication logic.
│   │   └── role.enum.ts       # Enum for defining user roles (e.g., admin, user).
│   ├── customer/              # Customer module for handling customer-specific logic.
│   │   ├── dto/               # DTOs for customer-related requests (e.g., creating orders).
│   │   │   └── create-order.dto.ts # DTO for creating a new order.
│   │   ├── customer.controller.ts # Controller for customer-specific routes.
│   │   ├── customer.module.ts # Module definition for the customer feature.
│   │   └── customer.service.ts # Service for managing customer-related logic.
│   ├── middleware/            # Middleware for various tasks (e.g., role management).
│   │   ├── role.factory.ts    # Factory for creating roles dynamically.
│   │   ├── role.middleware.ts # Middleware for handling role validation.
│   ├── prisma/                # Prisma module for database connection and operations.
│   │   ├── prisma.module.ts   # Module for integrating Prisma with the NestJS application.
│   │   └── prisma.service.ts  # Service for interacting with the Prisma client.
│   ├── store/                 # Store module for handling store-specific logic.
│   │   ├── dto/               # DTOs for store-related requests (e.g., creating menus).
│   │   │   ├── create-menu.dto.ts     # DTO for creating a new menu item.
│   │   │   └── update-order-status.dto.ts # DTO for updating order status.
│   │   ├── store.controller.ts # Controller for store-specific routes.
│   │   ├── store.module.ts    # Module definition for the store feature.
│   │   └── store.service.ts   # Service for managing store-related logic.
│   ├── users/                 # Users module for managing user data.
│   │   ├── user.controller.ts # Controller for user-specific routes.
│   │   ├── user.module.ts     # Module definition for the user feature.
│   │   └── user.service.ts    # Service for managing user-related logic.
│   ├── app.controller.ts      # Main application controller.
│   ├── app.module.ts          # Root module of the application.
│   ├── app.service.ts         # Service for core application logic.
│   └── main.ts                # Entry point for the application.
├── test/
│   ├── e2e/                   # End-to-end tests for the application.
│   │   ├── app.e2e-spec.ts    # E2E tests for core application functionality.
│   │   └── store.e2e-spec.ts  # E2E tests for store functionality.
│   ├── utils/                 # Utility files for testing.
│   │   └── test_API.md        # Documentation for testing APIs.
│   └── jest-e2e.json          # Configuration for Jest E2E testing.
├── docs/
│   ├── Documentation.md       # Documentation for the project (renamed from UseAPI/Documentation.md).
│   └── README.md              # Project overview and instructions.
├── .env                       # Environment variables for the application.
├── .eslintrc.js               # ESLint configuration file.
├── .gitignore                 # List of files and folders to ignore in version control.
├── .prettierrc                # Prettier configuration file.
├── docker-compose.yml         # Docker Compose configuration for running the application.
├── Dockerfile                 # Dockerfile for building the application container.
├── nest-cli.json              # NestJS CLI configuration file.
├── package-lock.json          # Lock file for package dependencies.
├── package.json               # Dependency and script definitions for the project.
├── tsconfig.build.json        # TypeScript configuration for building the project.
└── tsconfig.json              # TypeScript configuration for the project.

```

# Running with Docker (Optional)
1. ** Build Docker image **

```bash
docker build -t backend-delivery-app .
```
2. ** Run Docker container **
```bash
docker run -p 3000:3000 --env-file .env backend-delivery-app
```
# Testing
To test the application, you can use tools like `Postman` or `Insomnia` to call the API endpoints. Make sure to include the JWT token in the Authorization header for protected routes.

# License
This project is licensed under the MIT License. See the LICENSE file for details.