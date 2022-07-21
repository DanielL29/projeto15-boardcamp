import connection from "../database/db.js"

async function getGames(req, res) {
    const { name } = req.query

    try {
        const { rows: games } = await connection.query(
            name ? 
                `
                    SELECT g.*, c.name as categoryName 
                    FROM games g, categories c 
                    WHERE c.id = g."categoryId" AND LOWER(g.name)
                    LIKE LOWER($1)
                ` : 
                `
                    SELECT g.*, c.name as categoryName 
                    FROM games g, categories c
                    WHERE c.id = g."categoryId"
                `
            , name ? [`${name}%`] : ''
        )

        res.status(200).send(games)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

async function createGame(req, res) {
    const { name, image, stockTotal, categoryId, pricePerDay } = req.body

    try {
        await connection.query(`
            INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") 
            VALUES($1, $2, $3, $4, $5)`
        , [name, image, stockTotal, categoryId, pricePerDay])

        res.sendStatus(201)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

export { getGames, createGame }