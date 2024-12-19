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
.
├── src
│   ├── auth          # JWT and Passport strategy
│   ├── user          # User module for handling authentication and authorization
│   ├── orders        # Order module for creating and managing orders
│   ├── prisma        # Prisma client setup
│   └── main.ts       # Entry point of the application
├── prisma
│   └── schema.prisma # Prisma schema file
└── .env              # Environment variables
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