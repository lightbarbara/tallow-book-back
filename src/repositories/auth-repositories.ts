import { users } from "@prisma/client"
import { prisma } from "../database/database"

async function findUserByEmail(email: string): Promise<users | void> {
    return await prisma.users.findFirst({
        where: {
            email
        }
    })
}

async function signUp(name: string, email: string, avatar: string, password: string): Promise<users> {
    return await prisma.users.create({
        data: {
            name,
            email,
            avatar,
            password
        }
    })
}

async function findUserById(id: number): Promise<users> {
    return await prisma.users.findFirst({
        where: {
            id
        }
    })
}

const authRepositories = {
    findUserByEmail,
    signUp,
    findUserById
}

export default authRepositories