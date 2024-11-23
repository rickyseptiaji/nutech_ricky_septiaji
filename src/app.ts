import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes"
import profileRoutes from "./routes/profileRoutes"
import informationRoutes from "./routes/informationRoutes"
import transactionRoutes from "./routes/transactionRoutes"
dotenv.config();

const app = express()

app.use(express.json());
app.use("/", authRoutes);
app.use("/", profileRoutes);
app.use("/", informationRoutes);
app.use("/", transactionRoutes);

export default app;