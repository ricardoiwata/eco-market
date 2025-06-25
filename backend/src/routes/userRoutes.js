const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const verifyAdmin = require("../auth/adminMiddleware");
const verifyUser = require("../auth/userMiddleware");

const router = express.Router();

const JWT_SECRET = "ecomarket";

router.post("/", async (req, res) => {
  const { username, password, email, cpf } = req.body;

  if (!username || !password || !email || !cpf) {
    return res
      .status(400)
      .json({ message: "Todos os campos são obrigatórios" });
  }

  try {
    const existingUserByUsername = await User.findOne({ username });
    if (existingUserByUsername) {
      return res.status(400).json({ message: "Usuário já existe" });
    }

    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return res.status(400).json({ message: "Email já está em uso" });
    }

    const existingUserByCPF = await User.findOne({ cpf });
    if (existingUserByCPF) {
      return res.status(400).json({ message: "CPF já está em uso" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, email, cpf });

    await user.save();
    res.status(201).json({ message: "Usuário registrado com sucesso" });
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    res.status(500).json({ message: "Erro ao registrar usuário", error });
  }
});

router.get("/", verifyAdmin, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar usuários", error });
  }
});

router.get("/me", verifyUser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar usuário", error });
  }
});

router.put("/me", verifyUser, async (req, res) => {
  const updates = req.body;

  if (updates.role) {
    delete updates.role;
  }

  if (updates.password) {
    updates.password = await bcrypt.hash(updates.password, 10);
  } else {
    delete updates.password;
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(req.user.id, updates, {
      new: true,
      runValidators: true,
      select: "-password",
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar usuário", error });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json({ message: "Usuário não encontrado" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Senha incorreta" });
  }

  const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
    expiresIn: "1h",
  });
  const role = user.role;

  res.json({ token, role });
});

router.post("/admin", verifyAdmin, async (req, res) => {
  const { username, password, email, cpf, role } = req.body;

  if (!username || !password || !email || !cpf || !role) {
    return res
      .status(400)
      .json({ message: "Todos os campos são obrigatórios" });
  }

  if (role !== "admin" && role !== "consumer") {
    return res.status(400).json({ message: "Papel inválido" });
  }

  try {
    const existingUserByUsername = await User.findOne({ username });
    if (existingUserByUsername) {
      return res.status(400).json({ message: "Usuário já existe" });
    }

    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return res.status(400).json({ message: "Email já está em uso" });
    }

    const existingUserByCPF = await User.findOne({ cpf });
    if (existingUserByCPF) {
      return res.status(400).json({ message: "CPF já está em uso" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      password: hashedPassword,
      email,
      cpf,
      role,
    });

    await user.save();
    res.status(201).json({ message: "Usuário registrado com sucesso", user });
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    res.status(500).json({ message: "Erro ao registrar usuário", error });
  }
});

router.put("/:userId", verifyAdmin, async (req, res) => {
  const { userId } = req.params;
  const updates = req.body;

  if (
    updates.role &&
    updates.role !== "admin" &&
    updates.role !== "consumer" &&
    updates.role !== "seller"
  ) {
    return res.status(400).json({ message: "Papel inválido" });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar usuário", error });
  }
});

router.delete("/:userId", verifyAdmin, async (req, res) => {
  const { userId } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    res.json({ message: "Usuário deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar usuário", error });
  }
});

module.exports = router;
