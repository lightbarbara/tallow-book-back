import { users } from "@prisma/client"
import authRepositories from "../repositories/auth-repositories"
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"

async function signUp(name: string, email: string, avatar: string, password: string): Promise<users> {
    const emailRegistered = await authRepositories.findUserByEmail(email)

    if (emailRegistered) {
        throw { name: 'registeredEmail' }
    }

    const encryptedPassword = await bcrypt.hash(password, 12)

    const user = await authRepositories.signUp(name, email, avatar, encryptedPassword)

    delete user.password

    return user
}

async function signIn(email: string, password: string): Promise<{ user: users, token: string }> {
    const user = await authRepositories.findUserByEmail(email)

    if (!user) {
        throw { name: 'invalidUser' }
    }

    const isPasswordRight = await bcrypt.compare(password, user.password)

    if (!isPasswordRight) {
        throw { name: 'invalidUser' }
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET)

    delete user.password

    return { user, token }
}

const authServices = {
    signUp,
    signIn
}

export default authServices