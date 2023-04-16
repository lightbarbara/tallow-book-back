import { BookStatus, books } from "@prisma/client"
import { prisma } from "../database/database"

async function createBook(name: string, author: string, image: string, pages: number, year: number, description: string, edition: number, price: number, userId: number): Promise<books> {
    return await prisma.books.create({
        data: {
            name,
            author,
            image,
            pages,
            year,
            description,
            edition,
            price,
            status: BookStatus.AVAILABLE,
            userId
        }
    })
}

async function getAllBooks() {
    return await prisma.books.findMany({
        where: {
            status: BookStatus.AVAILABLE
        }
    })
}

async function getMyBooks(userId: number) {
    return await prisma.books.findMany({
        where: {
            userId
        }
    })
}

async function findBookById(bookId: number) {
    return await prisma.books.findFirst({
        where: {
            id: bookId
        }
    })
}

async function deleteBook(bookId: number) {
    return await prisma.books.delete({
        where: {
            id: bookId
        }
    })
}

async function putBookOnCart(bookId: number) {
    return await prisma.books.update({
        where: {
            id: bookId
        },
        data: {
            status: BookStatus.UNAVAILABLE
        }
    })
}

const booksRepositories = {
    createBook,
    getAllBooks,
    getMyBooks,
    findBookById,
    deleteBook,
    putBookOnCart
}

export default booksRepositories