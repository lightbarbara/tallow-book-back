import { Router } from "express";

const cartsRouter = Router()

cartsRouter.post('/cart')
cartsRouter.get('/cart')

export default cartsRouter