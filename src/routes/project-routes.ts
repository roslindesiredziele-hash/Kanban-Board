import { Router, Request, Response} from "express";
import {ProjectDb } from "../models/project_model.ts";
import { db } from "../db.ts";

export const projectRouterDb = Router();

function validateProject(name: unknown, description: unknown, status: unknown, start_date: unknown, end_date: unknown, owner_id: unknown): string | null
{
    if (typeof name !== 'string' || name.trim() === '' || name.length < 5)
    {
        return 'wrong project name';
    }

    if (typeof description !== 'string' || description.trim() === '' || description.length < 20)
    {
        return 'wrong description';
    }

    if (status !== 'Active' && status !== 'Pending' && status !== 'Completed' && status !== 'Archived')
    {
        return 'wrong status';
    }

    if (typeof start_date !== 'string' || start_date.trim() === '')
    {
        return 'wrong start date';
    }

    if (typeof end_date !== 'string' || end_date.trim() === '')
    {
        return 'wrong end date';
    }

    if (typeof owner_id !== 'number' || !Number.isInteger(owner_id) || owner_id <= 0)
    {
        return 'wrong owner id';
    }

    return null;
}

projectRouterDb.get('/', async (req: Request, res: Response) => 
{
    const projectList = await db.all<ProjectDb[]>('SELECT id, name, description, status, start_date AS startDate, end_date AS endDate, owner_id AS ownerId FROM projects ORDER BY name');
    res.json(projectList);
});

projectRouterDb.get('/:id', async (req: Request, res: Response) => 
{
    const num = Number(req.params.id);

    if(!Number.isInteger(num) || num <= 0)
    {
        console.log(`wrong id requested: ${req.params.id}`);
        res.status(400).json({error: `wrong id requested: ${req.params.id}`});
    }else 
    {
        const project = await db .get<ProjectDb>('SELECT id, name, description, status, start_date AS startDate, end_date AS endDate, owner_id AS ownerId FROM projects WHERE id = ?', num);
        if(!project)
        {
            res.status(404).json({error: `project with id ${num} not found`});
        } else
        {
            res.json(project);
        }
    }
});

projectRouterDb.post('/', async (req: Request, res: Response) =>
{
    const{name, description, status, start_date, end_date, owner_id} = req.body;

    const error = validateProject(name, description, status, start_date, end_date, owner_id);

    if (error)
{
    res.status(400).json({ error });
    return;
}

    const project = await db.get<ProjectDb>(
        'INSERT INTO projects (name, description, status, start_date, end_date, owner_id) VALUES (?, ?, ?, ?, ?, ?) RETURNING id, name, description, status, start_date AS startDate, end_date AS endDate, owner_id AS ownerId',
        [name, description, status, start_date, end_date, owner_id]
    );

    res.status(201).json(project);
});

projectRouterDb.put('/:id', async (req: Request, res: Response) =>
{
    const num = Number(req.params.id);

     if (!Number.isInteger(num) || num <= 0)
    {
        res.status(400).json({
            error: `wrong id requested: ${req.params.id}`
        });
        return;
    }

    const {name, description, status, start_date, end_date, owner_id} = req.body;

    const error = validateProject(name, description, status, start_date, end_date, owner_id);

    if (error)
    {
        res.status(400).json({ error });
        return;
    }

    const updatedproject = await db.get<ProjectDb>(
        `
        UPDATE projects
        SET
            name = ?,
            description = ?,
            status = ?,
            start_date = ?,
            end_date = ?,
            owner_id = ?
        WHERE id = ?
        RETURNING id, name, description, status, start_date AS startDate, end_date AS endDate, owner_id AS ownerId
        `,
        [name, description, status, start_date, end_date, owner_id, num]);
        
        if (!updatedproject)
    {
        res.status(404).json({
            error: `project with id ${num} not found`
        });
        return;
    }

    res.json(updatedproject);
});

projectRouterDb.delete('/:id', async (req: Request, res: Response) =>
{
    const num = Number(req.params.id);

    if (!Number.isInteger(num) || num <= 0)
    {
        res.status(400).json({
            error: `wrong id requested: ${req.params.id}`
        });
        return;
    }

    const project = await db.get<ProjectDb>(
        `
        SELECT name, description, status, start_date AS startDate, end_date AS endDate, owner_id AS ownerId
        FROM projects
        WHERE id = ?
        `,
        num
    );

    if (!project)
    {
        res.status(404).json({
            error: `project with id ${num} not found`
        });
        return;
    }

    await db.run('DELETE FROM projects WHERE id = ?', num);

    console.log(`project with id ${num} deleted successfully`);
     res.json({message: `project with id ${num} deleted successfully`});
});

projectRouterDb.delete('/', async (req: Request, res: Response) =>
{
    await db.run('DELETE FROM projects');

    await db.run(`DELETE FROM sqlite_sequence WHERE name = 'projects'`);
    console.log('All projects deleted successfully');
    res.json({message:'All projects deleted successfully'});
});