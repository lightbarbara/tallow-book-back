import booksRepositories from "../repositories/books-repositories"

async function createBook(name: string, author: string, image: string, pages: number, year: number, description: string, edition: number, price: number, userId: number) {
    const book = await booksRepositories.createBook(name, author, image, pages, year, description, edition, price, userId)

    return book
}

async function getOtherBooks(userId: number) {
    const books = await booksRepositories.getAllBooks()

    const otherBooks = books.filter(b => b.userId !== userId)

    return otherBooks
}

async function getMyBooks(userId: number) {
    const yourBooks = await booksRepositories.getMyBooks(userId)

    return yourBooks
}

async function deleteBook(bookId: number, userId: number) {
    const bookToBeDeleted = await booksRepositories.findBookById(bookId)

    if (bookToBeDeleted.userId !== userId) {
        throw { message: 'deleteNotAllowed' }
    }

    if (bookToBeDeleted.status === 'UNAVAILABLE') {
        throw { message: 'bookWasBought' }
    }

    const book = await booksRepositories.deleteBook(bookId)

    return book
}

const booksServices = {
    createBook,
    getOtherBooks,
    getMyBooks,
    deleteBook
}

export default booksServices