export type Role =
    'Administrator'
    'administrator'
    'Admin'
    'ADMIN'
    'Manager'
    'manager'
    'Member'
    'member';

export interface User
{
    name: string;
    email: string;
    username: string;
    passwordHash: string;
    role: Role;
}

export interface UserDb extends User
{
    id: number;
}