import connection from "../database/db.js"

async function getCategories(req, res) {
    try {
        const { rows: categories } = await connection.query('SELECT * FROM categories')

        res.status(200).send(categories)
    } catch (err) {
        res.status(500).send(err)
    }
}

async function createCategory(req, res) {
    const { name } = req.body

    try {
        await connection.query(`INSERT INTO categories (name) VALUES ('${name}')`)

        res.sendStatus(201)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

export { getCategories, createCategory }