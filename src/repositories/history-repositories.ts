import { prisma } from "../database/database"

async function createHistory(userId: number, bookId: number) {
    return await prisma.history.create({
        data: {
            userId,
            bookId
        }
    })
}

async function getHistory(userId: number) {
    return await prisma.history.findMany({
        where: {
            userId
        },
        select: {
            book: true
        }
    })
}

const historyRepositories = {
    createHistory,
    getHistory
}

export default historyRepositories