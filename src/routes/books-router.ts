import { createBook, getOtherBooks, getMyBooks, deleteBook, getOtherBooksByName } from "../controllers/books-controller";
import { Router } from "express";
import { validateAuth } from "../middlewares/validateAuth";
import { validateSchema } from "../middlewares/validateSchema";
import { BookSchema } from "../schemas/book-schema";

const booksRouter = Router()

booksRouter.post('/register-book', validateAuth, validateSchema(BookSchema), createBook)
booksRouter.get('/books', validateAuth, getOtherBooks)
booksRouter.get('/books/:name', validateAuth, getOtherBooksByName)
booksRouter.get('/my-books', validateAuth, getMyBooks)
booksRouter.delete('/book/:id', validateAuth, deleteBook)

export default booksRouter