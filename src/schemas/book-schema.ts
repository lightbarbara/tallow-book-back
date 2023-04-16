import Joi from "joi";

export const BookSchema = Joi.object({
    name: Joi.string().required(),
    image: Joi.string().uri().required(),
    author: Joi.string().required(),
    pages: Joi.number().min(0).required(),
    year: Joi.number().min(0).required(),
    description: Joi.string().required(),
    edition: Joi.number().min(0).required(),
    price: Joi.number().min(0).required()
})