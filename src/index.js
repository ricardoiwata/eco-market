const express = require('express');
const connectDB = require('./db');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors())

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

connectDB('mongodb://localhost:27017/ecomarket').then(() => {
  if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  }
});

module.exports = app;