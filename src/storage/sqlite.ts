import { DatabaseSync } from "node:sqlite"

const dbPath = "./storage.db"

const getConnection = () => {
  return new DatabaseSync(dbPath)
}

export const saveUser = (tgId: number, username: string) => {
  const db = getConnection()

  const query = db.prepare(
    "INSERT OR IGNORE INTO users (tg_id, name) VALUES (?, ?)",
  )
  query.run(tgId, username)

  db.close()
}

export const createTables = () => {
  const db = getConnection()

  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      tg_id INTEGER NOT NULL UNIQUE,
      name TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS rssources (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      feed_url TEXT NOT NULL UNIQUE,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS materials (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      rssource_id INTEGER NOT NULL,
      title TEXT NOT NULL,
      link TEXT NOL NULL UNIQUE,
      pub_date TEXT NOT NULL,
      summary TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      posted_at TEXT,

      FOREIGN KEY (rssource_id) REFERENCES rssources (id)
    );
  `)

  db.close()
}
