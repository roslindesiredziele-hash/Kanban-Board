import { Router, Request, Response } from "express";
import { User, UserDb } from "../models/user_model";
import { db } from "../db";

export const userRouterDb = Router();

userRouterDb.get('/', async (req: Request, res: Response) => 
{
    const userList = await db.all<UserDb[]>('SELECT id, name, email, usename, passwordhash, role FROM user ORDER BY role');
    res.json(userList);
});

userRouterDb.get('/:id', async (req: Request, res: Response) => 
{
    const num = Number(req.params.id);

    if(!Number.isInteger(num) || num < 0)
    {
        console.log(`wrong id requested: ${req.params.id}`);
        res.status(400).json({error: `worng id requested: ${req.params.id}`});
    }
});