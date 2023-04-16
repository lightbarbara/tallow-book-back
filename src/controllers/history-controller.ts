import { Request, Response } from "express";
import historyServices from "../services/history-services";
import httpStatus from "http-status";

export async function getHistory(req: Request, res: Response) {
    const user = res.locals.user

    try {

        const history = await historyServices.getHistory(user.id)

        return res.status(httpStatus.OK).send(history)

    } catch (err) {

        console.log(err)
        return res.status(httpStatus.BAD_REQUEST).send({ message: err })

    }

}