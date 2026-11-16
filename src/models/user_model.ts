export type Role =
    | 'Administrator'
    | 'Manager'
    | 'Member';
    
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