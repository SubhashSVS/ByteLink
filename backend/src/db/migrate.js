const fs = require("fs");
const path = require("path");
const pool = require("../config/db");

const runMigrations = async () => {
  const dir = path.join(__dirname, "migrations");
  const files = fs.readdirSync(dir).sort();

  await pool.query(`
    CREATE TABLE IF NOT EXISTS migrations (
      name TEXT PRIMARY KEY,
      run_at TIMESTAMP DEFAULT NOW()
    );
  `);

  for(const file of files) {
    const check = pool.query("SELECT * FROM migrations WHERE name = $1", [file]);
    
    if((await check).rows.length > 0) continue;

    const filePath = path.join(dir, file);
    const sql = fs.readFileSync(filePath).toString();
    
    console.log(`Running migration: ${file}`);
    await pool.query(sql);
    await pool.query("INSERT INTO migrations (name) VALUES ($1)", [file]);
  }

  console.log("Migration complete!");
  process.exit();
}

runMigrations().catch((err) => {
  console.error(err);
  process.exit(1);
});