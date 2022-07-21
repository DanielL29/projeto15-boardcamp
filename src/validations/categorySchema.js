import joi from 'joi'
import connection from '../database/db.js'

async function validateCategorySchema(req, res, next) {
    const categorySchema = joi.object({
        name: joi.string().required()
    })

    const { error } = categorySchema.validate(req.body)

    if(error) {
        return res.status(400).send(error)
    }

    const { rows: nameFounded } = await connection.query(`SELECT * FROM categories WHERE name = '${req.body.name}'`)

    if(nameFounded.length > 0) {
        return res.sendStatus(409)
    } 

    next()
}

export { validateCategorySchema }