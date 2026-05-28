import * as fs from 'node:fs'
import * as path from 'node:path'
import { DatabaseSync } from 'node:sqlite'

import { createDatabase } from 'remix/data-table'
import { createSqliteDatabaseAdapter } from 'remix/data-table/sqlite'

const databasePath = process.env.DATABASE_PATH ?? path.join(process.cwd(), 'db', 'app.db')

// Make sure the directory exists before opening the file-backed database.
fs.mkdirSync(path.dirname(databasePath), { recursive: true })

const sqlite = new DatabaseSync(databasePath)
sqlite.exec('PRAGMA journal_mode = WAL;')
sqlite.exec('PRAGMA foreign_keys = ON;')

// Lightweight bootstrap so a fresh checkout works without a separate
// migration step. The shape mirrors `app/data/schema.ts`.
sqlite.exec(`
  CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT,
    budget TEXT,
    message TEXT,
    created_at INTEGER NOT NULL
  );
`)

export const db = createDatabase(createSqliteDatabaseAdapter(sqlite))
