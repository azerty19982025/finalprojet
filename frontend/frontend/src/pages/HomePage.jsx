import { useState, useEffect, useContext } from 'react';
import { Container, Typography } from '@mui/material';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';

const HomePage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]);

  const fetchTasks = async () => {
    try {
      const res = await api.get('/tasks');
      setTasks(res.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTaskCreated = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const handleTaskDeleted = (taskId) => {
    setTasks(tasks.filter(task => task._id !== taskId));
  };

  const handleTaskUpdated = (updatedTask) => {
    setTasks(tasks.map(task => 
      task._id === updatedTask._id ? updatedTask : task
    ));
  };

  if (!user) {
    return (
      <Container>
        <Typography variant="h5" sx={{ mt: 4 }}>
          Veuillez vous connecter pour accéder à vos tâches
        </Typography>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container>
        <Typography variant="h5" sx={{ mt: 4 }}>
          Chargement...
        </Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" component="h1" sx={{ mt: 4, mb: 4 }}>
        Mes Tâches
      </Typography>
      <TaskForm onTaskCreated={handleTaskCreated} />
      <TaskList 
        tasks={tasks} 
        onDelete={handleTaskDeleted}
        onUpdate={handleTaskUpdated}
      />
    </Container>
  );
};

export default HomePage;
