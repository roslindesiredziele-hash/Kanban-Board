export type ProjectStatus =
    | 'Active'
    | 'pending'
    | 'Completed'
    | 'Archieved';


export interface Project
{
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    ownerId: number;
}