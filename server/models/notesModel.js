import pool from "../config/db.js"; 

export const addNoteToDB = async (userId, title, content) => {
  try {
    const result = await pool.query(
      "INSERT INTO notes (user_id, title, content) VALUES ($1, $2, $3) RETURNING *",
      [userId, title, content]
    );
    return result.rows[0];
  } catch (err) {
    throw new Error("Failed to add note to the database: " + err.message);
  }
};

export const getNotesByUserId = async (userId) => {
  try {
    const result = await pool.query(
      "SELECT * FROM notes WHERE user_id = $1 ORDER BY created_at DESC",
      [userId]
    );
    return result.rows;
  } catch (error) {
    throw new Error("Failed to fetch notes from database");
  }
};
