import booksRepositories from "../repositories/books-repositories"

async function createBook(name: string, image: string, pages: number, year: number, description: string, edition: number, price: number, userId: number) {
    const book = await booksRepositories.createBook(name, image, pages, year, description, edition, price, userId)

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

const booksServices = {
    createBook,
    getOtherBooks,
    getMyBooks
}

export default booksServices