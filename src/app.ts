import express, { Express } from "express"
import cors from 'cors'
import authRouter from './routes/auth-router'
import { connectDb, disconnectDb } from './database/database'

const app = express()

app
    .use(cors())
    .use(express.json())
    .use(authRouter)

export function init(): Promise<Express> {
    connectDb()
    return Promise.resolve(app)
}

export async function close(): Promise<void> {
    await disconnectDb()
}

export default app