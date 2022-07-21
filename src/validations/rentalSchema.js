import joi from 'joi'
import connection from '../database/db.js'

async function validateRentalSchema(req, res, next) {
    const { customerId, gameId } = req.body

    const rentalSchema = joi.object({
        customerId: joi.number().required(),
        gameId: joi.number().required(),
        daysRented: joi.number().min(1).required()
    })

    const { error } = rentalSchema.validate(req.body, { abortEarly: false })

    if(error) {
        return res.status(400).send(error)
    }

    const { rows: customerFounded } = await connection.query('SELECT * FROM customers WHERE id = $1', [customerId])
    const { rows: gameFounded } = await connection.query('SELECT * FROM games WHERE id = $1', [gameId])
    const { rows: rentals } = await connection.query('SELECT * FROM rentals WHERE "gameId" = $1', [gameId])

    if(customerFounded.length === 0 || gameFounded.length === 0) {
        return res.status(400).send('customer or game not exists')
    }

    if(gameFounded[0].stockTotal === rentals.length) {
        return res.status(400).send('all stock of this game is on rent by now')
    }

    res.locals.pricePerDay = gameFounded[0].pricePerDay

    next()
}

export default validateRentalSchema