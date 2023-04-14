import { signIn, signUp } from '../controllers/auth-controller'
import { Router } from 'express'
import { validateSchema } from '../middlewares/validateSchema'
import { SignInSchema, SignUpSchema } from '../schemas/auth-schemas'

const authRouter = Router()

authRouter.post('/', validateSchema(SignInSchema), signIn)
authRouter.post('/sign-up', validateSchema(SignUpSchema), signUp)

export default authRouter