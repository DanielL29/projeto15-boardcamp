import connection from "../database/db.js"
import dayjs from 'dayjs'
import { insertRentalQuery, selectRentalQuery, updateRentalQuery } from "../database/queries/rentalQueries.js"

async function getRentals(req, res) {
    const { customerId, gameId } = req.query
    const query = customerId ? [customerId] : gameId ? [gameId] : ''
    const selectAND = customerId ? 'AND c.id = $1' : gameId ? 'AND g.id = $1' : ''

    try {
        const { rows: rentals } = await connection.query(selectRentalQuery(selectAND), query)

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
        await connection.query(insertRentalQuery, [
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
    const { pricePerDay, rentDate } = res.locals

    try {
        const delayFee = dayjs().diff(rentDate, 'day')

        await connection.query(updateRentalQuery, [dayjs().format('YYYY-MM-DD'), delayFee * pricePerDay, rentalId])

        res.sendStatus(200)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

async function deleteRental(req, res) {
    const { rentalId } = req.params

    try {
        await connection.query('DELETE FROM rentals WHERE id = $1', [rentalId])

        res.sendStatus(200)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

export { getRentals, createRental, finalizeRental, deleteRental }