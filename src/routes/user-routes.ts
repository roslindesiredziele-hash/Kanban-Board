import { Router, Request, Response, response } from "express";
import { UserDb } from "../models/user_model.ts";
import { db } from "../db.ts";
import { request } from "node:http";

export const userRouterDb = Router();

userRouterDb.get('/', async (req: Request, res: Response) => 
{
    const userList = await db.all<UserDb[]>('SELECT id, name, email, username, role FROM users ORDER BY role');
    res.json(userList);
});

userRouterDb.get('/:id', async (req: Request, res: Response) => 
{
    const num = Number(req.params.id);

    if(!Number.isInteger(num) || num <= 0)
    {
        console.log(`wrong id requested: ${req.params.id}`);
        res.status(400).json({error: `wrong id requested: ${req.params.id}`});
    }else 
    {
        const user = await db .get<UserDb>('SELECT id, name, email, username, role FROM users WHERE id = ?', num);
        if(!user)
        {
            res.status(404).json({error: `user with id ${num} not found`});
        } else
        {
            res.json(user);
        }
    }
});

function validateUser(name: unknown, email: unknown, username: unknown, passwordHash: unknown, role: unknown): string | null
{
    if(typeof name !== 'string' || name.trim() === '')
    {
        return 'wrong name';
    }

    if(typeof email !== 'string' || email.trim() === '' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    {
        return 'wrong email';
    }
    
    if(typeof username !== 'string' || username.trim() === '' || username.length < 3  || username.length > 20 || !/^[A-Za-z0-9._-]+$/.test(username))
    {
        return 'wrong username';
    }

    if(typeof passwordHash !== 'string' || passwordHash.trim() === '')
    {
        return 'wrong password hash';
    }

    if(role !== 'Administrator' && role !== 'Manager' && role !== 'Member')
    {
        return 'wrong role';
    }

    return null;
};

userRouterDb.post('/', async (req: Request, res: Response) =>
{
    const{name, email, username, passwordHash, role} = req.body;

    const error = validateUser(name, email, username, passwordHash, role);

    if (error)
{
    res.status(400).json({ error });
    return;
}

 const cleanedUsername = username.trim();

    const user = await db.get<UserDb>(
        'INSERT INTO users (name, email, username, passwordHash, role) VALUES (?, ?, ?, ?, ?) RETURNING id, name, email, username, role',
        [name, email, cleanedUsername, passwordHash, role]
    );

    res.status(201).json(user);
});

userRouterDb.put('/', async (req: Request, res: Response) =>
{
    const num = Number(req.params.id);

     if (!Number.isInteger(num) || num <= 0)
    {
        res.status(400).json({
            error: `wrong id requested: ${req.params.id}`
        });
        return;
    }

    
});