const selectRentalQuery = (customerId, gameId, offset, limit, order, desc) => {
    const isCustomerId = customerId ? `AND c.id = ${customerId}` : ''
    const isGameId = gameId ? `AND g.id = ${gameId}` : ''
    const isOffSet = offset ? `OFFSET ${offset}` : ''
    const isLimit = limit ? `LIMIT ${limit}` : ''
    const isOrder = order ? `ORDER BY r."${order}"` : ''
    const isDesc = desc === 'true' ? 'DESC' : ''

    return `
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
        ${isCustomerId}
        ${isGameId}
        ${isOrder} ${isDesc}
        ${isOffSet} ${isLimit}
    `
}

const insertRentalQuery = `
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
`

const updateRentalQuery = `
    UPDATE rentals 
    SET "returnDate" = $1, "delayFee" = $2
    WHERE id = $3
`

export { selectRentalQuery, insertRentalQuery, updateRentalQuery }