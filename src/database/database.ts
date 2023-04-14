import { PrismaClient } from "@prisma/client";
import dotenv from 'dotenv'

dotenv.config()

export let prisma: PrismaClient

export function connectDb(): void {
    prisma = new PrismaClient()
}

export async function disconnectDb(): Promise<void> {
    await prisma?.$disconnect()
}