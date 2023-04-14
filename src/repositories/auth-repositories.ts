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

const authRepositories = {
    findUserByEmail,
    signUp
}

export default authRepositories