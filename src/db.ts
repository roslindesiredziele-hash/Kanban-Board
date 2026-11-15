import sqlite3 from "sqlite3";
import { open } from "sqlite";

export const db = await open(
{
    filename: './data/app.sqlite3',
    driver: sqlite3.Database
}
);

await db.exec(`
    CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    username TEXT NOT NULL UNIQUE,
    passwordHash TEXT NOT NULL,
    role TEXT NOT NULL
    )
    `)