export interface Role
{
    Administrator: string;
    administrator: string;
    Admin: string;
    ADMIN: string;
    Manager: string;
    manager: string;
    Member: string;
    member: string;
}

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