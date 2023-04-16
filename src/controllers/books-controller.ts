import { Request, Response } from "express";
import httpStatus from "http-status";
import booksServices from "../services/books-services";

export async function createBook(req: Request, res: Response) {
    const { name, author, image, pages, year, description, edition, price } = req.body

    const user = res.locals.user

    try {

        const book = await booksServices.createBook(name, author, image, Number(pages), Number(year), description, Number(edition), Number(price), user.id)

        return res.status(httpStatus.CREATED).send(book)

    } catch (err) {

        console.log(err)
        return res.status(httpStatus.BAD_REQUEST).send({ message: err })

    }

}

export async function getOtherBooks(req: Request, res: Response) {
    const user = res.locals.user

    try {

        const books = await booksServices.getOtherBooks(user.id)

        return res.status(httpStatus.OK).send(books)

    } catch (err) {

        console.log(err)
        return res.status(httpStatus.BAD_REQUEST).send({ message: err })

    }
}

export async function getMyBooks(req: Request, res: Response) {
    const user = res.locals.user

    try {

        const books = await booksServices.getMyBooks(user.id)

        return res.status(httpStatus.OK).send(books)

    } catch (err) {

        console.log(err)
        return res.status(httpStatus.BAD_REQUEST).send({ message: err })

    }
}

export async function deleteBook(req: Request, res: Response) {
    const user = res.locals.user

    const bookId = req.params.id

    try {

        const book = await booksServices.deleteBook(Number(bookId), user.id)

        return res.status(httpStatus.NO_CONTENT).send(book)

    } catch (err) {
        console.log(err)

        if (err.message === 'deleteNotAllowed') {
            return res.status(httpStatus.UNAUTHORIZED).send({ message: "You can't delete someone else's book" })
        }

        if (err.message === 'bookWasBought') {
            return res.status(httpStatus.UNAUTHORIZED).send({ message: 'Book was bought' })
        }

        return res.status(httpStatus.BAD_REQUEST).send({ message: err.message })

    }
}