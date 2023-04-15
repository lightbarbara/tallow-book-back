import { Router } from "express";
import { validateAuth } from "../middlewares/validateAuth";
import { getCart, postCart } from "../controllers/carts-controller";

const cartsRouter = Router()

cartsRouter.post('/cart', validateAuth, postCart)
cartsRouter.get('/cart', validateAuth, getCart)
cartsRouter.delete('/cart/book', validateAuth)
cartsRouter.delete('/cart', validateAuth)

export default cartsRouter