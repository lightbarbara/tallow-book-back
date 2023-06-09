import { Request, Response } from "express";
import httpStatus from "http-status";
import authServices from "../services/auth-services";

export async function signUp(req: Request, res: Response) {
    const { name, email, avatar, password } = req.body

    try {

        const user = await authServices.signUp(name, email, avatar, password)
        return res.status(httpStatus.CREATED).send(user)

    } catch (err) {
        console.log(err)

        if (err.message === 'registeredEmail') {
            return res.status(httpStatus.CONFLICT).send({ message: 'This email is already in use' })
        }

        return res.status(httpStatus.BAD_REQUEST).send({ message: err })
    }

}

export async function signIn(req: Request, res: Response) {
    const { email, password } = req.body

    try {

        const user = await authServices.signIn(email, password)
        return res.status(httpStatus.OK).send(user)

    } catch (err) {
        console.log(err)

        if (err.message === 'invalidUser') {
            return res.status(httpStatus.UNAUTHORIZED).send({ message: 'Invalid credentials' })
        }

        return res.status(httpStatus.BAD_REQUEST).send({ message: err })

    }
}