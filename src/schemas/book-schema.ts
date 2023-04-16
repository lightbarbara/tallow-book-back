import Joi from "joi";

export const BookSchema = Joi.object({
    name: Joi.string().required(),
    image: Joi.string().uri().required(),
    author: Joi.string().required(),
    pages: Joi.number().required(),
    year: Joi.number().required(),
    description: Joi.string().required(),
    edition: Joi.number().required(),
    price: Joi.number().required()
})