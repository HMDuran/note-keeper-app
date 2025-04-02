import { createUser, findUserByEmail, updateGoogleIdByEmail } from '../models/userModel.js';
import { OAuth2Client } from 'google-auth-library';
import bcrypt from "bcrypt";

export const signUp = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser({ firstName, lastName, email, hashedPassword });

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error("Error in signUp:", error.message || error); 
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleSignIn = async (req, res) => {
  try {
    const { token } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, sub: googleId } = payload;

    let user = await findUserByEmail(email);

    if (!user) {
      user = await createUser({
        firstName: name.split(" ")[0],
        lastName: name.split(" ")[1] || "",
        email,
        googleId, 
        hashedPassword: null,
      });
    } else if (!user.google_id) {
      await updateGoogleIdByEmail(email, googleId); 
      user.google_id = googleId; 
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Error in Google sign-in:", error.message);
    res.status(401).json({ success: false, message: "Invalid Google token" });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }
    res.status(200).json({
      success: true,
      message: "Sign-in successful",
      user: {
        id: user.id, 
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error during sign-in:", error.message || error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};