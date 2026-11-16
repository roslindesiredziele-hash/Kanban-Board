import sqlite3 from "sqlite3";
import { open } from "sqlite";

export const db = await open(
{
    filename: './data/app.sqlite3',
    driver: sqlite3.Database
}
);

await db.exec('PRAGMA foreign_keys = ON');

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

await db.exec(`
    CREATE TABLE IF NOT EXISTS projects(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    status TEXT NOT NULL,
    start_date TEXT NOT NULL,
    end_date TEXT NOT NULL,
    owner_id INTEGER NOT NULL,

    FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE RESTRICT
    )
    `)

await db.exec(`
    CREATE TABLE IF NOT EXISTS project_members(
    project_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    role TEXT NOT NULL,

    PRIMARY KEY (project_id, user_id),

    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
    `)