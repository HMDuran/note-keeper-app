import pool from "../config/db.js";

export const createUser = async ({ firstName, lastName, email, hashedPassword }) => {
  const query = `
    INSERT INTO users (first_name, last_name, email, password)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const values = [firstName, lastName, email, hashedPassword];

  try {
    const result = await pool.query(query, values);
    console.log("Database insert result:", result.rows[0]); 
    return result.rows[0];
  } catch (error) {
    throw error; 
  }
};

export const findUserByEmail = async (email) => {
  const query = `SELECT * FROM users WHERE email = $1`;
  const values = [email];

  try {
    const result = await pool.query(query, values);
    return result.rows[0]; 
  } catch (error) {
    throw error;
  }
};

export const findUserById = async (userId) => {
  const query = `SELECT * FROM users WHERE id = $1`;
  const values = [userId];

  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Database error:", error.message);
    throw error;
  }
};

export const updateGoogleIdByEmail = async (email, googleId) => {
  const query = `UPDATE users SET google_id = $1 WHERE email = $2 RETURNING *`;
  const values = [googleId, email];

  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Database error in updateGoogleIdByEmail:", error.message);
    throw error;
  }
};