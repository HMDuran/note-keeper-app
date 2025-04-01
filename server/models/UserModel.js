import pool from '../config/db.js';

export const createUser = async ({ firstName, lastName, email, hashedPassword }) => {
  const query = `
    INSERT INTO users (first_name, last_name, email, password)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const values = [firstName, lastName, email, hashedPassword];

  try {
    console.log("Executing query:", query, values);
    const result = await pool.query(query, values);
    console.log("Query result:", result.rows[0]);
    return result.rows[0];
  } catch (error) {
    console.error("Database error:", error.message || error);
    throw error;
  }
};