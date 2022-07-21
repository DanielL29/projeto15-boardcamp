import joi from 'joi'
import connection from '../database/db.js'

const now = Date.now()
const maxDate = new Date(now - (1000 * 60 * 60 * 24 * 365 * 18))

async function validateCustomerSchema(req, res, next) {
    const { cpf } = req.body

    const customerSchema = joi.object({
        name: joi.string().required(),
        phone: joi.string().pattern(/[0-9]/).min(10).max(11).required(),
        cpf: joi.string().pattern(/[0-9]/).min(11).max(11).required(),
        birthday: joi.date().max(maxDate).required()
    })

    const { error } = customerSchema.validate(req.body, { abortEarly: false })

    if(error) {
        return res.status(400).send(error)
    }

    const { rows: customerFounded } = await connection.query('SELECT * FROM customers WHERE cpf = $1', [cpf])

    if(customerFounded.length > 0) {
        return res.status(409).send('cpf already registered')
    }

    next()
}

export default validateCustomerSchema