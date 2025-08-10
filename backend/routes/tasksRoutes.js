const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const auth = require('../middleware/auth');

// Toutes les routes nécessitent une authentification
router.use(auth);

// Routes CRUD pour les tâches
router.post('/', taskController.createTask);
router.get('/', taskController.getAllTasks);
router.get('/:id', taskController.getTask);

module.exports = router;
// ... autres routes
router.patch('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);
