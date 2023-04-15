import express, { Express } from "express"
import cors from 'cors'
import authRouter from './routes/auth-router'
import { connectDb, disconnectDb } from './database/database'
import booksRouter from "./routes/books-router"
import cartsRouter from "./routes/carts-router"
import historyRouter from "./routes/history-router"

const app = express()

app
    .use(cors())
    .use(express.json())
    .use(authRouter)
    .use(booksRouter)
    .use(cartsRouter)
    .use(historyRouter)

export function init(): Promise<Express> {
    connectDb()
    return Promise.resolve(app)
}

export async function close(): Promise<void> {
    await disconnectDb()
}

export default app