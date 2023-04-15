import { prisma } from "../database/database"

async function createHistory(userId: number, bookId: number) {
    return await prisma.history.create({
        data: {
            userId,
            bookId
        }
    })
}

const historyRepositories = {
    createHistory
}

export default historyRepositories