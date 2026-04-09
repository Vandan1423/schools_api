# School Management API

A REST API built with Node.js, Express, and MySQL to manage school data. Supports adding schools and retrieving them sorted by proximity to a given location.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MySQL
- **ORM/Driver:** mysql2
- **Hosting:** Railway

## Getting Started

### Prerequisites

- Node.js v18+
- MySQL 8+

### Installation

```bash
git clone https://github.com/Vandan1423/schools_api.git
cd schools_api
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
DB_HOST=your_mysql_host
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=your_database_name
DB_PORT=3306
PORT=3000
```

### Database Setup

Run the following SQL to create the required table:

```sql
CREATE TABLE IF NOT EXISTS schools (
  id        INT AUTO_INCREMENT PRIMARY KEY,
  name      VARCHAR(255) NOT NULL,
  address   VARCHAR(255) NOT NULL,
  latitude  FLOAT NOT NULL,
  longitude FLOAT NOT NULL
);
```

### Running Locally

```bash
node index.js
```

Server starts at `http://localhost:3000`

---

## API Reference

### `GET /`

Returns documentation for all available endpoints.

---

### `POST /addSchool`

Adds a new school to the database.

**Request Body**

```json
{
    "name": "ABC School",
    "address": "Indore, Madhya Pradesh",
    "latitude": 22.7196,
    "longitude": 75.8577
}
```

| Field     | Type   | Required |
| --------- | ------ | -------- |
| name      | string | Yes      |
| address   | string | Yes      |
| latitude  | number | Yes      |
| longitude | number | Yes      |

**Response**

```json
{ "message": "School added successfully" }
```

**Error Response** (missing or invalid fields)

```json
{ "error": "Invalid input data" }
```

---

### `GET /listSchools`

Returns all schools sorted by distance from the user's location.

**Query Parameters**

| Parameter | Type   | Required |
| --------- | ------ | -------- |
| latitude  | number | Yes      |
| longitude | number | Yes      |

**Example Request**

```
GET /listSchools?latitude=22.7196&longitude=75.8577
```

**Response**

```json
[
    {
        "id": 1,
        "name": "ABC School",
        "address": "Indore, Madhya Pradesh",
        "latitude": 22.7196,
        "longitude": 75.8577,
        "distance": 0.0
    }
]
```

**Error Response** (missing query parameters)

```json
{ "error": "Latitude and longitude required" }
```

---

## Deployment

The API is deployed on [Railway](https://railway.app).

**Live URL:** `https://schoolsapi-production-9d78.up.railway.app`

---

## Postman Collection

A Postman collection with example requests and expected responses is available for testing.

[View Postman Collection](https://nagori-vandan04-6614994.postman.co/workspace/Vandan-Nagori's-Workspace~fd55762b-9a9e-4eea-8fd4-973dabe9ad44/collection/53871792-1f6769cb-faae-49de-94dd-a2ce689e7b25?action=share&creator=53871792) <!-- Replace with your public Postman link -->

---

## License

This project was built as part of a Node.js assignment.
