const pool = require("../config/db");


const createUrl = async (shortCode, originalUrl, userId, expiresAt, alias) => {
  const sql = `
    INSERT INTO urls (short_code, original_url, created_by, expires_at, alias)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, short_code, original_url, is_active, alias;
  `;

  const { rows } = pool.query(sql, [shortCode, originalUrl, userId, expiresAt, alias]);
  return rows[0];
}


modules.exports = { createUrl };