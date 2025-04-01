import { createUser } from '../models/userModel.js';
import bcrypt from 'bcrypt';

export const signUp = async (req, res) => {
  try {
    console.log("Request body received:", req.body); 
    const { firstName, lastName, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser({ firstName, lastName, email, hashedPassword });

    console.log("User created successfully:", user);
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error("Backend error during signup:", error.message || error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};