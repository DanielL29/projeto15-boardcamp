import connection from "../database/db.js"
import dayjs from 'dayjs'
import { billingQuery, insertRentalQuery, selectRentalQuery, updateRentalQuery } from "../database/queries/rentalQueries.js"

async function getRentals(req, res) {
    const { 
        customerId, gameId, offset, limit, 
        order, desc, status, startDate 
    } = req.query

    try {
        const { rows: rentals } = await connection.query(
            selectRentalQuery(
                customerId, gameId, offset, limit, 
                order, desc, status, startDate
            )
        )

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
    const { pricePerDay, rentDate, daysRented } = res.locals
    let delayFee;

    try {
        const isDelay = dayjs().diff(rentDate, 'day')

        if(isDelay > daysRented) delayFee = isDelay - daysRented
        else delayFee = 0

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

async function getBilling(req, res) {
    const { startDate, endDate } = req.query

    try {
        const { rows: billing } = await connection.query(billingQuery(startDate, endDate))

        res.status(200).send(billing[0])
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

export { getRentals, createRental, finalizeRental, deleteRental, getBilling }