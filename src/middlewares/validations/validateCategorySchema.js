import connection from '../../database/db.js'
import categorySchema from '../../schemas/categorySchema.js'

async function validateCategorySchema(req, res, next) {
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

export default validateCategorySchema