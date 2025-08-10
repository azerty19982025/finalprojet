const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  dueDate: {
    type: Date
  },
  status: {
    type: String,
    enum: ['todo', 'in-progress', 'completed'],
    default: 'todo'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
}, {
  timestamps: true
});

const Task = mongoose.model('Task', taskSchema, 'collect'); // 'collect' est le nom de votre collection

module.exports = Task;
const Task = require('../models/Task');


// Création d'une tâche
exports.createTask = async (req, res) => {
  try {
    const task = new Task({
      ...req.body,
      owner: req.user._id
    });
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// Récupération de toutes les tâches de l'utilisateur
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ owner: req.user._id });
    res.send(tasks);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// Récupération d'une tâche spécifique
exports.getTask = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, owner: req.user._id });
    
    if (!task) {
      return res.status(404).send({ error: 'Tâche non trouvée' });
    }
    
    res.send(task);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
