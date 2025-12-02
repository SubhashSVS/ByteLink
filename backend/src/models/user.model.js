const pool = require("../config/db")

const createUser = async (name, email, passwordHash) => {
  const sql = `
    INSERT INTO users (name, email, password_hash)
    VALUES ($1, $2, $3)
    RETURNING id, name, email, created_at;
  `;
  const { rows } = await pool.query(sql, [name, email, passwordHash]);
  return rows[0];
}

const findByEmail = async (email) => {
  const sql = `
    SELECT * FROM users
    WHERE email = $1
    LIMIT 1;
  `;
  const { rows } = await pool.query(sql, [email]);
  return rows[0]; 
}

module.exports = { createUser, findByEmail };