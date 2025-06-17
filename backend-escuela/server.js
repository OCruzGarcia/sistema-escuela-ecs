const express = require('express');
const cors = require('cors');
const { poolPromise } = require('./config/db');
const estudianteRoutes = require('./routes/estudiantes');
const asistenciaRoutes = require('./routes/asistencias');
const anioEscolarRoutes = require('./routes/anios-escolares');
const familiarRoutes = require('./routes/familiares');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/estudiantes', estudianteRoutes);
app.use('/api/asistencias', asistenciaRoutes);
app.use('/api/anios-escolares', anioEscolarRoutes);
app.use('/api/familiares', familiarRoutes);

app.get('/api/test', async (req, res) => {
  try {
    const pool = await poolPromise;
    res.json({ message: 'Backend funcionando, conectado a Azure SQL' });
  } catch (err) {
    res.status(500).json({ error: 'Error de conexión a la base de datos' });
  }
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));