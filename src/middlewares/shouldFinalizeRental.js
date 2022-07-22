import connection from "../database/db.js"

async function shouldFinalizeRental(req, res, next) {
    const { rows: rental } = await connection.query('SELECT * FROM rentals WHERE id = $1', [rentalId])
    const { rows: game } = await connection.query('SELECT * FROM games WHERE id = $1', [rental[0].gameId])

    if(rental.length === 0) {
        return res.sendStatus(404)
    } else if(rental[0].returnDate !== null) {
        return res.status(400).send('rental finalized')
    } 

    res.locals.pricePerDay = game[0].pricePerDay
    res.locals.rentDate = rental[0].rentDate

    next()
}

export default shouldFinalizeRental