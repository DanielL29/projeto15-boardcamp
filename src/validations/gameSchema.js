import joi from 'joi'
import connection from '../database/db.js'

async function validateGameSchema(req, res, next) {
    const { categoryId, name } = req.body

    const gameSchema = joi.object({
        name: joi.string().required(),
        image: joi.string().pattern(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/).required(),
        stockTotal: joi.number().min(1).required(),
        categoryId: joi.number().required(),
        pricePerDay: joi.number().min(1).required(),
    })

    const { error } = gameSchema.validate(req.body, { abortEarly: false })

    if(error) {
        return res.status(400).send(error)
    }

    const { rows: categoryFounded } = await connection.query('SELECT * FROM categories WHERE id = $1', [categoryId])
    const { rows: gameNameFounded } = await connection.query('SELECT * FROM games WHERE LOWER(name) = $1', [name.toLowerCase()])

    if(categoryFounded.length === 0) {
        return res.status(400).send('must be an existing categoryId')
    } else if(gameNameFounded.length > 0) {
        return res.status(409).send('this game name already exists')
    }

    next()
}

export default validateGameSchema