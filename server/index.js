import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});