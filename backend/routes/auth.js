import express from "express";
import bcrypt from "bcryptjs";
import { db } from "../db.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// REGISTRO
router.post("/register", async (req, res) => {
  const { name, age, email, password, city } = req.body;

  try {
    const [existing] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (existing.length > 0) {
      return res.status(400).json({ message: "El correo ya está registrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      "INSERT INTO users (name, age, city, email, password) VALUES (?, ?, ?, ?, ?)",
      [name, age, city, email, hashedPassword]
    );

    res.status(201).json({ message: "Usuario creado exitosamente" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

//Token
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (rows.length === 0) {
      return res.status(401).json({ message: "Correo o contraseña incorrectos" });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Correo o contraseña incorrectos" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email }, // payload
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        city: user.city,
        age: user.age
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

export default router;
