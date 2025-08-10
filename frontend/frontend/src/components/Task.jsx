import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  Chip,
  TextField,
  Stack
} from '@mui/material';
import { 
  Edit as EditIcon, 
  Delete as DeleteIcon,
  Check as CheckIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { format } from 'date-fns';
import api from '../services/api';

const Task = ({ task, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const handleUpdate = async () => {
    try {
      await api.patch(`/tasks/${task._id}`, editedTask);
      onUpdate(editedTask);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const statusColors = {
    'todo': 'default',
    'in-progress': 'primary',
    'completed': 'success'
  };

  const priorityColors = {
    'low': 'success',
    'medium': 'warning',
    'high': 'error'
  };

  return (
    <Card className="task-card">
      <CardContent>
        {isEditing ? (
          <>
            <TextField
              fullWidth
              margin="normal"
              label="Titre"
              value={editedTask.title}
              onChange={(e) => setEditedTask({...editedTask, title: e.target.value})}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Description"
              multiline
              rows={3}
              value={editedTask.description}
              onChange={(e) => setEditedTask({...editedTask, description: e.target.value})}
            />
            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
              <Button 
                variant="contained" 
                startIcon={<CheckIcon />} 
                onClick={handleUpdate}
              >
                Enregistrer
              </Button>
              <Button 
                variant="outlined" 
                startIcon={<CloseIcon />} 
                onClick={() => setIsEditing(false)}
              >
                Annuler
              </Button>
            </Stack>
          </>
        ) : (
          <>
            <Typography variant="h6" component="div">
              {task.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {task.description}
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
              <Chip 
                label={task.status} 
                size="small" 
                color={statusColors[task.status]}
              />
              <Chip 
                label={task.priority} 
                size="small" 
                color={priorityColors[task.priority]}
              />
              {task.dueDate && (
                <Chip 
                  label={format(new Date(task.dueDate), 'dd/MM/yyyy')}
                  size="small"
                />
              )}
            </Stack>
            <div className="task-actions">
              <Button 
                size="small" 
                startIcon={<EditIcon />} 
                onClick={() => setIsEditing(true)}
              >
                Modifier
              </Button>
              <Button 
                size="small" 
                startIcon={<DeleteIcon />} 
                onClick={() => onDelete(task._id)}
                color="error"
              >
                Supprimer
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default Task;
