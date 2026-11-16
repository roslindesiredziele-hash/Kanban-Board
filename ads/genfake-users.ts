import { faker } from '@faker-js/faker';
import { db } from '../src/db.ts';
import { Role } from '../src/models/user_model.ts';
import bcrypt from 'bcrypt';

const count = Number(process.argv[2]) || 10;

const adminCount = Math.floor(count * 0.10);
const managerCount = Math.floor(count * 0.30);
const memberCount = count - adminCount - managerCount;

const passwordHash = await bcrypt.hash('Password123!', 10);

let index = 0;

