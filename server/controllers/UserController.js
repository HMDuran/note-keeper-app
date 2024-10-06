import User from "../models/UserModel.js";
import bcrypt from 'bcrypt';
import pool from '../config/db.js';

const UserController = {
  signup: async (req, res) => {
    const { email, firstName, lastName, password } = req.body;

    try {
      const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

      if (rows.length > 0) {
        return res.status(409).json({
          message: "User already exists",
        });
      }

      const hashPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        email,
        firstName,
        lastName,
        password: hashPassword,
      });

      return res.status(201).json({
        message: "User created successfully",
        user: newUser,
      });
    } catch (error) {
      console.error("Error creating user:", error);
      return res.status(500).json({
        message: "Error creating user",
        error: error.message,
      });
    }
  },
};

export default UserController;