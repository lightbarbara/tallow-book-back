import historyRepositories from "../repositories/history-repositories"

async function getHistory(userId: number) {
    const history = await historyRepositories.getHistory(userId)

    const editedHistory = []

    for (let i=0; i<history.length; i++) {
        editedHistory.push(history[i].book)
    }

    return editedHistory
}

const historyServices = {
    getHistory
}

export default historyServices