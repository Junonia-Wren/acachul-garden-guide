import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/users.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: " http://localhost:8080", // direccion donde corre el front
  methods: ["GET", "POST"],
  credentials: true
}));


app.use(express.json());

// ✅ Montar las rutas
app.use("/api", userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
