const mongoose = require('mongoose');
const validator = require('validator');
const { validarCPF } = require('../validators'); // Certifique-se de que o caminho está correto

// Definição do esquema
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: {
      type: String,
      required: true,
      unique: true,
      validate: [validator.isEmail, 'Email inválido']
  },
  cpf: {
      type: String,
      required: true,
      unique: true,
      validate: {
          validator: validarCPF,
          message: props => `${props.value} não é um CPF válido!`
      }
  },
  role: { type: String, enum: ['consumer', 'admin'], default: 'consumer' }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);