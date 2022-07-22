import connection from "../database/db.js"

async function shouldDeleteRental(req, res, next) {
    const { rentalId } = req.params

    const { rows: rental } = await connection.query('SELECT * FROM rentals WHERE id = $1', [rentalId])

    if(rental.length === 0) {
        return res.sendStatus(404)
    } else if(rental[0].returnDate === null) {
        return res.status(400).send('rental not finalized yet')
    } 

    next()
}

export default shouldDeleteRental