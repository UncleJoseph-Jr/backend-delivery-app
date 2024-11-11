# Delivery App API Documentation

This documentation provides an overview of all available API endpoints for the Delivery App. The app supports customer and restaurant management, order placement, and order tracking.

## Table of Contents
- [Getting Started](#getting-started)
- [Authentication](#authentication)
  - [Login](#login)
- [Customer API](#customer-api)
  - [Get Restaurants](#get-restaurants)
  - [Place Order](#place-order)
- [Order Management](#order-management)
- [Example Usage](#example-usage)

---

## Getting Started
1. Make sure to set up the environment variables in `.env`:
    ```
    DATABASE_URL="postgresql://username:password@localhost:5432/delivery_app_db"
    ```
2. Run the Prisma migrations to set up the database schema:
    ```bash
    npx prisma migrate dev
    ```
3. Start the NestJS server:
    ```bash
    npm run start:dev
    ```

---

## Authentication

### Login
- **Endpoint**: `POST /auth/login`
- **Description**: Authenticates a user and returns a JWT token.
- **Request Body**:
    ```json
    {
      "username": "string",
      "password": "string"
    }
    ```
- **Response**:
    ```json
    {
      "access_token": "string"
    }
    ```

---

## Customer API

### Get Restaurants
- **Endpoint**: `GET /customer/restaurants`
- **Description**: Fetches a list of available restaurants along with their menu items.
- **Response**:
    ```json
    [
      {
        "id": 1,
        "name": "Sample Restaurant",
        "location": "City Center",
        "menuItems": [
          {
            "id": 1,
            "name": "Sample Dish 1",
            "price": 10
          },
          {
            "id": 2,
            "name": "Sample Dish 2",
            "price": 15
          }
        ]
      }
    ]
    ```

### Place Order
- **Endpoint**: `POST /customer/order`
- **Description**: Places a new order with the specified items.
- **Request Body**:
    ```json
    {
      "userId": 1,
      "restaurantId": 1,
      "items": [
        {
          "menuItemId": 1,
          "quantity": 2
        },
        {
          "menuItemId": 2,
          "quantity": 1
        }
      ]
    }
    ```
- **Response**:
    ```json
    {
      "id": 1,
      "userId": 1,
      "restaurantId": 1,
      "totalPrice": 35,
      "status": "PENDING",
      "createdAt": "2024-11-10T12:02:59.640Z",
      "updatedAt": "2024-11-10T12:02:59.640Z"
    }
    ```

---

## Order Management

- **Order Statuses**:
    - **PENDING**: Order has been placed but not yet processed.
    - **CONFIRMED**: Order has been confirmed by the restaurant.
    - **CANCELLED**: Order was cancelled by the user or the restaurant.
    - **COMPLETED**: Order was delivered successfully.

---

## Example Usage

### Fetching Available Restaurants
```bash
curl -X GET http://localhost:3000/customer/restaurants

curl -X POST http://localhost:3000/customer/order \
-H "Content-Type: application/json" \
-d '{
      "userId": 1,
      "restaurantId": 1,
      "items": [
        {
          "menuItemId": 1,
          "quantity": 2
        },
        {
          "menuItemId": 2,
          "quantity": 1
        }
      ]
    }'
