const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend funcionando' });
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));