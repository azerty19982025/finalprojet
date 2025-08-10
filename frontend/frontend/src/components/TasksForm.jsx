import { useState } from 'react';
import { 
  TextField, 
  Button, 
  Stack, 
  MenuItem,
  Box
} from '@mui/material';
import api from '../services/api';

const TaskForm = ({ onTaskCreated }) => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    status: 'todo',
    priority: 'medium'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/tasks', task);
      onTaskCreated(res.data);
      setTask({
        title: '',
        description: '',
        dueDate: '',
        status: 'todo',
        priority: 'medium'
      });
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} className="form-container">
      <TextField
        fullWidth
        margin="normal"
        label="Titre"
        value={task.title}
        onChange={(e) => setTask({...task, title: e.target.value})}
        required
      />
      <TextField
        fullWidth
        margin="normal"
        label="Description"
        multiline
        rows={3}
        value={task.description}
        onChange={(e) => setTask({...task, description: e.target.value})}
      />
      <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
        <TextField
          fullWidth
          margin="normal"
          label="Date d'échéance"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={task.dueDate}
          onChange={(e) => setTask({...task, dueDate: e.target.value})}
        />
        <TextField
          fullWidth
          margin="normal"
          select
          label="Statut"
          value={task.status}
          onChange={(e) => setTask({...task, status: e.target.value})}
        >
          {['todo', 'in-progress', 'completed'].map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          fullWidth
          margin="normal"
          select
          label="Priorité"
          value={task.priority}
          onChange={(e) => setTask({...task, priority: e.target.value})}
        >
          {['low', 'medium', 'high'].map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </Stack>
      <Button 
        type="submit" 
        variant="contained" 
        fullWidth 
        sx={{ mt: 3 }}
      >
        Ajouter une tâche
      </Button>
    </Box>
  );
};

export default TaskForm;
