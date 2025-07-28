import express from "express";
import bcrypt from "bcryptjs";
import { db } from "../db.js";
import jwt from "jsonwebtoken";


const router = express.Router();

// Obtener usuarios
router.get("/users", async (req, res) => {
  try {
    const [results] = await db.query("SELECT * FROM users");
    res.json(results);
  } catch (err) {
    console.error("❌ Error en la consulta:", err);
    res.status(500).json({ error: "Error en la base de datos" });
  }
});

// Registro de usuarios
router.post("/register", async (req, res) => {
  const { name, age, email, password, city } = req.body;

  try {
    // Comprobar si el correo ya existe
    const [existing] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (existing.length > 0) {
      return res.status(400).json({ message: "El correo ya está registrado" });
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insertar usuario
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

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar usuario en la BD
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);

    if (rows.length === 0) {
      return res.status(400).json({ message: "Correo o contraseña incorrectos" });
    }

    const user = rows[0];

    // Comparar contraseña enviada con la guardada (bcrypt)
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Correo o contraseña incorrectos" });
    }

    // Generar token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },          // Datos dentro del token
      process.env.JWT_SECRET,                      // Clave secreta
      { expiresIn: "1h" }                          // Expira en 1 hora
    );

    // Enviar respuesta con token
    res.json({
      message: "✅ Login exitoso",
      token,
      user: { id: user.id, name: user.name, email: user.email }
    });

  } catch (error) {
    console.error("❌ Error en login:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

import { verifyToken } from "../middleware/auth.js";

// ✅ RUTA PROTEGIDA (ejemplo)
router.get("/profile", verifyToken, (req, res) => {
  res.json({
    message: "Acceso concedido a la ruta protegida",
    user: req.user
  });
});



export default router;
