import { createUser, findUserByEmail } from '../models/userModel.js';
import { OAuth2Client } from 'google-auth-library';
import bcrypt from "bcrypt";


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
    }

    console.log("User authenticated successfully:", user);
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Error verifying Google token:", error.message || error);
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};