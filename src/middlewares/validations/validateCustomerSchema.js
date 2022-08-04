import connection from '../../database/db.js'
import customerSchema from '../../schemas/customerSchema.js'

async function validateCustomerSchema(req, res, next) {
    const { cpf } = req.body
    const { customerId } = req.params

    const { rows: customerExists } = await connection.query('SELECT * FROM customers WHERE id = $1', [customerId])

    if(customerExists.length === 0 && customerId) {
        return res.sendStatus(404)
    }

    const { error } = customerSchema.validate(req.body, { abortEarly: false })

    if(error) {
        return res.status(400).send(error)
    }

    const { rows: customerFounded } = await connection.query('SELECT * FROM customers WHERE cpf = $1', [cpf])

    if(customerFounded.length > 0 && customerFounded[0].id !== Number(customerId)) {
        return res.status(409).send('cpf already registered')
    }

    next()
}

export default validateCustomerSchema