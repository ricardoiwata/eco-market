const express = require("express");
const mongoose = require("mongoose");
const Product = require("../models/Product");

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, description, price, category, state, image, sellerPhone } =
    req.body;

  const product = new Product({
    name,
    description,
    price,
    state,
    category,
    image,
    sellerPhone,
  });

  try {
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar o produto", error });
  }
});

router.get("/", async (req, res) => {
  const { search, category, priceMin, priceMax } = req.query;
  let filter = {};

  if (search) filter.name = { $regex: search, $options: "i" };
  if (category) filter.category = category;
  if (priceMin || priceMax) filter.price = {};
  if (priceMin) filter.price.$gte = Number(priceMin);
  if (priceMax) filter.price.$lte = Number(priceMax);

  try {
    const products = await Product.find(filter);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Erro ao obter produtos", error });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Produto não encontrado" });
  }

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Erro ao obter o produto", error });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Produto não encontrado" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedProduct) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar o produto", error });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Produto não encontrado" });
  }

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }
    res.json({ message: "Produto deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar o produto", error });
  }
});

module.exports = router;
