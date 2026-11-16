import { faker } from '@faker-js/faker';
import { db } from '../src/db.ts';
import { Role } from '../src/models/user_model.ts';

const count = Number(process.argv[2]) || 10;

const roles: Role[] = [
    'Administrator',
    'Manager',
    'Member'
];

for(let i = 0; i < count; i++)
{
    const username =
        `${faker.internet.username()}_${i}`;

    const email =
        `${username}@example.com`;

    const role =
        faker.helpers.arrayElement(roles);

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
            faker.person.fullName(),
            email,
            username,
            'fake_password_hash',
            role
        ]
    );
}

console.log(`${count} fake users generated.`);