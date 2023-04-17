import { connectDb, prisma } from "database/database"
import app from "app"
import supertest from "supertest"
import { createToken, createUser } from "../factories/user-factories"
import { faker } from "@faker-js/faker"

beforeAll(async () => {
    connectDb()
    await prisma.history.deleteMany()
    await prisma.booksCart.deleteMany()
    await prisma.books.deleteMany()
})

describe('POST /register-book', () => {

    it('should not create a book when a token isnt provided', async () => {
        const book = {
            name: faker.word.noun(),
            author: faker.name.firstName(),
            image: faker.internet.url(),
            edition: faker.datatype.number(),
            pages: faker.datatype.number(),
            description: faker.lorem.lines(),
            price: faker.datatype.number(),
            year: faker.datatype.number()
        }
        
        const result = await supertest(app).post('/register-book').send(book)

        expect(result.status).toBe(401)
    })

    it('should not create a book when we dont send the right fields', async () => {
        const user = await createUser()
        const token = await createToken(user.id)

        const book = {}

        const result = await supertest(app).post('/register-book').send(book).set("Authorization", `Bearer ${token}`)

        expect(result.status).toBe(400)
    })

    it('should not create a book when the token isnt bearer', async () => {
        const user = await createUser()
        const token = await createToken(user.id)

        const book = {
            name: faker.word.noun(),
            author: faker.name.firstName(),
            image: faker.internet.url(),
            edition: faker.datatype.number(),
            pages: faker.datatype.number(),
            description: faker.lorem.lines(),
            price: faker.datatype.number(),
            year: faker.datatype.number()
        }

        const result = await supertest(app).post('/register-book').send(book).set("Authorization", `${token}`)

        expect(result.status).toBe(401)
    })

    it('should not create a book when the token isnt valid', async () => {
        const user = await createUser()
        const token = faker.word.adjective()

        const book = {
            name: faker.word.noun(),
            author: faker.name.firstName(),
            image: faker.internet.url(),
            edition: faker.datatype.number(),
            pages: faker.datatype.number(),
            description: faker.lorem.lines(),
            price: faker.datatype.number(),
            year: faker.datatype.number()
        }

        const result = await supertest(app).post('/register-book').send(book).set("Authorization", `Bearer ${token}`)

        expect(result.status).toBe(401)
    })

    it('should create a new book', async () => {
        const user = await createUser()
        const token = await createToken(user.id)

        const book = {
            name: faker.word.noun(),
            author: faker.name.firstName(),
            image: faker.internet.url(),
            edition: faker.datatype.number(),
            pages: faker.datatype.number(),
            description: faker.lorem.lines(),
            price: faker.datatype.number(),
            year: faker.datatype.number()
        }

        const result = await supertest(app).post('/register-book').send(book).set("Authorization", `Bearer ${token}`)

        expect(result.status).toBe(201)
    })

})