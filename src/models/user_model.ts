export interface User
{
    name: string;
    email: string;
    username: string;
    passwordHash: string;
    role: string;
}

export interface UserDb extends User
{
    id: number;
}