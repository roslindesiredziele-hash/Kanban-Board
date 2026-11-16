type ProjectMemberRole =
    | 'Owner'
    | 'Manager'
    | 'Member';

export interface ProjectMember
{
    projectId: number;
    userId: number;
    role: ProjectMemberRole;
}