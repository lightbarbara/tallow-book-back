import { Request, Response } from "express";
import httpStatus from "http-status";
import authServices from "../services/auth-services";

export async function signUp(req: Request, res: Response) {
    const { name, email, avatar, password } = req.body

    try {

        const user = await authServices.signUp(name, email, avatar, password)
        return res.status(httpStatus.CREATED).send(user)

    } catch (err) {

        if (err.name === 'registeredEmail') {
            return res.sendStatus(httpStatus.CONFLICT)
        }
        return res.status(httpStatus.BAD_REQUEST).send(err)
    }

}

export async function signIn(req: Request, res: Response) {
    const { email, password } = req.body

    try {

        const user = await authServices.signIn(email, password)
        return res.status(httpStatus.OK).send(user)

    } catch (err) {

        if (err.name === 'invalidUser') {
            return res.sendStatus(httpStatus.UNAUTHORIZED)
        }
        return res.status(httpStatus.BAD_REQUEST).send(err) 

    }
}