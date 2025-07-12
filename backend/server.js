const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Servidor corriendo correctamente');
});

mongoose.connect('mongodb://localhost:27017/clientesdb').then(() => {
  console.log('Conectado a MongoDB');
}).catch(err => {
  console.error('Error al conectar a MongoDB', err);
});

app.listen(3000, () => {
  console.log('Servidor escuchando en http://localhost:3000');
});
