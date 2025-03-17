const mongoose = require('mongoose');

const connectDB = async (url) => {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log('Já conectado ao MongoDB.');
      return;
    }
    await mongoose.connect(url);
    console.log('MongoDB conectado');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
    throw error;
  }
};

module.exports = connectDB;
