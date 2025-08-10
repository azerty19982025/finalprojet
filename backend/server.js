const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
// ... autres imports
const userRoutes = require('./routes/userRoutes');


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connexion à MongoDB
const dbPassword = '00123456789'; // Remplacez par votre mot de passe
const dbURI = `mongodb+srv://new_ahmed:${dbPassword}@cluster1.7qe5i3a.mongodb.net/final?retryWrites=true&w=majority`;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connecté à MongoDB'))
  .catch(err => console.error('Erreur de connexion à MongoDB:', err));

// Routes de base
app.get('/', (req, res) => {
  res.send('API de gestion des tâches');
});

// Port d'écoute
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
// ... autres imports
const userRoutes = require('./routes/userRoutes');
// ... autres imports
const taskRoutes = require('./routes/taskRoutes');

// ... après les routes utilisateur
app.use('/api/tasks', taskRoutes);
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://votre-domaine.com' 
    : 'http://localhost:3000',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
