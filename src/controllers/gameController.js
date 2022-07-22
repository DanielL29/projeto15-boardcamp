import connection from "../database/db.js"
import { insertGameQuery, selectGamesQuery } from "../database/queries/gameQueries.js"

async function getGames(req, res) {
    const { name } = req.query
    const isNameQuery = name ? [`${name}%`] : ''

    try {
        const { rows: games } = await connection.query(selectGamesQuery(name), isNameQuery)

        res.status(200).send(games)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

async function createGame(req, res) {
    const { name, image, stockTotal, categoryId, pricePerDay } = req.body

    try {
        await connection.query(insertGameQuery, [name, image, stockTotal, categoryId, pricePerDay])

        res.sendStatus(201)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

export { getGames, createGame }