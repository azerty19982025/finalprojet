// Mise à jour d'une tâche
exports.updateTask = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['title', 'description', 'dueDate', 'status', 'priority'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Mises à jour invalides' });
  }

  try {
    const task = await Task.findOne({ _id: req.params.id, owner: req.user._id });
    
    if (!task) {
      return res.status(404).send({ error: 'Tâche non trouvée' });
    }
    
    updates.forEach(update => task[update] = req.body[update]);
    await task.save();
    
    res.send(task);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// Suppression d'une tâche
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
    
    if (!task) {
      return res.status(404).send({ error: 'Tâche non trouvée' });
    }
    
    res.send(task);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
  exports.getAllTasks = async (req, res) => {
  const match = {};
  const sort = {};

  // Filtrage par statut
  if (req.query.status) {
    match.status = req.query.status;
  }

  // Filtrage par priorité
  if (req.query.priority) {
    match.priority = req.query.priority;
  }

  // Tri
  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(':');
    sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
  }

  try {
    await req.user.populate({
      path: 'tasks',
      match,
      options: {
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.skip),
        sort
      }
    }).execPopulate();
    
    res.send(req.user.tasks);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
};
