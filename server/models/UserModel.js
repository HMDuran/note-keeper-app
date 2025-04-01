import pool from "../config/db.js";

export const createUser = async ({ firstName, lastName, email, googleId, hashedPassword }) => {
  const query = `
    INSERT INTO users (first_name, last_name, email, google_id, password)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;
  const values = [firstName, lastName, email, googleId, hashedPassword];

  try {
    console.log("Executing query:", query, values);
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Database error:", error.message);
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
    console.error("Database error:", error.message);
    throw error;
  }
};