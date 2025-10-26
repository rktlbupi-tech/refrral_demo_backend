import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from 'path';
import { fileURLToPath } from 'url';

import { connectDB } from "./src/config/db.js";
import userRoutes from "./src/routes/userRoutes.js";

console.log("Hello World");

// Create __dirname manually in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
connectDB();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());

// Serve the .well-known folder
app.use('/.well-known', express.static(path.join(__dirname, '.well-known')));

// API Routes
app.use("/", userRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
