import Joi from "joi";

export const SignUpSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    avatar: Joi.string().uri().required(),
    password: Joi.string().min(8).required()
})

export const SignInSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})