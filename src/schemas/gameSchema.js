import joi from 'joi'

const gameSchema = joi.object({
    name: joi.string().required(),
    image: joi.string().pattern(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/).required(),
    stockTotal: joi.number().min(1).required(),
    categoryId: joi.number().required(),
    pricePerDay: joi.number().min(1).required(),
})

export default gameSchema