import { Request, Response } from "express";
import httpStatus from "http-status";
import booksServices from "../services/books-services";

export async function createBook(req: Request, res: Response) {
    const { name, image, pages, year, description, edition, price } = req.body

    const user = res.locals.user

    try {

        const book = await booksServices.createBook(name, image, pages, year, description, edition, price, user.id)

        return res.status(httpStatus.CREATED).send(book)

    } catch (err) {

        return res.status(httpStatus.BAD_REQUEST).send({ message: err })

    }

}

export async function getOtherBooks(req: Request, res: Response) {
    const user = res.locals.user

    try {

        const books = await booksServices.getOtherBooks(user.id)

        return res.status(httpStatus.OK).send(books)

    } catch (err) {

        return res.status(httpStatus.BAD_REQUEST).send({ message: err })

    }
}

export async function getMyBooks(req: Request, res: Response) {
    const user = res.locals.user

    try {

        const books = await booksServices.getMyBooks(user.id)

        return res.status(httpStatus.OK).send(books)

    } catch (err) {

        return res.status(httpStatus.BAD_REQUEST).send({ message: err })

    }
}