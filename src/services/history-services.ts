import historyRepositories from "../repositories/history-repositories"

async function getHistory(userId: number) {
    const history = await historyRepositories.getHistory(userId)

    return history
}

const historyServices = {
    getHistory
}

export default historyServices