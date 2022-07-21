import connection from "../database/db.js"
import dayjs from 'dayjs'

async function getRentals(req, res) {
    const { customerId, gameId } = req.query
    const query = customerId ? [customerId] : gameId ? [gameId] : ''
    const selectAnd = customerId ? 'AND c.id = $1' : gameId ? 'AND g.id = $1' : ''

    try {
        const { rows: rentals } = await connection.query(`
            SELECT r.*, r."rentDate"::VARCHAR, 
                (CASE
                    WHEN r."returnDate"::VARCHAR != 'null' THEN r."returnDate"::VARCHAR
                    ELSE null
                END) as "returnDate", 
                jsonb_build_object(
                    'id', c.id,
                    'name', c.name
                ) as customer,
                jsonb_build_object(
                    'id', g.id, 
                    'name', g.name, 
                    'categoryId', g."categoryId", 
                    'categoryName', ca.name
                ) as game
            FROM rentals r, customers c, games g, categories ca
            WHERE r."customerId" = c.id 
            AND r."gameId" = g.id 
            AND g."categoryId" = ca.id
            ${selectAnd}
        `, query)

        res.status(200).send(rentals)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

async function createRental(req, res) {
    const { customerId, gameId, daysRented } = req.body
    const { pricePerDay } = res.locals

    try {
        await connection.query(`
            INSERT INTO rentals
            (
                "customerId", 
                "gameId", 
                "rentDate", 
                "daysRented", 
                "returnDate", 
                "originalPrice", 
                "delayFee"
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7)
        `, [
            customerId,
            gameId,
            dayjs().format('YYYY-MM-DD'),
            daysRented,
            null,
            pricePerDay * daysRented,
            null
        ])

        res.sendStatus(201)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

async function finalizeRental(req, res) {
    const { rentalId } = req.params

    try {
        const { rows: rental } = await connection.query('SELECT * FROM rentals WHERE id = $1', [rentalId])
        const { rows: game } = await connection.query('SELECT * FROM games WHERE id = $1', [rental[0].gameId])

        if(rental.length === 0) {
            return res.sendStatus(404)
        } else if(rental[0].returnDate !== null) {
            return res.status(400).send('rental finalized')
        } else {
            const delayFee = dayjs().diff(rental[0].rentDate, 'day')

            await connection.query(`
                UPDATE rentals 
                SET "returnDate" = $1, "delayFee" = $2
                WHERE id = $3
            `, [dayjs().format('YYYY-MM-DD'), delayFee * game[0].pricePerDay, rentalId])

            res.sendStatus(200)
        }
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

async function deleteRental(req, res) {
    const { rentalId } = req.params

    try {
        const { rows: rental } = await connection.query('SELECT * FROM rentals WHERE id = $1', [rentalId])

        if(rental.length === 0) {
            return res.sendStatus(404)
        } else if(rental[0].returnDate === null) {
            return res.status(400).send('rental not finalized yet')
        } 

        await connection.query('DELETE FROM rentals WHERE id = $1', [rentalId])

        res.sendStatus(200)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

export { getRentals, createRental, finalizeRental, deleteRental }