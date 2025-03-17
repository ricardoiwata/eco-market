const express = require('express');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

module.exports = app;