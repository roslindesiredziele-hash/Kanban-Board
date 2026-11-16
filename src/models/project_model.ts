export type ProjectStatus =
    | 'Active'
    | 'Pending'
    | 'Completed'
    | 'Archived';


export interface Project
{
    name: string;
    description: string;
    status: ProjectStatus;
    startDate: Date;
    endDate: Date;
    ownerId: number;
}

export interface ProjectDb extends Project
{
    id: number;
}