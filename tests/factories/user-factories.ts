import { faker } from "@faker-js/faker";
import { prisma } from "database/database";
import dotenv from 'dotenv'
import jwt from "jsonwebtoken";

dotenv.config()

export async function createUser() {
    return prisma.users.create({
        data: {
            name: faker.name.firstName(),
            avatar: faker.internet.url(),
            email: faker.internet.email(),
            password: faker.word.noun()
        }
    })
}

export async function createToken(userId: number) {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET)
    return token
}