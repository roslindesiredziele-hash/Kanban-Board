import { Router, Request, Response } from "express";
import { UserDb } from "../models/user_model.ts";
import { db } from "../db.ts";

export const userRouterDb = Router();

userRouterDb.get('/', async (req: Request, res: Response) => 
{
    const userList = await db.all<UserDb[]>('SELECT id, name, email, username, passwordHash, role FROM users ORDER BY role');
    res.json(userList);
});

userRouterDb.get('/:id', async (req: Request, res: Response) => 
{
    const num = Number(req.params.id);

    if(!Number.isInteger(num) || num < 0)
    {
        console.log(`wrong id requested: ${req.params.id}`);
        res.status(400).json({error: `worng id requested: ${req.params.id}`});
    }else 
    {
        const user = await db .get<UserDb>('SELECT id, name, email, username, passwordHash, role FROM users WHERE id = ?', num);
        if(!user)
        {
            res.status(400).json({error: `user with id ${num} not found`});
        } else
        {
            res.json(user);
        }
    }
});

userRouterDb.post('/', async (req: Request, res: Response) =>
{
    const{name, email, username, passwordHash, role} = req.body;

    const usrs = await db.get<UserDb>(
        'INSERT INTO users (name, email, username, passwordHash, role) VALUES (?, ?, ?, ?, ?) RETURNING id, name, email, username, passwordHash, role',
        [name, email, username, passwordHash, role]
    );

    res.status(201).json(usrs);
});