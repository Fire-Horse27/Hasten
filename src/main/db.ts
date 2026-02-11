import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
const Database = require('better-sqlite3')

import { app } from 'electron'
import path from 'path'

// Resolve DB location inside Electron user data directory
const dbPath = path.join(app.getPath('userData'), 'hasten.db')

// Open database (synchronous, safe for desktop apps)
const db = new Database(dbPath)

// Ensure foreign keys are enforced
db.pragma('foreign_keys = ON')

// Initialize schema
db.exec(`
CREATE TABLE IF NOT EXISTS accounts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  balance INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS transactions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  account_id INTEGER NOT NULL,
  date TEXT NOT NULL,
  amount INTEGER NOT NULL,
  payee TEXT,
  category_id INTEGER,
  memo TEXT,
  FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);
`)

// ---- Account API ----

export function addAccount(name: string, type: string, balance: number = 0) {
	const stmt = db.prepare(`
    INSERT INTO accounts (name, type, balance)
    VALUES (?, ?, ?)
  `)
	return stmt.run(name, type, balance)
}

export function getAccounts() {
	const stmt = db.prepare(`
    SELECT * FROM accounts
    ORDER BY name
  `)
	return stmt.all()
}

// ---- Transaction API ----

export function addTransaction(
	accountId: number,
	date: string,
	amount: number,
	payee?: string,
	categoryId?: number,
	memo?: string
) {
	const stmt = db.prepare(`
    INSERT INTO transactions
    (account_id, date, amount, payee, category_id, memo)
    VALUES (?, ?, ?, ?, ?, ?)
  `)
	return stmt.run(
		accountId,
		date,
		amount,
		payee ?? null,
		categoryId ?? null,
		memo ?? null
	)
}

export function getTransactions(accountId: number) {
	const stmt = db.prepare(`
    SELECT *
    FROM transactions
    WHERE account_id = ?
    ORDER BY date DESC, id DESC
  `)
	return stmt.all(accountId)
}
