import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./src/config/db.js";
import userRoutes from "./src/routes/userRoutes.js";

console.log("Hello World");

dotenv.config();
const app = express();
connectDB();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());

// Routes
app.use("/", userRoutes);
// app.get('/', (req, res) => {
//   console.log("home route")
//   res.send("Hello World from server!");
// });

const PORT =  process.env.PORT;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
