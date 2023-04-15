import { Request, Response } from "express";
import httpStatus from "http-status";
import cartsServices from "../services/carts-services";

export async function postCart(req: Request, res: Response) {
    const { books } = req.body

    const user = res.locals.user

    try {

        const cart = cartsServices

    } catch (err) {

        return res.status(httpStatus.BAD_REQUEST).send({ message: err })

    }

}

export async function getCart(req: Request, res: Response) {

}