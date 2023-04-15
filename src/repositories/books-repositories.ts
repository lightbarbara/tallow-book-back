import { BookStatus, books } from "@prisma/client"
import { prisma } from "../database/database"

async function createBook(name: string, image: string, pages: number, year: number, description: string, edition: number, price: number, userId: number): Promise<books> {
    return await prisma.books.create({
        data: {
            name,
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
    return await prisma.books.findMany({})
}

async function getMyBooks(userId: number) {
    return await prisma.books.findMany({
        where: {
            userId
        }
    })
}

const booksRepositories = {
    createBook,
    getAllBooks,
    getMyBooks
}

export default booksRepositories