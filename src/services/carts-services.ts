import { books } from "@prisma/client"
import cartsRepositories from "../repositories/carts-repositories"
import historyRepositories from "../repositories/history-repositories"
import booksRepositories from "../repositories/books-repositories"

async function addToCart(userId: number, books: Array<books>) {
    for (let i = 0; i < books.length; i++) {
        await cartsRepositories.addToCart(userId, Number(books[i]))
        await booksRepositories.putBookOnCart(Number(books[i]))
    }
}

async function getCart(userId: number) {
    const booksInCart = await cartsRepositories.findBooksInCart(userId)

    let books = []

    for (let i=0; i<booksInCart.length; i++) {
        const book = await booksRepositories.findBookById(booksInCart[i].bookId)
        books.push(book)
    }

    return books
}

async function deleteBookInCart(bookId: number) {
    const deletedBook = await cartsRepositories.deleteBookInCart(bookId)

    return deletedBook
}

async function finishCart(userId: number) {
    const books = await cartsRepositories.findBooksInCart(userId)

    await cartsRepositories.deleteBooksByUser(userId)

    for (let i = 0; i < books.length; i++) {
        await historyRepositories.createHistory(userId, books[i].bookId)
    }

    return books
}

const cartsServices = {
    addToCart,
    getCart,
    deleteBookInCart,
    finishCart
}

export default cartsServices