import { faker } from '@faker-js/faker';
import { db } from '../src/db.ts';
import { Role } from '../src/models/user_model.ts';
import bcrypt from 'bcrypt';

const count = Number(process.argv[2]) || 10;

const adminCount = Math.floor(count * 0.10);
const managerCount = Math.floor(count * 0.30);
const memberCount = count - adminCount - managerCount;

const passwordHash = await bcrypt.hash('Password123!', 10);

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

async function createUser(role: Role, index: number)
{
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    const username =
        `${firstName.toLowerCase()}.${lastName.toLowerCase()}_${index}`;

    const email =
        `${username}@example.com`;

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
            passwordHash,
            role
        ]
    );
}

console.log(`${count} fake users generated successfully.`);