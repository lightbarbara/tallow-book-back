import { books } from "@prisma/client"
import cartsRepositories from "../repositories/carts-repositories"
import historyRepositories from "../repositories/history-repositories"
import booksRepositories from "../repositories/books-repositories"

async function addToCart(userId: number, books: Array<books>) {
    const booksInCart = await cartsRepositories.findBooksInCart(userId)

    const hash = {}

    for (let i = 0; i < booksInCart.length; i++) {
        hash[booksInCart[i].bookId] = true
    }

    for (let i = 0; i < books.length; i++) {
        if (!hash[books[i].id]) {
            await cartsRepositories.addToCart(userId, books[i].id)
        }
    }
}

async function getCart(userId: number) {
    const booksInCart = await cartsRepositories.findBooksInCart(userId)

    return booksInCart
}

async function deleteBookInCart(bookId: number) {
    const deletedBook = await cartsRepositories.deleteBookInCart(bookId)

    return deletedBook
}

async function finishCart(userId: number) {
    const books = await cartsRepositories.findBooksInCart(userId)

    await cartsRepositories.deleteBooksByUser(userId)

    for (let i=0; i<books.length; i++) {
        await booksRepositories.buyBook(books[i].bookId)
        await historyRepositories.createHistory(books[i].userId, books[i].bookId)
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