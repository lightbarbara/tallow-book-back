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

async function deleteBookInCart(bookId: number) {
    return await prisma.booksCart.delete({
        where: {
            id: bookId
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
    deleteBookInCart,
    deleteBooksByUser
}

export default cartsRepositories