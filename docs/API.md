# BudgetHobby API Documentation

Base URL: `http://localhost:3001`

## Authentication

All protected endpoints require a Bearer token in the `Authorization` header:

```
Authorization: Bearer <token>
```

---

## Auth Endpoints

### POST /auth/register

Create a new user account.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "mypassword123"
}
```

**Response (201):**
```json
{
  "message": "Account created successfully",
  "user": { "id": "...", "email": "user@example.com", "createdAt": "..." },
  "token": "eyJ..."
}
```

---

### POST /auth/login

Login with existing credentials.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "mypassword123"
}
```

**Response (200):**
```json
{
  "message": "Login successful",
  "user": { "id": "...", "email": "user@example.com", "createdAt": "..." },
  "token": "eyJ..."
}
```

---

## Activities

### GET /activities

Get all activities. Supports query parameters:
- `search` — Text search across name, description, category
- `category` — Filter by category (Sport, Creative, etc.)
- `minPrice` — Minimum price
- `maxPrice` — Maximum price
- `difficulty` — Filter by difficulty level

**Response (200):** Array of Activity objects

---

### GET /activities/:id

Get a single activity by ID.

**Response (200):**
```json
{
  "id": "...",
  "name": "Running",
  "category": "Sport",
  "description": "...",
  "price": 0,
  "difficulty": "Beginner",
  "image": "https://...",
  "equipment": ["Running shoes", "..."]
}
```

---

## Favorites (🔒 Auth required)

### GET /favorites

Get all favorites for the authenticated user.

**Response (200):** Array of Favorite objects with nested activity

---

### POST /favorites

Add an activity to favorites.

**Request:**
```json
{ "activityId": "..." }
```

**Response (201):** The created Favorite object

---

### DELETE /favorites/:id

Remove a favorite by its ID.

**Response (200):**
```json
{ "message": "Removed from favorites" }
```

---

## User (🔒 Auth required)

### GET /user/me

Get current user profile with preferences and favorite count.

### GET /user/preferences

Get current user's preferences (budget, categories).

### POST /user/preferences

Update user preferences.

**Request:**
```json
{
  "budget": 150,
  "categories": ["Sport", "Creative", "Nature"]
}
```
