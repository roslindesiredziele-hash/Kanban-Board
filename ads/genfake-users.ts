import { faker } from '@faker-js/faker';
import { db } from '../src/db.ts';
import { Role } from '../src/models/user_model.ts';

const count = Number(process.argv[2]) || 5;

function generateRole(): Role
{
    const random = faker.number.int({
        min: 1,
        max: 100
    });

    if (random <= 10)
    {
        return 'Administrator';
    }

    if (random <= 40)
    {
        return 'Manager';
    }

    return 'Member';
}

for (let i = 0; i < count; i++)
{
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    const username =
        `${firstName.toLowerCase()}.${lastName.toLowerCase()}_${i}`;

    const email =
        `${username}@example.com`;

    const role = generateRole();

    await db.run(
        `
        INSERT INTO users
        (
            name,
            email,
            username,
            passwordHash,
            role
        )
        VALUES (?, ?, ?, ?, ?)
        `,
        [
            `${firstName} ${lastName}`,
            email,
            username,
            'fake_password_hash',
            role
        ]
    );
}

console.log(`${count} fake users generated successfully.`);