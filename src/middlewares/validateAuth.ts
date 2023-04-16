import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import authRepositories from "../repositories/auth-repositories";

dotenv.config()

export function validateAuth(req: Request, res: Response, next: NextFunction) {
    let authToken = undefined

    authToken = req.headers.authorization

    if (!authToken) {
        return res.status(httpStatus.UNAUTHORIZED).send({ message: 'Token is missing' })
    }

    const parts = authToken.split(' ')

    if (parts.length !== 2) {
        return res.status(httpStatus.UNAUTHORIZED).send({ message: 'Invalid token' })
    }

    const [scheme, token] = parts

    if (!/^Bearer$/i.test(scheme)) {
        return res.status(httpStatus.UNAUTHORIZED).send({ message: "Token must be Bearer" });
    }

    try {

        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                console.log(err)
                return res.status(httpStatus.UNAUTHORIZED).send({ message: err })
            }

            const user = await authRepositories.findUserById(decoded.userId)

            if (!user) {
                return res.status(httpStatus.UNAUTHORIZED).send({ message: 'Invalid token'})
            }

            res.locals.user = user

            next()
        })

    } catch (err) {

        return res.status(httpStatus.BAD_REQUEST).send({ message: err })

    }

}