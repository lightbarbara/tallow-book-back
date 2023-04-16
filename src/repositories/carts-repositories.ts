import { prisma } from "../database/database"

async function findBooksInCart(userId: number) {
    return await prisma.booksCart.findMany({
        where: {
            userId
        }
    })
}

async function addToCart(userId: number, bookId: number) {
    return await prisma.booksCart.create({
        data: {
            userId,
            bookId
        }
    })
}

async function findIdByBookAndUser(userId: number, bookId: number) {
    return await prisma.booksCart.findFirst({
        where: {
            userId,
            bookId
        }
    })
}

async function deleteBookInCart(id: number) {
    return await prisma.booksCart.delete({
        where: {
            id
        }
    })
}

async function deleteBooksByUser(userId: number) {
    return await prisma.booksCart.deleteMany({
        where: {
            userId
        }
    })
}

const cartsRepositories = {
    findBooksInCart,
    addToCart,
    findIdByBookAndUser,
    deleteBookInCart,
    deleteBooksByUser
}

export default cartsRepositories