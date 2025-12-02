const { Pool } = require("pg");
const { dbUrl } = require("./env")

const pool = new Pool({
  connectionString: dbUrl,
  ssl: {
    rejectUnauthorized: false
  },
});

module.exports = pool;