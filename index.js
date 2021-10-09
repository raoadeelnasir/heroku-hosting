import express from "express";
import { databaseConnection } from "./db/connection.js";
import userRoutes from "./routes/userRoutes.js";
import privateRoutes from "./routes/privateRoutes.js";
import dotenv from "dotenv";
import cors from "cors";
const app = express();
dotenv.config();

app.use(cors());

app.use(express.json());

// middleware

// Rotes
app.use("/user", userRoutes);
app.use("/private", privateRoutes);

// DATABASE connection
databaseConnection();

// PORT
const Port = 8000;

app.listen(Port, () => {
  console.log(`losthost is running on ${Port}`);
});
