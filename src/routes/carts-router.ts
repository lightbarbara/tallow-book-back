import { Router } from "express";
import { validateAuth } from "../middlewares/validateAuth";
import { deleteBookInCart, finishCart, getCart, postCart } from "../controllers/carts-controller";

const cartsRouter = Router()

cartsRouter.post('/cart', validateAuth, postCart)
cartsRouter.get('/cart', validateAuth, getCart)
cartsRouter.delete('/cart/book/:id', validateAuth, deleteBookInCart)
cartsRouter.post('/finish-cart', validateAuth, finishCart) // colocar pagamento

export default cartsRouter