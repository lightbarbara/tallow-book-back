import { Request, Response } from "express";
import httpStatus from "http-status";
import cartsServices from "../services/carts-services";

export async function postCart(req: Request, res: Response) {
    const { books } = req.body

    const user = res.locals.user

    try {

        await cartsServices.addToCart(user.id, books)

        return res.sendStatus(httpStatus.OK)

    } catch (err) {

        console.log(err)
        return res.status(httpStatus.BAD_REQUEST).send({ message: err })

    }

}

export async function getCart(req: Request, res: Response) {
    const user = res.locals.user

    try {

        const books = await cartsServices.getCart(user.id)

        return res.status(httpStatus.OK).send(books)

    } catch (err) {

        return res.status(httpStatus.BAD_REQUEST).send({ message: err })

    }

}

export async function deleteBookInCart(req: Request, res: Response) {
    const bookId = req.query.params

    try {

        const book = await cartsServices.deleteBookInCart(Number(bookId))

        return res.status(httpStatus.NO_CONTENT).send(book)

    } catch (err) {

        return res.status(httpStatus.BAD_REQUEST).send({ message: err })

    }

}

export async function finishCart(req: Request, res: Response) {
    const user = res.locals.user

    try {

        const books = await cartsServices.finishCart(user.id)

        return res.status(httpStatus.NO_CONTENT).send(books)

    } catch (err) {

        return res.status(httpStatus.BAD_REQUEST).send({ message: err })

    }

}