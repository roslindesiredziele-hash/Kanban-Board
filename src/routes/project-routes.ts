function validateProject(name: unknown, description: unknown, status: unknown, startDate: unknown, endDate: unknown, ownerId: unknown): string | null
{
    if (
        typeof name !== 'string' ||
        name.trim() === ''
    )
    {
        return 'wrong project name';
    }

    if (
        typeof description !== 'string' ||
        description.trim() === ''
    )
    {
        return 'wrong description';
    }

    if (
        status !== 'Active' &&
        status !== 'Pending' &&
        status !== 'Completed' &&
        status !== 'Archived'
    )
    {
        return 'wrong status';
    }

    if (
        typeof startDate !== 'string' ||
        startDate.trim() === ''
    )
    {
        return 'wrong start date';
    }

    if (
        typeof endDate !== 'string' ||
        endDate.trim() === ''
    )
    {
        return 'wrong end date';
    }

    if (
        typeof ownerId !== 'number' ||
        !Number.isInteger(ownerId) ||
        ownerId <= 0
    )
    {
        return 'wrong owner id';
    }

    return null;
}