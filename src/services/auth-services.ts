import authRepositories from "../repositories/auth-repositories"
import bcrypt from 'bcrypt'

async function signUp(name: string, email: string, avatar: string, password: string) {
    const emailRegistered = await authRepositories.findUserByEmail(email)

    if (emailRegistered) {
        throw { name: 'registeredEmail' }
    }

    const encryptedPassword = await bcrypt.hash(password, 12)

    const user = await authRepositories.signUp(name, email, avatar, encryptedPassword)

    delete user.password

    return user
}

async function signIn(email: string, password: string) {
    const user = await authRepositories.findUserByEmail(email)
}

const authServices = {
    signUp,
    signIn
}

export default authServices