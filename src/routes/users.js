const express = require('express');
const router = express.Router();

// In-memory dummy data store
let users = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'admin' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'user' },
  { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'user' }
];

// GET /api/users - Get all users
router.get('/', (req, res) => {
  const { role } = req.query;
  if (role) {
    const filteredUsers = users.filter((u) => u.role.toLowerCase() === role.toLowerCase());
    return res.json({ success: true, count: filteredUsers.length, data: filteredUsers });
  }
  res.json({ success: true, count: users.length, data: users });
});

// GET /api/users/:id - Get a user by ID
router.get('/:id', (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const user = users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({ success: false, message: `User with ID ${req.params.id} not found` });
  }

  res.json({ success: true, data: user });
});

// POST /api/users - Create a new user
router.post('/', (req, res) => {
  const { name, email, role } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      success: false,
      message: 'Name and email are required fields'
    });
  }

  const newUser = {
    id: users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1,
    name,
    email,
    role: role || 'user'
  };

  users.push(newUser);
  res.status(201).json({ success: true, message: 'User created successfully', data: newUser });
});

// PUT /api/users/:id - Update an existing user
router.put('/:id', (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const userIndex = users.findIndex((u) => u.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ success: false, message: `User with ID ${req.params.id} not found` });
  }

  const { name, email, role } = req.body;

  users[userIndex] = {
    ...users[userIndex],
    ...(name !== undefined && { name }),
    ...(email !== undefined && { email }),
    ...(role !== undefined && { role })
  };

  res.json({ success: true, message: 'User updated successfully', data: users[userIndex] });
});

// DELETE /api/users/:id - Delete a user
router.delete('/:id', (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const userIndex = users.findIndex((u) => u.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ success: false, message: `User with ID ${req.params.id} not found` });
  }

  const deletedUser = users.splice(userIndex, 1)[0];
  res.json({ success: true, message: 'User deleted successfully', data: deletedUser });
});

module.exports = router;
