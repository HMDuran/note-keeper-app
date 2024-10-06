import pool from '../config/db.js';

const User = {
  create: async (user) => {
    const { email, firstName, lastName, password } = user;
    const res = await pool.query(
      'INSERT INTO users (email, first_name, last_name, password) VALUES ($1, $2, $3, $4) RETURNING *',
      [email, firstName, lastName, password]
    );
    return res.rows[0];
  },
};

export default User;
