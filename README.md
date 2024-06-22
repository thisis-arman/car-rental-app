# API Endpoints Overview

## 1. Sign Up
- **Route**: `/api/auth/signup`
- **Method**: **POST**
- **Purpose**: Registers a new user (admin or regular user) into the system.
- **Access**: Public (Anyone can sign up)

## 2. Sign In
- **Route**: `/api/auth/signin`
- **Method**: **POST**
- **Purpose**: Authenticates a user and provides a JWT token for access.
- **Access**: Public (Anyone can sign in)

## 3. Create a Car
- **Route**: `/api/cars`
- **Method**: **POST**
- **Purpose**: Allows an admin to add a new car to the system.
- **Access**: Admin

## 4. Get All Cars
- **Route**: `/api/cars`
- **Method**: **GET**
- **Purpose**: Retrieves a list of all cars in the system.
- **Access**: Authenticated Users

## 5. Get A Car
- **Route**: `/api/cars/:id`
- **Method**: **GET**
- **Purpose**: Retrieves detailed information about a specific car by its ID.
- **Access**: Authenticated Users

## 6. Update A Car
- **Route**: `/api/cars/:id`
- **Method**: **PUT**
- **Purpose**: Allows an admin to update the details of a specific car.
- **Access**: Admin

## 7. Delete A Car
- **Route**: `/api/cars/:id`
- **Method**: **DELETE**
- **Purpose**: Allows an admin to perform a soft delete on a car, marking it as deleted without removing it from the database.
- **Access**: Admin

## 8. Get All Bookings
- **Route**: `/api/bookings`
- **Method**: **GET**
- **Purpose**: Allows an admin to view all bookings, with optional query parameters for filtering by car ID and date.
- **Access**: Admin

## 9. Book a Car
- **Route**: `/api/bookings`
- **Method**: **POST**
- **Purpose**: Allows a user to book a car for a specific date and start time.
- **Access**: Authenticated Users

## 10. Get User's Bookings
- **Route**: `/api/bookings/my-bookings`
- **Method**: **GET**
- **Purpose**: Allows a user to retrieve their own booking history.
- **Access**: Authenticated Users

## 11. Return The Car
- **Route**: `/api/cars/return`
- **Method**: **PUT**
- **Purpose**: Allows an admin to mark a car as returned, calculate the total rental cost, and update the booking with the end time and cost.
- **Access**: Admin
