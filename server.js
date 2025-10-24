import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./src/config/db.js";
import userRoutes from "./src/routes/userRoutes.js";

// ✅ Print Hello World in console first
console.log("Hello World");  // <-- this prints in terminal when you run node

dotenv.config();
const app = express();
connectDB();

app.use(cors({
  origin: "*", // or specify your Flutter base URL
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

const PORT =  4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
