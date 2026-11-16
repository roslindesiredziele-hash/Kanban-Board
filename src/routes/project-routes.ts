import { Router, Request, Response} from "express";
import {ProjectDb } from "../models/project_model.ts";
import { db } from "../db.ts";

export const projectRouterDb = Router();

projectRouterDb.get('/', async (req: Request, res: Response) => 
{
    const projectList = await db.all<ProjectDb[]>('SELECT id, name, email, projectname, role FROM projects ORDER BY role');
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
        const project = await db .get<ProjectDb>('SELECT id, name, email, projectname, role FROM projects WHERE id = ?', num);
        if(!project)
        {
            res.status(404).json({error: `project with id ${num} not found`});
        } else
        {
            res.json(project);
        }
    }
});

function validateproject(name: unknown, email: unknown, projectname: unknown, passwordHash: unknown, role: unknown): string | null
{
    if(typeof name !== 'string' || name.trim() === '')
    {
        return 'wrong name';
    }

    if(typeof email !== 'string' || email.trim() === '' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    {
        return 'wrong email';
    }
    
    if(typeof projectname !== 'string' || projectname.trim() === '' || projectname.length < 3  || projectname.length > 20 || !/^[A-Za-z0-9._-]+$/.test(projectname))
    {
        return 'wrong projectname';
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

projectRouterDb.post('/', async (req: Request, res: Response) =>
{
    const{name, email, projectname, passwordHash, role} = req.body;

    const error = validateproject(name, email, projectname, passwordHash, role);

    if (error)
{
    res.status(400).json({ error });
    return;
}

 const cleanedprojectname = projectname.trim();

    const project = await db.get<ProjectDb>(
        'INSERT INTO projects (name, email, projectname, passwordHash, role) VALUES (?, ?, ?, ?, ?) RETURNING id, name, email, projectname, role',
        [name, email, cleanedprojectname, passwordHash, role]
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

    const {name, email, projectname, passwordHash, role} = req.body;

    const error = validateproject(name, email, projectname, passwordHash, role);

    if (error)
    {
        res.status(400).json({ error });
        return;
    }

    const cleanedprojectname = projectname.trim();

    const updatedproject = await db.get<ProjectDb>(
        `
        UPDATE projects
        SET
            name = ?,
            email = ?,
            projectname = ?,
            passwordHash = ?,
            role = ?
        WHERE id = ?
        RETURNING
            id,
            name,
            email,
            projectname,
            role
        `,
        [name, email, cleanedprojectname, passwordHash, role, num]);
        
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
        SELECT
            id,
            name,
            email,
            projectname,
            role
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





function validateProject(name: unknown, description: unknown, status: unknown, startDate: unknown, endDate: unknown, ownerId: unknown): string | null
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

    if (typeof startDate !== 'string' || startDate.trim() === '')
    {
        return 'wrong start date';
    }

    if (typeof endDate !== 'string' || endDate.trim() === '')
    {
        return 'wrong end date';
    }

    if (typeof ownerId !== 'number' || !Number.isInteger(ownerId) || ownerId <= 0)
    {
        return 'wrong owner id';
    }

    return null;
}