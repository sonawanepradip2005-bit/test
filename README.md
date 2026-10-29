# Express.js Dummy Project

A lightweight starter REST API built with Node.js and Express.js.

## Project Structure

```text
├── src/
│   ├── routes/
│   │   └── users.js     # User CRUD route handlers
│   └── server.js        # Main Express server and middleware setup
├── .env.example         # Example environment variables
├── .gitignore           # Git ignore list
├── package.json         # Project metadata and dependencies
└── README.md            # Project documentation
```

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Run the Application

- **Production / Standard Mode:**
  ```bash
  npm start
  ```

- **Development Mode (Auto-reloads on file change):**
  ```bash
  npm run dev
  ```

The server will start at `http://localhost:3000`.

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | API status and endpoint directory |
| `GET` | `/api/health` | Health check and server uptime |
| `GET` | `/api/users` | Retrieve all users (Supports `?role=admin`) |
| `GET` | `/api/users/:id` | Retrieve user by ID |
| `POST` | `/api/users` | Create a new user |
| `PUT` | `/api/users/:id` | Update an existing user |
| `DELETE` | `/api/users/:id` | Remove a user |

---

## Example Requests

### Create a User
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "David Miller", "email": "david@example.com", "role": "developer"}'
```

### Get All Users
```bash
curl http://localhost:3000/api/users
```

### Update a User
```bash
curl -X PUT http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "Alice Wonderland"}'
```

### Delete a User
```bash
curl -X DELETE http://localhost:3000/api/users/2
```
