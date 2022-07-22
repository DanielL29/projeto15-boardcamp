import joi from 'joi'

const now = Date.now()
const maxDate = new Date(now - (1000 * 60 * 60 * 24 * 365 * 18))

const customerSchema = joi.object({
    name: joi.string().required(),
    phone: joi.string().pattern(/[0-9]/).min(10).max(11).required(),
    cpf: joi.string().pattern(/[0-9]/).min(11).max(11).required(),
    birthday: joi.date().max(maxDate).required()
})

export default customerSchema