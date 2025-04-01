import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './router/authRoutes.js'; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: 'http://localhost:5175', 
  methods: 'GET, POST, PUT, DELETE', 
  credentials: true,
}));

app.use(express.json()); 
app.use('/api/auth', authRoutes); 

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});