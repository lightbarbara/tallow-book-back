import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { ObjectSchema } from "joi";

export function validateSchema(schema: ObjectSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body, {
            abortEarly: false,
        })

        if (!error) {
            next()
        } else {
            const errors = error.details.map(e => e.message)
            res.status(httpStatus.BAD_REQUEST).send({ message: errors })
        }
    }
}