const express = require('express');
const mongoose = require('mongoose');
const Product = require('../models/Product');

const router = express.Router();

// Criar um novo produto
router.post('/', async (req, res) => {
  const { name, description, price, category, state, image } = req.body;

  const product = new Product({ name, description, price, state, category, image });

  try {
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar o produto', error });
  }
});

// Obter todos os produtos
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter produtos', error });
  }
});

// Obter um produto por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: 'Produto não encontrado' });
  }

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter o produto', error });
  }
});

// Atualizar um produto
router.put('/:id', async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: 'Produto não encontrado' });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar o produto', error });
  }
});

// Deletar um produto
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: 'Produto não encontrado' });
  }

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }
    res.json({ message: 'Produto deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar o produto', error });
  }
});

module.exports = router;