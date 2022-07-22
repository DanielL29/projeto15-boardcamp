import connection from "../database/db.js"
import { insertCategoryQuery, selectCategoryQuery } from "../database/queries/categoryQueries.js"

async function getCategories(req, res) {
    const { offset, limit, order, desc } = req.query

    try {
        const { rows: categories } = await connection.query(selectCategoryQuery(offset, limit, order, desc))

        res.status(200).send(categories)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

async function createCategory(req, res) {
    const { name } = req.body

    try {
        await connection.query(insertCategoryQuery, [name])

        res.sendStatus(201)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

export { getCategories, createCategory }