# Parking Reservation API

## Overview

This is an API for managing parking spaces, reservations, and user information.

## Table of Contents

- [End Points](#End-Points)
  - [User Routes](#user)
  - [Parking Space Routes](#parking-space)
  - [Reservation Routes](#reservation)
- [Schemas](#schemas)
  - [User Schema](#user-schema)
  - [Reservation Schema](#reservation-schema)
  - [Parking Space Schema](#parking-space-schema)

## End Points

### Users

### Get All Users

- **Endpoint:** `/api/users`
- **Method:** `GET`
- **Description:** Get all users.
- **Input:** None
- **Output:** JSON array containing user objects.

### Create User

- **Endpoint:** `/api/users`
- **Method:** `POST`
- **Description:** Create a new user.
- **Input:** JSON object with user details.
  - **Data Shape:**
    ```json
    {
      "name": "String",
      "username": "String",
      "password": "String",
      "role": "String",
      "email": "String",
      "phonenumber": "String"
    }
    ```
- **Output:** JSON object containing a generated access token for the newly created user.

### Get User by ID

- **Endpoint:** `/api/users/:id`
- **Method:** `GET`
- **Description:** Get a specific user by ID.
- **Input:** User ID in the URL parameter.
- **Output:** JSON object containing user details.

### Get User by Key-Value Pair

- **Endpoint:** `/api/users/:key/:value`
- **Method:** `GET`
- **Description:** Get a user using a specific key-value pair.
- **Input:** Key and value in the URL parameters.
- **Output:** JSON object containing user details.

### User Login

- **Endpoint:** `/api/users/login`
- **Method:** `POST`
- **Description:** User login.
- **Input:** JSON object with username and password.
  - **Data Shape:**
    ```json
    {
      "username": "String",
      "password": "String"
    }
    ```
- **Output:** JSON object containing a generated access token for the authenticated user.

### Generate Access Token

- **Endpoint:** `/api/users/generateAccessToken`
- **Method:** `POST`
- **Description:** Generate an access token from a refresh token.
- **Input:** JSON object with a refresh token.
  - **Data Shape:**
    ```json
    {
      "refresh_token": "String"
    }
    ```
- **Output:** JSON object containing a new access token.

### Verify Access Token

- **Endpoint:** `/api/users/verifyAccessToken`
- **Method:** `POST`
- **Description:** Verify the validity of an access token.
- **Input:** JSON object with access token and user ID.
  - **Data Shape:**
    ```json
    {
      "access_token": "String",
      "userId": "String"
    }
    ```
- **Output:** JSON object indicating whether the access token is valid.

### Verify Refresh Token

- **Endpoint:** `/api/users/verifyRefreshToken`
- **Method:** `POST`
- **Description:** Verify the validity of a refresh token.
- **Input:** JSON object with refresh token and user ID.
  - **Data Shape:**
    ```json
    {
      "refresh_token": "String",
      "userId": "String"
    }
    ```
- **Output:** JSON object indicating whether the refresh token is valid.

### Update User by ID

- **Endpoint:** `/api/users/:id`
- **Method:** `PUT`
- **Description:** Update a user by ID.
- **Input:** User ID in the URL parameter, JSON object with updated user details.
  - **Data Shape:**
    ```json
    {
      "name": "String",
      "username": "String",
      "password": "String",
      "role": "String",
      "email": "String",
      "phonenumber": "String"
    }
    ```
- **Output:** JSON object containing the updated user details.

### Delete User by ID

- **Endpoint:** `/api/users/:id`
- **Method:** `DELETE`
- **Description:** Delete a user by ID.
- **Input:** User ID in the URL parameter.
- **Output:** Success message indicating that the user was deleted.

### Delete All Users

- **Endpoint:** `/api/users`
- **Method:** `DELETE`
- **Description:** Delete all users.
- **Input:** None
- **Output:** Success message indicating that all users were deleted.

### Reservation

### Get All Reservations

- **Endpoint:** `/api/reservation`
- **Method:** `GET`
- **Description:** Get all reservations.
- **Input:** None
- **Output:** JSON array containing reservation objects.

### Create Reservation

- **Endpoint:** `/api/reservation`
- **Method:** `POST`
- **Description:** Create a new reservation.
- **Input:** JSON object with `userId` and `location`.
  - **Data Shape:**
    ```json
    {
      "userId": "String",
      "location": "String",
      "starttime": "Date",
      "endtime": "Date"
    }
    ```
- **Output:** JSON object containing the details of the newly created reservation.

### Get Reservation by ID

- **Endpoint:** `/api/reservation/:id`
- **Method:** `GET`
- **Description:** Get a specific reservation by ID.
- **Input:** Reservation ID in the URL parameter.
- **Output:** JSON object containing reservation details.

### Update Reservation by ID

- **Endpoint:** `/api/reservation/:id`
- **Method:** `PUT`
- **Description:** Update a reservation by ID.
- **Input:** Reservation ID in the URL parameter, JSON object with updated reservation details.
  - **Data Shape:**
    ```json
    {
      "userId": "String",
      "location": "String",
      "starttime": "Date",
      "endtime": "Date"
    }
    ```
- **Output:** JSON object containing the updated reservation details.

### Delete Reservation by ID

- **Endpoint:** `/api/reservation/:id`
- **Method:** `DELETE`
- **Description:** Delete a reservation by ID.
- **Input:** Reservation ID in the URL parameter.
- **Output:** Success message indicating that the reservation was deleted.

### Get Reservation by Key-Value Pair

- **Endpoint:** `/api/reservation/:key/:value`
- **Method:** `GET`
- **Description:** Get a reservation using a specific key-value pair.
- **Input:** Key and value in the URL parameters.
- **Output:** JSON object containing reservation details.

### Parking Spaces

### Create Parking Space

- **Endpoint:** `/api/parking-spaces`
- **Method:** `POST`
- **Description:** Create a new parking space.
- **Input:** JSON object with parking space details.
  - **Data Shape:**
    ```json
    {
      "isOccupied": "Boolean",
      "location": "String",
      "type": "String"
    }
    ```
- **Output:** JSON object containing the details of the newly created parking space.

### Get Parking Space by Key-Value Pair

- **Endpoint:** `/api/parking-spaces/:key/:value`
- **Method:** `GET`
- **Description:** Get a parking space using a specific key-value pair.
- **Input:** Key and value in the URL parameters.
- **Output:** JSON object containing parking space details.

### Get All Parking Spaces

- **Endpoint:** `/api/parking-spaces`
- **Method:** `GET`
- **Description:** Get all parking spaces.
- **Input:** None
- **Output:** JSON array containing parking space objects.

### Get Parking Space by ID

- **Endpoint:** `/api/parking-spaces/:id`
- **Method:** `GET`
- **Description:** Get a specific parking space by ID.
- **Input:** Parking space ID in the URL parameter.
- **Output:** JSON object containing parking space details.

### Update Parking Space by ID

- **Endpoint:** `/api/parking-spaces/:id`
- **Method:** `PUT`
- **Description:** Update a parking space by ID.
- **Input:** Parking space ID in the URL parameter, JSON object with updated parking space details.
  - **Data Shape:**
    ```json
    {
      "isOccupied": "Boolean",
      "location": "String",
      "type": "String"
    }
    ```
- **Output:** JSON object containing the updated parking space details.

### Delete Parking Space by ID

- **Endpoint:** `/api/parking-spaces/:id`
- **Method:** `DELETE`
- **Description:** Delete a parking space by ID.
- **Input:** Parking space ID in the URL parameter.
- **Output:** Success message indicating that the parking space was deleted.

## Schemas

### User Schema

```json
{
  "name": "String",
  "username": "String",
  "password": "String",
  "role": "String",
  "email": "String",
  "phonenumber": "String"
}
```

### Reservation Schema

```json
{
  "userId": "String",
  "location": "String",
  "starttime": "Date",
  "endtime": "Date"
}
```

### Parking Space Schema

```json
{
  "isOccupied": "Boolean",
  "location": "String",
  "type": "String"
}
```
